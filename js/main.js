// This file contains the JavaScript for the portfolio website. It handles the mobile menu, project filtering, and email copy button and form submission.


// Mobile menu: open and close
const btn = document.getElementById('menu-btn');
const menu = document.getElementById('mobile-menu');
btn.addEventListener('click', () => {
  const open = menu.classList.toggle('hidden') === false;
  btn.setAttribute('aria-expanded', open);
});
menu.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    menu.classList.add('hidden');
    btn.setAttribute('aria-expanded', false);
  })
);

// Project filter buttons
const filterButtons = document.querySelectorAll('[data-filter]');
const projectCards = document.querySelectorAll('[data-tech]');
const activeClasses = ['bg-blue-700', 'text-white', 'border-blue-700'];
const idleClasses = ['bg-white', 'text-slate-800', 'border-slate-300'];

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    const chosen = button.dataset.filter;

    // Show or hide each project
    projectCards.forEach(card => {
      const languages = card.dataset.tech.split(' ');
      const show = chosen === 'all' || languages.includes(chosen);
      card.classList.toggle('hidden', !show);
    });

    // Highlight the chosen button
    filterButtons.forEach(other => {
      const isChosen = other === button;
      other.classList.remove(...(isChosen ? idleClasses : activeClasses));
      other.classList.add(...(isChosen ? activeClasses : idleClasses));
      other.setAttribute('aria-pressed', isChosen);
    });
  });
});

// Email: copy button and message form
// The email address is read from the link above, so you only change it in one place.
const emailLink = document.getElementById('email-link');
const copyBtn = document.getElementById('copy-email');
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

copyBtn.addEventListener('click', () => {
  navigator.clipboard.writeText(emailLink.textContent.trim())
    .then(() => { copyBtn.textContent = 'Copied!'; })
    .catch(() => { copyBtn.textContent = 'Copy failed'; });
  setTimeout(() => { copyBtn.textContent = 'Copy'; }, 2000);
});

form.addEventListener('submit', event => {
  event.preventDefault();
  const name = form.elements.name.value.trim();
  const from = form.elements.from.value.trim();
  const message = form.elements.message.value.trim();

  const subject = 'Portfolio message from ' + name;
  const body = message + '\n\nFrom: ' + name + ' (' + from + ')';
  const to = emailLink.textContent.trim();

  window.location.href =
    'mailto:' + to +
    '?subject=' + encodeURIComponent(subject) +
    '&body=' + encodeURIComponent(body);

  status.textContent = 'Opening your email app. If nothing opens, copy my email above and send your message there.';
});

// Your new code goes below this line