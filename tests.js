const { gridToCanvas, canvasToGrid, rotatePoint, getEffectiveVertices, parseLuaTable, generateLuaOutput } = require('./vector.js');

let passed = 0;
let failed = 0;

function assert(condition, msg) {
  if (condition) {
    passed++;
  } else {
    failed++;
    console.error(`  FAIL: ${msg}`);
  }
}

function approxEqual(a, b, eps = 0.001) {
  return Math.abs(a - b) < eps;
}

function assertArrayApprox(actual, expected, msg) {
  if (actual.length !== expected.length) {
    failed++;
    console.error(`  FAIL: ${msg} — length ${actual.length} !== ${expected.length}`);
    return;
  }
  for (let i = 0; i < actual.length; i++) {
    if (!approxEqual(actual[i], expected[i])) {
      failed++;
      console.error(`  FAIL: ${msg} — index ${i}: ${actual[i]} !== ${expected[i]}`);
      return;
    }
  }
  passed++;
}

function suite(name, fn) {
  console.log(`\n${name}`);
  fn();
}

// ── gridToCanvas ──

suite('gridToCanvas', () => {
  const origin = 200, cell = 10;

  assert(
    gridToCanvas(0, 0, origin, origin, cell)[0] === 200 &&
    gridToCanvas(0, 0, origin, origin, cell)[1] === 200,
    'origin maps to center'
  );

  const [x, y] = gridToCanvas(3, -2, origin, origin, cell);
  assert(x === 230 && y === 180, 'positive x, negative y');

  const [x2, y2] = gridToCanvas(-5, 5, origin, origin, cell);
  assert(x2 === 150 && y2 === 250, 'negative x, positive y');
});

// ── canvasToGrid ──

suite('canvasToGrid', () => {
  const origin = 200, cell = 10, grid = 32;

  const [gx, gy] = canvasToGrid(200, 200, origin, origin, cell, grid);
  assert(gx === 0 && gy === 0, 'center pixel maps to origin');

  const [gx2, gy2] = canvasToGrid(234, 178, origin, origin, cell, grid);
  assert(gx2 === 3 && gy2 === -2, 'rounds to nearest grid point');

  // Clamping
  const [gx3, gy3] = canvasToGrid(9999, -9999, origin, origin, cell, grid);
  assert(gx3 === 16 && gy3 === -16, 'clamps to grid bounds');
});

// ── roundtrip ──

suite('gridToCanvas <-> canvasToGrid roundtrip', () => {
  const origin = 300, cell = 15, grid = 20;
  const points = [[0, 0], [5, -3], [-10, 10], [-7, 7]];
  for (const [gx, gy] of points) {
    const [cx, cy] = gridToCanvas(gx, gy, origin, origin, cell);
    const [gx2, gy2] = canvasToGrid(cx, cy, origin, origin, cell, grid);
    assert(gx === gx2 && gy === gy2, `roundtrip (${gx}, ${gy})`);
  }
});

// ── rotatePoint ──

suite('rotatePoint', () => {
  const [x0, y0] = rotatePoint(1, 0, 0);
  assertArrayApprox([x0, y0], [1, 0], '0 degrees is identity');

  const [x90, y90] = rotatePoint(1, 0, 90);
  assertArrayApprox([x90, y90], [0, 1], '90 degrees');

  const [x180, y180] = rotatePoint(1, 0, 180);
  assertArrayApprox([x180, y180], [-1, 0], '180 degrees');

  const [x270, y270] = rotatePoint(1, 0, 270);
  assertArrayApprox([x270, y270], [0, -1], '270 degrees');

  const [x360, y360] = rotatePoint(3, 4, 360);
  assertArrayApprox([x360, y360], [3, 4], '360 degrees returns to start');

  const [xn, yn] = rotatePoint(0, 5, 45);
  assertArrayApprox([xn, yn], [-5 * Math.sin(Math.PI / 4), 5 * Math.cos(Math.PI / 4)], '45 degrees on y-axis point');
});

// ── getEffectiveVertices ──

suite('getEffectiveVertices — no mirror', () => {
  const verts = [[1, 2], [3, 4]];
  const result = getEffectiveVertices(verts, false, false);
  assert(result.length === 2, 'returns same count');
  assert(result[0][0] === 1 && result[0][1] === 2, 'first vertex unchanged');
  assert(result[1][0] === 3 && result[1][1] === 4, 'second vertex unchanged');

  // Should be a copy, not same reference
  result[0][0] = 99;
  assert(verts[0][0] === 1, 'does not mutate original');
});

suite('getEffectiveVertices — empty', () => {
  const result = getEffectiveVertices([], false, false);
  assert(result.length === 0, 'empty in, empty out');

  const result2 = getEffectiveVertices([], true, true);
  assert(result2.length === 0, 'empty with mirrors');
});

suite('getEffectiveVertices — mirror X', () => {
  const verts = [[2, 3], [4, 5]];
  const result = getEffectiveVertices(verts, true, false);
  // Original + reversed mirror: [2,3], [4,5], [-4,5], [-2,3]
  assert(result.length === 4, 'doubles vertex count for off-axis points');
  assert(result[2][0] === -4 && result[2][1] === 5, 'mirrored x negated');
  assert(result[3][0] === -2 && result[3][1] === 3, 'mirrored x negated (second)');
});

suite('getEffectiveVertices — mirror X with point on axis', () => {
  // Point on Y axis (x=0) should be deduped
  const verts = [[0, -5], [3, 2]];
  const result = getEffectiveVertices(verts, true, false);
  // [0,-5], [3,2], [-3,2] — the mirror of [0,-5] is [0,-5] which dedupes
  assert(result.length === 3, 'dedupes point on Y axis');
});

suite('getEffectiveVertices — mirror Y', () => {
  const verts = [[2, 3], [4, 5]];
  const result = getEffectiveVertices(verts, false, true);
  assert(result.length === 4, 'doubles vertex count');
  assert(result[2][0] === 4 && result[2][1] === -5, 'mirrored y negated');
});

suite('getEffectiveVertices — both mirrors', () => {
  const verts = [[2, 3]];
  const result = getEffectiveVertices(verts, true, true);
  // Single point -> 4 quadrants: [2,3], [-2,3], [-2,-3], [2,-3]
  assert(result.length === 4, 'single point becomes 4');
  assert(result[0][0] === 2 && result[0][1] === 3, 'original');
  assert(result[1][0] === -2 && result[1][1] === 3, 'mirror X');
  assert(result[2][0] === -2 && result[2][1] === -3, 'mirror XY');
  assert(result[3][0] === 2 && result[3][1] === -3, 'mirror Y');
});

// ── parseLuaTable ──

suite('parseLuaTable', () => {
  const r1 = parseLuaTable('vertices = {\n  1, 2,\n  3, 4,\n}');
  assert(r1 !== null && r1.length === 2, 'standard format');
  assert(r1[0][0] === 1 && r1[0][1] === 2, 'first pair');
  assert(r1[1][0] === 3 && r1[1][1] === 4, 'second pair');
});

suite('parseLuaTable — negative and decimal', () => {
  const r = parseLuaTable('{ -3.5, 2.1, 0, -7 }');
  assert(r !== null && r.length === 2, 'two pairs');
  assert(r[0][0] === -3.5 && r[0][1] === 2.1, 'negative/decimal first pair');
  assert(r[1][0] === 0 && r[1][1] === -7, 'zero and negative');
});

suite('parseLuaTable — with comments', () => {
  const r = parseLuaTable('-- ship\nvertices = {\n  -- nose\n  0, -4,\n  3, 4,\n}');
  assert(r !== null && r.length === 2, 'ignores comments');
});

suite('parseLuaTable — invalid inputs', () => {
  assert(parseLuaTable('') === null, 'empty string');
  assert(parseLuaTable('{}') === null, 'empty table');
  assert(parseLuaTable('{ 1 }') === null, 'odd number of values');
  assert(parseLuaTable('hello world') === null, 'no numbers');
});

suite('parseLuaTable — bare numbers (no braces)', () => {
  const r = parseLuaTable('1, 2, 3, 4');
  assert(r !== null && r.length === 2, 'parses bare numbers');
});

// ── generateLuaOutput ──

suite('generateLuaOutput', () => {
  const lua = generateLuaOutput([[0, -4], [3, 4]], 1);
  assert(lua.includes('0, -4,'), 'contains first pair');
  assert(lua.includes('3, 4,'), 'contains second pair');
  assert(lua.startsWith('vertices = {'), 'starts with table');
  assert(lua.endsWith('}'), 'ends with brace');
});

suite('generateLuaOutput — scale factor', () => {
  const lua = generateLuaOutput([[2, 4]], 0.5);
  assert(lua.includes('1, 2,'), 'scale factor applied');
});

suite('generateLuaOutput — empty', () => {
  assert(generateLuaOutput([], 1) === '', 'empty vertices returns empty string');
});

// ── roundtrip: generate then parse ──

suite('generateLuaOutput -> parseLuaTable roundtrip', () => {
  const original = [[0, -4], [3, 2], [-3, 2]];
  const lua = generateLuaOutput(original, 1);
  const parsed = parseLuaTable(lua);
  assert(parsed !== null && parsed.length === original.length, 'same length');
  for (let i = 0; i < original.length; i++) {
    assert(parsed[i][0] === original[i][0] && parsed[i][1] === original[i][1],
      `roundtrip vertex ${i}`);
  }
});

// ── Summary ──

console.log(`\n${'='.repeat(40)}`);
console.log(`Results: ${passed} passed, ${failed} failed`);
console.log('='.repeat(40));
process.exit(failed > 0 ? 1 : 0);
