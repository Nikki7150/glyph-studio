import "./Monitor.css";
import usePlaygroundStore from '../store/playgroundStore';

function SidePanel() {
    const width = usePlaygroundStore((state) => state.width);
    const setWidth = usePlaygroundStore((state) => state.setWidth);
    const contrast = usePlaygroundStore((state) => state.contrast);
    const setContrast = usePlaygroundStore((state) => state.setContrast);
    const brightness = usePlaygroundStore((state) => state.brightness);
    const setBrightness = usePlaygroundStore((state) => state.setBrightness);
    const invert = usePlaygroundStore((state) => state.invert);
    const setInvert = usePlaygroundStore((state) => state.setInvert);
    const characterSet = usePlaygroundStore((state) => state.characterSet);
    const setCharacterSet = usePlaygroundStore((state) => state.setCharacterSet);

    return (
        <div className="side-panel">
            
            <label htmlFor="width">Width:</label>
            <input type="range" min="50" max="200" value={width} onChange={(e) => setWidth(parseInt(e.target.value))} className="generator-input" />
            <label htmlFor="contrast">Contrast:</label>
            <input type="range" min="0.1" max="2" step="0.1" value={contrast} onChange={(e) => setContrast(parseFloat(e.target.value))} className="generator-input" />
            <label htmlFor="brightness">Brightness:</label>
            <input type="range" min="-100" max="100" step="0.1" value={brightness} onChange={(e) => setBrightness(parseFloat(e.target.value))} className="generator-input" />
            <label htmlFor="invert">Invert:</label>
            <input type="checkbox" checked={invert} onChange={(e) => setInvert(e.target.checked)} />
            <label htmlFor="characterSet">Character Set:</label>
            <select id="characterSet" value={characterSet} onChange={(e) => setCharacterSet(e.target.value)}>
                <option value="standard">Standard</option>
                <option value="blocks">Blocks</option>
            </select>
        </div>
    );
}

export default SidePanel;