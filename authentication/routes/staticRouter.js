const express = require("express");
const URL = require("../model/url");
const User = require("../model/user");

const {
    handleUserLogin
} = require("../controller/user");

const router = express.Router();

router.get("/", async (req, res) => {
    if (!req.user) {
        return res.redirect('/login')
    }
    const allurls = await URL.find({createdBy:req.user._id});

    return res.render("home", {
        urls: allurls,
    });
});

router.get("/signup", async (req, res) => {
    const allurls = await URL.find({});

    return res.render("signup", {
        urls: allurls,
    });
});

router.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const normalizedEmail = email.trim().toLowerCase();

        const existingUser = await User.findOne({
            email: normalizedEmail,
        });

        if (existingUser) {
            return res.status(400).send("Email already registered");
        }

        await User.create({
            name,
            email: normalizedEmail,
            password,
        });

        console.log("New user created:", normalizedEmail);

        return res.redirect("/login");

    } catch (error) {
        console.error("SIGNUP ERROR:", error);
        return res.status(500).send("Something went wrong");
    }
});

router.get("/login", async (req, res) => {
    const allurls = await URL.find({});

    return res.render("login", {
        urls: allurls,
    });
});

// IMPORTANT: use controller here
router.post("/login", handleUserLogin);

module.exports = router;