/**
 * Joji Victor - Full Stack Developer Portfolio
 * Main JavaScript Functionality
 */

document.addEventListener('DOMContentLoaded', () => {
  initParticleCanvas();
  initTypewriter();
  initNavbarScroll();
  initThemeToggle();
  initProjectFilters();
  initScrollAnimations();
  initTerminalSandbox();
  initContactForm();
  initBackToTop();
  initLiveIframePreviews();
});

/* ==========================================================================
   1. Interactive Particle Canvas Background
   ========================================================================== */
function initParticleCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = Math.min(Math.floor(window.innerWidth / 20), 60);

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.8,
      vy: (Math.random() - 0.5) * 0.8,
      radius: Math.random() * 2 + 1,
      alpha: Math.random() * 0.5 + 0.2
    });
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Get current accent color for particles
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    const particleColor = isDark ? '99, 102, 241' : '99, 102, 241';
    const lineColor = isDark ? '99, 102, 241' : '168, 85, 247';

    for (let i = 0; i < particles.length; i++) {
      let p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${particleColor}, ${p.alpha})`;
      ctx.fill();

      // Connect nearby particles with subtle lines
      for (let j = i + 1; j < particles.length; j++) {
        let p2 = particles[j];
        let dx = p.x - p2.x;
        let dy = p.y - p2.y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(${lineColor}, ${0.15 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   2. Typewriter Effect for Hero Headline
   ========================================================================== */
function initTypewriter() {
  const target = document.getElementById('typed-output');
  if (!target) return;

  const roles = [
    'Python Django Developer',
    'Web Engineering Specialist',
    'Software Design & IT Consultant',
    'Quality Assurance Professional'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      target.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 40;
    } else {
      target.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 90;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      typeSpeed = 2000; // Pause at full text
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
  }

  type();
}

/* ==========================================================================
   3. Navbar Scroll Behavior & Active Link Highlight
   ========================================================================== */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar-custom');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // ScrollSpy active indicator
    let currentSection = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   4. Dark / Light Theme Toggle
   ========================================================================== */
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;

  const savedTheme = localStorage.getItem('joji_portfolio_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  toggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('joji_portfolio_theme', newTheme);
    updateThemeIcon(newTheme);
  });
}

function updateThemeIcon(theme) {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;
  if (theme === 'light') {
    toggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
    toggleBtn.setAttribute('title', 'Switch to Dark Mode');
  } else {
    toggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    toggleBtn.setAttribute('title', 'Switch to Light Mode');
  }
}

/* ==========================================================================
   5. Filterable Projects Gallery
   ========================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter || category.includes(filter)) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/* ==========================================================================
   6. Scroll Animations for Progress Skill Bars
   ========================================================================== */
function initScrollAnimations() {
  const skillBars = document.querySelectorAll('.progress-bar-gradient');

  function checkBars() {
    skillBars.forEach(bar => {
      const rect = bar.getBoundingClientRect();
      if (rect.top < window.innerHeight - 50) {
        const targetWidth = bar.getAttribute('data-width') || '85%';
        bar.style.width = targetWidth;
      }
    });
  }

  window.addEventListener('scroll', checkBars);
  checkBars(); // Check once on load
}

/* ==========================================================================
   7. Interactive Terminal Sandbox / Code Demo Box
   ========================================================================== */
function initTerminalSandbox() {
  const tabBtns = document.querySelectorAll('.terminal-tab-btn');
  const outputElem = document.getElementById('terminal-output');
  if (!outputElem) return;

  const responses = {
    bio: `// Joji Victor - Developer Profile JSON
{
  "name": "Joji Victor",
  "headline": "✝️ | Python Django Developer |",
  "location": "Kerala, India",
  "mobile": "8530524158",
  "email": "jojivictor309@gmail.com",
  "linkedin": "www.linkedin.com/in/jojivictor-2080b5231",
  "education": "BCA (Don Bosco) & MBA (NMCC)"
}`,
    skills: `// Core Skills & Certifications Breakdown
{
  "top_skills": ["Web Engineering", "Software Design", "IT Consulting"],
  "certifications": [
    "Web Application Developer",
    "UI Engineering",
    "Introduction to Automation testing",
    "QA Internship Talrop",
    "Ethical hacking Webinar"
  ],
  "technologies": ["Python", "Django", "Automation Testing", "HTML5", "CSS3", "JavaScript", "Bootstrap 5"]
}`,
    contact: `// Direct Contact Endpoint for Joji Victor
curl -X POST https://api.jojivictor.dev/v1/contact \\
  -H "Content-Type: application/json" \\
  -d '{"email": "jojivictor309@gmail.com", "mobile": "8530524158"}'

// Response: HTTP 200 OK
{ "status": "Connected!", "message": "Thanks for contacting Joji Victor (Kerala, India)." }`
  };

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const tab = btn.getAttribute('data-tab');
      outputElem.textContent = 'Loading response...';
      setTimeout(() => {
        outputElem.textContent = responses[tab] || responses['bio'];
      }, 150);
    });
  });
}

/* ==========================================================================
   8. Contact Form Handler with Google Sheets Integration
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('portfolio-contact-form');
  const alertContainer = document.getElementById('form-alert-container');
  if (!form) return;

  let isSubmitting = false;

  form.addEventListener('submit', (e) => {
    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    if (!name || !email || !message) {
      e.preventDefault();
      showAlert('Please fill in all required fields.', 'danger');
      return;
    }

    if (isSubmitting) {
      e.preventDefault();
      return;
    }

    isSubmitting = true;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin me-2"></i> Submitting to Google Sheet...';

    // Local Storage instant backup
    try {
      const payload = {
        timestamp: new Date().toLocaleString(),
        name: name,
        email: email,
        subject: (document.getElementById('contact-subject')?.value || 'General Inquiry').trim(),
        message: message
      };
      const existing = JSON.parse(localStorage.getItem('joji_sheet_submissions') || '[]');
      existing.push(payload);
      localStorage.setItem('joji_sheet_submissions', JSON.stringify(existing));
    } catch (err) {
      console.warn('Backup error:', err);
    }

    // Allow native submission to target="hidden_iframe" then show success toast
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      form.reset();
      isSubmitting = false;
      showAlert(`Thank you ${name}! Your message has been submitted and logged to Google Sheets successfully.`, 'success');
    }, 1400);
  });

  function showAlert(msg, type) {
    if (!alertContainer) return;
    alertContainer.innerHTML = `
      <div class="alert alert-${type} alert-dismissible fade show glass-card mt-3 mb-0" role="alert">
        <i class="fa-solid ${type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation'} me-2"></i>
        ${msg}
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
    `;
  }
}

/* ==========================================================================
   9. Back to Top Button
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ==========================================================================
   10. Live Iframe Preview Scaling
   ========================================================================== */
function initLiveIframePreviews() {
  const iframes = document.querySelectorAll('.project-live-iframe');
  if (!iframes.length) return;

  function scaleIframes() {
    iframes.forEach((iframe) => {
      const thumb = iframe.closest('.project-thumb');
      if (!thumb) return;
      const thumbWidth = thumb.offsetWidth;
      const iframeNativeWidth = 1440;
      const scale = thumbWidth / iframeNativeWidth;
      iframe.style.transform = `scale(${scale})`;
    });
  }

  // Scale on load
  scaleIframes();

  // Debounced resize handler
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(scaleIframes, 100);
  });
}
