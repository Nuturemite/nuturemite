import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import dotenv from "dotenv"
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

cloudinary.api.resources({ type: 'upload', prefix: '', all: true, max_results: 100},
  (error, result) => {
    if (error) console.error(error);
    else {
      console.log(result);
      const data = result.resources.map(img => img.url).join('\n');
      console.log(data);
      fs.writeFileSync('image_urls.txt', data);
      console.log('Data written to image_urls.txt');
    }
  }
);
