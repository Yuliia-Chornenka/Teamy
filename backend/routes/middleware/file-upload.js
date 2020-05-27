// const aws = require('aws-sdk');
// const multer = require('multer');
// const multerS3 = require('multer-s3');
// const dotenv = require('dotenv');
// dotenv.config();
//
// aws.config.update({
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   region: 'eu-central-1'
// });
//
// const s3 = new aws.S3();
//
// const upload = multer({
//   limits: {
//     fileSize: 1000000,
//   },
//   storage: multerS3({  // ДОДАТИ ОБМЕЖЕННЯ В 1 МВ
//     acl: 'public-read',
//     s3,
//     bucket: 'teamy',
//     key: function(req, file, cb) {
//       req.file = Date.now() + file.originalname;
//       cb(null, Date.now() + file.originalname);
//     }
//   })
// });
// //
// module.exports = upload;

const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const dotenv = require('dotenv');
dotenv.config();

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: 'eu-central-1'
});

const s3 = new aws.S3();

const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  storage: multerS3({  // ДОДАТИ ОБМЕЖЕННЯ В 1 МВ
    acl: 'public-read',
    s3,
    bucket: 'teamy',
    key: function(req, file, cb) {
      req.file = Date.now() + file.originalname;
      cb(null, Date.now() + file.originalname);
    }
  })
});

const photo = upload.array('image', 1);

module.exports = photo;
