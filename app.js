const coloumns = document.querySelectorAll(".task-col");
const todoColoumn = document.getElementById("todo");
// console.log(coloumns);
const sumbitBtn = document.getElementById("submit");
const modal = document.querySelector(".modal");
const bgModal = document.querySelector(".bg");
const addTaskBtn = document.querySelector(".btn-addTask");
const tasks = document.querySelectorAll(".task");
// console.log(tasks);

let dragElement = null;

tasks.forEach((task) => {
  task.addEventListener("drag", (e) => {
    e.preventDefault();
    dragElement = task;
  });
});

coloumns.forEach((coloumn) => {
  coloumn.addEventListener("dragover", (e) => {
    e.preventDefault();
    coloumn.classList.add("hover");
  });
  coloumn.addEventListener("drag", (e) => e.preventDefault());
  coloumn.addEventListener("dragleave", (e) => {
    e.preventDefault();
    coloumn.classList.remove("hover");
  });
  coloumn.addEventListener("drop", (e) => {
    e.preventDefault();
    console.log("dropped", dragElement, coloumn);
    coloumn.appendChild(dragElement);
    coloumn.classList.remove("hover");
  });
});

addTaskBtn.addEventListener("click", () => {
  modal.classList.toggle("active");
})

sumbitBtn.addEventListener("click", () => {
  const title = document.getElementById("task-title").value;
  const des = document.getElementById("title-des").value;

  if (title && des) {
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");
    taskDiv.setAttribute("draggable", "true");
    taskDiv.innerHTML = 
    `<h3>${title}</h3>
    <p>${des}</p>
    <button class="delete-btn">Delete</button>`;


    taskDiv.addEventListener("drag", (e) => {
      e.preventDefault();
      dragElement = taskDiv;
    })
    todoColoumn.appendChild(taskDiv);   
    
    modal.style.display = "none";
    document.getElementById("task-title").value = "";
    document.getElementById("title-des").value = "";
}else if(!title || !des){
    
  }
})
bgModal.addEventListener("click", () => {
  modal.classList.remove("active");
})


