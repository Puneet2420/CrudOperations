const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const Chat=require("./models/chat.js");

const bodyParser = require('body-parser');
const methodOverride = require('method-override');
// Middleware to parse JSON and URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Method override to handle PUT and DELETE methods
app.use(methodOverride('_method'));

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}
main()
.then(()=>{
    console.log("DB connection successful");
})
.catch((err)=>console.log(err));


app.listen(8080,()=>{
    console.log("App is listining at 8080");
});

//index route
app.get("/chats",async(req,res)=>{
    let chats=await Chat.find();
    res.render("index.ejs",{chats});
});

//new chat route
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs", {});
});

//create chat route
app.post("/chats",(req,res)=>{
    let { from, msg, to } = req.body;
    let newChat = new Chat({
        from: from,
        to: to,
        msg: msg,
        created_at: new Date()
    });
newChat.save()
    .then((res)=>{
        console.log("new chat added succesfully")
    })
    .catch((err)=>{
        console.log(err)
    });
    res.redirect("/chats");
});


//EDIT ROUTE
app.get("/chats/:id/edit",async (req,res)=>{
    let {id}=req.params;
    let chat=await Chat.findById(id);
    res.render("edit.ejs",{chat});
});

// Update msg route
app.put('/chats/:id', async (req, res) => {
    let { id } = req.params;
    let { msg } = req.body;
    try {
        await Chat.findByIdAndUpdate(id, { msg: msg });
        res.redirect('/chats');
    } catch (err) {
        console.log(err);
        res.status(500).send('Error updating chat');
    }
});

//delete route
app.delete("/chats/:id",async(req,res)=>{
    let { id } = req.params;
    let dltmsg=await Chat.findByIdAndDelete(id);
    res.redirect('/chats');
});