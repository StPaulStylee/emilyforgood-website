// Contact form: sends to Formspree without leaving the page and shows a friendly message.
const form = document.getElementById('contact-form');
const statusEl = document.getElementById('form-status');

if (form && statusEl) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    statusEl.className = 'form-status';

    // Not connected yet: the action still has the placeholder id.
    if (form.action.includes('YOUR_FORM_ID')) {
      statusEl.textContent = 'This form is not connected yet, so nothing was sent. (Setup step still to do.)';
      statusEl.classList.add('error');
      return;
    }

    const button = form.querySelector('button[type="submit"]');
    button.disabled = true;
    statusEl.textContent = 'Sending…';

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        form.reset();
        statusEl.textContent = 'Thank you! Your message is on its way. I will be in touch soon.';
        statusEl.classList.add('success');
      } else {
        throw new Error('Request failed');
      }
    } catch (err) {
      statusEl.textContent = 'Sorry, something went wrong. Please try again in a moment.';
      statusEl.classList.add('error');
    } finally {
      button.disabled = false;
    }
  });
}
