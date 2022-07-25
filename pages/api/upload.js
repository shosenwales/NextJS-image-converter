import multer from 'multer';
import streamifier from 'streamifier';
const cloudinary = require('cloudinary').v2;

let storage = multer.memoryStorage();
let upload = multer({
  storage,
});

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export default async function handler(req, res) {
  upload.single('image')(req, {}, async (err) => {
    let result = await uploadFromBuffer(req);
    const convertedImage = cloudinary.image(`${result.public_id}.jpg`);

    res.send({ convertedImage });
  });
}

let uploadFromBuffer = (req) => {
  return new Promise((resolve, reject) => {
    let cld_upload_stream = cloudinary.uploader.upload_stream(
      {
        folder: 'converted-images',
      },
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );

    streamifier.createReadStream(req.file.buffer).pipe(cld_upload_stream);
  });
};

export const config = {
  api: {
    bodyParser: false,
  },
};
