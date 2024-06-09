import mongoose from "mongoose";
import bcrypt from 'bcrypt'
const OTPVerifySchema=new mongoose.Schema({
    userId:{
        type:String , 
        required:true
    },
    otp:{
        type:Number,
        required:true
    },
    expiresIn:{
        type:Number , 
        required:true
    }
},{
    timestamps:true
})

OTPVerifySchema.pre("save" , async (next)=>{
    if(!(this.isModified("otp")))
        return next()
    this.otp=await  bcrypt.hash(this.otp , 10);
    next()
})
OTPVerifySchema.methods.isOTPCorrect = async (otp)=>{
    return await bcrypt.compare(otp , this.otp)
}

export const OTPVerify = mongoose.model('OTPVerify' , OTPVerifySchema)