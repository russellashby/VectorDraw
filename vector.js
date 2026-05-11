// Pure logic functions for the vector editor
// Shared between index.html and tests

function gridToCanvas(gx, gy, originX, originY, cellSize) {
  return [originX + gx * cellSize, originY + gy * cellSize];
}

function canvasToGrid(cx, cy, originX, originY, cellSize, gridSize) {
  const gx = Math.round((cx - originX) / cellSize);
  const gy = Math.round((cy - originY) / cellSize);
  const half = gridSize / 2;
  return [
    Math.max(-half, Math.min(half, gx)),
    Math.max(-half, Math.min(half, gy))
  ];
}

function rotatePoint(x, y, angleDeg) {
  const rad = angleDeg * Math.PI / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  return [x * cos - y * sin, x * sin + y * cos];
}

function getEffectiveVertices(vertices, mirrorX, mirrorY) {
  if (vertices.length === 0) return [];

  if (!mirrorX && !mirrorY) return vertices.map(([x, y]) => [x, y]);

  let result = [...vertices];

  if (mirrorX && !mirrorY) {
    const mirrored = vertices.slice().reverse().map(([x, y]) => [-x, y]);
    if (mirrored.length > 0 && mirrored[0][0] === result[result.length - 1][0] && mirrored[0][1] === result[result.length - 1][1]) {
      mirrored.shift();
    }
    if (mirrored.length > 0 && result[0][0] === mirrored[mirrored.length - 1][0] && result[0][1] === mirrored[mirrored.length - 1][1]) {
      mirrored.pop();
    }
    result = result.concat(mirrored);
  } else if (!mirrorX && mirrorY) {
    const mirrored = vertices.slice().reverse().map(([x, y]) => [x, -y]);
    if (mirrored.length > 0 && mirrored[0][0] === result[result.length - 1][0] && mirrored[0][1] === result[result.length - 1][1]) {
      mirrored.shift();
    }
    if (mirrored.length > 0 && result[0][0] === mirrored[mirrored.length - 1][0] && result[0][1] === mirrored[mirrored.length - 1][1]) {
      mirrored.pop();
    }
    result = result.concat(mirrored);
  } else {
    const mx = vertices.slice().reverse().map(([x, y]) => [-x, y]);
    const mxy = vertices.map(([x, y]) => [-x, -y]);
    const my = vertices.slice().reverse().map(([x, y]) => [x, -y]);

    function dedupJoin(base, addition) {
      let add = [...addition];
      if (add.length > 0 && add[0][0] === base[base.length - 1][0] && add[0][1] === base[base.length - 1][1]) {
        add.shift();
      }
      return base.concat(add);
    }
    result = dedupJoin(result, mx);
    result = dedupJoin(result, mxy);
    result = dedupJoin(result, my);
    if (result.length > 1 && result[0][0] === result[result.length - 1][0] && result[0][1] === result[result.length - 1][1]) {
      result.pop();
    }
  }

  return result;
}

function parseLuaTable(text) {
  const stripped = text.replace(/--[^\n]*/g, '');
  const match = stripped.match(/\{([^}]*)\}/);
  const numStr = match ? match[1] : stripped;
  const numbers = [];
  const numRegex = /-?\d+\.?\d*/g;
  let m;
  while ((m = numRegex.exec(numStr)) !== null) {
    numbers.push(parseFloat(m[0]));
  }
  if (numbers.length < 2 || numbers.length % 2 !== 0) return null;
  const pts = [];
  for (let i = 0; i < numbers.length; i += 2) {
    pts.push([numbers[i], numbers[i + 1]]);
  }
  return pts;
}

function generateLuaOutput(vertices, scaleFactor) {
  if (vertices.length === 0) return '';
  const scaled = vertices.map(([x, y]) => [
    Math.round(x * scaleFactor * 100) / 100,
    Math.round(y * scaleFactor * 100) / 100
  ]);
  let lua = 'vertices = {\n';
  for (const [x, y] of scaled) {
    lua += `  ${x}, ${y},\n`;
  }
  lua += '}';
  return lua;
}

function generateProjectJson(state) {
  const data = {
    version: 1,
    gridSize: state.gridSize,
    scaleFactor: state.scaleFactor,
    closed: !!state.closed,
    mirrorX: !!state.mirrorX,
    mirrorY: !!state.mirrorY,
    vertices: state.vertices.map(([x, y]) => [x, y])
  };
  return JSON.stringify(data, null, 2);
}

function parseProjectJson(text) {
  let obj;
  try {
    obj = JSON.parse(text);
  } catch (e) {
    return null;
  }
  if (!obj || !Array.isArray(obj.vertices)) return null;
  const pts = [];
  for (const p of obj.vertices) {
    if (!Array.isArray(p) || p.length < 2) return null;
    const x = Number(p[0]);
    const y = Number(p[1]);
    if (!isFinite(x) || !isFinite(y)) return null;
    pts.push([Math.round(x), Math.round(y)]);
  }
  return {
    vertices: pts,
    gridSize: Number.isFinite(obj.gridSize) ? obj.gridSize : null,
    scaleFactor: Number.isFinite(obj.scaleFactor) ? obj.scaleFactor : null,
    closed: !!obj.closed,
    mirrorX: !!obj.mirrorX,
    mirrorY: !!obj.mirrorY
  };
}

function translateVertices(vertices, dx, dy, gridSize) {
  const half = gridSize / 2;
  return vertices.map(([x, y]) => [
    Math.max(-half, Math.min(half, x + dx)),
    Math.max(-half, Math.min(half, y + dy))
  ]);
}

function clampRotation(value) {
  const n = parseInt(value);
  if (isNaN(n)) return 0;
  return Math.max(0, Math.min(360, n));
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { gridToCanvas, canvasToGrid, rotatePoint, getEffectiveVertices, parseLuaTable, generateLuaOutput, translateVertices, clampRotation, generateProjectJson, parseProjectJson };
}
