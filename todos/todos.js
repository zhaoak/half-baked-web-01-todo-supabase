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
    createTodo(formData.get('todo'));
    await displayTodos();
});

// add async complete todo handler function
// call completeTodo
// swap out todo in array
// call displayTodos

async function displayTodos() {
    todoList = await getTodos();
    // clear the container (.innerHTML = '')
    todosEl.innerHTML = '';
    // display the list of todos,
    for (let todo of todoList) {
        // call render function, pass in state and complete handler function!
        // append to .todos
        todosEl.append(renderTodo(todo, 'to do, ironically'));
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
    // modify state to match
    // re displayTodos
});
