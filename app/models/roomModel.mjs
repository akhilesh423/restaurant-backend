import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
    name: { type: String, unique: true },
});

const Room = mongoose.model('room', roomSchema);

export default Room;
