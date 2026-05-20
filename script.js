const projects = [
  {
    title: "Portal Akademik",
    type: "Web Development",
    category: "web",
    description: "Sistem akademik dengan data mahasiswa, KRS, nilai, tagihan, dan dashboard admin.",
    tags: ["PHP", "MySQL", "Bootstrap"],
    accent: "web",
    demoUrl: "#",
    repoUrl: "https://github.com/Zulkifli09?tab=repositories",
  },
  {
    title: "Manajemen Tugas",
    type: "Application",
    category: "app",
    description: "Aplikasi produktivitas untuk mengatur pekerjaan harian, prioritas, dan progres tugas.",
    tags: ["JavaScript", "LocalStorage", "CSS"],
    accent: "app",
    demoUrl: "#",
    repoUrl: "https://github.com/Zulkifli09?tab=repositories",
  },
  {
    title: "Dashboard Analitik",
    type: "UI Design",
    category: "ui",
    description: "Konsep dashboard dengan visual data, kartu metrik, tabel ringkas, dan layout responsif.",
    tags: ["Figma", "UI Kit", "Prototype"],
    accent: "ui",
    demoUrl: "#",
    repoUrl: "https://github.com/Zulkifli09?tab=repositories",
  },
];

const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const filterButtons = document.querySelectorAll(".filter-btn");
const projectGrid = document.querySelector("#projectGrid");
const revealItems = document.querySelectorAll(".reveal");

function createProjectCard(project) {
  const tagMarkup = project.tags.map((tag) => `<span>${tag}</span>`).join("");

  return `
    <article class="project-card" data-category="${project.category}">
      <div class="project-media ${project.accent}" aria-hidden="true"></div>
      <div class="project-body">
        <p class="project-type">${project.type}</p>
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="tags">${tagMarkup}</div>
        <div class="project-links">
          <a href="${project.demoUrl}" aria-label="Lihat demo ${project.title}">Demo</a>
          <a href="${project.repoUrl}" target="_blank" rel="noreferrer" aria-label="Lihat repository ${project.title}">Repository</a>
        </div>
      </div>
    </article>
  `;
}

function renderProjects(selectedFilter = "all") {
  const visibleProjects = projects.filter((project) => {
    return selectedFilter === "all" || project.category === selectedFilter;
  });

  projectGrid.innerHTML = visibleProjects.map(createProjectCard).join("");

  projectGrid.querySelectorAll(".project-card").forEach((card, index) => {
    card.style.transitionDelay = `${index * 60}ms`;
    requestAnimationFrame(() => card.classList.add("visible"));
  });
}

navToggle.addEventListener("click", () => {
  const isOpen = siteNav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

siteNav.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    siteNav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    renderProjects(selectedFilter);
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
  {
    threshold: 0.14,
  }
);

revealItems.forEach((item) => revealObserver.observe(item));
renderProjects();
