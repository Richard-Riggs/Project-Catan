import { useEffect } from 'react';
import Game from '../Game';
import GameLobby from '../GameLobby';
import { useDispatch, useSelector } from 'react-redux';
import { gameActions } from '../../redux/gameSlice';
import { ReduxState } from '../../types/game';

const selectSessionStage = (state: ReduxState) => state.game.sessionStage;

export default function GameWindow() {
    const dispatch = useDispatch();
    const sessionStage = useSelector(selectSessionStage);

    useEffect(() => {
        dispatch(gameActions.initSession());
        return () => {
            dispatch(gameActions.endGame());
        }
    }, [dispatch]);

    return (
        <div className="GameWindow">
            {sessionStage === 'lobby' && <GameLobby />}
            {sessionStage === 'game' && <Game />}
        </div>
    )
}
