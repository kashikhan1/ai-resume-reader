// src/routes.ts
import { Router } from 'express';
import multer from 'multer';
import { handleResumeUpload } from './controllers/resumeController';
const router = Router();
import path from 'path';

// Configure Multer to preserve original filename and extension
const storage = multer.diskStorage({
  destination: 'uploads/', // Folder to save files
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // Extract file extension
    const filename = `${file.fieldname}-${Date.now()}${ext}`; // Unique filename
    cb(null, filename);
  }
});

const upload = multer({ storage: storage });
router.post('/upload', upload.single('resume'), handleResumeUpload);

export default router;
