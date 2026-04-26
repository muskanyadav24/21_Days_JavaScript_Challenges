document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    const taskCountSpan = document.getElementById('task-count');
    const clearAllBtn = document.getElementById('clear-all');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Initialize
    renderTasks();

    // Add Task
    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = todoInput.value.trim();
        if (text) {
            const newTask = {
                id: Date.now(),
                text: text,
                completed: false
            };
            tasks.push(newTask);
            saveTasks();
            todoInput.value = '';
            renderTasks();
        }
    });

    // Handle Task List Actions (Event Delegation)
    todoList.addEventListener('click', (e) => {
        const target = e.target;
        const taskItem = target.closest('.task-item');
        if (!taskItem) return;

        const id = parseInt(taskItem.dataset.id);

        // Toggle Complete
        if (target.closest('.task-checkbox')) {
            toggleComplete(id);
        }

        // Delete Task
        if (target.closest('.btn-delete')) {
            deleteTask(id);
        }

        // Edit Task
        if (target.closest('.btn-edit')) {
            startEdit(taskItem, id);
        }
    });

    // Clear All
    clearAllBtn.addEventListener('click', () => {
        if (confirm('Clear all tasks?')) {
            tasks = [];
            saveTasks();
            renderTasks();
        }
    });

    function toggleComplete(id) {
        tasks = tasks.map(task => 
            task.id === id ? { ...task, completed: !task.completed } : task
        );
        saveTasks();
        renderTasks();
    }

    function deleteTask(id) {
        tasks = tasks.filter(task => task.id !== id);
        saveTasks();
        renderTasks();
    }

    function startEdit(taskItem, id) {
        const textSpan = taskItem.querySelector('.task-text');
        const currentText = textSpan.innerText;
        const actionsDiv = taskItem.querySelector('.task-actions');
        
        // Hide actions during edit
        actionsDiv.style.opacity = '0';
        actionsDiv.style.pointerEvents = 'none';

        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'edit-input';
        input.value = currentText;
        
        textSpan.replaceWith(input);
        input.focus();

        const saveEdit = () => {
            const newText = input.value.trim();
            if (newText && newText !== currentText) {
                tasks = tasks.map(task => 
                    task.id === id ? { ...task, text: newText } : task
                );
                saveTasks();
            }
            renderTasks();
        };

        input.addEventListener('blur', saveEdit);
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') saveEdit();
            if (e.key === 'Escape') renderTasks();
        });
    }

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function renderTasks() {
        todoList.innerHTML = '';
        
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.className = `task-item ${task.completed ? 'completed' : ''}`;
            li.dataset.id = task.id;
            
            li.innerHTML = `
                <div class="task-checkbox ${task.completed ? 'checked' : ''}">
                    <i class="fas fa-check"></i>
                </div>
                <span class="task-text">${task.text}</span>
                <div class="task-actions">
                    <button class="action-btn btn-edit" title="Edit">
                        <i class="fas fa-pen-to-square"></i>
                    </button>
                    <button class="action-btn btn-delete" title="Delete">
                        <i class="fas fa-trash-can"></i>
                    </button>
                </div>
            `;
            todoList.appendChild(li);
        });

        const pendingCount = tasks.filter(t => !t.completed).length;
        taskCountSpan.innerText = `${pendingCount} task${pendingCount !== 1 ? 's' : ''} pending`;
    }
});
