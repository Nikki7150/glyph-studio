import './LiveCamera.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import convertToAscii from '../../lib/asciiConverter';
import { useLiveCameraStore } from '../../store/zustandStores.js';
import { FaCameraRetro, FaDownload } from 'react-icons/fa';

export default function LiveCamera() {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const contrast = useLiveCameraStore((state) => state.contrast);
    const setContrast = useLiveCameraStore((state) => state.setContrast);
    const brightness = useLiveCameraStore((state) => state.brightness);
    const setBrightness = useLiveCameraStore((state) => state.setBrightness);
    const invert = useLiveCameraStore((state) => state.invert);
    const setInvert = useLiveCameraStore((state) => state.setInvert);
    const characterSet = useLiveCameraStore((state) => state.characterSet);
    const setCharacterSet = useLiveCameraStore((state) => state.setCharacterSet);
    const asciiOutput = useLiveCameraStore((state) => state.asciiOutput);
    const setAsciiOutput = useLiveCameraStore((state) => state.setAsciiOutput);
    const capturedAscii = useLiveCameraStore((state) => state.capturedAscii);
    const setCapturedAscii = useLiveCameraStore((state) => state.setCapturedAscii);
    const fillColor = useLiveCameraStore((state) => state.fillColor);
    const setFillColor = useLiveCameraStore((state) => state.setFillColor);

    const CHARACTER_SETS = {
        standard: '@%#*+=-:. ',
        blocks: '█▓▒░ ',
    };

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            })
            .catch((error) => {
                console.error('Error accessing camera:', error);
                alert('Could not access camera: ' + error.message);
            });
    }, [])

    const columns = 800;
    const isPaused = useLiveCameraStore((state) => state.isPaused);
    const setIsPaused = useLiveCameraStore((state) => state.setIsPaused);
    useEffect(() => {
        const intervalId = setInterval(() => {
            if (isPaused) return;
            const video = videoRef.current;
            const canvas = canvasRef.current;
            if (!video || !canvas || video.readyState !== 4) return;
            const aspectCorrectedHeight = Math.floor((video.videoHeight / video.videoWidth) * columns / 2.2);
            const ctx = canvas.getContext('2d');
            canvas.width = columns;
            canvas.height = aspectCorrectedHeight;
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const asciiArt = convertToAscii(imageData, {
                contrast: contrast,
                brightness: brightness,
                invert: invert,
                characterSet: CHARACTER_SETS[characterSet],
            });
            setAsciiOutput(asciiArt);
        }, 150);
        return () => clearInterval(intervalId);
    }, [videoRef, canvasRef, contrast, brightness, invert, characterSet]);

    const divRef = useRef(null);
    const [ offsetWidth, setOffsetWidth ] = useState(0);

    useEffect(() => {
        if (divRef.current) {
            setOffsetWidth(divRef.current.offsetWidth);
        }
    }, [divRef]);

    const fontSize = offsetWidth / (columns * .656);

    return(
        <div className="live-camera">
            <h2 className="live-camera-heading text-xl font-bold">Live Camera</h2>
            <div className="divider"></div>
            <video ref={videoRef} autoPlay style={{ display: 'none' }} />
            <canvas ref={canvasRef} style={{ display: 'none' }} />
            <div className="ascii-output-container" ref={divRef} style={{ fontSize: `${fontSize}px` , lineHeight: `${fontSize * 1.2}px` }}>
                <pre style={{ whiteSpace: 'pre-wrap' , fontFamily: 'monospace' }}>{isPaused ? capturedAscii.join('\n') : asciiOutput.join('\n')}</pre>
            </div>
        </div>
    );
}

export function LiveCameraPanel() {
    const navigate = useNavigate();
    const contrast = useLiveCameraStore((state) => state.contrast);
    const setContrast = useLiveCameraStore((state) => state.setContrast);
    const brightness = useLiveCameraStore((state) => state.brightness);
    const setBrightness = useLiveCameraStore((state) => state.setBrightness);
    const invert = useLiveCameraStore((state) => state.invert);
    const setInvert = useLiveCameraStore((state) => state.setInvert);
    const characterSet = useLiveCameraStore((state) => state.characterSet);
    const setCharacterSet = useLiveCameraStore((state) => state.setCharacterSet);

    const asciiOutput = useLiveCameraStore((state) => state.asciiOutput);
    const setAsciiOutput = useLiveCameraStore((state) => state.setAsciiOutput);

    const [ saveClick, setSaveClick ] = useState(false);

    const capturedAscii = useLiveCameraStore((state) => state.capturedAscii);
    const setCapturedAscii = useLiveCameraStore((state) => state.setCapturedAscii);

    const isPaused = useLiveCameraStore((state) => state.isPaused);
    const setIsPaused = useLiveCameraStore((state) => state.setIsPaused);

    const numColumns = capturedAscii[0]?.length;
    const numRows = capturedAscii.length;

    const fillColor = useLiveCameraStore((state) => state.fillColor);
    const setFillColor = useLiveCameraStore((state) => state.setFillColor);

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
        ctx.fillStyle = invert ? 'white' : 'black';
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = invert ? 'black' : 'white';
        ctx.font = `${fontSize}px monospace`;

        capturedAscii.forEach((line, rowIndex) => {
            ctx.fillText(line, 0, (rowIndex + 1) * lineHeight);
        });

        const link = document.createElement('a');
        link.download = 'ascii-art.png';
        link.href = canvas.toDataURL();
        link.click();
    }

    function copyAsciiToClipboard() {
        const text = capturedAscii.join('\n');
        navigator.clipboard.writeText(text)
            .then(() => {
                alert('ASCII art copied to clipboard!');
            })
            .catch((err) => {
                console.error('Failed to copy ASCII art: ', err);
            });
    }

    return(
        <div className="live-camera-panel">
            <button onClick={() => navigate('/')}>Back</button>
            <h3 className="live-panel-heading text-xl font-bold">Live Camera Controls</h3>
            <div className="live-camera-controls">
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
            <button  className="click-picture-button" onClick={() => {setCapturedAscii(asciiOutput); setIsPaused(true);}}>
                <FaCameraRetro />
            </button>
            <button className={ isPaused ? "retake-button enabled" : "retake-button" } onClick={() => { setIsPaused(false); }}>
                Retake
            </button>
            <button className={ capturedAscii.length > 0 ? "save-button enabled" : "save-button" } onClick={() => setSaveClick(true)}>
                Save <FaDownload />
            </button>
            {saveClick && (
                <div className="save-options">
                    <button className="save-option" onClick={() => { setSaveClick(false); }}>Save to Gallery</button>
                    <button className="save-option" onClick={() => { setSaveClick(false); exportAsciiArtPng(); }}>Download</button>
                    <button className="save-option" onClick={() => { setSaveClick(false); copyAsciiToClipboard(); }}>Copy</button>
                    <button className="save-option" onClick={() => setSaveClick(false)}>Cancel</button>
                </div>
            )}
        </div>
    );
}