const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

var toDos = []
const app = express();
app.use(express.static(path.join(__dirname,"public")));
app.use(bodyParser.urlencoded({ extended: true }))

app.post("/add_item",(req,res) => {
    let found = toDos.some((toDo) => { return (toDo.item === req.body.item)});
    if(!found){
        toDos.push(req.body);
    }
    res.status(204).send();
});

app.post("/delete_item",(req,res) => {
    let reqIndex = -1;
    for(index = 0; index < toDos.length; index++)
    {
        if(toDos[index].item === req.body.editItem)
            {
                console.log("in if");
                reqIndex = index;
                break;
            }
    }
    toDos.splice(reqIndex,1);
    res.status(204).send();
});

app.post('/update',(req,res) =>{
    let reqIndex = req.body.index;
    let value = req.body.editItem;
    toDos.splice(reqIndex , 1);
    toDos.splice(reqIndex, 0 , {item : value});
    res.status(204).send();
});

app.get("/toDoList",(req,res) => res.json(toDos));

app.listen(5400, () => console.log("running"));