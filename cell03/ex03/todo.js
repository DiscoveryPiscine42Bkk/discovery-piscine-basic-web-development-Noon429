let itemCount = 0;

// Utility to get cookies
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return decodeURIComponent(parts.pop().split(';').shift());
}

// Utility to set cookies
function setCookie(name, value, days = 365) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

// Save current list to cookie
function saveTodoList() {
    const todos = [];
    document.querySelectorAll(".todo-item").forEach(item => {
        todos.push(item.firstChild.textContent); // Get the text content
    });
    setCookie("todoList", JSON.stringify(todos)); // Save as a JSON string
}

// Load list from cookie
function loadTodoList() {
    const todoList = getCookie("todoList");
    if (todoList) {
        const todos = JSON.parse(todoList);
        todos.reverse().forEach(todo => addItem(todo, false)); // Reverse to maintain order
    }
}

function addItem(text = null, save = true) {
    const input = document.getElementById("textfield");
    const todoText = text || input.value.trim();
    if (todoText === "") return;

    itemCount++;

    const todoList = document.getElementById("todoList");

    // Create a new todo item container
    const todoItem = document.createElement("div");
    todoItem.className = "todo-item";
    todoItem.id = `todo-${itemCount}`;

    // Create the text node for the todo item
    const textNode = document.createTextNode(todoText);

    // Create a button to remove the todo item
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.onclick = () => {
        const confirmation = confirm("Are you sure you want to remove this TO DO?");
        if (confirmation) {
            todoItem.remove(); // Permanently remove from DOM
            saveTodoList(); // Update the saved list in the cookie
        }
    };

    // Append the text and remove button to the todo item
    todoItem.appendChild(textNode);
    todoItem.appendChild(removeBtn);

    // Prepend the new todo item to the list (so it appears at the top)
    todoList.prepend(todoItem);

    // Clear the input field if it's empty
    if (!text) input.value = "";

    // Save the todo list if the "text" argument is not provided (for manual addition)
    if (save) saveTodoList();
}

// Load saved list on page load
window.onload = loadTodoList;
