import { useState, useEffect, useRef } from 'react';
import convertToAscii from '../../lib/asciiConverter';
import './Playground.css'

import usePlaygroundStore from '../../store/playgroundStore';

export default function Playground() {
    const [log, setLog] = useState([]);
    const [imageSrc, setImageSrc] = useState(null);
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
                const ctx = canvas.getContext('2d');
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