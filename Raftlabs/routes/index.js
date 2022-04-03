const express=require('express');
const router=express.Router();


const homecontroller=require('../controllers/home_controller');

router.get('/home',homecontroller.show);

router.use('/api',require('./api'));




router.use('/book',require('./book'));


router.use('/magazine',require('./magazine'));



//exporting the router
module.exports=router;