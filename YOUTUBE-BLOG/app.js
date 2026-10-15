require('dotenv').config()
const path= require('path')
const express= require ('express')
const mongoose=require('mongoose')
const cookieparser= require('cookie-parser')



const userRoute=require ('./routes/user');
const blogRoute=require ('./routes/blog');
const { checkForAuthenticationCookie } =
 require('./middlewares/authentication');
const Blog = require('./models/blog');

const app=express()
const PORT= process.env.PORT || 8000

mongoose
    .connect(process.env.MONGO_URL)
   .then((e) => console.log('MongoDB Connect'))


app.set('view engine','ejs')
app.set('views',path.resolve('./views'))

// Middleware to read form data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieparser());

app.use(checkForAuthenticationCookie('token'));

app.use(express.static(path.resolve('./public')));

app.get('/', async (req, res) => {
    const allBlog = await Blog.find({});

    return res.render('home', {
        user: res.locals.user,
        blogs: allBlog,
    });
});


app.use('/user',userRoute)
app.use('/blog',blogRoute)

app.listen(PORT,()=>console.log('server is started'))