import Game from '../Game';
import './App.css';
import { GameSessionContextProvider } from '../../contexts/GameSessionContext';

export default function App() {
    return (
        <div className="App">
            <GameSessionContextProvider>
                <Game />
            </GameSessionContextProvider>
        </div>
    );
}
