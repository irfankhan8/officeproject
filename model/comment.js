import mongoose from "mongoose";

const commetsScheam = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Users',
        required: true
    },
    comment: {
        type: String,
        require: true
    },
    post_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'PostUser',
        required: true
    },
    
    is_delete: {
        type: Boolean,
        default: 0
    },
    status: {
        type: Boolean,
        default: 1
    },
  
    
}, { timestamps: true })
const Comment = mongoose.model('comment',commetsScheam)
export default Comment