const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const tabs = document.querySelectorAll("[data-tab]");
const menuCategories = document.querySelectorAll(".menu-category[data-panel]");
const revealItems = document.querySelectorAll(".reveal");

function updateHeader() {
  header?.classList.toggle("scrolled", window.scrollY > 50);
}

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

navToggle?.addEventListener("click", () => {
  nav?.classList.toggle("open");
  const isOpen = nav?.classList.contains("open");
  navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
});

nav?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    nav.classList.remove("open");
    navToggle?.setAttribute("aria-label", "Open menu");
  }
});

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.tab;

    tabs.forEach((item) => item.classList.toggle("active", item === tab));
    menuCategories.forEach((category) => {
      const showCategory = target === "all" || category.dataset.panel === target;
      category.classList.toggle("is-hidden", !showCategory);
    });
  });
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealItems.forEach((item) => revealObserver.observe(item));

window.addEventListener("load", () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }
});
