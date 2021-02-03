import GameWindow from '../GameWindow';
import HomePage from '../HomePage';
import './App.css';
import { Switch, Route } from 'react-router-dom';

export default function App() {
    return (
        <div className="App">
            <Switch>
                <Route path="/game" component={GameWindow} />
                <Route path="/" component={HomePage} />
            </Switch>
        </div>
    );
}
