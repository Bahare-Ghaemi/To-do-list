const todoInput = document.querySelector('.todo-input');
const todoBtn = document.querySelector('.todo-btn');
const todoList = document.querySelector('.form-output');
document.addEventListener('DOMContentLoaded', getLocalTodo);


todoBtn.addEventListener("click", clickBtn);

function clickBtn(e) {
    e.preventDefault();
    // console.log(e);
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    const newTodo =
        `<li>${todoInput.value}</li>
    <span>
        <i class="fas fa-check-circle" style="color: #63d915;cursor: pointer;"></i>
        <i class="fas fa-trash" style="margin-left: 9px;color: #db2777;cursor: pointer;"></i>
    </span>`;
    todoDiv.innerHTML = newTodo;
    todoList.appendChild(todoDiv);
    saveLocalTodo(todoInput.value);
    todoInput.value = "";
}

todoList.addEventListener('click', checkTrash);

function checkTrash(e) {
    console.log(e);
    console.log(e.target);
    const classList = [...e.target.classList]; //tokenlist to array
    const item = e.target;
    if (classList[1] === 'fa-check-circle') {
        const todo = item.parentElement.parentElement; //.todo
        todo.classList.toggle('completed');
    } else if (classList[1] === 'fa-trash') {
        const todo = item.parentElement.parentElement;
        removeLocalTodo(todo);
        todo.remove();
    }
}

const filterTodo = document.querySelector('.filter-todo');

filterTodo.addEventListener('click', filterTodoFunc);

function filterTodoFunc(e) {
    filterChoice = e.target.value;
    const todoBoxs = [...todoList.childNodes]; //token to array
    todoBoxs.forEach((todoBox) => {
        switch (filterChoice) {
            case 'all':
                todoBox.style.display = 'flex';
                break;
            case 'completed':
                if (todoBox.classList.contains('completed')) {
                    todoBox.style.display = 'flex';
                } else {
                    todoBox.style.display = 'none';
                }
                break;

            case 'uncompleted':
                if (!todoBox.classList.contains('completed')) {
                    todoBox.style.display = 'flex';
                } else {
                    todoBox.style.display = 'none';
                }
                break;
        }
    });
}

//localStorage

function saveLocalTodo(todo) {
    let savedTodos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
    savedTodos.push(todo);
    console.log(savedTodos);
    localStorage.setItem('todos', JSON.stringify(savedTodos));
}

function getLocalTodo() {
    let savedTodos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
    savedTodos.forEach((todo) => {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        console.log(todo);
        const newTodo =
            `<li>${todo}</li>
            <span>
                <i class="fas fa-check-circle" style="color: #63d915;cursor: pointer;"></i>
                <i class="fas fa-trash" style="margin-left: 9px;color: #db2777;cursor: pointer;"></i>
            </span>`;
        todoDiv.innerHTML = newTodo;
        todoList.appendChild(todoDiv);
    })
}

function removeLocalTodo(todo) {
    let savedTodos = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : [];
    const filteredTodos = savedTodos.filter((todo1) => {
        todo1 !== todo.children[0].innerext;
    });
    localStorage.setItem('todos', JSON.stringify(filteredTodos));
}