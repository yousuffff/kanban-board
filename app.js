const coloumns = document.querySelectorAll(".task-col");
const todoColoumn = document.getElementById("todo");
const addCount = document.getElementById("task-count");
// console.log(coloumns);
const sumbitBtn = document.getElementById("submit");
const modal = document.querySelector(".modal");
const bgModal = document.querySelector(".bg");
const addTaskBtn = document.querySelector(".btn-addTask");
const tasks = document.querySelectorAll(".task");
// console.log(tasks);
let savedTask = {};
let dragElement = null;

// Load saved tasks from localStorage
function loadTasks() {
  savedTask = JSON.parse(localStorage.getItem("tasks")) || {};

  Object.keys(savedTask).forEach((columnId) => {
    const column = document.getElementById(columnId);

    savedTask[columnId].forEach((task) => {
      addTask(task.title, task.des, column);
    });
  });

  updateTaskCount();
}
loadTasks();

// Save task to localStorage
function saveAllTasks() {
  savedTask = {};

  coloumns.forEach((col) => {
    const columnId = col.id;
    const tasks = col.querySelectorAll(".task");

    savedTask[columnId] = [];

    tasks.forEach((task) => {
      savedTask[columnId].push({
        title: task.querySelector("h3").innerText,
        des: task.querySelector("p").innerText,
      });
    });
  });

  localStorage.setItem("tasks", JSON.stringify(savedTask));
}

function addTask(title, des, coloumn) {
  const taskDiv = document.createElement("div");
  taskDiv.classList.add("task");
  taskDiv.setAttribute("draggable", "true");
  taskDiv.innerHTML = `<h3>${title}</h3>
    <p>${des}</p>
    <button class="delete-btn">Delete</button>`;
  coloumn.appendChild(taskDiv);
  taskDiv.setAttribute("draggable", "true");
}

function updateTaskCount() {
  coloumns.forEach((col) => {
    const taskLength = col.querySelectorAll(".task").length;
    // console.log(taskLength);
    const count = col.querySelector(".task-count");
    if (count) count.textContent = taskLength;
    return;
  });
}

document.addEventListener("dragstart", (e) => {
  if (!e.target.classList.contains("task")) return;
  dragElement = e.target;
  e.target.classList.add("dragging");
});
document.addEventListener("dragend", (e) => {
  if (e.target.classList.contains("task"))
    e.target.classList.remove("dragging");
});
coloumns.forEach((coloumn) => {
  coloumn.addEventListener("dragover", (e) => {
    e.preventDefault();
    coloumn.classList.add("hover");
  });
  coloumn.addEventListener("dragleave", (e) => {
    coloumn.classList.remove("hover");
  });
  coloumn.addEventListener("drop", (e) => {
    // console.log("dropped", dragElement, coloumn);
    coloumn.appendChild(dragElement);
    coloumn.classList.remove("hover");
    saveAllTasks();
    updateTaskCount();
  });
});

addTaskBtn.addEventListener("click", () => {
  modal.classList.add("active");
  document.getElementById("task-title").focus();
});
bgModal.addEventListener("click", () => {
  modal.classList.remove("active");
});

sumbitBtn.addEventListener("click", () => {
  const title = document.getElementById("task-title").value.trim();
  const des = document.getElementById("title-des").value.trim();

  if (!title || !des) return;
  addTask(title, des, todoColoumn);
  saveAllTasks();

  modal.classList.remove("active");
  document.getElementById("task-title").value = "";
  document.getElementById("title-des").value = "";
  updateTaskCount();
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const task = e.target.closest(".task");
    task.remove();
  }
  saveAllTasks();
  updateTaskCount();
});
