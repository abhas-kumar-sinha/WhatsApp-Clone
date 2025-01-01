import { useUserContext } from '../../context/user.context';
import axiosInstance from '../../config/axios'
import Cookie from "universal-cookie";

const EmailLogin = () => {

    const cookie = new Cookie();

    const {userRef, name, email, password, setName, setEmail, setPassword, setEmailLogin, setIsLoggedIn} = useUserContext();

    function handleQRLogin() {
        setEmailLogin(false)
    }

    function handleRegister() {

        axiosInstance.post('/users/register', {
            name,
            email,
            password
        }).then((res) => {

            localStorage.setItem('user', JSON.stringify(res.data.user))
            userRef.current = res.data.user
            cookie.set('token', res.data.token);
            setIsLoggedIn(true);
            cookie.set('isLoggedIn', true)

        }).catch((err) => {
            console.log(err.response.data)
        })

    }

    function handleLogin() {
        axiosInstance.post('/users/login', {
            name,
            email,
            password
        }).then((res) => {

            localStorage.setItem('user', JSON.stringify(res.data.user))
            userRef.current = res.data.user
            cookie.set('token', res.data.token)
            setIsLoggedIn(true);
            cookie.set('isLoggedIn', true)

        }).catch((err) => {
            console.log(err.response.data)
        })
    }

  return (
    <>
        <div className="login-heading">
            <h2 className="text-[2rem] text-center">Welcome User</h2>
            <p className="text-center text-xl mt-2">Enter Name, Email and Password to continue</p>
        </div>

        <div className="input-wrapper w-full flex justify-center mt-12">
            <div className="mt-[-0.8rem]">
                <div className="flex items-center rounded-full bg-white outline outline-1 -outline-offset-1 outline-black has-[input:focus-within]:outline has-[input:focus-within]:outline-1 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-[#25D366]">
                <input
                    id="name"
                    name="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='name'
                    className="block tracking-widest py-[15px] min-w-[270px] rounded-full grow px-4 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-md/6"
                />
                </div>
            </div>
        </div>

        <div className="input-wrapper w-full flex justify-center mt-6">
            <div className="mt-[-0.8rem]">
                <div className="flex items-center rounded-full bg-white outline outline-1 -outline-offset-1 outline-black has-[input:focus-within]:outline has-[input:focus-within]:outline-1 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-[#25D366]">
                <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Email'
                    className="block tracking-widest py-[15px] min-w-[270px] rounded-full grow pl-3 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-md/6"
                />
                </div>
            </div>
        </div>

        <div className="input-wrapper w-full flex justify-center mt-6">
            <div className="mt-[-0.8rem]">
                <div className="flex items-center rounded-full bg-white outline outline-1 -outline-offset-1 outline-black has-[input:focus-within]:outline has-[input:focus-within]:outline-1 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-[#25D366]">
                <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Password'
                    className="block tracking-widest py-[15px] min-w-[270px] rounded-full grow pl-3 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-md/6"
                />
                </div>
            </div>
        </div>

        <span className="sm:ml-3 flex items-center mt-10">
          <button
            onClick={handleRegister}
            type="button"
            className="inline-flex ms-auto transition-colors duration-1000 overflow-hidden items-center bg-[#017561] text-white hover:text-white  px-6 py-1 text-[1.1rem] font-normal shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 border border-black rounded-full tracking-tighter relative"
          >
            <p className='z-50'>Sign Up
            </p>
          </button>

          <button
            onClick={handleLogin}
            type="button"
            className="inline-flex ms-5 me-[19.8rem] transition-colors duration-1000 overflow-hidden items-center bg-[#017561] text-white hover:text-white  px-6 py-1 text-[1.1rem] font-normal shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 border border-black rounded-full tracking-tighter relative"
          >
            <p className='z-50'>Log In
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


export default EmailLogin;