import mongoose from 'mongoose';
import { config } from 'dotenv';

// accessing env variables
config();

// helper to connect to DB
export const connectToDB = (): void => {
  mongoose
    .connect(process.env.MONGO_URL || '')
    .then(() => console.log('connected to DB'))
    .catch((err) => {
      console.log('not connected :( ===> ', err);
    });
};
