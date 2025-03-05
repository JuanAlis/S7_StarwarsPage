import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { signOut, onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebaseConfig";
import AuthModal from "./AuthModal"; 

const Navbar: React.FC = () => {
    const [user, setUser] = useState<User | null>(null); 
    const [showModal, setShowModal] = useState(false); 

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        await signOut(auth);
        setUser(null); 
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-black w-100 d-flex flex-column align-items-center mt-2">
                {/* Logo y Log In/Out */}
                <div className="row w-100 d-flex justify-content-between align-items-center px-4">
                    <div className="d-flex justify-content-center flex-grow-1">
                        <img 
                            src="https://lumiere-a.akamaihd.net/v1/images/sw_logo_stacked_2x-52b4f6d33087_7ef430af.png?region=0,0,586,254"
                            alt="Star Wars Logo"
                            className="img-fluid"
                            style={{ width: "250px", height: "auto" }}
                        />
                    </div>
                </div>

                {/* Sección de usuario: Email a la izquierda, Log Out a la derecha */}
                <div className="row w-100 d-flex justify-content-end align-items-center px-4 mt-1">
                    <div className="col-auto d-flex align-items-center">
                        {user && <span className="text-secondary me-3">{user.email}</span>} {/* Email a la izquierda */}
                        {user ? (
                            <button className="btn btn-outline-warning text-white fs-6 fw-bold btn-sm mb-2" onClick={handleLogout}>
                                Log Out
                            </button>
                        ) : (
                            <button className="btn btn-outline-warning text-white fs-6 fw-bold btn-sm mb-2" onClick={() => setShowModal(true)}>
                                Log In
                            </button>
                        )}
                    </div>
                </div>

                {/* Menú de navegación en una fila separada */}
                <div className="d-flex justify-content-center border-top border-bottom border-secondary w-100 mt-0 mb-1">
                    <Link className="nav-link text-warning fs-6 fw-bold border-start border-secondary p-3" to="/">HOME</Link>
                    <Link className="nav-link text-warning fs-6 fw-bold border-start border-end border-secondary p-3" to="/starships">STARSHIPS</Link>
                </div>
            </nav>

            {/* Modal de autenticación */}
            {showModal && <AuthModal closeModal={() => setShowModal(false)} />}
        </>
    );
};

export default Navbar;
