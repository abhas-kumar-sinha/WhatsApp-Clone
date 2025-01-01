import PropType from "prop-types";

const messageBox = (props) => {
  return (
    <div 
    className={props.sender !== "You" ? 
    "bg-[#202C33] relative p-3 pt-1 rounded-lg mb-3 me-auto mt-auto inline-block max-w-[55%] min-w-[13%]" 
    : "bg-[#005C4B] relative p-3 pt-1 rounded-lg mb-3 ms-auto mt-auto inline-block max-w-[55%] min-w-[13%]"}>
    <p className='text-[#25D366] text-sm'>{props.sender}</p>
    <p className="text-[#E9EDEF] mb-2 me-2">{props.message}</p>
    <time className="text-[#AEBAC1] text-xs absolute right-1 bottom-1">{props.time}</time>
  </div>
  )
}

messageBox.propTypes = {
  sender: PropType.string,
  time: PropType.string,
  message: PropType.string
}

export default messageBox