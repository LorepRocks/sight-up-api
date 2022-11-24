import { NextFunction } from 'express';
import passport from 'passport';
import { VerifyCallback } from 'passport-google-oauth2';
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;


interface Response{
    locals: any
}

interface Request{
    user: any
}
  

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:4000/auth/google/callback",
}, async (_accessToken:string, _refreshToken:string,profile:any, done:VerifyCallback ) => {
    try{

        console.log('__profile', profile)
        const newUser = {
            method: 'google',
            google: {
                id: profile.id,
                name: profile.displayName,
                email: profile.emails[0].value
            }
        }
        return done(null, newUser);
    }catch(err){
        return done(err, false)
    }
    
}));

passport.serializeUser((user: any, done: VerifyCallback) => done(null, user));

passport.deserializeUser(async (id, done: VerifyCallback) => {
    try {
        const user:any = { id: id, name: 'username'};
        return done(null, user);
    } catch(err){
        return done(err)
    }
})

export default  {
    initialize : passport.initialize(),
    session: passport.session(),
    setUser: (req: Request,res: Response,next: NextFunction) => {
        res.locals.user = req.user;
        return next();
    }
}