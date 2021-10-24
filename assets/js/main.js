let taskObjects = null;
window.addEventListener("load", () => createSavedTasks());

function Task(id, text, isChecked) {
    this.id = id;
    this.text = text;
    this.isChecked = isChecked;
}

function createSavedTasks() {
    taskObjects = loadTasks();
    for (let task of taskObjects) {
        createTask(task);
    }
}

const saveTasks = (list) => localStorage.setItem("tasks", JSON.stringify(list));
const loadTasks = () => JSON.parse(localStorage.getItem("tasks")) || [];

const taskInputField = document.getElementById("input-task");
const addTaskBtn = document.getElementById("add-task-button");
const taskList = document.getElementById("task-list");

function addNewTask() {
    if (!taskInputField.value) return;

    let task = new Task(Date.now(), taskInputField.value, false);
    taskObjects.push(task);
    createTask(task);
    saveTasks(taskObjects);
    taskInputField.value = "";
}

function createTask(newTask) {
    // create li element
    let item = taskList.appendChild(document.createElement("li"));
    item.setAttribute("data-id", newTask.id);

    // create input element
    let input = item.appendChild(document.createElement("input"));
    input.type = "checkbox";
    input.checked = newTask.isChecked;
    input.addEventListener("click", (e) => toggleTask(e));

    // create span element
    let span = item.appendChild(document.createElement("span"));
    span.className = "task";
    span.innerText = newTask.text;

    // create button element
    let button = item.appendChild(document.createElement("button"));
    button.className = "delete-btn";
    button.innerText = "X";
    button.addEventListener("click", (e) => removeTask(e));
}

const removeTask = (e) => {
    let id = e.target.parentNode.getAttribute("data-id");
    taskObjects.forEach((task) => {
        if (task.id == id) {
            taskObjects.splice(taskObjects.indexOf(task), 1);
        }
    });
    saveTasks(taskObjects);
    e.currentTarget.parentNode.remove();
}

const toggleTask = (e) => {
    let id = e.target.parentNode.getAttribute("data-id");
    taskObjects.forEach((task) => {
        if (task.id == id) {
            task.isChecked = !task.isChecked;
        }
    });
    saveTasks(taskObjects);
}

addTaskBtn.addEventListener("click", addNewTask);