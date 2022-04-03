const express=require('express');
const app=express();
const port=8000;
const path=require('path');

//add the config file which use to connect to mongo db
const db=require('./config/mongoose');
const session=require('express-session');

//adding the 'connect-flash' module
const flash=require('connect-flash');
const customware=require('./config/middleware');


//body-parse
const { urlencoded } = require('express');
app.use(express.urlencoded({extended: false}));


//setuup express-ejs-layout
const expresslayout=require('express-ejs-layouts');
app.use(expresslayout);
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);






//setup the view engine
app.use(express.static('./assets')); 
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(session({ cookie: { maxAge: 1000*60*60 }, 
    secret: 'woot',
    resave: false, 
    saveUninitialized: false}));


app.use(session());
app.use(flash());
app.use(customware.setFlash);

//adding the main route file
app.use('/',require('./routes/index'));


//starting the sever
app.listen(port,(error)=>{
    if(error)
    {
        console.log("There is an error while starting the sever");
    }

    console.log("Server is running at port:",port);
})
