import userModal from '../modals/user.modal.js';

export const createUser = async ({name, email, password}) => {

    if (!name) {
        throw new Error('Name is required');
    }

    if (!email || !password) {
        throw new Error('Email and password are required');
    }

    const hashedPassword = await userModal.hashPassword(password);

    try {
        const user = await userModal.create({
            name,
            email,
            password: hashedPassword
        });

        return user;
    } catch (error) {
        throw new Error('Email already exists');
    }

}

export const getAllUsers = async ({ senderId }) => {
    const users = await userModal.find({
        _id: { $ne: senderId }
    });
    return users;
}