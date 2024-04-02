const tasksContainer = document.querySelector(".tasks-container");
const openAddBtn = document.querySelector(".open-add-btn");
const inputForm = document.querySelector(".form-container");
const taskBox = document.querySelector(".task-box");
const subTaskInput = document.querySelector(".sub-task-input");
const navDateLeft = document.querySelector(".nav-btn-left");
const navDateRight = document.querySelector(".nav-btn-right");
const dateEl = document.querySelector(".date");

let subTasksForms;
let task;
let deleteTask = "";

const subTasks = document.querySelector(".sub-tasks-container");

let tasksArr = [];
let taskList = [];
let date = new Date();
const id = generateId(date);

dateEl.innerText = id;

function generateId(date) {
  const day = date.getDate().toString().padStart(2, 0);
  const month = (date.getMonth() + 1).toString().padStart(2, 0);
  const year = date.getFullYear().toString().padStart(2, 0);
  return `${day}/${month}/${year}`;
}

const loadTasks = function (currentId) {
  let tasks = localStorage.getItem(currentId);
  let permanentTasks = localStorage.getItem("tasks");
  if (tasks) {
    tasksArr = JSON.parse(tasks);
  } else if (permanentTasks && id === currentId) {
    tasksArr = JSON.parse(permanentTasks);
  } else {
    tasksArr = [];
  }

  if (permanentTasks && id === currentId) {
    taskList = JSON.parse(permanentTasks);
  }

  tasksArr.forEach((task) => {
    generateTaskHTML(task.taskContent, task.taskImg, task.subTasks);
  });
  task = document.querySelectorAll(".task");
  task.forEach((t) => {
    t.addEventListener("click", function () {
      t.closest(".task-box").classList.toggle("open");
    });
  });

  subTasksForms = document.querySelectorAll(".sub-task-form");
};

loadTasks(id);

openAddBtn.addEventListener("click", function () {
  inputForm.classList.remove("hidden--add-task");
  this.classList.add("hidden");
});

function generateTaskHTML(taskContent, taskImg, subTasks) {
  let html = `
        <div class="task-box">
            <div class="task">
              <div class="img-container">
                <img
                  src="${taskImg}"
                  alt="task image"
                  class="task-img"
                />
              </div>
              <p class="content">${taskContent}</p>
              <div class="task-btn-container">
                <button class="remove-btn--task btn--task">
                 <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-trash task-icon"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"
                    />
                    <path
                      d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"
                    />
                  </svg>
                </button>
              </div>
           </div>
           <div class="sub-tasks-container">
           <form class="sub-task-form">
             <input class="sub-task-input" type="text" required />
             <button class="add-btn--task btn--task">
               <svg
                 xmlns="http://www.w3.org/2000/svg"
                 width="16"
                 height="16"
                 fill="currentColor"
                 class="bi bi-plus-circle task-icon"
                 viewBox="0 0 16 16"
               >
                 <path
                   d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"
                 />
                 <path
                   d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"
                 />
               </svg>
             </button>
           </form>
           <div class="sub-tasks" >
           
           
  `;

  subTasks.forEach((subTask) => {
    html += generateSubTaskHTML(subTask.subTask, subTask.completed);
  });

  html += ` </div>  
        </div>
      </div>`;

  tasksContainer.insertAdjacentHTML("afterbegin", html);
}

function generateSubTaskHTML(taskContent, completed) {
  const html = `
    <div class="sub-task">
      <input type="checkbox" class="checkbox" ${completed ? "checked" : ""} />
      <span>${taskContent}</span>
    </div>
  `;
  return html;
}

inputForm.addEventListener("submit", function (e) {
  e.preventDefault();
  this.classList.add("hidden--add-task");
  openAddBtn.classList.remove("hidden");

  // Storing User Input in Variables
  const taskContent = this.querySelector("#input-task");
  const taskImg = this.querySelector("#input-img");

  // Adding task to an array and displaying it
  tasksArr.push({
    taskContent: taskContent.value,
    taskImg: taskImg.value,
    subTasks: [],
  });

  taskList.push({
    taskContent: taskContent.value,
    taskImg: taskImg.value,
    subTasks: [],
  });

  localStorage.setItem(id, JSON.stringify(tasksArr));
  localStorage.setItem("tasks", JSON.stringify(taskList));
  generateTaskHTML(taskContent.value, taskImg.value, []);

  task = document.querySelectorAll(".task");

  task[tasksArr.length - 1].addEventListener("click", function () {
    this.closest(".task-box").classList.toggle("open");
  });

  // Resetting the input
  taskContent.value = "";
  taskImg.value = "";
});

subTasksForms.forEach((subTaskForm) => {
  subTaskForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const subTask = this.querySelector(".sub-task-input");
    const parentTask =
      this.closest(".task-box").querySelector(".content").innerText;

    // Finding Parent Tasks object in tasksArr
    const taskObj = tasksArr.find((task) => {
      return task.taskContent === parentTask;
    });

    const taskListObj = taskList.find((task) => {
      return task.taskContent === parentTask;
    });

    // Adding the inputted subTask to it's parent task's object in the tasks Array
    taskObj.subTasks.push({
      subTask: subTask.value,
      completed: false,
    });

    taskListObj.subTasks.push({
      subTask: subTask.value,
      completed: false,
    });
    // Changing the Object in the local Storage
    localStorage.setItem(id, JSON.stringify(tasksArr));
    localStorage.setItem("tasks", JSON.stringify(taskList));
    // Creating Subtask's HTML and displaying it
    const html = generateSubTaskHTML(subTask.value);
    this.closest(".sub-tasks-container")
      .querySelector(".sub-tasks")
      .insertAdjacentHTML("afterbegin", html);

    subTask.value = "";
  });
});

document.querySelectorAll(".checkbox").forEach((checkbox) => {
  checkbox.addEventListener("click", function () {
    const parentTask = checkbox
      .closest(".task-box")
      .querySelector(".content").innerText;

    const parentSubTask = checkbox
      .closest(".sub-task")
      .querySelector("span").innerText;
    const parentTaskObj = tasksArr.find((task) => {
      return task.taskContent === parentTask;
    });
    const subTaskObj = parentTaskObj.subTasks.find((subTask) => {
      return subTask.subTask === parentSubTask;
    });

    subTaskObj.completed = !subTaskObj.completed;
    localStorage.setItem(id, JSON.stringify(tasksArr));
  });
});

document.querySelectorAll(".remove-btn--task").forEach((removeBtn) => {
  removeBtn.addEventListener("click", function () {
    document.querySelector(".confirmation").classList.remove("hidden");
    deleteTask = this.closest(".task-box");
  });
});

document
  .querySelector(".remove-confirmation-btn")
  .addEventListener("click", function () {
    tasksArr = tasksArr.filter((task) => {
      return (
        task.taskContent !== deleteTask.querySelector(".content").innerText
      );
    });
    taskList = taskList.filter((task) => {
      return (
        task.taskContent !== deleteTask.querySelector(".content").innerText
      );
    });

    localStorage.setItem(id, JSON.stringify(tasksArr));
    localStorage.setItem("tasks", JSON.stringify(taskList));

    deleteTask.classList.add("hidden");
    document.querySelector(".confirmation").classList.add("hidden");
  });
document
  .querySelector(".remove-deny-btn")
  .addEventListener("click", function () {
    document.querySelector(".confirmation").classList.add("hidden");
    deleteTask = "";
  });

navDateLeft.addEventListener("click", function () {
  date = new Date(Number(date) - 24 * 60 * 60 * 1000);
  previousId = generateId(date);
  dateEl.innerText = previousId;

  tasksContainer.innerHTML = "";
  loadTasks(previousId);
});

navDateRight.addEventListener("click", function () {
  date = new Date(Number(date) + 24 * 60 * 60 * 1000);
  futureId = generateId(date);
  dateEl.innerText = futureId;
  tasksContainer.innerHTML = "";

  loadTasks(futureId);
});
