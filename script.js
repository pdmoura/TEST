document.addEventListener('DOMContentLoaded', () => {
    const newTaskInput = document.getElementById('new-task-input');
    const addTaskButton = document.getElementById('add-task-button');
    const taskList = document.getElementById('task-list');
    const completedTasksList = document.getElementById('completed-tasks-list'); // For completed-tasks.html
    const clearAllButton = document.getElementById('clear-all-button');
    const clearCompletedButton = document.getElementById('clear-completed-button'); // For completed-tasks.html

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let completedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];

    // Function to save tasks to Local Storage
    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // Function to save completed tasks to Local Storage
    const saveCompletedTasks = () => {
        localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
    };

    // Function to render tasks on the main To-Do List page
    const renderTasks = () => {
        if (!taskList) return; // Exit if not on the main To-Do List page

        taskList.innerHTML = ''; // Clear current list
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.setAttribute('data-index', index);
            li.className = task.completed ? 'completed' : ''; // Add 'completed' class if task is done

            li.innerHTML = `
                <span class="task-text">${task.text}</span>
                <div>
                    <button class="complete-button">${task.completed ? 'Uncomplete' : 'Complete'}</button>
                    <button class="delete-button">Delete</button>
                </div>
            `;
            taskList.appendChild(li);
        });
    };

    // Function to render completed tasks on the Completed Tasks page
    const renderCompletedTasks = () => {
        if (!completedTasksList) return; // Exit if not on the completed tasks page

        completedTasksList.innerHTML = ''; // Clear current list
        completedTasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.setAttribute('data-index', index);
            li.innerHTML = `
                <span class="task-text">${task.text}</span>
                <button class="delete-completed-button">Delete</button>
            `;
            completedTasksList.appendChild(li);
        });
    };

    // Add a new task
    if (addTaskButton) {
        addTaskButton.addEventListener('click', () => {
            const taskText = newTaskInput.value.trim();
            if (taskText !== '') {
                tasks.push({ text: taskText, completed: false });
                newTaskInput.value = '';
                saveTasks();
                renderTasks();
            }
        });
    }

    // Handle clicks on task list (complete/delete)
    if (taskList) {
        taskList.addEventListener('click', (e) => {
            const li = e.target.closest('li');
            if (!li) return; // Not a list item

            const index = parseInt(li.getAttribute('data-index'));

            if (e.target.classList.contains('complete-button')) {
                const task = tasks[index];
                task.completed = !task.completed; // Toggle completed status

                if (task.completed) {
                    completedTasks.push(task); // Add to completed tasks list
                    tasks.splice(index, 1); // Remove from main tasks list
                } else {
                    // If uncompleted, it means it was previously moved from tasks to completedTasks
                    // This scenario is not directly handled by moving back to tasks array
                    // For simplicity, we assume tasks are completed and then moved.
                    // If you want to move them back, you'd need a different logic.
                }

                saveTasks();
                saveCompletedTasks();
                renderTasks(); // Re-render main list
                if (completedTasksList) renderCompletedTasks(); // Re-render completed list if on that page
            } else if (e.target.classList.contains('delete-button')) {
                tasks.splice(index, 1);
                saveTasks();
                renderTasks();
            }
        });
    }

    // Handle clearing all tasks from the main list
    if (clearAllButton) {
        clearAllButton.addEventListener('click', () => {
            if (confirm('Are you sure you want to clear all tasks? This cannot be undone.')) {
                tasks = [];
                saveTasks();
                renderTasks();
            }
        });
    }

    // Handle deleting from completed tasks list
    if (completedTasksList) {
        completedTasksList.addEventListener('click', (e) => {
            if (e.target.classList.contains('delete-completed-button')) {
                const li = e.target.closest('li');
                if (!li) return;
                const index = parseInt(li.getAttribute('data-index'));

                completedTasks.splice(index, 1);
                saveCompletedTasks();
                renderCompletedTasks();
            }
        });
    }

    // Handle clearing all completed tasks
    if (clearCompletedButton) {
        clearCompletedButton.addEventListener('click', () => {
            if (confirm('Are you sure you want to clear all completed tasks? This cannot be undone.')) {
                completedTasks = [];
                saveCompletedTasks();
                renderCompletedTasks();
            }
        });
    }

    // Hamburger menu functionality
    const hamButton = document.querySelector("#menu");
    const navigation = document.querySelector("nav ul"); // Target the ul directly

    if (hamButton && navigation) { // Check if elements exist before adding event listener
        hamButton.addEventListener("click", () => {
            navigation.classList.toggle("open");
            hamButton.classList.toggle("open");
        });
    }

    // Initial render when pages load
    renderTasks(); // Always try to render main tasks
    renderCompletedTasks(); // Always try to render completed tasks
});