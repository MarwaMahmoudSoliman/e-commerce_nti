import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import 'dotenv/config';

import dbConnection from './config/db';
import categoriesRoute from './routes/categoriesRoute';
import subCategoriesRoute from './routes/subcategoriesRoute';


const app: express.Application = express()
app.use(express.json())
dotenv.config()

dbConnection()

app.use('/api/v1/categories', categoriesRoute)
app.use('/api/v1/subCategories', subCategoriesRoute )
app.listen(process.env.PORT, () => {

  console.log('server is running on port 3000');
});