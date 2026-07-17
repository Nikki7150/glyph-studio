function calculateCoverage(character) {
    const canvas = document.createElement('canvas');
    canvas.width = 40;
    canvas.height = 40;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = "20px Monospace";
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
}, {});