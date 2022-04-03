//importing the book model from models
const bookdb=require('../models/books');

//adding the fs and path module
const fs=require('fs');
const path=require('path');
const { Console } = require('console');


//hanling to show all the books details
module.exports.show=(req,res)=>{
     
    //querying the whole data model
    bookdb.find({},(err,allbooks)=>{

        //return the response with local.allbook=allbooks
       
        return res.render('book',{allbook:allbooks});
    })
    
}





//handling to srender the addbook view
module.exports.addbook=(req,res)=>{
    
    return res.render('addbook');
}


//handling to create the new book details into database
module.exports.createbook=(req,res)=>{
    
    //converting the isbn number to specific format with hypen
    let originalISBN=req.body.isbn.toString();
    let newISBN=originalISBN.slice(0,4)+"-"+originalISBN.slice(4,8)+"-"+originalISBN.slice(8,12);
    
    //checking whether the coming isbn number coming from req.body,will there be exist or not in database.
    //checking here this thing to make isbn number unique for every book adding into database
    bookdb.findOne({isbn:newISBN},(err,book)=>{
       
        //if there is an error
        if(err)
        {
            console.log(err);
            req.flash('error','There might be some system error');
            return res.render('addbook');
        }
        
        //if book existed 
        if(book)
        {
            
            
            req.flash('error','Book already existing with entered isbn number.Kindly add the unique ISBN number');
            return res.redirect('/book/addbook');
        }
        
        //if book not existed
        else{
            
            //adding the details to the database
            bookdb.create({
                title:req.body.title,
                isbn:newISBN,
                authors:req.body.authors,
                description:req.body.description
        
            },(err,book)=>{
        
                if(err)
                {
                    console.log('error');
                    return;
                }
                
                //adding the new book details to the Books.csv file.
                var csvWriter = require('csv-write-stream');
                var writer = csvWriter()
                writer = csvWriter({sendHeaders: false});
                writer.pipe(fs.createWriteStream(path.join(__dirname,'../csv_files/newbooklist.csv'), {flags: 'a'}));
                writer.write({
                    title:book.title,
                    isbn:book.isbn,
                    authors:book.authors,
                    description:book.description
                  });
                writer.end();
                req.flash('success',"Book details are added successfully");
                return res.redirect('/book/addbook');
             
            })

        }
    })
    }