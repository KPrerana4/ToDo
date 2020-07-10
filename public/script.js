var items = [];
var subToDos = [];
    function add()
    {
        let item = document.getElementById("tempItem").value;
        if(items.indexOf(item) == -1 && item != "")
        {
            items.push(item);
            subToDos.push([]);
            document.getElementById("item").value = document.getElementById("tempItem").value;
            document.getElementById("tempItem").value = "";
            updateUI();
        }
    }

    function deleteItem(event)
    {
        let id ="div"+event.target.id;
        document.getElementById(id).style.display = "none";
        items.splice(event.target.id,1);
        subToDos.splice(event.target.id,1);
        document.getElementById("delForm"+event.target.id).submit();
        updateUI();
    }

    function updateUI()
    {
        let elements = "";
        for(let index = 0; index < items.length; index++)
        {
            elements += "<div id ='div"+index+"'>";
            elements += "<form id='delForm"+index+"' style='float:left;' method='POST' action='/delete_item'>";
            elements += "<span id='"+index+"' class='del' onclick='deleteItem(event)'>Delete</span>";
            elements += "<span onclick='addSubToDoToUI("+index+")'>Add sub ToDos</span>";
            elements += "<input hidden type='text' name='editItem' value='"+items[index]+"'></form>";
            elements += "<form id='form"+index+"' method='POST' action='/update'>";
            elements += "<input type='text' id='editItem"+index+"' name='editItem' value='"+items[index]+"' onchange='updateItems("+index+")'>";
            elements += "<input hidden type ='text' name='index' value='"+index+"'>";
            elements += "<input hidden type = 'text' name ='oldText' value='"+items[index]+"'> <br></form>";

            if(subToDos[index].length != 0)
            {
                elements += "<div><form id='subForm"+index+"' method='POST' action='/update_sub_todo'>";
                elements += "<span class='normalText'>Sub To Dos:</span>";
                elements += "<input type='text' id='sub"+index+"' class='subToDo' name='subToDo' value='"+subToDos[index]+"'  onchange='updateSubToDo("+index+")'>";
                elements += "<input hidden type='text' name='index' value='"+index+"' <br>";
                elements += "<input hidden type='text' name='mainToDo' value='"+items[index]+"'></form></div>";
            }
            elements += "</div>";
        }
        document.getElementById("items").innerHTML = elements;
    }

    function updateItems(index)
    {
        items[index] = document.getElementById("editItem"+index).value;
        document.getElementById("form"+index).submit();
        updateUI();
    }

    function addSubToDoToUI(index)
    {
        if(subToDos[index].length == 0)
        {
            let elements = "";
            elements += "<div><form id='subForm"+index+"' method='POST' action='/update_sub_todo'>";
            elements += "<span class='normalText'>Sub To Dos:</span><input type='text' id='sub"+index+"' class='subToDo' name='subToDo'   onchange='updateSubToDo("+index+")'>";
            elements += "<input hidden type='text' name='index' value='"+index+"' <br>";
            elements += "<input hidden type='text' name='mainToDo' value='"+items[index]+"'></form></div>";
            document.getElementById("div"+index).innerHTML += elements;
        }
    }

    function updateSubToDo(index)
    {
        subToDos[index] = (document.getElementById("sub"+index).value).split(",");
        document.getElementById("subForm"+index).submit();
    }