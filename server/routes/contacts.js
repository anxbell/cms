const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/contactsController'); // Asumo que las funciones están aquí

// GET all contacts
router.get('/', contactsController.getContactsList);

// POST create new contact
router.post('/', contactsController.createContact);

// PUT update contact by id
router.put('/:id', contactsController.updateContact);

// DELETE contact by id
router.delete('/:id', contactsController.deleteContact);

module.exports = router;
