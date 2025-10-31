const express=require('express');
const path=require('path')
const urlRoute=require('./routes/url');
const staticRoute=require('./routes/staticRouter');
const URL=require('./models/url');
const {connectToMongoDB}=require('./connect');


const app=express();
const PORT=5000;

app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.set("view engine","ejs");
app.set("views", path.resolve("./views"));



connectToMongoDB("mongodb://localhost:27017/short")
.then(()=>console.log("Mongodb connected"))

app.use('/url',urlRoute);
app.use('/',staticRoute);

app.get('/url/:shortId',async (req,res)=>{
   const shortId=req.params.shortId;
   const entry=await URL.findOneAndUpdate(
    {
     shortId
    },
   {
     $push:{
       visitHistory:{
        timestamp:Date.now()
       }
     },
   },
   {new:true}
 );
 res.redirect(entry.redirectURL);
})
app.listen(PORT,()=>console.log(`Server started at PORT: ${PORT}`));