const coloumns = document.querySelectorAll(".task-col");
// console.log(coloumns);

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
