import mongoose ,{Schema ,Document} from 'mongoose';
// typescript type sefty
export interface Message extends Document{
    content:string;
    createdAt:Date
}
export interface User extends Document{
    username:string;
    createdAt:Date,
    email:string,
    password:string,
    verifiecode:string,
    verifiedcodeExpiry:Date,
    isAcceptingmessages:boolean,
    messages:Message[]
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