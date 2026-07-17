import { useMouse } from "@uidotdev/usehooks";

/**
 * @typedef {Object} CursorProps
 * @property {number} [width=0]
 * @property {number} [height=0]
 * @property {number} [padding=2]
 * @property {number} [border=4]
 * @property {string} [color="#ffffff"]
 */
const Cursor = ({
    width = 0,
    height = 0,
    padding = 2,
    border = 4,
    color = "#ffffff",
    }) => {
    const [mouse] = useMouse();
    return (
        <span
        style={{
            top: `${mouse.y}px`,
            left: `${mouse.x}px`,
            width,
            height,
            padding,
            borderWidth: border,
            borderColor: color,
        }}
        className={`rounded-full bg-white
            absolute -translate-x-1/2 -translate-y-1/2 
            pointer-events-none`}
        ></span>
    );
};
export default Cursor;