/* ==========================================
   PERTANIAN KELUARGA - MAIN JAVASCRIPT
=========================================== */

document.addEventListener('DOMContentLoaded', function () {

    /* ==========================================
       LOADING SCREEN
    =========================================== */
    const loadingScreen = document.getElementById('loadingScreen');

    window.addEventListener('load', function () {
        setTimeout(function () {
            loadingScreen.classList.add('hidden');
        }, 1800);
    });

    // Fallback: hide loader after 3s even if images not fully loaded
    setTimeout(function () {
        loadingScreen.classList.add('hidden');
    }, 3000);

    /* ==========================================
       SCROLL PROGRESS BAR
    =========================================== */
    const scrollProgress = document.getElementById('scrollProgress');

    function updateScrollProgress() {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        var docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        var scrollPercent = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = scrollPercent + '%';
    }

    /* ==========================================
       NAVBAR SCROLL EFFECT
    =========================================== */
    const navbar = document.getElementById('mainNav');

    function updateNavbar() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    /* ==========================================
       ACTIVE NAVBAR LINK ON SCROLL
    =========================================== */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    function updateActiveNav() {
        var scrollPos = window.scrollY + 150;

        sections.forEach(function (section) {
            var sectionTop = section.offsetTop;
            var sectionHeight = section.offsetHeight;
            var sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(function (link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    /* ==========================================
       BACK TO TOP BUTTON
    =========================================== */
    const backToTop = document.getElementById('backToTop');

    function updateBackToTop() {
        if (window.scrollY > 400) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    /* ==========================================
       COMBINED SCROLL EVENT (Performance)
    =========================================== */
    var scrollTicking = false;

    window.addEventListener('scroll', function () {
        if (!scrollTicking) {
            window.requestAnimationFrame(function () {
                updateScrollProgress();
                updateNavbar();
                updateActiveNav();
                updateBackToTop();
                scrollTicking = false;
            });
            scrollTicking = true;
        }
    });

    // Initial call on page load
    updateScrollProgress();
    updateNavbar();
    updateActiveNav();
    updateBackToTop();

    /* ==========================================
       DARK MODE TOGGLE
    =========================================== */
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    const icon = darkModeToggle.querySelector('i');

    // Check saved preference
    if (localStorage.getItem('theme') === 'dark') {
        body.setAttribute('data-theme', 'dark');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }

    darkModeToggle.addEventListener('click', function () {
        if (body.getAttribute('data-theme') === 'dark') {
            body.removeAttribute('data-theme');
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        } else {
            body.setAttribute('data-theme', 'dark');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        }
    });

    /* ==========================================
       COUNTER ANIMATION
    =========================================== */
    function animateCounters() {
        var counters = document.querySelectorAll('.stat-number');
        counters.forEach(function (counter) {
            if (counter.dataset.animated === 'true') return;

            var target = parseInt(counter.getAttribute('data-target'));
            var current = 0;
            var increment = target / 60;
            var duration = 2000;
            var stepTime = duration / 60;

            function updateCounter() {
                current += increment;
                if (current < target) {
                    counter.textContent = Math.ceil(current);
                    setTimeout(updateCounter, stepTime);
                } else {
                    counter.textContent = target;
                }
            }

            updateCounter();
            counter.dataset.animated = 'true';
        });
    }

    // Trigger counter when panen section is in view
    var panenSection = document.getElementById('panen');
    var counterObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                animateCounters();
            }
        });
    }, { threshold: 0.3 });

    if (panenSection) {
        counterObserver.observe(panenSection);
    }

    /* ==========================================
       AOS (Animate On Scroll) INIT
    =========================================== */
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 80,
        disable: 'mobile'
    });

    /* ==========================================
       SWIPER TESTIMONIALS
    =========================================== */
    new Swiper('.testimonial-swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
        },
    });

    /* ==========================================
       LIGHTBOX CONFIG
    =========================================== */
    if (typeof lightbox !== 'undefined') {
        lightbox.option({
            'resizeDuration': 200,
            'wrapAround': true,
            'fadeDuration': 300,
            'imageFadeDuration': 300,
            'alwaysShowNavOnTouchDevices': true,
        });
    }

    /* ==========================================
       CHART.JS - HASIL PANEN
    =========================================== */
    var harvestCtx = document.getElementById('harvestChart');

    if (harvestCtx) {
        var chartInstance = new Chart(harvestCtx.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['2022', '2023', '2024', '2025'],
                datasets: [{
                    label: 'Hasil Panen (Ton)',
                    data: [2.5, 3, 3.8, 4.2],
                    backgroundColor: [
                        'rgba(46, 125, 50, 0.7)',
                        'rgba(76, 175, 80, 0.7)',
                        'rgba(139, 195, 74, 0.7)',
                        'rgba(255, 167, 38, 0.7)',
                    ],
                    borderColor: [
                        'rgba(46, 125, 50, 1)',
                        'rgba(76, 175, 80, 1)',
                        'rgba(139, 195, 74, 1)',
                        'rgba(255, 167, 38, 1)',
                    ],
                    borderWidth: 2,
                    borderRadius: 10,
                    borderSkipped: false,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            font: {
                                family: "'Poppins', sans-serif",
                                size: 13,
                            },
                            usePointStyle: true,
                            padding: 20,
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0,0,0,0.8)',
                        titleFont: {
                            family: "'Poppins', sans-serif",
                        },
                        bodyFont: {
                            family: "'Poppins', sans-serif",
                        },
                        padding: 12,
                        cornerRadius: 8,
                        callbacks: {
                            label: function (context) {
                                return context.parsed.y + ' Ton';
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 5,
                        ticks: {
                            stepSize: 1,
                            callback: function (value) {
                                return value + ' Ton';
                            },
                            font: {
                                family: "'Poppins', sans-serif",
                            }
                        },
                        grid: {
                            color: 'rgba(0,0,0,0.05)',
                        }
                    },
                    x: {
                        ticks: {
                            font: {
                                family: "'Poppins', sans-serif",
                                weight: '600',
                            }
                        },
                        grid: {
                            display: false,
                        }
                    }
                }
            }
        });

        // Update chart colors for dark mode
        function updateChartTheme() {
            var isDark = body.getAttribute('data-theme') === 'dark';
            chartInstance.options.scales.y.grid.color = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)';
            chartInstance.options.scales.y.ticks.color = isDark ? '#B0B0B0' : '#757575';
            chartInstance.options.scales.x.ticks.color = isDark ? '#E8E8E8' : '#212121';
            chartInstance.update();
        }

        // Observer for dark mode changes
        var darkModeObserver = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                if (mutation.attributeName === 'data-theme') {
                    updateChartTheme();
                }
            });
        });

        darkModeObserver.observe(body, { attributes: true });
    }

    /* ==========================================
       HERO PARTICLES (Floating Leaves)
    =========================================== */
    function createParticles() {
        var container = document.getElementById('heroParticles');
        if (!container) return;

        for (var i = 0; i < 15; i++) {
            var particle = document.createElement('div');
            particle.classList.add('hero-particle');
            var size = Math.random() * 15 + 5;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
            particle.style.animationDelay = (Math.random() * 5) + 's';
            container.appendChild(particle);
        }
    }

    createParticles();

    /* ==========================================
       SMOOTH SCROLL FOR ANCHOR LINKS
    =========================================== */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;

            var targetEl = document.querySelector(targetId);
            if (targetEl) {
                var offsetTop = targetEl.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Close mobile navbar
                var navbarCollapse = document.getElementById('navbarContent');
                if (navbarCollapse.classList.contains('show')) {
                    var bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                    if (bsCollapse) {
                        bsCollapse.hide();
                    }
                }
            }
        });
    });

    /* ==========================================
       CONTACT FORM HANDLER
    =========================================== */
    var contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            var name = document.getElementById('contactName').value.trim();
            var email = document.getElementById('contactEmail').value.trim();
            var message = document.getElementById('contactMessage').value.trim();

            if (!name || !email || !message) {
                alert('Mohon lengkapi semua kolom formulir!');
                return;
            }

            // Simple email validation
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Mohon masukkan alamat email yang valid!');
                return;
            }

            // Success (in production, send to server)
            alert('Terima kasih, ' + name + '! Pesan Anda telah berhasil dikirim. Kami akan segera menghubungi Anda.');
            contactForm.reset();
        });
    }

});
