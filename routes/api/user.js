const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require ('jsonwebtoken');
const config = require('config');
 
const {check, validationResult} = require('express-validator');
const User = require('../../models/User');
const Booking = require('../../models/Booking');
const {ROLE} = require ('../../config/data');

// @route     POST api/users
// @desc      Register user
// @access    Public
router.post ('/', [
    check ('name', 'Please give your name without any numeric').not().isEmpty().isAlpha(),
    check ('email', 'Please include a valid email').isEmail(),
    check ('role', 'Role is required').not().isEmpty(),
    check ('phone', 'Please include a valid contact number').isNumeric(),
    check ('gender', 'Please include a your Gender'),
    check('password','Please enter a password with 6 or more characters with alphanumeric').isLength({min:6}).isAlphanumeric()
], async (req,res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }   

    const {name,email,role,phone,gender,dob,address,password}=req.body;
    
    try {
        let user = await User.findOne({email});
        
        if(user)
        {
            return res.status(400).json({errors:[{msg: 'User already exist'}]});
        }
        const avatar = gravatar.url(email,{
            s:'200',
            r:'pg',
            d:'mm'
        });
        
        user = new User ({
            name,
            email,
            role,
            phone,  
            gender,
            dob,
            address,
            password,
            avatar,
        });
    
        const salt = await bcrypt.genSalt(10);    

        user.password = await bcrypt.hash(password, salt);  

        await user.save();

        const payload ={
            user: {
                id: user.id,
                role: ROLE.BASIC
            }
        };
        
        jwt.sign(
            payload,
            config.get('jwtSecret'),
            {expiresIn: 360000},
            (err,token)=>{
                if(err)
                    throw err;
                res.json({token});
                }    
            );

    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server error');
    }
});

// @route     POST api/user/login
// @desc      Authenticate  user & get token
// @access    Public
router.post(
    '/login',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password','Password is required').exists(),
        check('role','Role is required').not().isEmpty(),
],
async (req, res) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array() });
    }
    
    try {
    const {email,password,role} = req.body;
    
    // see if owner exists
    let user= await User.findOne({email});

    if (!user) 
    {
        return res.status (400).json({errors: [ { msg: 'Invalid Credentials'}]});
    }
 
    const isMatch = await bcrypt.compare (password, user.password);

    if(!isMatch) 
    {
        return res
            .status (400)
            .json({errors: [ { msg: 'Invalid Credentials'}]});
    }

    const payload = {
        user: {
            id: user.id,
            role: ROLE.BASIC
        }
    };

    jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token)=> {
            if(err) throw err;
            res.json({ token });
        }
        );

    } catch (err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


// @route     GET api/user/me
// @desc      Get current users profile
// @access    Private

router.get('/me/:_id', async(req, res) => {
    try {   
        const user = await User.findOne({user: req.params._id})
                               .populate('bookings',['busNumber'] )
                               .select('-password');

        if (!user)
        {
            return res.status(400).json({msg: 'There is no profile for this user'});
        }
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
        
    }
});

module.exports=router;

