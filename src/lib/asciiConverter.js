function convertToAscii (imageData, options) {
  // imageData: pixel data already resized to target width/height
  const {width, height, data} = imageData;
  const rows = [];
  // options: { contrast, brightness, invert, characterSet }
  for (let y = 0; y < height; y++) {
    let row = '';
    for (let x = 0; x < width; x++) {
      const index = (y * width + x) * 4;
      const r = data[index];
      const g = data[index + 1];
      const b = data[index + 2];
      const a = data[index + 3];
      // Implementation for converting pixel to ASCII character
    }
    rows.push(row);
  }
  // returns: array of strings, one per row
  return rows;
}