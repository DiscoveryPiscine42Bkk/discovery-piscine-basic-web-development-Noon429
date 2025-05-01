let itemCount = 0;

// Utility: Get cookie by name
function getCookie(name) {
  const cookies = document.cookie.split('; ');
  for (const cookie of cookies) {
    const [key, val] = cookie.split('=');
    if (key === name) return decodeURIComponent(val);
  }
  return null;
}

// Utility: Set cookie
function setCookie(name, value, days = 365) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

// Save list items to cookie
function saveTodoList() {
  const todos = [];
  $(".todo-item").each(function () {
    todos.push($(this).contents().get(0).nodeValue.trim());
  });
  setCookie("todoList", JSON.stringify(todos));
}

// Load list from cookie
function loadTodoList() {
  const todoList = getCookie("todoList");
  if (todoList) {
    try {
      const todos = JSON.parse(todoList);
      todos.reverse().forEach(todo => addItem(todo, false)); // maintain insertion order
    } catch (e) {
      console.error("Invalid cookie data:", e);
    }
  }
}

// Add item to the DOM
function addItem(text = null, save = true) {
  const input = $("#textfield");
  const todoText = text || input.val().trim();
  if (todoText === "") return;

  itemCount++;

  const $todoItem = $("<div></div>")
    .addClass("todo-item")
    .attr("id", `todo-${itemCount}`)
    .text(todoText);

  const $removeBtn = $("<button>Remove</button>").on("click", function () {
    $todoItem.remove();
    saveTodoList();
  });

  $todoItem.append($removeBtn);
  $("#todoList").prepend($todoItem);

  if (!text) input.val("");

  if (save) saveTodoList();
}

// On page load
$(document).ready(function () {
  $("#addbtn").on("click", () => addItem());
  loadTodoList();
});
