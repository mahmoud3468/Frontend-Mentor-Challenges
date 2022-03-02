// APP STATE
const state = {
  todoItems: [],
  filterBy: "",
};

// ===== SELECTORS ===== //
// ==================== //
const form = document.querySelector("form");
const todoInput = document.querySelector(".todo-input");
const todoList = document.querySelector(".todo-list");
const itemsLeft = document.querySelector(".items-left");
const clearCompleted = document.querySelector(".clear-completed-btn");
const itemsFilter = document.querySelector(".items-filter");

// ====== EVENTS ====== //
// ==================== //
form.addEventListener("submit", addTodoItem);
todoList.addEventListener("click", toggleCompleted);
clearCompleted.addEventListener("click", deleteCompleted);
itemsFilter.addEventListener("click", setFilter);

// ===== FUNCTIONS ===== //
// ==================== //
function addTodoItem(e) {
  e.preventDefault();

  // Get the form data
  const inputValue = todoInput.value;
  const randomId = Date.now();

  // Store the form data in the state
  state.todoItems.push({
    id: randomId,
    content: inputValue,
    completed: false,
  });

  // Save the state object in local storage
  localStorage.setItem("todo-items", JSON.stringify(state.todoItems));

  todoInput.value = "";
  filterItems();
}

function toggleCompleted(e) {
  const curElement = e.target;
  const todoItem = e.target.parentElement;

  if (curElement.classList.contains("toggle")) {
    state.todoItems.map((item) => {
      if (item.id === +todoItem.dataset.id) item.completed = !item.completed;
    });
    todoItem.classList.toggle("completed");
  }

  // Delete the selected item
  if (curElement.classList.contains("trash-icon")) {
    const index = state.todoItems.findIndex(
      (el) => el.id === +todoItem.dataset.id
    );
    state.todoItems.splice(index, 1);
  }

  // Update the state object in local storage
  localStorage.setItem("todo-items", JSON.stringify(state.todoItems));

  // Re-render the todo items
  filterItems();
}

function deleteCompleted() {
  const newItems = state.todoItems.filter((item) => !item.completed);
  state.todoItems = newItems;

  // Update the state object in local storage
  localStorage.setItem("todo-items", JSON.stringify(state.todoItems));
  filterItems();
}

function filterItems() {
  // filter the items
  if (state.filterBy === "all") renderTodoItems();

  if (state.filterBy === "active") {
    const filteredItems = state.todoItems.filter((item) => !item.completed);
    renderTodoItems(filteredItems);
  }

  if (state.filterBy === "completed") {
    const filteredItems = state.todoItems.filter((item) => item.completed);
    renderTodoItems(filteredItems);
  }
}

function setFilter(e) {
  // set the filter value
  const currentElement = e.target.closest("li");
  if (!currentElement) return;
  state.filterBy = currentElement.innerHTML;

  // update the local storage
  localStorage.setItem("filter-by", JSON.stringify(state.filterBy));

  // remove active class from all elements
  this.querySelector(".active-item").classList.remove("active-item");
  // add active class to the current element
  currentElement.classList.add("active-item");

  filterItems();
}

function itemsLeftCounter() {
  const itemsCount = state.todoItems.filter((item) => !item.completed);
  itemsLeft.innerHTML = `${itemsCount.length} items left`;
}

function renderTodoItems(data = state.todoItems) {
  const markup = data
    .map((item) => {
      return `
        <li class="todo-item ${item.completed ? "completed" : ""}"
          data-id="${item.id}">
          <i class="toggle icon ${
            item.completed
              ? "fas fa-check check-icon"
              : "far fa-circle empty-icon"
          }"></i>
          <p class="toggle todo-content">${item.content}</p>
          <i class="trash-icon fas fa-trash-alt icon"></i>
        </li>
      `;
    })
    .join("");

  todoList.innerHTML = "";
  todoList.insertAdjacentHTML("afterbegin", markup);

  itemsLeftCounter();
}

function init() {
  // Get the filter value
  const localFilter = localStorage.getItem("filter-by");
  if (localFilter) state.filterBy = JSON.parse(localFilter);
  if (!localFilter) state.filterBy = "all";

  // Mark the cashed selecions as active
  document.querySelector(`.${state.filterBy}`).classList.add("active-item");

  // Get items out of localstorage
  const localItems = localStorage.getItem("todo-items");
  if (localItems) state.todoItems = JSON.parse(localItems);

  filterItems();
}
init();
