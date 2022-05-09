const chalk = require("chalk");
const fs = require("fs");

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find((note) => note.title === title);

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });

    saveNotes(notes);
    console.log(chalk.bgGreen("New note added successfully!!"));
  } else {
    console.log(chalk.bgRed(`${title} already exists`));
  }
};

const removeNote = (title) => {
  const notes = loadNotes();
  const notesToKeep = notes.filter((note) => note.title !== title);

  if (notesToKeep.length < notes.length) {
    saveNotes(notesToKeep);
    console.log(chalk.bgGreen("Note removed successfully!"));
  } else {
    console.log(chalk.bgRed(`NO, Note found with title: ${title}`));
  }
};

const listNotes = () => {
  console.log(chalk.yellow("Your Notes"));
  const notes = loadNotes();

  notes.forEach((note) => console.log(chalk.green("- " + note.title)));
};

const readNote = (title) => {
  const notes = loadNotes();
  const note = notes.find((note) => note.title === title);

  if (note) {
    console.log(chalk.yellow("Title - " + note.title));
    console.log("Body - " + note.body);
  } else {
    console.log(chalk.bgRed(`${title} not found`));
  }
};

const saveNotes = (notes) => {
  const newData = JSON.stringify(notes);
  fs.writeFileSync("notes.json", newData);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    const data = JSON.parse(dataJSON);
    return data;
  } catch (_) {
    return [];
  }
};

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote,
};
