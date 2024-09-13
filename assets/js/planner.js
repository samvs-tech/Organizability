function displayCurrentDate() {
    let storedDate = localStorage.getItem('currentDate');
    let currentDate;

    if (storedDate === null) {
        currentDate = new Date();
    } else {
        currentDate = new Date(storedDate);
    }

    document.getElementById('Date').innerHTML = currentDate.toDateString();
}

function incrementDate() {
    let storedDate = localStorage.getItem('currentDate');
    let currentDate;

    if (storedDate === null) {
        currentDate = new Date();
    } else {
        currentDate = new Date(storedDate);
    }

    currentDate.setDate(currentDate.getDate() + 1);

    localStorage.setItem('currentDate', currentDate.toISOString());

    window.location.reload();
}

function decrementDate() {
    let storedDate = localStorage.getItem('currentDate');
    let currentDate;

    if (storedDate === null) {
        currentDate = new Date();
    } else {
        currentDate = new Date(storedDate);
    }

    currentDate.setDate(currentDate.getDate() - 1);

    localStorage.setItem('currentDate', currentDate.toISOString());

    window.location.reload();
}

document.getElementById('rightArrow').addEventListener('click', incrementDate);
document.getElementById('leftArrow').addEventListener('click', decrementDate);

window.onload = function() {
    displayCurrentDate();
};

////////////