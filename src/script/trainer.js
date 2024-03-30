const notes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
const naturalNotes = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
const sharpNotes = ['A#', 'C#', 'D#', 'F#', 'G#'];
let selectedNotes = [];
let recentNotesArray = [];
const recentlyNotesToDisplay = 6    ;
let interval = 2;

// create a checkbox for each note
const checkboxesContainer = document.getElementById('checkboxes-container');
notes.forEach(note => {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = note;
    checkbox.name = 'note';
    checkbox.value = note;

    const label = document.createElement('label');
    label.htmlFor = note;
    label.textContent = note;

    checkboxesContainer.appendChild(checkbox);
    checkboxesContainer.appendChild(label);
    checkboxesContainer.appendChild(document.createElement('br'));
});


// handle form submit
const form = document.getElementById('music-form');
const selectedNotesContainer = document.getElementById('selected-notes');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    selectedNotes = [];
    const checkboxes = form.querySelectorAll('input[type="checkbox"]:checked');

    checkboxes.forEach(function (checkbox) {
        selectedNotes.push(checkbox.value);
    });
    // console.log(selectedNotes);
});

// functions to select specific notes
function selectNaturalNotes() {
    notes.forEach(note => {
        document.getElementById(note).checked = naturalNotes.includes(note);
        startButton.disabled = false;
    });
}

function selectSharpNotes() {
    notes.forEach(note => {
        document.getElementById(note).checked = sharpNotes.includes(note);
        startButton.disabled = false;
    });
}
function selectAllNotes() {
    notes.forEach(note => {
        document.getElementById(note).checked = true;
        startButton.disabled = false;
    });
}


// add recently genereated notes to array
function addRecentNotes(note) {
    if (recentNotesArray.length >= recentlyNotesToDisplay) {
        recentNotesArray.shift();
    }
    recentNotesArray.push(note);
    // console.log(recentNotesArray);
    displayRecentNotes();
}

// display recently generated notes - except last one
function displayRecentNotes() {
    const recentNotesContainer = document.getElementById('recent-notes');
    recentNotesContainer.innerHTML = '';

    for (let i = 0; i < recentNotesArray.length - 1; i++) {
        const note = recentNotesArray[i];
        const noteElement = document.createElement('div');
        noteElement.textContent = note;
        noteElement.style.display = 'inline-block';
        recentNotesContainer.appendChild(noteElement);
    }
}


// display a random note from selected notes
const trainerSection = document.querySelector('.trainer');
let intervalId;
function displayRandomNote() {
    const randomIndex = Math.floor(Math.random() * selectedNotes.length);
    const randomNote = selectedNotes[randomIndex];
    trainerSection.textContent = randomNote;
    addRecentNotes(randomNote);
}

// set an interval 
function startDisplayingNotes() {
    const intervalInput = document.getElementById('interval');
    const intervalValue = parseFloat(intervalInput.value);

    if (isNaN(intervalValue) || !Number.isFinite(intervalValue)) {
        alert("Wprowadź prawidłowe  dane");
        return;
    }

    intervalId = setInterval(displayRandomNote, intervalValue * 1000);
}
// disable "start" button, if at least 2 notes aren't selected
function checkSelectedNotes() {
    const checkboxes = form.querySelectorAll('input[type="checkbox"]:checked');
    const selectedCount = checkboxes.length;
    startButton.disabled = selectedCount < 2;
}

checkboxesContainer.addEventListener('change', checkSelectedNotes);

// handle start button
const startButton = document.querySelector('button[type="submit"]');
startButton.addEventListener('click', function(event) {
    if (startButton.disabled) {
        event.preventDefault();
        return;
    }
    startDisplayingNotes();
});

// handle stop
function stopDisplayingNotes() {
    clearInterval(intervalId);
}