const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "db/contacts.json");

const update = async (el) =>
  await fs.writeFile(contactsPath, JSON.stringify(el, null, 2));

const list = async () => {
  const res = await fs.readFile(contactsPath);
  return JSON.parse(res);
};

const get = async (contactId) => {
  const contacts = await list();
  const contactById = contacts.find((el) => el.id === contactId);
  return contactById || null;
};

const remove = async (contactId) => {
  const contacts = await list();
  console.log(
    "contact",
    contacts.findIndex((el) => el.id === contactId)
  );
  const contactIndex = contacts.findIndex((el) => el.id === contactId);
  if (contactIndex === -1) {
    return null;
  }

  const result = contacts.splice(contactIndex, 1);
  update(contacts);
  return result;
};

const add = async (name, email, phone) => {
  const contacts = await list();
  const newContact = {
    id: uuidv4(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  update(contacts);
  return newContact;
};

console.log("contactsPath", contactsPath);

module.exports = {
  list,
  get,
  remove,
  add,
};
