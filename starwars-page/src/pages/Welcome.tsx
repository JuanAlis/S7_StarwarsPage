import React from 'react';
import '../App.css';


const Welcome: React.FC = () => {
    return (
        <div className="welcome-container">
            {/* Video en el fondo */}
            <video autoPlay loop muted className="background-video">
                <source src="./opening/opening.mp4" type="video/mp4" />
                Tu navegador no soporta videos en HTML5.
            </video>
        </div>
    );
};

export default Welcome;
