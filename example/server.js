// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require('express');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
const app = express();
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cors = require('cors');
const port = process.argv[2] || 3000;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ssr = require('./ssr/ssr');

const corsOptions = {
    origin: [
        `http://localhost:${port}`
    ],
    credentials: true
};


app.use(cors(corsOptions));

app.get('/ssr', async (req, res, next) => {
    // TODO replace hard coded value
    console.log(req.query.url);
    console.log(req.query.selector);
    const {html, ttRenderMs} = await ssr(req.query.url, undefined, req.query.selector);
    // Add Server-Timing! See https://w3c.github.io/server-timing/.
    res.set('Server-Timing', `Prerender;dur=${ttRenderMs};desc="Headless render time (ms)"`);
    return res.status(200).send(html); // Serve prerendered page as response.
});

app.get('/sample', async (req, res, next) => {
    // TODO replace hard coded value
    console.log(req.query.url);
    console.log(req.query.selector);
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

const server = app.listen(port, () => console.log(`Static server listening on port ${port}!`));

process.on('SIGINT',function () {
    console.log('Closing server');
    server.close();
});
