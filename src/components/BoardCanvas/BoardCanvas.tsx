import './BoardCanvas.css';

// Enable resize attribute on canvas element
declare module 'react' {
    interface HTMLAttributes<T> {
        resize?: any;
    }
}

export default function BoardCanvas() {

    return (
        <canvas className="BoardCanvas" id="canvas" resize="resize"></canvas>
    )
}
