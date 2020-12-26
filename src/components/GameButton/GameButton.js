import React from 'react';
import './GameButton.css';

export default function GameButton({name, onClick}) {
    const handleClick = () => onClick && onClick();
    return (
        <div className="GameButton" onClick={handleClick}>{name}</div>
    )
}
