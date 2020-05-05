import React, { useEffect, useState  } from 'react';
import './Vehicles.css';

export default props => {
    const [vehicles, setVehicles] = useState([]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(async () => {
        let vehicleAr = [];
        await fetch(`http://desafioonline.webmotors.com.br/api/OnlineChallenge/Vehicles?Page=${1}`).then(
            response => response.json().then(data => {
                data.map(vehicle => {
                    console.log(vehicle);
                    vehicleAr.push(vehicle);
                    return vehicleAr;
                });	
            })
        );
        
        setVehicles(vehicleAr); 
    }, []);

    function hadlesCardVehicles(){
        return vehicles.map( vehicle => {
            const car = `${vehicle.Make} - ${vehicle.Model}`;
            return <>
                <div className="Card CardVehicles">
                    <div className="Conteudo">
                        <h3>{car}</h3>
                        <div className="Image">
                            <img src={vehicle.Image} alt={car} />
                        </div>
                    </div>
                    <div className="Title">
                        <p>Ano: <small>{vehicle.YearFab}/{vehicle.YearModel}</small></p>
                        <p>Cor: <small>{vehicle.Color}</small></p>
                        <p>Versão: <small>{vehicle.Version}</small></p>
                        <p>Versão: <small>{vehicle.Version} </small></p>
                        <p>Valor: <small>{vehicle.Price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})} </small></p>
                    </div>
                </div>
            </>
        })
    }

    return (
        <div className="ContainerRow">
            <h2>Todos Modelos</h2>
            <div className="Container">{hadlesCardVehicles()}</div>
		</div>
    )
}