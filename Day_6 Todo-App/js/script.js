const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

addBtn.addEventListener('click', function() {
    const text = taskInput.value;

    if (text === "") {
        alert("Please enter a task!");
        return;
    }

    // Create a new list item
    const li = document.createElement('li');

    // Create a span for the text
    const span = document.createElement('span');
    span.innerHTML = text;
    span.classList.add('task-text');

    // Click on text to toggle completed
    span.onclick = function() {
        span.classList.toggle('completed');
    };

    // Create a delete button
    const delBtn = document.createElement('button');
    delBtn.innerHTML = "Delete";
    delBtn.classList.add('delete-btn');

    // Add event listener to delete button
    delBtn.onclick = function() {
        li.remove();
    };

    // Add elements to list item
    li.appendChild(span);
    li.appendChild(delBtn);

    // Add list item to the list
    taskList.appendChild(li);

    // Clear the input
    taskInput.value = "";
});

