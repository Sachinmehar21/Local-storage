// Selectors
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Load tasks and add event listener
document.addEventListener('DOMContentLoaded', () => {
  (JSON.parse(localStorage.getItem('tasks')) || []).forEach(task => addTask(task));
});

addTaskBtn.addEventListener('click', () => {
  const task = taskInput.value.trim();
  if (!task) return alert('Please enter a task');
  addTask(task, true);
  taskInput.value = '';
});

// Add task to UI and optionally save to Local Storage
function addTask(task, save = false) {
  const li = document.createElement('li');
  li.innerHTML = `${task} <button class="delete">Delete</button>`;
  
  li.querySelector('.delete').addEventListener('click', () => {
    li.remove();
    localStorage.setItem(
      'tasks',
      JSON.stringify(
        (JSON.parse(localStorage.getItem('tasks')) || []).filter(t => t !== task)
      )
    );
  });

  taskList.appendChild(li);

  if (save) {
    localStorage.setItem(
      'tasks',
      JSON.stringify([...(JSON.parse(localStorage.getItem('tasks')) || []), task])
    );
  }
}
