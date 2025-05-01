export function renderHeader() {
    const header = document.createElement('header');
    const h1 = document.createElement('h1');
    h1.textContent = 'Newsify';
    header.appendChild(h1);
    return header;
  }
  