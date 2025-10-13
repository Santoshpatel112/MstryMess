import mongoose ,{Schema ,Document} from 'mongoose';
// typescript type sefty
export interface Message extends Document{
    content:string;
    createdAt:Date
}

const MessageSchema : Schema<Message>=new Schema({

    content:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now,
        required:true
    }
})