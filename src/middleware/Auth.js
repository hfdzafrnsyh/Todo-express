const { expressjwt: expressJwt } = require('express-jwt');
const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET;
const API = process.env.API;

const AuthUsersJwt = () => {

    return expressJwt({
        secret : `${SECRET}`,
        algorithms: ['HS256'],
        getToken: function fromHeaderOrQuerystring(req) {
          if (
            req.headers.authorization &&
            req.headers.authorization.split(" ")[0] === "Bearer"
          ) {
            return req.headers.authorization.split(" ")[1];
          } else if (req.query && req.query.token) {
            return req.query.token;
          }
          return null;   
        },
    }).unless({
        path: [
            `${API}`,
            `${API}/login`,
            `${API}/register`,
        ]
    })
}


const AuthUser = (req,res,next) => {
   
    const secret = process.env.SECRET;
    const token = req.headers.authorization.slice(7);

    jwt.verify(token , secret , (err, user) => {
        req.user = user;

    })

    next();
}



module.exports = { AuthUsersJwt , AuthUser }