import { useState, useEffect, useRef } from 'react';
import convertToAscii from '../../lib/asciiConverter';
import './Playground.css'

import usePlaygroundStore from '../../store/playgroundStore';

export default function Playground() {
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
            <canvas ref={canvasRef} style={{ display: 'none' }} />
            <pre>{asciiOutput.join('\n')}</pre>
        </div>
    );
}