//importing the mongoose module
const mongoose=require('mongoose');

//creating schema for magazine model
const magazineSchema=mongoose.Schema({

    title:{
        type:String,
        
    },

    isbn:{
        type:String,
        
    },

    authors:{
        type:String,
    },

    publishedAt:{
        type:String,
      
        
    },

    
});

const magazine=mongoose.model('magazine',magazineSchema);

//exporting the model
module.exports=magazine;