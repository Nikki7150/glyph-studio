import "./Monitor.css";
import Playground from '../features/playground/Playground.jsx';

function Screen() {
    return (
        <div className="screen">
            <div className="screen-bezel">
                <div className="screen-glass">
                    <div className="screen-content">
                        <Playground />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Screen;