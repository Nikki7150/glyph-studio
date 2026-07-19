import './CompareMode.css';
import { useNavigate } from 'react-router-dom';
import { useImageStore, useCompareModeStore } from '../../store/zustandStores.js';
import { useRef, useEffect, useState } from 'react';
import convertToAscii from '../../lib/asciiConverter';

export default function CompareMode() {
    const imageSrc = useImageStore((state) => state.imageSrc);
    const setImageSrc = useImageStore((state) => state.setImageSrc);
    const width = useCompareModeStore((state) => state.width);
    const setWidth = useCompareModeStore((state) => state.setWidth);
    const contrast = useCompareModeStore((state) => state.contrast);
    const setContrast = useCompareModeStore((state) => state.setContrast);
    const brightness = useCompareModeStore((state) => state.brightness);
    const setBrightness = useCompareModeStore((state) => state.setBrightness);
    const invert = useCompareModeStore((state) => state.invert);
    const setInvert = useCompareModeStore((state) => state.setInvert);
    const asciiOutput = useCompareModeStore((state) => state.asciiOutput);
    const setAsciiOutput = useCompareModeStore((state) => state.setAsciiOutput);
    const canvasRef = useRef(null);
    const imageUrl = useCompareModeStore((state) => state.imageUrl);
    const setImageUrl = useCompareModeStore((state) => state.setImageUrl);

    const CHARACTER_SETS = {
        standard: '@%#*+=-:.',
    }

    const [imageData, setImageData] = useState(null);

    useEffect(() => {
        if (!imageSrc) return;
        const processImage = async () => {
            const img = new Image();
            img.src = imageSrc;
            img.onload = async () => {
                const trueHeight = (img.height * width) / img.width;
                const asciiHeight = trueHeight / 2.2;

                const photoCanvas = document.createElement('canvas');
                photoCanvas.width = width;
                photoCanvas.height = trueHeight;
                const photoCtx = photoCanvas.getContext('2d');
                photoCtx.drawImage(img, 0, 0, photoCanvas.width, photoCanvas.height);
                setImageUrl(photoCanvas.toDataURL());

                const canvas = canvasRef.current;
                canvas.width = width;
                canvas.height = asciiHeight;
                const ctx = canvas.getContext('2d', { willReadFrequently: true });
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                setImageData(imageData);
                const ascii = convertToAscii(imageData, { contrast, brightness, invert, characterSet: CHARACTER_SETS.standard });
                setAsciiOutput(ascii);
            }
        }
        processImage();
    }, [imageSrc, width, contrast, brightness, invert]);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setImageSrc(url);
        }
    };

    const divRef = useRef(null);
    const [ offsetWidth, setOffsetWidth ] = useState(0);

    useEffect(() => {
        if (divRef.current) {
            setOffsetWidth(divRef.current.offsetWidth);
        }
    }, [imageUrl, asciiOutput]);

    const numColumns = asciiOutput[0]?.length || 10;
    const fontSize = offsetWidth / (numColumns * 0.67);

    const handleCharacterClick = (row, col, character) => {
        const width = imageData.width;
        const pxIndex = (row * width + col) * 4;
        const r = imageData.data[pxIndex];
        const g = imageData.data[pxIndex + 1];
        const b = imageData.data[pxIndex + 2];
        const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
        setSelectedCell({row, col, character, brightness});
    };

    return(
        <div className="compare-mode">
            <div className="compare-nav">
                <h2 className='compare-mode-heading text-xl font-bold'>Compare Mode</h2>
                {imageUrl && <button className="new-upload" onClick={() => document.querySelector('.image-input').click()}>Change Image</button>}
            </div>
            <div className="divider"></div>
            <input type="file" onChange={handleFileUpload} className="image-input" style={{ display: 'none' }} />
            <canvas ref={canvasRef} style={{ display: 'none' }} />
            {imageUrl && (
                <div className="compare-mode-content">
                    <div className="compare-image-box">
                        <img src={imageUrl} alt="Comparison" className="compare-image" />
                    </div>
                    <h1 className="convert">→</h1>
                    <div className="compare-ascii-box" ref={divRef}>
                        <div className="compare-ascii" style={{ fontSize: `${fontSize}px` }}>
                            {asciiOutput.map((row, index) => (
                                <div key={index} className="ascii-row">
                                    {row.split('').map((char, i) => (
                                        <span key={i} 
                                            className="ascii-char" 
                                            onClick={() => handleCharacterClick(index, i, char)}
                                        >
                                            {char}
                                        </span>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            {!imageUrl && (
                <div className="compare-mode-content">
                    <div className="upload-box" onClick={() => document.querySelector('.image-input').click()}>
                        <label htmlFor="image-file">+</label>
                        <h3>Click to upload an image to compare</h3>
                    </div>
                </div>
            )}
        </div>
    );
}

export function CompareModePanel() {
    const navigate = useNavigate();
    const width = useCompareModeStore((state) => state.width);
    const setWidth = useCompareModeStore((state) => state.setWidth);
    const contrast = useCompareModeStore((state) => state.contrast);
    const setContrast = useCompareModeStore((state) => state.setContrast);
    const brightness = useCompareModeStore((state) => state.brightness);
    const setBrightness = useCompareModeStore((state) => state.setBrightness);
    const invert = useCompareModeStore((state) => state.invert);
    const setInvert = useCompareModeStore((state) => state.setInvert);
    const imageUrl = useCompareModeStore((state) => state.imageUrl);
    const setImageUrl = useCompareModeStore((state) => state.setImageUrl);
    return (
        <div className="compare-mode-panel">
            <button onClick={() => navigate('/')}>Back</button>
            <h3 className='compare-heading'>Compare Tools</h3>
        </div>
    );
}
