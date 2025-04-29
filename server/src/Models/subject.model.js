import mongoose from "mongoose"

const subjectSchema=new mongoose.Schema({
    subjectName:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    units:{
        type:String,
        required:true
    }
})
export const Subject=mongoose.model("Subject",subjectSchema)