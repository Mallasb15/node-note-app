console.log("file has been executing");

const fs = require('fs');

var fetchNotes = () => {
    try {
        var notesString = fs.readFileSync('notes-data.json')
        return JSON.parse(notesString);
    } catch (e) {
        return [];
    }

};

var saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

var addNote = (title, body) => {
    var notes = fetchNotes();
    var note = {
        title,
        body
    };

    var duplicateNotes = notes.filter((note) => note.title === title);

    if (duplicateNotes.length === 0) {
        notes.push(note);
        saveNotes(notes);
        return note;
    } else {
        console.log("Duplicate Title Found!!");
    }
};

var getAll = () => {
    return fetchNotes();

};

var getNote = (title) => {
    var notes = fetchNotes();
    var filterNote = notes.filter((note) => note.title === title);
    return filterNote[0];
}

var removeNote = (title) => {
    // fetch notes
    var notes = fetchNotes();

    // filter notes, removing the one with title of argument
    var filterNotes = notes.filter((note) => note.title !== title);

    // save new notes array
    saveNotes(filterNotes);

    return notes.length !== filterNotes.length;
}

var logNote = (note) => {
    console.log('-----------');
    console.log(`Title: ${note.title}`);
    console.log(`Body ${note.body}`);
}
module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote,
    logNote
};