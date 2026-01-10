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

let dragElement = null;

document.addEventListener("dragstart", (e) => {
  if (e.target.classList.contains("task")) dragElement = e.target;
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
    updateTaskCount();
  });
});

function updateTaskCount() {
  coloumns.forEach((col) => {
    const taskLength = col.querySelectorAll(".task").length;
    console.log(taskLength);
    const count = col.querySelector(".task-count");
    if (count) count.textContent = taskLength;
    return;
  });
}

addTaskBtn.addEventListener("click", () => {
  modal.classList.add("active");
});
bgModal.addEventListener("click", () => {
  modal.classList.remove("active");
});

sumbitBtn.addEventListener("click", () => {
  const title = document.getElementById("task-title").value.trim();
  const des = document.getElementById("title-des").value.trim();

  if (!title || !des) return;

  const taskDiv = document.createElement("div");
  taskDiv.classList.add("task");
  taskDiv.setAttribute("draggable", "true");
  taskDiv.innerHTML = `<h3>${title}</h3>
    <p>${des}</p>
    <button class="delete-btn">Delete</button>`;

  todoColoumn.appendChild(taskDiv);

  modal.classList.remove("active");
  document.getElementById("task-title").value = "";
  document.getElementById("title-des").value = "";
  updateTaskCount();
});
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const task = e.target.closest("task");
    task.remove();
  }
  updateTaskCount();
});
