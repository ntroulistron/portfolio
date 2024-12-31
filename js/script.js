const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjust if you have a sticky navbar
                behavior: 'smooth',
            });
        }
    });
});


const slider = document.querySelector('.slider');
const leftBtn = document.querySelector('.left-btn');
const rightBtn = document.querySelector('.right-btn');
const cards = Array.from(document.querySelectorAll('.project-card'));

// Constants for card dimensions
const cardWidth = cards[0].offsetWidth; 
const gap = 24; // Match CSS gap value
const totalCardWidth = cardWidth + gap;

let currentIndex = Math.floor(cards.length / 2); // Start at the middle card

function updateSlider() {
    const translateX = -totalCardWidth * currentIndex + (slider.offsetWidth - cardWidth) / 2;
    slider.style.transition = 'transform 0.5s ease-in-out';
    slider.style.transform = `translateX(${translateX}px)`;

    cards.forEach((card, index) => {
        card.classList.remove('active', 'left', 'right');
        if (index === currentIndex) {
            card.classList.add('active');
        } else if (index === currentIndex - 1) {
            card.classList.add('left');
        } else if (index === currentIndex + 1) {
            card.classList.add('right');
        }
    });
}

function moveRight() {
    if (currentIndex < cards.length - 1) {
        currentIndex++;
        updateSlider();
    }
}

function moveLeft() {
    if (currentIndex > 0) {
        currentIndex--;
        updateSlider();
    }
}

// Attach button listeners
rightBtn.addEventListener('click', moveRight);
leftBtn.addEventListener('click', moveLeft);

// Initialize slider on page load
updateSlider();

const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

// Check if the user has a preferred theme in localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.classList.add(savedTheme);
}

// Toggle light/dark mode
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    // Save the current theme in localStorage
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark-mode');
    } else {
        localStorage.setItem('theme', '');
    }
});
const canvas = document.getElementById('home-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 5;

// Create particles
const particleCount = 500;
const particles = new THREE.BufferGeometry();
const positions = new Float32Array(particleCount * 3);

for (let i = 0; i < particleCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 10;
}

particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));

// Particle material
const particleMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.05,
    transparent: true,
    opacity: 0.7,
});

const particleSystem = new THREE.Points(particles, particleMaterial);
scene.add(particleSystem);

// Animation loop
function animateParticles() {
    requestAnimationFrame(animateParticles);
    particleSystem.rotation.y += 0.001; // Rotate particles
    renderer.render(scene, camera);
}
animateParticles();

// Handle resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});


