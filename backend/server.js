import express, { urlencoded } from 'express';
import { notFound,errorHandler } from './middleware/errorMiddleware.js';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import router from './routes/userRoutes.js';
import userRoutes from './routes/userRoutes.js';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT || 5000;


// middleware
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

// connect to database

await connectDB();

app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {

  console.log(`Server is running on port ${PORT} `);

});