// Tangled threads (the brain carrying the load) converge through one node
// and leave as calm parallel lines (the computer holding it). Seeded, so
// every render is identical.
function drawThreads(o) {
  const { w, h, x0, x1, nodeX, nodeY, spread, n = 26, seed = 7, top = 60, bot = h - 60, fade = 0.03 } = o;
  let s = seed; const r = () => (s = (s * 16807) % 2147483647) / 2147483647;
  const c = document.getElementById('c').getContext('2d');
  for (let i = 0; i < n; i++) {
    const hue = i % 3 === 0 ? '255,62,165' : i % 3 === 1 ? '53,242,255' : '155,140,255';
    const outY = nodeY - spread / 2 + (i / (n - 1)) * spread;
    c.beginPath();
    let x = x0 + r() * 50, y = top + r() * (bot - top);
    c.moveTo(x, y);
    const hops = 5, step = (nodeX - 120 - x0) / hops;
    for (let k = 0; k < hops; k++) {
      const nx = x + step * (0.8 + r() * 0.4), ny = top + r() * (bot - top);
      c.bezierCurveTo(x + r() * step * 2, top + r() * (bot - top), nx - r() * step * 2, top + r() * (bot - top), nx, ny); x = nx; y = ny;
    }
    c.bezierCurveTo(x + 80, y, nodeX - 80, nodeY + (outY - nodeY) * .15, nodeX, nodeY + (outY - nodeY) * .1);
    c.bezierCurveTo(nodeX + 50, nodeY, nodeX + 35, outY, nodeX + 110, outY);
    c.lineTo(x1, outY);
    const g = c.createLinearGradient(0, 0, w, 0), p = nodeX / w;
    g.addColorStop(0, `rgba(${hue},.55)`); g.addColorStop(p * .8, `rgba(${hue},.35)`);
    g.addColorStop(p, `rgba(${hue},.55)`); g.addColorStop(Math.min(p + .06, 1), `rgba(${hue},.12)`); g.addColorStop(1, `rgba(${hue},${fade})`);
    c.strokeStyle = g; c.lineWidth = 1.4; c.shadowColor = `rgba(${hue},.8)`; c.shadowBlur = 8; c.stroke();
  }
  c.shadowBlur = 40; c.shadowColor = 'rgba(53,242,255,1)';
  c.fillStyle = '#35f2ff'; c.beginPath(); c.arc(nodeX, nodeY, 9, 0, 7); c.fill();
  c.shadowBlur = 0; c.strokeStyle = 'rgba(53,242,255,.6)'; c.lineWidth = 1.5;
  [22, 38].forEach((rad, i) => { c.beginPath(); c.arc(nodeX, nodeY, rad, i ? .4 : 0, i ? 5.2 : 6.3); c.stroke(); });
}
