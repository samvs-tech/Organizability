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

currentTasks = JSON.parse(localStorage.getItem('TaskSubmissions'));

function buildTasks () {

    
    if (!currentTasks) {
        currentTasks = []
    }



    const taskName = currentTasks.taskName;
    const description = currentTasks.description;
    const priority = currentTasks.priority;


    //need to delete the div with class squareBox in HTML.index
    const taskSquare = document.createElement('div');
    const divCreate1 = document.createElement('div');
    const divCreate2 = document.createElement('div');
    const headercreate = document.createElement('h5');
    const paragraphCreate = document.createElement('p');
    const buttonCreate1 = document.createElement('button');
    const buttonCreate2 = document.createElement('button');
    const PriorityCard = document.querySelector(`#${priority}`);


    
    PriorityCard.appendChild(taskSquare);
    taskSquare.setAttribute('class', 'squareBox');
    taskSquare.appendChild(divCreate1);
    divCreate1.setAttribute('class', 'card');
    divCreate1.appendChild(divCreate2);
    divCreate2.setAttribute('class', 'card-body');
    divCreate2.appendChild(headercreate);
    headercreate.setAttribute('class', 'card-title');
    headercreate.appendChild(buttonCreate);
    divCreate2.appendChild(paragraphCreate);
    paragraphCreate.setAttribute('class', 'card-text');
    divCreate2.appendChild(buttonCreate1);
    buttonCreate1.setAttribute('class', 'btn-close text-reset')
    divCreate2.appendChild(buttonCreate2);
    buttonCreate2.setAttribute('class', 'btn')
    headercreate.textContent = taskName;
    paragraphCreate.textContent = description;
}




function sortTasks () {
    // set the current tasks array to the locally stored tasks
    currentTasks = JSON.parse(localStorage.getItem('TaskSubmissions'))



    // currentTasks.priority.forEach(buildTasks);



    // look into using a map for just the priority value to sort by priority.
    for (let i = 0; i < currentTasks.length; i++) {
        buildTasks(currentTasks[i]);
        }
        
    }

window.addEventListener("load", sortTasks(currentTasks));


