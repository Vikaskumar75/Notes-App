const yargs = require("yargs");
const notes = require("./notes");

yargs.version("1.1.0");

yargs.command({
  command: "add",
  describe: "This command is used to add a note",
  builder: {
    title: {
      describe: "Note Title",
      type: "string",
      demandOption: true,
    },
    body: {
      describe: "Note Body",
      type: "string",
      demandOption: true,
    },
  },
  handler(argv) {
    notes.addNote(argv.title, argv.body);
  },
});

yargs.command({
  command: "remove",
  describe: "This command is used to remove a note",
  builder: {
    title: {
      describe: "Title to be removed",
      type: "string",
      demandOption: true,
    },
  },
  handler(argv) {
    notes.removeNote(argv.title);
  },
});

yargs.command({
  command: "list",
  describe: "This command is used to list all notes",
  handler() {
    notes.listNotes();
  },
});

yargs.command({
  command: "read",
  describe: "This command is used to read a note",
  builder: {
    title: {
      describe: "Title to be read",
      type: "string",
      demandOption: true,
    },
  },
  handler(argv) {
    notes.readNote(argv.title);
  },
});

yargs.parse();
