const fetch = require('node-fetch');
const crypto = require('crypto');
const fs = require('fs').promises;
const path = require('path');
const debug = require('debug');
const logger = {
    info: debug('lotus-ssr:log'),
    error: debug('lotus-ssr:error'),
}

async function publish ({filePath, html}) {
    logger.info(`publish called: ${filePath}`);
    // This is just an example, but you coule easily publish to S3 or Fly.io
    // we create a hash of the path as it should be considered unique, and used as a cache key
    const md5sum = crypto.createHash('md5').update(filePath);
    const hash = md5sum.digest('hex');
    const location = await path.resolve(`.${filePath}/${hash}.html`);
    logger.info(`published to: ${location}`);
    await fs.writeFile(location, html);
    return {location};
}

async function data () {
    logger.info('data called');
    const result = await fetch('http://localhost:3000/sample');
    const parsedResult = await result.json();
    // you must return a string!!!! This is being serialized into the Puppeteer execution context
    return JSON.stringify(parsedResult);
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = {
        data,
        publish,
    };
}


