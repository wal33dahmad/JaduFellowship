
//Select the Elements
const clear = document.querySelector(".clear");
const list = document.getElementById("list");
const input = document.getElementById("input");
const dateElement = document.getElementById("date");

//Classes names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// Variables
let LIST, id;

// get item from localstorage
let data = localStorage.getItem("Todo");

// check if data is not empty
if(data){
    LIST = JSON.parse(data);
    id = LIST.length; // set the id to the last one in the list
    loadList(LIST); // load the list to the user interface
}else{
    // if data isn't empty
    LIST = [];
    id = 0;
}

// load items to the user's interface
function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

//clear local storage
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
})

//Show todays date
const options = {weekday : "long", month:"short", day:"numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString('en-US', options);

// add todo function

function addToDo(toDo, id, done, trash){

    if (trash) {  return;  }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const text = `<li class="item">
                        <i class="fa ${DONE}" job="complete" id="${id}"></i>
                        <p class="text ${LINE}"> ${toDo} </p>
                        <i class="de fa fa-trash-o" job="delete" id="${id}"></i>    
                    </li>`

    const position = "beforeend";

    list.insertAdjacentHTML(position,text);
};

//add item to the list using enter key

document.addEventListener("keyup",function(event){
    if (event.keyCode == 13) {
        const toDo = input.value;

        if (toDo) {
            addToDo(toDo, id, false, false);

            LIST.push(
                {
                    name: toDo,
                    id: id,
                    done: false,
                    trash: false
                });

                // add item to local Storage
                localStorage.setItem("Todo", JSON.stringify(LIST));
                
                id++;
            }
            input.value = "";
        }
});

// Complete Todo
function completeToDo(element) {
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    LIST[element.id].done = LIST[element.id].done ? false : true;
}

//Remove a Todo
function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
}

// target items created dynamically
list.addEventListener("click", function(event) {
    const element = event.target; //returned the clicked item
    const elementJob = element.attributes.job.value; //complete or delete

    if (elementJob == "complete") {
        completeToDo(element);
    }else if(elementJob == "delete"){
        removeToDo(element);
    }
    // add item to local Storage
    localStorage.setItem("Todo", JSON.stringify(LIST));
});

// // Store a Todo




// //Update Todo

