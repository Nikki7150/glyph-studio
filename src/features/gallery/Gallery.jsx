import './Gallery.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import convertToAscii from '../../lib/asciiConverter';
// import { useGalleryStore } from '../../store/zustandStores.js';
import { FaCameraRetro, FaDownload } from 'react-icons/fa';

export default function Gallery() {
    return (
        <div className="gallery">
            <h1 className="gallery-heading text-xl font-bold">Gallery</h1>
            <div className="divider"></div>
        </div>
    );
}

export function GalleryPanel() {
    const navigate = useNavigate();
    return (
        <div className="gallery-panel">
            <button onClick={() => navigate('/')}>Back</button>
            <h2 className="gallery-panel-heading text-xl font-bold">Gallery Settings</h2>
        </div>
    );
}