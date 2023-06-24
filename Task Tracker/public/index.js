// JavaScript code for navigation item click functionality
let taskList = {};
let numberOfTasksAvailable = 0;
const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('section');

navItems.forEach(item => {
  item.addEventListener('click', handleNavItemClick);
});

function handleNavItemClick(event) {
  event.preventDefault();

  const clickedNavItem = event.currentTarget;
  if (!clickedNavItem.classList.contains('active')) {
    const activeNavItem = document.querySelector('.nav-item.active');
    activeNavItem.classList.remove('active');
    clickedNavItem.classList.add('active');
    const sectionId = clickedNavItem.getAttribute('href');
    scrollToSection(sectionId);
  }
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
const tasksNavItem = document.querySelector('.nav-item[href="#tasks"]');
tasksNavItem.classList.add('active');
scrollToSection(tasksNavItem.getAttribute('href'));

document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('#tasks').setAttribute('style', `height: calc(100dvh - (${document.querySelector('footer').clientHeight}px + 40px))`);
  document.querySelector('#ideas').setAttribute('style', `height: calc(100dvh - (${document.querySelector('footer').clientHeight}px + 40px))`);
})


let subTasksCount = 1;

function addSubTask() {
  const subTasksContainer = document.getElementById('sub-tasks-container');

  const subTaskInput = document.createElement('input');
  subTaskInput.type = 'text';
  subTaskInput.name = `subTask${subTasksCount}`;
  subTaskInput.className = 'subTask removeSubTask';

  subTasksContainer.appendChild(subTaskInput, subTasksContainer.lastElementChild);
  subTasksContainer.lastChild.focus();
  document.querySelector('.form').scrollBy(0, document.querySelector('.form').scrollHeight);

  subTasksCount++;
}

function openPopup() {
  document.querySelector('.task-modal').classList.remove('hide');
}

function closePopup() {
  document.querySelector('.task-modal').classList.add('hide');
}

function saveTask() {
  let taskUniqueId = numberOfTasksAvailable + 1;
  let taskData = {};
  let taskName = document.querySelector('#task-name').value;
  let taskDescription = document.querySelector('#task-description').value;
  if (taskName !== "") {
    taskData['taskName'] = taskName;
    taskData['description'] = taskDescription
    taskData['toDoList'] = getToDoList();
    taskList[taskUniqueId] = taskData;
    createTask(taskList[taskUniqueId], taskUniqueId);
  }

  numberOfTasksAvailable++;
  resetAddTaskPopup();
  document.querySelector('.task-modal').classList.add('hide');
}

function getToDoList() {
  let subTaskObject = {};
  let SubTaskInputs = document.querySelectorAll('.subTask');
  for (let index = 0; index < SubTaskInputs.length; index++) {
    if (SubTaskInputs[index].value !== "") {
      subTaskObject[index] = SubTaskInputs[index].value;
    }
  }
  return subTaskObject;
}

function createTask(taskData, id) {
  let taskName = taskData['taskName'];
  const taskContainer = document.querySelector('.task-list');

  const taskCardTemplate = document.createElement('details');
  taskCardTemplate.className = `task-${id}`;


  const taskCardTitle = document.createElement('summary');
  taskCardTitle.innerText = taskName;

  const taskDescription = document.createElement('p');
  taskDescription.textContent = taskData['description'];

  const taskList = document.createElement('ol')

  for (const task in taskData['toDoList']) {
    if (Object.hasOwnProperty.call(taskData['toDoList'], task)) {
      const taskItem = document.createElement('li');
      taskItem.innerText = taskData['toDoList'][task];
      taskList.appendChild(taskItem);
    }
  }

  taskCardTemplate.appendChild(taskCardTitle);
  taskCardTemplate.appendChild(taskDescription);
  taskCardTemplate.appendChild(taskList);
  // taskCardTemplate.innerText = "hi";

  taskContainer.appendChild(taskCardTemplate, taskContainer.lastElementChild);
  // document.querySelector('.').scrollBy(0, document.querySelector('.form').scrollHeight);

}

function resetAddTaskPopup() {
  document.querySelector('#task-name').value = "";
  document.querySelector('#task-description').value = "";
  document.querySelector('.subTask').value = "";
  let allSubTasks = document.querySelectorAll('.removeSubTask');
  allSubTasks.forEach(element => {
    element.remove();
  });
}