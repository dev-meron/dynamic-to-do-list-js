// Run code after DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage and render them
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // don't double-save while rendering
    }

    // Save tasks array to Local Storage
    function saveTasks(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Get tasks array from Local Storage
    function getTasks() {
        return JSON.parse(localStorage.getItem('tasks') || '[]');
    }

    // Create a task list item and optionally save to Local Storage
    function addTask(taskTextOrEvent, save = true) {
        // Support calling via button/Enter (no args) OR with text (load/render)
        let taskText;
        if (typeof taskTextOrEvent === 'string') {
            taskText = taskTextOrEvent.trim();
        } else {
            taskText = taskInput.value.trim();
        }

        // Prevent empty tasks
        if (taskText === "") {
            alert("Please enter a task!");
            return;
        }

        // Create list item
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = "Remove";
        removeBtn.className = "remove-btn";

        // Remove task when button clicked (also update Local Storage)
        removeBtn.onclick = () => {
            taskList.removeChild(li);

            const tasks = getTasks().filter(t => t !== taskText);
            saveTasks(tasks);
        };

        // Append button to list item and list item to task list
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Save new task if requested
        if (save) {
            const tasks = getTasks();
            tasks.push(taskText);
            saveTasks(tasks);
        }

        // Clear input if we added from input
        if (typeof taskTextOrEvent !== 'string') {
            taskInput.value = "";
        }
    }

    // Add task on button click
    addButton.addEventListener('click', addTask);

    // Add task on Enter key press
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask(event);
        }
    });

    // Initialize: load tasks from Local Storage
    loadTasks();
});
