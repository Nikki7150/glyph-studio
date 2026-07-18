import { characterCoverageMap } from "../../lib/characterCoverage";
import useCharacterExplorerStore from '../../store/characterExplorerStore';
import './CharacterExplorer.css';
import { useNavigate } from 'react-router-dom';
import { getNearestCoverageNeighbor, getCharacterTags, getCharacterCategory } from "../../lib/characterCoverage";
import { useState } from 'react';
import { FaSlidersH } from 'react-icons/fa';

export default function CharacterExplorer() {
    const selectedCharacter = useCharacterExplorerStore((state) => state.selectedCharacter);
    const setSelectedCharacter = useCharacterExplorerStore((state) => state.setSelectedCharacter);
    const [ activeFilter, setActiveFilter ] = useState(null);
    const [ isFilterOpen, setIsFilterOpen ] = useState(false);

    const isVisible = (character) => {
        if (!activeFilter) return true;
        if (activeFilter.type === 'category') {
            return getCharacterCategory(character) === activeFilter.value;
        }
        if (activeFilter.type === 'tag') {
            return getCharacterTags(character).includes(activeFilter.value);
        }
    };

    return(
        <div className='character-explorer'>
            <div className="character-nav">
                <h2 className='character-explorer-heading text-xl font-bold'>Character Explorer</h2>
                <button className="filter-button" onClick={() => setIsFilterOpen(!isFilterOpen)}>
                    Filters <FaSlidersH />
                </button>
                {isFilterOpen && (
                    <div className="filter-panel">
                        <div className="category-tag-filter">
                            <p>Category Filters</p>
                            <div className="category-tags">
                                <button className="tag" onClick={() => setActiveFilter({ type: 'category', value: 'Uppercase Letter' })}>Uppercase Letter</button>
                                <button className="tag" onClick={() => setActiveFilter({ type: 'category', value: 'Lowercase Letter' })}>Lowercase Letter</button>
                                <button className="tag" onClick={() => setActiveFilter({ type: 'category', value: 'Digit' })}>Digit</button>
                                <button className="tag" onClick={() => setActiveFilter({ type: 'category', value: 'Symbol' })}>Symbol</button>
                            </div>
                        </div>
                        <div className="character-tag-filter">
                            <p>Character Tags</p>
                            <div className="character-tags">
                                <button className="tag" onClick={() => setActiveFilter({ type: 'tag', value: 'darkest tones' })}>darkest tones</button>
                                <button className="tag" onClick={() => setActiveFilter({ type: 'tag', value: 'brightest highlights' })}>brightest highlights</button>
                                <button className="tag" onClick={() => setActiveFilter({ type: 'tag', value: 'ink concentrated low' })}>ink concentrated low</button>
                                <button className="tag" onClick={() => setActiveFilter({ type: 'tag', value: 'ink concentrated high' })}>ink concentrated high</button>
                                <button className="tag" onClick={() => setActiveFilter({ type: 'tag', value: 'midtones for transition' })}>midtones for transition</button>
                            </div>
                        </div>
                        <button className="clear-filter" onClick={() => setActiveFilter(null)}>
                            Clear Filters
                        </button>
                    </div>
                )}
            </div>
            <div className='divider'></div>
            <div className="character-explorer-grid">
                {Object.keys(characterCoverageMap).map((character) => {
                    if (!isVisible(character)) return null;
                    return (
                        <div
                            key={character}
                            className={`character-tile ${selectedCharacter === character ? 'selected' : ''}`}
                            onClick={() => setSelectedCharacter(character)}
                        >
                            {character}
                            <p className="character-category">{getCharacterCategory(character)}</p>
                        </div>
                    );
                })}
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
            <h3 className="character-panel-heading text-xl font-bold">Character Details</h3>
            {selectedCharacter && (
                <div className="character-details">
                    <p className="char-name">Selected Character: {selectedCharacter}</p>
                    <p>Category: {getCharacterCategory(selectedCharacter)}</p>
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
                    <p>Character Tags:</p>
                    {getCharacterTags(selectedCharacter).map((tag, index) => (
                        <span 
                            key={index} 
                            className="character-tag"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}
