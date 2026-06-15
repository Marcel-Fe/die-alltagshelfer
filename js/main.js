// Die Alltagshelfer — Landingpage-Interaktionen

// Sticky-Nav: Hintergrund beim Scrollen
const nav = document.getElementById("nav");
const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 12);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Mobiles Menü
const burger = document.getElementById("navBurger");
if (burger) {
  burger.addEventListener("click", () => nav.classList.toggle("open"));
  nav.querySelectorAll(".nav-links a, .nav-cta a").forEach((link) =>
    link.addEventListener("click", () => nav.classList.remove("open"))
  );
}

// Scroll-Reveal per IntersectionObserver
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
);
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// Zähler-Animation in der "Warum"-Sektion
const animateCount = (el) => {
  const target = parseInt(el.dataset.count, 10);
  const suffix = el.dataset.suffix || "";
  const duration = 1400;
  const start = performance.now();
  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};

const countObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        countObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.6 }
);
document.querySelectorAll("[data-count]").forEach((el) => countObserver.observe(el));

// Demo-Formular: Erfolgsmeldung ohne Backend
const form = document.getElementById("demoForm");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    form.querySelector(".form-fields").style.display = "none";
    document.getElementById("formSuccess").style.display = "block";
  });
}

// Video-Platzhalter: Hinweis bei Klick
document.querySelectorAll(".video-frame").forEach((frame) => {
  const open = () => {
    const caption = frame.querySelector(".vf-caption");
    if (caption) caption.textContent = "Produktvideo folgt in Kürze";
  };
  frame.addEventListener("click", open);
  frame.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      open();
    }
  });
});
