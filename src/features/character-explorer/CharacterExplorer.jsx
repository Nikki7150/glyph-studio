import { characterCoverageMap } from "../../lib/characterCoverage";
import useCharacterExplorerStore from '../../store/characterExploreStore';
import './CharacterExplorer.css';

export default function CharacterExplorer() {
    const selectedCharacter = useCharacterExplorerStore((state) => state.selectedCharacter);
    const setSelectedCharacter = useCharacterExplorerStore((state) => state.setSelectedCharacter);

    return(
        <div className='character-explorer'>
            <h2>Character Explorer</h2>
            {/* render one tile per character in characterCoverageMap */}
            {Object.keys(characterCoverageMap).map((character) => (
                <div
                    key={character}
                    className={`character-tile ${selectedCharacter === character ? 'selected' : ''}`}
                    onClick={() => setSelectedCharacter(character)}
                >
                    {character}
                </div>
            ))}
        </div>
    );
}

export function CharacterExplorerPanel() {
    const selectedCharacter = useCharacterExplorerStore((state) => state.selectedCharacter);

    return(
        <div className="character-explorer-panel">
            <h3>Character Details</h3>
            {/* show selectedCharacter and its coverage, e.g. characterCoverageMap[selectedCharacter] */}
            {selectedCharacter && (
                <div>
                    <p>Selected Character: {selectedCharacter}</p>
                    <p>Coverage: {characterCoverageMap[selectedCharacter]?.toFixed(2)}%</p>
                </div>
            )}
        </div>
    );
}
