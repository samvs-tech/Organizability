// Create variables to select the form items 
const taskNameInput = document.querySelector('#taskNameInput');
const taskDescriptionInput = document.querySelector('#taskDescriptionInput');
const taskPriorityInput = document.querySelector('#taskPriority_input');
const taskInfoSubmit = document.querySelector('#taskInfoSubmit');

function TaskEntry(taskName, description, priority) {
    this.taskName = taskName;
    this.description = description;
    this.priority = priority;
}


// Create an event listener for the submit button 
taskInfoSubmit.addEventListener('click', function (event) {
    // Prevent default submission 
    event.preventDefault();
    //create variables that have the value of each input field
    const taskName = taskNameInput.value;
    const descriptionInput = taskDescriptionInput.value;
    const priorityInput = taskPriorityInput.value;

    // if either the name or description field are not filled in,
    // alerts the following message
    if (!taskName || !descriptionInput ) {
        alert("Please fill out all fields")
    } else {
        // creates a new object with name Entry
        const Entry = new TaskEntry(taskName, descriptionInput, priorityInput);
        // gets the current array of objects from the local storage
        currentTasks = JSON.parse(localStorage.getItem('TaskSubmissions'));
        // if there aren't any current tasks, creates a new blank array.
        if (!currentTasks) {
            currentTasks = []
        }
        // pushes the new entry object into the array of tasks
        currentTasks.push(Entry);
        // stores the updated list of tasks back in the local storage.
        localStorage.setItem('TaskSubmissions', JSON.stringify(currentTasks));
    }
})





