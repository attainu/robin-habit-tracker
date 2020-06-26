import { Schema, model } from 'mongoose';

const userSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    isConfirmed: {
        type: Boolean,
        default: false
    },
    contactNo: {
        type: Number,
        required: true
    },
    taskAdded: {
        type: String,
        ref: "Habit"
    }
});

/*const User = */
export default model('User', userSchema);