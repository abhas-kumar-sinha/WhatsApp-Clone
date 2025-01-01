import { Router } from 'express';
import * as userController from '../controller/user.controller.js';
import { body } from 'express-validator';
// import * as authMiddleware from '../middleware/auth.middleware.js';

const router = Router();

router.post(
    '/register',    

    [
        body('name').isLength({ min: 2 }).withMessage('Name must be at least 2 characters long'),
        body('email').isEmail().withMessage('Email must be a valid email address'),
        body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
    ],

    userController.createUserController
);

router.post(
    '/login',    

    [
        body('name').isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
        body('email').isEmail().withMessage('Email must be a valid email address'),
        body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
    ],

    userController.loginController
);

// router.get('/profile', authMiddleware.authUser, userController.profileController);


// router.get('/logout', authMiddleware.authUser, userController.logoutController);


router.post('/all', userController.getAllUsersController);


export default router;
