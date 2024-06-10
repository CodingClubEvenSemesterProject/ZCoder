
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({
    path:path.resolve(__dirname,'.env')
})

import express, { urlencoded } from 'express'
const app = express()

import cors from 'cors'
app.use(cors({
    origin:process.env.CORS_ORIGIN
}))

import cookieParser from 'cookie-parser'
app.use(cookieParser());

app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true , limit:"16kb"}));

import {authMiddleware, generateAccessTokenUtils , generateRefreshTokenUtils ,otpGeneratorAndMailer , mailUtil } from './utils.js'
import  {User}  from "./Models/userModel.js";
//working fine
app.post('/SignUp' , async (req, res)=>{
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password
    const techStack = req.body.techStack
    const language = req.body.language
    const codeforces = req.body.codeforces
    const codechef = req.body.codechef
    const leetcode = req.body.leetcode
    
    if(email === undefined || username === undefined || password === undefined){
        return res.status(402).json({
            "error":true,
            "message":"all required fields are not sent"
        })
    }
    
    if(password.length < 8){
        return res.status(409).json({
            "error":true,
            "message":"Password must have at least 8 characters"
        })
    }
    
    [techStack , language, codeforces , codechef,leetcode].map(item=>{
        if(item === '' || item===null)
            item=" "
    })
    
    const userExistenceCheck = await User.findOne({$or:[{email:email} , {username:username}]})
    if(!(userExistenceCheck===null) && (userExistenceCheck.email==email || userExistenceCheck.username==username)){
        return res.status(409).json({
            "error":true,
            "message":"User with same Email or username already exist! Choose a different one"
        })
    }
    
    const newUser = await User.create({username , email , password, techStack ,language, codeforces, codechef, leetcode , verfied:false , online:false})
    if(newUser === null){
        return res.status(505).json({
            "error":true,
            "message":"New User not Created due to Server Error"
        })
    }
    
    mailUtil(email , "Welcome to ZCODER!!");
    return res.status(200).json({
        user:newUser,
        "error_status":false,
        "message":"Succesfully created account. GO LOG IN!!!!"
    })
})




import { OTPVerify } from './Models/OTPVerifcation.js'

app.get('/LogIn/:id/Profile/AccVerify' , authMiddleware ,async(req, res)=>{
    try{
        let user = req.user
        user = await User.findById(user._id)
        if(user.verfied){
            return res.status(401).json({
                "error":true,
                "message":"User is Already Verified"
            })
        }
        
        const otp =await otpGeneratorAndMailer(user.email)
        if(otp === false){
            throw new Error
        }
        
        const OTPCheck = await OTPVerify.findOne({userId:user._id})
        if(OTPCheck!==null){
            return res.status(404).json({
                "error":true,
                "message":"Too Early to make another OTP request! You must wait for 15minutes between making two successive OTP requests"
            })
        }
        
        const NewOTP=await OTPVerify.create({userId:user._id , otp:otp , expiresIn:(Date.now()+15*60*1000)})
        mailUtil(userEmail , `Your OTP for ZCoder account id ${otp}`)
        return res.status(200).json({
            "error":false,
            "message":"OTP sent to your Registered Email Id. Do not make furthur OTP request for 15minutes",
        })
        
    }catch(error){
        return res.status(500).json({
            "error":true,
            "message":"Could Not generate and send OTP"
        })
    }
})


app.post('/LogIn/:id/Profile/AccVerify' ,  authMiddleware, async (req, res)=>{
    try{
        let user = req.user
        const otp = req.body.otp;
        user = await User.findById(user._id)
        
        if(!otp){
            return res.status(400).json({
                "error":true,
                "message":"OTP not entered"
            })
        }
        
        const OTPCheck = await OTPVerify.findOne({userId:user._id})
        if(!OTPCheck){
            return res.status(400).json({
                "error":true,
                "message":"OTP request was not made!"
            })
        }
        
        if(OTPCheck.expiresIn <= Date.now()){
            await OTPVerify.deleteOne({userId:user._id})
            return res.status(400).json({
                "error":true,
                "message":"OTP request Timed out"
            })
        }
        
        const OTPVerificationCheck = await OTPCheck.isOTPCorrect(otp)
        if(!OTPVerificationCheck){
            await OTPVerify.deleteOne({userId:user._id})
            return res.status(401).json({
                "error":true,
                "message":"OTP Incorrect"
            })
        }
        
        user.verfied = true;
        user.save({validateBeforSave:false})
        await OTPVerify.deleteOne({userId:user._id})
        return res.status(200).json({
            "error":false,
            "message":"Email Verification Successfull"
        })
    }catch(error){
        return res.status(501).json({
            "error":true,
            "message":"Server Error Occured"
        })
    }
})




// import cookieParser from 'cookie-parser'
// app.use(cookieParser());
//working fine
app.post('/LogIn'  , async (req, res)=>{
    const username=req.body.username;
    const password=req.body.password;
    
    const userExistenceCheck=await User.findOne( {username:username} );
    if(!userExistenceCheck){
        console.log("User Does not exist!!");
        return  res.status(404).json({
            user:null,
            "error":true,
            "message":"User Does not Exist!! Give a Valid Username"
        })
    }
    const user=userExistenceCheck;
    const passwordCheck=await user.isPasswordCorrect(password)
    if(!passwordCheck){
        mailUtil(user.email , "ALERT!!!Someone tried to Enter in yor ZCoder Account with a incorrect or invalid Password!!")
        return  res.status(404).json({
            user:null,
            "error":true,
            "message":"Incorrect Password"
        })
    }
    const AccessToken = await generateAccessTokenUtils(user._id);
    const RefreshToken = await generateRefreshTokenUtils(user._id);
    
    if(!AccessToken || !RefreshToken){
        return res.status(501).json({
            user:null,
            "error":true,
            "message":"Error in Generating Bearer Tokens"
        })
    }
    
    //AT:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjU0ZTE0MjQ1YWI3ODc2NDliNDdhNzEiLCJlbWFpbCI6Im9mZmljaWFsMDZzcmluam95QGdtYWlsLmNvbSIsInVzZXJuYW1lIjoic3JpbmpveSIsImlhdCI6MTcxNjg4MTk1MiwiZXhwIjoxNzE2OTY4MzUyfQ.LreUhPj495qYBya3jEbShs5_GWd_FpBp-J2cAaXIH1c"
    
    
    const loggedInUser=await User.findById(user._id).select(" -password -refreshToken")
    const options={
        httpOnly:true,
        secure:true
    }
    loggedInUser.online=true
    loggedInUser.save({validateBeforeSave:false})
    return res.status(200).cookie("AccessToken", AccessToken, options).cookie("RefreshToken" , RefreshToken, options).
    json({
        "error":false,
        "loggedInUser":loggedInUser, 
        "AccessToken":AccessToken , 
        "RefreshToken":RefreshToken,
        "message":"Succesfull Login"
    });
})



app.post('/LogIn/ForgotPassword' , async (req, res)=>{
    try{
        const username = req.body.username;
        const user=await User.findOne({username:username})
        if(!user){
            return res.status(400).json({
                "error":true,
                "message":"username does not exist"
            })
        }
        
        if(!user.verfied){
            return res.status(401).json({
                "error":true,
                "message":"You cannot retrieve your password since your registered email is not verified"
            })
        }
        
        const otp =await otpGeneratorAndMailer(user.email)
        if(otp === false){
            throw new Error
        }
        
        const OTPCheck = await OTPVerify.findOne({userId:user._id})
        if(OTPCheck!==null){
            return res.status(404).json({
                "error":true,
                "message":"Too Early to make another OTP request! You must wait for 15minutes between making two successive OTP requests"
            })
        }
        const NewOTP=await OTPVerify.create({userId:user._id , otp:otp , expiresIn:(Date.now()+15*60*1000)})
        mailUtil(user.email , `Your OTP for ZCoder account password retrieval id ${otp}`)
        return res.status(200).json({
            "error":false,
            "message":`OTP sent to your registered email address`
        })
    }catch(error){
        return res.status(501).json({
            "error":true,
            "message":"Server error occured"
        })
    }
})



app.post('/LogIn/ForgotPassword/ResetPassword', async (req, res)=>{
    try{
        const username = req.headers['username']
        if(!username){
            return res.status(400).json({
                "error":true,
                "message":"No email header available"
            })
        }
        const newPassword= req.body.newPassword
        const otp = req.body.otp;
        const user = await User.findOne({username:username})
        
        if(!otp){
            return res.status(400).json({
                "error":true,
                "message":"OTP not entered"
            })
        }
        
        const OTPCheck = await OTPVerify.findOne({userId:user._id})
        if(!OTPCheck){
            return res.status(400).json({
                "error":true,
                "message":"OTP request was not made!"
            })
        }
        
        if(OTPCheck.expiresIn <= Date.now()){
            await OTPVerify.deleteOne({userId:user._id})
            return res.status(400).json({
                "error":true,
                "message":"OTP request Timed out"
            })
        }
        
        const OTPVerificationCheck = await OTPCheck.isOTPCorrect(otp)
        if(!OTPVerificationCheck){
            await OTPVerify.deleteOne({userId:user._id})
            return res.status(401).json({
                "error":true,
                "message":"OTP Incorrect"
            })
        }
        
        await OTPVerify.deleteOne({userId:user._id})
        user.password=newPassword
        user.save({validateBeforeSave:false})
        mailUtil(user.email , "Your ZCoder Password is reset successfully")
        return res.status(200).json({
            "error":false,
            "message":"Password Reset Successfull"
        })
    }catch(error){
        return res.status(501).json({
            "error":true,
            "message":"Server Error Occured"
        })
    }
})



//working fine
app.post('/LogIn/:id/LogOut', authMiddleware , async(req, res)=>{
    let user = req.user;
    user=await User.findById(user._id)
    user.online=false;
    await user.save({validateBeforSave:false})
    try{
        return  res.status(200).clearCookie('AccessToken').json({
            "error":false,
            "message":"User Logged Out Successfully"
        })
    }catch(error){
        return  res.status(500).json({
            "error":true,
            "message":"Error in Server while logging Out the user"
        })
    }
})



//working fine
app.get('/LogIn/:id/Profile', authMiddleware , async (req, res)=>{
    try{
        
        const userid= req.params.id;
        const user =await User.findById(userid)
        if(!user){
            throw new Error("Server Error Occured")
        }
        let bookmarkQuestion=[]
        const bookmark = await Bookmark.find({userid:userid}).sort({createdAt:1}).exec()
        if(!bookmark){
            bookmark = ""
        }else{
            let i=0;
            bookmark.forEach(async (element) => {
                bookmarkQuestion[i]=await Question.findById(element.questionid)
                i=i+1;  
            });
        }
        const publish = await Question.find({userid:userid}).sort({createdAt:1}).exec()
        if(!publish){
            publish=""
        }
        return res.status(200).json({
            "error":false,
            "message":"Success",
            "user":user,
            "publish":publish,
            "bookmark":bookmarkQuestion
        })
    }catch(error){
        return res.status(500).json({
            "error":true,
            "message":"Server Error Occured",
            "user":null,
            "bookmark":null,
            "publish":null
        })
    }
})



app.put('/LogIn/:id/Profile/AccEdit' , authMiddleware , async (req, res)=>{
    try{
        const techStack = req.body.techStack
        const language = req.body.language
        const codeforces = req.body.codeforces
        const codechef = req.body.codechef
        const leetcode = req.body.leetcode
        const password =  req.body.password;
        let user = req.user
        
        user = await User.findById(user._id)
        const passwordCheck=await user.isPasswordCorrect(password)
        if(!passwordCheck){
            mailUtil(user.email , "ALERT!!!Someone tried to make changes to your ZCoder Account with a incorrect Password!!")
            return  res.status(404).json({
                user:null,
                "error":true,
                "message":"Incorrect Password"
            })
        }
        
        user.techStack=techStack
        user.language = language
        user.ratingCodeForces = codeforces
        user.ratingCodeChef = codechef
        user.ratingLeetCode=leetcode
        
        await user.save({validateBeforSave:false});
        user = await User.findById(user._id) 
        return res.status(200).json({
            "user":user,
            "error":false,
            "message":"Changes Saved!"
        })
    }catch(error){
        console.log(error)
        return res.status(505).json({
            "user":null,
            "error":true,
            "message":"Changes could not Saved due to Server Issues! Sorry for the inconvinience. Please Try later"
        })
    }
})



import { Question } from './Models/questionModel.js'
import { Bookmark } from './Models/bookmarkModel.js'
import { Comment } from './Models/commentModel.js'
import { Upvote } from './Models/upvoteModel.js'

app.get('/LogIn/:id' ,authMiddleware, async (req, res)=>{
    //return the top ten question-blog from the databases based on uploaded time
    try{
        const feed = await (await Question.find({visibility:true}).sort({createdAt : 1}).exec())
        if(!feed){
            throw new Error("Server Error Occured")
        }
        const topFeed=feed.slice(0,10)
        return res.status(200).json({
            "error":false,
            "message":"Feed successfull",
            "data":topFeed
        })
    }catch(error){
        return res.status(500).json({
            "error":true,
            "message":"Server Error Occured",
            "data":null
        })
    }
})




app.post('/LogIn/:id/:qid/Post-Comment',authMiddleware , async (req, res)=>{
    try{
        const userid = req.params.id
        const qid = req.params.qid
        const text = req.body.text
        const code = req.body.code
        const user = await User.findById(userid)
        if(!text){
            return res.status(400).json({
                "error":true,
                "message":"Empty Comment not Valid!",
                "data":null
            })
        }
        if(!code){
            code=""
        }
        const newComment = await Comment.create({userid : userid , text:text , username : user.username , questionid:qid , code:code , upvote:0})
        if(!newComment){
            throw new Error("Server Error Occured")
        }
        return res.status(200).json({
            "error":false,
            "message":"Comment Added",
            "data":newComment
        })
    }catch(error){
        return res.status(500).json({
            "error":true,
            "message":"Server Error Occured",
            "data":null
        })
    }
})




app.delete('/LogIn/:id/:qid/Del-Comment/:cid'  , authMiddleware , async (req, res)=>{
    try{
        const userid = req.params.id
        const qid = req.params.qid
        const cid = req.params.cid
        const user = req.user;
        const commentToBeDel = await Comment.findOneAndDelete({userid:userid , questionid:qid , _id:cid})
        if(!commentToBeDel){
            throw new Error('Comment could not be deleted')
        }
        res.status(200).json({
            "error":false,
            "message":"Comment Deleted Successfully"
        })
    }catch(error){
        return res.status(500).json({
            "error":true,
            "message":"Comment could not be deleted"
        })
    }
})




app.get('/LogIn/:id/:qid/Comment' , authMiddleware , async (req, res)=>{
    try{
        const qid= req.params.qid
        const userid= req.params.id
        const feed = await Comment.find({questionid:qid}).sort({createdAt : 1}).exec()
        if(!feed){
            throw new Error("Server Error Occured")
        }
        return res.status(200).json({
            "error":false,
            "message":"Comments Positive",
            "data":feed
        })
    }catch(error){
        return res.status(505).json({
            "error":true,
            "message":"Server Error Ocuured",
            "data":null
        })
    }
})




app.post('/LogIn/:id/PublishQuestion' , authMiddleware , async(req, res)=>{
    try{
        const headline = req.body.headline
        const statement = req.body.statement
        const code = req.body.code
        const visibility = req.body.visibility
        const userid = req.params.id
        
        if(!headline || !statement || !visibility || !code){
            return res.status(400).json({
                "error":true,
                "message":"Mandatory Fields not filled",
                "data":null
            })
        }
        
        const user = await User.findById(userid)
        if(!user){
            return res.status(400).json({
                "error":true,
                "message":"User Does not Exists",
                "data":null
            })
        }
        
        const newQuestion = await Question.create({userid:userid , name:user.username , statement:statement , code:code  , visibility:visibility , upvote:0})
        if(!newQuestion){
            throw new Error("Question could not be posted")
        }
        
        return res.status(200).json({
            "error":false,
            "message":"Question added successfully",
            "data":newQuestion
        })
    }catch(error){
        return res.status(500).json({
            "error":true , 
            "message":"Question could not be posted",
            "data":null
        })
    }
})



app.post('/LogIn/:id/:qid/UpVote' , authMiddleware , async(req,res)=>{
    try{
        const userid=req.user._id
        const questionid=req.params.qid
        const UpVoteCheck = await Upvote.findOne({userid:userid , entityid:questionid})
        if(UpVoteCheck!== null){
            const DownVote = await Upvote.findByIdAndDelete(UpVoteCheck._id)
            if(!DownVote){
                throw new Error(500 , "UpVote not removed due to technical error")
            }
            const question = await Question.findById(questionid)
            const currentUpvotes = question.upvote - 1;
            question.upvote = currentUpvotes
            const newUpvoteCount = await question.save({validateBeforeSave:false})
            return res.status(200).json({
                "error":false,
                "message":"UpVote Removed Successfully",
                "data":newUpvoteCount
            })
        }
        const newUpVote= await Upvote.create({userid:userid , entityid:questionid})
        if(!newUpVote){
            throw new Error(500 , "Question UpVote unsuccessfull")
        }
        const question = await Question.findById(questionid)
        const currentUpvotes = question.upvote +1;
        question.upvote = currentUpvotes
        const newUpvoteCount = await question.save({validateBeforeSave:false})
        return res.status(200).json({
            "error":false,
            "message":"Question Upvoted Successfully",
            "data":newUpVote
        })
    }catch(error){
        return res.status(500).json({
            "error":true,
            "message":"Server Error Occured",
            "data":null
        })
    }
})



app.post('/LogIn/:id/:qid/Bookmark' , authMiddleware , async(req, res)=>{
    try{
        const userid=req.user._id
        const questionid=req.params.qid
        const BookmarkCheck = Bookmark.findOne({userid:userid , questionid:questionid})
        if(BookmarkCheck!== null){
            const UnMark = await Bookmark.findByIdAndDelete(BookmarkCheck._id)
            if(!UnMark){
                throw new Error(500 , "Bookmark not removed due to technical error")
            }
            return res.status(200).json({
                "error":false,
                "message":"Bookmark Removed Succeesfully",
                "data":UnMark
            })
        }
        const newBookmark= await Bookmark.create({userid:userid , questionid:questionid})
        if(!newBookmark){
            throw new Error(500 , "Question Bookmark unsuccessfull")
        }
        return res.status(200).json({
            "error":false,
            "message":"Question Bookmarked Successfully",
            "data":newBookmark
        })
    }catch(error){
        return res.status(500).json({
            "error":true,
            "message":"server Error occured",
            "data":null
        })
    }
})



app.post('/LogIn/:id/:qid/Comment/:cid/UpVote' , authMiddleware , async(req, res)=>{
    try{
        const user = req.user
        const userid=user._id
        const cid=req.params.cid
        const UpVoteCheck = await Upvote.findOne({userid:userid , entityid:cid})
        if(UpVoteCheck!== null){
            const DownVote = await Upvote.findByIdAndDelete(UpVoteCheck._id)
            if(!DownVote){
                throw new Error(500 , "UpVote not removed due to technical error")
            }
            const comment = await Comment.findById(cid)
            const currentUpvotes = comment.upvote - 1;
            comment.upvote = currentUpvotes
            const newUpvoteCount = await comment.save({validateBeforeSave:false})
            return res.status(200).json({
                "error":false,
                "message":"UpVote Removed Succeesfully",
                "data":newUpvoteCount
            })
        }
        const newUpVote= await Upvote.create({userid:userid , entityid:questionid})
        if(!newUpVote){
            throw new Error(500 , "Comment UpVote unsuccessfull")
        }
        const comment = await Comment.findById(cid)
        const currentUpvotes = comment.upvote +1;
        comment.upvote = currentUpvotes
        const newUpvoteCount = await comment.save({validateBeforeSave:false})
        return res.status(200).json({
            "error":false,
            "message":"Comment Upvoted Successfully",
            "data":newUpvoteCount
        })
    }catch(error){
        return res.status(500).json({
            "error":true,
            "message":"Server Error Occures",
            "data":null
        })
    }
})



import { Worker } from 'worker_threads'
app.post('/CodeEditor/:lang' , async(req , res)=>{
    const code=req.body.code;
    const language = req.params.lang
    const input = req.body.input
    try{
        const worker = new Worker('./coder.js');
        worker.postMessage({ code, language , input });
        
        worker.on('message', (message) => {
            console.log('Error')
            if (message.error) {
                return res.status(400).json({ "error":true , "message":message.error , "output":null });
            }
            return res.status(200).json({"error":false , "message":"Successfull Compilation" ,"output": message.output });
        });
        
        worker.on('error', (error) => {
            return res.status(500).json({ "error":true , "message":error.message , "output":null });
        });
        
        worker.on('exit', (code) => {
            if (code !== 0) {
                return res.status(500).json({
                    "error":true,
                    "message":"Some error occurred here",
                    "output":null
                })
            }
        });
        
        
    }catch(error){
        return res.status(500).json({
            "error":true,
            "message":"Some error occurred",
            "output":null
        })
    }
})

// import http from 'http'
// const server = http.createServer(app)

// import { Server } from 'socket.io'
// const io =new Server(server)

// app.use(express.static('views'));
// app.set('view engine' , 'hbs');

// io.on('connection' , (socket) =>{
    //     console.log(socket.id);
//     socket.on('message' , message =>{
    //         io.emit('message' , message)
//     })
// })

// app.get('/ChatRoom' , (req , res)=>{
    //     return res.status(200).render('index.hbs')
// })

// server.listen(3000 , ()=>{
    //     console.log("Listening on port 3000")
// })


import mongoose from 'mongoose'
import { Calender } from './Models/calenderModel.js'
import { error } from 'console'
const mongooseConnect = async ()=>{
    try{
        const connectionResponse = await mongoose.connect(process.env.DB);
        console.log("Mongo Connected Succesfully")
        console.log(process.env.DB)
    }catch(error){
        console.error("Error Occurred in connecting to MongoDB:", error.message);
        throw new Error(error)
    }
}
mongooseConnect().then(()=>{
    app.on("error" , (error)=>{
        console.log(error)
        throw error;
    })
    app.listen( process.env.PORT || 3000 , ()=>{
        console.log(`You are listening on port ${process.env.PORT}`);
    } )
}).catch(error=>{
    console.log("Server Error occured")
})