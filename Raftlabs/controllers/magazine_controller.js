//importing the magazine model from models
const magazinedb=require('../models/magazines');

//adding the fs and path module
const path=require('path');
const fs=require('fs');


//hanling to show all the magzines details
module.exports.show=(req,res)=>{

    //querying the whole data model
    magazinedb.find({},(err,allmagazines)=>{

        //return the response with local.allmagazines=allmagazines
        
        return res.render('magazine',{allmagazines:allmagazines});
    })
    
}




//handling to srender the addmagazine view
module.exports.addmagazine=(req,res)=>{

    return res.render('addmagazine');


}


module.exports.createmagazine=(req,res)=>{

    //converting the isbn number to specific format with hypen
    let originalISBN=req.body.isbn.toString();
    let newISBN=originalISBN.slice(0,4)+"-"+originalISBN.slice(4,8)+"-"+originalISBN.slice(8,12);

    //checking whether the coming isbn number coming from req.body,will there be exist or not in database.
    //checking here this thing to make isbn number unique for every magazine adding into database
    //publishedAt:req.body.publishedAt.toString()

    magazinedb.findOne({isbn:newISBN},(err,magazine)=>{
       
        //if there is an error
        if(err)
        {
            req.flash('error','There might be some system error');
            return res.render('addmagazine');
        }
        
        //if magazine existed 
        if(magazine)
        {
            req.flash('error','Magazine already existing with entered isbn number.Kindly add the unique ISBN number');
            
            
            return res.redirect('/book/addbook');
        }
        
        //if magazine not existed
        else{
            
            //adding the details to the database
          
            magazinedb.create({
                title:req.body.title,
                isbn:newISBN,
                authors:req.body.authors,
                description:req.body.publishedAt.toString()
        
            },(err,magazine)=>{
        
                if(err)
                {
                    console.log('error');
                    return;
                }
                
                //adding the new magazine details to the Magazines.csv file.
                var csvWriter = require('csv-write-stream');
                var writer = csvWriter()
                writer = csvWriter({sendHeaders: false});
                writer.pipe(fs.createWriteStream(path.join(__dirname,'../csv_files/newmagazineslist.csv'), {flags: 'a'}));
                writer.write({
                    title:magazine.title,
                    isbn:magazine.isbn,
                    authors:magazine.authors,
                    description:magazine.publishedAt
                  });
                writer.end();
                req.flash('success',"Magazine details are added successfully");
                return res.redirect('/magazine');
             
            })

        }
    })
   }