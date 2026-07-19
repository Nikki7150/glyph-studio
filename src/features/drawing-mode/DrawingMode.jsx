import './DrawingMode.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { characters } from "../../lib/characterCoverage";
import { useDrawingModeStore } from '../../store/zustandStores.js';
import { FaEraser } from 'react-icons/fa';

export default function DrawingMode() {
    const createEmptyGrid = useDrawingModeStore((state) => state.createEmptyGrid);
    const grid = useDrawingModeStore((state) => state.grid);
    const setGrid = useDrawingModeStore((state) => state.setGrid);
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
    const selectedCharacter = useDrawingModeStore((state) => state.selectedCharacter);
    const setSelectedCharacter = useDrawingModeStore((state) => state.setSelectedCharacter);
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
    const selectedCharacter = useDrawingModeStore((state) => state.selectedCharacter);
    const setSelectedCharacter = useDrawingModeStore((state) => state.setSelectedCharacter);
    return (
        <div className="drawing-mode-panel">
            <button onClick={() => navigate('/')}>Back</button>
            <h3 className='drawing-heading'>Drawing Tools</h3>
            <div className="characters-grid">
                {characters.map((character) => (
                    <div 
                        key={character} 
                        className={"character-tile" + (selectedCharacter === character ? ' selected' : '')}
                        onClick={() => setSelectedCharacter(character)}
                    >
                        {character}
                    </div>
                ))}
            </div>
            <button className={"eraser-button" + (selectedCharacter === ' ' ? ' selected' : '')} onClick={() => setSelectedCharacter(' ')}>
                <FaEraser />
            </button>
            <button className="clear-grid-button" onClick={() => confirm('Are you sure you want to clear the grid?') && useDrawingModeStore.getState().clearGrid()}>
                Clear Grid
            </button>
        </div>
    );
}