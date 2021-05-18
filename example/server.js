const express = require('express');
const path = require('path');
const puppeteer = require('puppeteer');
const app = express();
const cors = require('cors');
const port = process.argv[2] || 3000;
const dockerPort = process.argv[3] || 3005;
const ssr = require('./ssr/ssr');
const debug = require('debug');
const logger = {
    info: debug('lotus-ssr:log'),
    error: debug('lotus-ssr:error'),
}

const corsOptions = {
    origin: [
        `http://localhost:${port}`,
        `http://localhost:${dockerPort}`,
    ],
    credentials: true
};
let browserWSEndpoint = null;


app.use(cors(corsOptions));

app.get('/ssr', async (req, res, next) => {
    // this method simulates a custom path for a web application
    let data;
    let publish;
    const args = puppeteer.defaultArgs();
    // IMPORTANT: you can't render shadow DOM without this flag
    // getInnerHTML will be undefined without it
    args.push('--enable-experimental-web-platform-features');
    if (!browserWSEndpoint) {
        const browser = await puppeteer.launch({
            args
        });
        browserWSEndpoint = await browser.wsEndpoint();
    }
    // extract the path https://regex101.com/r/bVnMRC/1/
    const path = req.query.url.match(/(?<=(http\:\/\/|https\:\/\/)[a-zA-Z.:\-0-9]+)\/[a-zA-Z.:\-0-9\/]+/);

    if (path) {
        const libPath = path[0].substr(0,path[0].length-1);
        logger.info(libPath);
        // if there is a path try to load a SSR data loading function. We assume it will be found
        // at path
        try {
            const serverFunctions = require(`.${libPath}`);
            data = serverFunctions.data;
            publish = serverFunctions.publish;
        } catch (e) {
            logger.info('no server function found');
        }
    }

    const {html, ttRenderMs} = await ssr({
        url: req.query.url,
        browserWSEndpoint,
        selector: req.query.selector,
        data,
        publish,
        path,
        clearCache: req.query.clearCache,
    });
    // Add Server-Timing! See https://w3c.github.io/server-timing/.
    res.set('Server-Timing', `Prerender;dur=${ttRenderMs};desc="Headless render time (ms)"`);
    return res.status(200).send(html); // Serve prerendered page as response.
});

app.get('/sample', async (req, res, next) => {
    await new Promise((resolve) => {
        setTimeout(() => resolve(), 1000);
    });
    return res.status(200).send([
        {name: '', src: 'http://localhost:3000/image-gallery/assets/0.jpg', caption: '<h5>0.jpg</h5>'},
        {name: '', src: 'http://localhost:3000/image-gallery/assets/6.jpg', caption: '<h5>1.jpg</h5>'},
        {name: '', src: 'http://localhost:3000/image-gallery/assets/2.jpg', caption: '<h5>2.jpg</h5>'},
        {name: '', src: 'http://localhost:3000/image-gallery/assets/3.jpg', caption: '<h5>3.jpg</h5>'},
        {name: '', src: 'http://localhost:3000/image-gallery/assets/4.jpg', caption: '<h5>4.jpg</h5>'},
        {name: '', src: 'http://localhost:3000/image-gallery/assets/5.jpg', caption: '<h5>5.jpg</h5>'},
    ]);
});

app.use('/', express.static(path.join(__dirname,'.')));

const server = app.listen(port, () => logger.info(`Static server listening on port ${port}!`));

process.on('SIGINT',function () {
    logger.info('Closing ssr-cluster');
    server.close();
});
