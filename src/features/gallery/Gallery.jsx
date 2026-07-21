import './Gallery.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import convertToAscii from '../../lib/asciiConverter';
import { useGalleryStore } from '../../store/zustandStores.js';
import { FaCameraRetro, FaDownload } from 'react-icons/fa';
import { saveToGallery, deleteFromGallery } from '../../lib/galleryStorage.js';

export default function Gallery() {
    const [ activeTab, setActiveTab ] = useState('playground');
    const playgroundGallery = useGalleryStore((state) => state.playgroundGallery);
    const setPlaygroundGallery = useGalleryStore((state) => state.setPlaygroundGallery);
    const liveCameraGallery = useGalleryStore((state) => state.liveCameraGallery);
    const setLiveCameraGallery = useGalleryStore((state) => state.setLiveCameraGallery);
    const drawingModeGallery = useGalleryStore((state) => state.drawingModeGallery);
    const setDrawingModeGallery = useGalleryStore((state) => state.setDrawingModeGallery);
    const selectedItemId = useGalleryStore((state) => state.selectedItemId);
    const setSelectedItemId = useGalleryStore((state) => state.setSelectedItemId);

    useEffect(() => {
        const pg = localStorage.getItem('gallery-playground');
        const lc = localStorage.getItem('gallery-live-camera');
        const dm = localStorage.getItem('gallery-drawing-mode');
        setPlaygroundGallery(pg ? JSON.parse(pg) : []);
        setLiveCameraGallery(lc ? JSON.parse(lc) : []);
        setDrawingModeGallery(dm ? JSON.parse(dm) : []);
    }, []);

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
                {selectedItemId ? (
                    <div className="gallery-preview">
                        <button className="close-button" onClick={() => setSelectedItemId(null)}>X</button>
                        <pre className="gallery-preview-ascii" 
                            style={{ fontSize: selectedItemId.storageKey === 'gallery-live-camera' ? '1.5px' : '15px' }}>
                            {selectedItemId.item.asciiOutput?.join('\n') ?? 'Corrupted Artwork'}
                        </pre>
                    </div>
                ) : (
                    <>
                        {activeTab === 'playground' && (
                            <div className="gallery-grid">
                                {playgroundGallery.map((item) => (
                                <div key={item.id} className="gallery-item" onClick={() => setSelectedItemId({storageKey: 'gallery-playground', item})}>
                                    <pre className="gallery-thumbnail" style={{ fontSize: '5px' }}>{item.asciiOutput?.join('\n') ?? 'Corrupted Artwork'}</pre>
                                </div>
                            ))}
                            </div>
                        )}
                        {activeTab === 'live-camera' && (
                            <div className="gallery-grid">
                                {liveCameraGallery.map((item) => (
                                <div key={item.id} className="gallery-item" onClick={() => setSelectedItemId({storageKey: 'gallery-live-camera', item})}>
                                    <pre className="gallery-thumbnail" style={{ fontSize: '1px' }}>{item.asciiOutput?.join('\n') ?? 'Corrupted Artwork'}</pre>
                                </div>
                            ))}
                            </div>
                        )}
                        {activeTab === 'drawing-mode' && (
                            <div className="gallery-grid">
                                {drawingModeGallery.map((item) => (
                                <div key={item.id} className="gallery-item" onClick={() => setSelectedItemId({storageKey: 'gallery-drawing-mode', item})}>
                                    <pre className="gallery-thumbnail" style={{ fontSize: '5px' }}>{item.asciiOutput?.join('\n') ?? 'Corrupted Artwork'}</pre>
                                </div>
                            ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export function GalleryPanel() {
    const navigate = useNavigate();
    const playgroundGallery = useGalleryStore((state) => state.playgroundGallery);
    const setPlaygroundGallery = useGalleryStore((state) => state.setPlaygroundGallery);
    const liveCameraGallery = useGalleryStore((state) => state.liveCameraGallery);
    const setLiveCameraGallery = useGalleryStore((state) => state.setLiveCameraGallery);
    const drawingModeGallery = useGalleryStore((state) => state.drawingModeGallery);
    const setDrawingModeGallery = useGalleryStore((state) => state.setDrawingModeGallery);
    const selectedItemId = useGalleryStore((state) => state.selectedItemId);
    const setSelectedItemId = useGalleryStore((state) => state.setSelectedItemId);

    function handleDelete(storageKey, id, setStateFn) {
        const updated = deleteFromGallery(storageKey, id);
        setStateFn(updated);
    }

    return (
        <div className="gallery-panel">
            <button onClick={() => {navigate('/'); setSelectedItemId(null);}}>Back</button>
            <h2 className="gallery-panel-heading text-xl font-bold">Gallery Settings</h2>
            <div className="gallery-panel-controls">
                {selectedItemId && (
                    <div className="selected-item-info">
                        <p>Saved: {new Date(selectedItemId.item.timestamp).toLocaleString()}</p>
                        {selectedItemId.storageKey === 'gallery-playground' && (
                            <div className="item-settings">
                                <p>Playground Item</p>
                                <p>Width: {selectedItemId.item.settings?.width ?? 'N/A'}</p>
                                <p>Contrast: {selectedItemId.item.settings?.contrast ?? 'N/A'}</p>
                                <p>Brightness: {selectedItemId.item.settings?.brightness ?? 'N/A'}</p>
                                <p>Invert: {selectedItemId.item.settings?.invert ? 'Yes' : 'No'}</p>
                                <p>Character Set: {selectedItemId.item.settings?.characterSet ?? 'N/A'}</p>
                            </div>
                        )}
                        {selectedItemId.storageKey === 'gallery-live-camera' && (
                            <div className="item-settings">
                                <p>Live Camera Item</p>
                                <p>Contrast: {selectedItemId.item.settings?.contrast ?? 'N/A'}</p>
                                <p>Brightness: {selectedItemId.item.settings?.brightness ?? 'N/A'}</p>
                                <p>Invert: {selectedItemId.item.settings?.invert ? 'Yes' : 'No'}</p>
                                <p>Character Set: {selectedItemId.item.settings?.characterSet ?? 'N/A'}</p>
                            </div>
                        )}
                        {selectedItemId.storageKey === 'gallery-drawing-mode' && (
                            <div className="item-settings">
                                <p>Drawing Mode Item</p>
                                <p>Width: {selectedItemId.item.settings?.width ?? 'N/A'}</p>
                                <p>Height: {selectedItemId.item.settings?.height ?? 'N/A'}</p>
                            </div>
                        )}
                        <button className="delete-button" onClick={() => {
                            if (confirm('Are you sure you want to delete this item? This action cannot be undone.')) {
                                handleDelete(selectedItemId.storageKey, selectedItemId.item.id, 
                                    selectedItemId.storageKey === 'gallery-playground' ? setPlaygroundGallery :
                                    selectedItemId.storageKey === 'gallery-live-camera' ? setLiveCameraGallery :
                                    setDrawingModeGallery
                                );
                            }
                            setSelectedItemId(null);
                        }}>
                            Delete Selected Item
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}