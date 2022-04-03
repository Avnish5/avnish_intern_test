const res = require("express/lib/response");
const authordb=require('../models/authors');
const bookdb=require('../models/books');
const magazinedb=require('../models/magazines');

const csv = require('csv-parser')
const fs = require('fs')
const path=require('path');

module.exports.show=(req,res)=>{
    return res.render('home');
}

//hadling to add books data from csv to database
module.exports.addbookdata=(req,res)=>{

   
        const results=[];
    fs.createReadStream(path.join(__dirname,'../csv_files/Books.csv'))
  .pipe(csv({ separator: ';' }))
  .on('data', (data) => results.push(data))
  .on('end', function() {
   
    
  
         bookdb.insertMany(results, (err, books) => {
            
            if (err){
              return res.json("There is some error.Data is not added");
            }
            
          
            return res.json("Your data added successfully to mongodb");
           
          });
      
  });

    }

//hadling to add magazine data from csv to database

module.exports.addmagazinedata=(req,res)=>{

   
        const results=[];
    fs.createReadStream(path.join(__dirname,'../csv_files/Magazines.csv'))
  .pipe(csv({ separator: ';' }))
  .on('data', (data) => results.push(data))
  .on('end', function() {
   
    
    
         magazinedb.insertMany(results, (err, magazines) => {
            
            if (err){
              return res.json("There is some error.Data is not added");
            }
            
            
             return res.json("Your data added successfully to mongodb");
            
          });
      
  });

}

//hadling to add author data from csv to database
module.exports.addauthordata=(req,res)=>{

   
    const results=[];
fs.createReadStream(path.join(__dirname,'../csv_files/Authors.csv'))
.pipe(csv({ separator: ';' }))
.on('data', (data) => results.push(data))
.on('end', function() {



     authordb.insertMany(results, (err, authors) => {
        
        if (err){
          return res.json("There is some error.Data is not added");
        }
        
        return res.json("Your data added successfully to mongodb");
       
      });
  
});

}






    

            
            
          
 













