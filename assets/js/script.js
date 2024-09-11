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

function buildTasks (currentTask) {

    const taskName = currentTask.taskName;
    const description = currentTask.description;
    const priority = currentTask.priority;

    // these variables create the element when used
    const divCreate1 = document.createElement('div');
    const divCreate2 = document.createElement('div');
    const headercreate = document.createElement('h5');
    const paragraphCreate = document.createElement('p');
    const buttonCreate1 = document.createElement('button');
    const buttonCreate2 = document.createElement('button');

    // selects which section the task will be put in depending on the value of 
    // its input priority.
    const PriorityCard = document.querySelector(`#${priority}`);
  

    // creates the first div element underneadth the squarebox
    // based on the priority input for the task.
    PriorityCard.children[0].appendChild(divCreate1);
    // gives the created div the card class
    divCreate1.setAttribute('class', 'card');
    
    // creates another child div 
     // gives the class 'card body'
    divCreate1.appendChild(divCreate2);
    divCreate2.setAttribute('class', 'card-body');

    // creates the h5 header inside the card-body div 
    // gives the header the class of card-title
    divCreate2.appendChild(headercreate);

    headercreate.setAttribute('class', 'card-title');

    //creates a p tag under the card-body div
    // with the class card-text.
    divCreate2.appendChild(paragraphCreate);
    paragraphCreate.setAttribute('class', 'card-text');

    // creates a button underneath the card-body div,
    // this button has the classes btn-close, and text-reset
    // this will eventually be made into the mark complete button
    // and will remove the task from the page
    divCreate2.appendChild(buttonCreate1);
    buttonCreate1.setAttribute('class', 'btn-close text-reset')

    // this is another button created undernead the card-body div
    // it only has the class of button, but the plan is to make it an edit
    // button using a modal if there is time.
    divCreate2.appendChild(buttonCreate2);
    buttonCreate2.setAttribute('class', 'btn')

    // this sets the header and the description to have the same text,
    // as the input entered into the object.
    headercreate.textContent = taskName;
    paragraphCreate.textContent = description;
}




function sortTasks () {
    currentTasks = JSON.parse(localStorage.getItem('TaskSubmissions'))

    // this for loop causes the buildtasks to iterate over each object in the
    // currentTasks array. It will sort and build out each card for its 
    // corresponding task.
    for (let i = 0; i < currentTasks.length; i++) {
        buildTasks(currentTasks[i]);
        }
    }



// when the page finishes loading, this calls the sortTasks fuction and builds
// the cards for each task.
window.addEventListener("load", sortTasks(currentTasks));


