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