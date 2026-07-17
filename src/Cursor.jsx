import { useMouse } from "@uidotdev/usehooks";
import { useEffect, useState } from 'react';

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
    border = 10,
    color = "#ffffff",
    }) => {
    const [mouse] = useMouse();
    const [isPointer, setIsPointer] = useState(false);

    useEffect(() => {
        const object = document.elementFromPoint(mouse.x, mouse.y);
        if (!object) return;
        const style = window.getComputedStyle(object);
        if (style.cursor === 'pointer') {
            setIsPointer(true);
        } else {
            setIsPointer(false);
        }
    }, [mouse.x, mouse.y]);

    return (
        <span
        style={{
            top: `${mouse.y}px`,
            left: `${mouse.x}px`,
            width,
            height,
            padding,
            borderWidth: border,
            borderColor: isPointer ? '#29553f' : color,
        }}
        className={`rounded-full bg-white
            absolute -translate-x-1/2 -translate-y-1/2 
            pointer-events-none z-[9999]`}
        ></span>
    );
};
export default Cursor;