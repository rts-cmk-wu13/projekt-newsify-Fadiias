// Newsify/src/home.js
import './style.scss';
import { addLoader, removeLoader } from './components/loader.js';

import { renderIntro } from './components/intro.js';

import { renderHeader } from './components/header.js';
import { renderFooter } from './components/footer.js';
import { renderMain } from './components/main.js';
import { showToast } from './components/toast.js';
import { CATEGORIES } from '/src/categories.js';

// Ensure all paths and files exist in the project structure

// Use a single DOMContentLoaded listener
document.addEventListener("DOMContentLoaded", () => {
  addLoader(); // Show the loader initially

  const hasSeenIntro = localStorage.getItem('onboardingComplete');
  console.log("Has seen intro:", hasSeenIntro);

  if (!hasSeenIntro) {
    // Simulate loading delay before showing the intro
    setTimeout(() => {
      removeLoader(); // Remove the loader before showing the intro
      console.log("Rendering intro...");
      renderIntro(completeOnboarding); // Render the intro
    }, 1000); // Adjust delay as needed
  } else {
    // Simulate loading delay before loading the main page
    setTimeout(() => {
      removeLoader(); // Remove the loader before loading the main page
      console.log("Loading main page...");
      loadPage(); // Load the main content
    }, 1000); // Adjust delay as needed
  }
});

function completeOnboarding() {
  localStorage.setItem('onboardingComplete', 'true');
  loadPage(); // Load the main content after completing the intro
}

// Prevent duplicate hashchange events by using debouncing
let debounceTimer;
window.addEventListener('hashchange', () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    loadPage();
  }, 300);
});

function loadPage() {
  const view = location.hash.slice(1) || 'home';
  console.log("Loading view:", view);

  const header = document.getElementById('header');
  const main = document.getElementById('main');
  const footer = document.getElementById('footer');
  const contentContainer = document.getElementById('content-container');
  const loaderContainer = document.getElementById('loader-container');

  console.log('Header element:', document.getElementById('header'));
  console.log('Main element:', document.getElementById('main'));
  console.log('Footer element:', document.getElementById('footer'));
  console.log('Content container:', document.getElementById('content-container'));
  console.log('Loader container:', document.getElementById('loader-container'));

  if (contentContainer) contentContainer.style.display = 'none';
  if (loaderContainer) loaderContainer.style.display = 'flex';

  // Use a delay to simulate content loading
  setTimeout(() => {
    if (loaderContainer) loaderContainer.style.display = 'none';
    if (contentContainer) contentContainer.style.display = 'block';
    loadContent(view);
  }, 3000);

  try {
    if (header) header.innerHTML = renderHeader(view);
    if (main) main.innerHTML = renderMain(view);
    if (footer) footer.innerHTML = renderFooter(view);
  } catch (error) {
    console.error(`Render error for view ${view}:`, error);
    main.innerHTML = `<h2>Error rendering page: ${error.message}</h2>`;
  }
}

function loadContent(view) {
  try {
    switch (view) {
      case 'home':
        console.log('Initializing home view');
        loadNews(); // Ensure this is called after rendering the home view
        break;
      case 'setting':
        console.log('Initializing settings view');
        setupSettings();
        addDarkModeToggle();
        break;
      case 'archive':
        console.log('Initializing archive view');
        loadArchive();
        break;
      case 'auth':
        console.log('Initializing auth view');
        setupAuthForm();
        break;
      case 'popular':
        console.log('Initializing popular view');
        loadPopularNews();
        break;
      default:
        console.error('Unknown view:', view);
        main.innerHTML = `<h2>Page not found</h2>`;
    }
  } catch (error) {
    console.error(`Error initializing view ${view}:`, error);
    main.innerHTML = `<h2>Error loading view: ${error.message}</h2>`;
  }
}

const API_KEY = import.meta.env.VITE_NYT_API_KEY || 'wHo2uXGpV0jazXOxIfWcf7X0WZlBJDz0';
const PLACEHOLDER_IMAGE = '/img/placeholder.jpg'; // If you have a placeholder, keep this as is

// Fixed onboarding images array (removed extra space)
const ONBOARDING_IMAGES = [
  './img/Onboarding_2.png',
  './img/Onboarding_3.png',
  './img/Onboarding_4.png',
];

// For any other logo usage, e.g. a secondary logo:
const secondaryLogo = '/img/newsify_logo_2.png';

// Track user interaction for navigator.vibrate
let hasUserInteracted = false;
document.addEventListener('touchstart', () => {
  hasUserInteracted = true;
}, { once: true });
document.addEventListener('click', () => {
  hasUserInteracted = true;
}, { once: true });

// Helper to load news for all categories in home view
function loadNews() {
  let newsList = document.getElementById('news-list');
  if (!newsList) {
    console.error('news-list element not found. Creating a placeholder.');
    const contentContainer = document.getElementById('content-container');
    if (contentContainer) {
      newsList = document.createElement('div');
      newsList.id = 'news-list';
      contentContainer.appendChild(newsList);
    } else {
      console.error('content-container element not found.');
      return;
    }
  }
  newsList.innerHTML = ''; // Clear existing content
  // Fetch and display news...
}

// Helper to load popular news
function loadPopularNews() {
  const url = `https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=${API_KEY}`;
  fetchNews(url, 'popular');
}

// Fetch news for a specific category and append to newsList
function fetchNewsForCategory(apiUrl, category, newsList) {
  fetch(apiUrl) // Use the parameter `apiUrl` instead of redeclaring `url`
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      if (!data.results || data.results.length === 0 || !data.results[0].title) {
        throw new Error('No valid articles in API response');
      }
      console.log(`API response for ${category.id}:`, data.results[0]);

      const categorySection = document.createElement('div');
      categorySection.className = 'category-section';
      if (category.id === CATEGORIES[0].id) {
        categorySection.classList.add('expanded');
      }

      const categoryHeader = document.createElement('div');
      categoryHeader.className = 'category-header';
      categoryHeader.innerHTML = `
        <img src="/img/newsify_logo_1.png" alt="Newsify Logo" class="heartbeat" style="height: 38px;" />
        <h3>${category.label.toUpperCase()}</h3>
        <i class="fas toggle-arrow ${category.id === CATEGORIES[0].id ? 'fa-chevron-down' : 'fa-chevron-right'}"></i>
      `;
      categorySection.appendChild(categoryHeader);

      const list = document.createElement('ul');
      list.className = 'category-news-list';
      list.innerHTML = data.results.map(article => {
        const imageUrl = article.multimedia && article.multimedia.length > 0
          ? article.multimedia[0].url 
          : PLACEHOLDER_IMAGE;
        return `
          <li class="news-article" data-id="${article.uri}" data-url="${article.url}">
            <div class="swipe-background">
              <div class="icon right"><i class="fa-regular fa-bookmark"></i></div>
            </div>
            <span class="article-content">
              <img src="${imageUrl}" alt="${article.title}" class="news-image" />
              <div class="news-text">
                <h4>${article.title}</h4>
                <p>${article.abstract || 'No description available.'}</p>
              </div>
            </span>
          </li>
        `;
      }).join('');
      categorySection.appendChild(list);

      categoryHeader.addEventListener('click', () => {
        categorySection.classList.toggle('expanded');
        const arrow = categoryHeader.querySelector('.toggle-arrow');
        arrow.classList.toggle('fa-chevron-right');
        arrow.classList.toggle('fa-chevron-down');
      });

      list.querySelectorAll('.news-article').forEach(item => {
        item.addEventListener('click', (e) => {
          if (e.target.closest('.swipe-background') || e.target.closest('.icon')) return;
          const articleUrl = item.dataset.url;
          if (articleUrl) {
            window.open(articleUrl, '_blank');
          }
        });
      });

      newsList.appendChild(categorySection);
      document.querySelectorAll('.news-article').forEach(item => handleSwipe(item, 'home'));
    })
    .catch(error => {
      console.error(`Fetch error for ${category.id}:`, error);
      const errorDiv = document.createElement('div');
      errorDiv.className = 'category-section';
      errorDiv.innerHTML = `
        <div class="category-header">
          <h3>${category.label.toUpperCase()}</h3>
          <i class="fas fa-chevron-right toggle-arrow"></i>
        </div>
        <p>Failed to load news: ${error.message}</p>
      `;
      newsList.appendChild(errorDiv);
    });
}

// Fetch news for popular and archive views
function fetchNews(url, view = 'popular') {
  const newsList = document.getElementById("news-list");
  if (!newsList) {
    console.error(`news-list element not encountered for view: ${view}`);
    return;
  }
  newsList.innerHTML = ''; // Clear existing content

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      if (!data.results || data.results.length === 0 || !data.results[0].title) {
        throw new Error('No valid articles in API response');
      }
      console.log(`API response for ${view}:`, data.results[0]);

      const list = document.createElement('ul');
      list.className = 'article-list';
      list.innerHTML = data.results.map(article => {
        const imageUrl = article.multimedia && article.multimedia.length > 0
          ? article.multimedia[0].url 
          : PLACEHOLDER_IMAGE;
        const swipeActions = `<div class="icon right"><i class="fa-regular fa-bookmark"></i></div>`;
        return `
          <li class="news-article" data-id="${article.uri}" data-url="${article.url}">
            <div class="swipe-background">${swipeActions}</div>
            <span class="article-content">
              <img src="${imageUrl}" alt="${article.title}" class="news-image" />
              <div class="news-text">
                <h4>${article.title}</h4>
                <p>${article.abstract || 'No description available.'}</p>
              </div>
            </span>
          </li>
        `;
      }).join('');
      newsList.appendChild(list);

      document.querySelectorAll('.news-article').forEach(item => handleSwipe(item, view));
    })
    .catch(error => {
      console.error(`Fetch error for ${view}:`, error);
      newsList.innerHTML = `
        <p>Failed to load news: ${error.message}. 
        <button onclick="loadPopularNews()">Retry</button></p>`;
    });
}

// Handle swipe actions for article elements
function handleSwipe(item, view = 'home') {
  let startX = 0;
  let deltaX = 0;
  const content = item.querySelector('.article-content');
  const background = item.querySelector('.swipe-background');

  item.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });

  item.addEventListener('touchmove', (e) => {
    deltaX = e.touches[0].clientX - startX;
    content.style.transform = `translateX(${deltaX}px)`;

    if (view === 'archive') {
      background.style.background = deltaX < -50 ? 'linear-gradient(to right, #D32F2F 0%)' : 'transparent';
    } else if (view === 'home' || view === 'popular') {
      background.style.background = deltaX < -100 ? 'linear-gradient(to right, #4D861F 0%)' : 'transparent';
    }
  });

  item.addEventListener('touchend', () => {
    if (view === 'archive' && deltaX < -150) {
      if (hasUserInteracted && navigator.vibrate) navigator.vibrate(50);
      deleteArticle(item);
    } else if ((view === 'home' || view === 'popular') && deltaX < -150) {
      if (hasUserInteracted && navigator.vibrate) navigator.vibrate(50);
      saveArticle(item);
    }

    content.style.transform = 'translateX(0)';
    background.style.background = 'transparent';
  });

  // Click handler for bookmark/trash icons
  item.querySelector('.swipe-background .icon')?.addEventListener('click', () => {
    if (view === 'archive') {
      if (hasUserInteracted && navigator.vibrate) navigator.vibrate(50);
      deleteArticle(item);
    } else if (view === 'home' || view === 'popular') {
      if (hasUserInteracted && navigator.vibrate) navigator.vibrate(50);
      saveArticle(item);
    }
  });
}

// Save article to localStorage
function saveArticle(itemElement) {
  const id = itemElement.dataset.id;
  const title = itemElement.querySelector('.article-content')?.innerText || 'Untitled';
  const description = 'No description available.';
  const image = PLACEHOLDER_IMAGE;
  const url = itemElement.dataset.url || '#';

  const article = { id, title, description, image, url };
  let articles = JSON.parse(localStorage.getItem('articles') || '[]');

  if (!articles.some(a => a.id === id)) {
    articles.push(article);
    localStorage.setItem('articles', JSON.stringify(articles));
    showToast('Article Saved!');
  }
}

// Delete article from localStorage
function deleteArticle(itemElement) {
  const id = itemElement.dataset.id;
  let articles = JSON.parse(localStorage.getItem('articles') || '[]');
  articles = articles.filter(article => article.id !== id);
  localStorage.setItem('articles', JSON.stringify(articles));
  itemElement.remove();
  showToast('Deleted!');
}

// Dark mode toggle functionality (only for settings view)
function addDarkModeToggle() {
  const darkModeToggle = document.querySelector('.dark-mode-toggle');

  if (darkModeToggle) {
    const isDarkModeEnabled = localStorage.getItem('darkMode') === 'enabled';
    document.body.classList.toggle('dark-mode', isDarkModeEnabled);

    darkModeToggle.addEventListener('click', () => {
      const isEnabled = document.body.classList.toggle('dark-mode');
      localStorage.setItem('darkMode', isEnabled ? 'enabled' : 'disabled');

      // Re-render news-list if it disappears
      const newsList = document.getElementById('news-list');
      if (!newsList || newsList.innerHTML.trim() === '') {
        console.log('Re-rendering news-list...');
        loadNews(); // Call the function to reload news
      }
    });
  } else {
    console.error('Dark mode toggle button not found.');
  }
}

// Setup settings checkboxes
function setupSettings() {
  const checkboxes = document.querySelectorAll('.settings input[type="checkbox"][data-category]');
  const darkModeToggle = document.querySelector('.dark-mode-toggle');

  let enabledCategories = JSON.parse(localStorage.getItem('enabledCategories') || '[]');

  checkboxes.forEach(checkbox => {
    const category = checkbox.dataset.category;
    checkbox.checked = enabledCategories.includes(category);

    checkbox.addEventListener('change', (e) => {
      const category = e.target.dataset.category;
      if (e.target.checked) {
        if (!enabledCategories.includes(category)) {
          enabledCategories.push(category);     
        }
      } else {
        enabledCategories = enabledCategories.filter(c => c !== category);
      }
      localStorage.setItem('enabledCategories', JSON.stringify(enabledCategories));
    });
  });

  if (darkModeToggle) {
    const isDark = localStorage.getItem('darkMode') === 'enabled';
    darkModeToggle.checked = isDark;
    document.body.classList.toggle('dark-mode', isDark);

    darkModeToggle.addEventListener('change', () => {
      const enabled = darkModeToggle.checked;
      document.body.classList.toggle('dark-mode', enabled);
      localStorage.setItem('darkMode', enabled ? 'enabled' : 'disabled');
    });
  }
}

// Setup auth form
function setupAuthForm() {
  const authButtons = document.querySelectorAll('.auth-buttons button');
  authButtons.forEach(button => {
    button.addEventListener('click', () => {
      const provider = button.textContent.includes('Facebook') ? 'Facebook' : 'Google';
      showToast(`Continue with ${provider}`);
    });
  });
  const signInButton = document.querySelector('.auth-view button[type="submit"]');
  if (signInButton) {
    signInButton.addEventListener('click', () => {
      showToast('Sign in with password');
    });
  }
  const signUpLink = document.querySelector('.auth-view p span');
  if (signUpLink) {
    signUpLink.addEventListener('click', () => {
      showToast('Sign up link clicked');
    });
  }
}

// Load the archive (saved articles)
function loadArchive() {
  let newsList = document.getElementById('news-list');
  if (!newsList) {
    console.error('news-list element not found for archive. Creating a placeholder.');
    const contentContainer = document.getElementById('content-container');
    if (contentContainer) {
      newsList = document.createElement('div');
      newsList.id = 'news-list';
      contentContainer.appendChild(newsList);
    } else {
      console.error('content-container element not found.');
      return;
    }
  }
  newsList.innerHTML = ''; // Clear existing content

  const savedArticles = JSON.parse(localStorage.getItem('articles') || '[]');
  if (savedArticles.length === 0) {
    newsList.innerHTML = `<p class="empty-archive">No saved articles yet.</p>`;
    return;
  }

  const list = document.createElement('ul');
  list.className = 'article-list';
  list.innerHTML = savedArticles.map(article => {
    const imageUrl = article.image || '/img/placeholder.jpg';
    const description = article.description || 'No description available.';
    return `
      <li class="news-article" data-id="${article.id}" data-url="${article.url}">
        <div class="swipe-background">
          <div class="icon right"><i class="fa-solid fa-trash" style="margin-right: 1em;" aria-hidden="true"></i></div>
        </div>
        <span class="article-content">
          <img src="${imageUrl}" alt="${article.title}" class="news-image" />
          <div class="news-text">
            <h4>${article.title}</h4>
            <p>${description}</p>
          </div>
        </span>
      </li>
    `;
  }).join('');
  newsList.appendChild(list);

  list.querySelectorAll('.news-article').forEach(item => {
    item.addEventListener('click', (e) => {
      if (e.target.closest('.swipe-background') || e.target.closest('.icon')) return;
      const articleUrl = item.dataset.url;
      if (articleUrl) {
        window.open(articleUrl, '_blank');
      }
    });
  });

  document.querySelectorAll('.news-article').forEach(item => handleSwipe(item, 'archive'));
}

// Expose loadPopularNews globally for retry button
window.loadPopularNews = loadPopularNews;

