/*==================== CONSTANTS & SELECTORS ====================*/
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav__link');
const sections = document.querySelectorAll('section[id]');
const header = document.getElementById('header');
const scrollUpBtn = document.getElementById('scroll-up');

/*==================== MENU SHOW / HIDE ====================*/
// Validate if constant exists
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

/*==================== REMOVE MENU MOBILE ====================*/
function linkAction() {
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu');
}
navLinks.forEach(n => n.addEventListener('click', linkAction));

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
function scrollActive() {
    const scrollY = window.scrollY;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 58;
        const sectionId = current.getAttribute('id');
        const navLink = document.querySelector(`.nav__menu a[href*=${sectionId}]`);

        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add('active-link');
            } else {
                navLink.classList.remove('active-link');
            }
        }
    });
}
window.addEventListener('scroll', scrollActive);

/*==================== CHANGE BACKGROUND HEADER ====================*/ 
function scrollHeader() {
    // When the scroll is greater than 50 viewport height, add the scroll-header class
    if (this.scrollY >= 50) header.classList.add('scroll-header'); 
    else header.classList.remove('scroll-header');
}
window.addEventListener('scroll', scrollHeader);

/*==================== SHOW SCROLL UP ====================*/ 
function showScrollUp() {
    if (!scrollUpBtn) return;
    // When the scroll is higher than 560 viewport height, add the show-scroll class
    if (this.scrollY >= 560) scrollUpBtn.classList.add('show-scroll'); 
    else scrollUpBtn.classList.remove('show-scroll');
}
window.addEventListener('scroll', showScrollUp);

/*==================== TYPEWRITER EFFECT ====================*/
const typeWriter = (text, element, speed = 100, callback) => {
    let i = 0;
    element.innerHTML = ""; // Clear existing text
    element.classList.add('typing-cursor'); // Add cursor

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            element.classList.remove('typing-cursor'); // Remove cursor when done
            if (callback) callback();
        }
    }
    type();
};

function initTypewriter() {
    const subtitle = document.querySelector('.home__subtitle');
    const title = document.querySelector('.home__title');
    const profession = document.querySelector('.home__profession');

    if (subtitle && title && profession) {
        // Text Content
        const text1 = "Hello, I'm";
        const text2 = "TSUJIN";
        const text3 = "Web Developer";

        // Clear initially
        subtitle.innerHTML = "";
        title.innerHTML = "";
        profession.innerHTML = "";

        // Sequence
        setTimeout(() => {
            typeWriter(text1, subtitle, 50, () => {
                typeWriter(text2, title, 100, () => {
                    typeWriter(text3, profession, 50, () => {
                        // Keep cursor on last element
                        profession.classList.add('typing-cursor'); 
                    });
                });
            });
        }, 500); // Initial delay
    }
}

/*==================== SKILL GAUGE INTERACTION ====================*/
function initSkillGauge() {
    const tags = document.querySelectorAll('.skill-tag');
    const gaugeArc = document.getElementById('gauge-arc');
    const gaugeText = document.getElementById('gauge-text');
    const gaugePercent = document.getElementById('gauge-percent');

    if (!gaugeArc || !tags.length) return; 

    // Arc Config
    // Radius is 80. Semi-circle length = PI * 80 ≈ 251.
    const ARC_LENGTH = 251; 
    
    // Set initial state (Empty)
    gaugeArc.style.strokeDasharray = ARC_LENGTH;
    gaugeArc.style.strokeDashoffset = ARC_LENGTH;

    tags.forEach(tag => {
        tag.addEventListener('click', () => {
            // Toggle Active Class
            tags.forEach(t => t.classList.remove('active-skill'));
            tag.classList.add('active-skill');

            const skillName = tag.getAttribute('data-skill');
            const skillLevel = parseInt(tag.getAttribute('data-level'));

            // Update Text
            if (gaugeText) gaugeText.textContent = skillName;
            
            // Animate Countercan
            if (gaugePercent) {
                let currentNum = 0;
                // Simple interval animation
                // Note: For production, requestAnimationFrame is better but interval is fine here
                const interval = setInterval(() => {
                    if (currentNum >= skillLevel) {
                        clearInterval(interval);
                        gaugePercent.textContent = skillLevel + "%";
                    } else {
                        currentNum++;
                        // Speed up if number is far away
                        currentNum += (skillLevel - currentNum > 20) ? 2 : 0; 
                        gaugePercent.textContent = currentNum + "%";
                    }
                }, 10);
            }

            // Update Gauge Arc
            // 0% = Offset 251, 100% = Offset 0
            const offset = ARC_LENGTH - (ARC_LENGTH * skillLevel / 100);
            gaugeArc.style.strokeDashoffset = offset;
        });
    });
}

/*==================== HIRE ME HOVER EFFECT ====================*/
function initHireMeHover() {
    const hireMeButtons = document.querySelectorAll('.button--ghost');
    const homeImage = document.querySelector('.home__img');
    
    if (!homeImage) return; // Only run on pages with home image
    
    const originalImage = homeImage.src;
    const smileImage = '../img/smileFace.png';
    
    // Helper function to smoothly change image
    const changeImageSmooth = (newSrc) => {
        homeImage.style.opacity = '0';
        setTimeout(() => {
            homeImage.src = newSrc;
            homeImage.style.opacity = '1';
        }, 150); // Match CSS transition duration
    };
    
    hireMeButtons.forEach(button => {
        // Check if button text contains "Hire Me"
        if (button.textContent.trim() === 'Hire Me') {
            button.addEventListener('mouseenter', () => {
                changeImageSmooth(smileImage);
            });
            
            button.addEventListener('mouseleave', () => {
                changeImageSmooth(originalImage);
            });
        }
    });
}

/*==================== INITIALIZATION ====================*/
document.addEventListener("DOMContentLoaded", () => {
    initTypewriter();
    initSkillGauge(); 
    initHireMeHover();
});
