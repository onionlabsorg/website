/*
 * Vanilla JavaScript animation for Onion Labs landing page.
 *
 * Creates a full‑screen canvas with subtle concentric rings and
 * floating building blocks. Blocks are loaded from an embedded
 * SVG (building blocks) and drift across the screen from all
 * edges with slight rotation to evoke a playful, modular feel.
 */

// Removed unused base64 data URI to keep bundle lean and avoid confusion.

// Wait for the DOM to be ready before running the animation logic.
window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('bg');
  const ctx = canvas.getContext('2d');
  let w = 0;
  let h = 0;
  let t = 0;
  let raf;

  // Load the bricks image from our assets folder instead of
  // embedding a base64 string. If you replace this file, update
  // the path accordingly.
  const blockImg = new Image();
  blockImg.src = './assets/bricks.svg';

  // Helper to generate a random value in a range
  const rand = (a, b) => a + Math.random() * (b - a);

  // Spawn a block at a random edge with random velocity and rotation.
  function spawnBlock() {
    const side = Math.floor(Math.random() * 4);
    const baseSpeed = rand(40, 100) / 60; // base pixel speed per frame
    const scale = rand(0.6, 1.3);
    let x, y, vx, vy, angle;
    switch (side) {
      case 0: // left
        x = -50;
        y = rand(0, h);
        vx = baseSpeed;
        vy = rand(-0.3, 0.3);
        angle = 0;
        break;
      case 1: // top
        x = rand(0, w);
        y = -50;
        vx = rand(-0.3, 0.3);
        vy = baseSpeed;
        angle = Math.PI / 2;
        break;
      case 2: // right
        x = w + 50;
        y = rand(0, h);
        vx = -baseSpeed;
        vy = rand(-0.3, 0.3);
        angle = Math.PI;
        break;
      default: // bottom
        x = rand(0, w);
        y = h + 50;
        vx = rand(-0.3, 0.3);
        vy = -baseSpeed;
        angle = -Math.PI / 2;
        break;
    }
    return {
      x,
      y,
      vx,
      vy,
      angle,
      spin: rand(-0.02, 0.02),
      scale,
    };
  }

  // Initialize a fleet of blocks
  const blocks = Array.from({ length: 7 }, spawnBlock);

  // Resize canvas to fill the window
  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  // Main draw loop
  function draw() {
    t += 0.008;
    ctx.clearRect(0, 0, w, h);

    // Draw subtle concentric rings around a focal point
    const cx = w * 0.5;
    const cy = h * 0.42;
    for (let r = 60; r < Math.min(w, h) / 1.2; r += 40) {
      ctx.beginPath();
      ctx.arc(cx, cy, r + Math.sin(t * 1.5 + r) * 2, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(180, 180, 190, ${0.12 + ((r / 40) % 5) * 0.02})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Update and draw each block
    blocks.forEach((b) => {
      b.x += b.vx;
      b.y += b.vy;
      b.angle += b.spin;
      // If a block goes off screen, respawn it on a random edge
      if (b.x < -80 || b.x > w + 80 || b.y < -80 || b.y > h + 80) {
        Object.assign(b, spawnBlock());
      }
      if (blockImg.complete) {
        ctx.save();
        // Draw blocks with reduced opacity for a softer appearance
        ctx.globalAlpha = 0.85;
        ctx.translate(b.x, b.y);
        ctx.rotate(b.angle);
        const size = 50 * b.scale;
        ctx.drawImage(blockImg, -size / 2, -size / 2, size, size);
        ctx.restore();
      }
    });

    raf = requestAnimationFrame(draw);
  }
  draw();

  // Cleanup when leaving the page (not strictly necessary for static site)
  window.addEventListener('beforeunload', () => {
    cancelAnimationFrame(raf);
  });
});