import './LiveCamera.css';
import { useNavigate } from 'react-router-dom';

export default function LiveCamera() {
    return(
        <div className="live-camera">
            <h2>Live Camera</h2>
            <p>This is the live camera feature.</p>
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