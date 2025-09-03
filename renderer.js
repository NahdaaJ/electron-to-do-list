const inputEntry = document.getElementById("new-task-input");
const tasksContainer = document.getElementById("task-container");
const checkIconSource = "images/flower.png";
const deleteIconSource = "images/close.png";

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

        const newTask = document.createElement("div");
        newTask.className = "task";
        newTask.setAttribute("completed", "false");

        const checkIcon = document.createElement("img");
        checkIcon.src = checkIconSource;
        checkIcon.className = "check-icon";
        checkIcon.addEventListener("click", function(event) {
            const taskDiv = event.target.parentElement;
            completeTaskToggle(taskDiv);
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
            // Show welcome message if no tasks left
            if (tasksContainer.querySelectorAll('.task').length === 0) {
                showWelcomeMessage();
            }
        });

        newTask.appendChild(checkIcon);
        newTask.appendChild(taskText);
        newTask.appendChild(deleteIcon);
        
        tasksContainer.appendChild(newTask);
        inputEntry.value = "";
    }
}

function completeTaskToggle(task) {
    const isCompleted = task.getAttribute("completed") === "true";
    if (isCompleted) {
        task.setAttribute("completed", "false");
    } else {
        task.setAttribute("completed", "true");
    }
}