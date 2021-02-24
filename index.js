import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

const app = express();

app.use(bodyParser.json({limit: '30mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));
app.use(cors());

app.get('/', (req, res) => { res.send('Memories API works!')});
app.use('/posts', postRoutes);
app.use('/user', userRoutes);

const CONNECTION_URL=`mongodb+srv://${process.env.DB_AUTH_USER}:${process.env.DB_AUTH_SECRET}@cluster0.rwaq3.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
  .then(() => {
    console.log('Connected to Mongo database')
    app.listen(PORT, () => console.log(`Server started at port ${PORT}`))
  })
  .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', true);



