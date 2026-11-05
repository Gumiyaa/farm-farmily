/* ==========================================
   PERTANIAN KELUARGA - MAIN JAVASCRIPT
=========================================== */

document.addEventListener('DOMContentLoaded', function () {

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
    const root = document.documentElement;
    const body = document.body;
    const icon = darkModeToggle.querySelector('i');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function setTheme(isDark) {
        if (isDark) {
            root.setAttribute('data-theme', 'dark');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            darkModeToggle.setAttribute('aria-label', 'Nonaktifkan mode gelap');
            darkModeToggle.setAttribute('aria-pressed', 'true');
            darkModeToggle.title = 'Mode terang';
        } else {
            root.removeAttribute('data-theme');
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            darkModeToggle.setAttribute('aria-label', 'Aktifkan mode gelap');
            darkModeToggle.setAttribute('aria-pressed', 'false');
            darkModeToggle.title = 'Mode gelap';
        }
    }

    // Sinkronkan ikon dengan tema yang sudah dipasang di <head>
    setTheme(root.getAttribute('data-theme') === 'dark');

    darkModeToggle.addEventListener('click', function () {
        var isDark = root.getAttribute('data-theme') === 'dark';
        setTheme(!isDark);
        localStorage.setItem('theme', isDark ? 'light' : 'dark');
    });

    // Ikuti preferensi sistem jika pengguna belum memilih tema
    prefersDark.addEventListener('change', function (e) {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches);
        }
    });

    /* ==========================================
       COUNTER ANIMATION
    =========================================== */
    function animateCounters() {
        var counters = document.querySelectorAll('.stat-number');
        counters.forEach(function (counter) {
            if (counter.dataset.animated === 'true') return;

            var rawTarget = counter.getAttribute('data-target');
            var target = parseFloat(rawTarget);
            var decimals = rawTarget.indexOf('.') !== -1 ? 1 : 0;
            var current = 0;
            var increment = target / 60;
            var duration = 2000;
            var stepTime = duration / 60;

            function updateCounter() {
                current += increment;
                if (current < target) {
                    counter.textContent = decimals ? current.toFixed(1) : Math.ceil(current);
                    setTimeout(updateCounter, stepTime);
                } else {
                    counter.textContent = decimals ? target.toFixed(1) : target;
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
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            offset: 80,
            disable: reduceMotion ? true : 'mobile'
        });
    }

    /* ==========================================
       SWIPER TESTIMONIALS
    =========================================== */
    if (typeof Swiper !== 'undefined' && document.querySelector('.testimonial-swiper')) {
        new Swiper('.testimonial-swiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: reduceMotion ? false : {
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
    }

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

    if (harvestCtx && typeof Chart !== 'undefined') {
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
            var isDark = root.getAttribute('data-theme') === 'dark';
            chartInstance.options.scales.y.grid.color = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)';
            chartInstance.options.scales.y.ticks.color = isDark ? '#B0B0B0' : '#757575';
            chartInstance.options.scales.x.ticks.color = isDark ? '#E8E8E8' : '#212121';
            chartInstance.update();
        }

        updateChartTheme();

        // Observer for dark mode changes
        var darkModeObserver = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                if (mutation.attributeName === 'data-theme') {
                    updateChartTheme();
                }
            });
        });

        darkModeObserver.observe(root, { attributes: true });
    }

    /* ==========================================
       HERO PARTICLES (Floating Leaves)
    =========================================== */
    function createParticles() {
        var container = document.getElementById('heroParticles');
        if (!container || reduceMotion) return;

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
            var targetId = this.getAttribute('href');
            if (targetId === '#') {
                e.preventDefault();
                return;
            }

            var targetEl = document.querySelector(targetId);
            if (!targetEl) return;

            e.preventDefault();
            var offsetTop = targetEl.getBoundingClientRect().top + window.pageYOffset - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: reduceMotion ? 'auto' : 'smooth'
            });

            // Pindahkan fokus untuk pengguna keyboard / screen reader
            targetEl.setAttribute('tabindex', '-1');
            targetEl.focus({ preventScroll: true });

            // Close mobile navbar
            var navbarCollapse = document.getElementById('navbarContent');
            if (navbarCollapse && navbarCollapse.classList.contains('show') && typeof bootstrap !== 'undefined') {
                var bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (bsCollapse) {
                    bsCollapse.hide();
                }
            }
        });
    });

    /* ==========================================
       CONTACT FORM HANDLER (WHATSAPP)
    =========================================== */
    var contactForm = document.getElementById('contactForm');

    if (contactForm) {
        var formStatus = document.getElementById('formStatus');
        var whatsappNumber = (contactForm.dataset.whatsapp || '6281234567890').replace(/\D/g, '');

        function showFormStatus(message, type) {
            if (!formStatus) return;
            formStatus.textContent = message;
            formStatus.className = 'form-status show ' + type;
        }

        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            var name = document.getElementById('contactName').value.trim();
            var email = document.getElementById('contactEmail').value.trim();
            var message = document.getElementById('contactMessage').value.trim();

            if (!name || !email || !message) {
                showFormStatus('Mohon lengkapi nama, email, dan pesan Anda.', 'error');
                return;
            }

            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFormStatus('Mohon masukkan alamat email yang valid.', 'error');
                return;
            }

            var text = 'Halo Pertanian Keluarga,\n\n'
                + 'Nama: ' + name + '\n'
                + 'Email: ' + email + '\n\n'
                + 'Pesan:\n' + message;

            var url = 'https://wa.me/' + whatsappNumber + '?text=' + encodeURIComponent(text);

            // Gunakan anchor agar tetap kompatibel dengan pemblokir popup
            var link = document.createElement('a');
            link.href = url;
            link.target = '_blank';
            link.rel = 'noopener';
            document.body.appendChild(link);
            link.click();
            link.remove();

            showFormStatus('WhatsApp dibuka. Silakan tekan tombol kirim di aplikasi WhatsApp Anda.', 'success');
        });
    }

    /* ==========================================
       FOOTER YEAR
    =========================================== */
    var yearEl = document.getElementById('currentYear');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

});
