import { useDispatch } from 'react-redux';
import { gameActions } from '../../redux/gameSlice';
import GameButton from '../GameButton';

export default function GameLobby() {
    const dispatch = useDispatch();
    const handleStartButtonClick = () => dispatch(gameActions.setSessionStage('game'));

    return (
        <div className="GameLobby">
            <h1>GAME LOBBY</h1>
            <GameButton name={'Start Game'} onClick={handleStartButtonClick} enabled />
        </div>
    )
}
