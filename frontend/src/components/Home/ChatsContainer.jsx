import Chat from "./Chat";
import PropType from 'prop-types';
import { useState, useEffect } from 'react';
import { useUserContext } from "../../context/user.context"
import axiosInstance from "../../config/axios.js"

const ChatsContainer = (props) => {

    const { userRef } = useUserContext();

    const [users, setUsers] = useState();
    const [loading, setLoading] = useState(true);

    const getAllUsers = async () => {
    try {
        const response = await axiosInstance.post(props.endPoint, { senderId: userRef.current._id });
        setUsers(response.data)
    } catch (error) {
        console.error('Error fetching users:', error);
    } finally {
        setLoading(false);
    }
    };

    useEffect(() => {
        getAllUsers();
    }, []); 

    function handleAddUser() {
        props.setAddNew("4rem");
    }

    function handleGoBack() {
        props.setAddNew("-28rem");
    }

    function generateSubTitles() {
        return props.asideData.subTitle.map((title, index) => {
        return (
            <a key={index}
            className="rounded-full me-2 bg-[#26353D] text-[#869690] px-3 py-1.5 text-sm font-normal hover:bg-[#0A332C] shadow-sm hover:text-[#00A884] hover:cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
            {title}
        </a>
        )
        })
    }

    function generateIcons() {
        if (props.asideData.feature === "slide-in") {
        return (
            <button onClick={handleGoBack} className='focus:bg-[#374248] rounded-full px-2 py-0.5'>
            <i className='bx bx-arrow-back text-[#25D366]'></i>
            </button>
        )
    }

        return (
        <>
        <button onClick={handleAddUser} className='focus:bg-[#374248] rounded-full px-2 py-0.5'>
        <i className='bx bx-message-add mt-1.5'></i>
        </button>

        <button className='focus:bg-[#374248] rounded-full px-2 py-0.5'>
        <i className='bx bx-dots-vertical-rounded text-[#AEBAC1]'></i>
        </button>
        </>
        )
    }

    function loadingAnimation() {
        return(
        <svg
            className="animate-spin h-20 w-20"
            fill="none"
            height="20"
            viewBox="0 0 20 20"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M10 3C6.13401 3 3 6.13401 3 10C3 10.2761 2.77614 10.5 2.5 10.5C2.22386 10.5 2 10.2761 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18C9.72386 18 9.5 17.7761 9.5 17.5C9.5 17.2239 9.72386 17 10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3Z"
                fill="#D1D7DB"
            />
        </svg>
        )
    }

    function checkExistance(user) {
        if (user.name) {
            return(<Chat user={user} setSelectedUser={props.setSelectedUser} key={user._id} name={user.name} email={user.email} />)
        }
        else{
            let num=1;
            if (user.participants[1]._id == userRef.current._id) {
                num=0;
            }
            return(<Chat user={user} setSelectedUser={props.setSelectedUser} key={user.participants[num]._id} name={user.participants[num].name} email={user.participants[num].email} />)
        }
    }

    function generateAllChatList() {
        if (users && Array.isArray(users.users)) {
            return users.users.map((user) => (
                checkExistance(user)
            ));
        }
    }

    function GenerateContacts() {
        if (loading) {
            return (
                <div className="loading-container flex justify-center items-center h-full">
                    {loadingAnimation()}
                </div>
            );
        }
    
        return (
            <div className="chat-list">
                {users && users.users.length > 0 ? (
                    generateAllChatList()
                ) : (
                    <p className="text-center text-[#8696A0]">No users available.</p>
                )}
            </div>
        );
    }

    return (
            <div
                className={
                    props.asideData.feature === "slide-in"
                        ? "chat-wrapper h-screen w-[32rem] absolute z-10 bg-[#111B21] text-white py-4 border-r border-[#222C33] pe-[1px] transition-all duration-300 ease-in-out"
                        : "chat-wrapper h-screen w-[37.2rem] bg-[#111B21] ms-16 text-white py-4 border-r border-[#222C33] pe-[1px]"
                }
                style={
                    props.asideData.feature === "slide-in"
                        ? { left: props.addNew }
                        : {}
                }
            >
            <h2 className="chat-head px-3.5 text-[1.4rem] font-semibold flex items-center">
                <p className="flex-1">{props.asideData.title}</p>

                <div className="options flex gap-x-7 text-[#AEBAC1]">
                {generateIcons()}
                </div>
            </h2>

            <div className="search-bar mx-3.5 mt-5 flex items-center bg-[#202C33] rounded-lg">
            <i className='bx bx-search-alt-2 min-w-10 px-3.5 mt-[5px] text-[#8696A0]'></i>
            <input
                    name="email"
                    type="text"
                    required
                    placeholder="Search"
                    autoComplete="email"
                    className="flex-auto bg-transparent px-3.5 py-1.5 text-base text-white placeholder:text-[#8696A0] focus:outline-none sm:text-md/6"
                />
            </div>

            <div className="chat-nav-options mt-2.5 px-3.5">
                {generateSubTitles()}
            </div>

            <div className="chat-container w-full h-[76.4%] mt-3 overflow-y-auto select-none">

            {GenerateContacts()}
                
            </div>
        </div>
    )
}

ChatsContainer.propTypes = {
  addNew: PropType.string,
  setAddNew: PropType.func,
  asideData: PropType.object,
  endPoint: PropType.string,
  setSelectedUser: PropType.func,
}

export default ChatsContainer