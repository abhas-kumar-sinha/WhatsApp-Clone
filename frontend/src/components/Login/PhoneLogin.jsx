import CountriesData from '../../Data/countriesData';
import { useUserContext } from '../../context/user.context';

const PhoneLogin = () => {

    const {phoneNumber, setPhoneNumber, selectedCountry, setSelectedCountry, setPhoneVerify, setPhoneLogin} = useUserContext();

    function handleQRLogin() {
        setPhoneLogin(false);
    }

    function handlePhoneSubmit() {
      if (phoneNumber.length != 10 || !(/^[0-9]+$/.test(phoneNumber))) return;
      setPhoneVerify(true)
    }

  return (
    <>
        <div className="login-heading">
            <h2 className="text-[2rem] text-center">Enter phone number</h2>
            <p className="text-center text-xl mt-2">Select a country and enter a phone number.</p>
        </div>

        <div className="input-wrapper w-full flex justify-center mt-6">
            <CountriesData selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} />
        </div>

        <div className="input-wrapper w-full flex justify-center mt-6">
            <div>
            <div className="mt-[-0.8rem]">
                <div className="flex items-center rounded-full bg-white pl-3 outline outline-1 -outline-offset-1 outline-black has-[input:focus-within]:outline has-[input:focus-within]:outline-1 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-[#25D366]">
                <div className="shrink-0 select-none text-base text-black ms-4 sm:text-md/6">{selectedCountry.phoneCode}</div>
                <input
                    id="price"
                    name="price"
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="block tracking-widest py-[15px] min-w-[270px] rounded-full grow pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-md/6"
                />
                </div>
            </div>
            </div>
        </div>

        <span className="sm:ml-3 flex flex-col items-center mt-14">
          <button
            onClick={handlePhoneSubmit}
            type="button"
            className="inline-flex transition-colors duration-1000 overflow-hidden items-center bg-[#017561] text-white hover:text-white  px-6 py-1 text-[1.1rem] font-normal shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 border border-black rounded-full tracking-tighter relative"
          >
            <p className='z-50'>Next
            </p>
          </button>
        </span>

        <div className="msg-links flex mt-3 ms-4 justify-center"> 
            <div onClick={handleQRLogin} className="link-wrapper hover:text-[#25D366] hover:cursor-pointer w-44 mt-3 flex">
            <a className="text-[1rem] border-b-2 w-36 border-[#25D366]">Log in with QR code</a><i className='bx bx-chevron-right text-2xl'></i>
            </div>
        </div>
      </>
  )
}


export default PhoneLogin;