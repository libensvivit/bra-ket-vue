export const TAU = 2 * Math.PI;

/**
 * Stolen from https://stackoverflow.com/questions/36721830/convert-hsl-to-rgb-and-hex
 * Alternatively: d3.hsl
 */
export function hslToHex(hParam: number, sParam: number, lParam: number): string {
  let h = hParam;
  let s = sParam;
  let l = lParam;
  h /= 360;
  s /= 100;
  l /= 100;
  let r;
  let g;
  let b;
  if (s === 0) {
    r = l;
    g = l;
    b = l; // achromatic
  } else {
    const hue2rgb = (pParam: number, qParam: number, tParam: number): number => {
      const p = pParam;
      const q = qParam;
      let t = tParam;
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  const toHex = (x: number): string => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Generate HSL color from complex number
 * https://github.com/stared/quantum-game/blob/master/js/transition_heatmap.js
 */
export function colorComplex(re: number, im: number): string {
  const angleInDegrees = ((Math.atan2(im, re) * 360) / TAU + 360) % 360;
  const r = Math.sqrt(re * re + im * im); // for pure color it should be always 1
  return hslToHex(angleInDegrees, 100, 100 - 50 * r);
}

export function colorComplexPhaseToHue(re: number, im: number, saturation = 100, lightness = 50): string {
  const angleInDegrees = ((Math.atan2(im, re) * 360) / TAU + 360) % 360;
  return hslToHex(angleInDegrees, saturation, lightness);
}
/**
 * Convert angles to unicode arrow symbols
 * https://en.wikipedia.org/wiki/Template:Unicode_chart_Arrows
 * @param angle included in [0, 45, 90, 135, 180, 225, 270, 315]
 */
