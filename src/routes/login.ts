import express from 'express'
import passport from 'passport';
import jwt from "jsonwebtoken";

const router = express.Router();

export default () => {
    router.get('/auth/google',
        passport.authenticate('google', { scope: [ 'email', 'profile' ]
    }));

    router.get('/auth/google/callback', passport.authenticate('google', {scope: ['https://www.googleapis.com/auth/plus.login'], session: false }),
    (req,res) => {
        if (req.user) {
            console.log('___req.user', req.user)
            const token = jwt.sign({id: req.user}, 'top_secret', {
              expiresIn: 60 * 60 * 24 // 24 hours
            })

            console.log(token)
            res.cookie('token', token)        
            res.redirect('http://localhost:3000/')
      
          } else {
            res.redirect('http://localhost:3000/register')
          }
    });

    router.post("/logout", (req,res) => {
        req.logOut(()=>{})
        res.redirect("/login")
        console.log(`-------> User Logged out`)
    })

    return router;
}