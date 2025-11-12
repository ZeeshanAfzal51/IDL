// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('mainNav');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        }
    });
});

// Three.js Background Animation
const canvas = document.getElementById('bg-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
camera.position.z = 5;

// Create particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 2000;
const posArray = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 20;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.02,
    color: 0x00d4ff,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// Create geometric shapes
const geometry = new THREE.TorusGeometry(0.7, 0.2, 16, 100);
const material = new THREE.MeshStandardMaterial({
    color: 0x667eea,
    wireframe: true,
    transparent: true,
    opacity: 0.3
});
const torus = new THREE.Mesh(geometry, material);
torus.position.set(-2, 1, -3);
scene.add(torus);

const geometry2 = new THREE.OctahedronGeometry(0.6);
const material2 = new THREE.MeshStandardMaterial({
    color: 0x00d4ff,
    wireframe: true,
    transparent: true,
    opacity: 0.3
});
const octahedron = new THREE.Mesh(geometry2, material2);
octahedron.position.set(2, -1, -2);
scene.add(octahedron);

// Add lights
const pointLight = new THREE.PointLight(0x00d4ff, 1);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

// Mouse movement effect
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Rotate particles
    particlesMesh.rotation.y += 0.0005;
    particlesMesh.rotation.x += 0.0002;

    // Rotate shapes
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.01;
    octahedron.rotation.x += 0.01;
    octahedron.rotation.z += 0.01;

    // Mouse parallax effect
    camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
    camera.position.y += (mouseY * 0.5 - camera.position.y) * 0.05;

    renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animated counter for stats
function animateCounter(element, target, duration) {
    let start = 0;
    const increment = target / (duration / 16); // 60 FPS
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Intersection Observer for counter animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const accuracyStat = document.getElementById('accuracy-stat');
            const marketStat = document.getElementById('market-stat');
            const projectsStat = document.getElementById('projects-stat');
            
            // Animate stats only once
            if (!accuracyStat.classList.contains('animated')) {
                accuracyStat.classList.add('animated');
                marketStat.classList.add('animated');
                projectsStat.classList.add('animated');
                
                // Stats are already displayed, add pulse effect
                accuracyStat.style.animation = 'pulse 1s ease';
                marketStat.style.animation = 'pulse 1s ease 0.2s';
                projectsStat.style.animation = 'pulse 1s ease 0.4s';
            }
        }
    });
}, { threshold: 0.5 });

const heroSection = document.querySelector('.hero-section');
if (heroSection) {
    statsObserver.observe(heroSection);
}

// Add pulse animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }
`;
document.head.appendChild(style);

// Form submission handler
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            alert('Thank you for your interest! We will contact you shortly.');
            contactForm.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 1500);
    });
}

// Add parallax effect to sections
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-image-container');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Fetch real-time drone market data (using a public API)
async function fetchMarketData() {
    try {
        // Using a placeholder API - replace with actual market data API if available
        // For demonstration, we'll use static data with dynamic updates
        const marketStatElement = document.getElementById('market-stat');
        
        // Simulate real-time data updates
        setInterval(() => {
            const currentValue = 2578;
            const variation = Math.floor(Math.random() * 10) - 5;
            const newValue = currentValue + variation;
            
            if (marketStatElement) {
                marketStatElement.textContent = `₹${newValue}M`;
                marketStatElement.style.animation = 'pulse 0.5s ease';
                
                setTimeout(() => {
                    marketStatElement.style.animation = '';
                }, 500);
            }
        }, 10000); // Update every 10 seconds
        
    } catch (error) {
        console.log('Market data fetch error:', error);
    }
}

// Initialize market data fetching
fetchMarketData();

// Add weather data for project locations (using free weather API)
async function fetchLocationWeather() {
    try {
        // Tamil Nadu coordinates (approximate)
        const tamilNaduLat = 11.1271;
        const tamilNaduLon = 78.6569;
        
        // Using OpenWeatherMap API (free tier)
        // Note: Replace 'demo' with actual API key if available
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${tamilNaduLat}&lon=${tamilNaduLon}&appid=demo&units=metric`
        );
        
        if (response.ok) {
            const data = await response.json();
            console.log('Weather data for Tamil Nadu:', data);
        }
    } catch (error) {
        console.log('Weather data not available');
    }
}

// Fetch weather data on load (optional feature)
// fetchLocationWeather();

// Add scroll progress indicator
const scrollProgress = document.createElement('div');
scrollProgress.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, #00d4ff, #7b2ff7);
    z-index: 9999;
    transition: width 0.1s ease;
`;
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.pageYOffset / windowHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 1s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Add hover effect to service cards
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transition = 'all 0.3s ease';
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Add typing effect to hero title (optional enhancement)
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect (commented out by default)
// const heroTitle = document.querySelector('.hero-title');
// if (heroTitle) {
//     const originalText = heroTitle.textContent;
//     typeWriter(heroTitle, originalText, 30);
// }

// Add image lazy loading for better performance
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// Console message for developers
console.log('%c Indian Dynamics ', 'background: linear-gradient(90deg, #667eea, #764ba2); color: white; padding: 10px 20px; font-size: 20px; font-weight: bold;');
console.log('%c Precision Surveying Solutions | Built with Three.js, Bootstrap & Modern Web Technologies ', 'color: #00d4ff; font-size: 12px;');
console.log('%c Contact: zeeshan.afzal@indiandynamics.in ', 'color: #7b2ff7; font-size: 12px;');

// Export functions for potential external use
window.IndianDynamics = {
    animateCounter,
    fetchMarketData,
    typeWriter
};
