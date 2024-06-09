import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema(
    {
        userid:{
            type:String,
            required:true
        },
        questionid:{
            type:String,
            required:true
        }
    },{
        timestamps:true
    }
)

export const Bookmark = mongoose.model("Bookmark" , bookmarkSchema);