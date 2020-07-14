var items;

function renderData()
{
    var request = new XMLHttpRequest();
    request.open("GET","http://localhost:5500/ToDos");
    request.onload = function(){
        items = JSON.parse(this.response);
        updateUI();
    }
    request.send();
}

function add()
{
    document.getElementById("item").value = document.getElementById("temporary").value;
    document.getElementById("temporary").value = "";
}

function updateUI()
{
    let elements = "";
    for(let index = 0; index < items.length; index++)
    {
        elements += "<div id ='div"+index+"'>";
        elements += "<form style='float:left;' method='POST' action='/delete_item'>";
        elements += "<button class='del' onclick='this.form.submit()'>Delete</button>"
        elements += "<span onclick='addSubToDoToUI("+index+")'>Add sub ToDos</span>";
        elements += "<input hidden type='text' name='editItem' value='"+items[index].toDo+"'></form>";
        elements += "<form method='POST' action='/update'>";
        elements += "<input type='text' id='editItem"+index+"' name='editItem' value='"+items[index].toDo+"' onchange='this.form.submit()'>";
        elements += "<input hidden type = 'text' name ='oldText' value='"+items[index].toDo+"'> <br></form>";

        if(items[index].subToDos.length != 0)
        {
            elements += "<div><form method='POST' action='/update_sub_todo'>";
            elements += "<input type='text' id='sub"+index+"' class='subToDo' name='subToDo' value='"+items[index].subToDos+"'>";
            elements += "<button class='del update' onclick='this.form.submit()'>Add/Update Sub To-Dos</button>";
            elements += "<input hidden type='text' name='mainToDo' value='"+items[index].toDo+"'></form></div>";
        }
        elements += "<br></div>";
    }
    document.getElementById("items").innerHTML = elements;
}

function addSubToDoToUI(index)
{
    if(items[index].subToDos.length == 0)
    {
        let elements = "";
        elements += "<div><form method='POST' action='/update_sub_todo'>";
        elements += "<input type='text' id='sub"+index+"' class='subToDo' name='subToDo' placeholder='Enter Sub To-Dos'>";
        elements += "<button class='del update' onclick='this.form.submit()'>Add/Update Sub To-Dos</button>";
        elements += "<input hidden type='text' name='mainToDo' value='"+items[index].toDo+"'></form></div>";
        document.getElementById("div"+index).innerHTML += elements;
    }
}