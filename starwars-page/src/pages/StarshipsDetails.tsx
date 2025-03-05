import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/Store";
import "../App.css";
import { useEffect } from "react";

const StarshipDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        window.scrollTo(0, 0); 
    }, []);
    
    const starship = useSelector((state: RootState) =>
        state.starships.starships.find((ship) => ship.id === Number(id))
    );

    if (!starship) {
        return <p className="text-center text-white">Nave no encontrada</p>;
    }

    const imageUrl = `/starships/${id}.jpg`;

    return (
        <div className="container">
            <div className="container text-white mt-4 d-flex justify-content-center">
                <div className="row Details d-flex flex-column flex-md-row justify-content-between align-items-center">
                    {/* Imagen de la nave */}
                    <div className="col-md-4 text-center d-flex align-items-center justify-content-center">
                        <img src={imageUrl} alt={starship.name} className="starship-image" />
                    </div>

                    {/* Información de la nave (NO se cambia) */}
                    <div className="col-md-7 ">
                        <h2 className="neon-text mb-4 text-secondary fw-bold border-secondary">STARSHIP</h2>
                        <table className="table table-dark table-striped table-rounded ms-2">
                            <tbody>
                                <tr>
                                    <th scope="row">Modelo</th>
                                    <td className="text-secondary">{starship.model}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Fabricante</th>
                                    <td className="text-secondary">{starship.manufacturer || "Desconocido"}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Costo</th>
                                    <td className="text-secondary">{starship.cost_in_credits || "Desconocido"} créditos</td>
                                </tr>
                                <tr>
                                    <th scope="row">Longitud</th>
                                    <td className="text-secondary">{starship.length || "Desconocido"} m</td>
                                </tr>
                                <tr>
                                    <th scope="row">Velocidad Máx</th>
                                    <td className="text-secondary">{starship.max_atmosphering_speed || "Desconocido"}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Tripulación</th>
                                    <td className="text-secondary">{starship.crew || "Desconocido"}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Pasajeros</th>
                                    <td className="text-secondary">{starship.passengers || "Desconocido"}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Capacidad de Carga</th>
                                    <td className="text-secondary">{starship.cargo_capacity || "Desconocido"}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Consumibles</th>
                                    <td className="text-secondary">{starship.consumables || "Desconocido"}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Hyperdrive Rating</th>
                                    <td className="text-secondary">{starship.hyperdrive_rating || "Desconocido"}</td>
                                </tr>
                                <tr>
                                    <th scope="row">MGLT</th>
                                    <td className="text-secondary">{starship.MGLT || "Desconocido"}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Clase de Nave</th>
                                    <td className="text-secondary">{starship.starship_class || "Desconocido"}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Segunda Card - Pilotos */}
            <div className="row Aditional d-flex flex-column justify-content-center align-items-center">
    <div className="col-md-10 text-white p-4 rounded">
        <h3 className="neon-text text-secondary fw-bold text-center">Pilotos</h3>
        {starship.pilots.length > 0 ? (
            <div className="row d-flex flex-column flex-md-row align-items-center">
                {starship.pilots.map((pilot) => (
                    <div key={pilot.id} className="col-12 col-md-3 mb-3 d-flex justify-content-center">
                        <div className="cards text-white text-center p-2 rounded">
                            <img
                                src={pilot.image}
                                alt={pilot.name}
                                className="pilot-image"
                            />
                            <p className="mt-2 fw-bold text-secondary fs-5">{pilot.name}</p>
                        </div>
                    </div>
                ))}
            </div>
        ) : (
            <p className="text-center fw-bold text-secondary fs-5">Pilotos desconocidos</p>
        )}
    </div>
</div>



<div className="row Aditional d-flex flex-column justify-content-center align-items-center mt-4">
    <div className="col-md-10 text-white p-4 rounded">
        <h3 className="neon-text text-secondary fw-bold text-center">Películas</h3>
        {starship.films.length > 0 ? (
            <div className="row d-flex flex-column flex-lg-row align-items-center justify-content-between">
                {starship.films.map((film) => (
                    <div key={film.id} className="col-12 col-md-3 mb-3 d-flex justify-content-center">
                        <div className="cards text-white text-center p-2 rounded">
                            <img
                                src={film.image}
                                alt={film.title}
                                className="film-image"
                            />
                            <p className="mt-2 fw-bold text-secondary fs-5">{film.title}</p>
                        </div>
                    </div>
                ))}
            </div>
        ) : (
            <p className="text-center fw-bold text-secondary fs-5">No hay películas disponibles</p>
        )}
    </div>
</div>

        </div>
    );
};

export default StarshipDetail;
