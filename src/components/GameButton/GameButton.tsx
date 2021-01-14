import './GameButton.css';

interface GameButtonProps {
    name: string;
    onClick: () => void;
}

export default function GameButton({name, onClick}: GameButtonProps) {
    const handleClick = () => onClick && onClick();
    return (
        <div className="GameButton" onClick={handleClick}>{name}</div>
    )
}
