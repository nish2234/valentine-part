import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Proposal Screen Logic
const proposalScreen = document.getElementById('proposal-screen');
const mainContent = document.getElementById('main-content');
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');

// Function to move "No" button randomly
function moveNoButton() {
  const container = document.querySelector('.button-container');
  const containerRect = container.getBoundingClientRect();
  
  // Calculate random position within safe bounds
  const maxX = window.innerWidth - 200; // Button width buffer
  const maxY = window.innerHeight - 100; // Button height buffer
  const minX = 50;
  const minY = containerRect.top - 100;
  
  const randomX = Math.random() * (maxX - minX) + minX;
  const randomY = Math.random() * (maxY - minY) + minY;
  
  noBtn.style.position = 'fixed';
  noBtn.style.left = randomX + 'px';
  noBtn.style.top = randomY + 'px';
}

// No button hover event
noBtn.addEventListener('mouseenter', moveNoButton);
noBtn.addEventListener('touchstart', (e) => {
  e.preventDefault();
  moveNoButton();
});

// Yes button click event
yesBtn.addEventListener('click', () => {
  // Animate proposal screen out
  gsap.to(proposalScreen, {
    opacity: 0,
    scale: 0.8,
    duration: 0.8,
    ease: "power2.in",
    onComplete: () => {
      proposalScreen.style.display = 'none';
      mainContent.classList.remove('hidden');
      
      // Trigger animations for main content
      initMainContent();
    }
  });
});

function initMainContent() {
  // Create floating hearts
  setInterval(createHeart, 300);
  
  // Animate hero title
  gsap.to(".hero-title", {
    duration: 2,
    opacity: 1,
    y: 0,
    ease: "elastic.out(1, 0.5)",
    delay: 0.3
  });

  gsap.to(".scroll-indicator", {
    duration: 1,
    opacity: 1,
    delay: 1.5
  });
  
  // Setup scroll animations
  setupScrollAnimations();
}


// Data for stories
const stories = [
  {
    title: "Where It All Began",
    text: "We met at internship and we become very good friends. Amidst the work and chaos, I found a friend who would become my everything.",
    asset: "asset1.jpeg", // Image
    type: "image"
  },
  {
    title: "Adventures in Delhi",
    text: "Walking through the streets of Delhi, every moment with you felt like an adventure I never wanted to end.",
    asset: "asset2.jpeg", // Image
    type: "image"
  },
  {
    title: "Endless Conversations",
    text: "Our 3-hour calls started from here. Distance meant nothing when we could talk for hours. Those calls were the heartbeat of my days.",
    asset: "asset3.jpeg", // Image
    type: "image"
  },
  {
    title: "Bangalore & The Yes",
    text: "We met at Bangalore. The city of gardens, where my heart found its home. The moment full surety 'yes' converted you into my babygirl forever.",
    asset: "asset4.jpeg", // Image
    type: "image"
  },
  {
    title: "Sweet Momemts",
    text: "Watching you eat chocolate cake, your favorite. Started loving you even more in that moment.",
    asset: "asset5.jpeg", // Image
    type: "image"
  },
  {
    title: "Perfectly Imperfect",
    text: "Your clumsiness makes me love you more. It's one of the million reasons I fall deeper in love with you every day.",
    asset: "asset6.jpeg", // Image
    type: "image"
  },
  {
    title: "Lalbagh Meet",
    text: "Walking hand in hand in Lalbagh, surrounded by nature, but nothing was as beautiful as you.",
    asset: "asset7.jpeg", // Image
    type: "image"
  },
  {
    title: "My fav vlogger",
    text: "Is vlogger ko I can see anytime , everytime that is why (My favorite vlogger)",
    asset: "asset8.mp4", // VIDEO
    type: "video"
  },
  {
    title: "The Best Meet",
    text: "Rohan Iksha wala meet. The best meet of all. A memory etched in my heart forever, perfect in every way.",
    asset: "asset9.jpeg", // Image
    type: "image"
  }
];

const contentContainer = document.querySelector('.content');

// Dynamically create sections
stories.forEach((story, index) => {
  const section = document.createElement('section');
  section.classList.add('story-section');
  if (index % 2 !== 0) {
    section.classList.add('reverse');
  }

  const mediaContent = story.type === 'video' 
    ? `<video src="/assets/${story.asset}" autoplay muted loop playsinline></video>`
    : `<img src="/assets/${story.asset}" alt="${story.title}">`;

  section.innerHTML = `
    <div class="story-content">
      <h2>${story.title}</h2>
      <p>${story.text}</p>
    </div>
    <div class="story-media">
      ${mediaContent}
    </div>
  `;
  
  contentContainer.appendChild(section);
});

// Create floating hearts
function createHeart() {
  const heartsContainer = document.querySelector('.hearts-container');
  if (!heartsContainer) return;
  
  const heart = document.createElement('div');
  heart.classList.add('heart');
  heart.innerHTML = '❤️';
  heart.style.left = Math.random() * 100 + '%';
  heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
  heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
  heartsContainer.appendChild(heart);
  
  setTimeout(() => {
    heart.remove();
  }, 7000);
}

// Setup scroll animations (called after proposal accepted)
function setupScrollAnimations() {
  // Enhanced Scroll Animations with GSAP ScrollTrigger
  document.querySelectorAll('.story-section').forEach((section, index) => {
    const content = section.querySelector('.story-content');
    const media = section.querySelector('.story-media');
    
    // Ensure images/videos are loaded
    const img = media.querySelector('img');
    const video = media.querySelector('video');
    
    if (img) {
      img.onerror = () => console.error(`Failed to load: ${img.src}`);
      img.onload = () => console.log(`Loaded: ${img.src}`);
    }
    
    if (video) {
      video.onerror = () => console.error(`Failed to load video: ${video.src}`);
      video.onloadeddata = () => console.log(`Loaded video: ${video.src}`);
    }
    
    gsap.fromTo(content, 
      {
        opacity: 0,
        x: index % 2 === 0 ? -100 : 100,
        scale: 0.9
      },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );
    
    gsap.fromTo(media,
      {
        opacity: 0,
        x: index % 2 === 0 ? 100 : -100,
        scale: 0.9
      },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );
  });
}

// Music Control
const musicBtn = document.getElementById('music-btn');
const bgMusic = document.getElementById('bg-music');
let isPlaying = false;
let firstPlay = true;

musicBtn.addEventListener('click', () => {
  if (isPlaying) {
    bgMusic.pause();
    musicBtn.textContent = "🎵 Play Music";
  } else {
    if (firstPlay) {
      bgMusic.currentTime = 37;
      firstPlay = false;
    }
    bgMusic.play().then(() => {
        musicBtn.textContent = "⏸ Pause Music";
    }).catch(e => console.log("Audio play failed", e));
  }
  isPlaying = !isPlaying;
});
