//importing the mongoose module
const mongoose=require('mongoose');

//creating schema for authors model
const authorSchema=mongoose.Schema({

    email:{
        type:String,
        
    },

    firstname:{
        type:String,
        
    },

    lastname:{
        type:String,
        
    },

    
});

const author=mongoose.model('author',authorSchema);

//exporting the model
module.exports=author;