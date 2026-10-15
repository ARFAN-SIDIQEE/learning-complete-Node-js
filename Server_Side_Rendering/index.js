const express =require ('express')
const path = require ('path')
const {connectMongoDb}=require('./connect')
const urlRoute = require('./routes/url');
const staticRoute=require('./routes/staticRouter')
const URL =require ("./model/url")
const { default: mongoose } = require('mongoose');
const { Timestamp } = require('mongodb');


const app = express()
const PORT=8001


connectMongoDb("mongodb://127.0.0.1:27017/short_url")
    .then(() => console.log("mongodb is connect"))
    .catch((err) => console.log(err));


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views",path.resolve("./views"))

app.get("/",async(req,res)=>{
    const allUrls = await URL.find({})
    return res.render("home",{
        urls : allUrls
    }
    )
})

app.use("/url",urlRoute)
app.use('/',staticRoute)

app.get("/url/:shortId", async (req, res) => {
    const shortId = req.params.shortId;

    console.log("Requested shortId:", shortId);

    try {
        const entry = await URL.findOneAndUpdate(
            { shortId: shortId },
            {
                $push: {
                    visitHistory: {
                        timestamp: Date.now(),
                    },
                },
            },
            {
                returnDocument: "after",
            }
        );

        if (!entry) {
            return res.status(404).json({
                error: "Short URL not found",
            });
        }

        console.log("Visit history:", entry.visitHistory);
        console.log("Redirecting to:", entry.redirectURL);

        return res.redirect(entry.redirectURL);

    } catch (error) {
        console.error("Redirect error:", error);

        return res.status(500).json({
            error: "Internal server error",
        });
    }
});

app.listen(PORT,()=> console.log(`Server is stated at Port :${PORT}`))