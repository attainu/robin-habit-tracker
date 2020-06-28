import { Schema, model, SchemaType } from 'mongoose';

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
        type: Schema.Types.ObjectId,
        ref: "Habit"
    }
});

export default model('User', userSchema);