import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
  cloud_name: 'dt0h1catc',
  api_key: '744251838659272',
  api_secret: 'tqK4VpH2piIxWXdbvJ8Z7wTWQ3U',
});

cloudinary.api.resources({ type: 'upload', prefix: 'Products-20240718T061315Z-001',all: true ,max_results: 1000},
  (error, result) => {
    if (error) console.error(error);
    else {
      const data = result.resources.map(img => img.url).join('\n');
      fs.writeFileSync('image_urls.txt', data);
      console.log('Data written to image_urls.txt');
    }
  }
);
