document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // DOM Elements
  // ==========================================================================
  const body = document.body;
  const html = document.documentElement;
  
  // Theme Switchers
  const themeToggleBtn = document.getElementById('theme-toggle');
  
  // Mode Switchers (multiple lists of elements for nav and body widgets)
  const academiaBtns = document.querySelectorAll('.switch-academia');
  const industryBtns = document.querySelectorAll('.switch-industry');
  
  // Mobile Nav
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const navLinksContainer = document.querySelector('.nav-links');
  const navLinks = document.querySelectorAll('.nav-link');
  
  // Publications Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const pubCards = document.querySelectorAll('.pub-card');

  // Animated elements when mode changes
  const modeDependentElements = document.querySelectorAll('.mode-dependent');

  // ==========================================================================
  // Theme Toggle Logic (Light / Dark)
  // ==========================================================================
  const initTheme = () => {
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme) {
      html.setAttribute('data-theme', savedTheme);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      html.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    }
  };

  const toggleTheme = () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
  };

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }

  // ==========================================================================
  // Mode Toggle Logic (Academic / Industry)
  // ==========================================================================
  const setMode = (mode) => {
    // 1. Update Body classes
    if (mode === 'academia') {
      body.classList.remove('mode-industry');
      body.classList.add('mode-academia');
      
      // Update toggle buttons states
      academiaBtns.forEach(btn => btn.classList.add('active'));
      industryBtns.forEach(btn => btn.classList.remove('active'));
    } else {
      body.classList.remove('mode-academia');
      body.classList.add('mode-industry');
      
      // Update toggle buttons states
      academiaBtns.forEach(btn => btn.classList.remove('active'));
      industryBtns.forEach(btn => btn.classList.add('active'));
    }
    
    // 2. Save preference
    localStorage.setItem('portfolio-mode', mode);
    
    // 3. Trigger micro-animations on dependent elements
    modeDependentElements.forEach(el => {
      el.classList.remove('mode-fade-in');
      void el.offsetWidth; // Force CSS reflow to restart animation
      el.classList.add('mode-fade-in');
    });
  };

  const initMode = () => {
    const savedMode = localStorage.getItem('portfolio-mode') || 'academia';
    setMode(savedMode);
  };

  // Add click handlers for all switch buttons
  academiaBtns.forEach(btn => {
    btn.addEventListener('click', () => setMode('academia'));
  });
  
  industryBtns.forEach(btn => {
    btn.addEventListener('click', () => setMode('industry'));
  });

  // ==========================================================================
  // Mobile Navigation Menu Toggle
  // ==========================================================================
  if (mobileNavToggle && navLinksContainer) {
    mobileNavToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      navLinksContainer.classList.toggle('open');
      
      // Change icon simple toggle
      const isOpen = navLinksContainer.classList.contains('open');
      mobileNavToggle.innerHTML = isOpen 
        ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>'
        : '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>';
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (navLinksContainer.classList.contains('open') && !navLinksContainer.contains(e.target) && !mobileNavToggle.contains(e.target)) {
        navLinksContainer.classList.remove('open');
        mobileNavToggle.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>';
      }
    });
  }

  // Close menu when clicking navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navLinksContainer && navLinksContainer.classList.contains('open')) {
        navLinksContainer.classList.remove('open');
        mobileNavToggle.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>';
      }
    });
  });

  // ==========================================================================
  // Publications Filter
  // ==========================================================================
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active from other buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const filterValue = btn.getAttribute('data-filter');
      
      pubCards.forEach(card => {
        const categories = card.getAttribute('data-category').split(' ');
        
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'grid';
          // Re-trigger animation
          card.classList.remove('mode-fade-in');
          void card.offsetWidth;
          card.classList.add('mode-fade-in');
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // ==========================================================================
  // Intersection Observer for Active Nav Highlighting
  // ==========================================================================
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px', // Trigger when section occupies core viewport
    threshold: 0
  };

  const observerCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);
  
  // Track all sections
  document.querySelectorAll('section[id]').forEach(sec => {
    observer.observe(sec);
  });

  // ==========================================================================
  // Image Fallback Handling
  // ==========================================================================
  const avatarImg = document.querySelector('.avatar-img');
  const avatarFallback = document.querySelector('.avatar-fallback');
  
  if (avatarImg && avatarFallback) {
    avatarImg.addEventListener('error', () => {
      // If image fails to load (e.g. not copied yet), swap to fallback
      avatarImg.style.display = 'none';
      avatarFallback.style.display = 'flex';
    });
    
    // Double check if empty or broken src
    if (!avatarImg.getAttribute('src') || avatarImg.getAttribute('src') === '') {
      avatarImg.style.display = 'none';
      avatarFallback.style.display = 'flex';
    }
  }

  // ==========================================================================
  // Initialization
  // ==========================================================================
  initTheme();
  initMode();
});
