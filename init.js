const mongoose=require("mongoose");
const Chat=require("./models/chat.js");

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}
main()
.then(()=>{
    console.log("DB connection successful");
})
.catch((err)=>console.log(err));

let allChats= [
    {
        from: "Puneet",
        to: "Rhea",
        msg: "Hi Rhea!",
        created_at: new Date()
    },
    {
        from: "Ankit",
        to: "Rhea",
        msg: "Are you coming to the meeting?",
        created_at: new Date()
    },
    {
        from: "Rhea",
        to: "Ankit",
        msg: "Yes, I'll be there.",
        created_at: new Date()
    },
    {
        from: "Sara",
        to: "John",
        msg: "Happy Birthday, John!",
        created_at: new Date()
    },
    {
        from: "John",
        to: "Sara",
        msg: "Thank you, Sara!",
        created_at: new Date()
    },
    {
        from: "Alex",
        to: "Nina",
        msg: "Did you finish the report?",
        created_at: new Date()
    },
    {
        from: "Nina",
        to: "Alex",
        msg: "Yes, I sent it to your email.",
        created_at: new Date()
    }
];


let mychat = [{
    from: "Ankit",
    to: "Rhea",
    msg: "Are you coming to the meeting?",
    created_at: new Date()
}];


Chat.insertMany(allChats);
