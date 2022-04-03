const express=require('express');
const router=express.Router();

const bookcontroller=require('../controllers/book_controller');


router.get('/',bookcontroller.show);

router.get('/addbook',bookcontroller.addbook);
router.post('/createbook',bookcontroller.createbook);



//exporting the router
module.exports=router;