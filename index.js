const express = require("express");
const app = express();
const port = 8080 ;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override");





app.use(express.urlencoded({extended: true})); //to understand the different api language
app.use(methodOverride("_method"))

app.set("view engine", "ejs");
app.set("views" , path.join(__dirname, "views"));


app.use(express.static(path.join(__dirname, "public") ));

let posts = [
    {
        id: uuidv4(),
        username : "apnacollege",
        content : "i love coding !"
    },
    {
       id : uuidv4() ,
        username : "pw",
        content : "padhlo chahe kahi se selection hoga yahi se  !"
    },
    {
        id: uuidv4(),
        username : "apnikaksha",
        content : "kya hua phora nhi jaa raha!"
    },
    {
        id :uuidv4(),
        username : "coding wallah",
        content : "code krna suru karo !"
    },
    {
        id:uuidv4() ,
        username : "dtu students union",
        content : "chaar chawani ghodhe pe anusut hamare l**e pe!"
    },
    {
        id:uuidv4() ,
        username : "nsut students",
        content : "delhi testical university!"
    },
    
];


app.get("/posts", (req, res) =>{
    res.render("index.ejs", {posts} );
})
app.get("/posts/new", (req, res) =>{
    res.render("new.ejs");
})
app.post("/posts", (req,res) =>{
    let { username, content} = req.body;
    let id = uuidv4(); 
    posts.push({id ,username,content});
    res.redirect("/posts");
})

app.get("/posts/:id", (req, res) => {
    let postId = req.params.id;
    console.log("Requested Post ID:", postId);

    let post = posts.find(post => post.id === postId);

    if (!post) {
         
        console.log("Post not found");
        res.status(404).send("Post not found");
        return;
    }

    res.render("show.ejs", {post});
});

app.patch("/posts/:id", (req,res) =>{
    let postId = req.params.id;
    let newContent = req.body.content;
    let post = posts.find(post => post.id === postId);
    if (!post) {
        console.log("Post not found");
        res.status(404).send("Post not found");
        return;
    }
    post.content = newContent;
    console.log(post);
    res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
    let postId = req.params.id;
    let post = posts.find(post => post.id === postId);
    
    if (!post) {
        console.log("Post not found");
        res.status(404).send("Post not found");
        return;
    }

    res.render("edit.ejs", { post }); // Pass the post object to the view
});

app.delete("/posts/:id", (req, res) => {
    let postId = req.params.id;
     posts = posts.filter(post => post.id !== postId);
     res.redirect("/posts");
});


app.listen(port , () => {
    console.log("listening to port 8080");
});



   