import { useEffect } from 'react';
import BoardCanvas from '../BoardCanvas';
import PlayerActions from '../PlayerActions';
import PlayerResources from '../PlayerResources';
import { useDispatch } from 'react-redux';
import { gameActions } from '../../redux/gameSlice';
import './Game.css';

export default function Game() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(gameActions.initGame());
        return () => {
            dispatch(gameActions.endGame());
        }
    }, [dispatch]);

    return (
        <div className="Game">
            <div className="Game__canvas-window">
                <BoardCanvas />
            </div>
            <div className="Game__player-info">
                <PlayerResources />
                <PlayerActions />
            </div>
        </div>
    )
}
