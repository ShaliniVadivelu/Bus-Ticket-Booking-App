const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require ('jsonwebtoken');
const config = require('config');
 
const {check, validationResult} = require('express-validator');
const Owner = require('../../models/Owner');
const {ROLE} = require ('../../config/data');

// @route     POST api/user
// @desc      Register Admin
// @access    Public
router.post ('/', [
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
        
        const avatar = gravatar.url(companyName,{
            s:'200',
            r:'pg',
            d:'mm'
        });
        
        let owner = new Owner ({
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
                role: ROLE.ADMIN
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

// @route     POST api/owner
// @desc      Authenticate basic user & get token
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
    let owner= await Owner.findOne({email});

    if (!owner) 
    {
        return res.status (400).json({errors: [ { msg: 'Invalid Credentials'}]});
    }
 
    const isMatch = await bcrypt.compare (password, owner.password);

    if(!isMatch) 
    {
        return res
            .status (400)
            .json({errors: [ { msg: 'Invalid Credentials'}]});
    }

    const payload = {
        owner: {
            id: owner.id,
            role: ROLE.ADMIN
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

// @route     GET api/owner/me
// @desc      Get current owner profile
// @access    Private

router.get('/me/:_id', async(req, res) => {
    try {   
        const owner = await Owner.findOne({owner: req.params._id}).populate('buses').select('-password');

        if (!owner)
        {
            return res.status(400).json({msg: 'There is no profile for this owner'});
        }
        res.json(owner);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
        
    }
});
module.exports = router;