const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;


import passport from "passport";

passport.use(new JWTstrategy({
  secretOrKey : 'top_secret',
  jwtFromRequest : ExtractJWT.fromUrlQueryParameter('secret_token')
}, (token:any , done:any) => {
  try {
    //Pass the user details to the next middleware
    return done(null, token);
  } catch (err) {
    done(err);
  }
}))