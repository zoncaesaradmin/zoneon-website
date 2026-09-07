const verticals = [
  { key: "training", label: "Training", title: "Portable training and simulation environments", teaser: "Carry the full training environment anywhere.", summary: "A compact mini PC and dedicated Wi-Fi router create a private training network, ready anywhere, with or without internet.", fit: "Trainers running classrooms, demos, conferences, and remote sessions where materials need to be ready locally.", points: ["Files, videos, demos, and training tools served locally from the appliance", "Dedicated Wi-Fi for thirty or more participants, depending on router capacity", "Trainer-led access with guest or limited user permissions for each session"], modes: ["Portable kit", "Local Wi-Fi", "Optional cloud sync"], preview: { src: "./assets/training-preview.mp4", thumbnail: "./assets/training-preview-thumbnail.jpeg", title: "Training environment" } },
  { key: "events", label: "Events", title: "Local event operations and attendee engagement", teaser: "Registration, content, and participation that stay local.", summary: "Run registration, badging, participation, and media experiences on a private local network built for the venue.", fit: "Organizers and event teams that need fast, data-rich attendee experiences without depending on venue internet.", points: ["Registration, badging, entry, voting, and feedback on a private local network", "On-site AI experiences and opt-in personalized event media ready to share", "Add routers or appliance nodes across zones for capacity, redundancy, and organizer-controlled cloud sync"], modes: ["Local event LAN", "Multi-node", "Optional cloud sync"], preview: { src: "./assets/events-preview.mp4", thumbnail: "./assets/events-preview-thumbnail.jpeg", title: "Events environment" } },
  { key: "hospitality", label: "Hospitality", title: "Hotel-local operations and guest experience", teaser: "A hotel-owned experience, kept close to the property.", summary: "Local servers extend the hotel network with guest content and operational workflows the property controls.", fit: "Hotels, resorts, and guest properties that want a richer experience without making internet their foundation.", points: ["Hotel-curated guides, videos, and service experiences delivered locally", "Guest requests and voice-led workflows alongside PMS, POS, or managed infrastructure", "Local control of content and daily operations, with optional cloud sync when useful"], modes: ["Hotel LAN", "Hotel-owned content", "Optional cloud sync"], preview: { src: "./assets/hospitality-preview.mp4", thumbnail: "./assets/hospitality-preview-thumbnail.jpeg", title: "Hospitality environment" } },
  { key: "operations", label: "Managed Service Provider", title: "Managed infrastructure across every site", teaser: "Local control for proactive service.", summary: "Add a local appliance node at selected client sites for integrations, analytics, and monitoring close to the work.", fit: "MSPs supporting branches, edge environments, and client infrastructure that need proactive service without centralizing every workload.", points: ["Additional local node on the existing LAN, never in the traffic path", "Vendor integrations, analytics, and automation close to on-site systems", "Unified visibility across selected sites with reduced cloud traffic and optional cloud reach"], modes: ["Client-site LAN", "Local analytics", "Optional cloud reach"], preview: { src: "./assets/managed-service-preview.mp4", thumbnail: "./assets/managed-service-preview-thumbnail.jpeg", title: "Managed service environment" } },
  { key: "private-ai", label: "Private AI", title: "Private AI, close to the work", teaser: "Local inference. Private data. Optional cloud.", summary: "Run right-sized models, AI agents, and workflows inside your LAN, using cloud capacity only when it adds real value.", fit: "Organizations that need responsive AI around their local data, people, devices, and operations without making cloud their default.", points: ["Private assistants, local search, voice interfaces, and AI agents for nearby people and systems", "Keep sensitive data and heavy inputs close to the business for lower latency and less unnecessary cloud traffic", "Run day-to-day AI locally, then extend to cloud models for advanced or shared workloads"], modes: ["Local inference", "Air-gapped ready", "Optional cloud"], preview: { src: "./assets/private-ai-preview.mp4", thumbnail: "./assets/private-ai-preview-thumbnail.jpeg", title: "Private AI environment" } },
];

const deployments = [
  { key: "portable-node", label: "Portable / fixed", title: "Single-node portable appliance", teaser: "Carry it anywhere or mount it on the wall.", summary: "One compact appliance runs the solution wherever it is needed. Carry it between sites or mount it on a wall for a fixed installation, with an optional connection to the local LAN.", fit: "Security rooms, demos, field work, and temporary or permanent installations that need local access, with or without an existing site network.", points: ["Direct Wi-Fi access: the appliance acts as a wireless access point, so devices connect directly without a separate router or existing LAN", "Router-based access: connect the appliance to a Wi-Fi router to create a local network that multiple devices can use to access the solution", "Both access modes work without an internet connection"], modes: ["Direct Wi-Fi", "Via Wi-Fi router", "Portable or wall-mounted"] },
  { key: "lan-nodes", label: "Existing LAN", title: "One or more appliances on your LAN", teaser: "Works on the network you already use.", summary: "Run the appliance software on a standard PC connected to your existing LAN. Services stay local and work on fully air-gapped networks as well as networks with internet access.", fit: "Organizations that want to serve local users and devices on an existing LAN.", points: ["Supports one or more appliance nodes as needed.", "Run integrations, monitoring, and other solution features close to the systems on your network", "Choose optional cloud backup for supported features when internet access is available, with control over what is backed up"], modes: ["Air-gapped ready", "Single or multiple devices", "Optional cloud backup"] },
  { key: "vps-nodes", label: "VM / VPS", title: "Local VM or hosted VPS", teaser: "Get started without dedicated appliance hardware.", summary: "A self-hosted virtual machine (VM) or hosted VPS lets you use the same appliance functionality without a dedicated hardware device. The same plans apply in either setup.", fit: "Trials and teams that prefer remote hosting, with internet access and flexibility around latency and where their data is stored.", points: ["Supports one or more appliance nodes as needed.", "Choose a VPS for access across locations, with an internet connection required to reach it", "Runs on a virtual machine you manage and control locally, or on a VPS"], modes: ["Local VM", "Hosted VPS", "Same plans and features"] },
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
