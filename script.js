// Tahun footer otomatis
document.querySelector("footer span").textContent =
  `© ${new Date().getFullYear()} GALIH TEGAR AS'ABIMAN`;

// Mode warna disimpan agar tetap sama di semua halaman portfolio
const themeToggle = document.querySelector(".theme-toggle");
const themeIcon = document.querySelector(".theme-icon");
const savedTheme = localStorage.getItem("portfolio-theme");
const initialTheme = savedTheme === "light" ? "light" : "dark";

document.documentElement.dataset.theme = initialTheme;

function updateThemeButton(theme) {
  const isLight = theme === "light";
  themeToggle.setAttribute("aria-pressed", String(isLight));
  themeToggle.setAttribute("aria-label", `Ganti ke mode ${isLight ? "gelap" : "terang"}`);
  themeIcon.src = isLight ? "moon_icon.png" : "sun_icon.png";
}

updateThemeButton(initialTheme);

themeToggle.addEventListener("click", () => {
  const nextTheme = document.documentElement.dataset.theme === "light" ? "dark" : "light";
  document.documentElement.dataset.theme = nextTheme;
  localStorage.setItem("portfolio-theme", nextTheme);
  updateThemeButton(nextTheme);
});

// Menu navigasi ringkas untuk tampilan ponsel
const menuToggle = document.querySelector(".menu-toggle");
const siteMenu = document.querySelector("#site-menu");

function closeMenu() {
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Buka menu");
  siteMenu.classList.remove("is-open");
}

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Buka menu" : "Tutup menu");
  siteMenu.classList.toggle("is-open", !isOpen);
});

siteMenu.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));

document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeMenu();
});

// Highlight menu sesuai section yang sedang terlihat
const sections = document.querySelectorAll("main section[id]");
const links = document.querySelectorAll(".nav-links a");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      links.forEach(link => link.classList.remove("active"));
      const current = [...links].find(link => link.hash === `#${entry.target.id}`);
      if (current) current.classList.add("active");
    }
  });
}, { threshold: 0.35 });

sections.forEach(section => observer.observe(section));

// Efek kecil saat kartu project disentuh
document.querySelectorAll(".project").forEach(card => {
  card.addEventListener("mouseenter", () => card.style.setProperty("--lift", "1"));
  card.addEventListener("mouseleave", () => card.style.setProperty("--lift", "0"));
});
