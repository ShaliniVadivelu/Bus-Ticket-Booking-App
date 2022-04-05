const express =require('express');
const router = express.Router();

const auth = require('../../middleware/auth');
const User= require('../../models/User');
const Owner= require('../../models/Owner');

router.get('/basic', auth.authBasic , async (req, res) => {
    try {        
        // findById() function is used to find a single document by its _id field. The _id field is cast based on the Schema before sending the command.
        const user = await User.findById(req.user.id).select('-password');

        res.json(user);

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/admin', auth.authOwner, async (req, res) => {
    try {
        const owner = await Owner.findById(req.owner.id).select('-password');

        res.json(owner);
        
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;