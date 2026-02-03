"use client";
import { useAuth, Address } from "@/context/authContext";
import { useState, useEffect } from "react";
import Button from "@/components/ui/Button";

export default function UpdateUserFormPage() {
    const { user, isLogged, loading, addresses, idDefaultAddress, errorMessages, successMessages, clearMessages,
        updateName, updateAddress, updateEmail, updatePassword, setUserDataModifiqued, userModifiqued, removeAddress 
     } = useAuth();
    const [ nameModifiqued, setNameModifiqued ] = useState(false);
    const [ emailModifiqued, setEmailModifiqued ] = useState(false);
    const [ passwordModifiqued, setPasswordModifiqued ] = useState(false);
    const [ addressesModifiqued, setAddressesModifiqued ] = useState(false);
    const [ idDefAddress, setIdDefAddress ] = useState<number | null>(null);
    const [ form, setForm ] = useState({
        name: "",
        email: "",
        actualPassword: "",
        newPassword: ""
    })

    const [ formAddresses, setFormAddresses ] = useState<Address[]>([]);

    useEffect(() => {
        clearMessages();
    },[])

    useEffect(() => {
        if(!user)return;
        setForm({
            name: user.name,
            email: user.email,
            actualPassword: "",
            newPassword:""
        })

        setIdDefAddress(idDefaultAddress);
        setFormAddresses(addresses);
    }, [isLogged, addresses, user, userModifiqued])

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(nameModifiqued){
            setNameModifiqued(false);
            updateName(form.name);
        }

        if(emailModifiqued){
            setEmailModifiqued(false);
            updateEmail(form.email);
        }

        if(passwordModifiqued){
            setPasswordModifiqued(false);
            updatePassword(form.actualPassword, form.newPassword);
        }

        if(addressesModifiqued){
            setAddressesModifiqued(false);
            formAddresses.map((addr) => 
                updateAddress(addr)
            )
        }

        clearMessages();
        setUserDataModifiqued(true);
    };

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
    }

    const handleAddressChange = (id:number|null, field: keyof Address, value:string | boolean) => {        
        if(field === "isDefault"){
            if(!value)return;
            setIdDefAddress(id);
            setFormAddresses(prev =>
                prev.map((addr) => {
                        return {...addr, isDefault: addr.id === id}
                })
            )
            
            return;
        }
        
        setFormAddresses(prev => 
            prev.map((addr) => 
                addr.id === id ? {...addr, [field]: value} : addr
            )
        );
    };

    const configDivInputs = "bg-gray-300 rounded-xl m-4 p-4";
    const configPInputs = "font-saira font-bold italic";
    const configFormInputs = "outline rounded-xl w-full p-2"; 

    if(loading)return(<p>Cargando...</p>); 


    return(
        <section className="p-4">
            <form onSubmit={handleSubmit} className="bg-secondary p-4 rounded-xl shadow-lg ">
                <div className={`${configDivInputs}`} >
                    <p className={`${configPInputs}`} >Nombre:</p>
                    <input 
                        name="name" 
                        value={form.name} 
                        className={`${configFormInputs}`}
                        onChange={(e) => {
                            handleChange(e);
                            setNameModifiqued(true);
                        }} 
                    ></input>
                </div>
                <div className={`${configDivInputs}`} >
                    <p className={`${configPInputs}`} >Email:</p>
                    <input 
                        name = "email" 
                        value={form.email} 
                        className={`${configFormInputs}`}
                        onChange={(e) => {
                            handleChange(e);
                            setEmailModifiqued(true);
                        }} 
                    ></input>
                </div>
                <div className={`${configDivInputs}`} >
                    <p className={`${configPInputs}`} >Password:</p>
                    <input 
                        name="actualPassword" 
                        value={form.actualPassword} 
                        className={`${configFormInputs} mb-4`}
                        onChange={(e) => {
                            handleChange(e);
                            setPasswordModifiqued(true);
                        }} 
                        placeholder="Ingresa la contraseña actual"
                    ></input>
                    <input 
                        name="newPassword" 
                        value={form.newPassword} 
                        className={`${configFormInputs}`}
                        onChange={(e) => {
                            handleChange(e);
                            setPasswordModifiqued(true);
                        }} 
                        placeholder="Ingresa la nueva contraseña"
                    ></input>
                </div>
                <div className={`${configDivInputs}`} >
                    {formAddresses.length === 0 && (
                        <div>
                            <p className="font-saira text-xl text-center" >No hay direcciones registradas</p>
                            <h2 className="font-saira text-1xl text-center">Necesitas registrar una direccion para poder comprar</h2>
                        </div>
                    )}
                    {formAddresses.map((address) => (
                        <div key={address.id} className="mb-4 bg-purple-300 p-4 rounded-xl">
                            <div className="flex items-center justify-between gap-4">
                                <p className="font-saira font-bold text-gray-700">
                                    Dirección principal
                                </p>

                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={address.id === idDefAddress}
                                        onChange={(e) =>{
                                            handleAddressChange(
                                            address.id,
                                            "isDefault",
                                            e.target.checked
                                            );
                                            setAddressesModifiqued(true);
                                        }}
                                    />

                                    <div
                                    className="
                                        w-12 h-6
                                        bg-gray-300
                                        rounded-full
                                        peer-checked:bg-green-600
                                        transition-colors
                                    "
                                    ></div>

                                    <div
                                    className="
                                        absolute left-1 top-1
                                        w-4 h-4
                                        bg-white
                                        rounded-full
                                        transition-transform
                                        peer-checked:translate-x-6
                                    "
                                    ></div>
                                </label>
                            </div>

                            <div>
                                <p className={`${configPInputs}`} >Calle</p>
                                <input
                                    value={address.street}
                                    className={`${configFormInputs}`}
                                    onChange={(e) => {
                                        handleAddressChange(address.id, "street", e.target.value);
                                        setAddressesModifiqued(true);
                                    }}
                                ></input>
                            </div>
                            <div>
                                <p className={`${configPInputs}`} >Colonia</p>
                                <input
                                    value={address.neighborhood}
                                    className={`${configFormInputs}`}
                                    onChange={(e) => {
                                        handleAddressChange(address.id, "neighborhood", e.target.value);
                                        setAddressesModifiqued(true);
                                    }}
                                ></input>
                            </div>
                            <div>
                                <p className={`${configPInputs}`} >Ciudad</p>
                                <input
                                    value={address.city}
                                    className={`${configFormInputs}`}
                                    onChange={(e) => {
                                        handleAddressChange(address.id, "city", e.target.value);
                                        setAddressesModifiqued(true);
                                    }}
                                ></input>
                            </div>
                            <div>
                                <p className={`${configPInputs}`} >Estado</p>
                                <input
                                    value={address.state}
                                    className={`${configFormInputs}`}
                                    onChange={(e) => {
                                        handleAddressChange(address.id, "state", e.target.value);
                                        setAddressesModifiqued(true);
                                    }}
                                ></input>
                            </div>
                            <div>
                                <p className={`${configPInputs}`} >Codigo postal</p>
                                <input
                                    value={address.postalCode}
                                    className={`${configFormInputs}`}
                                    onChange={(e) => {
                                        handleAddressChange(address.id, "postalCode", e.target.value);
                                        setAddressesModifiqued(true);
                                    }}
                                ></input>
                            </div>
                            <div>
                                <p className={`${configPInputs}`} >Pais</p>
                                <input
                                    value={address.country}
                                    className={`${configFormInputs}`}
                                    onChange={(e) => {
                                        handleAddressChange(address.id, "country", e.target.value);
                                        setAddressesModifiqued(true);
                                    }}
                                ></input>
                            </div>
                            <div>
                                <p className={`${configPInputs}`} >Notas de entrega</p>
                                <input
                                    value={address.deliveryNotes}
                                    className={`${configFormInputs}`}
                                    onChange={(e) => {
                                        handleAddressChange(address.id, "deliveryNotes", e.target.value);
                                        setAddressesModifiqued(true);
                                    }}
                                ></input>
                            </div>
                            <Button variant="primary" className="mt-4" onClick={() => {
                                removeAddress(address.id)
                                clearMessages();
                                }}> Eliminar direccion </Button>
                        </div>
                    ))}
                    <div className="flex justify-center mt-2">
                        <Button variant="primary" href = "/user/register-address">Agregar Direccion</Button>
                    </div>
                </div>
                <div className="flex items-center justify-center">
                    <button 
                        type="submit" 
                        className="bg-green-600 shadow-lg text-white px-3 py-1 rounded-full font-saira font-bold hover:bg-green-400 hover:scale-110 transition all"
                    >Guardar</button>
                </div>
            </form>
            {errorMessages && (
                errorMessages.map((err, index) => (
                    <p key={index} className="text-center italic font-saira text-xl" >{err}</p>
                ))
            )}
            {successMessages && (
                successMessages.map((succ, index) => (
                    <p key={index} className="text-center italic font-saira text-xl">{succ}</p>
                ))
            )}
        </section>
    );
}