import ChatsContainer from "../components/Home/ChatsContainer"
import Sidebar from "../components/Home/Sidebar"
import ChatView from "../components/Home/ChatView"
import { initializeSocket, receiveMessage, sendMessage } from '../config/socket.js';
import { useState, useEffect } from 'react';

const Home = () => {

    const [selectedUser, setSelectedUser] = useState({"_id": null,
                                                      "participants": [{}, {name: null}],
                                                      "messages": [],
    })

    const [messages, setMessages] = useState()

    useEffect(() => {
      setMessages(selectedUser.messages || []);
    }, [selectedUser.messages]);

    const [addNew, setAddNew] = useState("-28rem");

    const asideDataChats = {
      title: 'Chats',
      subTitle: ['All', 'Unread', 'Favourites','Groups'],
      feature: "static",
    }

    const asideDataAddUser = {
      title: 'New Chat',
      subTitle: [],
      feature: "slide-in",
    }

    useEffect(() => {
      try{
      if (selectedUser.participants[0].name) {
      const socket = initializeSocket(selectedUser._id);
  
      receiveMessage('message', (data) => {
          setMessages((prev) => [...prev, data]);
      });
  
      return () => {
          socket.disconnect();
      };}}
      catch{
        console.log("No user selected")
      }
    }, [selectedUser]);

  return (
    <div className="home-container flex">
    <Sidebar />
    <ChatsContainer addNew={addNew} setAddNew={setAddNew} asideData={asideDataChats} endPoint={'/home/all'} setSelectedUser={setSelectedUser} />
    <ChatsContainer addNew={addNew} setAddNew={setAddNew} asideData={asideDataAddUser} endPoint={'/users/all'} setSelectedUser={setSelectedUser} />
    <ChatView selectedUser={selectedUser} messages={messages} setMessages={setMessages} sendMessage={sendMessage} />
    </div>
  )
}

export default Home