import express from 'express';
import mongoose from 'mongoose';
import config from './config/config';
import cookieParser from "cookie-parser"
import { isAuthenticated } from './middlewares/auth';
import routes from "./routes/v1/index";

const app = express();

app.get('/', (req, res) => {
  const name = process.env.NAME || 'World';
  res.send(`Hello ${name}!`);
});

const port = parseInt(process.env.PORT || '3000');

app.use(express.json());

app.use(cookieParser());

app.use(express.urlencoded({extended: true}));

app.use(isAuthenticated);

app.use('/v1', routes);

const startConnection = async () => {
  console.log('connecting to database')
  await mongoose.connect(config.database.url)
  console.log('Connected to database');
}

async function index(){
  await startConnection();
  app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
}

// index()
