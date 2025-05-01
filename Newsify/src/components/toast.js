// src/components/toast.js

export function showToast(message = 'Action complete') {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
  
    // Optional basic styles (can be moved to SCSS)
    Object.assign(toast.style, {
      position: 'fixed',
      bottom: '2rem',
      left: '50%',
      transform: 'translateX(-50%)',
      background: '#333',
      color: '#fff',
      padding: '0.75rem 1.25rem',
      borderRadius: '8px',
      zIndex: 1000,
      opacity: 0,
      transition: 'opacity 0.3s ease',
    });
  
    document.body.appendChild(toast);
  
    // Fade in
    requestAnimationFrame(() => {
      toast.style.opacity = 1;
    });
  
    // Remove after 2.5s
    setTimeout(() => {
      toast.style.opacity = 0;
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  }
  