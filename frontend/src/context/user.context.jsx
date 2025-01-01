import { createContext, useState, useRef, useContext } from 'react';
import PropType from "prop-types";
import Cookies from 'universal-cookie';


const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const cookies = new Cookies();
    const logedInValue = cookies.get('isLoggedIn');

    const userRef = useRef(null);
    try {
        userRef.current = JSON.parse(localStorage.getItem('user'));
    } catch {
        userRef.current = null;
    }
    
    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneLogin, setPhoneLogin] = useState(false);
    const [phoneVerify, setPhoneVerify] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState({
                                                            name: "India", 
                                                            flag: "https://flagcdn.com/in.svg", 
                                                            phoneCode: "+91"});
    const [codeGenerated, setCodeGenerated] = useState(false);
    const [emailLogin, setEmailLogin] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(logedInValue || false );

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <UserContext.Provider value={{ 
                                        phoneNumber, setPhoneNumber, 
                                        phoneLogin, setPhoneLogin, 
                                        selectedCountry, setSelectedCountry, 
                                        phoneVerify, setPhoneVerify,
                                        codeGenerated, setCodeGenerated,
                                        isLoggedIn, setIsLoggedIn,
                                        emailLogin, setEmailLogin,
                                        name, setName,
                                        email, setEmail,
                                        password, setPassword,
                                        userRef}}>
            {children}
        </UserContext.Provider>
    );
};

UserProvider.propTypes = {
    children: PropType.node,
}

// custom hook for using context
export const useUserContext = () => useContext(UserContext);