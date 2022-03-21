const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require ('jsonwebtoken');
const config = require('config');
// const role = require('../../config/data');
 
const {check, validationResult} = require('express-validator');
const User = require('../../models/User');
const Owner = require('../../models/Owner');

// @route     POST api/users
// @desc      Register user
// @access    Public
router.post ('/basic', [
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
                role: user.role
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

// @route     POST api/user
// @desc      Register Admin
// @access    Public
router.post ('/admin', [
    check ('companyName', 'Please include your company name').not().isEmpty(),
    check ('officeAddress', 'Please include your office address').not().isEmpty(),
    check ('role', 'Role is required').not().isEmpty(),
    check ('email','Please include your valid email').isEmail(),
    check ('phone', 'Please include a valid contact number').isNumeric(),    
    check('password','Please enter a password with 6 or more characters with alphanumeric').isLength({min:6}).isAlphanumeric()
], async (req,res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }   

    const {companyName,officeAddress,role,phone,email,password}=req.body;
    
    try {
        let owner = await Owner.findOne({companyName});
        
        if(owner)
        {
            return res.status(400).json({errors:[{msg: 'Company is already exist'}]});
        }
        const avatar = gravatar.url(companyName,{
            s:'200',
            r:'pg',
            d:'mm'
        });
        
        owner = new Owner ({
            companyName,
            officeAddress,
            phone,
            email,  
            role,
            password
        });
    
        const salt = await bcrypt.genSalt(10);    

        owner.password = await bcrypt.hash(password, salt);  

        await owner.save();

        const payload ={
            owner: {
                id: owner.id,
                role: owner.role
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

module.exports=router;

