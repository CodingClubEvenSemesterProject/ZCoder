import mongoose from "mongoose";
import bcrypt from 'bcrypt'
const OTPVerifySchema=new mongoose.Schema({
    userId:{
        type:String , 
        required:true
    },
    otp:{
        type:String,
        required:true
    },
    expiresIn:{
        type:Number , 
        required:true
    }
},{
    timestamps:true
})

OTPVerifySchema.pre("save" , async function(next){
    if(!(this.isModified("otp")))
        return next()
    this.otp = await bcrypt.hash(this.otp, 10)
    next()
})
OTPVerifySchema.methods.isOTPCorrect = async function(otp){
    try{
        return await bcrypt.compare(otp, this.otp)
       }catch(error){
        console.log('Error in Comparing using bcrypt')
        return false
       }
}

export const OTPVerify = mongoose.model('OTPVerify' , OTPVerifySchema)