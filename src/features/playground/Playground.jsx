import { useState, useEffect, useRef } from 'react';
import convertToAscii from '../../lib/asciiConverter';
import './Playground.css'

import { usePlaygroundStore } from '../../store/zustandStores.js';
import { useImageStore } from '../../store/zustandStores.js';
import { useNavigate } from 'react-router-dom';

export default function Playground() {
    const [log, setLog] = useState([]);
    const imageSrc = useImageStore((state) => state.imageSrc);
    const setImageSrc = useImageStore((state) => state.setImageSrc);
    const width = usePlaygroundStore((state) => state.width);
    const setWidth = usePlaygroundStore((state) => state.setWidth);
    const contrast = usePlaygroundStore((state) => state.contrast);
    const setContrast = usePlaygroundStore((state) => state.setContrast);
    const brightness = usePlaygroundStore((state) => state.brightness);
    const setBrightness = usePlaygroundStore((state) => state.setBrightness);
    const invert = usePlaygroundStore((state) => state.invert);
    const setInvert = usePlaygroundStore((state) => state.setInvert);
    const characterSet = usePlaygroundStore((state) => state.characterSet);
    const setCharacterSet = usePlaygroundStore((state) => state.setCharacterSet);
    const [asciiOutput, setAsciiOutput] = useState([]);

    const canvasRef = useRef(null);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setImageSrc(url);
        }
    };

    const CHARACTER_SETS = {
        standard: '@%#*+=-:. ',
        blocks: '█▓▒░ ',
    };

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    useEffect(() => {
        if (!imageSrc) return;
        const processImage = async () => {
            //setStatus('gathering');
            setLog((prev) => [...prev, 'Gathering image data...'])
            await delay(500);
            const img = new Image();
            img.src = imageSrc;
            img.onload = async () => {
                const height = (img.height * width) / img.width / 2.2;
                const canvas = canvasRef.current;
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d', { willReadFrequently: true });
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                //setStatus('converting');
                setLog((prev) => [...prev, 'Converting to ASCII...'])
                await delay(500);
                const ascii = convertToAscii(imageData, { contrast, brightness, invert, characterSet: CHARACTER_SETS[characterSet] });
                //setStatus('rendering');
                setLog((prev) => [...prev, 'Rendering output...'])
                await delay(300);
                setAsciiOutput(ascii);
                //setStatus('done');
                setLog((prev) => [...prev, 'Loaded Output.'])
            }
        }
        processImage();
    }, [imageSrc, width, contrast, brightness, invert, characterSet]);

    return (
        <div className="playground">
            <h1 className="playground-heading text-xl font-bold">Playground</h1>
            <div className="divider"></div>
            <input type="file" onChange={handleFileUpload} className="image-file-input" />
            <canvas ref={canvasRef} style={{ display: 'none' }} />
            {log.length === 0 && asciiOutput.length === 0 && (
                <div className="image-upload" onClick={() => document.querySelector('.image-file-input').click()}>
                    <label htmlFor="image-file">+</label>
                    <h3>Click to upload an image</h3>
                </div>
            )}

            {log.length > 0 && asciiOutput.length === 0 && (
                <div className="log">
                    {log.map((entry, index) => (
                        <p key={index}>{entry}</p>
                    ))}
                </div>
            )}

            {asciiOutput.length > 0 && (
                <pre>{asciiOutput.join('\n')}</pre>
            )}
        </div>
    );
}

export function PlaygroundPanel() {
    const width = usePlaygroundStore((state) => state.width);
    const setWidth = usePlaygroundStore((state) => state.setWidth);
    const contrast = usePlaygroundStore((state) => state.contrast);
    const setContrast = usePlaygroundStore((state) => state.setContrast);
    const brightness = usePlaygroundStore((state) => state.brightness);
    const setBrightness = usePlaygroundStore((state) => state.setBrightness);
    const invert = usePlaygroundStore((state) => state.invert);
    const setInvert = usePlaygroundStore((state) => state.setInvert);
    const characterSet = usePlaygroundStore((state) => state.characterSet);
    const setCharacterSet = usePlaygroundStore((state) => state.setCharacterSet);
    const navigate = useNavigate();

    return (
        <div className="playground-panel">
            <button onClick={() => navigate('/')}>Back</button>
            <h2 className="play-panel-heading text-xl font-bold">ASCII Art Settings</h2>
            <div className="playground-controls">
                <label htmlFor="width">Width: {width}</label>
                <input type="range" min="50" max="200" value={width} onChange={(e) => setWidth(parseInt(e.target.value))} />
                <label htmlFor="contrast">Contrast: {contrast}</label>
                <input type="range" min="0.1" max="2" step="0.1" value={contrast} onChange={(e) => setContrast(parseFloat(e.target.value))} />
                <label htmlFor="brightness">Brightness: {brightness}</label>
                <input type="range" min="-100" max="100" step="0.1" value={brightness} onChange={(e) => setBrightness(parseFloat(e.target.value))} />
                <label htmlFor="invert">Invert: {invert ? 'Yes' : 'No'}</label>
                <input type="checkbox" checked={invert} onChange={(e) => setInvert(e.target.checked)} />
                <label htmlFor="characterSet">Character Set:</label>
                <select id="characterSet" value={characterSet} onChange={(e) => setCharacterSet(e.target.value)}>
                    <option value="standard">Standard</option>
                    <option value="blocks">Blocks</option>
                </select>
            </div>
        </div>
    );
}
