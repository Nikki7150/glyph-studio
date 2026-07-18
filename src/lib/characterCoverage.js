function calculateCoverage(character) {
    const canvas = document.createElement('canvas');
    canvas.width = 40;
    canvas.height = 40;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = "40px Monospace";
    ctx.fillStyle = "black";
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(character, canvas.width / 2, canvas.height / 2);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const {width, height, data} = imageData;
    let inkPixels = 0;
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const index = (y * width + x) * 4;
            const r = data[index];
            const g = data[index + 1];
            const b = data[index + 2];
            let brightnessPixel = 0.299 * r + 0.587 * g + 0.114 * b;
            if (brightnessPixel < 128) {
                inkPixels++;
            }
        }
    }
    return (inkPixels / (canvas.width * canvas.height)) * 100;
}

const characters = [];
for(let code = 33; code <= 126; code++) {
    characters.push(String.fromCharCode(code));
}

// acc = accumulator
// for every run, mutate acc by adding new key - acc[character] = calculateCoverage(character)
// then return so next run get updated variable
// after all 94 done, reduce return the entire lookup map
export const characterCoverageMap = characters.reduce((acc, character) => {
    acc[character] = calculateCoverage(character);
    return acc;
    const sorted = Object.entries(characterCoverageMap).sort((a, b) => a[1] - b[1]);
    console.log(sorted);
}, {});

export function getNearestCoverageNeighbor(selectedCharacter, count = 3) {
    const target = characterCoverageMap[selectedCharacter];

    const candidates = Object.entries(characterCoverageMap)
        .filter(([character]) => character !== selectedCharacter)
        .map(([character, coverage]) => ({ character, coverage, distance: Math.abs(coverage - target) }))
        .sort((a, b) => a.distance - b.distance)
        .slice(0, count);
    return candidates;
}

function calculateDensitySplit(character) {
    const canvas = document.createElement('canvas');
    canvas.width = 40;
    canvas.height = 40;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = "40px Monospace";
    ctx.fillStyle = "black";
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(character, canvas.width / 2, canvas.height / 2);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const {width, height, data} = imageData;
    let topInk = 0, bottomInk = 0, rightInk = 0, leftInk = 0;
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const index = (y * width + x) * 4;
            const r = data[index];
            const g = data[index + 1];
            const b = data[index + 2];
            let brightness = 0.299 * r + 0.587 * g + 0.114 * b;
            const isInk = brightness < 128;
            if (isInk) {
                if (y < height / 2) {
                    topInk++;
                } else {
                    bottomInk++;
                }
                if (x < width / 2) {
                    leftInk++;
                } else {
                    rightInk++;
                }
            }
        }
    }
    const halfArea = (canvas.width * canvas.height) / 2;
    return { top: (topInk / halfArea) * 100, bottom: (bottomInk / halfArea) * 100, left: (leftInk / halfArea) * 100, right: (rightInk / halfArea) * 100 };
}

const characterDensityMap = characters.reduce((acc, character) => {
    acc[character] = calculateDensitySplit(character);
    return acc;
}, {});

const allCoverageValues = Object.values(characterCoverageMap);
const minCoverage = Math.min(...allCoverageValues);
const maxCoverage = Math.max(...allCoverageValues);
const range = maxCoverage - minCoverage;

const allDensityValues = Object.values(characterDensityMap).flatMap(density => [
    density.top,
    density.bottom,
    density.right,
    density.left
]);
const minDensity = Math.min(...allDensityValues);
const maxDensity = Math.max(...allDensityValues);
const densityRange = maxDensity - minDensity;

export function getCharacterTags(character) {
    const coverage = characterCoverageMap[character];
    const { top, bottom, left, right } = characterDensityMap[character];
    const tags = [];
    const normalizedPosition = (coverage - minCoverage) / range;
    const normalizedBottom = (bottom - minDensity) / densityRange;
    const normalizedTop = (top - minDensity) / densityRange;
    const normalizedRight = (right - minDensity) / densityRange;
    const normalizedLeft = (left - minDensity) / densityRange;
    
    if (normalizedPosition > 0.75) {
        tags.push('darkest tones');
    }
    if (normalizedBottom - normalizedTop > 0.1) {
        tags.push('ink concentrated low');
    }
    if (normalizedTop - normalizedBottom > 0.1) {
        tags.push('ink concentrated high');
    }
    if (normalizedPosition < 0.25) {
        tags.push('brightest highlights');
    }
    if (Math.abs(normalizedTop - normalizedBottom) < 0.1 && Math.abs(normalizedLeft - normalizedRight) < 0.1) {
        tags.push('midtones for transition');
    }
    return tags;
}

export function getCharacterCategory(character) {
    const characterCode = character.charCodeAt(0);
    if (characterCode >= 65 && characterCode <= 90) {
        return 'Uppercase Letter';
    }
    if (characterCode >= 97 && characterCode <= 122) {
        return 'Lowercase Letter';
    }
    if (characterCode >= 48 && characterCode <= 57) {
        return 'Digit';
    }
    return 'Symbol';
}