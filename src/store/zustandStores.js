import { create } from 'zustand';

export const usePlaygroundStore = create((set) => ({
    width: 100,
    contrast: 1,
    brightness: 0,
    invert: false,
    characterSet: 'standard',
    asciiOutput: [],

    setWidth: (value) => set({ width: value }),
    setContrast: (value) => set({ contrast: value }),
    setBrightness: (value) => set({ brightness: value }),
    setInvert: (value) => set({ invert: value }),
    setCharacterSet: (value) => set({ characterSet: value }),
    setAsciiOutput: (value) => set({ asciiOutput: value }),
}));


export const useCharacterExplorerStore = create((set) => ({
    selectedCharacter: '@',
    setSelectedCharacter: (character) => set({ selectedCharacter: character }),
}));


export const useDrawingModeStore = create((set) => ({
    selectedCharacter: '@',
    setSelectedCharacter: (character) => set({ selectedCharacter: character }),
    grid: Array.from({ length: 46 }, () => Array.from({ length: 102 }, () => ' ')),
    setGrid: (updater) => set((state) => ({
        grid: typeof updater === 'function' ? updater(state.grid) : updater
    })),
    createEmptyGrid: (rows, cols) => Array.from({ length: rows }, () => Array.from({ length: cols }, () => ' ')),
    clearGrid: () => set((state) => ({ grid: state.createEmptyGrid(46, 102) }))
}));


export const useImageStore = create((set) => ({
    imageSrc: null,
    setImageSrc: (src) => set({ imageSrc: src })
}));


export const useCompareModeStore = create((set) => ({
    width: 100,
    contrast: 1,
    brightness: 0,
    invert: false,
    asciiOutput: [],
    imageUrl: null,
    selectedCell: null,

    setWidth: (value) => set({ width: value }),
    setContrast: (value) => set({ contrast: value }),
    setBrightness: (value) => set({ brightness: value }),
    setInvert: (value) => set({ invert: value }),
    setAsciiOutput: (value) => set({ asciiOutput: value }),
    setImageUrl: (value) => set({ imageUrl: value }),
    setSelectedCell: (value) => set({ selectedCell: value }),
}))


export const useLiveCameraStore = create((set) => ({
    contrast: 1,
    brightness: 0,
    invert: false,
    characterSet: 'standard',
    asciiOutput: [],
    capturedAscii: [],
    isPaused: false,
    fillColor: '#000000',

    setContrast: (value) => set({ contrast: value }),
    setBrightness: (value) => set({ brightness: value }),
    setInvert: (value) => set({ invert: value }),
    setCharacterSet: (value) => set({ characterSet: value }),
    setAsciiOutput: (value) => set({ asciiOutput: value }),
    setCapturedAscii: (value) => set({ capturedAscii: value }),
    setIsPaused: (value) => set({ isPaused: value }),
    setFillColor: (value) => set({ fillColor: value }),
}));

export const useGalleryStore = create((set) => ({
    playgroundGallery: [],
    liveCameraGallery: [],
    drawingModeGallery: [],
    selectedItemId: null,

    setPlaygroundGallery: (value) => set({ playgroundGallery: value }),
    setLiveCameraGallery: (value) => set({ liveCameraGallery: value }),
    setDrawingModeGallery: (value) => set({ drawingModeGallery: value }),
    setSelectedItemId: (value) => set({ selectedItemId: value }),
}));