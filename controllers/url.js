const { nanoid }=require('nanoid');
const URL=require('../models/url');
async function handleGenerateNewShortURL(req,res){
    const body=req.body;
    if(!body.url) return res.status(400).json({error: 'url is required'});
    const shortID=nanoid(8);
    await URL.create({
        shortId:shortID,
        redirectURL:body.url,
        vistiHistory:[]
    })
    const allurls = await URL.find({"visitHistory.0": { $exists: true }});
    return res.render("home",{
        id:shortID,
        urls:allurls
    });
}

async function handleGetAnalytics(req,res){
    const shortId=req.params.shortId;
    const result=await URL.findOne({shortId});
    return res.json({totalClicks:result.visitHistory.length})
}

module.exports={
    handleGenerateNewShortURL,
    handleGetAnalytics
}