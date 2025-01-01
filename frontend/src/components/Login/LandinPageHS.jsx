import QRLogin from "./QRLogin";
import PhoneLogin from "./PhoneLogin";
import EmailLogin from "./EmailLogin";
import PhoneVerification from "./PhoneVerification";
import { useUserContext } from "../../context/user.context";

const LandinPageHS = () => {

    const { phoneLogin, phoneVerify, emailLogin } = useUserContext();

    function generateContent() {

        if (emailLogin) {
            return(<EmailLogin />)
        }

        if (!phoneLogin) {
            return(<QRLogin />)
        } 

        if (!phoneVerify) {
            return(<PhoneLogin />)
        }
        
        return(<PhoneVerification />)
    }

    return (
        <div className="hero-section bg-landing-page-bg min-h-screen w-full flex flex-col items-center">
            <div className="login-wrapper bg-white rounded-3xl border border-black px-[4.2rem] py-12 mt-3 min-h-[30.2rem] w-[61rem]">
                {generateContent()}
            </div>

            <div className="encryption-msg text-sm mt-8 flex items-center text-slate-700 mb-20">
                <i className='bx bx-lock text-lg me-2'></i> Your personal messages are end-to-end encrypted
            </div>
        </div>
    )
}

export default LandinPageHS