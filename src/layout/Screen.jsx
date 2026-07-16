import "./Monitor.css";
import { Outlet } from 'react-router-dom';

function Screen() {
    return (
        <div className="screen">
            <div className="screen-bezel">
                <div className="screen-glass">
                    <div className="screen-content">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Screen;