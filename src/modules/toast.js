export function showToast(message = 'Email copied to clipboard') {
  let toaster = document.getElementById('sonner-toaster');
  if (!toaster) {
    toaster = document.createElement('div');
    toaster.id = 'sonner-toaster';
    toaster.setAttribute('data-sonner-toaster', 'true');
    toaster.setAttribute('data-theme', 'dark');
    toaster.setAttribute('data-x-position', 'right');
    toaster.setAttribute('data-y-position', 'bottom');
    toaster.style.cssText = `
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      z-index: 999999;
      pointer-events: none;
      display: flex;
      flex-direction: column;
      gap: 0.8rem;
    `;
    document.body.appendChild(toaster);
  }

  const toast = document.createElement('div');
  toast.setAttribute('data-sonner-toast', 'true');
  toast.style.cssText = `
    background: #1a1a1a;
    color: #fff;
    border: 1px solid #333;
    padding: 1.2rem 2rem;
    border-radius: 0.8rem;
    font-family: 'Inter', sans-serif;
    font-size: 1.4rem;
    box-shadow: 0 1rem 3rem rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    gap: 1rem;
    pointer-events: auto;
    opacity: 0;
    transform: translateY(1rem);
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  `;
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#aee000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
    <span>${message}</span>
  `;

  toaster.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
  });

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(0.5rem)';
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 2500);
}
