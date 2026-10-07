export function setupIntroSplit() {
  const introTextContainer = document.querySelector('.index-intro-text');
  if (!introTextContainer) return;

  const rawLines = [
    "Bylled is a commerce and payments platform built for businesses that",
    "sell on every channel. We enable merchants, artisans, and service",
    "providers to create invoices, share secure payment links, and track",
    "every sale from a single dashboard.",
    "*",
    "Our platform meets customers on the channels they already use,",
    "including WhatsApp, so payment never depends on a website visit.",
    "Every transaction is recorded and its status updated automatically,",
    "giving businesses the clarity and control they need to manage",
    "their income with confidence."
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
