const verticals = {
  hospitality: { label: "Hospitality", title: "Property and guest operations", summary: "A guest-facing and staff-facing experience shaped around the rhythm of a property, with the appliance kept on-site.", fit: "Environments where service quality, continuity, and local control matter.", points: ["Guest service workflows that remain available on the property", "Operations tools for staff, scheduling, and coordination", "Private daily visibility for the people running the site"], modes: ["Local LAN", "Air-gapped", "VPS / Cloud"] },
  training: { label: "Training", title: "Learning and simulation environments", summary: "A repeatable environment for structured learning, guided practice, and controlled operational scenarios.", fit: "Organizations that want dependable training in classrooms, labs, or private internal programs.", points: ["Scenario-driven learning flows with consistent operating conditions", "On-site environments without outside dependency", "Demonstration setups adapted for different audiences"], modes: ["Local LAN", "Air-gapped", "VPS / Cloud"] },
  operations: { label: "Operations", title: "Branch, edge, and field deployments", summary: "A practical appliance-led approach for organizations that need local resilience across sites.", fit: "Distributed teams that need repeatability across branches, remote sites, or controlled environments.", points: ["Operational views tailored to each location", "Consistent rollout patterns across teams and sites", "Local continuity when connectivity is limited"], modes: ["Local LAN", "Air-gapped", "VPS / Cloud"] },
  "private-ai": { label: "Private AI", title: "Internal tools and controlled workflows", summary: "AI-assisted internal experiences that stay close to the business environment and its operating choices.", fit: "Teams that want helpful automation without making public cloud their default.", points: ["Private assistants for internal search, guidance, and task support", "Workflow tools kept close to the business environment", "Controlled operation for organizations that value privacy"], modes: ["Local LAN", "Air-gapped", "VPS / Cloud"] },
};

const cards = document.querySelectorAll(".vertical-card");
const label = document.getElementById("detail-label");
const title = document.getElementById("detail-title");
const summary = document.getElementById("detail-summary");
const fit = document.getElementById("detail-fit");
const points = document.getElementById("detail-points");
const modes = document.getElementById("detail-modes");

function renderVertical(key) {
  const item = verticals[key];
  if (!item) return;
  label.textContent = item.label;
  title.textContent = item.title;
  summary.textContent = item.summary;
  fit.textContent = item.fit;
  points.innerHTML = item.points.map((point) => `<li>${point}</li>`).join("");
  modes.innerHTML = item.modes.map((mode) => `<span>${mode}</span>`).join("");
  cards.forEach((card) => {
    const selected = card.dataset.vertical === key;
    card.classList.toggle("is-selected", selected);
    card.setAttribute("aria-selected", selected ? "true" : "false");
  });
}

cards.forEach((card) => card.addEventListener("click", () => {
  const key = card.dataset.vertical;
  renderVertical(key);
  history.replaceState(null, "", `#${key}`);
}));

const initialVertical = window.location.hash.replace("#", "");
renderVertical(initialVertical in verticals ? initialVertical : "hospitality");
