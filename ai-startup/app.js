/**
 * app.js
 * Main client-side router, authentication, UI rendering, and theme manager.
 */

// Global State
window.currentStartupPlan = null;
let currentUser = null;

// Initialize on Load
document.addEventListener("DOMContentLoaded", () => {
  initLucide();
  initTheme();
  checkAuthSession();
  
  // Set default disabled state for specific tabs
  lockDashboardTabs();
});

function initLucide() {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

// ==========================================================================
// THEME MANAGER
// ==========================================================================
function initTheme() {
  const savedTheme = localStorage.getItem("startup-theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeIcon(savedTheme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("startup-theme", newTheme);
  updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
  const iconEl = document.getElementById("theme-icon");
  if (!iconEl) return;
  if (theme === "light") {
    iconEl.setAttribute("data-lucide", "sun");
  } else {
    iconEl.setAttribute("data-lucide", "moon");
  }
  initLucide();
}

// ==========================================================================
// AUTHENTICATION SIMULATOR
// ==========================================================================
function checkAuthSession() {
  const session = localStorage.getItem("startup-session");
  if (session) {
    currentUser = JSON.parse(session);
    showAppWorkspace();
  } else {
    showAuthGate();
  }
}

function switchAuthTab(type) {
  document.querySelectorAll(".auth-tab").forEach(b => b.classList.remove("active"));
  document.querySelectorAll(".auth-form").forEach(f => f.classList.remove("active"));

  if (type === 'login') {
    document.getElementById("tab-login-btn").classList.add("active");
    document.getElementById("login-form").classList.add("active");
  } else {
    document.getElementById("tab-register-btn").classList.add("active");
    document.getElementById("register-form").classList.add("active");
  }
}

function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById("login-email").value.trim();
  const name = email.split('@')[0];
  const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
  
  currentUser = { name: formattedName, email: email };
  localStorage.setItem("startup-session", JSON.stringify(currentUser));
  
  showToast(`Welcome back, ${formattedName}!`, "success");
  showAppWorkspace();
}

function handleRegister(event) {
  event.preventDefault();
  const name = document.getElementById("reg-name").value.trim();
  const email = document.getElementById("reg-email").value.trim();
  
  currentUser = { name: name, email: email };
  localStorage.setItem("startup-session", JSON.stringify(currentUser));
  
  showToast("Account created successfully!", "success");
  showAppWorkspace();
}

function handleLogout() {
  localStorage.removeItem("startup-session");
  currentUser = null;
  window.currentStartupPlan = null;
  
  // Clear forms and reset UI
  document.getElementById("problem-form").reset();
  lockDashboardTabs();
  
  showAuthGate();
  showToast("Signed out successfully.", "info");
}

function showAuthGate() {
  document.getElementById("auth-gate").classList.remove("hidden");
  document.getElementById("main-app").classList.add("hidden");
}

function showAppWorkspace() {
  document.getElementById("auth-gate").classList.add("hidden");
  document.getElementById("main-app").classList.remove("hidden");
  
  // Update User Details in Sidebar
  document.getElementById("user-display-name").textContent = currentUser.name;
  
  // Get initials for Avatar
  const initials = currentUser.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  document.getElementById("user-avatar").textContent = initials || "JD";
}

// ==========================================================================
// TABS & ROUTING
// ==========================================================================
function switchTab(tabId) {
  // If tabs are locked and user tries to switch to anything but onboarding/resources/coach
  if (!window.currentStartupPlan && tabId !== 'onboarding' && tabId !== 'resources' && tabId !== 'coach') {
    showToast("Please generate a Startup Plan first on the 'New Plan' tab!", "info");
    return;
  }

  // Update nav UI active class
  document.querySelectorAll(".nav-item").forEach(btn => {
    if (btn.getAttribute("data-tab") === tabId) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  // Toggle visible sections
  document.querySelectorAll(".tab-panel").forEach(panel => {
    if (panel.id === `tab-${tabId}`) {
      panel.classList.add("active");
    } else {
      panel.classList.remove("active");
    }
  });
}

function lockDashboardTabs() {
  // Lock plan-specific tabs in the sidebar navigation
  const planTabs = ["market", "competitors", "roadmap", "funding"];
  planTabs.forEach(t => {
    const btn = document.getElementById(`nav-${t}`);
    if (btn) btn.classList.add("disabled");
  });
  
  // Disable print PDF button
  const printBtn = document.getElementById("btn-pdf-export");
  if (printBtn) {
    printBtn.classList.add("disabled");
    printBtn.setAttribute("disabled", "true");
  }
}

function unlockDashboardTabs() {
  const planTabs = ["market", "competitors", "roadmap", "funding"];
  planTabs.forEach(t => {
    const btn = document.getElementById(`nav-${t}`);
    if (btn) btn.classList.remove("disabled");
  });

  const printBtn = document.getElementById("btn-pdf-export");
  if (printBtn) {
    printBtn.classList.remove("disabled");
    printBtn.removeAttribute("disabled");
  }
}

// ==========================================================================
// PLAN GENERATION CONTROLLER
// ==========================================================================
function checkProblemLength() {
  const problemVal = document.getElementById("problem-statement").value;
  const counterEl = document.getElementById("char-counter");
  const generateBtn = document.getElementById("generate-btn");
  
  const minLength = 120;
  const count = problemVal.length;
  
  counterEl.textContent = `${count} / ${minLength} minimum characters`;
  
  if (count >= minLength) {
    counterEl.style.color = "var(--success)";
  } else {
    counterEl.style.color = "var(--text-muted)";
  }
}

function loadSampleIdea() {
  const sampleName = "MedSync Connect";
  const sampleProblem = "Home health aides spend up to 10 hours per week documenting visit logs manually using paper sheets. This delays billing cycles by 14 days and causes frequent transcription audit errors. MedSync Connect provides a lightweight speech-to-text mobile interface that allows nurses to dictate visit summaries directly into EHR databases instantly.";
  
  document.getElementById("startup-name").value = sampleName;
  document.getElementById("startup-industry").value = "HealthTech";
  document.getElementById("startup-stage").value = "SMBs";
  document.getElementById("problem-statement").value = sampleProblem;
  
  checkProblemLength();
  showToast("Sample healthtech startup loaded. Click 'Generate' below!", "info");
}

function generateOperatingPlan(event) {
  event.preventDefault();
  
  const name = document.getElementById("startup-name").value;
  const industry = document.getElementById("startup-industry").value;
  const audience = document.getElementById("startup-stage").value;
  const problem = document.getElementById("problem-statement").value;
  
  if (problem.length < 120) {
    showToast("Please write a longer problem statement (min 120 chars) to get a high-quality plan.", "warning");
    return;
  }
  
  // Set UI to loading state
  const btn = document.getElementById("generate-btn");
  const originalText = btn.innerHTML;
  btn.innerHTML = `<span class="status-dot"></span><span>Generating Plan...</span>`;
  btn.disabled = true;
  
  setTimeout(() => {
    // Call Generator logic
    const plan = generatePlanData(name, industry, audience, problem);
    window.currentStartupPlan = plan;
    
    // Bind data to all pages
    bindPlanToUI(plan);
    
    // Connect plan context to YC Coach
    setCoachActivePlan(plan);
    
    // Reset button states
    btn.innerHTML = originalText;
    btn.disabled = false;
    
    // Unlock views
    unlockDashboardTabs();
    
    // Switch to first analysis view
    switchTab("market");
    showToast(`AI Operating Plan generated for ${plan.name}!`, "success");
  }, 1200);
}

// ==========================================================================
// RENDERERS (BINDING DATA TO DOM)
// ==========================================================================
function bindPlanToUI(plan) {
  // Update Header details
  document.getElementById("project-title-header").textContent = plan.name;
  document.getElementById("project-industry-header").textContent = `${plan.industry} | Targeting ${plan.audience}`;

  // 0. PRE-EXISTING PROBLEM DETECTION WARNING
  const alertCard = document.getElementById("known-problem-alert");
  const spaceBadge = document.getElementById("detected-space-badge");
  const suggestionsList = document.getElementById("improved-suggestions-list");
  
  if (plan.existingProblemDetected) {
    if (spaceBadge) spaceBadge.textContent = plan.detectedSpace;
    if (suggestionsList) {
      suggestionsList.innerHTML = plan.improvedSuggestions.map(s => `
        <li style="font-size: 0.8rem; line-height: 1.5; color: var(--text-color); margin-bottom: 0.25rem;">
          <span style="color: #f59e0b; font-weight: bold; margin-right: 0.5rem;">➔</span>
          ${s}
        </li>
      `).join("");
    }
    if (alertCard) alertCard.classList.remove("hidden");
  } else {
    if (alertCard) alertCard.classList.add("hidden");
  }

  // 1. MARKET ANALYSIS VIEW
  document.getElementById("analysis-valprop").textContent = plan.valProp;
  document.getElementById("analysis-icp").textContent = plan.icp;
  
  // Validation milestones
  const valList = document.getElementById("analysis-validation");
  valList.innerHTML = plan.validation.map(v => `<li>${v}</li>`).join("");
  
  // TAM/SAM/SOM values
  document.getElementById("market-tam").textContent = `$${plan.tam}M`;
  document.getElementById("market-sam").textContent = `$${plan.sam}M`;
  document.getElementById("market-som").textContent = `$${plan.som}M`;

  // SWOT matrix
  bindListToContainer("swot-strengths", plan.swot.s);
  bindListToContainer("swot-weaknesses", plan.swot.w);
  bindListToContainer("swot-opportunities", plan.swot.o);
  bindListToContainer("swot-threats", plan.swot.t);

  // Set unit economics sliders
  document.getElementById("slider-price").value = plan.unitEconomics.price;
  document.getElementById("slider-cac").value = plan.unitEconomics.cac;
  document.getElementById("slider-churn").value = plan.unitEconomics.churn;
  document.getElementById("slider-customers").value = plan.unitEconomics.newCustomers;
  
  updateCalculator();

  // 2. COMPETITOR VIEW
  renderCompetitorSection(plan);

  // 3. MVP ROADMAP VIEW
  renderRoadmapTracks(plan);

  // 4. FUNDING & PITCH VIEW
  renderFundingPathways(plan);

  // 5. CUSTOM DYNAMIC RESOURCE HUB WIDGETS
  const customKit = document.getElementById("custom-resource-kit");
  const stackListEl = document.getElementById("custom-stack-list");
  const repoNameEl = document.getElementById("github-repo-name");
  const repoLinkEl = document.getElementById("github-repo-link");
  
  if (customKit) {
    customKit.classList.remove("hidden");
  }
  
  if (stackListEl) {
    stackListEl.innerHTML = plan.customTechStack.map(s => `
      <div class="tech-item-row" style="display: flex; justify-content: space-between; align-items: center; background: rgba(255, 255, 255, 0.02); padding: 0.5rem 0.75rem; border: 1px solid var(--border); border-radius: 6px;">
        <div style="display: flex; flex-direction: column;">
          <strong style="font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px;">${s.type}</strong>
          <span style="font-size: 0.85rem; font-weight: 600; color: var(--text-color);">${s.name}</span>
        </div>
        <small style="font-size: 0.7rem; color: var(--text-muted); text-align: right; max-width: 55%;">${s.desc}</small>
      </div>
    `).join("");
  }
  
  if (repoNameEl && repoLinkEl) {
    repoNameEl.textContent = plan.githubRepoName || "template-repo";
    repoLinkEl.href = plan.githubUrl || "#";
  }

  // Render Interactive System Architecture Flow
  renderSystemArchitecture(plan);
}

function renderSystemArchitecture(plan) {
  const connG = document.getElementById("svg-connections");
  const nodeG = document.getElementById("svg-nodes");
  if (!connG || !nodeG) return;
  
  connG.innerHTML = "";
  nodeG.innerHTML = "";

  const nodes = plan.diagramNodes || [];
  const connections = plan.diagramConnections || [];

  // Create node lookup map
  const nodeMap = {};
  nodes.forEach(n => {
    nodeMap[n.id] = n;
  });

  // Render connections
  connections.forEach(c => {
    const fromNode = nodeMap[c.from];
    const toNode = nodeMap[c.to];
    if (fromNode && toNode) {
      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", (fromNode.x * 8).toString());
      line.setAttribute("y1", (fromNode.y * 4).toString());
      line.setAttribute("x2", (toNode.x * 8).toString());
      line.setAttribute("y2", (toNode.y * 4).toString());
      line.setAttribute("stroke", "var(--border)");
      line.setAttribute("stroke-width", "2");
      line.setAttribute("marker-end", "url(#arrow)");
      line.setAttribute("class", "flow-line");
      
      // Connection label
      if (c.label) {
        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", ((fromNode.x + toNode.x) * 4).toString());
        text.setAttribute("y", ((fromNode.y + toNode.y) * 2 - 8).toString());
        text.setAttribute("fill", "var(--text-muted)");
        text.setAttribute("font-size", "10px");
        text.setAttribute("text-anchor", "middle");
        text.textContent = c.label;
        connG.appendChild(text);
      }
      connG.appendChild(line);
    }
  });

  // Render nodes
  nodes.forEach(n => {
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.setAttribute("class", "arch-node-group");
    g.style.cursor = "pointer";

    // Circle or Rect
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", (n.x * 8).toString());
    circle.setAttribute("cy", (n.y * 4).toString());
    circle.setAttribute("r", "16");
    circle.setAttribute("fill", "var(--card-bg)");
    circle.setAttribute("stroke", "var(--primary)");
    circle.setAttribute("stroke-width", "3");
    circle.setAttribute("class", "arch-node-circle");
    circle.style.transition = "all 0.2s ease";
    
    // Label text
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", (n.x * 8).toString());
    text.setAttribute("y", (n.y * 4 + 32).toString());
    text.setAttribute("fill", "var(--text-color)");
    text.setAttribute("font-size", "12px");
    text.setAttribute("font-family", "Outfit, sans-serif");
    text.setAttribute("font-weight", "600");
    text.setAttribute("text-anchor", "middle");
    text.textContent = n.label;

    // Hover tooltip interaction
    g.addEventListener("mouseenter", () => {
      circle.setAttribute("stroke", "var(--success)");
      circle.setAttribute("r", "18");
      document.getElementById("tooltip-title").textContent = n.label;
      document.getElementById("tooltip-desc").textContent = n.desc || "No details available.";
      document.getElementById("diagram-tooltip").style.borderColor = "var(--success)";
    });

    g.addEventListener("mouseleave", () => {
      circle.setAttribute("stroke", "var(--primary)");
      circle.setAttribute("r", "16");
      document.getElementById("tooltip-title").textContent = "System Components";
      document.getElementById("tooltip-desc").textContent = "Hover over any system component in the diagram above to inspect details.";
      document.getElementById("diagram-tooltip").style.borderColor = "var(--border)";
    });

    g.appendChild(circle);
    g.appendChild(text);
    nodeG.appendChild(g);
  });
}

function bindListToContainer(id, items) {
  const el = document.getElementById(id);
  if (el) {
    el.innerHTML = items.map(i => `<li>${i}</li>`).join("");
  }
}

function positionMapNode(id, bottomPercent, leftPercent) {
  const el = document.getElementById(id);
  if (el) {
    el.classList.remove("hidden");
    el.style.bottom = `${bottomPercent}%`;
    el.style.left = `${leftPercent}%`;
  }
}

function updateCalculator() {
  const price = parseInt(document.getElementById("slider-price").value);
  const cac = parseInt(document.getElementById("slider-cac").value);
  const churn = parseInt(document.getElementById("slider-churn").value);
  const customers = parseInt(document.getElementById("slider-customers").value);

  // Update labels
  document.getElementById("label-price").textContent = `$${price.toLocaleString()}`;
  document.getElementById("label-cac").textContent = `$${cac.toLocaleString()}`;
  document.getElementById("label-churn").textContent = `${churn}%`;
  document.getElementById("label-customers").textContent = `${customers.toLocaleString()}`;

  // Computations
  const ltv = Math.round(price / (churn / 100));
  const ratio = (ltv / cac).toFixed(1);
  const arr = price * customers;

  // Render values
  document.getElementById("calc-ltv").textContent = `$${ltv.toLocaleString()}`;
  
  const ratioEl = document.getElementById("calc-ratio");
  const verdictEl = document.getElementById("ratio-verdict");
  ratioEl.textContent = `${ratio}x`;

  if (ratio >= 3) {
    ratioEl.className = "text-success";
    verdictEl.textContent = "Excellent scale leverage. Unit economics are highly viable.";
  } else if (ratio >= 1.5) {
    ratioEl.className = "text-warning";
    verdictEl.textContent = "Caution: Squeezed margins. Consider increasing prices or lowering CAC.";
  } else {
    ratioEl.className = "text-danger";
    verdictEl.textContent = "Dangerous model. CAC is too high relative to customer lifetime value.";
  }

  document.getElementById("calc-arr").textContent = `$${arr.toLocaleString()}`;

  // Sync back into window state to preserve edits
  if (window.currentStartupPlan) {
    window.currentStartupPlan.unitEconomics = { price, cac, churn, newCustomers: customers };
  }
}

// Roadmap track renderers
function renderRoadmapTracks(plan) {
  const rowsEl = document.getElementById("roadmap-rows");
  const detailsEl = document.getElementById("roadmap-details");
  
  rowsEl.innerHTML = "";
  detailsEl.innerHTML = "";

  plan.roadmap.forEach((track, idx) => {
    // Gantt Row
    const rowEl = document.createElement("div");
    rowEl.className = "roadmap-data-row";
    
    // Class suffix matches styling names: track-product, etc.
    let colorClass = "track-product";
    if (idx === 0) colorClass = "track-tech";
    if (idx === 2) colorClass = "track-growth";

    rowEl.innerHTML = `
      <div class="rm-cell track-label">
        <i data-lucide="${track.icon}"></i>
        <span>${track.track}</span>
      </div>
      <div class="rm-cell ${colorClass}">
        <div class="gantt-bar" title="${track.weeks[0]}">${track.weeks[0]}</div>
      </div>
      <div class="rm-cell ${colorClass}">
        <div class="gantt-bar" title="${track.weeks[1]}">${track.weeks[1]}</div>
      </div>
      <div class="rm-cell ${colorClass}">
        <div class="gantt-bar" title="${track.weeks[2]}">${track.weeks[2]}</div>
      </div>
      <div class="rm-cell ${colorClass}">
        <div class="gantt-bar" title="${track.weeks[3]}">${track.weeks[3]}</div>
      </div>
    `;
    rowsEl.appendChild(rowEl);

    // Detail Lists Cards
    const detailCard = document.createElement("div");
    detailCard.className = "rm-detail-card card";
    
    let checklistHtml = track.checklists.map(chk => `
      <li>
        <input type="checkbox" id="${chk.id}" ${chk.checked ? 'checked' : ''} onchange="toggleMilestone('${chk.id}')">
        <span>${chk.text}</span>
      </li>
    `).join("");

    detailCard.innerHTML = `
      <h4>
        <i data-lucide="${track.icon}"></i>
        <span>${track.track} Checkpoints</span>
      </h4>
      <ul>
        ${checklistHtml}
      </ul>
    `;
    detailsEl.appendChild(detailCard);
  });

  initLucide();
}

function toggleMilestone(id) {
  if (!window.currentStartupPlan) return;
  
  // Find task checklist and toggle it
  window.currentStartupPlan.roadmap.forEach(track => {
    track.checklists.forEach(chk => {
      if (chk.id === id) {
        chk.checked = !chk.checked;
        showToast("Milestone updated!", "success");
      }
    });
  });
}

// Funding pathways renderers
function renderFundingPathways(plan) {
  const pathwaysEl = document.getElementById("funding-pathways");
  const pitchEl = document.getElementById("pitch-deck-outline");
  const grantsEl = document.getElementById("grants-and-programs");

  // Matched pathways cards
  pathwaysEl.innerHTML = plan.fundingPathways.map(pw => `
    <div class="pathway-card ${pw.recommended ? 'recommended' : ''}">
      ${pw.recommended ? '<span class="rec-tag">Recommended</span>' : ''}
      <h4>${pw.name}</h4>
      <span class="pw-match">${pw.match}</span>
      <p>${pw.desc}</p>
      <span class="pw-amount">Capacity: ${pw.funding}</span>
    </div>
  `).join("");

  // Slide Deck outlines
  pitchEl.innerHTML = plan.pitchDeck.map((slide, index) => `
    <div class="slide-item">
      <div class="slide-num">${index + 1}</div>
      <div class="slide-details">
        <h5>${slide.slide}</h5>
        <p>${slide.desc}</p>
      </div>
    </div>
  `).join("");

  // Grants links
  grantsEl.innerHTML = plan.grants.map(grant => `
    <li>
      <h4>${grant.name}</h4>
      <p>${grant.desc}</p>
      <a href="${grant.link}" target="_blank" rel="noopener noreferrer">
        <span>Visit Program Page</span>
        <i data-lucide="external-link" style="width: 10px; height: 10px;"></i>
      </a>
    </li>
  `).join("");

  initLucide();
}

// ==========================================================================
// RESOURCE DIRECTORY PORTAL
// ==========================================================================
const resourcesDatabase = [
  { name: "GitHub For Startups", category: "tech", free: true, desc: "Get up to 20 seats of GitHub Enterprise free for one year, plus advanced security features.", link: "https://partner.github.com/startups" },
  { name: "AWS Activate", category: "tech", free: true, desc: "Receive up to $100,000 in free cloud hosting credits, active developer support channels, and training.", link: "https://aws.amazon.com/activate/" },
  { name: "Google Cloud for Startups", category: "tech", free: true, desc: "Apply for up to $200,000 in Google Cloud and Firebase credits, plus access to local technical consultants.", link: "https://cloud.google.com/startup" },
  { name: "Vercel Platform", category: "tech", free: true, desc: "Deploy frontend applications instantly. Offers a generous hobby tier for initial validation pilots.", link: "https://vercel.com" },
  
  { name: "Figma Standard Edition", category: "design", free: true, desc: "Free basic tier for collaborative wireframing and responsive prototyping with early users.", link: "https://figma.com" },
  { name: "Google Fonts & Icons", category: "design", free: true, desc: "An open repository of modern typography, icons, and graphic tokens for UI builders.", link: "https://fonts.google.com" },
  { name: "Undraw Vectors", category: "design", free: true, desc: "A massive catalog of open-source SVG vector illustrations to enhance landing page styling.", link: "https://undraw.co" },
  
  { name: "Clerky Legal Portal", category: "legal", free: false, desc: "The standard tool for high-growth tech startups. Streamlines Delaware C-Corp creation and cap table allocation.", link: "https://clerky.com" },
  { name: "Cooley GO Docs", category: "legal", free: true, desc: "Free generation tools for B2B contracts, seed round SAFE notes, employee NDAs, and privacy policies.", link: "https://cooleygo.com" },
  { name: "Stripe Atlas", category: "legal", free: false, desc: "Register an entity in Delaware from anywhere in the world and set up standard bank links.", link: "https://stripe.com/atlas" },

  { name: "HubSpot for Startups", category: "growth", free: true, desc: "Up to 90% off HubSpot marketing, CRM, and sales automation systems for early-stage companies.", link: "https://hubspot.com/startups" },
  { name: "Substack & Mailchimp", category: "growth", free: true, desc: "Build developer waitlists and launch weekly news briefings to attract and retain initial cohorts.", link: "https://substack.com" }
];

function filterResources(category) {
  // Update buttons state
  document.querySelectorAll(".filter-btn").forEach(btn => {
    if (btn.getAttribute("data-category") === category) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  const grid = document.getElementById("resources-grid");
  grid.innerHTML = "";

  const filtered = category === 'all' 
    ? resourcesDatabase 
    : resourcesDatabase.filter(r => r.category === category);

  grid.innerHTML = filtered.map(res => `
    <div class="resource-card card">
      <div class="res-meta">
        <span class="res-cat">${res.category}</span>
        ${res.free ? '<span class="res-free">Free Tier</span>' : ''}
      </div>
      <h4>${res.name}</h4>
      <p>${res.desc}</p>
      <a href="${res.link}" target="_blank" rel="noopener noreferrer">
        <span>Access Resource</span>
        <i data-lucide="external-link" style="width: 12px; height: 12px;"></i>
      </a>
    </div>
  `).join("");

  initLucide();
}

// Initial draw
filterResources('all');

// ==========================================================================
// TOAST MESSAGER
// ==========================================================================
function showToast(message, type = "info") {
  const toast = document.getElementById("toast");
  const msgEl = document.getElementById("toast-msg");
  const iconEl = document.getElementById("toast-icon");

  msgEl.textContent = message;
  
  // Customize icon based on type
  if (type === 'success') {
    iconEl.setAttribute("data-lucide", "check-circle");
    toast.style.borderColor = "var(--success)";
  } else if (type === 'warning') {
    iconEl.setAttribute("data-lucide", "alert-triangle");
    toast.style.borderColor = "var(--warning)";
  } else {
    iconEl.setAttribute("data-lucide", "info");
    toast.style.borderColor = "var(--primary)";
  }
  
  initLucide();
  
  // Show Toast
  toast.classList.remove("hidden");

  // Dismiss Toast
  setTimeout(() => {
    toast.classList.add("hidden");
  }, 3500);
}

// ==========================================================================
// ADVANCED DYNAMIC COMPETITORS ENGINE
// ==========================================================================
function renderCompetitorSection(plan) {
  if (!plan) return;
  
  // 1. Render Table Headers
  const table = document.getElementById("competitor-table");
  if (table) {
    const thead = table.querySelector("thead") || table.createTHead();
    thead.innerHTML = `
      <tr>
        <th style="width: 25%;">Feature / Vector</th>
        <th class="highlight-cell" style="width: 20%;">${plan.name}</th>
        ${plan.competitors.map((comp, idx) => `
          <th style="width: 15%; position: relative;">
            <span contenteditable="true" onblur="handleCompetitorNameEdit(${idx}, this)" class="comp-name-header" title="Click to rename competitor">${comp.name}</span>
            <button class="delete-col-btn" onclick="deleteCompetitor(${idx})" title="Delete Competitor">×</button>
          </th>
        `).join("")}
      </tr>
    `;
  }

  // 2. Render Table Rows
  const tbody = document.getElementById("competitor-rows");
  if (tbody) {
    if (plan.matrixRows.length === 0) {
      tbody.innerHTML = `<tr><td colspan="${plan.competitors.length + 2}" class="placeholder-text text-center">No features comparison. Click 'Add Vector' to begin.</td></tr>`;
    } else {
      tbody.innerHTML = plan.matrixRows.map((row, rIdx) => `
        <tr>
          <td class="matrix-vector-name" style="position: relative;">
            <button class="delete-row-btn" onclick="deleteFeatureVector(${rIdx})" title="Delete Feature">×</button>
            <span contenteditable="true" data-row="${rIdx}" data-col="0" onblur="handleMatrixCellEdit(event)">${row[0]}</span>
          </td>
          <td class="highlight-cell" contenteditable="true" data-row="${rIdx}" data-col="1" onblur="handleMatrixCellEdit(event)">${row[1]}</td>
          ${plan.competitors.map((comp, cIdx) => `
            <td contenteditable="true" data-row="${rIdx}" data-col="${cIdx + 2}" onblur="handleMatrixCellEdit(event)">${row[cIdx + 2] || ""}</td>
          `).join("")}
        </tr>
      `).join("");
    }
  }

  // 3. Render Map Reposition Selector Options
  const targetSelect = document.getElementById("map-reposition-target");
  if (targetSelect) {
    const currentSelection = targetSelect.value || "us";
    targetSelect.innerHTML = `
      <option value="us">Your Startup (${plan.name})</option>
      ${plan.competitors.map((c, idx) => `<option value="${idx}">${c.name}</option>`).join("")}
    `;
    // Restore selection if valid, otherwise default to us
    if (currentSelection === "us" || parseInt(currentSelection) < plan.competitors.length) {
      targetSelect.value = currentSelection;
    } else {
      targetSelect.value = "us";
    }
  }

  // 4. Render Map Nodes dynamically
  renderMapNodes(plan);

  // 5. Render Legend
  const legendContainer = document.getElementById("map-legend-container");
  if (legendContainer) {
    legendContainer.innerHTML = `
      <span class="legend-item"><span class="legend-dot dot-us"></span><span>${plan.name}</span></span>
      ${plan.competitors.map((c, idx) => {
        let dotClass = "dot-c1";
        if (idx === 1) dotClass = "dot-c2";
        if (idx >= 2) dotClass = "dot-c3";
        return `<span class="legend-item"><span class="legend-dot ${dotClass}"></span><span>${c.name}</span></span>`;
      }).join("")}
    `;
  }

  // 6. Render Battlecards
  renderBattlecards(plan);
}

function renderMapNodes(plan) {
  const nodeContainer = document.getElementById("dynamic-map-nodes");
  if (!nodeContainer) return;
  
  nodeContainer.innerHTML = "";
  
  // Render startup node
  const usNode = document.createElement("div");
  usNode.className = "map-node node-us";
  usNode.id = "node-us";
  usNode.style.bottom = `${plan.usY}%`;
  usNode.style.left = `${plan.usX}%`;
  usNode.innerHTML = `<span class="node-label">We</span>`;
  usNode.title = `${plan.name} (X: ${plan.usX}%, Y: ${plan.usY}%)`;
  usNode.onclick = (e) => {
    e.stopPropagation();
    selectRepositionTarget("us");
  };
  nodeContainer.appendChild(usNode);

  // Render competitor nodes
  plan.competitors.forEach((c, idx) => {
    const node = document.createElement("div");
    let cClass = "node-c1";
    if (idx === 1) cClass = "node-c2";
    if (idx >= 2) cClass = "node-c3";
    
    node.className = `map-node ${cClass}`;
    node.style.bottom = `${c.y}%`;
    node.style.left = `${c.x}%`;
    node.innerHTML = `<span class="node-label">C${idx + 1}</span>`;
    node.title = `${c.name} (X: ${c.x}%, Y: ${c.y}%)`;
    node.onclick = (e) => {
      e.stopPropagation();
      selectRepositionTarget(idx);
    };
    nodeContainer.appendChild(node);
  });
}

function selectRepositionTarget(target) {
  const select = document.getElementById("map-reposition-target");
  if (select) {
    select.value = target.toString();
    showToast(`Target selected for repositioning: ${target === "us" ? "Your Startup" : "Competitor " + (parseInt(target) + 1)}`, "info");
  }
}

function renderBattlecards(plan) {
  const container = document.getElementById("competitor-battlecards");
  if (!container) return;
  
  container.innerHTML = "";

  // 1. Startup Self Card
  const selfCard = document.createElement("div");
  selfCard.className = "battlecard";
  selfCard.innerHTML = `
    <div class="battlecard-header">
      <h4 class="battlecard-title">${plan.name}</h4>
      <span class="battlecard-threat threat-badge-self">Self</span>
    </div>
    <div class="battlecard-section">
      <span class="battlecard-label">Core Value Proposition</span>
      <div class="battlecard-desc">${plan.valProp}</div>
    </div>
    <div class="battlecard-section">
      <span class="battlecard-label">Strategic Playbook</span>
      <div class="battlecard-playbook battlecard-playbook-self">Defend our pricing margin. Launch validation checks, talk to ICP users, and execute MVP timeline checkpoints. Keep LTV/CAC leverage over 3x.</div>
    </div>
  `;
  container.appendChild(selfCard);

  // 2. Competitors Cards
  plan.competitors.forEach((c, idx) => {
    const card = document.createElement("div");
    card.className = "battlecard";
    
    let badgeClass = "threat-badge-medium";
    if (c.threat === "High") badgeClass = "threat-badge-high";
    if (c.threat === "Low") badgeClass = "threat-badge-low";
    
    card.innerHTML = `
      <div class="battlecard-header">
        <h4 class="battlecard-title" contenteditable="true" onblur="handleBattlecardNameEdit(${idx}, this)" title="Click to edit competitor name">${c.name}</h4>
        <span class="battlecard-threat ${badgeClass}" style="cursor: pointer;" onclick="cycleThreatLevel(${idx})" title="Click to cycle threat level">${c.threat || "Medium"}</span>
      </div>
      <div class="battlecard-section">
        <span class="battlecard-label">Market Placement</span>
        <div class="battlecard-desc" contenteditable="true" onblur="handleBattlecardDescEdit(${idx}, this)" title="Click to edit description">${c.description || "Describe competitor features, strengths, and market placement."}</div>
      </div>
      <div class="battlecard-section">
        <span class="battlecard-label">Defensive Playbook</span>
        <div class="battlecard-playbook" contenteditable="true" onblur="handleBattlecardPlaybookEdit(${idx}, this)" title="Click to edit defensive strategy">${c.playbook || "Formulate strategy to beat this competitor."}</div>
      </div>
      <div class="battlecard-actions">
        <button class="battlecard-btn battlecard-btn-danger" onclick="deleteCompetitor(${idx})">
          <i data-lucide="trash-2" style="width: 12px; height: 12px;"></i>
          <span>Remove Competitor</span>
        </button>
      </div>
    `;
    container.appendChild(card);
  });
  
  initLucide();
}

function handleCompetitorNameEdit(idx, el) {
  const val = el.textContent.trim();
  if (!val) {
    el.textContent = window.currentStartupPlan.competitors[idx].name;
    return;
  }
  window.currentStartupPlan.competitors[idx].name = val;
  renderCompetitorSection(window.currentStartupPlan);
}

function handleBattlecardNameEdit(idx, el) {
  const val = el.textContent.trim();
  if (!val) {
    el.textContent = window.currentStartupPlan.competitors[idx].name;
    return;
  }
  window.currentStartupPlan.competitors[idx].name = val;
  renderCompetitorSection(window.currentStartupPlan);
}

function handleBattlecardDescEdit(idx, el) {
  const val = el.textContent.trim();
  window.currentStartupPlan.competitors[idx].description = val;
}

function handleBattlecardPlaybookEdit(idx, el) {
  const val = el.textContent.trim();
  window.currentStartupPlan.competitors[idx].playbook = val;
}

function cycleThreatLevel(idx) {
  const c = window.currentStartupPlan.competitors[idx];
  const levels = ["Low", "Medium", "High"];
  let nextIdx = (levels.indexOf(c.threat || "Medium") + 1) % 3;
  c.threat = levels[nextIdx];
  renderCompetitorSection(window.currentStartupPlan);
  showToast(`Threat level for ${c.name} updated to ${c.threat}!`, "success");
}

function handleMatrixCellEdit(e) {
  const el = e.target;
  const rIdx = parseInt(el.getAttribute("data-row"));
  const cIdx = parseInt(el.getAttribute("data-col"));
  if (isNaN(rIdx) || isNaN(cIdx)) return;
  
  const val = el.textContent.trim();
  window.currentStartupPlan.matrixRows[rIdx][cIdx] = val;
}

function handleMapClick(event) {
  const plan = window.currentStartupPlan;
  if (!plan) return;
  
  const mapEl = document.getElementById("positioning-map");
  if (!mapEl) return;
  
  const rect = mapEl.getBoundingClientRect();
  const clickX = event.clientX - rect.left;
  const clickY = event.clientY - rect.top;
  
  let xPercent = Math.round((clickX / rect.width) * 100);
  let yPercent = Math.round(((rect.height - clickY) / rect.height) * 100);
  
  xPercent = Math.max(0, Math.min(100, xPercent));
  yPercent = Math.max(0, Math.min(100, yPercent));
  
  const targetSelect = document.getElementById("map-reposition-target");
  if (!targetSelect) return;
  
  const target = targetSelect.value;
  if (target === "us") {
    plan.usX = xPercent;
    plan.usY = yPercent;
    showToast(`Repositioned ${plan.name} to X: ${xPercent}%, Y: ${yPercent}%`, "success");
  } else {
    const idx = parseInt(target);
    if (!isNaN(idx) && plan.competitors[idx]) {
      plan.competitors[idx].x = xPercent;
      plan.competitors[idx].y = yPercent;
      showToast(`Repositioned ${plan.competitors[idx].name} to X: ${xPercent}%, Y: ${yPercent}%`, "success");
    }
  }
  
  renderMapNodes(plan);
}

function updateAxesLabels() {
  const yAxis = document.getElementById("map-axis-y").value;
  const xAxis = document.getElementById("map-axis-x").value;
  
  const yLabels = {
    "price": { high: "Premium / High Cost", low: "Affordable / Low Cost" },
    "market-share": { high: "Dominant Leader", low: "Niche Challenger" },
    "completeness": { high: "Full Suite Features", low: "Point Solution" }
  };
  
  const xLabels = {
    "automation": { left: "Manual / Legacy", right: "Automated / AI-driven" },
    "ease": { left: "Complex / Consultative", right: "Self-Serve / Intuitive" },
    "speed": { left: "Slow / Latent", right: "Real-Time Speed" }
  };
  
  if (yLabels[yAxis]) {
    document.getElementById("label-y-high").textContent = yLabels[yAxis].high;
    document.getElementById("label-y-low").textContent = yLabels[yAxis].low;
  }
  
  if (xLabels[xAxis]) {
    document.getElementById("label-x-left").textContent = xLabels[xAxis].left;
    document.getElementById("label-x-right").textContent = xLabels[xAxis].right;
  }
  
  showToast("Market positioning axes updated!", "info");
}

function addCustomFeatureVector() {
  const plan = window.currentStartupPlan;
  if (!plan) return;
  
  const newRow = [
    "New Feature Vector",
    "Proprietary smart value",
    ...plan.competitors.map(() => "Basic capability")
  ];
  
  plan.matrixRows.push(newRow);
  renderCompetitorSection(plan);
  showToast("Added new feature vector. Click text directly to edit comparison!", "success");
}

function deleteFeatureVector(rIdx) {
  const plan = window.currentStartupPlan;
  if (!plan) return;
  
  plan.matrixRows.splice(rIdx, 1);
  renderCompetitorSection(plan);
  showToast("Feature vector removed.", "info");
}

function promptAddCompetitor() {
  const plan = window.currentStartupPlan;
  if (!plan) return;
  
  if (plan.competitors.length >= 5) {
    showToast("Maximum limit of 5 competitors reached to keep dashboard clear.", "warning");
    return;
  }
  
  const name = prompt("Enter the name of the new competitor:", "Competitor " + String.fromCharCode(65 + plan.competitors.length));
  if (!name) return;
  
  const cleanName = name.trim();
  if (!cleanName) return;
  
  plan.competitors.push({
    name: cleanName,
    features: ["Standard Option"],
    x: Math.floor(Math.random() * 50) + 20,
    y: Math.floor(Math.random() * 50) + 20,
    threat: "Medium",
    description: "Competitor recently active in the space with standard features.",
    playbook: "Deliver a simpler, faster experience and optimize client CAC metrics."
  });
  
  plan.matrixRows.forEach(row => {
    row.push("Basic capability");
  });
  
  renderCompetitorSection(plan);
  showToast(`Added competitor: ${cleanName}!`, "success");
}

function deleteCompetitor(idx) {
  const plan = window.currentStartupPlan;
  if (!plan) return;
  
  const compName = plan.competitors[idx].name;
  if (!confirm(`Are you sure you want to remove competitor "${compName}"?`)) return;
  
  plan.competitors.splice(idx, 1);
  
  plan.matrixRows.forEach(row => {
    row.splice(idx + 2, 1);
  });
  
  renderCompetitorSection(plan);
  showToast(`Removed competitor: ${compName}`, "info");
}
