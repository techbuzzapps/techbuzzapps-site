/* =========================================================
   common.js — shared site behaviour (vanilla JS, no deps)

   1. Shared components
      <div data-component="site-header"></div> is replaced by
      the markup in /components/site-header.html (same for any
      other name). Each component file is requested once per
      page, however many placeholders use it.

      Legacy: <div id="navbar"></div> on the Dharma Connect /
      Simply Inspiring pages is still filled with
      /components/navbar.html exactly as before.

   2. Primary navigation state
      Marks the nav link for the current page/section with
      aria-current once the header has been inserted.

   3. Article "On this page" highlighting
      Progressive enhancement only — articles are fully
      readable without it.

   Page content and SEO metadata always live in the HTML
   document itself; only shared chrome is loaded here.
========================================================= */

(() => {
  'use strict';

  const COMPONENT_ROOT = '/components/';
  const requests = new Map();

  const fetchComponent = (name) => {
    if (!requests.has(name)) {
      requests.set(name, fetch(`${COMPONENT_ROOT}${name}.html`).then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.text();
      }));
    }
    return requests.get(name);
  };

  const markCurrentNav = () => {
    const path = window.location.pathname.replace(/index\.html$/, '');

    document.querySelectorAll('.top-nav a[href], .footer-nav a[href]').forEach((link) => {
      const href = link.getAttribute('href');
      if (href === path) {
        link.setAttribute('aria-current', 'page');
      } else if (href !== '/' && path.startsWith(href)) {
        link.setAttribute('aria-current', 'true');
      }
    });
  };

  const loadComponents = () => {
    const placeholders = document.querySelectorAll('[data-component]');

    const loads = Array.from(placeholders, (placeholder) => {
      const name = placeholder.dataset.component;
      if (!/^[a-z0-9-]+$/.test(name)) return Promise.resolve();

      return fetchComponent(name)
        .then((html) => {
          const template = document.createElement('template');
          template.innerHTML = html.trim();
          placeholder.replaceWith(template.content);
        })
        .catch((error) => {
          console.warn(`[common.js] Could not load component "${name}":`, error);
          placeholder.remove();
        });
    });

    Promise.all(loads).then(markCurrentNav);

    const legacyNavbar = document.getElementById('navbar');
    if (legacyNavbar) {
      fetchComponent('navbar')
        .then((html) => { legacyNavbar.innerHTML = html; })
        .catch((error) => console.warn('[common.js] Could not load navbar:', error));
    }
  };

  const highlightTableOfContents = () => {
    const toc = document.querySelector('[data-toc]');
    if (!toc || !('IntersectionObserver' in window)) return;

    const links = new Map();
    toc.querySelectorAll('a[href^="#"]').forEach((link) => {
      const target = document.getElementById(decodeURIComponent(link.hash.slice(1)));
      if (target) links.set(target, link);
    });
    if (!links.size) return;

    const visible = new Set();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      });

      const headings = Array.from(links.keys());
      const current = headings.find((heading) => visible.has(heading));
      if (!current) return;

      links.forEach((link, heading) => link.classList.toggle('is-active', heading === current));
    }, { rootMargin: '-80px 0px -60% 0px' });

    links.forEach((link, heading) => observer.observe(heading));
  };

  const init = () => {
    loadComponents();
    highlightTableOfContents();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
