
console.log("🚀 Premium Dark Portfolio loaded!");

function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 6px;
        background: linear-gradient(90deg, #ff6b6b, #4ecdc4, #45b7d1);
        background-size: 200% 100%;
        z-index: 1001;
        transition: width 0.1s ease;
        animation: gradientFlow 3s ease-in-out infinite;
        box-shadow: 0 0 20px rgba(255, 107, 107, 0.5);
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        if (scrollY > 100) {
            navbar.style.background = 'rgba(8, 8, 8, 0.95)';
            navbar.style.backdropFilter = 'blur(40px) saturate(200%)';
            navbar.style.boxShadow = '0 10px 40px rgba(0,0,0,0.5)';
            navbar.style.borderBottom = '1px solid rgba(255, 107, 107, 0.3)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.8)';
            navbar.style.backdropFilter = 'blur(30px) saturate(180%)';
            navbar.style.boxShadow = '0 8px 32px rgba(0,0,0,0.3)';
            navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                createRipple(e, link);
                
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });

    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            const spans = hamburger.querySelectorAll('span');
            if (hamburger.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
}

function initTypingAnimation() {
    const typingText = document.querySelector('.typing-text');
    const texts = [
        'Web Developer | Designer | Freelancer',
        'Frontend Specialist | UI/UX Enthusiast',
        'Creative Coder | Problem Solver',
        'Digital Artist | Tech Innovator'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeEffect() {
        const currentText = texts[textIndex];
        
        if (!isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            
            if (charIndex === currentText.length) {
                setTimeout(() => isDeleting = true, 2000);
            }
        } else {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            
            if (charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
            }
        }
        
        const speed = isDeleting ? 50 : 100;
        setTimeout(typeEffect, speed);
    }
    
    typingText.innerHTML += '<span class="cursor">|</span>';
    
    setTimeout(typeEffect, 1000);
    
    const style = document.createElement('style');
    style.textContent = `
        .cursor {
            animation: cursorBlink 1s infinite;
            color: #ff6b6b;
            font-weight: 300;
        }
        @keyframes cursorBlink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.getAttribute('data-width');
                
                setTimeout(() => {
                    progressBar.style.width = width + '%';
                    setTimeout(() => {
                        progressBar.style.animation = 'gradientShift 4s ease-in-out infinite, waveEffect 2s ease-in-out infinite';
                    }, 1000);
                }, 500);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => skillObserver.observe(bar));
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes waveEffect {
            0%, 100% { 
                box-shadow: 0 0 20px rgba(255, 107, 107, 0.5);
                filter: brightness(1);
            }
            50% { 
                box-shadow: 0 0 40px rgba(78, 205, 196, 0.8);
                filter: brightness(1.2);
            }
        }
    `;
    document.head.appendChild(style);
}

function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            this.style.transform = 'perspective(1000px) rotateX(0deg) translateY(-20px) scale(1.02)';
            this.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            
            this.style.boxShadow = `
                0 50px 100px rgba(0,0,0,0.5),
                0 0 50px rgba(255, 107, 107, 0.3),
                inset 0 1px 0 rgba(255,255,255,0.2)
            `;
        });
        
        card.addEventListener('mouseleave', function(e) {
            this.style.transform = 'perspective(1000px) rotateX(5deg) translateY(0) scale(1)';
            this.style.boxShadow = `
                0 30px 60px rgba(0,0,0,0.4),
                inset 0 1px 0 rgba(255,255,255,0.15)
            `;
        });

        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 8;
            const rotateY = (centerX - x) / 8;
            
            this.style.transform = `
                perspective(1000px) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg) 
                translateY(-20px) 
                scale(1.02)
            `;
            
            const overlay = this.querySelector('.project-overlay');
            if (overlay) {
                const gradientX = (x / rect.width) * 100;
                const gradientY = (y / rect.height) * 100;
                overlay.style.background = `
                    radial-gradient(circle at ${gradientX}% ${gradientY}%, rgba(255, 107, 107, 0.4), rgba(78, 205, 196, 0.3), rgba(0,0,0,0.8))
                `;
            }
        });
    });
}

function createParticleSystem() {
    const header = document.querySelector('header');
    const particleCount = 150;
    const particleTypes = ['star', 'circle', 'triangle', 'diamond'];

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 8 + 2;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 30 + 20;
        const delay = Math.random() * 25;
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#ffa500', '#ff69b4'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const type = particleTypes[Math.floor(Math.random() * particleTypes.length)];
        const opacity = Math.random() * 0.8 + 0.2;

        let clipPath = 'none';
        switch(type) {
            case 'star':
                clipPath = 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)';
                break;
            case 'triangle':
                clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)';
                break;
            case 'diamond':
                clipPath = 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)';
                break;
            default:
                clipPath = 'none';
        }

        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${type === 'circle' ? 
                `radial-gradient(circle, ${color} 0%, ${color}88 50%, transparent 100%)` :
                `linear-gradient(135deg, ${color}, ${color}cc)`
            };
            ${type !== 'circle' ? `clip-path: ${clipPath};` : 'border-radius: 50%;'}
            left: ${x}%;
            top: ${y}%;
            pointer-events: none;
            opacity: ${opacity};
            animation: premiumFloat ${duration}s ease-in-out infinite ${delay}s;
            filter: blur(${Math.random() * 0.8}px);
            box-shadow: 0 0 ${size * 3}px ${color}66;
            z-index: ${Math.floor(Math.random() * 10)};
        `;
        
        header.appendChild(particle);
    }

    header.addEventListener('mousemove', (e) => {
        const particles = header.querySelectorAll('.particle');
        const rect = header.getBoundingClientRect();
        const mouseX = ((e.clientX - rect.left) / rect.width) * 100;
        const mouseY = ((e.clientY - rect.top) / rect.height) * 100;
        
        particles.forEach((particle, index) => {
            const delay = index * 0.005;
            setTimeout(() => {
                const currentX = parseFloat(particle.style.left);
                const currentY = parseFloat(particle.style.top);
                const distance = Math.sqrt(Math.pow(mouseX - currentX, 2) + Math.pow(mouseY - currentY, 2));
                
                if (distance < 20) {
                    const angle = Math.atan2(currentY - mouseY, currentX - mouseX);
                    const force = (20 - distance) / 20;
                    const moveX = Math.cos(angle) * force * 8;
                    const moveY = Math.sin(angle) * force * 8;
                    
                    particle.style.transform = `translate(${moveX}px, ${moveY}px) scale(${1 + force * 0.8}) rotate(${force * 180}deg)`;
                    particle.style.opacity = Math.min(1, 0.8 + force * 0.2);
                    particle.style.filter = `blur(0px) brightness(${1 + force * 0.5})`;
                } else {
                    particle.style.transform = 'translate(0, 0) scale(1) rotate(0deg)';
                    particle.style.opacity = '';
                    particle.style.filter = '';
                }
            }, delay);
        });
    });

    const style = document.createElement('style');
    style.textContent = `
        @keyframes premiumFloat {
            0%, 100% { 
                transform: translateY(0px) translateX(0px) rotate(0deg) scale(1);
                opacity: 0.8;
                filter: brightness(1);
            }
            20% { 
                transform: translateY(-40px) translateX(30px) rotate(72deg) scale(1.2);
                opacity: 1;
                filter: brightness(1.3);
            }
            40% { 
                transform: translateY(-80px) translateX(-20px) rotate(144deg) scale(0.8);
                opacity: 0.9;
                filter: brightness(1.1);
            }
            60% { 
                transform: translateY(-60px) translateX(-40px) rotate(216deg) scale(1.1);
                opacity: 0.85;
                filter: brightness(1.2);
            }
            80% { 
                transform: translateY(-30px) translateX(25px) rotate(288deg) scale(0.9);
                opacity: 0.95;
                filter: brightness(1);
            }
        }
    `;
    document.head.appendChild(style);
}

function createFloatingElements() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach((section, sectionIndex) => {
        for (let i = 0; i < 8; i++) {
            const element = document.createElement('div');
            element.className = 'floating-element';
            
            const size = Math.random() * 40 + 15;
            const x = Math.random() * 100;
            const y = Math.random() * 100;
            const duration = Math.random() * 20 + 15;
            const delay = Math.random() * 8;
            const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1'];
            const color = colors[sectionIndex % colors.length];
            
            element.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: 
                    radial-gradient(circle at 30% 30%, ${color}22, transparent 70%),
                    linear-gradient(135deg, ${color}11, ${color}06);
                border-radius: 50%;
                left: ${x}%;
                top: ${y}%;
                pointer-events: none;
                animation: advancedFloat ${duration}s ease-in-out infinite ${delay}s;
                z-index: -1;
                filter: blur(${Math.random() * 2}px);
                opacity: ${Math.random() * 0.6 + 0.2};
            `;
            
            section.style.position = 'relative';
            section.appendChild(element);
        }
    });
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes advancedFloat {
            0%, 100% { 
                transform: translateY(0px) translateX(0px) rotate(0deg) scale(1);
                opacity: 0.4;
            }
            25% { 
                transform: translateY(-30px) translateX(20px) rotate(90deg) scale(1.1);
                opacity: 0.7;
            }
            50% { 
                transform: translateY(-60px) translateX(-15px) rotate(180deg) scale(0.9);
                opacity: 0.8;
            }
            75% { 
                transform: translateY(-30px) translateX(-25px) rotate(270deg) scale(1.05);
                opacity: 0.6;
            }
        }
    `;
    document.head.appendChild(style);
}

function initRippleEffect() {
    const buttons = document.querySelectorAll('.btn, .project-link, .social-links a');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            for (let i = 0; i < 3; i++) {
                setTimeout(() => {
                    createRipple(e, this, i);
                }, i * 100);
            }
        });
    });
}

function createRipple(e, element, index = 0) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * (1 + index * 0.3);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    const colors = ['rgba(255, 255, 255, 0.6)', 'rgba(255, 107, 107, 0.4)', 'rgba(78, 205, 196, 0.4)'];
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: ${colors[index] || colors[0]};
        border-radius: 50%;
        transform: scale(0);
        animation: advancedRipple 0.8s ease-out;
        pointer-events: none;
        z-index: 1000;
    `;
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 800);
}

function initSectionReveal() {
    const sections = document.querySelectorAll('section');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) rotateX(0deg)';
                entry.target.style.filter = 'blur(0px)';
                const childElements = entry.target.querySelectorAll('h2, h3, p, .stat-item, .project-card, .skill-item');
                childElements.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0) scale(1)';
                        child.style.filter = 'blur(0px)';
                    }, index * 100);
                });
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -80px 0px'
    });

    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(60px) rotateX(5deg)';
        section.style.filter = 'blur(5px)';
        const childElements = section.querySelectorAll('h2, h3, p, .stat-item, .project-card, .skill-item');
        childElements.forEach(child => {
            child.style.opacity = '0';
            child.style.transform = 'translateY(30px) scale(0.9)';
            child.style.filter = 'blur(2px)';
            child.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        });
        
        sectionObserver.observe(section);
    });
}

function initContactForm() {
    const form = document.querySelector('.contact-form form');
    
    if (form) {
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.style.transform = 'translateY(-2px) scale(1.02)';
                this.style.boxShadow = '0 0 30px rgba(78, 205, 196, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)';
                
                const label = this.previousElementSibling;
                if (label && label.tagName === 'LABEL') {
                    label.style.color = '#4ecdc4';
                    label.style.transform = 'translateY(-2px)';
                }
            });
            
            input.addEventListener('blur', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '';
                
                const label = this.previousElementSibling;
                if (label && label.tagName === 'LABEL') {
                    label.style.color = '';
                    label.style.transform = 'translateY(0)';
                }
            });
            
            input.addEventListener('input', function() {
                if (this.checkValidity()) {
                    this.style.borderColor = '#4ecdc4';
                    this.style.boxShadow = '0 0 15px rgba(78, 205, 196, 0.3)';
                } else {
                    this.style.borderColor = '#ff6b6b';
                    this.style.boxShadow = '0 0 15px rgba(255, 107, 107, 0.3)';
                }
            });
        });
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const button = form.querySelector('.btn');
            const originalText = button.textContent;
            
            button.innerHTML = `
                <span style="display: inline-flex; align-items: center; gap: 10px;">
                    Đang gửi...
                    <div style="width: 20px; height: 20px; border: 2px solid rgba(255,255,255,0.3); border-top: 2px solid #fff; border-radius: 50%; animation: spin 1s linear infinite;"></div>
                </span>
            `;
            button.disabled = true;
            button.style.transform = 'scale(0.95)';
            
            const style = document.createElement('style');
            style.textContent = `
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
            
            setTimeout(() => {
                button.innerHTML = `
                    <span style="display: inline-flex; align-items: center; gap: 10px;">
                        ✨ Đã gửi thành công!
                    </span>
                `;
                button.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                button.style.transform = 'scale(1.05)';
                createSuccessParticles(button);
                
                setTimeout(() => {
                    button.textContent = originalText;
                    button.disabled = false;
                    button.style.background = '';
                    button.style.transform = 'scale(1)';
                    form.reset();
                    inputs.forEach(input => {
                        input.style.borderColor = '';
                        input.style.boxShadow = '';
                    });
                }, 3000);
            }, 2000);
        });
    }
}

function createSuccessParticles(element) {
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        const rect = element.getBoundingClientRect();
        
        particle.style.cssText = `
            position: fixed;
            left: ${rect.left + rect.width/2}px;
            top: ${rect.top + rect.height/2}px;
            width: 6px;
            height: 6px;
            background: linear-gradient(135deg, #10b981, #4ecdc4);
            border-radius: 50%;
            pointer-events: none;
            z-index: 10000;
            animation: successParticle 1.5s ease-out forwards;
        `;
        
        document.body.appendChild(particle);
        
        setTimeout(() => particle.remove(), 1500);
    }
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes successParticle {
            0% {
                opacity: 1;
                transform: scale(1) translate(0, 0);
            }
            100% {
                opacity: 0;
                transform: scale(0) translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px);
            }
        }
    `;
    document.head.appendChild(style);
}

function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px) scale(${1 + scrolled * 0.0001})`;
        }
        
        const body = document.body;
        body.style.backgroundPosition = `${scrolled * 0.1}px ${scrolled * 0.2}px`;
        
        const floatingElements = document.querySelectorAll('.floating-element');
        floatingElements.forEach((element, index) => {
            const speed = 0.1 + (index % 3) * 0.05;
            element.style.transform += ` translateY(${scrolled * speed}px)`;
        });
    });
}

function initPerformanceOptimization() {
    const heavyAnimationElements = document.querySelectorAll('.particle, .floating-element');
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            } else {
                entry.target.style.animationPlayState = 'paused';
            }
        });
    }, { rootMargin: '200px' });
    
    heavyAnimationElements.forEach(element => {
        element.style.animationPlayState = 'paused';
        animationObserver.observe(element);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    createScrollProgress();
    initNavbar();
    initTypingAnimation();
    initSkillBars();
    initProjectCards();
    createParticleSystem();
    createFloatingElements();
    initRippleEffect();
    initSectionReveal();
    initContactForm();
    initParallax();
    initPerformanceOptimization();
    
    document.body.style.opacity = '0';
    document.body.style.filter = 'blur(15px)';
    document.body.style.transform = 'scale(1.02)';
    
    setTimeout(() => {
        document.body.style.transition = 'all 2s cubic-bezier(0.4, 0, 0.2, 1)';
        document.body.style.opacity = '1';
        document.body.style.filter = 'blur(0px)';
        document.body.style.transform = 'scale(1)';
        
        setTimeout(() => {
            console.log('✨ Premium features activated!');
            console.log('🎨 3D effects enabled!');
            console.log('🚀 Advanced animations loaded!');
        }, 1000);
    }, 200);
});

window.addEventListener('load', () => {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    const criticalResources = [
        'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = 'style';
        document.head.appendChild(link);
    });
    
    console.log('🎯 Performance optimizations applied!');
});

const premiumStyles = document.createElement('style');
premiumStyles.textContent = `
    @keyframes gradientFlow {
        0%, 100% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
    }
    
    @keyframes advancedRipple {
        to {
            transform: scale(2.5);
            opacity: 0;
        }
    }
    
    .nav-menu a.active {
        background: linear-gradient(135deg, rgba(255, 107, 107, 0.2), rgba(78, 205, 196, 0.2));
        color: #ffffff;
        box-shadow: 0 0 20px rgba(255, 107, 107, 0.3);
    }
`;
document.head.appendChild(premiumStyles);
