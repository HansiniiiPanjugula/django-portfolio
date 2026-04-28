// Typing Effect
const textElements = ["Developer", "Django Developer", "AI Enthusiast", "Problem Solver"];
let textIndex = 0;
let charIndex = 0;
let currentText = "";
let isDeletingText = false;
const typingElement = document.querySelector(".typing");

function typeEffect() {
    if (!typingElement) return;

    currentText = textElements[textIndex];
    
    if (!isDeletingText) {
        typingElement.textContent = currentText.substring(0, charIndex++);
        if (charIndex > currentText.length) {
            isDeletingText = true;
            setTimeout(typeEffect, 1500); // Pause at end of word
            return;
        }
    } else {
        typingElement.textContent = currentText.substring(0, charIndex--);
        if (charIndex === 0) {
            isDeletingText = false;
            textIndex = (textIndex + 1) % textElements.length;
        }
    }

    setTimeout(typeEffect, isDeletingText ? 50 : 100);
}

// Initialize typing effect
if (document.querySelector(".typing")) {
    typeEffect();
}

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// Scroll Animations (Intersection Observer)
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Animate progress bars if they are in the viewport
            if (entry.target.classList.contains('card') || entry.target.classList.contains('skills-grid') || entry.target.querySelector('.progress')) {
                const progressBars = entry.target.querySelectorAll('.progress');
                progressBars.forEach(bar => {
                    bar.style.width = bar.getAttribute('data-width');
                });
            }
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with fade-in or slide-in classes
document.querySelectorAll('.fade-in, .slide-in-right, .slide-in-left').forEach(el => {
    observer.observe(el);
});

// Animate progress bars directly if skills section loads in view
document.addEventListener('DOMContentLoaded', () => {
    const progressBars = document.querySelectorAll('.progress');
    // We use observer primarily, but a fallback just in case
    setTimeout(() => {
        progressBars.forEach(bar => {
            if (bar.getBoundingClientRect().top < window.innerHeight) {
                bar.style.width = bar.getAttribute('data-width');
            }
        });
    }, 500);
});

// Dark/Light Mode Toggle
const themeBtn = document.getElementById('theme-btn');
const body = document.body;
const icon = themeBtn ? themeBtn.querySelector('i') : null;

// Check for saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    body.classList.add('light-mode');
    if (icon) {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

if (themeBtn) {
    themeBtn.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        
        if (body.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light');
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        } else {
            localStorage.setItem('theme', 'dark');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    });
}

// Optional: Particles.js Initialization (only if loaded and element exists)
if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 40,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#64FFDA"
            },
            "shape": {
                "type": "circle",
            },
            "opacity": {
                "value": 0.3,
                "random": true,
            },
            "size": {
                "value": 3,
                "random": true,
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#64FFDA",
                "opacity": 0.2,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 2,
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "push": {
                    "particles_nb": 4
                }
            }
        },
        "retina_detect": true
    });
}
