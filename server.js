const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let tasks = [];

// Получение списка всех задач
app.get('/tasks', (req, res) => {
    res.status(200).json(tasks);
});

// Добавление новой задачи
app.post('/tasks', (req, res) => {
    const { title } = req.body;
    if (title) {
        const newTask = { id: tasks.length + 1, title, completed: false };
        tasks.push(newTask);
        res.status(201).json(newTask);
    } else {
        res.status(400).send('Title is required');
    }
});

// Удаление задачи
app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    tasks = tasks.filter(task => task.id !== parseInt(id));
    res.status(200).send('Task deleted successfully');
});

// Обновление статуса задачи
app.patch('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;
    const task = tasks.find(task => task.id === parseInt(id));
    if (task) {
        task.completed = completed;
        res.status(200).json(task);
    } else {
        res.status(404).send('Task not found');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
