const express = require("express");
const app = express();
const path = require("path");
const {v4:uuidv4}= require("uuid");
const methodOverride = require("method-override");
app.use(express.urlencoded({extended: true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(methodOverride("_method"));


require('dotenv').config();
const mongoUri = process.env.MONGO_URI;
const jwtSecret = process.env.JWT_SECRET;

let posts = [
    {
        id: uuidv4(),
        username: "NIKHIL",
        content: "I AM A PROGRAMMER",
        createdAt: new Date("2024-03-15T10:30:00")
    },
    { 
        id: uuidv4(),
        username: "SACHIN",
        content: "I am happy to announce that I cleared my 12th with 95% marks! Hard work really pays off. Looking forward to my college journey ahead.",
        createdAt: new Date("2024-03-14T15:45:00")
    },
    {
        id: uuidv4(),
        username: "KARAN",
        content: "I am a full stack developer and I love coding in JavaScript. Just completed a new project using React and Node.js. The possibilities are endless!",
        createdAt: new Date("2024-03-13T09:20:00")
    },
    {
        id: uuidv4(),
        username: "PRIYA",
        content: "Just finished reading 'Atomic Habits' by James Clear. Highly recommend it to everyone! The concept of 1% better every day is truly transformative.",
        createdAt: new Date("2024-03-12T14:15:00")
    },
    {
        id: uuidv4(),
        username: "RAHUL",
        content: "Started learning machine learning today! The world of AI is fascinating. Any recommendations for good ML resources?",
        createdAt: new Date("2024-03-11T11:30:00")
    },
    {
        id: uuidv4(),
        username: "ANANYA",
        content: "Just completed my first marathon! The feeling of crossing the finish line is indescribable. Remember, the only limits are the ones you set for yourself.",
        createdAt: new Date("2024-03-10T08:45:00")
    },
    {
        id: uuidv4(),
        username: "ARJUN",
        content: "Built my first mobile app using Flutter! The cross-platform development experience was amazing. Can't wait to publish it on the app stores.",
        createdAt: new Date("2024-03-09T16:20:00")
    },
    {
        id: uuidv4(),
        username: "MEERA",
        content: "Just got accepted into my dream university for Masters in Computer Science! All those late nights studying finally paid off.",
        createdAt: new Date("2024-03-08T13:10:00")
    },
    {
        id: uuidv4(),
        username: "VIKRAM",
        content: "Started a new YouTube channel about tech tutorials. First video is about setting up a development environment. Check it out!",
        createdAt: new Date("2024-03-07T10:05:00")
    },
    {
        id: uuidv4(),
        username: "ZARA",
        content: "Just launched my first e-commerce website! The journey from idea to execution was challenging but incredibly rewarding.",
        createdAt: new Date("2024-03-06T09:30:00")
    }
];
app.get("/",(req,res)=>{
    res.render('home.ejs');
});
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});


app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
})

app.post("/posts",(req,res)=>{
    let {username,content}= req.body;
    let id = uuidv4();
    posts.push({username,content,id});
    res.redirect("/posts");

});
app.get("/posts/:id", (req, res) => {
    const { id } = req.params;
    const post = posts.find((p) => p.id === id);

    if (!post) {
        return res.status(404).send("Post not found");
    }

    res.render("show.ejs", { post });
});
app.get("/posts/:id/edit",(req,res)=>{
    const { id } = req.params;
    const post = posts.find((p) => p.id === id);
    res.render("newcontent.ejs",{post});
})

app.patch("/posts/:id",(req,res)=>{
    const { id } = req.params;
    let newcontent = req.body.content;
    const post = posts.find((p) => p.id === id);
    post.content= newcontent;
    res.redirect("/posts");

});

app.delete("/posts/:id",(req,res)=>{
    const { id } = req.params;
     posts = posts.filter((p) => p.id !== id);
     res.redirect("/posts");
});


const port = process.env.PORT || 1000;

app.listen(port,()=>{
    console.log(`listening on http://localhost:${port}`);
});
