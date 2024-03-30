const notes = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
const naturalNotes = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
const sharpNotes = ['A#', 'C#', 'D#', 'F#', 'G#'];


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
let selectedNotes = [];
const form = document.getElementById('music-form');
const selectedNotesContainer = document.getElementById('selected-notes');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    selectedNotes = [];
    const checkboxes = form.querySelectorAll('input[type="checkbox"]:checked');

    checkboxes.forEach(function(checkbox) {
        selectedNotes.push(checkbox.value);
    });

    selectedNotesContainer.textContent = 'Wybrane dźwięki: ' + selectedNotes.join(', ');
});

// functions to select specific notes
function selectNaturalNotes() {
    notes.forEach(note => {
        document.getElementById(note).checked = naturalNotes.includes(note);
    });
}

function selectSharpNotes() {
    notes.forEach(note => {
        document.getElementById(note).checked = sharpNotes.includes(note);
    });
}
function selectAllNotes() {
    notes.forEach(note => {
        document.getElementById(note).checked = true;
    });
}




// function to display a random note every n seconds
function displayRandomNote() {
    setInterval(() => {
        const randomIndex = Math.floor(Math.random() * selectedNotes.length);
        const randomNote = selectedNotes[randomIndex];
        
        const randomNoteContainer = document.getElementById('random-note-container');
        randomNoteContainer.textContent = randomNote;
    }, 1000); // repeat rate
}

displayRandomNote();

