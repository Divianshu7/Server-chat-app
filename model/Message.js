import mongoose from "mongoose";
import { Schema } from "mongoose";
const messageSchema = new Schema({
    message: {
        text: {
            type: String,
            required: true
        },
    },
    users: Array,
    sender: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true }
)




export default mongoose.model('Messages', messageSchema)