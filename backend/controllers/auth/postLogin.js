const User = require('../../models/user');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken') ;

const postLogin = async(req,res) => {
    try {
        const {mail,password} = req.body;
        const user = await User.findOne({ mail : mail.toLowerCase()});

        if(user && (await bcrypt.compare(password , user.password))) {
            //send new token
            const token = jwt.sign({
                userId: user._id,
                mail
            },
            process.env.TOKEN_KEY,
            {
                expiresIn: '24h'
            }

        );

            return res.status(201).json({
                userDetails: {
                    username:user.username,
                    mail: user.mail,
                    token : token,
                    _id: user._id,
                },
            });
        }

        //if user not found
        return res.status(400).send("Invalid credentials. Please try again!")
    }
    catch(err){
        return res.status(500).send("Something went wrong. Please try again") ;
    }
};

module.exports = postLogin;