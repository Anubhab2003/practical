import mongoose from "mongoose"

const userSchema=new mongoose.Schema({
    gender:{
        type:String,
        required:true
    },
    number:{
        type:Number,
        required:true
    },
    couresEnrolled:{
        type:String,
        required:true
    }

    
},{timestamps:true}
)
userSchema.plugin(passportLocalMongoose);

const User=mongoose.model("User",userSchema)

export default User