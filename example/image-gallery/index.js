// eslint-disable-next-line @typescript-eslint/no-var-requires
const fetch = require('node-fetch');

async function data () {
    console.log('data called');
    const result = await fetch('http://localhost:3000/sample');
    const parsedResult = await result.json();
    // you must return a string!!!! This is being serialized into the Puppeteer execution context
    return JSON.stringify(parsedResult);
}

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = {
        data
    };
}


