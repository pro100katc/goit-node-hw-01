const fs = require('fs').promises;
const path = require('path');

const contactsPath = path.resolve('db/contacts.json');


async function dataParse() {
    try {
        const data = await fs.readFile(contactsPath, 'utf-8');
        return JSON.parse(data)
    } catch (error) {
        console.log(error)
    }
}


async function listContacts() {
    try {
        const data = await dataParse();
        console.table(data);
    } catch (error) {
        console.log(error)
    }
}
  
async function getContactById(contactId) {
    try {
        const data = await dataParse();
        const contactFind = data.filter(contact => Number(contact.id) === Number(contactId));
        console.log(contactFind)
    } catch (error) {
        console.log(error)
    }
}
  
async function removeContact(contactId) {
    try {
        const data = await dataParse();
        const contactFind = data.filter(contact => Number(contact.id) !== Number(contactId));
        await fs.writeFile(contactsPath, JSON.stringify(contactFind));
        console.log('Contact deleted successfully!')
    } catch (error) {
        console.log(error)
    }  
}
  
async function addContact(name, email, phone) {
    const newContact = {id: Date.now(), name, email, phone};
    try {
        const data = await dataParse();
        data.push(newContact);
        await fs.writeFile(contactsPath, JSON.stringify(data))
        console.log('Contact added successfully!')
    } catch (error) {
        console.log(error)
    }    
}
  

module.exports ={listContacts, getContactById, removeContact, addContact}