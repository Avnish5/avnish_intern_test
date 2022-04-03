//importing the mongoose module
const mongoose=require('mongoose');


//creating schema for book model
const bookSchema=mongoose.Schema({

    title:{
        type:String,
        
    },

    isbn:{
        type:String,
        
    },

    authors:{
        type:String,
    },

    description:{
        type:String,
      
        
    },

    
});

const book=mongoose.model('book',bookSchema);


//exporting the model
module.exports=book;