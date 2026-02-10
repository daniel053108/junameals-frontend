"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/authContext";
import Button from "@/components/ui/Button";
import {useRouter} from "next/navigation";

export default function RegisterAddressPage(){
    const { user, addresses, addAddress, errorMessages, successMessages, clearMessages, setUserDataModifiqued } = useAuth();
    const [ address , setAddress ] = useState({
        id: 0,
        street: "",
        neighborhood: "",
        city: "",
        state: "",
        postal_code: "",
        country: "Mexico",
        delivery_notes: "",
        is_default:false,
        is_midpoint:false
    });
    const [ message, setMessage ] = useState("");
    const router = useRouter();

    useEffect(() => {
        clearMessages();
        if(addresses.length === 0){
            setAddress({...address, is_default:true});
        }else{
            setAddress({...address, is_default:false});
        }
    }, [addresses]);

    const configPInputs = "";
    const configFormInputs = "px-2 outline rounded-xl w-full";

    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();    
        clearMessages();
        
        addAddress(address);

        setAddress({
            id: 0,
            street: "",
            neighborhood: "",
            city: "",
            state: "",
            postal_code: "",
            country: "Mexico",
            delivery_notes: "",
            is_default:false,
            is_midpoint:false
        });
        setUserDataModifiqued(true);

        router.back();
    };

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.type === "checkbox"){
            setAddress({
               ...address,
               [e.target.name]: e.target.checked 
            });
            return;
        }
        setAddress({
            ...address,
            [e.target.name]: e.target.value
        });
    };

    const handleChangeChecked = (e:React.ChangeEvent<HTMLInputElement>) => {
        if(addresses.length === 0){
            setMessage("ES OBLIGATORIO UNA DIRECCION PRICIPAL");
            return;
        }

        setAddress({...address, is_default: !address.is_default})
    };

    return (
        <section className="flex justify-center p-10 flex-col">
            <form onSubmit={handleSubmit} className="p-4 w-full bg-secondary rounded-xl shadow-lg">
                <div className="flex items-center justify-between gap-4">
                    <p className="font-saira font-bold text-gray-700">
                        Dirección principal
                    </p>

                    {message && (
                        <p className="text-red-600 font-saira text-xs">{message}!</p>
                    )}  
                    <label className="relative inline-flex items-center cursor-pointer">
                        
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={address.is_default}
                            onChange={handleChangeChecked}
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
                        name="street"
                        value={address.street}
                        className={`${configFormInputs}`}
                        placeholder="Obligatorio"
                        onChange={handleChange}
                        required
                    ></input>
                </div>
                <div>
                    <p className={`${configPInputs}`} >Colonia</p>
                    <input
                        name="neighborhood"
                        value={address.neighborhood}
                        className={`${configFormInputs}`}
                        placeholder="Opcional"
                        onChange={handleChange}
                    ></input>
                </div>
                <div>
                    <p className={`${configPInputs}`} >Ciudad</p>
                    <input
                        name="city"
                        value={address.city}
                        className={`${configFormInputs}`}
                        placeholder="Obligatorio"
                        onChange={handleChange}
                        required
                    ></input>
                </div>
                <div>
                    <p className={`${configPInputs}`} >Estado</p>
                    <input
                        name="state"
                        value={address.state}
                        className={`${configFormInputs}`}
                        placeholder="Obligatorio"
                        onChange={handleChange}
                        required
                    ></input>
                </div>
                <div>
                    <p className={`${configPInputs}`} >Codigo postal</p>
                    <input
                        name="postal_code"
                        value={address.postal_code}
                        className={`${configFormInputs}`}
                        placeholder="Obligatorio"
                        onChange={handleChange} 
                        required
                    ></input>
                </div>
                <div>
                    <p className={`${configPInputs}`} >Pais</p>
                    <input
                        name="country"
                        value={address.country}
                        className={`${configFormInputs}`}
                        onChange={handleChange}
                    ></input>
                </div>
                <div>
                    <p className={`${configPInputs}`} >Notas de entrega</p>
                    <input
                        name="delivery_notes"
                        value={address.delivery_notes}
                        className={`${configFormInputs}`}
                        onChange={handleChange}
                        placeholder="Opcional"
                    ></input>
                </div>
                {user?.role === "admin" && (
                    <div>
                        <p className={`${configPInputs}`} >Punto Medio</p>
                        <input
                            type="checkbox"
                            name="is_midpoint"
                            checked={address.is_midpoint}
                            className={`scale-150`}
                            onChange={handleChange}
                        ></input>
                    </div>
                )}
                <div className="flex justify-center mt-4">
                    <Button type="submit" variant="primary"  >Registrar Direccion</Button>
                </div>
            </form>
            <div>
                {errorMessages.length !== 0 && (
                    errorMessages.map((err,index) =>
                        <p key={index} className="font-saira text-center">{err}</p>
                    )
                )}
                {successMessages.length !== 0 && (
                    successMessages.map((succ,index) => 
                        <p key={index} className="font-saira text-center">{succ}</p>
                    )
                )}
            </div>
        </section>
    );
};