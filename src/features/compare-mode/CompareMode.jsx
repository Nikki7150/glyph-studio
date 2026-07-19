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

    useEffect(() => {
        if (!imageSrc) return;
        const processImage = async () => {
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
                const ascii = convertToAscii(imageData, { contrast, brightness, invert, characterSet: CHARACTER_SETS.standard });
                setAsciiOutput(ascii);
                setImageUrl(canvas.toDataURL());
            }
        }
        processImage();
    }, [imageSrc, width, contrast, brightness, invert]);

    return(
        <div className="compare-mode">
            <h2 className='compare-mode-heading text-xl font-bold'>Compare Mode</h2>
            <div className="divider"></div>
            {console.log('canvasRef.current:', canvasRef.current)}
            <canvas ref={canvasRef} style={{ display: 'none' }} />
            <div className="compare-mode-content">
                <img src={imageUrl} alt="Comparison" className="compare-image" />
                <pre className="compare-ascii">{asciiOutput.join('\n')}</pre>
            </div>
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
