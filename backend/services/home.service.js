import projectModel from '../modals/project.modal.js';
import mongoose from 'mongoose';

export const getConversationsForUser = async ({ userId }) => {
    try {
        const conversations = await projectModel.find({
            participants: userId
        }).populate('participants', 'name email')
          .populate({
                path: 'messages.senderId', // Populating senderId inside messages
                select: 'name email' // Only include name and email
            });

        return conversations;
    } catch (error) {
        console.error('Error fetching conversations:', error);
        throw error;
    }
};

export const addMessage = async ({ senderId, receiverId, message }) => {
    try {
        senderId = new mongoose.Types.ObjectId(senderId);
        receiverId = new mongoose.Types.ObjectId(receiverId);

        let conversation = await projectModel.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        if (!conversation) {
            conversation = await projectModel.create({
                participants: [
                new mongoose.Types.ObjectId(senderId),
                new mongoose.Types.ObjectId(receiverId),
                ],
                messages: [],
            });
        }

        conversation.messages.push({
            message: message,
            senderId: senderId,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });

        const savedConversation = await conversation.save();
        return savedConversation;

    } catch (error) {
        console.error('Error adding message:', error);
        throw error;
    }
};

export const addAiMessage = async ({ senderId, receiverId, message, aiSenderId }) => {
    try {
        senderId = new mongoose.Types.ObjectId(senderId);
        receiverId = new mongoose.Types.ObjectId(receiverId);

        let conversation = await projectModel.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        if (!conversation) {
            conversation = await projectModel.create({
                participants: [
                new mongoose.Types.ObjectId(senderId),
                new mongoose.Types.ObjectId(receiverId),
                ],
                messages: [],
            });
        }

        conversation.messages.push({
            message: message,
            senderId: aiSenderId,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });

        const savedConversation = await conversation.save();
        return savedConversation;

    } catch (error) {
        console.error('Error adding message:', error);
        throw error;
    }
};


export const addUsersToProject = async ({ projectId, users, userId }) => {

    if (!projectId) {
        throw new Error("projectId is required")
    }

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        throw new Error("Invalid projectId")
    }

    if (!users) {
        throw new Error("users are required")
    }

    if (!Array.isArray(users) || users.some(userId => !mongoose.Types.ObjectId.isValid(userId))) {
        throw new Error("Invalid userId(s) in users array")
    }

    if (!userId) {
        throw new Error("userId is required")
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new Error("Invalid userId")
    }


    const project = await projectModel.findOne({
        _id: projectId,
        users: userId
    })


    if (!project) {
        throw new Error("User not belong to this project")
    }

    const updatedProject = await projectModel.findOneAndUpdate({
        _id: projectId
    }, {
        $addToSet: {
            users: {
                $each: users
            }
        }
    }, {
        new: true
    })

    return updatedProject


}

export const getProjectById = async ({ projectId }) => {
    if (!projectId) {
        throw new Error("projectId is required")
    }

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        throw new Error("Invalid projectId")
    }

    const project = await projectModel.findOne({
        _id: projectId
    }).populate('users')

    return project;
}

export const updateFileTree = async ({ projectId, fileTree }) => {
    if (!projectId) {
        throw new Error("projectId is required")
    }

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        throw new Error("Invalid projectId")
    }

    if (!fileTree) {
        throw new Error("fileTree is required")
    }

    const project = await projectModel.findOneAndUpdate({
        _id: projectId
    }, {
        fileTree
    }, {
        new: true
    })

    return project;
}