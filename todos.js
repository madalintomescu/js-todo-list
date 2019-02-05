'use strict';

let form = document.getElementById('todos-form');
let ul = document.getElementById('todos-ul');

form.addEventListener('submit', submitForm);
document.addEventListener('change', checkTodo);
document.addEventListener('click', removeTodo);

let todos = [];

if (!localStorage.todos) {
  localStorage.setItem('todos', JSON.stringify(todos));
}

todos = JSON.parse(localStorage.todos);

displayTodos();

function addTodo(text, completed = false) {
  let id = todos.length;
  todos.push({id, text, completed});
  createTodoListItem(id, text, completed, true);
}

function createTodoListItem(id, text, completed, isNew = false) {
  let li = document.createElement('li');

  // Add an animation for newly created todos
  if (isNew) {
    li.classList.add('new-todo');
  }

  li.innerHTML += `<label>
  <input type="checkbox" class="checkbox" ${completed && 'checked'}>
  <span class="todo-text" id="${id}">${text}</span>
  <button type="button" class="remove-todo-btn"></button>
  </label>`;

  ul.appendChild(li);

  li.addEventListener('animationend', function() {
    li.removeAttribute('class');
  });
}

function displayTodos() {
  for (let todo of todos) {
    createTodoListItem(todo.id, todo.text, todo.completed);
  }
  document.querySelector('#todos-count').textContent = todos.length;
}

function submitForm(event) {
  event.preventDefault();

  let todo = document.getElementById('add-todo-input').value.trim();

  if (todo) {
    addTodo(todo);

    localStorage.setItem('todos', JSON.stringify(todos));
    document.querySelector('#todos-count').textContent = todos.length;
    document.getElementById('add-todo-input').value = '';
  }
}

function checkTodo(event) {
  if (event.target.classList.contains('checkbox')) {
    let itemId = event.target.nextElementSibling.id;
    let todo = todos.find(todo => todo.id == itemId);

    todo.completed = !todo.completed;
    localStorage.setItem('todos', JSON.stringify(todos));
  }
}

function removeTodo(event) {
  if (event.target.classList.contains('remove-todo-btn')) {
    let itemId = event.target.previousElementSibling.id;
    let todoIndex = todos.findIndex(todo => todo.id == itemId);

    todos.splice(todoIndex, 1);
    localStorage.setItem('todos', JSON.stringify(todos));

    let li = event.target.parentElement.parentElement;
    li.classList.add('remove-todo');

    li.addEventListener('animationend', function() {
      li.parentElement.removeChild(li);
    });

    document.querySelector('#todos-count').textContent = todos.length;
  }
}
