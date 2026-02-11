"use client";
import Button from "@/components/ui/Button";
import { useAuth } from "@/context/authContext"

export default function MePage() {
    const { user, isLogged, addresses, idDefaultAddress } = useAuth();

    const configUserData = "font-saira font-bold text-green-900";
    const configButtonUpdate = `font-saira scale-50 hover:scale-60 hover:underline hover:bg-green-500 underline-offset-5 rounded-3xl text-white
    bg-green-800 text-center transition-all`;
    const configDivUserData = "flex flex-col px-3 py-1 bg-gray-300 shadow-lg opacity-80 rounded-xl";
    const configH1Address = "font-saira font-bold"

    return(
        <section className="flex items-center justify-center p-4">
            {isLogged && (
            <div className="bg-secondary p-4 rounded-xl shadow-lg flex flex-col gap-4">
                <div className= {configDivUserData} >
                    <h1 className={configUserData} >Nombre de Usuario: {user!.name}</h1>
                </div>
                <div className={configDivUserData} >
                    <h2 className={configUserData} >Email: {user!.email}</h2>
                </div>
                <div className={configDivUserData}>
                    <h2 className={configUserData}>
                        Teléfono: {user!.phone_number || "No registrado"}
                    </h2>
                </div>
                <div className={configDivUserData} >
                    <h2 className={configUserData} >Contraseña: ********</h2>
                </div>
                <div className="bg-gray-400 p-4 flex flex-col rounded-xl gap-4 shadow-lg">
                    <p className="font-bold text-center">Direcciones</p>
                    {!idDefaultAddress && (
                        <div className={configDivUserData}>
                           {//DESCOMENTAR PARA DIRECCIONES
                           //<h1 className={`${configUserData} text-center`} >No hay Direccion Principal Registrada</h1>
                           //<p>Es necesario tener una direccion principal para realizar una compra</p>
                           }
                           <p>Lo sentimos!! aun no esta disponible el envio a domicilio:c</p>{/*ELIMINAR ESTO*/}
                        </div>
                    )}
                    {addresses.map((address) => {
                        if(user?.role === "admin")
                            return(
                                <div key={address.id} className={configDivUserData}>
                                    <p className="font-saira font-bold text-center text-xl bg-gray-400 rounded-xl">{address.is_midpoint ? "Punto Medio" : "Direccion"}</p>
                                    <h1 className={configH1Address} >Calle: {address.street}</h1>
                                    <h1 className={configH1Address} >Colonia: {address.neighborhood}</h1>
                                    <h1 className={configH1Address} >Ciudad: {address.city}</h1>
                                    <h1 className={configH1Address} >Estado: {address.state}</h1>
                                    <h1 className={configH1Address} >codigo Postal: {address.postal_code}</h1>
                                    <h1 className={configH1Address} >Pais: {address.country}</h1>
                                    <h1 className={configH1Address} >Notas de entrega: {address.delivery_notes}</h1>
                                </div>
                            )
                        if(address.is_default){
                            return(
                                <div key={address.id} className={configDivUserData}>
                                    <p className="font-saira font-bold text-center text-xl bg-gray-400 rounded-xl">Direccion Principal</p>
                                    <h1 className={configH1Address} >Calle: {address.street}</h1>
                                    <h1 className={configH1Address} >Colonia: {address.neighborhood}</h1>
                                    <h1 className={configH1Address} >Ciudad: {address.city}</h1>
                                    <h1 className={configH1Address} >Estado: {address.state}</h1>
                                    <h1 className={configH1Address} >codigo Postal: {address.postal_code}</h1>
                                    <h1 className={configH1Address} >Pais: {address.country}</h1>
                                    <h1 className={configH1Address} >Notas de entrega: {address.delivery_notes}</h1>
                                </div>
                            )
                        }
                        return(
                            <div key={address.id} className={`${configDivUserData}`}>
                                <h2 className="font-saira italic" >{address.street + ", " + address.neighborhood + ", " + address.city + 
                                    ", " + address.state}</h2>
                            </div>
                        )
                    })}
                </div> 
                <div className="flex justify-center">
                    <Button variant="none" href="/user/update-user" className={`scale-100 hover:scale-105 ${configButtonUpdate}`} >Modificar Datos</Button>
                </div> 
            </div> 
            )}
        </section>
    )
};