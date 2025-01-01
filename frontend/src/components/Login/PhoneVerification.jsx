import { useUserContext } from "../../context/user.context"
import UniquecodeGenerator from "../../generator/uniquecodeGenerator";
import { useEffect } from "react";
import Cookie from 'universal-cookie';

const PhoneVerification = () => {

    const cookies = new Cookie();

    const { phoneNumber, selectedCountry, setPhoneLogin, setPhoneVerify, isLoggedIn, setIsLoggedIn } = useUserContext();

    useEffect(() => {
        if (isLoggedIn) {
            setPhoneLogin(false);
            setPhoneVerify(false);
        }

        const newTimeout = setTimeout(() => {
            setIsLoggedIn(true);
            cookies.set('isLoggedIn', 'true', { path: '/' });
        }, 3000);

        return () => clearTimeout(newTimeout)
    }, [isLoggedIn]);

    function handleQRLogin() {
        setPhoneLogin(false);
        setPhoneVerify(false);
    }

    function handleEditPhoneNumber() {
        setPhoneLogin(true);
        setPhoneVerify(false);
    }

return (
    <>
        <div className="login-heading">
            <h2 className="text-[2rem]">Enter code on phone</h2>
        </div>

        <div className="login-msg flex">
            <div className="msg-left w-full text-[1.15rem]">
                <p>Linking WhatsApp account <span className="font-semibold"> {selectedCountry.phoneCode} {phoneNumber} </span> (<a onClick={handleEditPhoneNumber} className="text-[#008069] hover:cursor-pointer">edit</a>)</p>

                <div className="unique-code-container h-24 rounded-lg bg-[#F4F4F4] w-full mt-6">
                    <UniquecodeGenerator />
                </div>

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
                    <li className="mt-3.5 text-[1.15rem]">4. Tap Link with phone number instead and enter this code on your phone</li>
                </ol>

                <div className="msg-links flex flex-col mt-7">
                    <div className="link-wrapper hover:text-[#25D366] hover:cursor-pointer w-56 flex items-center">
                    <a href="#" className="mt-2 text-[1rem] border-b-2 border-[#25D366] w-48">Need help getting started?</a><p className="ms-3">↗</p>
                    </div>
                    <div onClick={handleQRLogin} className="link-wrapper hover:text-[#25D366] hover:cursor-pointer w-44 mt-3 flex">
                    <a className="text-[1rem] border-b-2 w-36 border-[#25D366]">Log in with QR code</a><i className='bx bx-chevron-right text-2xl'></i>
                    </div>
                </div>
                
            </div>

        </div>
    </>
  )
}

export default PhoneVerification