import mongoose from "mongoose";

const calenderSchema = new mongoose.Schema({
    userid:{
        type:String,
        required:true
    },
    date:{
        type:Number,
        required:true
    },
    month:{
        type:Number,
        required:true
    },
    year:{
        type:Number,
        required:true
    },
    event:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

export const Calender = mongoose.model('Calender' , calenderSchema)