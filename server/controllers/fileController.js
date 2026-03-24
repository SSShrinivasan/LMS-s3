const s3 = require("../config/s3");

exports.uploadFile = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "File required" });
    }

    const params = {
      Bucket: process.env.AWS_BUCKET,
      Key: Date.now() + "-" + req.file.originalname,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
      
    };

    const data = await s3.upload(params).promise();

    res.json({
      message: "Uploaded",
      url: data.Location,
    });

  } catch (err) {
    next(err);
  }
};