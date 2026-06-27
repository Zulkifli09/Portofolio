// Project Data
// Anda dapat dengan mudah menambahkan proyek baru ke dalam array ini.
const projectsData = [
    {
        id: 1,
        title: "E-Commerce Dashboard",
        category: "web",
        description: "Dashboard analitik komprehensif untuk mengelola penjualan, inventaris, dan data pelanggan dengan visualisasi interaktif.",
        tech: ["React", "Tailwind", "Node.js", "Chart.js"],
        imageIcon: "ph-chart-line-up",
        demoLink: "#",
        repoLink: "https://github.com/Zulkifli09"
    },
    {
        id: 2,
        title: "Fintech Mobile App",
        category: "ui",
        description: "Desain antarmuka pengguna untuk aplikasi perbankan digital. Fokus pada kemudahan penggunaan dan keamanan visual.",
        tech: ["Figma", "UI/UX", "Prototyping"],
        imageIcon: "ph-device-mobile",
        demoLink: "#",
        repoLink: "https://github.com/Zulkifli09"
    },
    {
        id: 3,
        title: "Sistem Informasi Akademik",
        category: "web",
        description: "Platform manajemen data universitas terintegrasi untuk mahasiswa, dosen, dan staf administrasi.",
        tech: ["PHP", "Laravel", "MySQL", "Bootstrap"],
        imageIcon: "ph-student",
        demoLink: "#",
        repoLink: "https://github.com/Zulkifli09"
    },
    {
        id: 4,
        title: "Portfolio Premium Template",
        category: "ui",
        description: "Konsep desain portofolio modern dengan gaya glassmorphism dan animasi tingkat lanjut.",
        tech: ["Figma", "Web Design"],
        imageIcon: "ph-paint-brush-broad",
        demoLink: "#",
        repoLink: "https://github.com/Zulkifli09"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    // 1. Custom Cursor
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    // Only enable custom cursor on non-touch devices
    if (window.matchMedia("(pointer: fine)").matches) {
        document.body.classList.add('custom-cursor-active');
        
        let mouseX = 0;
        let mouseY = 0;
        let outlineX = 0;
        let outlineY = 0;
        
        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Dot follows instantly
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
        });
        
        // Smooth trailing effect for outline
        function animateOutline() {
            let distX = mouseX - outlineX;
            let distY = mouseY - outlineY;
            
            outlineX += distX * 0.2; // Adjust speed of trail
            outlineY += distY * 0.2;
            
            cursorOutline.style.left = `${outlineX}px`;
            cursorOutline.style.top = `${outlineY}px`;
            
            requestAnimationFrame(animateOutline);
        }
        animateOutline();

        // Hover effect for interactive elements
        const interactives = document.querySelectorAll('a, button, .project-card, .service-item, .filter-btn, input, textarea');
        interactives.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorOutline.style.backgroundColor = 'rgba(138, 43, 226, 0.4)';
                cursorDot.style.transform = 'translate(-50%, -50%) scale(0.5)';
            });
            el.addEventListener('mouseleave', () => {
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorOutline.style.backgroundColor = 'rgba(138, 43, 226, 0.1)';
                cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
            });
        });
    }

    // 2. Navbar Scroll Effect & Mobile Menu
    const navbar = document.getElementById('navbar');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Active link switching
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').includes(current)) {
                item.classList.add('active');
            }
        });
    });

    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        const icon = mobileToggle.querySelector('i');
        if (navLinks.classList.contains('nav-active')) {
            icon.classList.replace('ph-list', 'ph-x');
        } else {
            icon.classList.replace('ph-x', 'ph-list');
        }
    });

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('nav-active');
            mobileToggle.querySelector('i').classList.replace('ph-x', 'ph-list');
        });
    });

    // 3. Render Projects
    const projectsGrid = document.getElementById('projects-grid');
    
    function renderProjects(filter = 'all') {
        projectsGrid.innerHTML = '';
        
        const filteredProjects = filter === 'all' 
            ? projectsData 
            : projectsData.filter(p => p.category === filter);
            
        filteredProjects.forEach((project, index) => {
            const techHTML = project.tech.map(t => `<span>${t}</span>`).join('');
            
            const card = document.createElement('div');
            card.className = 'project-card';
            // Staggered delay based on index
            card.style.transitionDelay = `${index * 100}ms`;
            
            card.innerHTML = `
                <div class="project-img">
                    <i class="ph-duotone ${project.imageIcon}"></i>
                </div>
                <div class="project-content">
                    <div class="project-category">${project.category === 'web' ? 'Web App' : 'UI Design'}</div>
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-desc">${project.description}</p>
                    <div class="project-tech">
                        ${techHTML}
                    </div>
                    <div class="project-links">
                        <a href="${project.demoLink}" class="project-link">
                            <i class="ph ph-link"></i> Live Demo
                        </a>
                        <a href="${project.repoLink}" target="_blank" class="project-link">
                            <i class="ph ph-github-logo"></i> Source
                        </a>
                    </div>
                </div>
            `;
            
            projectsGrid.appendChild(card);
            
            // Trigger animation shortly after rendering
            setTimeout(() => {
                card.classList.add('visible');
            }, 50);
        });
    }

    renderProjects();

    // 4. Project Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            // Fade out current projects
            const currentCards = document.querySelectorAll('.project-card');
            currentCards.forEach(card => {
                card.classList.remove('visible');
            });
            
            // Wait for fade out, then render new
            setTimeout(() => {
                renderProjects(filterValue);
            }, 300);
        });
    });

    // 5. Scroll Reveal Animations (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: stop observing once revealed
                // observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));
    
    // Auto-update year in footer
    document.getElementById('year').textContent = new Date().getFullYear();
});
