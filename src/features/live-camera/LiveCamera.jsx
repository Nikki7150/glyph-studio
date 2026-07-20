import './LiveCamera.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import convertToAscii from '../../lib/asciiConverter';

export default function LiveCamera() {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [asciiOutput, setAsciiOutput] = useState([]);

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

    useEffect(() => {
        const intervalId = setInterval(() => {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            if (!video || !canvas || video.readyState !== 4) return;
            const ctx = canvas.getContext('2d');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const asciiArt = convertToAscii(imageData);
            setAsciiOutput(asciiArt);
        }, 150);
        return () => clearInterval(intervalId);
    }, [videoRef, canvasRef]);

    return(
        <div className="live-camera">
            <h2 className="live-camera-heading text-xl font-bold">Live Camera</h2>
            <div className="divider"></div>
            <video ref={videoRef} autoPlay style={{ display: 'none' }} />
            <canvas ref={canvasRef} style={{ display: 'none' }} />
            <pre>{asciiOutput.join('\n')}</pre>
        </div>
    );
}

export function LiveCameraPanel() {
    const navigate = useNavigate();
    return(
        <div className="live-camera-panel">
            <button onClick={() => navigate('/')}>Back</button>
            <h3>Live Camera Controls</h3>
            <p>Adjust the live camera settings here.</p>
        </div>
    );
}