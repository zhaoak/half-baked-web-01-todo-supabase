import {
    checkAuth,
    createTodo,
    completeTodo,
    getTodos,
    logout,
    deleteAllTodos,
} from '../fetch-utils.js';
import { renderTodo } from '../render-utils.js';

checkAuth();

const todosEl = document.querySelector('.todos');
const todoForm = document.querySelector('.todo-form');
const logoutButton = document.querySelector('#logout');
const deleteButton = document.querySelector('.delete-button');

// create todo state
let todoList = [];

todoForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(todoForm);

    // on submit, create a todo, reset the form, and display the todos
    await createTodo(formData.get('todo'));
    todoList = await getTodos();
    await displayTodos();
    todoForm.reset();
});

// add async complete todo handler function
async function handleComplete(id) {
    // call completeTodo
    await completeTodo(id);
    // swap out todo in array
    todoList = await getTodos();
    // call displayTodos
    await displayTodos();
}

async function displayTodos() {
    // clear the container (.innerHTML = '')
    todosEl.innerHTML = '';
    // display the list of todos,
    for (let todo of todoList) {
        // call render function, pass in state and complete handler function!
        // append to .todos
        todosEl.append(await renderTodo(todo, handleComplete, todo.id));
    }
}

// add page load function
window.addEventListener('load', async () => {
    // fetch the todos and store in state
    todoList = await getTodos();
    // call displayTodos
    await displayTodos();
});

logoutButton.addEventListener('click', () => {
    logout();
});

deleteButton.addEventListener('click', async () => {
    // delete all todos
    await deleteAllTodos();
    // modify state to match
    todoList = await getTodos();
    // re displayTodos
    await displayTodos();
});
