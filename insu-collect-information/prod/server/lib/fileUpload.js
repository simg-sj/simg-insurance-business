const multer = require('multer');
const multerS3 = require('multer-s3');
const s3 = require('../config/awsS3Config'); // 확인 필요: s3 구성이 올바르게 설정되어 있는지 확인하세요.
const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");
const fs = require('fs'); // 추가: 파일 시스템 모듈
const client = require('../config/awsS3Client');
const path = require('path');


module.exports = {
    uploadS3Image: function(req, res, next) {
        const upload = multer({
            storage: multerS3({
                s3: s3,
                bucket: 'db-document-file',
                contentType: multerS3.AUTO_CONTENT_TYPE,
                metadata: function(req, file, cb) {
                    file.originalname = Buffer.from(file.originalname).toString('utf8');
                    cb(null, { fieldName: file.fieldname });
                },
                key: function(req, file, cb) {
                    cb(null, `GENERAL/socar/insuRequest/${Date.now().toString()}_${file.originalname}`);
                }
            }),
            limits: { fileSize: 50 * 1024 * 1024 },
        }).array('photos', 10);

        upload(req, res, (error) => {
            if (error instanceof multer.MulterError)
                return res.status(400).json({
                    message: 'Upload unsuccessful',
                    errorMessage: error.message,
                    errorCode: error.code
                });

            if (error)
                return res.status(500).json({
                    message: 'Error occured',
                    errorMessage: error.message
                });

            console.log('Upload successful.');
            next();
        });
    },

    uploadRegiFile: async function(filePath, data) {
        const fileContent = fs.readFileSync(filePath);
        const fileName = path.basename(filePath);

        const params = {
            Bucket: 'db-document-file',
            Key: `GENERAL/PitIn/Join/${Date.now().toString()}_${data.cmpk}_contract.pdf`,
            Body: fileContent,
        };

        try {
            const data = await s3.upload(params).promise();
            data.originalname = fileName;
            return data;
        } catch (err) {
            console.error('Error uploading file:', err);
            throw err;
        }
    },


    getS3File: async function(key) { // 수정: 인자 추가

        const getObjectParams = {
            Bucket: 'db-document-file',
            Key: key
        };
        try {
            const data = await client.send(new GetObjectCommand(getObjectParams));
            const chunks = [];
            for await (const chunk of data.Body) {
                chunks.push(chunk instanceof Buffer ? chunk : Buffer.from(chunk));
            }
            return Buffer.concat(chunks);
        } catch (err) {
            throw err;
        }
    },

    bufferToPNG: async function(buffer) {
        try {
            const png = PNG.sync.read(buffer);
            return png;
        } catch (err) {
            throw new Error("The input buffer is not a valid PNG image.");
        }
    }
};
