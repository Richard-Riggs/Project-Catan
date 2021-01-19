import './GameButton.css';

interface GameButtonProps {
    name: string;
    onClick: () => void;
    enabled: boolean;
}

export default function GameButton({name, onClick, enabled}: GameButtonProps) {
    const handleClick = () => enabled && onClick();
    return (
        <div className="GameButton" onClick={handleClick}>{name}</div>
    )
}
