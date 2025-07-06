const express = require('express');
const router = express.Router();
const messagesController = require('../controllers/messagesController')

// GET all messages
router.get('/', messagesController.getMessagesList);

// GET a specific message (optional)
// router.get('/:id', getMessageById);

// POST a new message
router.post('/', messagesController.createMessage);

// PUT update a message
router.put('/:id', messagesController.updateMessage);

// DELETE a message
router.delete('/:id', messagesController.deleteMessage);


module.exports = router;