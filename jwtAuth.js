const jwt = require('jsonwebtoken');



//verify token

const jsonAuthMiddleware = (req,res,next)=>{
    //check for that token is send or not
    const authorization = req.headers.authorization;
    if(!authorization) return res.status(401).json({error:"Token Not found"});
    
    //get token    
    const token = req.headers.authorization.split(" ")[1];
    if(!token) return res.status(401).json({error:"unauthorize"});

    try{
        //verify
        const decode = jwt.verify(token,"helloWorld");

        //attach decode to request header
        req.user = decode;

        //call next operation
        next();
    }catch(err){
        console.error(err);
        res.status(401).json({error:"Invalid User"});
    }
}


// generate token

const generateToken = (userdata)=>{
    return jwt.sign(userdata,"helloWorld",{expiresIn:3000});
}

module.exports = {jsonAuthMiddleware,generateToken};