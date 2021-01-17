const { Schema, model } = require('mongoose');
const { ObjectId } = Schema.Types;

const WorkerSchema = new Schema({
    email: {
        type: String,
        unique: true,
    },
    password: String,
    companyId: {
        type: ObjectId,
        ref: 'Company'
    },
    department: String,
    phone: String,
    position: String,
    lastName: String,
    sirName: String,
    firstName: String,
});

const Worker = model('Worker', WorkerSchema);

module.exports = Worker;