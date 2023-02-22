const todoButton = document.querySelector(".todo-icon");
const todoContainer = document.querySelector(".todo__container");
const todoList = document.querySelector(".todo__list");
const todoInput = document.querySelector(".todo__input");

let tasks = !localStorage.tasks ? [] : JSON.parse(localStorage.getItem('tasks'));

function showToDoList() {
    todoContainer.classList.toggle("_active");
}

function deleteTask(e) {
    e.target.parentNode.remove();
    tasks[e.target.id].completed = true;
}

function createElementNewTask(task) {
    const taskLabel = document.createElement('label');
    const taskCheckbox = document.createElement('input');
    taskLabel.classList.add("todo__label");
    taskCheckbox.type = "checkbox";
    taskCheckbox.id = task.id;
    taskCheckbox.classList.add("todo__checkbox");
    taskCheckbox.checked = task.completed;
    taskCheckbox.addEventListener('change', (e) => deleteTask(e));
    taskLabel.append(taskCheckbox);
    taskLabel.append(task.description);
    todoList.append(taskLabel);
}

function addNewTask(event) {
    if (event.code === 'Enter') {
        const task = { id: tasks.length, description: todoInput.value, completed: false };
        console.log(task);
        createElementNewTask(task);
        tasks.push(task);
        todoInput.blur();
        todoInput.value = "";
    }
}

function setLocalStorege() {
    tasks = tasks.filter(item => !item.completed);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

window.addEventListener("beforeunload", setLocalStorege);

tasks.forEach(task => createElementNewTask(task));

todoButton.addEventListener("click", showToDoList);
todoInput.addEventListener('keypress', addNewTask);