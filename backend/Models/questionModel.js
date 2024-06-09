import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
    {
        userid:{
            type:String,
            required:true
        },
        name:{
            type:String,
            required:true
        },
        statement:{
            type:String,
            required:true
        },
        code:{
            type:String
        },
        visibility:{
            type:Boolean,
            required:true
        },
        upvote:{
            type:Number,
            required:true
        }
    },{
        timestamps:true
    }
)

export const Question = mongoose.model("Question" , questionSchema);