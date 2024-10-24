/**
 * Authors:
 * - Mahdi El Dirani 
 * - Hussein Dirani
 * 
 * Description:
 * This component manages authentication state, including login and signup actions, 
 * using React Context API. It handles user information, JWT token storage, 
 * and user session management. 
 */

import { useContext, createContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface User {
    id: string;
    username: string;
    isAdmin: string;  
}

interface AuthContextType {
    user:  User| null;
    token: string;
    loadingLogin: boolean;
    loadingRegister: boolean;
    loginAction: (data: { username: string; password: string }) => Promise<void>;
    signupAction: (data: { username: string; password: string; name:string; role:string }) => Promise<unknown>;
    logOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null; // Parse JSON or return null
    });
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [loadingLogin, setLoadingLogin] = useState(false);
    const [loadingRegister, setLoadingRegister] = useState(false);
    const navigate = useNavigate();


    const loginAction = async (data: { username: string; password: string }) => {
        try {
            const response = await fetch("http://localhost:5281/authentication/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const res = await response.json();

            if (res) {

                const ticketId = res.ticketId;
                setLoadingLogin(true)
                await new Promise((resolve) => setTimeout(resolve, 2000));
                setLoadingLogin(false)
                const statusResponse = await fetch(`http://localhost:5281/status/${ticketId}`, {
                    method: "GET", 
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                const statusRes = await statusResponse.json();

                // Check if the status retrieval succeeded
                if (statusRes.result.succeeded) {

                    localStorage.setItem("token", statusRes.result.token);
                    setToken(statusRes.result.token)
                    setUser(jwtDecode(statusRes.result.token))
                    localStorage.setItem("user", JSON.stringify(jwtDecode(statusRes.result.token)));

                    console.log(jwtDecode(statusRes.result.token))
                    navigate("/");

                } else {
                    alert("Wrong username or password");
                    throw new Error("Wrong username or password");
                }

            } else {
                alert("Wrong username or password");
                throw new Error(res.message || "Login failed");
            }

        } catch (err) {
            console.log("Error:", err);
        }
    };

    const signupAction = async (data: { username: string; password: string; name:string; role:string }) => {
        console.log(token)
        
        try {
            const response = await fetch("http://localhost:5281/authentication/registration", {
                method: "POST",
                // mode: 'no-cors', 
                headers: {
                    "Content-Type": "application/json",
                    
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });
            const res = await response.json();


            if (res) {
                

                const ticketId = res.ticketId;
                setLoadingRegister(true)
                await new Promise((resolve) => setTimeout(resolve, 2000));
                setLoadingRegister(false)
                const statusResponse = await fetch(`http://localhost:5281/status/${ticketId}`, {
                    method: "GET",
                    // mode: 'no-cors', 
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                });

                const statusRes = await statusResponse.json();
                // console.log(statusRes)
                return statusRes

                // // Check if the status retrieval succeeded
                // if (statusRes.result.succeeded) {


                // } else {
                //     alert("Wrong username or password");
                //     throw new Error("Wrong username or password");
                // }

            } else {
                // alert("Wrong username or password");
                throw new Error(res.message || "Registration failed");
            }

        } catch (err) {
            console.log("Error:", err);
            return err;
        }

    }


    const logOut = () => {
        setUser(null);
        setToken("");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login")
    }


    return <AuthContext.Provider value={{ token, user, loginAction, logOut,signupAction,loadingLogin,loadingRegister }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};