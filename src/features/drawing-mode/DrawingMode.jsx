import './DrawingMode.css';

export default function DrawingMode() {
    const [ isDrawing, setIsDrawing ] = useState(false);
    return (
        <div className="drawing-mode">
            <h2 className='drawing-mode-heading text-xl font-bold'>Drawing Mode</h2>
            <div className="divider"></div>
        </div>
    );
}

export function DrawingModePanel() {
    return (
        <div className="drawing-mode-panel">
            <h3 className='drawing-heading'>Drawing Mode Panel</h3>
            <p>This is the panel for the Drawing Mode.</p>
            <button onClick={() => navigate('/')}>Back</button>
        </div>
    );
}