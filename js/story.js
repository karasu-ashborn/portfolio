(() => {
  const story = document.querySelector("#story");
  if (!story) return;

  const steps = Array.from(story.querySelectorAll(".step"));
  const slides = Array.from(story.querySelectorAll(".screen-slide"));

  let current = 0;
  let rafLock = false;

  function setActive(i) {
    if (i === current) return;

    // sécurité (si jamais index hors range)
    i = Math.max(0, Math.min(i, steps.length - 1));
    current = i;

    steps.forEach((s, idx) => s.classList.toggle("is-active", idx === i));
    slides.forEach((s, idx) => s.classList.toggle("is-active", idx === i));
  }

  // Choix du step le plus "dominant" dans la zone centrale
  function pickBest(entries) {
    const visible = entries
      .filter(e => e.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return null;

    const idx = Number(visible.target.dataset.step);
    return Number.isFinite(idx) ? idx : null;
  }

  const io = new IntersectionObserver(
    (entries) => {
      const idx = pickBest(entries);
      if (idx === null) return;

      // micro lissage: évite de spam quand tu scroll vite
      if (rafLock) return;
      rafLock = true;

      requestAnimationFrame(() => {
        setActive(idx);
        rafLock = false;
      });
    },
    {
      root: null,
      // plus de points = transitions plus stables
      threshold: [0.15, 0.3, 0.45, 0.6, 0.75],
      // zone centrale style Apple : le step devient actif quand il est "au centre"
      rootMargin: "-35% 0px -50% 0px",
    }
  );

  steps.forEach(step => io.observe(step));

  // état initial
  setActive(0);

  // fallback: si l'utilisateur recharge au milieu de la page
  window.addEventListener("load", () => {
    const rects = steps.map(s => s.getBoundingClientRect());
    const centerY = window.innerHeight * 0.45;

    let best = 0;
    let bestDist = Infinity;

    rects.forEach((r, i) => {
      const mid = (r.top + r.bottom) / 2;
      const dist = Math.abs(mid - centerY);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });

    setActive(best);
  }, { once: true });
})();
