function displayCurrentDate() {
    /// retrieves currentDate from localStorage
    let storedDate = localStorage.getItem('currentDate');
    /// currentDate is defined
    let currentDate;

    /// if there storedDate contains no value, then currentDate becomes new 'Date'
    if (storedDate === null) {
        currentDate = new Date();
    /// else, the 'Date' becomes the stored string
    } else {
        currentDate = new Date(storedDate);
    }
    /// finds 'Date' by ID and concerts to string
    document.getElementById('Date').innerHTML = currentDate.toDateString();
}

function incrementDate() {
    let storedDate = localStorage.getItem('currentDate');
    let currentDate;

    /// same as above function, except
    if (storedDate === null) {
        currentDate = new Date();
    } else {
        currentDate = new Date(storedDate);
    }
    /// current date increases by one using the "setDate method"
    currentDate.setDate(currentDate.getDate() + 1);

    localStorage.setItem('currentDate', currentDate.toISOString());

    /// force refresh with new date
    window.location.reload();
}

    /// corresponding decrement date function
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

/// when user 'clicks' rightArrow, eventListener executes incrementDate function
document.getElementById('rightArrow').addEventListener('click', incrementDate);
/// when user 'clicks' leftArrow, eventListener executes decrementDate function
document.getElementById('leftArrow').addEventListener('click', decrementDate);

/// function executed on load
window.onload = function() {
    displayCurrentDate();
};

////////////