  // Pricing toggle
  function setbilling(type, btn) {
    document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.amount').forEach(el => {
      const val = parseInt(el.dataset[type]);
      el.textContent = val.toLocaleString('en-PK');
    });
    document.querySelectorAll('.plan-price-alt').forEach((el, i) => {
      const usd = [18, 36, 72];
      const disc = type === 'yearly' ? ' (20% off!)' : '';
      const monthly = type === 'yearly' ? 'Billed yearly' : 'Billed monthly';
      el.textContent = `${monthly} · ~$${usd[i]} USD${disc}`;
    });
  }

  // Order plan
  function orderPlan(plan) {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      const select = document.querySelector('.contact-form select');
      if (select) {
        select.value = '';
        const msg = document.querySelector('.contact-form textarea');
        if (msg) msg.value = `Hi, I'm interested in the ${plan} plan. Please provide more details.`;
      }
    }, 800);
  }

  // Mobile menu toggle
  function toggleMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('open');
  }

  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 50) {
      nav.style.background = 'rgba(10,10,10,0.97)';
      nav.style.boxShadow = '0 4px 30px rgba(0,0,0,0.5)';
    } else {
      nav.style.background = 'rgba(10,10,10,0.85)';
      nav.style.boxShadow = 'none';
    }
  });

  // Intersection Observer for fade-in
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.service-card, .feat-item, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // Form submit
  function handleSubmit() {
  const name    = document.querySelector('.contact-form input[type="text"]').value.trim();
  const phone   = document.querySelectorAll('.contact-form input[type="text"]')[1].value.trim();
  const email   = document.querySelector('.contact-form input[type="email"]').value.trim();
  const service = document.querySelector('.contact-form select').value;
  const details = document.querySelector('.contact-form textarea').value.trim();

  // Basic validation
  if (!name || !phone) {
    alert('Please enter at least your Name and Phone number.');
    return;
  }

  // Build WhatsApp message
  const message = 
`🎨 *New Project Inquiry — Memon Graphics*

👤 *Name:* ${name}
📱 *Phone:* ${phone}
📧 *Email:* ${email || 'Not provided'}
🖌️ *Service:* ${service || 'Not selected'}

📝 *Project Details:*
${details || 'No details provided'}

_Sent from memongraphics.edgeone.app_`;

  const encoded = encodeURIComponent(message);
  const waURL   = `https://wa.me/923252171357?text=${encoded}`;

  // Open WhatsApp
  window.open(waURL, '_blank');

  // Visual feedback
  const btn = document.querySelector('.btn-submit');
  btn.textContent = '✓ Opening WhatsApp...';
  btn.style.background = '#22c55e';
  btn.style.color = '#fff';
  setTimeout(() => {
    btn.textContent = 'Send Message ✦';
    btn.style.background = '';
    btn.style.color = '';
  }, 3000);
}
