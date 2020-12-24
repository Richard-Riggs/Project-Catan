import React, { useEffect } from 'react';
import './GameBoard.css';
import {initBoard} from './classes/index';

export default function GameBoard() {
    // useEffect is called after the canvas component finishes rendering
    useEffect(() => {
        initBoard();
    });

    return (
        <canvas className="GameBoard" id="canvas" resize="resize"></canvas>
    )
}
