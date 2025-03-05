import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStarships } from "../store/StarshipSlice";
import { RootState } from "../store/Store";
import Card from "../components/Card";

const Starships: React.FC = () => {
    const dispatch = useDispatch();
    const { starships, loading, nextPage } = useSelector((state: RootState) => state.starships);
    const [firstLoad, setFirstLoad] = useState(false); 

    useEffect(() => {
        console.log(" useEffect ejecutado: Verificando si hay que cargar la primera página...");
        console.log(" Número de starships en Redux:", starships.length);

        if (starships.length === 0 && !firstLoad) {
            console.log(" Cargando la primera página...");
            dispatch(fetchStarships());
            setFirstLoad(true); 
        }
    }, [dispatch, starships.length, firstLoad]);

    return (
        <div className="container mt-4">
            <div className="row">
                {starships.map((ship) => (
                    <div className="col-12 mb-3" key={ship.id}>
                        <Card id={ship.id} title={ship.name} description={ship.model} />
                    </div>
                ))}
            </div>

            {nextPage && (
                <div className="text-center mt-4 mb-5">
                    <button className="btn btn-warning fs-5 fw-bold " onClick={() => dispatch(fetchStarships())} disabled={loading}>
                        {loading ? "Cargando..." : "Cargar más naves"}
                    </button>
                </div>
            )}

            {loading && <p className="text-center text-white mt-3">Cargando más naves...</p>}
        </div>
    );
};

export default Starships;
