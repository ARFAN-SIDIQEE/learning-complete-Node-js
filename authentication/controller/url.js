const shortid = require("shortid");
const URL = require("../model/url");

async function handleGenerateNewShortURl(req, res) {
    const body = req.body;
    console.log("BODY:", body);

    if (!body.url) {
        return res.status(400).json({
            error: "url is required"
        });
    }

    const shortID = shortid();

    await URL.create({
        shortId: shortID,
        redirectURL: body.url,
        visitHistory: [],
        createdBy:req.user._id,
    });
      // Get all URLs from MongoDB
    const allUrls = await URL.find({});
    console.log("All URLs:", allUrls);

    return res.render('home',{
        urls: allUrls,
         id: shortID
    });
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;

    const entry = await URL.findOne({ shortId ,createdBy: req.user._id,});

    if (!entry) {
        return res.status(404).json({
            error: "Short URL not found"
        });
    }

    return res.json({
        totalClick: entry.visitHistory.length,
        analytic: entry.visitHistory
    });
}

module.exports = {
    handleGenerateNewShortURl,
    handleGetAnalytics
};