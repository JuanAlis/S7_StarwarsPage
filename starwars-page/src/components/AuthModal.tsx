import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    onAuthStateChanged, 
    GoogleAuthProvider, 
    signInWithPopup, 
    User 
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import "../App.css";

interface AuthModalProps {
    closeModal: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ closeModal }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isRegistering, setIsRegistering] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    
    const navigate = useNavigate(); 

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                closeModal(); 
                navigate("/starships"); 
            }
        });
        return () => unsubscribe();
    }, [closeModal, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            if (isRegistering) {
                await createUserWithEmailAndPassword(auth, email, password);
            } else {
                await signInWithEmailAndPassword(auth, email, password);
            }
            setEmail(""); 
            setPassword(""); 
            closeModal(); 
            navigate("/starships"); 
        } catch (err: any) {
            handleAuthError(err.code);
        } finally {
            setLoading(false);
        }
    };

    const handleAuthError = (errorCode: string) => {
        switch (errorCode) {
            case "auth/email-already-in-use":
                setError("Este correo ya está registrado.");
                break;
            case "auth/wrong-password":
                setError("Contraseña incorrecta.");
                break;
            case "auth/user-not-found":
                setError("No hay una cuenta con este correo.");
                break;
            case "auth/weak-password":
                setError("La contraseña debe tener al menos 6 caracteres.");
                break;
            case "auth/invalid-email":
                setError("El formato del correo no es válido.");
                break;
            default:
                setError("Error al autenticar.");
                break;
        }
    };

    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            setUser(result.user); 
            closeModal(); 
            navigate("/starships"); 
        } catch (err: any) {
            console.error("Error con Google Sign-In:", err);
            setError("Error al iniciar sesión con Google.");
        }
    };

    const handleClose = () => {
        closeModal();
        if (!user) {
            navigate("/"); 
        }
    };

    return (
        <div className="modal-overlay d-flex justify-content-center align-items-center">
            <div className="modal-content bg-dark text-white p-4 rounded" style={{ width: "90%", maxWidth: "400px" }}>
                <h2 className="text-center">{isRegistering ? "Registro" : "Iniciar Sesión"}</h2>

                {error && <p className="text-danger text-center">{error}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Correo electrónico"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="btn-login btn-primary w-100" disabled={loading}>
                        {loading ? "Procesando..." : isRegistering ? "Registrarse" : "Iniciar Sesión"}
                    </button>
                </form>

                <p className="mt-3 text-center">
                    {isRegistering ? "¿Ya tienes cuenta?" : "¿No tienes cuenta?"}
                    <button className="btn btn-link text-white" onClick={() => setIsRegistering(!isRegistering)}>
                        {isRegistering ? "Iniciar Sesión" : "Regístrate"}
                    </button>
                </p>

                {/* Botón para Google Sign-In */}
                <button className="btn-google btn-light w-100 mt-2" onClick={handleGoogleSignIn}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/09/IOS_Google_icon.png" alt="Google" width="20" className="me-2"/>
                    Iniciar sesión con Google
                </button>

                <button className="btn-close-modal btn-danger w-100 mt-3" onClick={handleClose}>
                    Cerrar
                </button>
            </div>
        </div>
    );
};

export default AuthModal;
