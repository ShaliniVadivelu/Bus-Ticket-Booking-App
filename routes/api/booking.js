const express = require('express');
const router = express.Router();

const {check, validationResult} = require ('express-validator');

router.post ('/searchBus', [
    check('startCity', 'startCity is required').not().isEmpty(),
    check('destination', 'destination is required').not().isEmpty(),
], async (req, res)=>{

    const errors = validationResult(req);

    if(!errors.isEmpty())
    {
        return res.status(400).json({errors: errors.array()});
    }

    res.send('dafd');
    
});

module.exports = router;