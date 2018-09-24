console.log('Starting app..');

// fetch all the content of fs module 
// and store them into fs varibale

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes');

const titleOptions = {
    describe: 'Title of Note',
    demand: true,
    alias: 't'
};

const bodyOptions = {
    describe: "Body of the Note",
    demand: true,
    alias: 'b'
};

const argv = yargs
    .command('add', 'Add a new Note', {
        title: titleOptions,
        body: bodyOptions
    })
    .command('list', 'List all notes')
    .command('read', 'Read a note', {
        title: titleOptions
    })
    .help()
    .argv;
var command = process.argv[2];
console.log('Command: ', command);
console.log('Yargs: ', argv);

if (command === 'add') {
    var note = notes.addNote(argv.title, argv.body);
    if (note) {
        console.log('Note Created')
        notes.logNote(note);
    } else {
        console.log('Note Title Taken')
    }

} else if (command === 'list') {
    var allNotes = notes.getAll();
    console.log(`Printing  ${allNotes.length}notes(s)`);
    allNotes.forEach((note) => notes.logNote(note));
} else if (command === 'read') {
    var note = notes.getNote(argv.title);
    if (note) {
        console.log('Note Read');
        notes.logNote(note);
    } else {
        console.log('Note not Found');
    }
} else if (command === 'remove') {
    var noteRemoved = notes.removeNote(argv.title);
    var message = noteRemoved ? 'Note was Removed' : 'Note not found';
    console.log(message);
} else {
    console.log("notes not found");
}