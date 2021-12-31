const puppeteer = require('puppeteer');
const debug = require('debug');
const minify = require('html-minifier-terser').minify;
const logger = {
    info: debug('lotus-ssr:log'),
    error: debug('lotus-ssr:error'),
}
// https://hackernoon.com/tips-and-tricks-for-web-scraping-with-puppeteer-ed391a63d952
// Dont download all resources, we just need the HTML
// Also, this is huge performance/response time boost
const blockedResourceTypes = [
    'image',
    'media',
    'font',
    'texttrack',
    'object',
    'beacon',
    'csp_report',
    'imageset',
];

const skippedResources = [
    'quantserve',
    'adzerk',
    'doubleclick',
    'adition',
    'exelator',
    'sharethrough',
    'cdn.api.twitter',
    'google-analytics',
    'googletagmanager',
    'google',
    'fontawesome',
    'facebook',
    'analytics',
    'optimizely',
    'clicktale',
    'mixpanel',
    'zedo',
    'clicksor',
    'tiqcdn',
];

const RENDER_CACHE = new Map();
const timeout = process.env.TIMEOUT || 5000;

/**
 * https://developers.google.com/web/tools/puppeteer/articles/ssr#reuseinstance
 * @param {string} url URL to prerender.
 * @param {string} remote debugging URL. Puppeteer's reconnects to the browser instance.
 * @param {function} data Optional data loader
 */
async function ssr ({url, browserWSEndpoint, selector, data, publish, path, clearCache} ) {
    if (clearCache) {
        RENDER_CACHE.clear();
    }
    if (RENDER_CACHE.has(url)) {
        logger.info(`Headless rendered page from cache: ${url}`);
        return {html: RENDER_CACHE.get(url), ttRenderMs: 0};
    }

    let loadedData = '';
    const start = Date.now();
    const browser = await puppeteer.connect({browserWSEndpoint});
    const page = await browser.newPage();
    try {
        await page.setRequestInterception(true);


        page.on('request', request => {
            const requestUrl = request._url.split('?')[0].split('#')[0];
            if (
                blockedResourceTypes.indexOf(request.resourceType()) !== -1 ||
                skippedResources.some(resource => requestUrl.indexOf(resource) !== -1)
            ) {
                request.abort();
            } else {
                request.continue();
            }
        });
        // pipe console log from browser to node process
        page.on('console', consoleObj => logger.info(consoleObj.text()));
        if (data) {
            logger.info('calling data function to load data');
            const result = await data();
            loadedData = `globalThis["data-${selector}"]=${result};`;
            // globalThis values are undefined when executing in puppeteer
            // so we expose the results through a function
            await page.exposeFunction(`data-${selector}`, () => result);
        }
        logger.info('calling evaluate');
        // Inject <base> on page to relative resources load properly.
        await page.evaluate(url => {
            const base = document.createElement('base');
            base.href = url;
            // Add to top of head, before all other resources.
            document.head.prepend(base);
        }, url);
        logger.info(`calling goto waiting for networkidle0: ${url}`);
        await page.goto(url, {
            timeout: timeout,
            waitUntil: 'domcontentloaded'
        });

        logger.info(`waiting for shadowRoot on selector: ${selector}`);
        await page.waitForFunction(selector => !!document.querySelector(selector)?.shadowRoot, {
            polling: 500,
            timeout: timeout,
        }, selector);
        logger.info('found selector, eval HTML');
        let html = await page.$eval('html', (element, tagname) => {
            return element.getInnerHTML({includeShadowRoots: true});
        }, selector);
        logger.info('got HTML');
        // Close the page we opened here (not the browser).
        await page.close();
        // TODO figure out why the base element is stripped from serialization
        html = minify(html.replace('<head>', `<head><script>${loadedData}</script><base href="${url}"/>`),{
            collapseWhitespace: true,
            conservativeCollapse: true,
            decodeEntities: true,
            keepClosingSlash: true,
            minifyCSS: true,
            minifyJS: true,
            removeComments: true,
            removeEmptyAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
        });

        const ttRenderMs = Date.now() - start;
        logger.info(`Headless rendered page in: ${ttRenderMs}ms`);

        RENDER_CACHE.set(url, html); // cache rendered page.

        if (publish) {
            await publish({filePath: path[0], html});
        }
        return {html, ttRenderMs};
    }
    catch (e) {
        const html = e.toString();
        logger.error({ message: `URL: ${url} Failed with message: ${html}` });
        return { html, status: 500 };
    }

};

module.exports = ssr;
