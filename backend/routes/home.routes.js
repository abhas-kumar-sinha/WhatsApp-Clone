import { Router } from 'express';
import { body } from 'express-validator';
import * as homeController from '../controller/home.controller.js';
import * as authMiddleWare from '../middleware/auth.middleware.js';

const router = Router();

router.post('/all',
    body('senderId').isString().withMessage('Name is required'),
    homeController.getAllProject
)

router.post('/add-message',
    body('senderId').isString().withMessage('Name is required'),
    body('receiverId').isString().withMessage('Name is required'),
    body('message').isString().withMessage('Name is required'),
    homeController.addMessage
)

// router.put('/add-user',
//     authMiddleWare.authUser,
//     body('projectId').isString().withMessage('Project ID is required'),
//     body('users').isArray({ min: 1 }).withMessage('Users must be an array of strings').bail()
//         .custom((users) => users.every(user => typeof user === 'string')).withMessage('Each user must be a string'),
//     homeController.addUserToProject
// )

router.get('/get-project/:projectId',
    authMiddleWare.authUser,
    homeController.getProjectById
)

// router.put('/update-file-tree',
//     authMiddleWare.authUser,
//     body('projectId').isString().withMessage('Project ID is required'),
//     body('fileTree').isObject().withMessage('File tree is required'),
//     homeController.updateFileTree
// )


export default router;