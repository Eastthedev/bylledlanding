function lerp(start, end, factor, delta) {
  const s = 1 - Math.exp(-factor * delta);
  return start + (end - start) * s;
}

function modWrap(val, max) {
  let res = val % max;
  if (Math.abs(res) > max / 2) {
    res = res > 0 ? res - max : res + max;
  }
  return res;
}

export class CompaniesSlider {
  constructor(container) {
    this.container = container;
    this.wrapper = container.querySelector('[data-slider]');
    if (!this.wrapper) return;

    this.items = [...this.wrapper.querySelectorAll('li')];
    this.figures = [...this.wrapper.querySelectorAll('figure')];
    this.itemCount = this.items.length;

    this.current = 0;
    this.target = 0;
    this.speed = 0;
    this.isDragging = false;
    this.dragStartX = 0;
    this.dragStartTarget = 0;
    this.prevTime = performance.now();
    this.deltaTime = 0;
    this.currentSlide = 0;

    this.bindEvents();
    this.update = this.update.bind(this);
    requestAnimationFrame(this.update);
  }

  bindEvents() {
    this.wrapper.style.cursor = 'grab';

    const onMouseDown = (e) => {
      this.isDragging = true;
      this.dragStartX = e.clientX;
      this.dragStartTarget = this.target;
      this.wrapper.style.cursor = 'grabbing';
    };

    const onMouseMove = (e) => {
      if (!this.isDragging) return;
      const dx = e.clientX - this.dragStartX;
      this.target = this.dragStartTarget + dx * 0.005;
      this.speed += (e.movementX || 0) * 0.01;
    };

    const onMouseUp = () => {
      if (!this.isDragging) return;
      this.isDragging = false;
      this.wrapper.style.cursor = 'grab';
      this.target = Math.round(this.target);
    };

    this.wrapper.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Touch
    let touchStartX = 0;
    let touchStartTarget = 0;
    this.wrapper.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartTarget = this.target;
      this.isDragging = true;
    }, { passive: true });

    this.wrapper.addEventListener('touchmove', (e) => {
      if (!this.isDragging) return;
      const dx = e.touches[0].clientX - touchStartX;
      this.target = touchStartTarget + dx * 0.005;
    }, { passive: true });

    this.wrapper.addEventListener('touchend', () => {
      this.isDragging = false;
      this.target = Math.round(this.target);
    });

    // Wheel over companies section
    this.container.addEventListener('wheel', (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
        this.target -= e.deltaX * 0.002;
      }
    }, { passive: false });
  }

  update() {
    const now = performance.now();
    this.deltaTime = Math.min((now - this.prevTime) / 1000, 0.1);
    this.prevTime = now;

    if (!this.isDragging) {
      const diff = Math.round(this.target) - this.target;
      this.target += diff * 0.1;
    }

    this.current = lerp(this.current, this.target, 3.3, this.deltaTime);
    this.speed *= 0.85;

    // Active slide index
    const activeIdx = ((Math.round(-this.current) % this.itemCount) + this.itemCount) % this.itemCount;
    if (activeIdx !== this.currentSlide) {
      this.items[this.currentSlide]?.classList.remove('active');
      this.items[activeIdx]?.classList.add('active');
      this.currentSlide = activeIdx;
    }

    // 3D placement of each figure
    const itemWidth = this.items[0]?.getBoundingClientRect().width || 300;
    this.items.forEach((item, index) => {
      const s = this.current + index;
      const wrapped = modWrap(s, this.itemCount);
      const px = (wrapped - index) * itemWidth;
      item.style.transform = `translateX(${px}px)`;

      const fig = this.figures[index];
      if (fig) {
        const p = wrapped;
        const rotY = Math.sin(p * -0.3) * 90;
        const transX = Math.sin(p * 0.75) * 5;
        const scale = Math.cos(p * 0.25) * 1;
        fig.style.transform = `rotateY(${rotY}deg) translateX(${transX}rem) scale(${scale})`;
      }
    });

    requestAnimationFrame(this.update);
  }
}
