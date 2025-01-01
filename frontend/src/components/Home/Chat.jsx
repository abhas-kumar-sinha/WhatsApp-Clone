import PropType from "prop-types";

const Chat = (props) => {

  function handleUserSelect(e, user) {
    props.setSelectedUser(user)
  }

  return (
    <div onClick={(e) => handleUserSelect(e, props.user)} className="flex chats h-20 w-full border-b p-4 border-[#202C33] hover:bg-[#202C33] hover:cursor-pointer">
        <img className="rounded-full" src="/placeholderUser.jpg" height="25"/>
        <div className="description flex-1 ms-4 text-[17px]">
            <h2>{props.name}</h2>
            <h2 className="text-xs text-[#747677]">{props.email}</h2>
        </div>
    </div>
  )
}

Chat.propTypes = {
  name: PropType.string,
  email: PropType.string,
  user: PropType.object,
  setSelectedUser: PropType.func,
}

export default Chat