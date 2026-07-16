import "./Monitor.css";
import usePlaygroundStore from '../store/playgroundStore';
import { PlaygroundPanel } from '../features/playground/Playground.jsx';

function SidePanel() {
    return (
        <div className="side-panel-container">
            <div className="side-panel">
                <PlaygroundPanel />
            </div>
        </div>
    );
}

export default SidePanel;