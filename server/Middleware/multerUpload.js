import multer from 'multer';
import path from 'path';

// Configure multer storage
const storage = multer.diskStorage({
  destination: path.join(process.cwd(), 'uploads'), // Directory where files will be stored
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

// Initialize multer with the storage configuration
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'application/pdf',
      'video/mp4',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
      'application/msword', 
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 
      'application/vnd.ms-excel', 
      'application/vnd.openxmlformats-officedocument.presentationml.presentation', 
      'application/vnd.ms-powerpoint', 
      'text/plain' 
    ];
        if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'), false);
    }
  },
});

export default upload;
