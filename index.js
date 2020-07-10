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

var count = 0;
app.post("/add_item",(req,res) => {
    let found = false;
    db.collection("ToDos").findOne({toDo : req.body.item}, (err,result) => {
        if(err) throw err;
        if(result != undefined)
            found = true;
    });
    if(found == false)
    {
        db.collection("ToDos").insertOne({toDo : req.body.item , subToDos : []});
        count++;
    }
    res.status(204).send();
});

app.post("/delete_item",(req,res) => {
    db.collection("ToDos").deleteOne({toDo : req.body.editItem});
    res.status(204).send();
});

app.post('/update',(req,res) =>{
    db.collection("ToDos").updateOne({toDo : req.body.oldText},{
        $set:{
            toDo : req.body.editItem
        }
    });
    res.status(204).send();
});

app.post('/update_sub_todo',(req,res) => {
    db.collection("ToDos").updateOne({toDo : req.body.mainToDo},{
        $set : {
            subToDos : req.body.subToDo.split(",")
        }
    });

    res.status(204).send();
});

app.get("/ToDos",(req,res) => {
    var result;
    db.collection("ToDos").find().toArray((err,data) => {
        if(err) throw err;
        result = data;
        console.log(data);
    });
    console.log(result);
    res.json(result);
});

app.listen(5600, () => console.log("running"));