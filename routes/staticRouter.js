const express=require('express')
const URL=require('../models/url')
const router=express.Router();

router.get('/',async (req,res)=>{
    const allurls=await URL.find({ "visitHistory.0": { $exists: true } })
    return res.render('home',{
        urls:allurls,
        APP_URL: process.env.APP_URL
    });
})

module.exports=router;