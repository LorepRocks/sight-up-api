import { NextFunction } from 'express';
import passport from 'passport';
import { VerifyCallback } from 'passport-google-oauth2';
import { saveUser, getUserByGoogleId } from '../controllers/user';
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
        let userCreated = null;
        const newUser = {
            id: profile.id,
            displayName: profile.displayName,
            picture: profile.picture,
            email: profile.email
        }
        const userExists = await getUserByGoogleId(profile.id);
        if(!userExists){
           userCreated = await saveUser(newUser);
        }
        return done(null, userCreated ? userCreated : userExists );
    }catch(err){
        return done(err, false)
    }
    
}));

passport.serializeUser((user: any, done: VerifyCallback) => done(null, user));

passport.deserializeUser(async (user, done: VerifyCallback) => {
    try {
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