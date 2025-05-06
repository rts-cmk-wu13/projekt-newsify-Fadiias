// Newsify/src/components/main.js
import { CATEGORIES } from '/src/categories.js';
import { renderIntro } from './intro.js';



export function renderMain(view = 'home') {
  switch (view) {
    case 'home':
      return `
        <section class="home-view">
          <div id="news-list"></div>
        </section>
      `;
    case 'setting':
      const enabledCategories = JSON.parse(localStorage.getItem('enabledCategories') || '[]');
      return `
      <section class="settings-view">
  <h2>Settings</h2>
  <h3>Categories</h3>
  <div class="settings">
    ${CATEGORIES.map(category => `
      <div class="form-group">
      <img src="/img/newsify_logo_1.png" alt="Newsify Logo" class="heartbeat" style="height: 38px;" />
        <label>${category.label.toUpperCase()}</label>
        <label class="switch">
          <input type="checkbox" data-category="${category.label.toLowerCase()}" ${enabledCategories.includes(category.label.toLowerCase()) ? 'checked' : ''}>
          <span class="slider round"></span>
        </label>
      </div>
    `).join('')}
  </div>
  <button class="dark-mode-toggle">Toggle dark mode</button>
  <p class="version">Version 4.8.15.16.23.42</p>
</section>

      `;
    case 'archive':
      return `
        <section class="archive-view">
          <h2>Archive</h2>
          <div id="news-list"></div>
        </section>
      `;
    case 'auth':
      return `
        <section class="auth-view">
          <p>Welcome! Let’s dive into your account!</p>
         <div class="auth-buttons">
           <button type="submit">Continue with Facebook</button>
            <button type="submit">Continue with Google</button>
          </div>
        <div class="or" >  <hr><p>or</p> <hr></div>
         
           <button type="submit" style="margin-top: 4em">Sign in with password</button>
          <p> Don’t have an account? <span style="color:rgba(77, 134, 31, 1)">Sign up</span></p>
        </section>
      `;
    case 'popular':
      return `
        <section class="popular-view">
          <h2>Popular</h2>
          <div id="news-list"></div>
        </section>
      `;
    default:
      return `<h2>Page not found</h2>`;
  }
}
if (!localStorage.getItem('onboardingCompleted')) {
  renderIntro(document.getElementById('main'));
} else {
  loadPage(); // Your normal page loading
}

function loadPage() {
  // Implement your page loading logic here
  console.log("Page loaded");
}