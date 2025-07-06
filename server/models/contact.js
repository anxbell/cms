const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    id: {type: String, required: true},
    name: {type: String, require: true},
    email: {type: String, require: true},
    phone: {type: String},
    imageUrl: {type: String},
    group: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Contact' }]
});

module.exports = mongoose.model('Contact', contactSchema);