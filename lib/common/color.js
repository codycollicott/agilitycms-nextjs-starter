export function hexToRgb(hex) {
    
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
    return r + r + g + g + b + b;
  });

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;

}

export function rgbToCmyk(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  let k = 1 - Math.max(r, g, b);
  let c = k === 1 ? 0 : (1 - r - k) / (1 - k);
  let m = k === 1 ? 0 : (1 - g - k) / (1 - k);
  let y = k === 1 ? 0 : (1 - b - k) / (1 - k);

  // Return values as percentages (rounded)
  return {
    c: Math.round(c * 100),
    m: Math.round(m * 100),
    y: Math.round(y * 100),
    k: Math.round(k * 100)
  };
}
