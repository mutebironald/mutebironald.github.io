document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Experience role filtering
  const filterChips = document.querySelectorAll('.filter-chip');
  const timelineCards = document.querySelectorAll('.timeline-card');

  filterChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const selected = chip.getAttribute('data-filter');

      filterChips.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');

      timelineCards.forEach((card) => {
        const tags = (card.getAttribute('data-tags') || '').split(' ');
        if (selected === 'all' || tags.includes(selected)) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Clean 1-click PDF resume export
  const printBtn = document.getElementById('printResumeBtn');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      // Ensure all cards are visible before printing
      timelineCards.forEach((card) => {
        card.style.display = '';
      });
      window.print();
    });
  }

  // Copy email button
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', async () => {
      const email = copyEmailBtn.getAttribute('data-email');
      try {
        await navigator.clipboard.writeText(email);
        const originalText = copyEmailBtn.textContent;
        copyEmailBtn.textContent = 'Copied to Clipboard!';
        setTimeout(() => {
          copyEmailBtn.textContent = originalText;
        }, 2000);
      } catch {
        window.location.href = `mailto:${email}`;
      }
    });
  }
});

