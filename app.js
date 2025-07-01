'use strict';

const form = document.getElementById('form-input');

const tasks = [];

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const newTask = document.getElementById('task-input').value;
  console.log(newTask);
  tasks.push(newTask);
  console.log(tasks);
  document.getElementById('task-input').value = '';
})