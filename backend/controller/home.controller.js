import * as homeService from '../services/home.service.js';
import userModel from '../modals/user.modal.js';
import { validationResult } from 'express-validator';

export const addMessage = async (req, res) => {

    try {

        const { senderId, receiverId, message } = req.body;

        const addedMessage = await homeService.addMessage({ senderId, receiverId, message });

        return res.status(200).json({
            addMessage: addedMessage
        })

    } catch (err) {
        console.log(err)
        res.status(400).json({ error: err.message })
    }

}

export const getAllProject = async (req, res) => {
    try {

        const { senderId } = req.body;

        const allUserProjects = await homeService.getConversationsForUser({
            userId: senderId
        })

        return res.status(200).json({
            users: allUserProjects
        })

    } catch (err) {
        console.log(err)
        res.status(400).json({ error: err.message })
    }
}

export const addUserToProject = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {

        const { projectId, users } = req.body

        const loggedInUser = await userModel.findOne({
            email: req.user.email
        })


        const project = await homeService.addUsersToProject({
            projectId,
            users,
            userId: loggedInUser._id
        })

        return res.status(200).json({
            project,
        })

    } catch (err) {
        console.log(err)
        res.status(400).json({ error: err.message })
    }


}

export const getProjectById = async (req, res) => {

    const { projectId } = req.params;

    try {

        const project = await homeService.getProjectById({ projectId });

        return res.status(200).json({
            project
        })

    } catch (err) {
        console.log(err)
        res.status(400).json({ error: err.message })
    }

}