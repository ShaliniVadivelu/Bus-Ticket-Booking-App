const express = require ('express');
const app = express ();
const router = express.Router();

router.get ('/', (req,res) => {
    res.send ("this is the post route");
    console.log("THIS IS THE POST ROUTE");
})  

module.exports = router;