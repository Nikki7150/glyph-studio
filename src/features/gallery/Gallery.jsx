import './Gallery.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import convertToAscii from '../../lib/asciiConverter';
// import { useGalleryStore } from '../../store/zustandStores.js';
import { FaCameraRetro, FaDownload } from 'react-icons/fa';
import { saveToGallery, deleteFromGallery } from '../../lib/galleryStorage.js';

export default function Gallery() {
    const [ activeTab, setActiveTab ] = useState('playground');
    const [ playgroundGallery, setPlaygroundGallery ] = useState([]);
    const [ liveCameraGallery, setLiveCameraGallery ] = useState([]);
    const [ drawingModeGallery, setDrawingModeGallery ] = useState([]);

    useEffect(() => {
        const pg = localStorage.getItem('gallery-playground');
        const lc = localStorage.getItem('gallery-live-camera');
        const dm = localStorage.getItem('gallery-drawing-mode');
        setPlaygroundGallery(pg ? JSON.parse(pg) : []);
        setLiveCameraGallery(lc ? JSON.parse(lc) : []);
        setDrawingModeGallery(dm ? JSON.parse(dm) : []);
    }, []);

    function handleDelete(storageKey, id, setStateFn) {
        const updated = deleteFromGallery(storageKey, id);
        setStateFn(updated);
    }

    return (
        <div className="gallery">
            <div className="gallery-nav">
                <h1 className="gallery-heading text-xl font-bold">Gallery</h1>
                <div className="gallery-tabs">
                    <button 
                        className={activeTab === 'playground' ? 'active' : ''}
                        onClick={() => setActiveTab('playground')}
                    >
                        Playground
                    </button>
                    <button 
                        className={activeTab === 'live-camera' ? 'active' : ''}
                        onClick={() => setActiveTab('live-camera')}
                    >
                        Live Camera
                    </button>
                    <button 
                        className={activeTab === 'drawing-mode' ? 'active' : ''}
                        onClick={() => setActiveTab('drawing-mode')}
                    >
                        Drawing Mode
                    </button>
                </div>
            </div>
            <div className="divider"></div>
            <div className="gallery-content">
                <div className="gallery-grid">
                    <div className="gallery-grid">
                        {playgroundGallery.map((item) => (
                        <div key={item.id} className="gallery-item">
                            <pre className="gallery-thumbnail">{item.asciiOutput?.join('\n') ?? 'Corrupted Artwork'}</pre>
                            <button 
                                className="delete-button" 
                                onClick={() => handleDelete('gallery-playground', item.id, setPlaygroundGallery)}
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export function GalleryPanel() {
    const navigate = useNavigate();
    const [ activeTab, setActiveTab ] = useState('playground');
    return (
        <div className="gallery-panel">
            <button onClick={() => navigate('/')}>Back</button>
            <h2 className="gallery-panel-heading text-xl font-bold">Gallery Settings</h2>
            <div className="gallery-panel-controls">
                <button className="delete-button" onClick={() => 
                    { 
                        const updated = deleteFromGallery('gallery-playground', itemId);
                        setPlaygroundGallery(updated);
                    }}>
                    Delete Artwork
                </button>
            </div>
        </div>
    );
}