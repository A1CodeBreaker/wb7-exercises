"use strict"

const todoInputEl = document.getElementById('todoInput');
const goBtnEl = document.getElementById('goBtn');
const todoEl = document.getElementById('todo');

goBtnEl.addEventListener('click', () => {
    const todoId = todoInputEl.value;
    const url = `https://jsonplaceholder.typicode.com/todos/${todoId}`;
    fetch(url)
      .then((response) => response.json())
      .then((todo) => {
        todoEl.innerHTML = todo.title;
      });
  });