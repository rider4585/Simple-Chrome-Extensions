// JavaScript code for navigation item click functionality
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

// document.addEventListener('DOMContentLoaded', function () {
//   document.querySelector('main').style.height = `calc(100dvh - ${document.querySelector('footer').clientHeight})`;
// })