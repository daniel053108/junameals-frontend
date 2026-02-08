"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type User = {
    id: number;
    role: string;
    name: string;
    email: string;
    id_cart: number;
};

export type Address = {
    id: number;
    street: string;
    neighborhood: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    deliveryNotes: string;
    isDefault: boolean;
}

type TypeMessage = "error" | "success";

type AuthContextType = {
    user: User | null;
    addresses: Address[];
    setUserModifiqued: (boolean: boolean) => void;
    setUserDataModifiqued: (boolean: boolean) => void;
    userModifiqued: boolean;
    addAddress: (address: Address) => void;
    updateAddress: (address: Address) => void;
    removeAddress: (id:number) => void;
    updateName: (name:string) => void;
    updateEmail: (email:string) => void;
    updatePassword: (password:string, newPassword:string) => void;
    idDefaultAddress: number | null;
    isLogged: boolean;
    loading: boolean;
    errorMessages: string[];
    successMessages: string[];
    clearMessages: () => void;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children}: { children: React.ReactNode}) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [addresses, setAddresses ] = useState<Address[]>([]);
    const [idDefaultAddress, setIdDefaultAddress ] = useState<number | null>(null);
    const [ userModifiqued, setUserModifiqued ] = useState(false);
    const [ userDataModifiqued, setUserDataModifiqued ] = useState(false);
    const [ errorMessages, setErrorMessage ] = useState<string[]> ([]);
    const [ successMessages , setSuccessMessage ] = useState<string[]> ([]);  

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
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
            setUserModifiqued(false);
        })
    },[userModifiqued]);
    
    useEffect(() => {
        fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/auth/me/getAddresses`,{
                credentials: "include"
            }
        )
        .then((res) => { return res.ok ? res.json() : null})
        .then((data) => {
            if(!data){ 
                setIdDefaultAddress(null);
                setAddresses([]);
                return;
            }

            setIdDefaultAddress(data.idDefaultAddress);
            setAddresses(data.addresses);
        })
        .catch(() => {
            setIdDefaultAddress(null);
            setAddresses([]);
        })
        .finally(() => {
            setUserDataModifiqued(false);
        })
    }, [userDataModifiqued,user])

    useEffect(() => {
        fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/auth/me/getUser`,{
                credentials: "include"
            }
        )
        .then((res) => res.ok ? res.json() : null)
        .then((data) => {
            if(!data)return;
            setUser(data);
        })
        .finally(() => {
            setUserDataModifiqued(false);
        })
    }, [userDataModifiqued])

    const addAddress = (address: Address) => {
        if(!user) return;
        fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/auth/me/addAddress`,{
                method: "POST",
                credentials: "include",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(address),
        })
        .then(async (res) => {
            const message = await res.json();
            if(!res.ok){
                setErrorMessage(prev => [...prev, message.error]);
            }
            setSuccessMessage(prev => [...prev, message.message]);
        })
        .catch(() => {
            setErrorMessage(prev => [...prev, "Error al agregar direccion"]);
        });
    }
    
    const updateAddress = (address:Address) => {
        if(!user) return;
        fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/auth/me/updateAddress`,{
                method: "PUT",
                credentials: "include",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(address),
            }
        )
        .then(async (res) => {
            const message = await res.json();
            if(!res.ok){
                setErrorMessage(prev => [...prev, message.error]);
            }
            setSuccessMessage(prev => [...prev, message.message]);
        })
        .catch(() => {
            setErrorMessage(prev => [...prev, "Error al actualizar direccion"]);
        })
    };

    const removeAddress = (id: number | null) => {
        if(!id) return;
        fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/auth/me/removeAddress/id/${id}`,{
                method: "DELETE",
                credentials: "include",
            }
        )
        .then(async (res) => {
            const message = await res.json();
            if(!res.ok){
                setErrorMessage(prev => [...prev, message.error]);
            }
            setSuccessMessage(prev => [...prev, message.message]);
            setUserDataModifiqued(true);
        })
        .catch(() => {
            setErrorMessage(prev => [...prev, "Error al eliminar la direccion"]);
        });
    };

    const updateName = (name:string) => {
        if(!user) return;
        console.log("updateName")
        fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/auth/me/updateName`,{
                credentials: "include",
                method: "PUT",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({newName: name})
            }
        )
        .then(async (res) => {
            const message = await res.json();
            if(!res.ok){
                setErrorMessage(prev => [...prev, message.error]);
            }
            setSuccessMessage(prev => [...prev, message.message]);
            setUser({...user, name: name});
        })
        .catch(() => {
            setErrorMessage(prev => [...prev, "Error al actualizar el nombre de usuario"]);
        });
    };

    const updateEmail = (email:string) => {
        if(!user) return;
        fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/auth/me/updateEmail`,{
                credentials: "include",
                method: "PUT",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({newEmail: email})
            }
        )
        .then(async (res) => {
            const message = await res.json();
            if(!res.ok){
                setErrorMessage(prev => [...prev, message.error]);
            }
            setSuccessMessage(prev => [...prev, message.message]);
        })
        .catch(() => {
            setErrorMessage(prev => [...prev, "Error al actualizar el email"]);
        });
    };

    const updatePassword = (password:string, newPassword:string) => {
        if(!user) return;
        fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/auth/me/updatePassword`,{
                credentials: "include",
                method: "PUT",
                headers: {"Content-Type" : "application/json"},
                body: JSON.stringify({password: password, newPassword: newPassword})
            }
        )
        .then(async (res) => {
            const message = await res.json();
            if(!res.ok){
                setErrorMessage(prev => [...prev, message.error]);
            }
            setSuccessMessage(prev => [...prev, message.message]);
        })
        .catch(() => {
            setErrorMessage(prev => [...prev, "Error al actualizar la contraseña"]);
        });
    };

    const clearMessages = () => {
        setErrorMessage([]);
        setSuccessMessage([]);
    };

    const logout = async () => {
        try {
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
                method: "POST",
                credentials: "include",
            });
        } catch (error) {
            console.error("Error al llamar al logout del server", error);
        } finally {
            // Limpiamos el estado SIEMPRE, incluso si el fetch falla
            setUser(null);
            setAddresses([]);
            setIdDefaultAddress(null);
            setErrorMessage([]);
            setSuccessMessage([]);
            // Esto limpia cualquier rastro de memoria en el navegador
        }
    };

    return(
        <AuthContext.Provider
            value={{
                user,
                addresses,
                setUserModifiqued,
                setUserDataModifiqued,
                userModifiqued,
                addAddress,
                updateAddress,
                removeAddress,
                updateName,
                updateEmail,
                updatePassword,
                idDefaultAddress,
                isLogged: !!user,
                loading,
                errorMessages,
                successMessages,
                clearMessages,
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