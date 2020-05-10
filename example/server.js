// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require('express');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
const app = express();
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cors = require('cors');
const port = process.argv[2] || 3000;

const corsOptions = {
    origin: [
        `http://localhost:${port}`
    ],
    credentials: true
};


app.use(cors(corsOptions));

app.use('/', express.static(path.join(__dirname,'.')));

app.listen(port, () => console.log(`Static server listening on port ${port}!`));
