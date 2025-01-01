import QRCodeGenerator from "../../generator/QRCodeGenerator";
import { useUserContext } from "../../context/user.context";

const QRLogin = () => {

    const { setPhoneLogin, setEmailLogin } = useUserContext();

    function handlePhoneLogin() {
        setPhoneLogin(true);
    }

  return (
    <>
        <div className="login-heading">
            <h2 className="text-[2rem]">Log into WhatsApp Web</h2>
        </div>

        <div className="login-msg flex">
            <div className="msg-left w-[34rem] text-[1.15rem]">
                <p>Message privately with friends and family using WhatsApp on your browser.</p>

                <ol start="1" className="mt-6">
                    <li className="mt-3.5 text-[1.15rem]">1. Open WhatsApp on your phone</li>
                    <li className="mt-3.5 text-[1.15rem] flex">2. Tap Menu&nbsp;
                        <div className="icon-wrapper border px-.5 h-7 rounded-md bg-[#F5F6F8] text-[#565D62]"> 
                        <i className='bx bx-dots-vertical-rounded'></i> 
                        </div>&nbsp;
                        on Android, or Settings&nbsp;
                        <div className="icon-wrapper border px-.5 h-7 rounded-md bg-[#F5F6F8] text-[#565D62] ps-0.5 w-6">
                        <i className='bx bx-cog'></i>
                        </div>&nbsp;
                        on iPhone
                    </li>
                    <li className="mt-3.5 text-[1.15rem]">3. Tap Linked devices and then Link a device</li>
                    <li className="mt-3.5 text-[1.15rem]">4. Point your phone at this screen to scan the QR code</li>
                </ol>
                
                <div className="msg-links flex flex-col mt-7">
                    <div className="link-wrapper hover:text-[#25D366] hover:cursor-pointer w-56 flex items-center">
                    <a onClick={() => setEmailLogin(true)} className="mt-2 text-[1rem] border-b-2 border-[#25D366] w-48">Need help getting started?</a><p className="ms-3">↗</p>
                    </div>
                    <div onClick={handlePhoneLogin} className="link-wrapper hover:text-[#25D366] hover:cursor-pointer w-56 mt-3 flex">
                    <a className="text-[1rem] border-b-2 w-48 border-[#25D366]">Log in with phone number</a><i className='bx bx-chevron-right text-2xl'></i>
                    </div>
                </div>
            </div>

            <div className="msg-right h-[18rem] w-[16rem] ms-10">
                <QRCodeGenerator loginLink={"http://localhost:5173/"}/>
            </div>
        </div>
    </>
  )
}

export default QRLogin