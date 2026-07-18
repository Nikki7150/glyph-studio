import './DrawingMode.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

export default function DrawingMode() {
    function createEmptyGrid(rows, cols) {
        return Array.from({ length: rows }, () => Array.from({ length: cols }, () => ' '));
    }
    const [ grid, setGrid ] = useState(() => createEmptyGrid(46, 102));
    function paintCell(row, col, character) {
        setGrid((prevGrid) => {
            return prevGrid.map((rowArray, rowIndex) => {
                if (rowIndex !== row) {
                    return rowArray;
                }
                return rowArray.map((cell, colIndex) => {
                    if (colIndex !== col) {
                        return cell;
                    }
                    return character;
                });
            });
        });
    }
    const [ selectedCharacter, setSelectedCharacter ] = useState('@');
    const [ isDrawing, setIsDrawing ] = useState(false);
    const GridRenderer = ({ gridState }) => {
        return (
            <div 
                className="grid-container"
                onMouseUp={() => setIsDrawing(false)}
            >
            {gridState.map((row, rowIndex) => (
                <div key={`row-${rowIndex}`} className="grid-row">
                {row.map((cellValue, colIndex) => (
                    <div 
                    key={`cell-${rowIndex}-${colIndex}`} 
                    className="grid-cell"
                    onMouseDown={() => { setIsDrawing(true); paintCell(rowIndex, colIndex, selectedCharacter); }}
                    onMouseEnter={() => isDrawing && paintCell(rowIndex, colIndex, selectedCharacter)}
                    >
                    {cellValue}
                    </div>
                ))}
                </div>
            ))}
            </div>
        );
    };

    return (
        <div className="drawing-mode">
            <h2 className='drawing-mode-heading text-xl font-bold'>Drawing Mode</h2>
            <div className="divider"></div>
            <GridRenderer gridState={grid} />
        </div>
    );
}

export function DrawingModePanel() {
    const navigate = useNavigate();
    return (
        <div className="drawing-mode-panel">
            <button onClick={() => navigate('/')}>Back</button>
            <h3 className='drawing-heading'>Drawing Mode Panel</h3>
            <p>This is the panel for the Drawing Mode.</p>
        </div>
    );
}