const AWS = require("aws-sdk");
const config = require("config");
const fs = require("fs");

const BUCKET_NAME = config.get("AwsS3BucketName");
const s3 = new AWS.S3({
  accessKeyId: config.get("amazonKeyId"),
  secretAccessKey: config.get("amazonSecretKey"),
});

const uploadFile = (fileName) => {
  // Read content from the file
  const fileContent = fs.readFileSync(fileName);

  // Setting up S3 upload parameters
  const params = {
    Bucket: BUCKET_NAME,
    Key: "asdad.jpg", // File name you want to save as in S3
    Body: fileContent,
  };

  // Uploading files to the bucket
  s3.upload(params, function (err, data) {
    if (err) {
      throw err;
    }
    console.log(`File uploaded successfully. ${data.Location}`);
  });
};

module.exports = uploadFile;
