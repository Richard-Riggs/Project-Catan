import { Link } from 'react-router-dom';

export default function HomePage() {
    return (
        <div>
            <h1>HOME</h1>
            <h1><Link to="/game">GAME</Link></h1>
        </div>
    )
}
