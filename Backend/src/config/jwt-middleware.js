import passportJWT from 'passport-jwt';
import JWT_SECRET from '../config/serverConfig.js';
import User from '../models/User.js';


const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

const opts ={
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.AUTH_KEY
}

export const passportAuth = (passport) =>{
    try{passport.use(new JwtStrategy(opts,async function(jwt_payload, done) {
        console.log("req sent to strategy");
        console.log("Token Payload:", jwt_payload);
        const user = await User.findOne({email:jwt_payload.email});
            if (!user) {
                return done(null, false);
            }
             else {
                return done(null, user);
            }
        }));}
        catch(err){
            console.log(err);
            throw err;  
        }
}
   
