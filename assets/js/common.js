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
      aria-current once the header has been inserted. A link is
      the current page when its href matches exactly, and the
      current section when the path starts with its href or with
      any prefix in its optional data-section attribute (used
      because Learn lives at "/" while its pages live under
      /learn/).

   3. Article "On this page" highlighting
      Progressive enhancement only — articles are fully
      readable without it.

   4. Code block Copy buttons
      Every <pre><code> (any language) is wrapped in
      <div class="code-block"> with its own Copy button.
      Diagrams (<figure class="diagram"><pre>) contain no
      <code> and are never enhanced. Safe to run repeatedly.

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
      const sections = (link.dataset.section || '').split(/\s+/).filter(Boolean);
      if (href !== '/') sections.push(href);
      if (href === path) {
        link.setAttribute('aria-current', 'page');
      } else if (sections.some((prefix) => path.startsWith(prefix))) {
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

  const copyText = async (text) => {
    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (_) {
        // Some browsers expose the API but block it outside a secure context.
      }
    }

    const previousFocus = document.activeElement;
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.className = 'visually-hidden';
    document.body.append(textarea);
    textarea.select();

    let copied = false;
    try {
      copied = document.execCommand('copy');
    } catch (_) {
      copied = false;
    } finally {
      textarea.remove();
      if (previousFocus && typeof previousFocus.focus === 'function') previousFocus.focus();
    }
    return copied;
  };

  // One shared, visually hidden status region per page announces each
  // copy result once, instead of making every button a live region.
  let copyStatus;
  const announceCopy = (message) => {
    if (!copyStatus) {
      copyStatus = document.createElement('div');
      copyStatus.className = 'visually-hidden';
      copyStatus.setAttribute('role', 'status');
      document.body.append(copyStatus);
    }
    // Clear first so a repeated identical message is announced again.
    copyStatus.textContent = '';
    window.setTimeout(() => { copyStatus.textContent = message; }, 100);
  };

  const createCopyIcon = () => {
    const svgNamespace = 'http://www.w3.org/2000/svg';
    const icon = document.createElementNS(svgNamespace, 'svg');
    icon.setAttribute('viewBox', '0 0 24 24');
    icon.setAttribute('aria-hidden', 'true');
    icon.setAttribute('focusable', 'false');
    icon.setAttribute('fill', 'none');
    icon.setAttribute('stroke', 'currentColor');
    icon.setAttribute('stroke-width', '2');
    icon.setAttribute('stroke-linecap', 'round');
    icon.setAttribute('stroke-linejoin', 'round');

    const front = document.createElementNS(svgNamespace, 'rect');
    front.setAttribute('x', '8');
    front.setAttribute('y', '8');
    front.setAttribute('width', '14');
    front.setAttribute('height', '14');
    front.setAttribute('rx', '2');

    const back = document.createElementNS(svgNamespace, 'path');
    back.setAttribute('d', 'M16 8V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h4');
    icon.append(back, front);
    return icon;
  };

  const renderCopyButton = (button, state) => {
    if (state === 'idle') {
      button.replaceChildren(createCopyIcon(), document.createTextNode('Copy'));
      return;
    }

    if (state === 'copied') {
      const tick = document.createElement('span');
      tick.setAttribute('aria-hidden', 'true');
      tick.textContent = '✓';
      button.replaceChildren(tick, document.createTextNode('Copied'));
      return;
    }

    button.textContent = 'Copy failed';
  };

  const enhanceCodeBlocks = () => {
    document.querySelectorAll('pre > code').forEach((code) => {
      const pre = code.parentElement;
      if (!pre || pre.dataset.copyEnhanced === 'true' || pre.closest('.diagram')) return;

      const wrapper = document.createElement('div');
      wrapper.className = 'code-block';
      const button = document.createElement('button');
      button.className = 'code-copy-button';
      button.type = 'button';
      renderCopyButton(button, 'idle');

      let resetTimer;
      button.addEventListener('click', async () => {
        clearTimeout(resetTimer);
        const copied = await copyText(code.textContent);
        renderCopyButton(button, copied ? 'copied' : 'failed');
        button.classList.toggle('is-copied', copied);
        button.classList.toggle('is-failed', !copied);
        announceCopy(copied ? 'Code copied to clipboard' : 'Copy failed');
        resetTimer = window.setTimeout(() => {
          renderCopyButton(button, 'idle');
          button.classList.remove('is-copied', 'is-failed');
        }, 2000);
      });

      pre.before(wrapper);
      wrapper.append(button, pre);
      pre.dataset.copyEnhanced = 'true';
    });
  };

  const init = () => {
    loadComponents();
    highlightTableOfContents();
    enhanceCodeBlocks();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
