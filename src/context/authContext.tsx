"use client";

import { createContext, useContext, useEffect, useState } from "react";

type User = {
    id: number;
    email: string;
    id_cart: number;
};

type AuthContextType = {
    user: User | null;
    setUser: (user:User | null) => void;
    isLogged: boolean;
    loading: boolean;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children}: { children: React.ReactNode}) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/status`, {
            credentials: "include",
        })
            .then((res) => (res.ok ? res.json() : null))
            .then((data) => {
                setUser(data?.user ?? null);
            })
            .catch(() => {
                setUser(null);
            })
            .finally(() => {
                setLoading(false);
            })
    },[]);
    
    const logout = async () => {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
            method: "POST",
            credentials: "include",
        });
        setUser(null);
    };

    return(
        <AuthContext.Provider
            value={{
                user,
                setUser,
                isLogged: !!user,
                loading,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if(!context) {
        throw new Error("useAuth debe usarse dentro de AuthProvider");
    }

    return context;
}