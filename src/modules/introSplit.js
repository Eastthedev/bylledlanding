export function setupIntroSplit() {
  const introTextContainer = document.querySelector('.index-intro-text');
  if (!introTextContainer) return;

  const rawLines = [
    "LiveLabs [est. 2024] is a product studio focused on turning bold ideas",
    "into scalable digital products. We partner with founders, operators, and",
    "ambitious teams to design, build, and launch solutions that solve real",
    "problems across Nigeria and Africa.",
    "*",
    "From concept to execution, we create products that are human-centered,",
    "market-ready, and built to drive meaningful impact. Whether incubating",
    "internal ventures or collaborating with visionary partners, LiveLabs exists",
    "to transform opportunities into products people actually use."
  ];

  // Look for existing .index-intro-paragraph or create it
  let paragraph = introTextContainer.querySelector('.index-intro-paragraph');
  if (!paragraph) {
    paragraph = document.createElement('div');
    paragraph.className = 'index-intro-paragraph';
    introTextContainer.appendChild(paragraph);
  }

  paragraph.innerHTML = '';

  rawLines.forEach((lineText) => {
    const lineEl = document.createElement('div');
    lineEl.className = 'index-intro-line';

    if (lineText === '*') {
      const iEl = document.createElement('i');
      lineEl.appendChild(iEl);
      paragraph.appendChild(lineEl);
      return;
    }

    const words = lineText.split(' ');
    words.forEach((wordText, wIdx) => {
      const wordEl = document.createElement('div');
      wordEl.className = 'index-intro-word';

      const chars = wordText.split('');
      chars.forEach((char) => {
        const charEl = document.createElement('div');
        charEl.className = 'index-intro-char';
        charEl.textContent = char;
        wordEl.appendChild(charEl);
      });

      lineEl.appendChild(wordEl);
      if (wIdx < words.length - 1) {
        // Space
        const spaceEl = document.createElement('div');
        spaceEl.className = 'index-intro-char';
        spaceEl.innerHTML = '&nbsp;';
        lineEl.appendChild(spaceEl);
      }
    });

    paragraph.appendChild(lineEl);
  });
}
