import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';


interface CardProps {
    id: number;
    title: string;
    description: string;
}

const Card: React.FC<CardProps> = ({ id, title, description }) => {
    return (
        <Link to={`/starships/${id}`} className="text-decoration-none">
            <div className="card-hover-effect bg-dark text-white mb-3  p-3" style={{ borderRadius: '8px' }}>
                <div className="card-body">
                    <h5 className="card-title text-uppercase fw-bold mb-2">{title}</h5>
                    <p className="card-text  mb-0">{description}</p>
                </div>
            </div>
        </Link>
    );
};

export default Card;
