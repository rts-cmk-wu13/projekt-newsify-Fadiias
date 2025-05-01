// Newsify/src/components/footer.js
export function renderFooter(activePage = "home") {
    return `
      <nav class="footer-nav">
        <a class="${activePage === 'home' ? 'active' : ''}" href="#home">
          <i class="fa-solid fa-house"></i><span>Home</span>
        </a>
        <a class="${activePage === 'archive' ? 'active' : ''}" href="#archive">
          <i class="fa-regular fa-bookmark"></i><span>Archive</span>
        </a>
        <a class="${activePage === 'popular' ? 'active' : ''}" href="#popular">
          <i class="fa-regular fa-star"></i><span>Popular</span>
        </a>
        <a class="${activePage === 'setting' ? 'active' : ''}" href="#setting">
          <i class="fa-solid fa-gear"></i><span>Setting</span>
        </a>
        <a class="${activePage === 'auth' ? 'active' : ''}" href="#auth">
          <i class="fa-solid fa-user"></i><span>Login</span>
        </a>
      </nav>
    `;
  }