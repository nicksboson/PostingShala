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
let posts = [{
    id: uuidv4(),
    username: "NIKHIL",
    content : " I AM A PROGRAMMER"

},
{ 
    id: uuidv4(),
    username : "SACHIN",
    content: "LAPPU SA TO SACHIN HAI"

},
{
    id: uuidv4(),
    username: "KARAN",
    content: "KARAN BHAI"

}];

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

app.get("/home",(req,res)=>{
    res.render('home.ejs');
})
const port = 1000;

app.listen(port,()=>{
    console.log("listening");
});
