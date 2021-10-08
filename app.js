import express from 'express';
import dotenv from 'dotenv';
import logger from 'morgan';
import mongoose from 'mongoose';
import indexRouter from './routes/index.js';

const app = express();
const port = 3000;

dotenv.config();

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.4gvsm.mongodb.net/${process.env.COLLECTION}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(console.log('connected to the database'))
  .catch((err) => {
    console.log(err);
  });

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(logger('dev'));
app.use(indexRouter);

app.use((req, res) => {
  res.status(404).render('404');
});

app.listen(port, console.log(`listening on port ${port}`));
 