export default function convertToAscii (imageData, options) {
  // imageData: pixel data already resized to target width/height
  const {width, height, data} = imageData;
  const { contrast, brightness, invert, characterSet } = options;
  const rows = [];
  // options: { contrast, brightness, invert, characterSet }
  for (let y = 0; y < height; y++) {
    let row = '';
    for (let x = 0; x < width; x++) {
      const index = (y * width + x) * 4;
      const r = data[index];
      const g = data[index + 1];
      const b = data[index + 2];

      let brightnessPixel = 0.299 * r + 0.587 * g + 0.114 * b;
      // contrast 
      brightnessPixel = (brightnessPixel - 128) * contrast + 128;
      // brightness
      brightnessPixel += brightness;
      // clamp
      brightnessPixel = Math.max(0, Math.min(255, brightnessPixel));
      
      let charIndex = Math.floor((brightnessPixel / 255) * (characterSet.length - 1))
      
      if (invert) {
        charIndex = (characterSet.length - 1) - charIndex;
      }
      row += characterSet[charIndex];
    }
    rows.push(row);
  }
  // returns: array of strings, one per row
  return rows;
}