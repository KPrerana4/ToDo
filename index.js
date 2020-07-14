const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoClient = require("mongodb").MongoClient;

var db;

const app = express();
app.use(express.static(path.join(__dirname,"public")));
app.use(bodyParser.urlencoded({ extended: true }));
mongoClient.connect("mongodb://localhost:27017/sample",{useUnifiedTopology: true },(err,client) => {
    if(err) throw err;
    db = client.db("sample");
});


app.post("/add_item",(req,res) => {
    let found = false;
    db.collection("ToDos").findOne({toDo : req.body.item}, (err,result) => {
        if(err) throw err;
        if(result == undefined && req.body.item != "")
            db.collection("ToDos").insertOne({toDo : req.body.item , subToDos : []});
    });
    res.redirect("/");
});

app.post("/delete_item",(req,res) => {
    db.collection("ToDos").deleteOne({toDo : req.body.editItem});
    res.redirect("/");
});

app.post('/update',(req,res) =>{
    db.collection("ToDos").updateOne({toDo : req.body.oldText},{
        $set:{
            toDo : req.body.editItem
        }
    });
    res.redirect("/");
});

app.post('/update_sub_todo',(req,res) => {
    db.collection("ToDos").updateOne({toDo : req.body.mainToDo},{
        $set : {
            subToDos : req.body.subToDo.split(",")[0] === "" ? [] : req.body.subToDo.split(",")
        }
    });
    res.redirect("/");
});

app.get("/ToDos",(req,res) => {
    var result = [];
    db.collection("ToDos").find().toArray((err,data) => {
        if(err) throw err;
        res.json(data);
    });
});

app.listen(5500, () => console.log("running"));