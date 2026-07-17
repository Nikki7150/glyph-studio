import { create } from 'zustand';

const useCharacterExplorerStore = create((set) => ({
    selectedCharacter: '@',
    setSelectedCharacter: (character) => set({ selectedCharacter: character }),
}));

export default useCharacterExplorerStore;