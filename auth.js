const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const person = require('./models/person');


passport.use(new LocalStrategy(async (username,password,done)=>{
    // console.log(username,password);
    try{
        const user = await person.findOne({username:username});
        if(!user){
            return done(null,false,{message:"Username is Invalid"});
        }
    
        const isPasswordMatch = user.comparePassword(password);
        if(isPasswordMatch){
            return done(null,user);
        }else{
            return done(null,false,{message:"Password is  Invalid"})
        }
    }catch(err){
        return done(err);
    }
}))

module.exports = passport;