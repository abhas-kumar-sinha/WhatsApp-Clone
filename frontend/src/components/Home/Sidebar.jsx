
const Sidebar = () => {
  return (
    <div className="sidebar fixed z-20 h-screen bg-[#202C33] w-16">
      
      <div className="flex-1 flex flex-col items-center gap-y-3 pt-3 pb-60">
        <div className="hover:cursor-pointer hover:bg-[#374248] w-[65%] flex items-center justify-center py-2 rounded-full">
        <img src="/chats.svg" height="25" width="25" />
        </div>
        <div className="hover:cursor-pointer hover:bg-[#374248] w-[65%] flex items-center justify-center py-2 rounded-full">
        <img src="/status-1.svg" height="25" width="23"/>
        </div>
        <div className="hover:cursor-pointer hover:bg-[#374248] w-[65%] flex items-center justify-center py-2 rounded-full">
        <img src="/channels.svg" height="25" width="25"/>
        </div>
        <div className="hover:cursor-pointer hover:bg-[#374248] w-[65%] flex items-center justify-center py-2 rounded-full">
        <img src="/community.svg" height="25" width="25"/>
        </div>
        <div className="hover:cursor-pointer hover:bg-[#374248] w-[65%] flex items-center justify-center py-0.5 rounded-full">
        <img src="/gemini.png" height="30" width="35"/>
        </div>
      </div>

      <div className="settings w-full h-24 mt-6 flex flex-col items-center justify-around">
        <div className="hover:cursor-pointer hover:bg-[#374248] text-[#AEBAC1] w-[65%] flex items-center justify-center py-2 rounded-full">
          <i className='bx bx-cog text-2xl'></i>
        </div>

        <div className="hover:cursor-pointer profile-pic-wrapper bg-[#CFD4D6] h-10 w-10 rounded-full">
        <i className='bx bxs-user-circle text-5xl text-[#6A7175] mt-[-3.35px] ms-[-3.7px]'></i>
        </div>
      </div>
    </div>
  )
}

export default Sidebar