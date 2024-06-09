import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
    {
        userid:{
            type:String,
            required:true
        },
        username:{
            type:String,
            required:true
        },
        questionid:{
            type:String,
            required:true
        },
        text:{
            type:String,
            required:true
        },
        code:{
            type:String
        },
        upvote:{
            type:Number,
            required:true
        }
    },{
        timestamps:true
    }
)

export const Comment = mongoose.model("Comment" , commentSchema);