const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const personSchema = require('./models/personSignup');


passport.use(new LocalStrategy(async (username,password,done)=>{
    // console.log(username,password);
    try{
        const user = await personSchema.findOne({username});
        if(!user){
            return done(null,false,{message:"Invalid Username"});
        }
        const isPasswordMatch = await user.comparePassword(password);
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


