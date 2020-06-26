import { Schema, model } from 'mongoose';

const habitSchema = Schema({
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    priority: {
        type: String
    },
    reminder: {
        type: Number,
        required: true
    },
    goals: {
        type: Number,
        required: true
    }
})

export default model('Habit', habitSchema);