import { useState, useEffect, useRef } from 'react';
import convertToAscii from '../../lib/asciiConverter';
import './Playground.css'

export default function Playground() {
    const [imageSrc, setImageSrc] = useState(null);
    const [width, setWidth] = useState(100);
    const [contrast, setContrast] = useState(1);
    const [brightness, setBrightness] = useState(1);
    const [invert, setInvert] = useState(false);
    const [characterSet, setCharacterSet] = useState('standard');
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

    useEffect(() => {
        if (!imageSrc) return;
        const img = new Image();
        img.src = imageSrc;
        img.onload = () => {
            const height = (img.height * width) / img.width / 2.2;
            const canvas = canvasRef.current;
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const ascii = convertToAscii(imageData, { contrast, brightness, invert, characterSet: CHARACTER_SETS[characterSet] });
            setAsciiOutput(ascii);
        }
    }, [imageSrc, width, contrast, brightness, invert, characterSet]);

    return (
        <div className="playground">
            <input type="file" onChange={handleFileUpload} />
            <label htmlFor="width">Width:</label>
            <input type="range" min="50" max="200" value={width} onChange={(e) => setWidth(parseInt(e.target.value))} />
            <label htmlFor="contrast">Contrast:</label>
            <input type="range" min="0.1" max="2" step="0.1" value={contrast} onChange={(e) => setContrast(parseFloat(e.target.value))} />
            <label htmlFor="brightness">Brightness:</label>
            <input type="range" min="-100" max="100" step="0.1" value={brightness} onChange={(e) => setBrightness(parseFloat(e.target.value))} />
            <label htmlFor="invert">Invert:</label>
            <input type="checkbox" checked={invert} onChange={(e) => setInvert(e.target.checked)} />
            <label htmlFor="characterSet">Character Set:</label>
            <select id="characterSet" value={characterSet} onChange={(e) => setCharacterSet(e.target.value)}>
                <option value="standard">Standard</option>
                <option value="blocks">Blocks</option>
            </select>
            <canvas ref={canvasRef} style={{ display: 'none' }} />
            <pre>{asciiOutput.join('\n')}</pre>
        </div>
    );
}