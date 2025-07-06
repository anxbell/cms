const Contact = require('../models/contact');
const sequenceGenerator = require('../routes/sequenceGenerator');

// GET /contacts 
const getContactsList = async (req, res) => {
  try {
    const contacts = await Contact.find().populate('group');
    res.status(200).json({
      message: 'Contacts fetched successfully!',
      contacts: contacts
    });
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred',
      error: error.message
    });
  }
};

// POST /contacts 
const createContact = async (req, res) => {
  try {
    const maxContactId = await sequenceGenerator.nextId('contacts');
    const { name, email, phone, imageUrl, group } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Required fields missing' });
    }

    // Convertir ids de grupo personalizados a ObjectIds
    let groupContacts = [];
    if (group && group.length > 0) {
      groupContacts = await Contact.find({ id: { $in: group } });
    }

    const newContact = await Contact.create({
      id: maxContactId.toString(),
      name,
      email,
      phone,
      imageUrl,
      group: groupContacts.map(c => c._id)
    });

    // Poblamos el grupo antes de enviar la respuesta
    const populatedContact = await newContact.populate('group');

    res.status(201).json({
      message: 'Contact successfully added',
      contact: populatedContact
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// PUT /contacts/:id 
const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    let updateData = req.body;

    if (!id) {
      return res.status(400).json({ error: 'Missing contact id' });
    }

    if (updateData.group) {
      const groupContacts = await Contact.find({ id: { $in: updateData.group } });
      updateData.group = groupContacts.map(c => c._id);
    }

    const updatedContact = await Contact.findOneAndUpdate(
      { id: id },
      updateData,
      { new: true }
    ).populate('group');

    if (!updatedContact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.status(200).json(updatedContact);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE /contacts/:id 
const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'Missing contact id' });
    }

    const deletedContact = await Contact.findOneAndDelete({ id: id });

    if (!deletedContact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.status(204).json({ message: 'Contact deleted' });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getContactsList,
  createContact,
  updateContact,
  deleteContact
};
