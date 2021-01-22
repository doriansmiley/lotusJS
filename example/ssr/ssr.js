// eslint-disable-next-line @typescript-eslint/no-var-requires
const puppeteer = require('puppeteer');

// In-memory cache of rendered pages. Note: this will be cleared whenever the
// server process stops. If you need true persistence, use something like
// Google Cloud Storage (https://firebase.google.com/docs/storage/web/start).
const RENDER_CACHE = new Map();

async function ssr(url) {
    if (RENDER_CACHE.has(url)) {
        return {html: RENDER_CACHE.get(url), ttRenderMs: 0};
    }

    const start = Date.now();

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    try {
        // networkidle0 waits for the network to be idle (no requests for 500ms).
        // The page's JS has likely produced markup by this point, but wait longer
        // if your site lazy loads, etc.
        await page.goto(url, {waitUntil: 'networkidle0'});
        await page.waitFor(() => document.querySelector('lotus-image-gallery')?.shadowRoot); // ensure #posts exists in the DOM.
    } catch (err) {
        console.error(err);
        throw new Error('page.goto/waitForSelector timed out.');
    }

    const html = await page.content(); // serialized HTML of page DOM.
    await browser.close();

    const ttRenderMs = Date.now() - start;
    console.info(`Headless rendered page in: ${ttRenderMs}ms`);

    RENDER_CACHE.set(url, html); // cache rendered page.

    return {html, ttRenderMs};
}

module.exports = ssr;
