const bookdb=require('../models/books');
const magazinedb=require('../models/magazines');

module.exports.show=(req,res)=>{

    bookdb.find({},(err,allbooks)=>{
        if(err)
        {
            console.log(err);
            return;
        }

        magazinedb.find({},(err,allmagazines)=>{
            if(err)
        {
            console.log(err);
            return;
        }

        return res.render('home',{
            allbooks:allbooks,
            allmagazines:allmagazines,
        })
        })
    })


}