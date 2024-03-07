document.addEventListener('DOMContentLoaded', () => {
    displayTasks();
});

function addTask() {
    const newTask = document.getElementById('newTask').value;
    if (newTask) {
        const tasks = getTasks();
        tasks.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        document.getElementById('newTask').value = ''; // Очистка поля ввода
        displayTasks();
    }
}

function getTasks() {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

function displayTasks() {
    const tasks = getTasks();
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = ''; // Очистка списка
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Удалить';
        deleteButton.onclick = () => deleteTask(index);
        li.appendChild(deleteButton);
        taskList.appendChild(li);
    });
}

function deleteTask(index) {
    const tasks = getTasks();
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}
