const mongoose=require('mongoose');

const BlogSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },

    content:{
        type:String,
        required:true,
    },
    
    createdAt:{
        type:Date,
        default:Date.now,
    },

    author:{
       type:mongoose.Schema.Types.ObjectId,
       ref:'User',
       required:true,
    },
    likes: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        default: [], // Ensure default empty array
    },
});

module.exports=mongoose.model('Blog',BlogSchema);