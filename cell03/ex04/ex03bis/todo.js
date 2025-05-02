let itemCount = 0;

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift());
}

function setCookie(name, value, days = 365) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

function saveTodoList() {
  const todos = [];
  $(".todo-item").each(function () {
    todos.push($(this).contents().get(0).nodeValue.trim());
  });
  setCookie("todoList", JSON.stringify(todos));
}

function loadTodoList() {
  const todoList = getCookie("todoList");
  if (todoList) {
    const todos = JSON.parse(todoList);
    todos.reverse().forEach(todo => addItem(todo, false));
  }
}

function addItem(text = null, save = true) {
  const input = $("#textfield");
  const todoText = text || input.val().trim();
  if (todoText === "") return;

  itemCount++;
  const todoItem = $(`<div class="todo-item" id="todo-${itemCount}"></div>`);
  const textNode = document.createTextNode(todoText);
  const removeBtn = $("<button>Remove</button>");

  removeBtn.on("click", function () {
    const confirmation = confirm("Are you sure you want to remove this TO DO?");
    if (confirmation) {
      todoItem.remove();
      saveTodoList();
    }
  });

  todoItem.append(textNode, removeBtn);
  $("#todoList").prepend(todoItem);

  if (!text) input.val("");
  if (save) saveTodoList();
}

$(document).ready(function () {
  $("#addbtn").on("click", function () {
    addItem();
  });

  loadTodoList();
});
