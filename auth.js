const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const personSchema = require('./models/personSignup');


passport.use(new LocalStrategy(async (username,password,done)=>{
    try{
        const user = await personSchema.findOne({username});
        if(!user){
            return done(null,false,{message:"Invalid Username"});
        }
        const isPasswordMatch = (user.password === password) ? true:false;
        if(isPasswordMatch){
            return done(null,user);
        }else{
            return done(null,false,{meassage:"Invalid password"});
        }
    }catch(err){
        return done(err);
    }
}))

module.exports = passport;


