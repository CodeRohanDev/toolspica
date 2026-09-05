// Standard color-blindness simulation matrices (Brettel/Vienot approximations),
// applied per-pixel in linear RGB space via canvas pixel data.
export const CVD_MATRICES = {
  protanopia: [0.567, 0.433, 0, 0.558, 0.442, 0, 0, 0.242, 0.758],
  deuteranopia: [0.625, 0.375, 0, 0.7, 0.3, 0, 0, 0.3, 0.7],
  tritanopia: [0.95, 0.05, 0, 0, 0.433, 0.567, 0, 0.475, 0.525],
} as const;

export type CvdType = keyof typeof CVD_MATRICES;

export function applyCvdMatrix(data: Uint8ClampedArray, type: CvdType) {
  const m = CVD_MATRICES[type];
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    data[i] = m[0] * r + m[1] * g + m[2] * b;
    data[i + 1] = m[3] * r + m[4] * g + m[5] * b;
    data[i + 2] = m[6] * r + m[7] * g + m[8] * b;
  }
}
