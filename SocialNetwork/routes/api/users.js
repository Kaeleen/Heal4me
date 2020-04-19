const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// @route  POST api/users
// @desc   Create a user
// @access Public
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password','Please enter a password with 6 or more characters').isLength({min: 6})
], 
async (req, res) => { 
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // See if user exists
    const { name, email, password } = req.body;

    try{

        let user = await User.findOne({email});

        if(user) {
           return res.status(400).json({errors: [{msg: 'User already exists'}]});
        }

        // Get users gravatr
        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        })

        user = new User({
            name,
            email,
            avatar,
            password
        }); 

        // Encrypt password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

         // Return jsonwebtoken
    
        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
            payload, 
            config.get('jwtSecret'),{
                expiresIn: 360000
            }, (err, token) => {
                if(err) throw err;
                res.status(200).json({token});
            });    
    } catch(err){
        console.error(err.message);
        res.status(500).sned('server error');

    }
});

// @route  DELETE api/users
// @desc   Delete a user
// @access Public
router.delete('/', async (req, res) => {
    const { email } = req.body;

    try {
        let user = await User.findOne({email});

        if (!user) {
            return res.status(400).json({errors: [{msg: 'User does not exist'}]});
        }

        User.deleteOne({email: email}, function(err) {
            if (err) throw err;
            res.status(200).json({msg: "User deleted"});
        })
    } catch(err){
        console.error(err.message);
        res.status(500).sned('server error');

    }
});

module.exports = router;