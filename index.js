const todoInput = document.querySelector('.todo-input');
const todoBtn = document.querySelector('.todo-btn');
const todoList = document.querySelector('.form-output');

todoBtn.addEventListener("click", clickBtn);

function clickBtn(e) {
    e.preventDefault();
    console.log(e);
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