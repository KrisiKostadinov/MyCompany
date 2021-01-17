const Message = require('../models/Message');
const Worker = require('../models/Worker');

module.exports = {
    get: {
        async add(req, res) {
            const receiver = await Worker.findById(req.params.id).lean();
            res.render('message/add', { receiver });
        },

        async all(req, res) {
            const messages = await Message.find({ receiverId: req.params.id }).lean();
            res.render('message/all', { messages });
        }
    },

    post: {
        async add(req, res) {
            const sender = await Worker.findOne({ email: req.data.email }).lean();
            const receiver = await Worker.findById(req.params.id).lean();
            
            const message = {
                content: req.body.message,
                receiverId: receiver._id,
                senderId: sender._id,
            }
            
            await Message.create(message);

            res.render('message/add', { receiver });
        }
    }
}