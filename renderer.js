const inputEntry = document.getElementById("new-task-input");
const tasksContainer = document.getElementById("task-container");
const checkIconSource = "images/flower.png";
const deleteIconSource = "images/close.png";

// JSON Loading
const fs = require('fs');
const path = 'tasks.json';

if (!fs.existsSync(path)) {
    fs.writeFileSync(path, '[]', 'utf-8'); // Create an empty array if file doesn't exist
}

const jsonString = fs.readFileSync('tasks.json', 'utf-8');
let data = JSON.parse(jsonString);
data.forEach(task => {
    const id = task.id;
    const taskTitle = task.title;
    const isCompleted = task.completed;

    createTask(id, taskTitle, isCompleted);
});

function createTask(id, taskTitle, isCompleted) {
    const newTask = document.createElement("div");
        newTask.className = "task";
        newTask.setAttribute("completed", isCompleted.toString());

        const checkIcon = document.createElement("img");
        checkIcon.src = checkIconSource;
        checkIcon.className = "check-icon";
        checkIcon.setAttribute("id", id.toString());
        checkIcon.addEventListener("click", function(event) {
            const taskDiv = event.target.parentElement;
            completeTaskToggle(taskDiv, id);
        });

        const taskText = document.createElement("p");
        taskText.textContent = taskTitle;
        taskText.className = "task-title";

        const deleteIcon = document.createElement("img");
        deleteIcon.src = deleteIconSource;
        deleteIcon.className = "delete-icon";
        deleteIcon.addEventListener("click", function() {
            const taskDiv = event.target.parentElement;
            tasksContainer.removeChild(taskDiv);
            removeTaskFromJSON(id);
            // Show welcome message if no tasks left
            if (tasksContainer.querySelectorAll('.task').length === 0) {
                showWelcomeMessage();
            }
        });

        newTask.appendChild(checkIcon);
        newTask.appendChild(taskText);
        newTask.appendChild(deleteIcon);
        
        tasksContainer.appendChild(newTask);
}

function addTaskToJSON(id, title, completed) {
    let data = JSON.parse(jsonString);
    data.push({ id: id, title: title, completed: completed });
    fs.writeFileSync('tasks.json', JSON.stringify(data, null, 2), 'utf-8');
}

function removeTaskFromJSON(id) {
    let data = JSON.parse(fs.readFileSync('tasks.json', 'utf-8'));
    data = data.filter(task => task.id !== id);
    fs.writeFileSync('tasks.json', JSON.stringify(data, null, 2), 'utf-8');
}

function updateTaskInJSON(id, completed) {
    let data = JSON.parse(fs.readFileSync('tasks.json', 'utf-8'));
    data.forEach(task => {
        if (task.id === id) {
            task.completed = completed;
        }
    });
    fs.writeFileSync('tasks.json', JSON.stringify(data, null, 2), 'utf-8');
}

// Create welcome message element
const welcomeMessage = document.createElement("h3");
welcomeMessage.innerText = "Add your first task ♡";
welcomeMessage.setAttribute("id", "intro-text");

// Show welcome message if no tasks exist on load
if (tasksContainer.querySelectorAll('.task').length === 0) {
    tasksContainer.appendChild(welcomeMessage);
}

function showWelcomeMessage() {
    if (!document.getElementById("intro-text")) {
        tasksContainer.appendChild(welcomeMessage);
    }
}

function removeWelcomeMessage() {
    const introText = document.getElementById("intro-text");
    if (introText && introText.parentNode) {
        introText.parentNode.removeChild(introText);
    }
}

function addTask () {
    removeWelcomeMessage();

    if (inputEntry.value !== "") {        
        const taskTitle = inputEntry.value.trim();

        createTask(Date.now(), taskTitle, false);
        inputEntry.value = "";

        addTaskToJSON(Date.now(), taskTitle, false);
    }
}

function completeTaskToggle(task, id) {
    const isCompleted = task.getAttribute("completed") === "true";
    if (isCompleted) {
        task.setAttribute("completed", "false");
        updateTaskInJSON(id, false);
    } else {
        task.setAttribute("completed", "true");
        updateTaskInJSON(id, true);
    }
}