import axios from "axios";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface AccountContextProps  {
    user: { loggedIn: boolean | null };
    setUser: React.Dispatch<React.SetStateAction<{ loggedIn: any }>>;
}

interface UserContextProps {
    children: ReactNode;
}

export const AccountContext = createContext<AccountContextProps | null>(null);



const AccountContextProvider = ({ children }: UserContextProps) => {
    const [user, setUser] = useState<{loggedIn: boolean | null}>({loggedIn: null}) 
    const navigate = useNavigate()
    useEffect(() => {
        axios("http://localhost:4000/auth/login", {
            withCredentials: true
        }).catch((e) => {
            setUser({loggedIn: false})
            return
        }).then(res => {
            if(!res || res.status >=400) {
                setUser({loggedIn: false})
                return
            } else {
                setUser({...res.data})
                navigate("/home")
            }
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <AccountContext.Provider value={{ user, setUser }}>
            {children}
        </AccountContext.Provider>
    );
};

export default AccountContextProvider;
