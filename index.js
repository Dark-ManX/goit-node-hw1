const contacts = require("./contacts.js");

const { Command } = require("commander");

const program = new Command();

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contactsList = await contacts.list();
      console.table(contactsList);
      break;

    case "get":
      const contactById = await contacts.get(id);
      console.table(contactById);
      break;

    case "add":
      const newContact = await contacts.add(name, email, phone);
      console.table(newContact);
      break;

    case "remove":
      const removeBook = await contacts.remove(id);
      console.table(removeBook);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
