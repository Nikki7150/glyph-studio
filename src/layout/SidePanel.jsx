import "./Monitor.css";
import usePlaygroundStore from '../store/playgroundStore';
import { PlaygroundPanel } from '../features/playground/Playground.jsx';
import { CharacterExplorerPanel } from '../features/character-explorer/CharacterExplorer.jsx';
import routes, { isRouteActive } from '../routes.jsx';

function SidePanel() {
    
    return (
        <div className="side-panel-container">
            <div className="side-panel">
                {routes.find((route) => isRouteActive(route, location.pathname))?.panel}
            </div>
        </div>
    );
}

export default SidePanel;