const User = require('../../models/user')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const postRegister = async(req,res) => {
    try {
        const { username, mail ,password } = req.body;

        //check if user exists
//-------------------------------------------------------
        //one account for one mail
        const userExists = await User.exists({mail: mail.toLowerCase()});

        if(userExists){
            return res.status(409).send("E-mail already in use");
        }
//--------------------------------------------------------
        //encryption of password
        const encryptedPassword = await bcrypt.hash(password , 10);
//--------------------------------------------------------
        //create user document and save in database
        const user = await User.create({
            username,
            mail: mail.toLowerCase(),
            password: encryptedPassword
        });
//---------------------------------------------------------
        //create a JWT token -: if token expires , user has to login again!
        const token = jwt.sign({
            userId: user._id,
            mail
        },
        process.env.TOKEN_KEY,
        {
            expiresIn: '24h'
        }
    );

        // Return success response
        res.status(201).json({
            userDetails:{
                mail: user.mail,
                token:token,
                username:user.username,
                _id: user._id,
            }
        });
    }
    catch(err){
        console.log("Registration error: ", err);
        return res.status(500).send("Error occurred. Please try again: " + err.message);
    }
};

module.exports = postRegister;