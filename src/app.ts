import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import { appealRouter } from './routes/appeal.routes';
import { errorHandler } from './errors/error-handler';

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api/appeals', appealRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const start = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
};

start();
