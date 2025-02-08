document.addEventListener('DOMContentLoaded', () => {
    const newTaskInput = document.getElementById('new-task');
    const addTaskButton = document.getElementById('add-task');
    const tasksList = document.getElementById('tasks');
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-btn');

    // Load tasks from localStorage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function renderTasks() {
        tasksList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = 'task-item';
            li.innerHTML = `
                <span>${task}</span>
                <button onclick="deleteTask(${index})">Delete</button>
            `;
            tasksList.appendChild(li);
        });
    }

    function addTask() {
        const newTask = newTaskInput.value.trim();
        if (newTask) {
            tasks.push(newTask);
            newTaskInput.value = '';
            saveTasks();
            renderTasks();
        }
    }

    function deleteTask(index) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }

    function searchTasks() {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredTasks = tasks.filter(task => 
            task.toLowerCase().includes(searchTerm)
        );
        renderFilteredTasks(filteredTasks);
    }

    function renderFilteredTasks(filteredTasks) {
        tasksList.innerHTML = '';
        filteredTasks.forEach((task) => {
            const li = document.createElement('li');
            li.className = 'task-item';
            li.innerHTML = `
                <span>${task}</span>
                <button onclick="deleteTask(${tasks.indexOf(task)})">Delete</button>
            `;
            tasksList.appendChild(li);
        });
    }

    addTaskButton.addEventListener('click', addTask);
    newTaskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });

    searchButton.addEventListener('click', searchTasks);
    searchInput.addEventListener('keyup', searchTasks);

    // Initial render
    renderTasks();

    // Hero section animation
    const heroElements = document.querySelectorAll('.hero > *:not(.hero-image)');
    heroElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = `opacity 0.5s ease ${index * 0.2}s, transform 0.5s ease ${index * 0.2}s`;
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 100 + (index * 200));
    });
});