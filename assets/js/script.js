// Create variables to select the form items 
const taskNameInput = document.querySelector('#taskNameInput');
const taskDescriptionInput = document.querySelector('#taskDescriptionInput');
const taskPriorityInput = document.querySelector('#taskPriority_input');
const taskInfoSubmit = document.querySelector('#taskInfoSubmit');
const modalSave = document.getElementById('modalSave');


function TaskEntry(taskName, description, priority, id) {
    this.taskName = taskName;
    this.description = description;
    this.priority = priority;
    this.id = id;
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
    if (!taskName || !descriptionInput) {
        alert("Please fill out all fields")
    } else {
        // creates a new object with name Entry
        const id = new Date().getTime();

        const Entry = new TaskEntry(taskName, descriptionInput, priorityInput, id);
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
        location.reload();
    }
})

currentTasks = JSON.parse(localStorage.getItem('TaskSubmissions'));

function buildTasks(currentTask) {


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
    divCreate1.setAttribute('class', 'card m-3');
    divCreate1.setAttribute('data-id', currentTask.id);
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

    // this is another button created undernead the card-body div
    // it only has the class of button, but the plan is to make it an edit
    // button using a modal if there is time.
    divCreate2.appendChild(buttonCreate2);
    buttonCreate2.setAttribute('class', 'btn btn-primary send-modal');
    buttonCreate2.setAttribute('data-bs-toggle', 'modal');
    buttonCreate2.setAttribute('data-bs-target', '#modalTemplate');
    buttonCreate2.textContent = 'Edit';

    // creates a button underneath the card-body div,
    // this button has the classes btn-close, and text-reset
    // this will eventually be made into the mark complete button
    // and will remove the task from the page
    divCreate2.appendChild(buttonCreate1);
    buttonCreate1.setAttribute('class', `btn btn-close text-reset complete`);

    // this sets the header and the description to have the same text,
    // as the input entered into the object.
    headercreate.textContent = taskName;
    paragraphCreate.textContent = description;

}


function completeTaskListener() {
    // all button with the complete class are grouped in a list
    let completeButton = document.querySelectorAll(`.btn.btn-close.text-reset.complete`);
    // for each button, create a listener for any click, if clicked,
    // run the mark complete function

    completeButton.forEach(button => {

        button.addEventListener('click', event => {

            (markComplete(event))
        }

        )
    });
}

function markComplete(event) {
    // grab the array of objects from the local storage
    currentTasks = JSON.parse(localStorage.getItem('TaskSubmissions'))
    // grab the nearest card class by the button interacted wtih
    const task = event.currentTarget.closest('.card');

    // when the element exists, remove the task from the array
    if (task) {
        // grab the unique data id from the  targeted task
        const taskID = task.getAttribute('data-id');

        // create an empty array to push the objects we want remaining into
        const updatedTasks = [];
        // for loop, iterate over each object in the array, if the unique id does not 
        // match with the targeted id, we want to keep it and push it into our updated
        // array, the only one left out should be the targeted object.


        for (let i = 0; i < currentTasks.length; i++) {
            if (currentTasks[i].id !== parseInt(taskID)) {
                updatedTasks.push(currentTasks[i]);
            }
        }
        // currentTasks.id is a number and taskID is a string
        // converted currentTasks.id into a string so they are comparable.
        // it is keeping every object and I don't know why
        console.log(updatedTasks);

        //update the storage with our new array.
        localStorage.setItem('TaskSubmissions', JSON.stringify(updatedTasks));
        //recreate the cards
        location.reload();

    }
}


function updateTaskListener() {
    let editButton = document.querySelectorAll(`.btn.btn-primary.send-modal`);

    editButton.forEach(editButton => {

        editButton.addEventListener('click', event => { editTask(event) })
    });
}

function editTask(event) {

    currentTasks = JSON.parse(localStorage.getItem('TaskSubmissions'));

    const task = event.currentTarget.closest('.card');

    if (task) {

        const taskID = task.getAttribute('data-id');

        for (let i = 0; i < currentTasks.length; i++) {
            if (currentTasks[i].id === parseInt(taskID)) {

                const taskName = currentTasks[i].taskName;
                const description = currentTasks[i].description;
                const priority = currentTasks[i].priority;

                const currentTaskName = document.getElementById('currentTaskName');
                const currentTaskDescription = document.getElementById('currentTaskDescription');
                const currentTaskID = document.getElementById('currentTaskID');

                currentTaskName.textContent = taskName;
                currentTaskDescription.textContent = description;
                currentTaskID.textContent = taskID;

                console.log(currentTaskName);
                console.log(currentTaskDescription);

            }
        }
    }
}

modalSave.addEventListener('click', event => { saveTask(event) })

function saveTask(event) {

    currentTasks = JSON.parse(localStorage.getItem('TaskSubmissions'));

    const updatedTasks = [];

    const currentTaskID = document.getElementById('currentTaskID').textContent;
    const currentTaskName = document.getElementById('currentTaskName').textContent;
    const currentTaskPriorityInput = document.getElementById('currentTaskPriority_input').value;
    const updatedTaskDescription = document.getElementById('updatedTaskDescription').value;

    console.log(currentTaskID);
    console.log(currentTaskName);

    const editedTask = new TaskEntry(currentTaskName, updatedTaskDescription, currentTaskPriorityInput, parseInt(currentTaskID));

    for (let i = 0; i < currentTasks.length; i++) {
        if (currentTasks[i].id !== parseInt(currentTaskID)) {
            updatedTasks.push(currentTasks[i]);
        }
    }

    updatedTasks.push(editedTask);

    localStorage.setItem('TaskSubmissions', JSON.stringify(updatedTasks));

    location.reload();

}




function sortTasks() {
    currentTasks = JSON.parse(localStorage.getItem('TaskSubmissions'))

    // this for loop causes the buildtasks to iterate over each object in the
    // currentTasks array. It will sort and build out each card for its 
    // corresponding task.
    for (let i = 0; i < currentTasks.length; i++) {
        buildTasks(currentTasks[i]);
    }

    completeTaskListener();
    updateTaskListener()
}



// when the page finishes loading, this calls the sortTasks fuction and builds
// the cards for each task.
window.addEventListener("load", sortTasks(currentTasks));

window.onload = function() {
    const taskSuggestion = document.getElementById("taskSuggestion")
    const randomTask_Index = Math.floor(Math.random() * currentTasks.length);
    console.log(randomTask_Index);
    const randomTaskName = currentTasks[randomTask_Index].taskName;


taskSuggestion.innerHTML = `
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">Need a Starting Place? Try This:</h5>
            <p class="card-text h5" id="header-task"></p>
        </div>
    </div>
`;
const headerCard = document.getElementById("header-task");
console.log(randomTask_Index);
console.log(randomTaskName);
console.log(headerCard);
headerCard.textContent = randomTaskName;

};
window.onload();
