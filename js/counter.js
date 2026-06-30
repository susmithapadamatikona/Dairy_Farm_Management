const counters = document.querySelectorAll("[data-counter]");

function animateCounter(counter) {
  const target = Number(counter.dataset.counter || "0");
  const suffix = counter.dataset.suffix || "";
  const format = counter.dataset.format || "number";
  const duration = 1400;
  const start = performance.now();

  function formatValue(value, progress) {
    const number = format === "compact" && value >= 1000
      ? `${Math.round(value / 1000)}K`
      : value.toLocaleString();
    return `${number}${progress === 0 ? "" : suffix}`;
  }

  counter.textContent = "0";

  function frame(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    counter.textContent = formatValue(Math.round(target * eased), progress);
    if (progress < 1) requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}

if ("IntersectionObserver" in window) {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.35 });
  counters.forEach((counter) => counterObserver.observe(counter));
} else {
  counters.forEach(animateCounter);
}
