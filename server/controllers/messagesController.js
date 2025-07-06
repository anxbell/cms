const Message = require('../models/message');
const sequenceGenerator = require('../routes/sequenceGenerator');
const Contact = require('../models/contact');
// Get All Messages

const getMessagesList = async (req, res) => {
    try {
        const messages = await Message.find();
        res.json(messages)
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
};

// Create Message
const createMessage = async (req, res) => {
    try {
        let maxMessageId = await sequenceGenerator.nextId('messages');
        const { subject, msgText, sender } = req.body;

        if(!msgText || !sender) {
            return res.status(400).json({ error: 'Required field missing'})
        }

        const senderContact = await Contact.findOne({ id: sender });

        const newMessage = await Message.create({
            id: maxMessageId.toString(),
            subject,
            msgText,
            sender: senderContact._id
        });

        res.status(201).json({
            message: 'Message successfully added',
            id: newMessage.id
        })
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
};

// Edit Message

const updateMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        if(!id) {
            return res.status(400).json({ error: 'Missing requirement'})
        }

         if (updateData.sender) {
            const senderContact = await Contact.findOne({ id: updateData.sender });
            if (!senderContact) {
                return res.status(404).json({ error: 'Sender contact not found' });
            }

            updateData.sender = senderContact._id; 
        }

        const updatedMessage = await Message.findOneAndUpdate(
            {id: id},
            updateData,
            {new: true});

        if(!updatedMessage) {
            return res.status(404).json({ error: 'Message not found'})
        }

        res.status(200).json(updatedMessage);
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
};

// Delete Message
const deleteMessage = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: 'Missing Message id'});
        }

        const deletedMessage = await Message.findOneAndDelete({ id: id });

        if(!deletedMessage) {
            return res.status(404).json({ error: 'Message not found'});
        }

        res.status(204).json({ message: 'Message deleted' });

    } catch (err) {
        res.status(500).json({ error: error.message});
    }
};


module.exports = {
    getMessagesList,
    createMessage,
    updateMessage,
    deleteMessage
}