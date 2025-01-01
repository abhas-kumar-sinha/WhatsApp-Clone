import 'dotenv/config';
import http from 'http';
import app from './app.js';
import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import projectModel from './modals/project.modal.js';
import { generateResult } from './services/ai.service.js';
import { addAiMessage } from "./services/home.service.js"

const port = process.env.PORT || 3000;

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*'
    }
});

io.use(async (socket, next) => {

    try {

        const token = socket.handshake.auth?.token || socket.handshake.headers.authorization?.split(' ')[ 1 ];
        const projectId = socket.handshake.query.projectId;


        if (!mongoose.Types.ObjectId.isValid(projectId)) {
            return next(new Error('Invalid projectId'));
        }


        socket.project = await projectModel.findOne({_id: projectId});

        socket.senderId = socket.project.participants[0];
        socket.receiverId = socket.project.participants[1];


        if (!token) {
            return next(new Error('Authentication error'))
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return next(new Error('Authentication error'))
        }


        socket.user = decoded;

        next();

    } catch (error) {
        next(error)
    }

})


io.on('connection', socket => {
    socket.roomId = socket.project._id.toString()

    console.log('a user connected', socket.roomId);

    socket.join(socket.roomId);

    socket.on('message', async data => {

        const message = data.message;

        const aiIsPresentInMessage = message.includes('@ai');
        socket.broadcast.to(socket.roomId).emit('message', data)
        console.log(data)

        if (aiIsPresentInMessage) {


            const prompt = message.replace('@ai', '');

            const result = await generateResult(prompt);

            if (result.trim() === '') {
                result = "Sorry, I didn't get that. Can you please try again?"
            }

            const populatedNewMessage = {
                senderId: {
                  _id: new mongoose.Types.ObjectId("6774dc1034d00b610be81b49"),
                  name: "ai",
                  email: "ai@whatsapp.com",
                },
                receiverId: socket.receiverId,
                message: result,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              } 

            io.to(socket.roomId).emit('message', populatedNewMessage)

            await addAiMessage({senderId: socket.senderId,receiverId: socket.receiverId,message: result, aiSenderId: new mongoose.Types.ObjectId("6774dc1034d00b610be81b49")})


            return
        }


    })

    socket.on('disconnect', () => {
        console.log('user disconnected');
        socket.leave(socket.roomId)
    });
});




server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})