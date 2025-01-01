import socket from 'socket.io-client';
import Cookie from "universal-cookie";

let socketInstance = null;

const cookie = new Cookie();

export const initializeSocket = (projectId) => {

    console.log("Initializing socket connection...")

    socketInstance = socket("http://localhost:3000/", {
        auth: {
            token: cookie.get('token')
        },
        query: {
            projectId
        }
    });

    return socketInstance;

}

export const receiveMessage = (eventName, cb) => {
    socketInstance.on(eventName, cb);
}

export const sendMessage = (eventName, data) => {
    socketInstance.emit(eventName, data);
}