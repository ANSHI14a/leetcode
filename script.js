// Get stored data from local storage
let adminTasks = JSON.parse(localStorage.getItem('adminTasks')) || [];
let employeeTasks = JSON.parse(localStorage.getItem('employeeTasks')) || [];
let employeeRating = JSON.parse(localStorage.getItem('employeeRating')) || 0;

// Function to display admin tasks
function displayAdminTasks() {
    const taskListAdmin = document.getElementById('taskListAdmin');
    taskListAdmin.innerHTML = ''; // Clear existing tasks

    adminTasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${task} 
            <button onclick="assignToEmployee(${index})">Assign to Employee</button>
        `;
        taskListAdmin.appendChild(li);
    });
}

// Function to display employee tasks and rating
function displayEmployeeTasks() {
    const taskListEmployee = document.getElementById('taskListEmployee');
    taskListEmployee.innerHTML = ''; // Clear existing tasks

    employeeTasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${task.name} 
            <button onclick="markTask(${index}, 'done')">Mark as Done</button>
            <button onclick="markTask(${index}, 'notDone')">Mark as Not Done</button>
        `;
        taskListEmployee.appendChild(li);
    });

    // Display rating
    document.getElementById('employeeRating').innerText = employeeRating;
}

// Function for the admin to add a task
function assignTask() {
    const taskInput = document.getElementById('taskInput').value;
    if (taskInput) {
        adminTasks.push(taskInput);
        localStorage.setItem('adminTasks', JSON.stringify(adminTasks));
        displayAdminTasks();
    } else {
        alert('Please enter a task.');
    }
}

// Function to assign the task to the employee
function assignToEmployee(index) {
    const task = adminTasks[index];
    employeeTasks.push({ name: task, status: 'pending' });
    localStorage.setItem('employeeTasks', JSON.stringify(employeeTasks));
    adminTasks.splice(index, 1); // Remove task from admin side
    localStorage.setItem('adminTasks', JSON.stringify(adminTasks));
    displayAdminTasks();
    displayEmployeeTasks();
}

// Function to mark a task as done or not
function markTask(index, status) {
    const task = employeeTasks[index];
    if (status === 'done') {
        task.status = 'done';
        employeeRating += 1;
        // Check if the employee has completed 5 tasks
        if (employeeRating === 5) {
            alert('Congratulations! You have been promoted!');
        }
    } else {
        task.status = 'not done';
    }

    localStorage.setItem('employeeTasks', JSON.stringify(employeeTasks));
    localStorage.setItem('employeeRating', JSON.stringify(employeeRating));
    displayEmployeeTasks();
}

// Display tasks when the page loads
window.onload = function() {
    displayAdminTasks();
    displayEmployeeTasks();
};
