const mongoose =require('mongoose');
const Schema =mongoose.Schema;

const PostSchema = new Schema ( {
    name: {
        type: String,
        require: true
    },
    text: {
        type: String,
        require: true
    }
});

module.exports= Post =mongoose.model('post', PostSchema);