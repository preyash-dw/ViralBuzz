import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import contentRoute from './routes/routing.js';
import userRoute from "./routes/userRoutes.js"
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});
app.use(express.static("uploads"));
app.use('/api', contentRoute);
app.use("/auth",userRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
