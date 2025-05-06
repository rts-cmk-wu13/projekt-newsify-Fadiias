export function renderIntro() {
    const main = document.querySelector('main');
    main.innerHTML = `
      <section class="intro">
        <div class="intro-slider">
          <img id="slideImage" src="./img/Onboarding 2.png" alt="Onboarding Image">
        </div>
        <div class="intro-content">
          <h2 id="slideTitle">Stay Connected, Everywhere, Anytime</h2>
          <p id="slideText">
            Welcome to Newsify, your ultimate destination for breaking news, exclusive stories, and tailored content.
          </p>
          <div class="intro-buttons">
            <button id="prevBtn">◀</button>
            <button id="nextBtn">▶</button>
          </div>
          <button id="continueBtn" class="continue-button">Get Started</button>
        </div>
      </section>
    `;
  
    const slides = [
      {
        img: './img/Onboarding 2.png',
        title: 'Stay Connected, Everywhere, Anytime',
        text: 'Welcome to Newsify, your ultimate destination for breaking news, exclusive stories, and tailored content.'
      },
      {
        img: './img/Onboarding 3.png',
        title: 'Become a Savvy Global Citizen',
        text: 'Discover tailored news that aligns with your interests and preferences. Your personalized news journey awaits!'
      },
      {
        img: './img/Onboarding 4.png',
        title: 'Enhance your News Journey Now!',
        text: 'Be part of our dynamic community and contribute your insights and participate in enriching conversations.'
      }
    ];
  
    let currentSlide = 0;
  
    const slideImage = document.getElementById('slideImage');
    const slideTitle = document.getElementById('slideTitle');
    const slideText = document.getElementById('slideText');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const continueBtn = document.getElementById('continueBtn');
  
    function showSlide(index) {
      slideImage.src = slides[index].img;
      slideTitle.textContent = slides[index].title;
      slideText.textContent = slides[index].text;
    }
  
    prevBtn.addEventListener('click', () => {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
    });
  
    nextBtn.addEventListener('click', () => {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    });
  
    continueBtn.addEventListener('click', () => {
      location.hash = '#home';
    });
  }
  