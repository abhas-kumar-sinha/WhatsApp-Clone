import { Menu, MenuButton } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useState, useRef, useEffect } from "react";
import MessageBox from './MessageBox.jsx';
import PropType from "prop-types";
import axiosInstance from '../../config/axios.js';
import { useUserContext } from '../../context/user.context.jsx';

const ChatView = (props) => {

  const { userRef } = useUserContext();

  const textareaRef = useRef(null);
  const [value, setValue] = useState("");

  const handleInput = (event) => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto"; // Reset height to calculate new height
    textarea.style.height = `${Math.min(
      textarea.scrollHeight,
      2 * 8 * 16
    )}px`; // Calculate height with max limit for 8 rows
    setValue(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // Prevent adding a new line
      if (value.trim() !== "") {
        handleSend()
        setValue(""); // Clear the textarea after sending
        textareaRef.current.style.height = "2rem"; // Reset height to 1 row
      }
    }
  };

  let checkedRecId=null
    if (props.selectedUser.name) {
      checkedRecId =  props.selectedUser._id
    }
    else{
      checkedRecId =  props.selectedUser.participants[1]._id == userRef.current._id ? props.selectedUser.participants[0]._id : props.selectedUser.participants[1]._id
    }

  async function handleSend() {
    if (value.trim() !== "") {
      try {
        const newMessage = { senderId: userRef.current._id,
          receiverId: checkedRecId,
          message: value
        }

        const populatedNewMessage = {
          senderId: {
            _id: userRef.current._id,
            name: userRef.current.name,
            email: userRef.current.email,
          },
          receiverId: checkedRecId,
          message: value,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
        await axiosInstance.post("/home/add-message", 
          newMessage);
         props.setMessages((prevMessages) => [...prevMessages, populatedNewMessage]);
         props.sendMessage("message", populatedNewMessage)
      } catch (error) {
          console.error('Error fetching users:', error);
      } finally {
        setValue(""); // Clear the textarea after sending
        textareaRef.current.style.height = "2rem"; // Reset height to 1 row
      }
    }
  }

  function generateAllMsgBlocks() {
    try{
      return props.messages.map((msg, idx) => {
        let checkSender = "You";
        if (msg.senderId._id !== userRef.current._id) {
          checkSender = msg.senderId.name;
        }
        return(<MessageBox key={idx} sender={checkSender} time={msg.time} message={msg.message} /> )
      })
    }
    catch{
      return(<></>)
    }

  }

  function giveName() {
    try{
      let num=1;
      if (props.selectedUser.participants[1]._id == userRef.current._id) {
          num=0;
      }
      return(props.selectedUser.participants[num].name)
    }
    catch{
      return(props.selectedUser.name)
    }
  }

  const containerRef = useRef(null);
  const [showScrollDown, setShowScrollDown] = useState(false);

    // Scroll to the bottom when messages are updated
      useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [props.messages]);

    // Handle scroll visibility for the "Scroll Down" button
    const handleScroll = () => {
        if (containerRef.current) {
            const isAtBottom =
                containerRef.current.scrollHeight - containerRef.current.scrollTop <=
                containerRef.current.clientHeight + 50; // Adjust threshold if needed
            setShowScrollDown(!isAtBottom);
        }
    };

    // Scroll down on button click
    const scrollToBottom = () => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    };

  return (
    <div
      className="relative chat-view w-[64%] h-screen bg-[#0B141A] 
                before:absolute before:inset-0 
                before:bg-[url('/chatBgNew.png')] 
                before:brightness-[0.15] before:opacity-65"
    >
        <div className="w-full bg-[#202C33] h-16 absolute top-0 flex px-5 py-2.5">
          <img className="rounded-full" src="/placeholderUser.jpg" height="20"/>
          <div className="description flex-1 ms-4 text-[16px] tracking-tight font-semibold text-[#E9EDEF]">
              <h2>{giveName()}</h2>
          </div>
          <Menu as="div" className="relative inline-block text-left">
            <div className='flex items-center gap-x-6 me-2 mt-1'>
              <MenuButton className="inline-flex w-full justify-center gap-x-1.5 focus:bg-[#374248] rounded-full bg-transparent px-3 py-2 font-semibold text-[#4C5D66] shadow-sm">
                <i className='bx bxs-video text-[1.3rem]'></i>
                <ChevronDownIcon aria-hidden="true" className="-mr-1 mt-1 size-3 " />
              </MenuButton>

              <i className='bx bx-search-alt-2 text-[1.39rem] text-[#AEBAC1]'></i>

              <i className='bx bx-dots-vertical-rounded text-2xl text-[#AEBAC1]'></i>
            </div>
          </Menu>
        </div>

        <div ref={containerRef} onScroll={handleScroll} className="max-h-[calc(100vh-7.9rem)] w-full flex flex-col absolute mt-16 overflow-scroll bg-transparent ps-7 pt-3 pe-14">
          {generateAllMsgBlocks()}     
          {showScrollDown && (
                <div
                    className="scroll-down bg-[#202C33] text-[#798287] h-11 w-11 flex items-center justify-center text-2xl rounded-full position fixed bottom-20 right-2"
                    onClick={scrollToBottom}
                    style={{ cursor: "pointer" }}
                >
                    <i className="bx bxs-chevron-down"></i>
                </div>
            )}   
        </div>

        <div className="w-full min-h-[3.9rem] absolute bottom-0 bg-[#202C33] px-6 py-2.5 flex items-end">
            <i className='bx bx-plus text-[#D1D7DB] text-3xl me-4 mb-1'></i>
            <div className="input-wrapper min-h-[2.65rem] pe-2 bg-[#2A3942] flex-1 rounded-lg h-full flex items-end">
              <i className='bx bx-note text-[#83949E] text-2xl mx-3 mb-2'></i>
              <textarea
              ref={textareaRef}
              rows="1"
              value={value}
              onInput={handleInput}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full mb-[0.325rem] bg-transparent rounded resize-none overflow-y-scroll focus:outline-none text-[#D1D7DB]"
              style={{
                maxHeight: "calc(2rem * 8)", // Limit to 8 rows
                lineHeight: "2rem", // Ensure consistent line height
                height: "2rem", // Initial height for 1 row
              }}
              placeholder="Type a message"
            ></textarea>
            </div>
            <i onClick={handleSend} className='bx bxs-send text-[#8696A0] text-2xl ms-4 mb-2'></i>
        </div>
    </div>
  )
}

ChatView.propTypes = {
  selectedUser: PropType.object,
  messages: PropType.arrayOf(PropType.object),
  setMessages: PropType.func,
  sendMessage: PropType.func,
}

export default ChatView