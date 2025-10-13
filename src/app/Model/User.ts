import mongoose ,{Schema ,Document} from 'mongoose';
// typescript type sefty
export interface Message extends Document{
    content:string;
    createdAt:Date
}
export interface User extends Document{
    username:string;
    email:string,
    password:string,
    verifiecode:string,
    isveried:boolean,
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

const UserSchema : Schema<User>=new Schema({

    username:{
        type:String,
        required:[true,"Username is required"],
        unique:true,
        trim:true,
        minlength:[3,"Username must be at least 3 characters long"],
        maxlength:[30,"Username must be at most 30 characters long"],
        match:[/^[a-zA-Z0-9_]+$/,"Username can only contain alphanumeric characters and underscores"]
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true,
        match:[/^\S+@\S+\.\S+$/,"Please provide a valid email address"], // Regx for email validation
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:[true,"Password is required"]
    }
    ,
    verifiecode:{
        type:String,
        required:[true,"Verification code is required"]
    },
    isveried:{
        type:Boolean,
        default:false
    },
    verifiedcodeExpiry:{
        type:Date,
        required:[true,"Verification code expiry date is required"]
    },
    isAcceptingmessages:{
        type:Boolean,
        default:true
    },
    messages:[MessageSchema]
})