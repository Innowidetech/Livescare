var mongoose = require ('mongoose');
const BlogSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true,
    },
    tags:{
        type:[String],
    },
    description:{
        type:String,
        require:true,
    },
    image: {
        type: String,
        required: true,
    },
},{timestamps:true});
module.exports = mongoose.model('Blog',BlogSchema);