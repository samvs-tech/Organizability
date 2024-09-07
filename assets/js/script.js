// Create variables to select the form items 
const taskNameInput = document.querySelector('#taskNameInput');
const taskDescriptionInput = document.querySelector('#taskDescriptionInput');
const taskPriorityInput = document.querySelector('#taskPriority_input');
const taskInfoSubmit = document.querySelector('#taskInfoSubmit');

// Create an event listener for the submit button 
taskInfoSubmit.addEventListener('click', function (event) {
    // Prevent default submission 
    event.preventDefault();
    // Create an object out of the user's input
    const taskSubmission = {
        taskNameInput: taskNameInput.value,
        taskDescriptionInput: taskDescriptionInput.value,
        taskPriorityInput: taskPriority_input.value
    };
    // Convert the object to a string and store it
    localStorage.setItem('taskSubmission', JSON.stringify(taskSubmission));

});



