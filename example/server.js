// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require('express');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
const app = express();
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cors = require('cors');
const port = process.argv[2] || 3000;
const dockerPort = process.argv[3] || 3005;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ssr = require('./ssr/ssr');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fetch = require('node-fetch');

const corsOptions = {
    origin: [
        `http://localhost:${port}`,
        `http://localhost:${dockerPort}`,
    ],
    credentials: true
};


app.use(cors(corsOptions));

app.get('/ssr', async (req, res, next) => {
    // this method simulates a custom path for a web application
    let data;
    // extract the path https://regex101.com/r/bVnMRC/1/
    const path = req.query.url.match(/(?<=(http\:\/\/|https\:\/\/)[a-zA-Z.:\-0-9]+)\/[a-zA-Z.:\-0-9\/]+/);
    if (path) {
        const libPath = path[0].substr(0,path[0].length-1);
        console.info(libPath);
        // if there is a path try to load a SSR data loading function. We assume it will be found
        // at path
        try {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            data = require(`.${libPath}`).data;
        } catch (e) {
            console.info('no server function found');
        }
    }
    // TODO add a publish function as another parameter that can save the output.
    //  I would hash req.query.url as the filename. This would allow saving to Fly.io
    //  edge (or S3) and serving from there pre-rendered with the data
    const {html, ttRenderMs} = await ssr(req.query.url, undefined, req.query.selector, data);
    // Add Server-Timing! See https://w3c.github.io/server-timing/.
    res.set('Server-Timing', `Prerender;dur=${ttRenderMs};desc="Headless render time (ms)"`);
    return res.status(200).send(html); // Serve prerendered page as response.
});

app.get('/sample', async (req, res, next) => {
    // TODO replace hard coded value
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

const server = app.listen(port, () => console.info(`Static server listening on port ${port}!`));

process.on('SIGINT',function () {
    console.info('Closing ssr-cluster');
    server.close();
});
