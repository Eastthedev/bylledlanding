export function setupPixelTransition() {
  const pixelBg = document.querySelector('.pixelBg');
  if (!pixelBg) return;

  const colCount = window.innerWidth < 768 ? 14 : 50;
  const cellSize = window.innerWidth / colCount;
  const rowCount = Math.ceil(window.innerHeight / cellSize);

  pixelBg.innerHTML = '';

  for (let c = 0; c < colCount; c++) {
    const col = document.createElement('div');
    col.className = 'pixelBg-col';
    for (let r = 0; r < rowCount; r++) {
      const cell = document.createElement('div');
      cell.className = 'pixelBg-col-cell';
      cell.style.opacity = '0';
      cell.dataset.row = r;
      col.appendChild(cell);
    }
    pixelBg.appendChild(col);
  }

  function triggerTransition(targetUrl) {
    const cells = pixelBg.querySelectorAll('.pixelBg-col-cell');
    cells.forEach((cell) => {
      const row = parseInt(cell.dataset.row || 0, 10);
      const delay = row * 20; // 0.02s per row
      setTimeout(() => {
        cell.style.opacity = '1';
      }, delay);
    });

    setTimeout(() => {
      if (targetUrl) {
        window.location.href = targetUrl;
      }
    }, 1200);

    setTimeout(() => {
      cells.forEach((cell) => {
        cell.style.opacity = '0';
      });
    }, 1800);
  }

  document.querySelectorAll('a').forEach((link) => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto:') || link.target === '_blank') return;
    link.addEventListener('click', (e) => {
      e.preventDefault();
      triggerTransition(href);
    });
  });

  return { triggerTransition };
}
