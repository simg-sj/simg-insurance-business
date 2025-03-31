require('dotenv').config({ path: '../.env' });
const { S3Client } = require('@aws-sdk/client-s3');

const client = new S3Client({
    region: "ap-northeast-2",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});
module.exports = client;


