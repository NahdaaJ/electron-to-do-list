const inputEntry = document.getElementById("new-task-input");
const tasksContainer = document.getElementById("task-container");
const checkIconSource = "images/flower.png";
const deleteIconSource = "images/close.png";


// document.querySelectorAll(".check-icon").forEach(function(icon) {
//     icon.addEventListener("click", function(event) {
//         const taskDiv = event.target.parentElement;
//         completeTaskToggle(taskDiv);
//     });
// });

function addTask () {
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