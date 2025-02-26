
require('dotenv').config()
import express from 'express';
import resumeRoutes from './routes'; 
import cors from "cors";

const app = express();
app.use(cors());

const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', resumeRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
