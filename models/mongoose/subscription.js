const mongoose = require('mongoose');

const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const UserSchema = new Schema({
    userId: { type: ObjectId, required: true, index: 1 },
    url: { String, required: true },
});

const SubModel = mongoose.model('user', UserSchema);

async function insert(sub) {
    const created = await SubModel.create(sub);
    return created;
}

async function list(params) {
    const match = {};
    const flow = SubModel.find(match);
    const subs = await flow.exec();
    return subs;
}

async function findByUserById(userId) {
    const subs = await SubModel.find({ userId })
    return subs;
}

module.exports = {
    insert,
    list,
    findByUserById,
}