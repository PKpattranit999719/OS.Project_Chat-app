import { useCallback } from "react";
import { createContext, useState ,useEffect} from "react";
import { baseUrl, postRequest } from "../utils/services";


export const AuthContext = createContext();

export const AuthContextProvider = ({ children}) => {
    const [user, setUser] = useState(null);
    const [registerError, setRegisterError] = useState(null);
    const[isRegisterLoading, setIsRegisterLoading] = useState(false);
    const [registerInfo, setRegisterInfo] = useState({
        name: "",
        email: "",
        password: "",
    });
    //console.log("registerInfo", registerInfo);
    const [loginError, setLoginError] = useState(null);
    const[isLoginLoading, setIsLoginLoading] = useState(false);

    const [loginInfo, setLoginInfo] = useState({
        email: "",
        password: "",
    });
    console.log("loginInfo", loginInfo);
    console.log("User", user);

    useEffect(() => {
        const user = localStorage.getItem("User");

        setUser(JSON.parse(user));
    }, []);

    console.log("registerInfo", registerInfo);
    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo(info);
    },[]);
    
    const registerUser = useCallback(async (e) => {
        e.preventDefault();
        setIsRegisterLoading(true);
        setRegisterError(null);
        
        const response = await postRequest(
            `${baseUrl}/users/register`,
            JSON.stringify(registerInfo)
        );

        setIsRegisterLoading(false);

        if (response.error){
            return setRegisterError(response);
        }
        
        localStorage.setItem("User", JSON.stringify(response))
        setUser(response)
    },[registerInfo]);

    const logoutUser = useCallback(() => {
        localStorage.removeItem("User");
        setUser(null);
    },[]);

    const loginUser = useCallback(async(e) => {
        e.preventDefault();
        setIsLoginLoading(true);
        setLoginError(null);

        const response = await postRequest(
            `${baseUrl}/users/login`,
            JSON.stringify(loginInfo)
        );
        setIsLoginLoading(false);
        if (response.error){
            return setLoginError(response);
        }
        localStorage.setItem("User", JSON.stringify(response))
        setUser(response)
    },[loginInfo]);

    const updateLoginInfo = useCallback((info) => {
        setLoginInfo(info);
    },[]);
    return (
        <AuthContext.Provider
            value={{
                user,
                registerInfo,
                updateRegisterInfo,
                registerUser,
                registerError,
                isRegisterLoading,
                logoutUser,
                loginInfo,
                updateLoginInfo,
                loginUser,
                loginError,
                isLoginLoading,
   
            }}
            >
                {children}
                </AuthContext.Provider>
    );
};