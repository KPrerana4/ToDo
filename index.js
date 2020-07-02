const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

var toDos = [];
var subToDos = [];
const app = express();
app.use(express.static(path.join(__dirname,"public")));
app.use(bodyParser.urlencoded({ extended: true }))

app.post("/add_item",(req,res) => {
    let found = toDos.some((toDo) => { return (toDo.item === req.body.item)});
    if(!found){
        toDos.push({item : req.body.item});
        subToDos.push({"items" : []});
    }
    res.status(204).send();
});

app.post("/delete_item",(req,res) => {
    let reqIndex = -1;
    for(index = 0; index < toDos.length; index++)
    {
        if(toDos[index].item === req.body.editItem)
            {
                reqIndex = index;
                break;
            }
    }
    toDos.splice(reqIndex,1);
    subToDos.splice(reqIndex,1);
    res.status(204).send();
});

app.post('/update',(req,res) =>{
    let reqIndex = req.body.index;
    let value = req.body.editItem;
    toDos.splice(reqIndex , 1, {item : value});
    res.status(204).send();
});

app.post('/update_sub_todo',(req,res) => {
    let index = req.body.index;
    subToDos[index].items = req.body.subToDo.split(",");
    res.status(204).send();
});

app.get("/mainToDos",(req,res) => res.json(toDos));
app.get("/subToDos",(req,res) => res.json(subToDos));

app.listen(5100, () => console.log("running"));