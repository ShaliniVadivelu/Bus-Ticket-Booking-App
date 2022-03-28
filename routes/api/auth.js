const express =require('express');
const router = express.Router();
const authBasic = require('../../middleware/auth');
const authOwner = require('../../middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require ('jsonwebtoken');
const config = require ('config');
const { check, validationResult } = require('express-validator');

const User= require('../../models/User');
const Owner= require('../../models/Owner');
const ROLE = require('../../config/data');

router.get('/basic', authBasic , async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/admin', authOwner, async (req, res) => {
    try {
        const owner = await Owner.findById(req.owner.id).select('-password');
        res.json(owner);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route     POST api/auth
// @desc      Authenticate user(basic and admin) & get tokenbb
// @access    Public
router.post(
    '/',
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

    const {email,password,role} = req.body;
    
    try {

        if (role==='basic')
        {
    // see if user exists
        let user= await User.findOne({email});

        if (!user) {
            return res
            .status (400)
            .json({errors: [ { msg: 'Invalid Credentials'}]});
        }
 
    const isMatch = await bcrypt.compare (password, user.password);

    if(!isMatch) {
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
    }
    else
    {
        let owner= await Owner.findOne({email});

        if (!owner) {
            return res
            .status (400)
            .json({errors: [ { msg: 'Invalid Credentials'}]});
        }
 
    const isMatch = await bcrypt.compare (password, owner.password);

    if(!isMatch) {
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

    }
    } catch (err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
}
);

module.exports = router;
