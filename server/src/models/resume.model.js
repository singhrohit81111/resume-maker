const mongoose=require('mongoose');


const resumeSchema=new mongoose.Schema({
    latexData:{
        type:String
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"User",
    }
})

const Resume=mongoose.model("Resume",resumeSchema);

module.exports=Resume;