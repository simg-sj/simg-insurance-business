const cron = require('node-cron');
const fs = require('fs');
const _util = require('../server/lib/_util');
const path = require('path');

cron.schedule('00 59 23 * * *', () => {
    let today = _util.getTimeyymmddhhmmss('day').substring(0,6);
    const directoryName = path.join(__dirname, '../uploads/mycheckup')+today;
    console.log(directoryName);
    if (!fs.existsSync(directoryName)) {
        fs.mkdirSync(directoryName);
    }else {
        console.log('fail');
    }
});

