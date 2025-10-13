import mongoose ,{Schema ,Document} from 'mongoose';
// typescript type sefty
export interface Message extends Document{
    content:string;
    createdAt:Date
}

const MessageSchema : Schema<Message>=new Schema({

})