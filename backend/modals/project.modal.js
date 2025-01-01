import mongoose from 'mongoose';

const messagesSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true
    },

    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

    time: {
        type: String,
        default: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
})

const projectSchema = new mongoose.Schema({
    messages: [messagesSchema],

    participants:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }
    ],

})


const Project = mongoose.model('project', projectSchema)


export default Project;