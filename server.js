require('dotenv').config();

const express = require('express')
const app = express();
const bodyparser=require('body-parser');
const mongoose = require('mongoose');
const port=process.env.PORT || 5000;
const cors=require('cors');
//const PORT = 3000;
mongoose.set('useFindAndModify', false);
app.use(cors());

//const {MONGOURL} = require('./keys');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGOURL,{
    useNewUrlParser:true,
    useUnifiedTopology: true 
 }).then(()=>{
    console.log("DB is connected");
 })
 .catch((err)=>{
     console.log(err);
     process.exit();
 }) 

/*app.get('/',(req,res)=>{
    res.send("welcome to blog app");
});*/

require('./models/user');
require('./models/post');

app.use(express.json());
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))


// app.use('*',(req,res,next)=>{
//     res.status(404).json({"msg":"NOT FOUND"});
// });



if(process.env.NODE_ENV=="production"){
    app.use(express.static("client/build"));
    const path=require("path");
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })

}
app.listen(port,(err)=>{
    if(err) console.log(err);
    else console.log(`post is live at ${port}`);
});
