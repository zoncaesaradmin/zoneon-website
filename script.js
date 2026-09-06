const verticals = [
  { key: "training", label: "Training", title: "Portable training and simulation environments", teaser: "Carry the full training environment anywhere.", summary: "A compact mini PC and dedicated Wi-Fi router create a private training network, ready anywhere, with or without internet.", fit: "Trainers running classrooms, demos, conferences, and remote sessions where materials need to be ready locally.", points: ["Files, videos, demos, and training tools served locally from the appliance", "Dedicated Wi-Fi for thirty or more participants, depending on router capacity", "Trainer-led access with guest or limited user permissions for each session"], modes: ["Portable kit", "Local Wi-Fi", "Optional cloud sync"], preview: { src: "./assets/training-preview.mp4", thumbnail: "./assets/training-preview-thumbnail.jpeg", title: "Training environment" } },
  { key: "events", label: "Events", title: "Local event operations and attendee engagement", teaser: "Registration, content, and participation that stay local.", summary: "Run registration, badging, participation, and media experiences on a private local network built for the venue.", fit: "Organizers and event teams that need fast, data-rich attendee experiences without depending on venue internet.", points: ["Registration, badging, entry, voting, and feedback on a private local network", "On-site AI experiences and opt-in personalized event media ready to share", "Add routers or appliance nodes across zones for capacity, redundancy, and organizer-controlled cloud sync"], modes: ["Local event LAN", "Multi-node", "Optional cloud sync"], preview: { src: "./assets/events-preview.mp4", thumbnail: "./assets/events-preview-thumbnail.jpeg", title: "Events environment" } },
  { key: "hospitality", label: "Hospitality", title: "Property and guest operations", teaser: "On-site service. Private control.", summary: "A guest-facing and staff-facing experience shaped around the rhythm of a property, with the appliance kept on-site.", fit: "Hotels and hospitality teams where service quality, continuity, and local control matter.", points: ["Guest service workflows that remain available on the property", "Operations tools for staff, scheduling, and coordination", "Private daily visibility for the people running the site"], modes: ["Local LAN", "Air-gapped", "VPS / Cloud"], preview: { src: "./assets/hospitality-preview.mp4", title: "Hospitality environment" } },
  { key: "operations", label: "Managed Service Provider", title: "Branch, edge, and field infrastructure deployments", teaser: "Reliable across sites and teams.", summary: "A practical appliance-led approach for organizations that need local resilience across sites.", fit: "Distributed teams that need repeatability across branches, remote sites, or controlled environments.", points: ["Operational views tailored to each location", "Consistent rollout patterns across teams and sites", "Local continuity when connectivity is limited"], modes: ["Local LAN", "Air-gapped", "VPS / Cloud"], preview: { src: "./assets/managed-service-preview.mp4", title: "Managed service environment" } },
  { key: "private-ai", label: "Private AI", title: "Internal tools and controlled workflows", teaser: "Useful AI, kept close to your team.", summary: "AI-assisted internal experiences that stay close to the business environment and its operating choices.", fit: "Teams that want helpful automation without making public cloud their default.", points: ["Private assistants for internal search, guidance, and task support", "Workflow tools kept close to the business environment", "Controlled operation for organizations that value privacy"], modes: ["Local LAN", "Air-gapped", "VPS / Cloud"], preview: { src: "./assets/private-ai-preview.mp4", title: "Private AI environment" } },
];

const deployments = [
  { key: "portable-node", label: "Portable", title: "Single portable node", teaser: "Self-contained and ready to move.", summary: "A single appliance carries the solution wherever it is needed, with no dependency on an existing site network.", fit: "Demos, temporary installations, field work, and smaller environments that need a self-contained setup.", points: ["Runs the selected solution on one compact appliance", "Connect locally when needed, without requiring a permanent LAN", "Moves easily between sites, teams, or use cases"], modes: ["Portable", "Standalone", "Local-first"] },
  { key: "lan-nodes", label: "Existing LAN", title: "Single-node or multi-node in an existing LAN", teaser: "Built into the network you already use.", summary: "One or more nodes operate within an existing local network, keeping services close to the people and devices that rely on them.", fit: "Organizations with an established on-site LAN that want to add local capacity gradually.", points: ["Starts with one node and expands when demand grows", "Uses the existing LAN for nearby users and devices", "Keeps day-to-day operation within the organization"], modes: ["Local LAN", "Scalable", "On-site"] },
  { key: "vps-nodes", label: "Self-hosted VPS", title: "Single-node or multi-node in a self-hosted VPS", teaser: "Private infrastructure beyond one site.", summary: "A self-hosted VPS provides a controlled base for one or more nodes when a solution needs reach beyond a single physical location.", fit: "Teams that need private remote access, wider availability, or coordination across locations.", points: ["Runs on infrastructure you manage and control", "Supports one node now and additional nodes later", "Provides a private foundation for distributed access"], modes: ["Self-hosted VPS", "Scalable", "Remote reach"] },
  { key: "lan-cloud-backup", label: "LAN + backup", title: "Single-node or multi-node LAN with cloud backup", teaser: "Local operation with protected recovery.", summary: "The solution runs locally on the LAN while selected data is backed up to the cloud for recovery and continuity.", fit: "Organizations that want local performance and control with an additional recovery layer.", points: ["Keeps primary operation on the local network", "Backs up selected data on a defined schedule", "Restores confidently if a local device needs replacement"], modes: ["Local LAN", "Cloud backup", "Recovery-ready"] },
];

function setupSelector({ items, gridSelector, detailId, cardClass, tabPrefix, fields, preview }) {
  const grid = document.querySelector(gridSelector);
  const detailCard = document.getElementById(detailId);
  const detailFields = Object.fromEntries(Object.entries(fields).map(([name, id]) => [name, document.getElementById(id)]));
  const itemsByKey = new Map(items.map((item) => [item.key, item]));
  let activePreview;

  if (preview) {
    preview.tile.addEventListener("click", () => {
      if (!activePreview) return;
      preview.video.src = activePreview.src;
      preview.dialog.showModal();
      preview.video.play().catch(() => {});
    });
    preview.close.addEventListener("click", () => preview.dialog.close());
    preview.dialog.addEventListener("close", () => {
      preview.video.pause();
      preview.video.removeAttribute("src");
      preview.video.load();
    });
    preview.dialog.addEventListener("click", (event) => {
      if (event.target === preview.dialog) preview.dialog.close();
    });
  }

  grid.replaceChildren(...items.map((item) => {
    const card = document.createElement("button");
    card.className = cardClass;
    card.type = "button";
    card.role = "tab";
    card.id = `${tabPrefix}-tab-${item.key}`;
    card.dataset.option = item.key;
    card.setAttribute("aria-controls", detailId);
    card.setAttribute("aria-selected", "false");
    card.innerHTML = `<span class="vertical-tag">${item.label}</span><strong>${item.title}</strong><p>${item.teaser}</p>`;
    return card;
  }));

  const cards = [...grid.querySelectorAll(`.${cardClass}`)];
  function render(key) {
    const item = itemsByKey.get(key);
    if (!item) return;
    detailFields.label.textContent = item.label;
    detailFields.title.textContent = item.title;
    detailFields.summary.textContent = item.summary;
    detailFields.fit.textContent = item.fit;
    detailFields.points.innerHTML = item.points.map((point) => `<li>${point}</li>`).join("");
    detailFields.modes.innerHTML = item.modes.map((mode) => `<span>${mode}</span>`).join("");
    if (preview) {
      activePreview = item.preview;
      preview.body.classList.add("has-preview");
      preview.title.textContent = activePreview.title;
      preview.art.classList.toggle("has-thumbnail", Boolean(activePreview.thumbnail));
      preview.art.style.setProperty("--preview-thumbnail", activePreview.thumbnail ? `url("${activePreview.thumbnail}")` : "");
    }
    cards.forEach((card) => {
      const selected = card.dataset.option === key;
      card.classList.toggle("is-selected", selected);
      card.setAttribute("aria-selected", selected ? "true" : "false");
      if (selected) detailCard.setAttribute("aria-labelledby", card.id);
    });
  }

  cards.forEach((card, index) => card.addEventListener("click", () => {
    render(card.dataset.option);
    history.replaceState(null, "", `#${card.dataset.option}`);
    cards[index].scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }));

  grid.addEventListener("keydown", (event) => {
    const currentIndex = cards.indexOf(document.activeElement);
    if (currentIndex < 0) return;
    const previousKey = event.key === "ArrowLeft" || event.key === "ArrowUp";
    const nextKey = event.key === "ArrowRight" || event.key === "ArrowDown";
    if (!previousKey && !nextKey && event.key !== "Home" && event.key !== "End") return;
    event.preventDefault();
    const nextIndex = event.key === "Home" ? 0 : event.key === "End" ? cards.length - 1 : (currentIndex + (nextKey ? 1 : -1) + cards.length) % cards.length;
    cards[nextIndex].focus();
    render(cards[nextIndex].dataset.option);
  });

  const initialKey = window.location.hash.replace("#", "");
  render(itemsByKey.has(initialKey) ? initialKey : items[0].key);
}

setupSelector({
  items: verticals,
  gridSelector: ".vertical-grid",
  detailId: "vertical-detail",
  cardClass: "vertical-card",
  tabPrefix: "vertical",
  fields: { label: "detail-label", title: "detail-title", summary: "detail-summary", fit: "detail-fit", points: "detail-points", modes: "detail-modes" },
  preview: {
    body: document.getElementById("detail-body"),
    tile: document.getElementById("detail-preview"),
    art: document.querySelector(".solution-preview-art"),
    title: document.getElementById("detail-preview-title"),
    dialog: document.getElementById("solution-preview-dialog"),
    video: document.getElementById("solution-preview-video"),
    close: document.getElementById("solution-preview-close"),
  },
});

setupSelector({
  items: deployments,
  gridSelector: ".deployment-selector",
  detailId: "deployment-detail",
  cardClass: "deployment-option",
  tabPrefix: "deployment",
  fields: { label: "deployment-detail-label", title: "deployment-detail-title", summary: "deployment-detail-summary", fit: "deployment-detail-fit", points: "deployment-detail-points", modes: "deployment-detail-modes" },
});
