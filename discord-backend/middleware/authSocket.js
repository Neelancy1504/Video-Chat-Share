const jwt = require('jsonwebtoken');

const config = process.env;

const verifyTokenSocket = (socket , next) => {
    //Verifies the JWT token from socket.handshake.auth.token------------
    const token = socket.handshake.auth?.token;

    try{
        const decoded = jwt.verify(token , config.TOKEN_KEY);
        //If valid, attaches the decoded user to socket.user--------------------
        socket.user = decoded;
    }
    catch(err){
        const socketError = new Error('NOT AUTHORIZED');
        //if invalid, passes an error to next()-------------------------------
        return next(socketError);
    }

    next();
}

module.exports = verifyTokenSocket;