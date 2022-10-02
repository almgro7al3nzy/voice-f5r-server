
const fs = require('fs');
const path = require('path');

const cert = {
    key: fs.readFileSync(path.join(__dirname, 'certs/server.key')),
    cert: fs.readFileSync(path.join(__dirname, 'certs/server.cert'))
};

module.exports = cert;
