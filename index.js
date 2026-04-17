
let express = require("express");
let app = express();
let port = 3000;
let path = require("path");
let {v4 : uuidv4 } = require("uuid");
let methodOverride = require('method-override')
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride('_method'));
app.listen(port,()=>{
    console.log("Listening.....");
});
//To Show All The Files
let posts = [
    {
        id : uuidv4(),
        username : "JK",
        content : "Burmunda BurKumar"
    },
    {
        id : uuidv4(),
        username : "Anki Panda",
        content : "Patho Kor..."
    },
    {
        id : uuidv4(),
        username : "Pandu",
        content : "Tu Mere Se Pyaar Karti Hain ya Nahi "
    },
];
app.get("/posts",(req,res)=>{
    console.log("Processing...");
    res.render("index.ejs",{posts});
});
//To Create The Form or New Data
//create form
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");

});
//add form to index
app.post("/posts",(req,res)=>{
    let {username,content} = req.body;
    let id = uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");

});
app.get("/posts/:id",(req,res)=>{
    let {id} = req.params;
    console.log(id);
    let post = posts.find((p) => p.id === id);
    res.render("show.ejs",{post});
});
//to update the Route
app.patch("/posts/:id", (req,res)=>{
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p)=> id===p.id);
    post.content = newContent;
    console.log(post);
    res.redirect("/posts");
});
//to edit the route
app.get("/posts/:id/edit",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=> id === p.id);
    res.render("edit.ejs",{post});
});
//to delete the post (Destroy Route)
app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params;
    posts = posts.filter((p)=>id !== p.id);
    res.redirect("/posts");
})