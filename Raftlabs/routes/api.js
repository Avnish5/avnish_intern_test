const express=require('express');
const router=express.Router();


const adddatacontroller=require('../controllers/add_data_controller');


router.get('/addbookdata',adddatacontroller.addbookdata);
router.get('/addmagazinedata',adddatacontroller.addmagazinedata);
router.get('/addauthordata',adddatacontroller.addauthordata);






//exporting the router
module.exports=router;