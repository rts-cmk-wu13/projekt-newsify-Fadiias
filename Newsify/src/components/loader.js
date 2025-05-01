// src/components/loader.js

export function addLoader(parent) {
    const loader = document.createElement('div');
    loader.className = 'loader';
    loader.textContent = 'Loading...';
    parent.appendChild(loader);
  }
  
  export function removeLoader() {
    const loader = document.querySelector('.loader');
    if (loader) loader.remove();
  }

  