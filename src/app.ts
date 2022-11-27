import express from "express";
import session from 'express-session';
import path from 'path';
require('dotenv').config()

import auth from "./lib/auth";
import routes from './routes';

const app = express();

app.set("port", process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Middleware
app.use(session({
  secret: "secret",
  resave: false ,
  saveUninitialized: true ,
}))

app.use(auth.initialize) // init passport on every route call
app.use(auth.session) 

app.use('/', routes())


export default app;
