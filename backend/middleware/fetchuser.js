const jwt = require('jsonwebtoken');


// middleware to fetch user from jwt token and add id to req object
const fetchUser = (req,res,next) => {
    const JWT_SECRET = "iNotesMadewithReact"
    // get user from the jwt token 
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error:'Please authenticate with valid token'})
}
try {
    // verify the user by comparing data from req or jwt token 
    const data = jwt.verify(token , JWT_SECRET)
    req.user = data.user;
    next();
} catch (error) {
    res.status(401).send({error:'Please authenticate with valid token'})
}}



module.exports = fetchUser;