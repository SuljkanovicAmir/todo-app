const addBtn = document.querySelector('.add-button');
const textInput = document.querySelector('.text-input');
const taskList = document.querySelector('.task-list');
const filterOption = document.querySelector('.select-todo');

document.addEventListener("DOMContentLoaded", getTodos)
addBtn.addEventListener('click', addTask); 
taskList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodos);


function addTask(e) {
    e.preventDefault();
    if (textInput.value == "") {
        alert("Field can't be empty'")
        return false;
    } else {
        const todoDiv = document.createElement('div');
            todoDiv.classList.add('todo');
        
        const newTask = document.createElement('LI');
            newTask.classList.add('new-task');
            newTask.textContent = textInput.value;
            todoDiv.appendChild(newTask);
            saveLocalStorage(textInput.value);

        const deleteBtn = document.createElement('button');
            deleteBtn.innerHTML = '<img src="./delete.svg"/>';
            deleteBtn.classList.add('delete-btn');
            todoDiv.appendChild(deleteBtn)

        const checkBtn = document.createElement('button');
            checkBtn.innerHTML = '<img src="./check-mark-line.svg"/>';
            checkBtn.classList.add('check-btn');
            todoDiv.appendChild(checkBtn)
        
            taskList.appendChild(todoDiv)
            clearInput();
    }
}

function deleteCheck(e) {
    let item = e.target;
    if (item.classList[0] === 'delete-btn') {
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeStorageTodos(todo);
        todo.addEventListener('transitionend', () => {
            todo.remove();
        });
    }

    if (item.classList[0] === 'check-btn') {
        let todo = item.parentElement;
        todo.classList.toggle('completed');
        
     }
}




function clearInput() {
    textInput.value = "";
}

function filterTodos(e) {
    const todos = taskList.childNodes;
    todos.forEach((todo) => {
        switch(e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed": 
            if (todo.classList.contains('completed')) {
                todo.style.display = "flex";
            } else  {
                todo.style.display = "none";
            }
            break;
            case "uncompleted": 
            if (todo.classList.contains('completed')) {
                todo.style.display = "none";
            } else  {
                todo.style.display = "flex";
            }
            break;
        }
    })
}

function saveLocalStorage(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}



function getTodos(){
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach((todo) => { 
        let todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
    
    let newTask = document.createElement('LI');
        newTask.classList.add('new-task');
        newTask.textContent = todo;
        todoDiv.appendChild(newTask);
       
    let deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '<img src="./delete.svg"/>';
        deleteBtn.classList.add('delete-btn');
        todoDiv.appendChild(deleteBtn)

    let checkBtn = document.createElement('button');
        checkBtn.innerHTML = '<img src="./check-mark-line.svg"/>';
        checkBtn.classList.add('check-btn');
        todoDiv.appendChild(checkBtn)
        taskList.appendChild(todoDiv)
    })
}

function removeStorageTodos(todo) {
    console.log('hello')
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}



