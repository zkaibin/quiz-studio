// Packed real-map scene format shared by the Node build script and the browser loader.
// File layout (then gzipped as data/city-maps/<id>.bin.gz):
//   [u32 magic 'CMAP'][u32 version=1][u32 metaBytes][utf8 JSON meta][raw ArrayBuffers…]
// Meta lists each mesh's typed-array byte ranges into the trailing buffer blob.
// Coordinates stay metres around the city centre (+x east, +z south, +y up).

export const PACK_MAGIC = 0x50414d43; // 'CMAP' little-endian
export const PACK_VERSION = 1;
export const PACK_FORMAT = 'city-driving-osm-bin-v1';

export function packSceneBinary(built, city, radius) {
  const chunks = [];
  let offset = 0;
  const push = (typed) => {
    const bytes = new Uint8Array(typed.buffer, typed.byteOffset, typed.byteLength);
    const start = offset;
    chunks.push(bytes);
    offset += bytes.byteLength;
    // Keep 4-byte alignment for typed views
    const pad = (4 - (offset % 4)) % 4;
    if (pad) {
      chunks.push(new Uint8Array(pad));
      offset += pad;
    }
    return { start, length: bytes.byteLength };
  };

  const meshMeta = built.meshes.map((m) => {
    const entry = {
      name: m.name,
      color: m.color,
      vertexColors: !!m.vertexColors,
      roughness: m.roughness,
      metallic: m.metallic,
      pos: push(new Float32Array(m.pos)),
      nor: push(new Float32Array(m.nor)),
      idx: push(new Uint32Array(m.idx))
    };
    if (m.vertexColors) entry.col = push(new Float32Array(m.col));
    return entry;
  });

  const meta = {
    format: PACK_FORMAT,
    version: PACK_VERSION,
    attribution: '© OpenStreetMap contributors (ODbL)',
    city: city.id,
    name: city.name,
    center: { lat: city.lat, lon: city.lon },
    radius,
    half: built.extras.half,
    meshes: meshMeta,
    extras: {
      footprints: built.extras.footprints,
      roads: built.extras.roads
    }
  };

  const metaBytes = new TextEncoder().encode(JSON.stringify(meta));
  const header = new ArrayBuffer(12);
  const hv = new DataView(header);
  hv.setUint32(0, PACK_MAGIC, true);
  hv.setUint32(4, PACK_VERSION, true);
  hv.setUint32(8, metaBytes.byteLength, true);

  const total = 12 + metaBytes.byteLength + offset;
  const out = new Uint8Array(total);
  out.set(new Uint8Array(header), 0);
  out.set(metaBytes, 12);
  let at = 12 + metaBytes.byteLength;
  for (const c of chunks) {
    out.set(c, at);
    at += c.byteLength;
  }
  return out;
}

function sliceView(blob, range, TypedArray) {
  const { start, length } = range;
  const slice = blob.buffer.slice(blob.byteOffset + start, blob.byteOffset + start + length);
  return new TypedArray(slice);
}

/** Unpack a decompressed CMAP buffer into { meshes, extras, city, … }. */
export function unpackSceneBinary(buffer) {
  const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
  const hv = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const magic = hv.getUint32(0, true);
  const version = hv.getUint32(4, true);
  const metaLen = hv.getUint32(8, true);
  if (magic !== PACK_MAGIC) throw new Error('Not a city map pack');
  if (version !== PACK_VERSION) throw new Error(`Unsupported city map pack version ${version}`);
  const metaJson = new TextDecoder().decode(bytes.subarray(12, 12 + metaLen));
  const meta = JSON.parse(metaJson);
  const blob = bytes.subarray(12 + metaLen);
  const meshes = meta.meshes.map((m) => ({
    name: m.name,
    color: m.color,
    vertexColors: !!m.vertexColors,
    roughness: m.roughness,
    metallic: m.metallic,
    pos: sliceView(blob, m.pos, Float32Array),
    nor: sliceView(blob, m.nor, Float32Array),
    col: m.col ? sliceView(blob, m.col, Float32Array) : null,
    idx: sliceView(blob, m.idx, Uint32Array)
  }));
  return {
    city: meta.city,
    name: meta.name,
    center: meta.center,
    radius: meta.radius,
    half: meta.half,
    attribution: meta.attribution,
    meshes,
    extras: {
      city: meta.city,
      center: meta.center,
      radius: meta.radius,
      half: meta.half,
      footprints: meta.extras.footprints,
      roads: meta.extras.roads
    }
  };
}

/** Browser/Node-friendly gzip inflate for ArrayBuffer / Uint8Array. */
export async function gunzipBytes(bytes) {
  if (typeof DecompressionStream === 'function') {
    const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'));
    return new Uint8Array(await new Response(stream).arrayBuffer());
  }
  // Node fallback
  const { gunzipSync } = await import('node:zlib');
  return gunzipSync(bytes);
}
