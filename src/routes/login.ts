import express from 'express'
import passport from 'passport';

const router = express.Router();

export default () => {
    router.get('/auth/google',
        passport.authenticate('google', { scope: [ 'email', 'profile' ]
    }));

    router.get('/auth/google/callback', passport.authenticate( 'google', {
        successRedirect: '/dashboard',
        failureRedirect: '/login'
    }));

    router.post("/logout", (req,res) => {
        req.logOut(()=>{})
        res.redirect("/login")
        console.log(`-------> User Logged out`)
    })

    return router;
}