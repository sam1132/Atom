import mongoose from 'mongoose';
import {User} from './user.model.js';
import Message from './message.model.js';

const conversationSchema = new mongoose.Schema({
    members:[{type: mongoose.Schema.Types.ObjectId, ref: User}],
    messages:[{type: mongoose.Schema.Types.ObjectId, ref: Message,default:[]}],
})

const Conversation = mongoose.model('Conversation', conversationSchema);
export default Conversation;