import { characterCoverageMap } from "../../lib/characterCoverage";
import useCharacterExplorerStore from '../../store/characterExplorerStore';
import './CharacterExplorer.css';
import { useNavigate } from 'react-router-dom';
import { getNearestCoverageNeighbor } from "../../lib/characterCoverage";

export default function CharacterExplorer() {
    const selectedCharacter = useCharacterExplorerStore((state) => state.selectedCharacter);
    const setSelectedCharacter = useCharacterExplorerStore((state) => state.setSelectedCharacter);

    return(
        <div className='character-explorer'>
            <h2 className='character-explorer-heading text-xl font-bold'>Character Explorer</h2>
            <div className='divider'></div>
            <div className="character-explorer-grid">
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
        </div>
    );
}

export function CharacterExplorerPanel() {
    const selectedCharacter = useCharacterExplorerStore((state) => state.selectedCharacter);
    const setSelectedCharacter = useCharacterExplorerStore((state) => state.setSelectedCharacter);
    const navigate = useNavigate();

    return(
        <div className="character-explorer-panel">
            <button onClick={() => navigate('/')}>Back</button>
            <h3>Character Details</h3>
            {selectedCharacter && (
                <div>
                    <p>Selected Character: {selectedCharacter}</p>
                    <p>Coverage: {characterCoverageMap[selectedCharacter]?.toFixed(2)}%</p>
                    <p>Nearest Neighbors:</p>
                    {getNearestCoverageNeighbor(selectedCharacter).map((candidate) => (
                        <p 
                            key={candidate.character}
                            className="nearest-neighbor"
                            onClick={() => setSelectedCharacter(candidate.character)}
                        >
                                {candidate.character} - {candidate.coverage.toFixed(2)}% (Distance: {candidate.distance.toFixed(2)})
                        </p>
                    ))}
                </div>
            )}
        </div>
    );
}
