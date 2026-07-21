import './DrawingMode.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { characters } from "../../lib/characterCoverage";
import { useDrawingModeStore } from '../../store/zustandStores.js';
import { FaEraser, FaDownload } from 'react-icons/fa';
import { saveToGallery } from '../../lib/galleryStorage.js';

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
    const [ saveClick, setSaveClick ] = useState(false);

    const grid = useDrawingModeStore((state) => state.grid);
    const asciiOutput = grid.map(row => row.join(''));

    const numColumns = asciiOutput[0]?.length;
    const numRows = asciiOutput.length;

    function exportAsciiArtPng() {
        const fontSize = 12;
        const charWidth = fontSize * 0.6;
        const lineHeight = fontSize * 1.2;
        const width = numColumns * charWidth;
        const height = numRows * lineHeight;
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = 'black';
        ctx.font = `${fontSize}px monospace`;

        asciiOutput.forEach((line, rowIndex) => {
            ctx.fillText(line, 0, (rowIndex + 1) * lineHeight);
        });

        const link = document.createElement('a');
        link.download = 'ascii-art.png';
        link.href = canvas.toDataURL();
        link.click();
    }

    function copyAsciiToClipboard() {
        const text = asciiOutput.join('\n');
        navigator.clipboard.writeText(text)
            .then(() => {
                alert('ASCII art copied to clipboard!');
            })
            .catch((err) => {
                console.error('Failed to copy ASCII art: ', err);
            });
    }

    return (
        <div className="drawing-mode-panel">
            <button onClick={() => navigate('/')}>Back</button>
            <h3 className='drawing-heading text-xl font-bold'>Drawing Tools</h3>
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
            <button className={ asciiOutput.length > 0 ? "save-button enabled" : "save-button" } onClick={() => setSaveClick(true)}>
                Save <FaDownload />
            </button>
            {saveClick && (
                <div className="save-options">
                    <button className="save-option" 
                        onClick={() => { 
                            setSaveClick(false); 
                            saveToGallery('gallery-drawing-mode', 
                            {
                                id: Date.now(),
                                asciiOutput: asciiOutput,
                                timestamp: Date.now(),
                            }); 
                        }}>
                        Save to Gallery
                    </button>
                    <button className="save-option" onClick={() => { setSaveClick(false); exportAsciiArtPng(); }}>Download</button>
                    <button className="save-option" onClick={() => { setSaveClick(false); copyAsciiToClipboard(); }}>Copy</button>
                    <button className="save-option" onClick={() => setSaveClick(false)}>Cancel</button>
                </div>
            )}
        </div>
    );
}