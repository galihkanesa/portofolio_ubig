// Tahun footer otomatis
document.querySelector("footer span").textContent =
  `© ${new Date().getFullYear()} GALIH TEGAR AS'ABIMAN`;

// Highlight menu sesuai section yang sedang terlihat
const sections = document.querySelectorAll("main section[id]");
const links = document.querySelectorAll(".nav-links a");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      links.forEach(link => link.classList.remove("active"));
      const current = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
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
