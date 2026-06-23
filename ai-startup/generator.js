/**
 * generator.js
 * Rule-based AI Engine that simulates deep startup analysis and planning.
 * Generates custom structured data based on the industry, audience, and problem statement.
 */

function detectExistingProblem(problem) {
  const p = problem.toLowerCase();
  
  if (p.includes("tax") || p.includes("invoice") || p.includes("billing") || p.includes("accounting") || p.includes("payment")) {
    return {
      detected: true,
      space: "Freelancer Tax & Billing Automation",
      suggestions: [
        "Avoid building a broad, generic bookkeeping suite. Instead, target highly specific niches like 'tax deduction finder for content creators' or 'automated quarterly VAT filing for Shopify EU merchants'.",
        "Implement direct bank-feed API integrations (Plaid/Teller) to automatically segregate tax reserves rather than relying on manual receipt uploads.",
        "Consider a usage-based pricing model matching the user's seasonal income structure instead of standard monthly SaaS subscriptions."
      ]
    };
  }
  
  if (p.includes("nurse") || p.includes("health aide") || p.includes("ehr") || p.includes("visit log") || p.includes("medical") || p.includes("patient") || p.includes("clinic") || p.includes("doctor")) {
    return {
      detected: true,
      space: "Healthcare & Patient Logs Documentation",
      suggestions: [
        "Do not build a new EHR system. Connect to legacy ones via specialized FHIR APIs or HL7 interfaces.",
        "Focus on specialized UI/UX like voice-activated dictation templates for nurses on physical tablets, allowing them to remain hands-free.",
        "Address HIPAA liability by utilizing managed HIPAA-compliant cloud storage providers (e.g. AWS GovCloud) and SOC2-ready databases from day one."
      ]
    };
  }

  if (p.includes("ride") || p.includes("uber") || p.includes("taxi") || p.includes("cab") || p.includes("transport") || p.includes("carpool")) {
    return {
      detected: true,
      space: "On-demand Mobility & Ride-sharing Platforms",
      suggestions: [
        "General B2C ride-sharing is cost-prohibitive. Target B2B niche logistics such as specialized medical transit, student sports transport, or corporate park shuttles.",
        "Differentiate by providing route consolidation algorithms for electric vehicle fleets, optimizing based on charging station locations.",
        "Start with a high-fidelity WhatsApp Business bot or lightweight web app first to test demand before building native iOS/Android apps."
      ]
    };
  }

  if (p.includes("food") || p.includes("delivery") || p.includes("restaurant") || p.includes("meal") || p.includes("grocery")) {
    return {
      detected: true,
      space: "On-demand Food & Grocery Delivery Services",
      suggestions: [
        "Avoid high customer acquisition costs of generic delivery. Target micro-environments like corporate office parks, universities, or industrial yards with consolidated daily drops.",
        "Introduce dynamic group-ordering systems where neighbors share delivery costs, lowering CAC and increasing average order value (AOV).",
        "Provide direct white-label software for restaurants to manage their own local deliveries, saving them from high platform commission cuts."
      ]
    };
  }

  if (p.includes("gym") || p.includes("fitness") || p.includes("workout") || p.includes("coach") || p.includes("trainer")) {
    return {
      detected: true,
      space: "Fitness Trackers & Gym Management Apps",
      suggestions: [
        "Saturated consumer app store space. Shift focus to corporate wellness programs or software for boutique gym instructors (yoga, pilates) to run community memberships.",
        "Incorporate automated hardware integrations (WearOS/Apple Health APIs) to collect real-time biometric indicators instead of manual calorie logging.",
        "Gamify the experience with high-incentive community challenges or employer-sponsored rewards programs."
      ]
    };
  }

  return { detected: false, space: "", suggestions: [] };
}

function generatePlanData(name, industry, audience, problem) {
  // Clean inputs
  name = name.trim();
  problem = problem.trim();

  // Run duplicate / existing problem detection check
  const problemCheck = detectExistingProblem(problem);

  // Pick keyword indicators from problem statement to make output custom
  const problemKeywords = problem.split(' ')
    .filter(w => w.length > 5)
    .map(w => w.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, ""))
    .slice(0, 4);
  
  const coreKeyword = problemKeywords[0] || 'efficiency';
  const secondKeyword = problemKeywords[1] || 'automation';

  // Base Templates depending on Industry Sector
  let valProp = "";
  let icp = "";
  let validation = [];
  let swot = { s: [], w: [], o: [], t: [] };
  let tam = 0, sam = 0, som = 0;
  let defaultPrice = 1200;
  let defaultCac = 300;
  let defaultChurn = 8;
  let defaultCustomers = 150;
  let competitors = [];
  let roadmap = [];
  let fundingPathways = [];
  let grants = [];
  let pitchDeck = [];

  // Industry Specific Configurations
  switch (industry) {
    case "SaaS":
      valProp = `An automated, secure cloud-based workspace that helps ${audience} resolve issues with ${coreKeyword} by simplifying workflows and integrating directly with active systems, leading to a 35% time reduction.`;
      icp = `Director of Operations and IT Managers at mid-market organizations ($10M-$100M ARR) facing bottlenecks in ${coreKeyword} and seeking structured SaaS tools.`;
      validation = [
        "Conduct 15 customer discovery calls with targets to validate the core friction.",
        "Launch an interactive Figma prototype illustrating the automated workflow.",
        "Secure 5 non-binding Letters of Intent (LOIs) from B2B partners.",
        "Build and launch a basic functional web app handling single transaction pipelines.",
        "Acquire 3 active pilot companies and monitor weekly engagement rates."
      ];
      swot = {
        s: ["Highly scalable business model with high gross margins (80%+).", "Proprietary algorithm/workflow addressing B2B pain point.", "Low marginal cost of replication."],
        w: ["Long enterprise sales cycles for larger client tiers.", "Initial lack of brand authority vs. legacy systems.", "Integration complexity with outdated databases."],
        o: ["Integrations with Slack, Microsoft Teams, and Jira to expand footprint.", "Developing custom analytics reports as a premium upsell.", "Expanding target audience from mid-market to enterprise."],
        t: ["Fast-following features from well-funded legacy tools.", "Data security compliance issues (GDPR/SOC2 audits).", "SaaS fatigue leading to tighter budget approvals."]
      };
      tam = 8500; // $8.5 Billion
      sam = 920;  // $920 Million
      som = 45;   // $45 Million
      defaultPrice = 2400;
      defaultCac = 600;
      defaultChurn = 7;
      defaultCustomers = 120;
      competitors = [
        { 
          name: "Legacy Enterprises", 
          features: ["High Cost", "Slow Execution", "Manual Customization", "No Automation"], 
          x: 25, 
          y: 80, 
          threat: "High", 
          description: "Dominant industry giants with high pricing, rigid sales pipelines, and clunky legacy software.",
          playbook: "Target mid-market accounts with 10x faster self-serve setup and modern workflow integrations."
        },
        { 
          name: "SaaS Startups", 
          features: ["Medium Cost", "Average Setup", "Partial Integrations", "Limited Security"], 
          x: 60, 
          y: 40,
          threat: "Medium",
          description: "Nimble modern vendors focusing on simple UX but lacking custom workflows and enterprise compliance.",
          playbook: "Highlight our deeper workflow customization, API-first approach, and SOC2/GDPR readiness."
        },
        { 
          name: "Spreadsheet Workarounds", 
          features: ["Zero Cost", "High Human Error", "No Integrations", "Manual Scouring"], 
          x: 15, 
          y: 15,
          threat: "Low",
          description: "Internal business processes managed manually in Microsoft Excel or Google Sheets by operators.",
          playbook: "Quantify human error rates and operational hours lost, illustrating ROI of direct automation."
        }
      ];
      break;

    case "FinTech":
      valProp = `A modern API-first compliance and transaction platform allowing ${audience} to securely manage capital, execute transfers, and automate calculations for ${coreKeyword} without heavy compliance overhead.`;
      icp = `CFOs, Finance leads, or compliance heads at high-growth startups and SMBs dealing with cross-border operations or complex ${secondKeyword} regulations.`;
      validation = [
        "Consult with 3 certified fintech compliance attorneys to map regulation pathways.",
        "Create a mock transaction landing page with waitlist to measure acquisition cost.",
        "Integrate sandbox APIs with Stripe or Plaid for test account connectivity.",
        "Complete a compliance draft for state licensing or find a sponsor bank.",
        "Process $10,000 in transaction volume through 5 initial closed-beta users."
      ];
      swot = {
        s: ["High transactional stickiness once embedded in user cash flows.", "Proprietary compliance checks reducing fraud risk.", "Clear regulatory blueprint."],
        w: ["High dependency on banking sponsors and payment rails.", "High upfront capital requirements for licensing.", "Potential liability issues if transaction fraud occurs."],
        o: ["Offering short-term credit options based on transactional data.", "Cross-border payment scaling into untapped markets.", "B2B SaaS API licensing to other financial entities."],
        t: ["Tighter banking regulations and SEC guidelines.", "Sudden shifts in interest rates impacting transaction margins.", "Cybersecurity breaches targeting user wallets."]
      };
      tam = 14200; // $14.2 Billion
      sam = 1800;  // $1.8 Billion
      som = 85;    // $85 Million
      defaultPrice = 5000;
      defaultCac = 1200;
      defaultChurn = 5;
      defaultCustomers = 60;
      competitors = [
        { 
          name: "Traditional Bank Portals", 
          features: ["Very High Trust", "Terrible APIs", "High Wire Fees", "1990s UI/UX"], 
          x: 30, 
          y: 75,
          threat: "High",
          description: "Highly trusted banking partners whose digital portals suffer from slow speeds and non-existent API support.",
          playbook: "Embed our developer-first APIs directly into client accounting software, saving massive bookkeeping time."
        },
        { 
          name: "Stripe/Adyen", 
          features: ["Universal Standard", "High Transaction Fees", "Generic Integration", "Difficult Custom Rules"], 
          x: 75, 
          y: 65,
          threat: "Medium",
          description: "Market-leading payment infrastructures that act as generic utilities but lack niche vertical workflows.",
          playbook: "Charge zero setup fees and build customized compliance rules tailored to specific transaction sectors."
        },
        { 
          name: "Manual Accountants", 
          features: ["Low Scale", "High Cost", "Slow Audits", "Excellent Personal Service"], 
          x: 15, 
          y: 55,
          threat: "Low",
          description: "Outsourced accounting firms manually processing books and calculations weekly or monthly.",
          playbook: "Position as a real-time ledger that runs constantly, offering accountants clean parsed data feeds."
        }
      ];
      break;

    case "HealthTech":
      valProp = `A secure, HIPPA-compliant workflow suite that bridges the gap between ${audience} and administrative tasks regarding ${coreKeyword}, reducing diagnostic friction and improving engagement.`;
      icp = `Clinical directors, health system operators, or independent medical practitioners seeking to reduce burnout in ${secondKeyword}.`;
      validation = [
        "Secure HIPAA advisory consultation to review security structures.",
        "Interview 10 medical staff personnel to map administrative tasks.",
        "Develop static prototype simulating secure patient/provider portal.",
        "Acquire letters of interest from 2 private practice clinics for beta.",
        "Launch clinical trial pilot with 20 active patient profiles."
      ];
      swot = {
        s: ["HIPAA/GDPR compliance creates high barriers to entry for competitors.", "Directly solves severe clinical staff burnout problems.", "Strong impact story for institutional buyers."],
        w: ["Extremely long sales cycles (6 to 18 months).", "Intense regulatory scrutiny and audit requirements.", "Integrations with legacy EHR systems (Epic/Cerner) are notoriously difficult."],
        o: ["White-label software licensing for large hospital systems.", "AI assistance integrations for automating clinical charting.", "Expanding remote patient monitoring features."],
        t: ["Liability claims regarding data breaches of patient records.", "Changes in federal medical reimbursement rules.", "Consolidation of clinics into mega-networks that block startups."]
      };
      tam = 6800;
      sam = 750;
      som = 30;
      defaultPrice = 8000;
      defaultCac = 2000;
      defaultChurn = 6;
      defaultCustomers = 30;
      competitors = [
        { 
          name: "Epic Systems / EHR Giants", 
          features: ["Monolithic Market Share", "Extremely Expensive", "Poor Usability", "Rigid Infrastructure"], 
          x: 20, 
          y: 90,
          threat: "High",
          description: "Deeply entrenched healthcare databases with long sales cycles, rigid frameworks, and expensive licenses.",
          playbook: "Serve as a lightweight overlay that imports and syncs records seamlessly without replacing core EHR."
        },
        { 
          name: "Siloed Health Apps", 
          features: ["Cheap", "No EHR Integrations", "Patient-focused only", "Weak Security Standards"], 
          x: 65, 
          y: 30,
          threat: "Medium",
          description: "Point solutions targeting patient interactions but lacking system interoperability and compliance depth.",
          playbook: "Emphasize our clinical provider support, HIPAA security audits, and EHR connector infrastructure."
        },
        { 
          name: "Paper Records / Faxing", 
          features: ["Zero Tech Complexity", "Massive Time Leak", "Compliance Risk", "No Search/Analytics"], 
          x: 10, 
          y: 20,
          threat: "Low",
          description: "Legacy clinical environments relying on paperwork, physical forms, and fax machines to log records.",
          playbook: "Appeal to nurse burnout statistics and transcription error risks to drive quick adoption of voice tools."
        }
      ];
      break;

    case "Artificial Intelligence":
      valProp = `An advanced neural engine customized to analyze ${coreKeyword} for ${audience}, generating autonomous strategies and executing micro-tasks in real time with 99% accuracy.`;
      icp = `Technical leads and data-driven product managers needing to automate workflows and resolve ${secondKeyword} latency.`;
      validation = [
        "Build a simple prompt-engineered Python prototype or utility script.",
        "Test target latency and API costs on 10,000 synthetic queries.",
        "Publish an open-source tool on GitHub to build developer distribution.",
        "Integrate fine-tuned models to demonstrate proprietary advantage.",
        "Onboard 5 business clients for live-data pilot validation."
      ];
      swot = {
        s: ["Unprecedented speed in task completion and data processing.", "Rapid scalability utilizing serverless GPU hubs.", "Low marginal unit cost compared to human labor."],
        w: ["High dependence on underlying LLM model APIs (OpenAI/Anthropic).", "Occasional hallucination and formatting errors.", "GPU scaling costs during high spike loads."],
        o: ["Fine-tuning custom weights on proprietary user data for lock-in.", "Expanding into specialized offline enterprise deployments.", "API monetization for third-party developer integrations."],
        t: ["Rapid commoditization as open-source models improve.", "Emerging regulatory laws regarding model inputs/copyright.", "Sudden changes in pricing tiers of major cloud providers."]
      };
      tam = 22000;
      sam = 3100;
      som = 150;
      defaultPrice = 600;
      defaultCac = 150;
      defaultChurn = 12;
      defaultCustomers = 600;
      competitors = [
        { 
          name: "OpenAI Playground/API", 
          features: ["Extremely Low Cost", "Generic Performance", "Requires Coding", "Data Privacy Concerns"], 
          x: 70, 
          y: 15,
          threat: "High",
          description: "Direct access to frontier models, which is cheap but requires programming skills and exposes system data.",
          playbook: "Build verticalized features (pre-prompting, validation checks, secure enterprise compliance) on top."
        },
        { 
          name: "Consulting Dev Agencies", 
          features: ["High Quality", "Extremely Expensive", "Months to Deliver", "No SaaS Scale"], 
          x: 30, 
          y: 80,
          threat: "Medium",
          description: "Agencies offering customized software development at high costs with long development cycles.",
          playbook: "Sell our off-the-shelf product with 1-click integrations, offering instant ROI at a fraction of the cost."
        },
        { 
          name: "Legacy Rule Engines", 
          features: ["High Stability", "No AI adaptation", "Difficult to Update", "Slow to match inputs"], 
          x: 45, 
          y: 60,
          threat: "Low",
          description: "Traditional software using hardcoded if/else rules, which are stable but unable to handle raw text.",
          playbook: "Illustrate how our LLM pipelines parse complex unstructured inputs that rules-based engines fail on."
        }
      ];
      break;

    case "ClimateTech":
      valProp = `A hardware-enabled monitoring platform that tracks carbon outputs and optimizes resources for ${audience}, lowering emissions and reducing costs through automated ${coreKeyword} diagnostics.`;
      icp = `Sustainability officers and supply chain directors at manufacturing and logistics companies attempting to meet carbon neutrality compliance.`;
      validation = [
        "Map carbon compliance mandates across 3 target state jurisdictions.",
        "Conduct discovery calls with 10 factory managers on waste pain points.",
        "Build a bench-scale hardware prototype utilizing off-the-shelf sensors.",
        "Deploy 1 physical sensor kit at a local partner facility for a 30-day run.",
        "Verify analytics dashboard correlation with physical waste reductions."
      ];
      swot = {
        s: ["High ESG compliance value creates massive corporate urgency.", "Direct physical impact that is easy to demonstrate to regulators.", "Subsidized government funding avenues (Grants/Tax credits)."],
        w: ["Hardware development requires higher upfront CAPEX.", "Complex supply chains for sensor sourcing.", "Long installation and calibration cycles in the field."],
        o: ["Selling carbon credit offsets directly through an integrated portal.", "Expanding analytics tools to cover scope 3 supply chain emissions.", "Licensing hardware blueprints to international partners."],
        t: ["Political shifts weakening carbon penalties.", "Supply chain bottlenecks in raw minerals or microchips.", "Rapidly changing sensor technologies making units obsolete."]
      };
      tam = 15500;
      sam = 1400;
      som = 50;
      defaultPrice = 12000;
      defaultCac = 4000;
      defaultChurn = 4;
      defaultCustomers = 25;
      competitors = [
        { 
          name: "Carbon Consulting firms", 
          features: ["High Credibility", "Manual Audits", "Extremely Slow", "One-off reports only"], 
          x: 35, 
          y: 85,
          threat: "High",
          description: "Consultancies executing customized carbon counts via spreadsheet audits and manual reporting twice a year.",
          playbook: "Provide automated software connected directly to utilities for continuous compliance analytics."
        },
        { 
          name: "Basic Utility meters", 
          features: ["Cheap", "No emission breakdown", "Standard hardware", "No optimization intelligence"], 
          x: 50, 
          y: 25,
          threat: "Medium",
          description: "Basic hardware meters capturing electricity use but lacking carbon conversion and software tracking.",
          playbook: "Interface with existing meters via API and layer on a comprehensive ESG report dashboard."
        },
        { 
          name: "Excel Carbon trackers", 
          features: ["Free", "Prone to greenwashing audits", "High manual data entry", "No hardware check"], 
          x: 15, 
          y: 15,
          threat: "Low",
          description: "Ad-hoc corporate spreadsheets that rely on self-reporting and are easily prone to regulatory audit errors.",
          playbook: "Sell automated verification that guarantees audit-ready, secure data records for corporate auditors."
        }
      ];
      break;

    case "Consumer Web":
    default:
      valProp = `A frictionless, community-oriented social marketplace linking ${audience} with services to optimize ${coreKeyword} through verified ratings and fast scheduling.`;
      icp = `Digital-first consumers and gig workers seeking to streamline tasks and eliminate communication friction.`;
      validation = [
        "Perform street discovery surveys with 50 local target users.",
        "Launch an ad campaign landing page to measure click-through rate.",
        "Build a simple low-code marketplace prototype (Glide/Bubble).",
        "Facilitate 50 manual matches to verify transaction comfort levels.",
        "Introduce digital payments to measure net platform commission."
      ];
      swot = {
        s: ["Viral growth loops driven by community user shares.", "Low transaction friction once network effects take hold.", "High user demographic diversity."],
        w: ["High marketing spend required to acquire initial buyers.", "Severe 'cold start' chicken-and-egg problem for marketplaces.", "Lower transaction margins requiring high volume."],
        o: ["Affiliate marketing programs and premium subscription features.", "Partnering with brand sponsors to offer direct in-app ads.", "Launching regional chapters in secondary tier cities."],
        t: ["Platform disintermediation (users taking transactions offline).", "Intense competition from local classified boards and Facebook Groups.", "Sudden shifts in consumer app design trends."]
      };
      tam = 31000;
      sam = 2500;
      som = 120;
      defaultPrice = 80;
      defaultCac = 20;
      defaultChurn = 18;
      defaultCustomers = 1500;
      competitors = [
        { 
          name: "Craigslist / Facebook Groups", 
          features: ["Completely Free", "Zero trust safety", "Clunky UI/UX", "High Spam"], 
          x: 15, 
          y: 10,
          threat: "High",
          description: "Free community message boards with high usage but riddled with transaction fraud, spam, and manual friction.",
          playbook: "Integrate stripe escrows, double-sided ratings, and smart matches to guarantee user trust."
        },
        { 
          name: "TaskRabbit / Thumbtack", 
          features: ["Established Trust", "High platform fees", "Rigid booking", "Transactional focus only"], 
          x: 65, 
          y: 70,
          threat: "Medium",
          description: "Large marketplaces charging massive commissions per match, focusing solely on one-off requests.",
          playbook: "Charge a flat membership tier and build community features that increase long-term user retention."
        },
        { 
          name: "Word of Mouth", 
          features: ["Highest trust factor", "Not searchable", "Very slow to discover", "Limited availability"], 
          x: 30, 
          y: 40,
          threat: "Low",
          description: "Direct recommendations between family and friends. Highly trustworthy but impossible to scale.",
          playbook: "Provide share links and referral incentives to digitalize user referral networks quickly."
        }
      ];
      break;
  }

  // Adjust SOM dynamically if stage changes
  if (audience === "B2B Enterprises") {
    tam = Math.round(tam * 1.2);
    sam = Math.round(sam * 1.5);
    som = Math.round(som * 1.8);
    defaultPrice = Math.round(defaultPrice * 3);
    defaultCac = Math.round(defaultCac * 2.5);
  } else if (audience === "Developers") {
    defaultPrice = Math.round(defaultPrice * 0.5);
    defaultCac = Math.round(defaultCac * 0.4);
    defaultChurn = defaultChurn + 2;
  }

  // Define dynamic resources kit
  let techStack = [];
  let githubUrl = "";
  let githubRepoName = "";
  let diagramNodes = [];
  let diagramConnections = [];

  if (industry === "SaaS") {
    techStack = [
      { type: "Frontend Framework", name: "Next.js 14", desc: "React-based stack with server-side rendering." },
      { type: "UI Components", name: "TailwindCSS + Shadcn/UI", desc: "Modern styling templates." },
      { type: "Database Layer", name: "Supabase PostgreSQL", desc: "Highly relational serverless database." },
      { type: "Payments", name: "Stripe Connect", desc: "Process recurring subscription licensing." },
      { type: "Hosting Platform", name: "Vercel", desc: "Instant globally distributed Edge deployments." }
    ];
    githubUrl = "https://github.com/cedimi/nextjs-saas-boilerplate";
    githubRepoName = "cedimi/nextjs-saas-boilerplate";
    diagramNodes = [
      { id: "client", label: "User Client (Next.js)", x: 10, y: 50, desc: "Interactive frontend interface." },
      { id: "auth", label: "Auth (NextAuth)", x: 40, y: 15, desc: "Secure token verification & sessions." },
      { id: "api", label: "Core API (Node.js)", x: 50, y: 50, desc: "Business logic and validation runner." },
      { id: "db", label: "Database (PostgreSQL)", x: 85, y: 80, desc: "Saves plans, accounts, and audits." },
      { id: "stripe", label: "Stripe Gateway", x: 85, y: 20, desc: "Verifies subscription tiers." }
    ];
    diagramConnections = [
      { from: "client", to: "auth", label: "Authenticate" },
      { from: "client", to: "api", label: "Call API" },
      { from: "api", to: "db", label: "Read / Write" },
      { from: "api", to: "stripe", label: "Verify payment" }
    ];
  } else if (industry === "FinTech") {
    techStack = [
      { type: "Frontend Framework", name: "Next.js / React", desc: "Secure frontend dashboard builder." },
      { type: "Backend API", name: "Go (Golang)", desc: "High performance ledger processing." },
      { type: "Database Layer", name: "PostgreSQL Ledger Schema", desc: "Double-entry bookkeeping compliance store." },
      { type: "FinTech Connect", name: "Plaid API + Stripe", desc: "Bank accounts & transfers API link." },
      { type: "Hosting Platform", name: "AWS ECS (Fargate)", desc: "SOC2 audited container orchestration." }
    ];
    githubUrl = "https://github.com/stripe/stripe-react-native";
    githubRepoName = "stripe/stripe-react-native";
    diagramNodes = [
      { id: "client", label: "Client Dashboard", x: 10, y: 50, desc: "Secure financial workspace." },
      { id: "plaid", label: "Plaid Link API", x: 40, y: 15, desc: "Secure bank feed verification." },
      { id: "ledger", label: "Go Ledger Core", x: 50, y: 50, desc: "Validates and executes transfers." },
      { id: "db", label: "Audit Relational DB", x: 85, y: 85, desc: "Immutable transaction logs." },
      { id: "stripe", label: "Stripe Transactor", x: 85, y: 25, desc: "Settles bank ACH payments." }
    ];
    diagramConnections = [
      { from: "client", to: "plaid", label: "Link Bank Account" },
      { from: "client", to: "ledger", label: "Initiate Transfer" },
      { from: "ledger", to: "db", label: "Log Transaction" },
      { from: "ledger", to: "stripe", label: "Settle Funds" }
    ];
  } else if (industry === "HealthTech") {
    techStack = [
      { type: "Frontend Framework", name: "React Web App", desc: "Lightweight portal optimized for tablets." },
      { type: "Backend API", name: "Python FastAPI", desc: "Fast ASGI server handling clinical JSON feeds." },
      { type: "Database Layer", name: "AWS Aurora (PostgreSQL)", desc: "HIPAA encrypted storage at rest." },
      { type: "Compliance Integration", name: "FHIR Server APIs", desc: "Industry standard clinical data sync interface." },
      { type: "Hosting Platform", name: "AWS GovCloud", desc: "Highly secure governmental compliance hosting." }
    ];
    githubUrl = "https://github.com/google/fhir-works-on-aws-deployment";
    githubRepoName = "google/fhir-works-on-aws";
    diagramNodes = [
      { id: "client", label: "Clinician App", x: 10, y: 50, desc: "Speech-to-text input dictation screen." },
      { id: "gateway", label: "HIPAA API Gateway", x: 40, y: 15, desc: "TLS validation & token checking." },
      { id: "fhir", label: "FHIR Parser Engine", x: 50, y: 50, desc: "Converts logs to medical compliant JSON." },
      { id: "db", label: "Encrypted RDS", x: 85, y: 85, desc: "Strictly audited database storage." },
      { id: "ehr", label: "EHR (Epic API)", x: 85, y: 25, desc: "Pushes records into hospital mainframe." }
    ];
    diagramConnections = [
      { from: "client", to: "gateway", label: "Dictate Log" },
      { from: "gateway", to: "fhir", label: "Parse Input" },
      { from: "fhir", to: "db", label: "Encrypt Record" },
      { from: "fhir", to: "ehr", label: "Sync EHR databases" }
    ];
  } else if (industry === "Artificial Intelligence") {
    techStack = [
      { type: "Frontend UI", name: "Next.js App Router", desc: "Frictionless AI chat web portal." },
      { type: "API & Orchestrator", name: "Python (LangChain / LlamaIndex)", desc: "Chains models, agents, and prompts." },
      { type: "Vector Store", name: "Supabase pgvector / Pinecone", desc: "Indices custom context semantic search." },
      { type: "Model Providers", name: "OpenAI / Claude API", desc: "Provides high-intelligence completions." },
      { type: "Hosting & Workers", name: "Fly.io + Celery", desc: "Scalable async worker tasks for model processing." }
    ];
    githubUrl = "https://github.com/nutlope/ai-chatbot";
    githubRepoName = "nutlope/ai-chatbot";
    diagramNodes = [
      { id: "client", label: "User Chat Console", x: 10, y: 50, desc: "Conversational UI layout." },
      { id: "agent", label: "LangChain Agent", x: 45, y: 50, desc: "Routes query to LLM or Vector Store." },
      { id: "vector", label: "Vector DB (Pinecone)", x: 80, y: 85, desc: "Queries relevant knowledge context." },
      { id: "llm", label: "Frontier LLM API", x: 80, y: 50, desc: "OpenAI/Claude prompt completion." },
      { id: "worker", label: "Async Task Worker", x: 45, y: 15, desc: "Executes long-running file parsing." }
    ];
    diagramConnections = [
      { from: "client", to: "agent", label: "Send Message" },
      { from: "agent", to: "vector", label: "Retrieve Context" },
      { from: "agent", to: "llm", label: "Process Completion" },
      { from: "agent", to: "worker", label: "Offload file tasks" }
    ];
  } else if (industry === "ClimateTech") {
    techStack = [
      { type: "Dashboard UI", name: "React + Leaflet.js Maps", desc: "Visualizes geo-spatial emission statistics." },
      { type: "Data Receiver", name: "Node.js MQTT Broker", desc: "Listens to live physical hardware sensor feeds." },
      { type: "Database Layer", name: "TimescaleDB (PostgreSQL)", desc: "Time-series database optimized for metrics history." },
      { type: "IoT Integration", name: "AWS IoT Core", desc: "Secures device onboarding and telemetry data streams." },
      { type: "Cloud Platform", name: "Heroku / AWS Fargate", desc: "Robust data scaling host." }
    ];
    githubUrl = "https://github.com/timescale/timescaledb";
    githubRepoName = "timescale/timescaledb";
    diagramNodes = [
      { id: "sensors", label: "Physical IoT Sensors", x: 10, y: 80, desc: "Installed hardware measuring gas/power." },
      { id: "broker", label: "AWS IoT Core Broker", x: 40, y: 50, desc: "Secures and logs incoming raw telemetry." },
      { id: "calc", label: "Emissions Calculator", x: 65, y: 50, desc: "Converts power metrics to carbon values." },
      { id: "timescale", label: "TimescaleDB", x: 85, y: 85, desc: "Time-series log repository." },
      { id: "dashboard", label: "React Dashboard", x: 85, y: 15, desc: "Visual UI displaying maps & charts." }
    ];
    diagramConnections = [
      { from: "sensors", to: "broker", label: "Publish Telemetry" },
      { from: "broker", to: "calc", label: "Parse payload" },
      { from: "calc", to: "timescale", label: "Append metric row" },
      { from: "timescale", to: "dashboard", label: "Fetch historical view" }
    ];
  } else {
    techStack = [
      { type: "Frontend UI", name: "Next.js Web / React Native Mobile", desc: "Dual mobile/web interface." },
      { type: "Core Server", name: "Node.js Express", desc: "Fast JSON REST API endpoints." },
      { type: "Database Layer", name: "MongoDB Atlas", desc: "Document-based dynamic user data." },
      { type: "Escrows & Splits", name: "Stripe Connect Escrow", desc: "Splits commissions between users." },
      { type: "Hosting Platform", name: "AWS Elastic Beanstalk", desc: "Scalable load-balanced deployment environment." }
    ];
    githubUrl = "https://github.com/SaaSify/saasify";
    githubRepoName = "SaaSify/saasify";
    diagramNodes = [
      { id: "app", label: "Mobile Client App", x: 10, y: 50, desc: "Consumer search & booking screens." },
      { id: "server", label: "Express API Server", x: 45, y: 50, desc: "Manages matching logic & socket links." },
      { id: "db", label: "MongoDB Store", x: 80, y: 85, desc: "Flexible documents for catalog profiles." },
      { id: "stripe", label: "Stripe Escrow Split", x: 80, y: 50, desc: "Holds payments until fulfillment." },
      { id: "geo", label: "Google Maps API", x: 80, y: 15, desc: "Calculates distance/routes." }
    ];
    diagramConnections = [
      { from: "app", to: "server", label: "Book Match" },
      { from: "server", to: "db", label: "Check Availability" },
      { from: "server", to: "stripe", label: "Pre-authorize hold" },
      { from: "server", to: "geo", label: "Route courier" }
    ];
  }

  // Feature Matrix Rows Generation
  // format: [vectorName, usValue, competitorAValue, competitorBValue, competitorCValue]
  const matrixRows = [
    ["Primary Workflow", "Fully automated & smart", "Manual dashboards", "Static reporting templates", "Manual worksheets"],
    ["Setup & Integration", "Instant setup API", "4-6 weeks enterprise integration", "Custom consultant setup", "Internal spreadsheet setup"],
    ["Data Validation", "AI-assisted anomaly check", "Strict manual validation rules", "None", "Human visual check"],
    ["Pricing Model", "Value-driven subscription / SaaS", "High annual upfront licensing", "High transactional take rate", "Free (but high human labor costs)"]
  ];

  // 12-week Gantt/Milestone Roadmap Structure
  roadmap = [
    {
      track: "Product & Engineering",
      icon: "code",
      weeks: ["Draft core feature specs & schema", "Develop UI layout & mock database", "Code core engine & data parsing API", "Conduct internal sandbox testing"],
      checklists: [
        { id: "pe1", text: "Finalize tech stack selection & schema configuration", checked: false },
        { id: "pe2", text: "Implement core algorithmic processing loops", checked: false },
        { id: "pe3", text: "Integrate basic user auth & settings profile dashboard", checked: false },
        { id: "pe4", text: "Perform cross-browser frontend styling testing", checked: false }
      ]
    },
    {
      track: "Customer & Marketing",
      icon: "users",
      weeks: ["Perform 15 interviews with ICP", "Set up landing page & collect waitlist", "Onboard initial beta testers to cohort", "Launch marketing assets for launch"],
      checklists: [
        { id: "cm1", text: "Publish startup landing page with product waitlist", checked: false },
        { id: "cm2", text: "Establish feedback protocol with early beta cohort", checked: false },
        { id: "cm3", text: "Generate content pieces highlighting customer pain", checked: false },
        { id: "cm4", text: "Launch referral loop in beta cohort dashboard", checked: false }
      ]
    },
    {
      track: "Operations & Admin",
      icon: "briefcase",
      weeks: ["Draft LLC structure & founder vestings", "Finalize initial compliance drafts", "Establish support ticketing pipelines", "Finalize legal terms of service docs"],
      checklists: [
        { id: "oa1", text: "Form LLC/C-Corp entity and outline cap table", checked: false },
        { id: "oa2", text: "Review data privacy terms & construct privacy policy", checked: false },
        { id: "oa3", text: "Configure accounting tools & operational tracking", checked: false },
        { id: "oa4", text: "Formulate standard customer contract agreement SLA templates", checked: false }
      ]
    }
  ];

  // Funding Pathways
  fundingPathways = [
    {
      name: "Bootstrapping & Customer Financing",
      match: "Strong Match (Early Phase)",
      desc: "Retain 100% control of the company. Fund initial development through customer pre-sales, letters of intent, or direct consultative projects.",
      funding: "Up to $50K initial runway",
      recommended: industry === "SaaS" || industry === "Consumer Web"
    },
    {
      name: "Accelerators & Incubators (e.g., YC, Techstars)",
      match: "Highly Recommended",
      desc: "Gain $125K-$500K in seed capital, structural validation, and connection to secondary VC funds in exchange for 6-7% equity.",
      funding: "$120K - $500K",
      recommended: industry === "Artificial Intelligence" || industry === "FinTech" || industry === "HealthTech"
    },
    {
      name: "Angel Investors & Pre-Seed Syndicates",
      match: "Good Match (Post-MVP)",
      desc: "Raise funding from industry executives who provide smaller check sizes ($10K-$50K) and offer hands-on advisory services to help find early clients.",
      funding: "$100K - $750K",
      recommended: false
    },
    {
      name: "Venture Capital Seed Round",
      match: "Long-term Target",
      desc: "Target institutional VC funds once you've demonstrated $20K+ Monthly Recurring Revenue (MRR) or significant developer engagement.",
      funding: "$1M - $3M",
      recommended: false
    }
  ];

  // Accelerators and grants matching
  grants = [
    {
      name: "TANFUND (StartupTN Initiative)",
      desc: "Tamil Nadu Government portal connecting early-stage startups with angel networks, venture capital funds, and private equity investors.",
      link: "https://startuptn.in/initiative/funding/tanfund"
    },
    {
      name: "TANSEED (Tamil Nadu Seed Grant Fund)",
      desc: "Provides seed grants of up to ₹10 Lakhs (approx. $12,000 USD) for early-stage startups to support prototyping and validation pilots.",
      link: "https://startuptn.in/initiative/funding/tanseed"
    },
    {
      name: "Y Combinator",
      desc: "The world's leading startup accelerator. Offers $500,000 standard investment. High focus on shipping code and talking to users.",
      link: "https://www.ycombinator.com/apply"
    },
    {
      name: "Techstars",
      desc: "Global accelerator network with localized cohorts based on industries. Excellent for enterprise sales introductions and mentoring.",
      link: "https://www.techstars.com/accelerator"
    },
    {
      name: "SBIR / STTR Federal Grants",
      desc: "Non-dilutive funding for research-intensive startups, particularly healthtech, climatetech, and advanced neural AI hardware.",
      link: "https://www.sbir.gov/"
    }
  ];

  // Pitch Deck Outline
  pitchDeck = [
    { slide: "1. Title Slide", desc: "Company name, clear tagline, and the one-sentence explanation of what you do." },
    { slide: "2. The Problem", desc: `Explain the severe pain surrounding ${coreKeyword} for ${audience}. Quantify the current losses.` },
    { slide: "3. The Solution", desc: `Introduce ${name} and how it automatically resolves the pain. Highlight the product magic.` },
    { slide: "4. Why Now?", desc: "What industry shift, compliance mandate, or AI advancement makes this possible today?" },
    { slide: "5. Market Sizing (TAM)", desc: `Show the large scale: TAM of $${(tam/1000).toFixed(1)}B, narrowing down to your serviceable beachhead.` },
    { slide: "6. Competitive Matrix", desc: "Plot the current landscape. Explain your specific vector of automation and price differentiation." },
    { slide: "7. Go-To-Market Plan", desc: "How will you acquire your first 10 clients without spending millions on ads? Direct sales, product loops?" },
    { slide: "8. Unit Economics", desc: "Highlight your high margins: show projected LTV, CAC, and steady customer retention rates." },
    { slide: "9. MVP Timeline", desc: "Show your 12-week roadmap leading to live launches. Validate speed to execution." },
    { slide: "10. The Ask & Team", desc: "Introduce the core team's unfair advantage and the funding amount required to hit milestones." }
  ];

  return {
    name,
    industry,
    audience,
    problem,
    valProp,
    icp,
    validation,
    swot,
    tam,
    sam,
    som,
    unitEconomics: {
      price: defaultPrice,
      cac: defaultCac,
      churn: defaultChurn,
      newCustomers: defaultCustomers
    },
    usX: 80,
    usY: 75,
    competitors,
    matrixRows,
    roadmap,
    fundingPathways,
    grants,
    pitchDeck,
    existingProblemDetected: problemCheck.detected,
    detectedSpace: problemCheck.space,
    improvedSuggestions: problemCheck.suggestions,
    customTechStack: techStack,
    githubUrl,
    githubRepoName,
    diagramNodes,
    diagramConnections
  };
}
