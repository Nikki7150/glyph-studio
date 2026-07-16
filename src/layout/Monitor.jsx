import "./Monitor.css";
import Screen from './Screen.jsx';
import SidePanel from './SidePanel.jsx';

function Monitor() {
    return (
        <div className="monitor-container">
            <div className="monitor">
                <Screen />
                <SidePanel />
            </div>
        </div>
    );
}

export default Monitor;