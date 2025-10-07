const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = 180;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

for (let i = 0; i < 50; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 1,
    dx: (Math.random() - 0.5) * 0.5,
    dy: (Math.random() - 0.5) * 0.5
  });
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'rgba(255,255,255,0.7)';
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
    p.x += p.dx;
    p.y += p.dy;
    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  });
  requestAnimationFrame(drawParticles);
}
drawParticles();

// Prompt generation logic
document.getElementById('generate').addEventListener('click', () => {
  const subject = document.getElementById('subject').value;
  const description = document.getElementById('description').value;
  const camera = document.getElementById('camera').value;
  const lens = document.getElementById('lens').value;
  const lighting = document.getElementById('lighting').value;
  const mood = document.getElementById('mood').value;
  const modifiers = document.getElementById('modifiers').value;

  const prompt = `${subject}, ${description}, shot on ${camera} with ${lens}, lighting: ${lighting}, mood: ${mood}, ${modifiers}`;

  document.getElementById('promptOutput').textContent = prompt;

  const json = {
    subject,
    description,
    camera,
    lens,
    lighting,
    mood,
    modifiers,
    fullPrompt: prompt
  };

  document.getElementById('jsonOutput').textContent = JSON.stringify(json, null, 2);
});

document.getElementById('copyPrompt').addEventListener('click', () => {
  navigator.clipboard.writeText(document.getElementById('promptOutput').textContent);
});

document.getElementById('copyJSON').addEventListener('click', () => {
  navigator.clipboard.writeText(document.getElementById('jsonOutput').textContent);
});

document.getElementById('downloadJSON').addEventListener('click', () => {
  const jsonContent = document.getElementById('jsonOutput').textContent;
  const blob = new Blob([jsonContent], { type: 'application/json' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'veo3_prompt.json';
  link.click();
});

document.getElementById('reset').addEventListener('click', () => {
  document.querySelectorAll('input, textarea').forEach(el => el.value = '');
  document.getElementById('promptOutput').textContent = '';
  document.getElementById('jsonOutput').textContent = '';
});