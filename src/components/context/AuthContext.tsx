import { createContext } from "react";

const AuthContext = createContext({});

export function AuthProvider({ children }) {

    const contextData = {

    }

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}