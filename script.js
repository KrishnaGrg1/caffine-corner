const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const tabs = document.querySelectorAll("[data-tab]");
const menuCategories = document.querySelectorAll(".menu-category[data-panel]");
const revealItems = document.querySelectorAll(".reveal");

function showMenuCategory(target = "all") {
  tabs.forEach((tab) => tab.classList.toggle("active", tab.dataset.tab === target));
  menuCategories.forEach((category) => {
    const showCategory = target === "all" || category.dataset.panel === target;
    category.classList.toggle("is-hidden", !showCategory);
  });
}

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
    showMenuCategory(tab.dataset.tab);
  });
});

showMenuCategory(document.querySelector(".tab.active")?.dataset.tab);

if ("IntersectionObserver" in window) {
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
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

window.addEventListener("load", () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }
});
