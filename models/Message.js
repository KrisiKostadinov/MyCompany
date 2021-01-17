const { Schema, model } = require('mongoose');
const { ObjectId } = Schema.Types;

const MessageSchema = new Schema({
    content: String,
    senderId: {
        type: ObjectId,
        ref: 'Worker'
    },

    receiverId: {
        type: ObjectId,
        ref: 'Worker'
    }
});

const Message = model('Message', MessageSchema);

module.exports = Message;