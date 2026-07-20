import "./Monitor.css";
import { usePlaygroundStore } from '../store/zustandStores.js';
import { PlaygroundPanel } from '../features/playground/Playground.jsx';
import { CharacterExplorerPanel } from '../features/character-explorer/CharacterExplorer.jsx';
import routes, { isRouteActive } from '../routes.jsx';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function SidePanel() {
    const location = useLocation();
    
    return (
        <div className="side-panel-container">
            <div className="side-panel">
                {routes.find((route) => isRouteActive(route, location.pathname))?.panel}
            </div>
        </div>
    );
}

export default SidePanel;