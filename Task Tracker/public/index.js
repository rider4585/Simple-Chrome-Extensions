// JavaScript code for navigation item click functionality
let taskList = {};
const taskModal = document.querySelector('.task-modal');
const deleteModal = document.querySelector('.delete-modal');
const navItems = document.querySelectorAll('.nav-item');
const activeNavItem = document.querySelector('.nav-item.active');
const tasksNavItem = document.querySelector('.nav-item[href="#tasks"]');
const tasksSection = document.querySelector('#tasks');
const ideasNavItem = document.querySelector('.nav-item[href="#ideas"]');
const ideasSection = document.querySelector('#ideas');
const sections = document.querySelectorAll('section');
const emptyTaskListView = document.querySelector('.empty-task-list');
const taskListContainer = document.querySelector('.task-list');
const taskInfoForm = document.querySelector('.form');
const taskNameInput = document.querySelector('#task-name');
const taskDescriptionInput = document.querySelector('#task-description');
const oneToDoItem = document.querySelector('.subTask');
const firstToDoItem = document.querySelector('#subTasks');
const toDoListContainer = document.querySelector('#sub-tasks-container');
const footer = document.querySelector('footer');
const deleteBtn = document.querySelector('.delete-btn');
const updateBtn = document.querySelector('.update-btn');
const saveBtn = document.querySelector('.save-btn');


navItems.forEach(item => {
  item.addEventListener('click', handleNavItemClick);
});

function handleNavItemClick(event) {
  event.preventDefault();

  const clickedNavItem = event.currentTarget;

  console.log(navItems.length);
  for (const element of navItems) {
    if (element.classList.contains('active')) {
      element.classList.remove('active');
    }
  }

  clickedNavItem.classList.add('active');
}

// JavaScript code for smooth scrolling to sections
function scrollToSection(sectionId) {
  const section = document.querySelector(sectionId);
  section.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
}

// Set the initial active state of the "Tasks" navigation item and scroll to the corresponding section

tasksNavItem.classList.add('active');
scrollToSection(tasksNavItem.getAttribute('href'));

document.addEventListener('DOMContentLoaded', function () {
  tasksSection.setAttribute('style', `height: calc(100dvh - (${footer.clientHeight}px + 40px))`);
  ideasSection.setAttribute('style', `height: calc(100dvh - (${footer.clientHeight}px + 40px))`);
  isThereIsNoTask(taskList);
})


let subTasksCount = 1;

function isThereIsNoTask(taskList) {
  if (Object.keys(taskList).length !== 0) {
    emptyTaskListView.classList.add('hide');
    taskListContainer.classList.remove('hide')
  } else {
    emptyTaskListView.classList.remove('hide');
    taskListContainer.classList.add('hide');
  }
}

function addNewTask() {
  taskModal.classList.remove('hide');

  if (saveBtn.classList.contains('hide')) {
    saveBtn.classList.remove('hide');
  }
  if (!updateBtn.classList.contains('hide')) {
    updateBtn.classList.add('hide');
  }
}

function closePopup(popupName) {
  if (popupName == 'task-modal') {
    resetAddTaskPopup();
    taskModal.classList.add('hide');
  } else if (popupName == 'delete-modal') {
    deleteModal.classList.add('hide');
  }
}

function addSubTask() {
  const subTasksContainer = toDoListContainer;

  const subTaskInput = document.createElement('input');
  subTaskInput.type = 'text';
  subTaskInput.name = `subTask${subTasksCount}`;
  subTaskInput.className = 'subTask removeSubTask';

  subTasksContainer.appendChild(subTaskInput, subTasksContainer.lastElementChild);

  subTasksContainer.lastChild.focus();
  taskInfoForm.scrollBy(0, taskInfoForm.scrollHeight);

  subTasksCount++;
}

function getToDoList() {
  let subTaskObject = {};
  let allToDoItems = document.querySelectorAll('.subTask');
  let SubTaskInputs = allToDoItems;
  for (let index = 0; index < SubTaskInputs.length; index++) {
    if (SubTaskInputs[index].value !== "") {
      subTaskObject[index] = SubTaskInputs[index].value;
    }
  }
  return subTaskObject;
}

function saveNewTask() {
  let taskName = taskNameInput.value;
  let taskDescription = taskDescriptionInput.value;
  if (taskName) {
    let taskId = generateUniqueId(taskName);
    taskList[taskId] = {};
    taskList[taskId]['taskName'] = taskName;
    taskList[taskId]['description'] = taskDescription;
    taskList[taskId]['toDoList'] = getToDoList();
    generateTaskListView(taskList);
  }
  isThereIsNoTask(taskList);

  resetAddTaskPopup();

  taskModal.classList.add('hide');
}

function generateUniqueId(taskName) {
  let taskUniqueId = taskName.trim();
  taskUniqueId = taskUniqueId.replace(/\s+/g, '-');
  taskUniqueId = taskUniqueId.toLowerCase();
  return taskUniqueId;
}

function generateTaskListView(taskList) {
  let taskContainer = taskListContainer;
  taskContainer.innerHTML = "";

  // Logic to create views here
  for (const task in taskList) {
    let taskName = taskList[task]['taskName'];

    let taskCardTemplate = document.createElement('details');
    taskCardTemplate.className = task;

    const taskCardTitle = document.createElement('summary');
    taskCardTitle.innerHTML = `${taskName}<div class="edit-icons">
    <i class="fas fa-edit" onclick="editTask('${task}')"></i>
    <i class="fas fa-trash" onclick="deleteTask('${task}')"></i>
    </div>`;

    const taskDescription = document.createElement('p');
    taskDescription.textContent = taskList[task]['description'];

    const toDoList = document.createElement('ol');

    for (const toDo in taskList[task]['toDoList']) {
      if (Object.hasOwnProperty.call(taskList[task]['toDoList'], toDo)) {
        const taskItem = document.createElement('li');
        taskItem.innerText = taskList[task]['toDoList'][toDo];
        toDoList.appendChild(taskItem);
      }
    }

    taskCardTemplate.appendChild(taskCardTitle);
    taskCardTemplate.appendChild(taskDescription);
    taskCardTemplate.appendChild(toDoList);
    taskContainer.appendChild(taskCardTemplate);
  }
}

function resetAddTaskPopup() {
  let removeToDoItems = document.querySelectorAll('.removeSubTask');
  taskNameInput.value = "";
  taskDescriptionInput.value = "";
  oneToDoItem.value = "";
  let allSubTasks = removeToDoItems;
  if (allSubTasks) {
    allSubTasks.forEach(element => {
      element.remove();
    });
  }
  subTasksCount = 1;
}

function deleteTask(taskName) {
  deleteModal.classList.remove('hide');
  deleteBtn.setAttribute('data-content', taskName);
}

function confirmDeleteTask(e) {
  let taskToDelete = e.target.getAttribute('data-content');
  delete taskList[taskToDelete];
  closeDeletePopup();
  generateTaskListView(taskList);
  isThereIsNoTask(taskList);
}

function closeDeletePopup() {
  closePopup('delete-modal');
}

function editTask(taskName) {

  taskModal.classList.remove('hide');

  if (!saveBtn.classList.contains('hide')) {
    saveBtn.classList.add('hide');
  }
  if (updateBtn.classList.contains('hide')) {
    updateBtn.classList.remove('hide')
  }

  fillTaskData(taskName);

}

function fillTaskData(taskId) {
  taskNameInput.value = taskList[taskId]['taskName'];

  if (taskList[taskId]['description']) {
    taskDescriptionInput.value = taskList[taskId]['description'];
  }

  if (Object.keys(taskList[taskId]['toDoList']).length !== 0) {
    let numberOfToDoItems = Object.keys(taskList[taskId]['toDoList']).length - 1;
    for (let index = 0; index < numberOfToDoItems; index++) {
      addSubTask();
    }

    let allToDoItems = document.querySelectorAll('.subTask');

    for (let index = 0; index < allToDoItems.length; index++) {
      allToDoItems[index].value = taskList[taskId]['toDoList'][index];
    }
  }
  updateBtn.setAttribute('data-content', taskId);
  taskInfoForm.scrollTop = 0;
}

function updateTask(e) {
  let taskToUpdate = e.target.getAttribute('data-content');

  if (taskNameInput.value) {
    taskList[taskToUpdate]['taskName'] = taskNameInput.value;
    taskList[taskToUpdate]['description'] = taskNameInput.value;
    taskList[taskToUpdate]['toDoList'] = getToDoList();
    generateTaskListView(taskList);
  }
  resetAddTaskPopup();
  taskModal.classList.add('hide');
}