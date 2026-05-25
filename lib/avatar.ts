export type AvatarFormat = "png" | "svg";
export type AvatarVariant = "gradient" | "qr";

export type Gradient = {
  from: string;
  to: string;
  angle: number;
};

export type ParsedRequest = {
  seed: string;
  format: AvatarFormat;
  variant: AvatarVariant;
  size: number;
  rounded: number;
};

export const DEFAULT_SIZE = 180;
export const MIN_SIZE = 16;
export const MAX_SIZE = 1024;

export const QR_GRID = 10;
export const QR_DARK = "#000";
export const QR_LIGHT = "#fff";
const QR_FILL_THRESHOLD = 0.5;

const FNV_OFFSET = 0x811c9dc5;
const FNV_PRIME = 0x01000193;

export function hashSeed(seed: string): number {
  let hash = FNV_OFFSET;
  for (let i = 0; i < seed.length; i++) {
    hash ^= seed.charCodeAt(i);
    hash = Math.imul(hash, FNV_PRIME);
  }
  return hash >>> 0;
}

export function gradientFor(seed: string): Gradient {
  const h = hashSeed(seed);
  const hue1 = h % 360;
  const hueOffset = 30 + ((h >>> 8) % 121);
  const hue2 = (hue1 + hueOffset) % 360;
  const angle = [0, 45, 90, 135][(h >>> 16) & 0b11];
  return {
    from: `hsl(${hue1}, 70%, 55%)`,
    to: `hsl(${hue2}, 70%, 45%)`,
    angle,
  };
}

function mulberry32(seed: number): () => number {
  let s = seed >>> 0;
  return function () {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function qrPatternFor(seed: string): boolean[][] {
  const rng = mulberry32(hashSeed(seed));
  const grid: boolean[][] = [];
  for (let y = 0; y < QR_GRID; y++) {
    const row: boolean[] = [];
    for (let x = 0; x < QR_GRID; x++) {
      row.push(rng() < QR_FILL_THRESHOLD);
    }
    grid.push(row);
  }
  return grid;
}

function parseIntParam(
  value: string | null,
  fallback: number,
  min: number,
  max: number,
): number {
  if (value === null) return fallback;
  const n = Number(value);
  if (!Number.isFinite(n)) return fallback;
  return Math.max(min, Math.min(max, Math.floor(n)));
}

export function parseRequest(
  rawSegment: string,
  search: URLSearchParams,
): ParsedRequest {
  let decoded: string;
  try {
    decoded = decodeURIComponent(rawSegment);
  } catch {
    decoded = rawSegment;
  }

  let seed = decoded;
  let format: AvatarFormat = "png";
  if (seed.toLowerCase().endsWith(".svg")) {
    seed = seed.slice(0, -4);
    format = "svg";
  }

  const size = parseIntParam(
    search.get("size"),
    DEFAULT_SIZE,
    MIN_SIZE,
    MAX_SIZE,
  );
  const rounded = parseIntParam(
    search.get("rounded"),
    0,
    0,
    Math.floor(size / 2),
  );

  const variant: AvatarVariant =
    search.get("variant") === "qr" ? "qr" : "gradient";

  return { seed, format, variant, size, rounded };
}

export function buildSvg(
  size: number,
  rounded: number,
  gradient: Gradient,
): string {
  const a = (gradient.angle * Math.PI) / 180;
  const dx = Math.sin(a);
  const dy = -Math.cos(a);
  const x1 = (0.5 - dx / 2).toFixed(4);
  const y1 = (0.5 - dy / 2).toFixed(4);
  const x2 = (0.5 + dx / 2).toFixed(4);
  const y2 = (0.5 + dy / 2).toFixed(4);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><defs><linearGradient id="g" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"><stop offset="0%" stop-color="${gradient.from}"/><stop offset="100%" stop-color="${gradient.to}"/></linearGradient></defs><rect width="${size}" height="${size}" rx="${rounded}" ry="${rounded}" fill="url(#g)"/></svg>`;
}

export function buildQrSvg(
  size: number,
  rounded: number,
  cells: boolean[][],
): string {
  const cell = size / QR_GRID;
  const rects: string[] = [];
  for (let y = 0; y < QR_GRID; y++) {
    for (let x = 0; x < QR_GRID; x++) {
      if (!cells[y][x]) continue;
      const px = (x * cell).toFixed(4);
      const py = (y * cell).toFixed(4);
      const ps = cell.toFixed(4);
      rects.push(
        `<rect x="${px}" y="${py}" width="${ps}" height="${ps}" fill="${QR_DARK}"/>`,
      );
    }
  }
  const clipId = "qrclip";
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><defs><clipPath id="${clipId}"><rect width="${size}" height="${size}" rx="${rounded}" ry="${rounded}"/></clipPath></defs><g clip-path="url(#${clipId})"><rect width="${size}" height="${size}" fill="${QR_LIGHT}"/>${rects.join("")}</g></svg>`;
}
