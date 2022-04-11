const fs = require("fs");
const chalk = require("chalk");
const { finished } = require("stream");

const getNotes = () => {
  return "Vive le tunning timal !";
};

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find((note) => note.title === title);

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(chalk.green.bold("New note added !"));
  } else {
    console.log(chalk.red.bold("Note title taken !"));
  }
};

const removeNote = (title) => {
  const notes = loadNotes();
  const noteToKeep = notes.filter((note) => note.title !== title);

  if (notes.length > noteToKeep.length) {
    saveNotes(noteToKeep);
    console.log(chalk.bold.green(title + " as been removed"));
  } else {
    console.log(chalk.bold.red("This note doesnt exist"));
  }
};

const listNotes = () => {
  const notes = loadNotes();
  if (notes.length > 0) {
    notes.forEach((note) => {
      console.log("Titre: " + note.title + "\n" + note.body + "\n");
    });
  } else {
    console.log(chalk.bold.red("Y'a pas de notes timal"));
  }
};

const readNote = (title) => {
  const notes = loadNotes();
  const toRead = notes.find((note) => note.title === title);
  if (toRead) {
    console.log("Title: " + toRead.title + "\n" + toRead.body);
  } else {
    console.log(chalk.red.bold("This note doesnt exist"));
  }
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("./notes.json", dataJSON);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("./notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote,
};
