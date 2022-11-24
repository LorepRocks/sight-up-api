import express , { NextFunction, Request, Response } from "express";
import passport from "passport";
import session from 'express-session';
require('dotenv').config()

import auth from "./src/lib/auth";

const path = require('path');
const app = express();


const PORT = process.env.PORT;


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './src/views'));

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


const checkAuthenticated = (req: Request, res: Response, next: NextFunction ) => {
  if (req.isAuthenticated()) { return next() }
  res.redirect("/login")
}


app.get("/dashboard", checkAuthenticated, (_req: Request, res: Response) => {
  res.render("dashboard.ejs", { name: 'lorena' })
});

app.get('/login', (_req:Request, res:Response) =>{
  res.render("login.ejs")
})




//auth routes
app.get('/auth/google',
  passport.authenticate('google', { scope: [ 'email', 'profile' ]
}));

app.get('/auth/google/callback', passport.authenticate( 'google', {
   successRedirect: '/dashboard',
   failureRedirect: '/login'
}));

app.post("/logout", (req,res) => {
  req.logOut(()=>{})
  res.redirect("/login")
  console.log(`-------> User Logged out`)
})

console.log('__process.env.GOOGLE_CLIENT_SECRET', process.env.GOOGLE_CLIENT_SECRET)

app.listen(PORT, () => {
  console.log(`app listen on ${process.env.PORT}`);
});
