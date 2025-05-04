let inputBox = document.getElementById("input");
let taskItems = document.getElementById("listItems");

// Load tasks from localStorage on page load
window.onload = function () {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        createTaskElement(task.text, task.checked);
    });
};

function addTask() {
    let task = inputBox.value.trim();

    if (task === "") {
        alert("You must write something");
    } else {
        createTaskElement(task, false);
        saveTasksToLocalStorage();
        inputBox.value = ""; // clear the input
    }
}

function createTaskElement(taskText, isChecked) {
    let li = document.createElement("li");
    li.innerHTML = taskText;

    if (isChecked) {
        li.classList.add("checked");
    }

    // Toggle 'checked' class on clicking the task
    li.addEventListener("click", function () {
        li.classList.toggle("checked");
        saveTasksToLocalStorage();
    });

    let span = document.createElement("span");
    span.innerHTML = "✖";

    // Remove the task when the span is clicked
    span.addEventListener("click", function (event) {
        event.stopPropagation();
        li.remove();
        saveTasksToLocalStorage();
    });

    li.appendChild(span);
    taskItems.appendChild(li);
}

// Save all tasks to localStorage
function saveTasksToLocalStorage() {
    let tasks = [];
    let allTasks = taskItems.querySelectorAll("li");

    allTasks.forEach(li => {
        tasks.push({
            text: li.firstChild.textContent.trim(),
            checked: li.classList.contains("checked")
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}
