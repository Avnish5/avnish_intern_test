const express=require('express');
const router=express.Router();

const magazinecontroller=require('../controllers/magazine_controller');

router.get('/',magazinecontroller.show);

router.get('/addmagazine',magazinecontroller.addmagazine);
router.post('/createmagazine',magazinecontroller.createmagazine);



//exporting the router
module.exports=router;