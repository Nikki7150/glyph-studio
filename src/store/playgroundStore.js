import { create } from 'zustand';

const usePlaygroundStore = create((set) => ({
    // state values — same ones currently in Playground's useState calls
    width: 100,
    contrast: 1,
    brightness: 0,
    invert: false,
    characterSet: 'standard',

    // setter functions — one per value, using `set`
    setWidth: (value) => set({ width: value }),
    setContrast: (value) => set({ contrast: value }),
    setBrightness: (value) => set({ brightness: value }),
    setInvert: (value) => set({ invert: value }),
    setCharacterSet: (value) => set({ characterSet: value }),
}));

export default usePlaygroundStore;