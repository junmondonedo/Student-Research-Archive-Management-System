/* ============================================================
   SRAMS — shared application script
   Each role page calls: initApp('rolekey')
   ============================================================ */

/* ------------------ SAMPLE DATA ------------------ */
const PAPERS = [
  {
    id: 1,
    title: "Semantic Search for Local Digital Repositories: An HNU Case Study",
    authors: "Reyes, D. · Villamor, K. · Uy, J.",
    program: "BSCS",
    year: "2026",
    tag: "Digital Innovation",
    restricted: false,
    pages: 96,
    abstract:
      "Explores vector-embedding search over a PHP/MySQL repository, comparing keyword and natural-language retrieval accuracy on 1,200 archived theses. Results show a 34% improvement in top-5 relevance for natural-language queries.",
    sem: { farm: 0.42, read: 0.31, health: 0.28 },
  },
  {
    id: 2,
    title: "IoT-Based Flood Monitoring for Coastal Barangays in Bohol",
    authors: "Amora, P. · Bolotaolo, M.",
    program: "BSIT",
    year: "2025",
    tag: "Digital Innovation",
    restricted: false,
    pages: 112,
    abstract:
      "Low-cost sensor network with SMS alerts piloted in three coastal barangays, achieving 92% alert reliability during the rainy season and cutting evacuation lead time by 40 minutes on average.",
    sem: { farm: 0.88, read: 0.12, health: 0.44 },
  },
  {
    id: 3,
    title: "Solar Dryer Optimization for Seaweed Farmers in Talibon",
    authors: "Garcia, L. · Pacaldo, R.",
    program: "BSBA",
    year: "2024",
    tag: "Sustainable Livelihood",
    restricted: true,
    pages: 84,
    abstract:
      "Redesigned passive solar dryers reduced drying time by 31% and improved carrageenan grade consistency for smallholder seaweed farmers, raising average farm-gate prices.",
    sem: { farm: 0.94, read: 0.08, health: 0.22 },
  },
  {
    id: 4,
    title: "Mobile Learning App for Bisaya Literacy in Grade 3 Learners",
    authors: "Sarabia, T. · Lim, A.",
    program: "BSED",
    year: "2025",
    tag: "Education & Literacy",
    restricted: false,
    pages: 104,
    abstract:
      "Gamified vocabulary drills improved post-test reading scores by 27% across two partner elementary schools, with the largest gains among struggling readers.",
    sem: { farm: 0.1, read: 0.93, health: 0.18 },
  },
  {
    id: 5,
    title: "Community Health Mapping of Hypertension Risk in Rural Bohol",
    authors: "Nuñez, C. · Apalisok, F.",
    program: "BSN",
    year: "2024",
    tag: "Community Health",
    restricted: true,
    pages: 118,
    abstract:
      "GIS-based mapping of screening data across 14 barangays identified three high-risk clusters, guiding targeted barangay health worker deployment.",
    sem: { farm: 0.2, read: 0.14, health: 0.95 },
  },
  {
    id: 6,
    title: "Mobile Market-Price Alerts for Upland Vegetable Growers",
    authors: "Ompoc, S.",
    program: "BSIT",
    year: "2023",
    tag: "Sustainable Livelihood",
    restricted: false,
    pages: 78,
    abstract:
      "SMS price alerts improved farmer selling decisions, raising average weekly income by 12% among 60 pilot growers in upland barangays.",
    sem: { farm: 0.86, read: 0.11, health: 0.16 },
  },
  {
    id: 7,
    title: "School Feeding and Reading Readiness in Coastal Elementary Schools",
    authors: "Deloso, H. · Ranario, B.",
    program: "BSED",
    year: "2023",
    tag: "Education & Literacy",
    restricted: false,
    pages: 92,
    abstract:
      "A mixed-methods study linking a barangay feeding program to measurable gains in reading readiness among Grade 1 pupils.",
    sem: { farm: 0.18, read: 0.84, health: 0.62 },
  },
];
let OUTPUTS = PAPERS.map((p) => ({ ...p, archived: false }));
let TAGS = [
  {
    name: "Digital Innovation",
    desc: "ICT, software, and emerging technology studies",
    count: 412,
    active: true,
  },
  {
    name: "Community Health",
    desc: "Public health, nursing, and wellness research",
    count: 298,
    active: true,
  },
  {
    name: "Sustainable Livelihood",
    desc: "Agriculture, fisheries, and local enterprise",
    count: 231,
    active: true,
  },
  {
    name: "Education & Literacy",
    desc: "Pedagogy, learning tools, and literacy programs",
    count: 256,
    active: true,
  },
  {
    name: "Disaster Resilience (2019)",
    desc: "Superseded by the 2024 agenda revision",
    count: 87,
    active: false,
  },
];
let REQUESTS = [
  {
    who: "M. Torralba (BSBA-3)",
    what: "Solar Dryer Optimization for Seaweed Farmers",
    why: "Related literature for thesis",
    when: "4 days ago",
    decided: null,
  },
  {
    who: "Prof. E. Danaque",
    what: "Community Health Mapping of Hypertension Risk",
    why: "Curriculum review",
    when: "Yesterday",
    decided: null,
  },
  {
    who: "J. Cabagnot (BSIT-4)",
    what: "Solar Dryer Optimization for Seaweed Farmers",
    why: "Capstone benchmarking",
    when: "2 hours ago",
    decided: null,
  },
];
const LOGS = [
  {
    t: "Sep 2 · 09:41 AM",
    k: "upload",
    dot: "",
    txt: "<b>adviser.uy</b> uploaded “Semantic Search for Local Digital Repositories” (BSCS · 2026)",
  },
  {
    t: "Sep 2 · 09:12 AM",
    k: "account",
    dot: "gold",
    txt: "<b>ph.ramirez</b> updated agenda tag “Digital Innovation” description",
  },
  {
    t: "Sep 1 · 04:56 PM",
    k: "access",
    dot: "",
    txt: "<b>ta.balane</b> accepted view request from M. Torralba (BSBA-3)",
  },
  {
    t: "Sep 1 · 02:30 PM",
    k: "access",
    dot: "red",
    txt: "<b>adviser.uy</b> restricted “Solar Dryer Optimization for Seaweed Farmers”",
  },
  {
    t: "Sep 1 · 10:04 AM",
    k: "account",
    dot: "",
    txt: "<b>lib.admin</b> granted Program Head role to E. Ramirez",
  },
  {
    t: "Aug 31 · 03:19 PM",
    k: "account",
    dot: "gold",
    txt: "<b>adviser.uy</b> added 42 student accounts via class list upload (BSCS-4A)",
  },
  {
    t: "Aug 31 · 11:47 AM",
    k: "upload",
    dot: "",
    txt: "<b>ta.balane</b> uploaded scanned manuscript — OCR completed in 3m 12s",
  },
  {
    t: "Aug 30 · 02:08 PM",
    k: "access",
    dot: "red",
    txt: "<b>adviser.uy</b> rejected view request from external account (no purpose stated)",
  },
];

/* ------------------ ROLE CONFIG ------------------ */
const ROLES = {
  librarian: {
    label: "Librarian (Admin)",
    who: "R. Mendez",
    file: "librarian.html",
    home: "dashboard",
    tagsReadOnly: true,
    nav: [
      { sec: "Repository" },
      { page: "dashboard", label: "Analytics dashboard", icon: "▦" },
      { page: "search", label: "Browse archive", icon: "⌕" },
      { page: "outputs", label: "Manage outputs", icon: "▤" },
      { page: "tags", label: "Agenda tags", icon: "⚑" },
      { sec: "Administration" },
      { page: "accounts", label: "Roles & accounts", icon: "◉" },
      { page: "logs", label: "Activity logs", icon: "≡" },
      { page: "settings", label: "Account settings", icon: "⚙" },
    ],
    accounts: {
      title: "Roles & accounts",
      sub: "Grant or revoke Admin and Program Head roles",
      newBtn: false,
      classList: false,
      roles: ["Admin (Librarian)", "Program Head"],
      rows: [
        {
          name: "E. Ramirez",
          role: "Program Head",
          status: "Active",
          actions: ["Revoke Program Head"],
        },
        {
          name: "C. Bernaldez",
          role: "Program Head",
          status: "Active",
          actions: ["Revoke Program Head"],
        },
        {
          name: "A. Salazar",
          role: "Faculty",
          status: "Active",
          actions: ["Grant Program Head", "Grant Admin"],
        },
        {
          name: "R. Mendez",
          role: "Admin (Librarian)",
          status: "Active",
          actions: ["Revoke Admin"],
        },
      ],
    },
  },
  programhead: {
    label: "Program Head",
    who: "E. Ramirez",
    file: "program.html",
    home: "dashboard",
    tagsReadOnly: false,
    nav: [
      { sec: "Repository" },
      { page: "dashboard", label: "Analytics dashboard", icon: "▦" },
      { page: "search", label: "Browse archive", icon: "⌕" },
      { page: "outputs", label: "Manage outputs", icon: "▤" },
      { page: "tags", label: "Agenda tags", icon: "⚑" },
      { sec: "Administration" },
      { page: "accounts", label: "Faculty & advisers", icon: "◉" },
      { page: "logs", label: "Activity logs", icon: "≡" },
      { page: "settings", label: "Account settings", icon: "⚙" },
    ],
    accounts: {
      title: "Faculty & advisers",
      sub: "Create faculty accounts · grant or revoke Class Adviser role",
      newBtn: true,
      classList: false,
      roles: ["Faculty", "Class Adviser"],
      rows: [
        {
          name: "Prof. J. Uy",
          role: "Class Adviser",
          status: "Active",
          actions: ["Revoke Class Adviser"],
        },
        {
          name: "Prof. E. Danaque",
          role: "Faculty",
          status: "Active",
          actions: ["Grant Class Adviser"],
        },
        {
          name: "Prof. L. Balane",
          role: "Faculty",
          status: "Active",
          actions: ["Grant Class Adviser"],
        },
      ],
    },
  },
  classadviser: {
    label: "Class Adviser",
    who: "Prof. J. Uy",
    file: "classadiver.html",
    home: "dashboard",
    nav: [
      { sec: "Repository" },
      { page: "dashboard", label: "Analytic reports", icon: "▦" },
      { page: "search", label: "Browse archive", icon: "⌕" },
      { page: "upload", label: "Upload output", icon: "⇧" },
      { page: "outputs", label: "Manage outputs", icon: "▤" },
      { page: "requests", label: "View requests", icon: "✉", badge: true },
      { sec: "My class" },
      { page: "accounts", label: "Students & advisers", icon: "◉" },
      { page: "settings", label: "Account settings", icon: "⚙" },
    ],
    accounts: {
      title: "Students & technical advisers",
      sub: "Upload class lists · manage student status · grant technical advisers",
      newBtn: false,
      classList: true,
      roles: ["Student", "Technical Adviser"],
      rows: [
        {
          name: "Torralba, M. (BSCS-4A)",
          role: "Student",
          status: "Active",
          toggle: true,
          statusSel: true,
        },
        {
          name: "Cabagnot, J. (BSCS-4A)",
          role: "Student",
          status: "Active",
          toggle: true,
          statusSel: true,
        },
        {
          name: "Villamor, K. (BSCS-4A)",
          role: "Student",
          status: "Inactive",
          toggle: false,
          statusSel: true,
        },
        {
          name: "Prof. L. Balane",
          role: "Technical Adviser",
          status: "Active",
          actions: ["Revoke Technical Adviser"],
        },
        {
          name: "Prof. A. Salazar",
          role: "Faculty",
          status: "Active",
          actions: ["Grant Technical Adviser"],
        },
      ],
    },
  },
  techadviser: {
    label: "Technical Adviser",
    who: "Prof. L. Balane",
    file: "techadviser.html",
    home: "dashboard",
    nav: [
      { sec: "Repository" },
      { page: "dashboard", label: "Analytic reports", icon: "▦" },
      { page: "search", label: "Browse archive", icon: "⌕" },
      { page: "upload", label: "Upload output", icon: "⇧" },
      { page: "outputs", label: "Manage outputs", icon: "▤" },
      { page: "requests", label: "View requests", icon: "✉", badge: true },
      { page: "settings", label: "Account settings", icon: "⚙" },
    ],
  },
  student: {
    label: "Faculty / Student",
    who: "M. Torralba",
    file: "student.html",
    home: "search",
    nav: [
      { sec: "Archive" },
      { page: "search", label: "Search archive", icon: "⌕" },
      { page: "settings", label: "Account settings", icon: "⚙" },
    ],
  },
  crp: {
    label: "Center for Research & Publications",
    who: "CRP Office",
    file: "crp.html",
    home: "dashboard",
    tagsReadOnly: true,
    nav: [
      { sec: "Monitoring" },
      { page: "dashboard", label: "Analytics dashboard", icon: "▦" },
      { page: "tags", label: "Agenda tags", icon: "⚑" },
      { page: "settings", label: "Account settings", icon: "⚙" },
    ],
  },
};

/* ------------------ PAGE TEMPLATES ------------------ */
const SECTIONS = {
  dashboard: `<section class="page" id="page-dashboard">
  <div class="page-head">
    <div><h2>Analytics dashboard</h2><p>Repository activity · AY 2026–2027, 1st semester</p></div>
    <button class="btn btn-primary btn-sm" onclick="openModal('reportModal')">Generate report</button>
  </div>
  <div class="grid-4">
    <div class="stat"><div class="num">1,284</div><div class="lbl">Archived research outputs</div><div class="delta">▲ 42 this month</div></div>
    <div class="stat"><div class="num">316</div><div class="lbl">Searches this week</div><div class="delta">▲ 18% vs last week</div></div>
    <div class="stat"><div class="num" id="statPending">3</div><div class="lbl">Pending view requests</div><div class="delta warn">1 older than 3 days</div></div>
    <div class="stat"><div class="num">58</div><div class="lbl">Uploads this semester</div><div class="delta">BSCS leads with 21</div></div>
  </div>
  <div class="grid-2" style="margin-top:16px">
    <div class="card"><h3>Uploads by program</h3>
      <div class="bars">
        <div class="bar"><span class="val">21</span><div class="fill" style="height:84%"></div><span>BSCS</span></div>
        <div class="bar alt"><span class="val">16</span><div class="fill" style="height:64%"></div><span>BSIT</span></div>
        <div class="bar"><span class="val">12</span><div class="fill" style="height:48%"></div><span>BSN</span></div>
        <div class="bar alt"><span class="val">10</span><div class="fill" style="height:40%"></div><span>BSED</span></div>
        <div class="bar"><span class="val">7</span><div class="fill" style="height:28%"></div><span>BSBA</span></div>
        <div class="bar alt"><span class="val">5</span><div class="fill" style="height:20%"></div><span>Others</span></div>
      </div>
    </div>
    <div class="card"><h3>Search activity — last 8 weeks</h3>
      <svg class="trend" viewBox="0 0 460 170" role="img" aria-label="Weekly searches rising from 140 to 316">
        <g stroke="#E9EDE7" stroke-width="1"><line x1="34" y1="20" x2="450" y2="20"/><line x1="34" y1="60" x2="450" y2="60"/><line x1="34" y1="100" x2="450" y2="100"/><line x1="34" y1="140" x2="450" y2="140"/></g>
        <g fill="#8B978D" font-size="10"><text x="4" y="24">300</text><text x="4" y="64">240</text><text x="4" y="104">180</text><text x="4" y="144">120</text></g>
        <polyline fill="none" stroke="#245A44" stroke-width="2.5" stroke-linejoin="round" points="40,127 96,120 152,108 208,113 264,88 320,74 376,52 440,29"/>
        <g fill="#245A44"><circle cx="40" cy="127" r="3.5"/><circle cx="96" cy="120" r="3.5"/><circle cx="152" cy="108" r="3.5"/><circle cx="208" cy="113" r="3.5"/><circle cx="264" cy="88" r="3.5"/><circle cx="320" cy="74" r="3.5"/><circle cx="376" cy="52" r="3.5"/></g>
        <circle cx="440" cy="29" r="4.5" fill="#B8912F"/><text x="416" y="16" fill="#8F6F1F" font-size="11" font-weight="600">316</text>
        <g fill="#8B978D" font-size="10" text-anchor="middle"><text x="40" y="163">W1</text><text x="96" y="163">W2</text><text x="152" y="163">W3</text><text x="208" y="163">W4</text><text x="264" y="163">W5</text><text x="320" y="163">W6</text><text x="376" y="163">W7</text><text x="440" y="163">W8</text></g>
      </svg>
    </div>
  </div>
  <div class="card" style="margin-top:16px"><h3>Most viewed this month</h3>
    <table>
      <tr><th>Research output</th><th>Program</th><th style="text-align:right">Views</th></tr>
      <tr><td>IoT-Based Flood Monitoring for Coastal Barangays in Bohol</td><td>BSIT</td><td style="text-align:right"><span class="tag">214</span></td></tr>
      <tr><td>Semantic Search for Local Digital Repositories</td><td>BSCS</td><td style="text-align:right"><span class="tag">187</span></td></tr>
      <tr><td>Mobile Learning App for Bisaya Literacy in Grade 3 Learners</td><td>BSED</td><td style="text-align:right"><span class="tag">142</span></td></tr>
      <tr><td>Solar Dryer Optimization for Seaweed Farmers in Talibon</td><td>BSBA</td><td style="text-align:right"><span class="tag">118</span></td></tr>
    </table>
  </div>
</section>`,

  search: `<section class="page" id="page-search">
  <div class="page-head"><div><h2>Search the archive</h2><p>Find published student research across all programs</p></div></div>
  <div class="ai-search">
    <h3><span class="spark">✦</span> Intelligent search</h3>
    <p>Ask in plain language — the system matches meaning, not just keywords.</p>
    <div class="row">
      <input type="text" id="aiQuery" placeholder='e.g. "studies about helping farmers with technology"' onkeydown="if(event.key==='Enter')runAiSearch()">
      <button class="btn btn-gold" onclick="runAiSearch()">Search</button>
    </div>
    <div class="suggest">
      <button onclick="aiSuggest('studies about helping farmers with technology')">helping farmers with technology</button>
      <button onclick="aiSuggest('research on teaching children to read')">teaching children to read</button>
      <button onclick="aiSuggest('health programs for rural communities')">health programs for rural communities</button>
    </div>
  </div>
  <div class="card"><h3>Traditional search</h3>
    <div class="searchbar">
      <input type="text" id="kwQuery" placeholder="Search by title, author, or keyword…" oninput="renderResults()">
      <select id="fProgram" onchange="renderResults()"><option value="">All programs</option><option>BSCS</option><option>BSIT</option><option>BSN</option><option>BSED</option><option>BSBA</option></select>
      <select id="fYear" onchange="renderResults()"><option value="">All years</option><option>2026</option><option>2025</option><option>2024</option><option>2023</option></select>
      <select id="fAgenda" onchange="renderResults()"><option value="">All agenda tags</option><option>Digital Innovation</option><option>Community Health</option><option>Sustainable Livelihood</option><option>Education &amp; Literacy</option></select>
      <button class="btn btn-ghost" onclick="clearFilters()">Clear</button>
    </div>
    <div class="results-meta" id="resultsMeta"></div>
    <div id="results"></div>
  </div>
</section>`,

  upload: `<section class="page" id="page-upload">
  <div class="page-head"><div><h2>Upload research output</h2><p>Add a softcopy or scanned manuscript to the archive</p></div></div>
  <div class="card">
    <div class="upload-zone" id="uploadZone" onclick="pickFile()">
      <div class="icon">⇧</div>
      <div class="big" id="uploadZoneTxt">Drop PDF or scanned file here, or click to browse</div>
      <small>Accepted: PDF, DOCX, or scanned images — OCR runs automatically on scans</small>
    </div>
    <div class="grid-2" style="margin-top:20px">
      <div class="field"><label>Research title</label><input type="text" id="upTitle" placeholder="Full thesis title"></div>
      <div class="field"><label>Authors</label><input type="text" placeholder="Surname, Initial — separate with commas"><div class="hint">Listed in the same order as the manuscript</div></div>
      <div class="field"><label>Program</label><select><option>BSCS</option><option>BSIT</option><option>BSN</option><option>BSED</option><option>BSBA</option></select></div>
      <div class="field"><label>Year completed</label><select><option>2026</option><option>2025</option><option>2024</option></select></div>
      <div class="field"><label>Research agenda tag</label><select><option>Digital Innovation</option><option>Community Health</option><option>Sustainable Livelihood</option><option>Education &amp; Literacy</option></select></div>
      <div class="field"><label>Access level</label><select><option>Public — abstract and full text</option><option>Restricted — abstract only, request to view</option></select></div>
    </div>
    <div class="field"><label>Abstract</label><textarea rows="4" placeholder="Paste the abstract…"></textarea></div>
    <button class="btn btn-primary" onclick="submitUpload()">Upload to archive</button>
  </div>
</section>`,

  outputs: `<section class="page" id="page-outputs">
  <div class="page-head">
    <div><h2>Manage research outputs</h2><p>Update details, restrict access, or archive records</p></div>
    <input type="text" id="outputsFilter" placeholder="Filter by title…" oninput="renderOutputs()" style="padding:9px 13px;border:1px solid var(--line);border-radius:9px;min-width:220px">
  </div>
  <div class="card"><table>
    <thead><tr><th>Title</th><th>Program / Year</th><th>Access</th><th>Actions</th></tr></thead>
    <tbody id="outputsBody"></tbody></table></div>
</section>`,

  requests: `<section class="page" id="page-requests">
  <div class="page-head"><div><h2>View requests</h2><p>Approve or decline access to restricted works</p></div></div>
  <div class="card"><table>
    <thead><tr><th>Requester</th><th>Research output</th><th>Purpose</th><th>Requested</th><th>Decision</th></tr></thead>
    <tbody id="requestsBody"></tbody></table></div>
</section>`,

  tags: `<section class="page" id="page-tags">
  <div class="page-head">
    <div><h2>Research agenda tags</h2><p id="tagsSub">Institutional research priorities used to classify outputs</p></div>
    <button class="btn btn-primary btn-sm" id="newTagBtn" onclick="openTagModal()">+ New tag</button>
  </div>
  <div class="card"><table>
    <thead><tr><th>Tag</th><th>Description</th><th>Outputs</th><th>Status</th><th class="tag-actions-col">Actions</th></tr></thead>
    <tbody id="tagsBody"></tbody></table></div>
</section>`,

  accounts: `<section class="page" id="page-accounts">
  <div class="page-head">
    <div><h2 id="accountsTitle">Accounts &amp; roles</h2><p id="accountsSub">Manage users and role assignments</p></div>
    <div style="display:flex;gap:8px;flex-wrap:wrap">
      <button class="btn btn-ghost btn-sm" id="classListBtn" onclick="uploadClassList()">⇧ Upload class list</button>
      <button class="btn btn-primary btn-sm" id="newAccountBtn" onclick="openModal('accountModal')">+ New account</button>
    </div>
  </div>
  <div class="card"><table>
    <thead><tr><th>Name</th><th>Role</th><th>Status</th><th>Actions</th></tr></thead>
    <tbody id="accountsBody"></tbody></table></div>
</section>`,

  logs: `<section class="page" id="page-logs">
  <div class="page-head"><div><h2>Activity logs</h2><p>Audit trail of repository actions</p></div>
    <button class="btn btn-ghost btn-sm" onclick="toast('Log export downloading…')">Export CSV</button></div>
  <div class="card">
    <div class="log-filter" id="logFilter">
      <button class="on" data-f="all" onclick="filterLogs(this)">All</button>
      <button data-f="upload" onclick="filterLogs(this)">Uploads</button>
      <button data-f="access" onclick="filterLogs(this)">Access changes</button>
      <button data-f="account" onclick="filterLogs(this)">Accounts &amp; roles</button>
    </div>
    <div id="logsBody"></div>
  </div>
</section>`,

  settings: `<section class="page" id="page-settings">
  <div class="page-head"><div><h2>Account settings</h2><p>Update your sign-in credentials</p></div></div>
  <div class="card" style="max-width:480px"><h3>Change password</h3>
    <div class="field"><label>Current password</label><input type="password" id="pwCur"></div>
    <div class="field"><label>New password</label><input type="password" id="pwNew"><div class="hint">At least 8 characters with a number</div></div>
    <div class="field"><label>Confirm new password</label><input type="password" id="pwConf"></div>
    <button class="btn btn-primary" onclick="changePassword()">Save new password</button>
  </div>
</section>`,
};

const MODALS = `
<div class="modal-bg" id="viewerModal"><div class="modal wide">
  <h3 id="vTitle">—</h3><div class="viewer-meta" id="vMeta"></div>
  <div class="viewer-abstract"><b>Abstract</b><span id="vAbstract"></span></div>
  <div class="viewer-doc"><div class="pdf-ic">PDF</div>
    <div style="flex:1"><b id="vFile">manuscript.pdf</b><div style="font-size:12px;color:var(--faint)" id="vPages"></div></div>
    <button class="btn btn-ghost btn-sm" id="vOpenBtn">Open full text</button></div>
  <div class="actions"><button class="btn btn-ghost" onclick="closeModals()">Close</button></div></div></div>

<div class="modal-bg" id="tagModal"><div class="modal">
  <h3 id="tagModalTitle">New research agenda tag</h3>
  <div class="field"><label>Tag name</label><input type="text" id="tagName" placeholder="e.g. Coastal Resource Management"></div>
  <div class="field"><label>Description</label><input type="text" id="tagDesc" placeholder="What kinds of studies fall under this tag"></div>
  <div class="actions"><button class="btn btn-ghost" onclick="closeModals()">Cancel</button>
  <button class="btn btn-primary" onclick="saveTag()">Save tag</button></div></div></div>

<div class="modal-bg" id="accountModal"><div class="modal">
  <h3>Create account</h3>
  <div class="field"><label>Full name</label><input type="text" placeholder="Surname, First name"></div>
  <div class="field"><label>HNU ID number</label><input type="text" placeholder="Enter the user's HNU ID number"></div>
  <div class="field"><label>Role</label><select id="accountModalRole"></select></div>
  <div class="actions"><button class="btn btn-ghost" onclick="closeModals()">Cancel</button>
  <button class="btn btn-primary" onclick="closeModals();toast('Account created — invitation email sent ✓')">Create account</button></div></div></div>

<div class="modal-bg" id="confirmModal"><div class="modal">
  <h3 id="confirmTitle">Are you sure?</h3>
  <div class="confirm-body" id="confirmBody"></div>
  <div class="actions"><button class="btn btn-ghost" onclick="closeModals()">Cancel</button>
  <button class="btn btn-danger" id="confirmBtn">Confirm</button></div></div></div>

<div class="modal-bg" id="reportModal"><div class="modal">
  <h3>Generate analytics report</h3>
  <div class="field"><label>Report scope</label><select><option>Whole repository</option><option>By program</option><option>By agenda tag</option></select></div>
  <div class="field"><label>Period</label><select><option>This semester (AY 2026–2027, 1st)</option><option>Last semester</option><option>Last 12 months</option></select></div>
  <div class="field"><label>Format</label><select><option>PDF</option><option>Excel (XLSX)</option><option>CSV</option></select></div>
  <div class="actions"><button class="btn btn-ghost" onclick="closeModals()">Cancel</button>
  <button class="btn btn-primary" onclick="closeModals();toast('Report generated — downloading ✓')">Generate</button></div></div></div>

<div class="toast" id="toast" role="status">Done</div>`;

/* ------------------ INIT ------------------ */
let currentRole = null,
  cfg = null;

function initApp(roleKey) {
  currentRole = roleKey;
  cfg = ROLES[roleKey];
  const host = document.getElementById("pages");
  const needed = cfg.nav.filter((n) => n.page).map((n) => n.page);
  host.innerHTML = needed.map((p) => SECTIONS[p]).join("") + MODALS;

  document.getElementById("roleName").textContent = cfg.label;
  document.getElementById("whoName").textContent = cfg.who;
  document.getElementById("whoRole").textContent = cfg.label;
  document.getElementById("avatarTxt").textContent = cfg.who
    .replace(/^Prof\.\s*/, "")
    .split(/[\s.]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((x) => x[0])
    .join("")
    .toUpperCase();

  buildNav();
  if (needed.includes("search")) renderResults();
  if (needed.includes("outputs")) renderOutputs();
  if (needed.includes("requests")) renderRequests();
  if (needed.includes("tags")) renderTags();
  if (needed.includes("accounts")) configureAccounts();
  if (needed.includes("logs")) renderLogs("all");
  document.querySelectorAll(".modal-bg").forEach((m) =>
    m.addEventListener("click", (e) => {
      if (e.target === m) closeModals();
    }),
  );
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModals();
  });
  showPage(cfg.home);
}

function buildNav() {
  const nav = document.getElementById("navList");
  nav.innerHTML = "";
  cfg.nav.forEach((item) => {
    if (item.sec) {
      const d = document.createElement("div");
      d.className = "nav-sec";
      d.textContent = item.sec;
      nav.appendChild(d);
      return;
    }
    const b = document.createElement("button");
    b.innerHTML = `<span aria-hidden="true">${item.icon}</span> ${item.label}`;
    if (item.badge) {
      const s = document.createElement("span");
      s.className = "badge";
      s.id = "reqBadge";
      s.textContent = pendingCount();
      b.appendChild(s);
    }
    b.dataset.page = item.page;
    b.onclick = () => showPage(item.page);
    nav.appendChild(b);
  });
}
function showPage(id) {
  document
    .querySelectorAll(".page")
    .forEach((p) => p.classList.remove("active"));
  const el = document.getElementById("page-" + id);
  if (el) el.classList.add("active");
  document
    .querySelectorAll(".nav button")
    .forEach((b) => b.classList.toggle("active", b.dataset.page === id));
  closeSidebar();
  window.scrollTo({ top: 0 });
}
function openSidebar() {
  document.getElementById("sidebar").classList.add("open");
  document.getElementById("scrim").classList.add("on");
}
function closeSidebar() {
  document.getElementById("sidebar").classList.remove("open");
  document.getElementById("scrim").classList.remove("on");
}
function logout() {
  window.location.href = "index.html";
}

/* ------------------ SEARCH ------------------ */
function paperRow(p, matchPct) {
  const rb = p.restricted ? ' <span class="tag red">Restricted</span>' : "";
  const act = p.restricted
    ? `<button class="btn btn-ghost btn-sm" style="margin-top:9px" onclick="requestView()">Request to view</button>`
    : "";
  const m = matchPct ? `<span class="match">${matchPct}% match</span>` : "";
  return `<div class="result">
    <h4><a href="#" onclick="openViewer(${p.id});return false">${esc(p.title)}</a>${m}</h4>
    <div class="meta"><span>${p.authors}</span><span>·</span><span>${p.program} · ${p.year}</span><span class="tag gold">${p.tag}</span>${rb}</div>
    <p>${p.restricted ? "Full text is restricted by the adviser. Submit a view request to access the complete manuscript." : esc(p.abstract)}</p>${act}</div>`;
}
function renderResults() {
  const q = document.getElementById("kwQuery").value.toLowerCase().trim();
  const prog = document.getElementById("fProgram").value,
    yr = document.getElementById("fYear").value,
    tag = document.getElementById("fAgenda").value;
  const list = PAPERS.filter((p) => {
    const output = OUTPUTS.find((item) => item.id === p.id);
    return !output || !output.archived;
  }).filter(
    (p) =>
      (!q ||
        p.title.toLowerCase().includes(q) ||
        p.authors.toLowerCase().includes(q) ||
        p.abstract.toLowerCase().includes(q)) &&
      (!prog || p.program === prog) &&
      (!yr || p.year === yr) &&
      (!tag || p.tag === tag),
  );
  document.getElementById("resultsMeta").textContent = list.length
    ? `${list.length} of ${PAPERS.length} research outputs${q || prog || yr || tag ? " — filters applied" : ""}`
    : "";
  document.getElementById("results").innerHTML = list.length
    ? list.map((p) => paperRow(p)).join("")
    : `<div class="empty"><b>No matching research outputs</b>Try fewer filters, or ask the intelligent search in plain language.</div>`;
}
function clearFilters() {
  document.getElementById("kwQuery").value = "";
  ["fProgram", "fYear", "fAgenda"].forEach(
    (id) => (document.getElementById(id).value = ""),
  );
  renderResults();
}
function aiSuggest(q) {
  document.getElementById("aiQuery").value = q;
  runAiSearch();
}
function runAiSearch() {
  const q = document.getElementById("aiQuery").value.trim();
  if (!q) {
    toast("Type a question first", "err");
    return;
  }
  const l = q.toLowerCase();
  let key = "farm";
  if (/(read|literacy|teach|learn|child|pupil|student)/.test(l)) key = "read";
  else if (/(health|clinic|nurse|disease|medical|wellness)/.test(l))
    key = "health";
  const ranked = [...PAPERS]
    .sort((a, b) => b.sem[key] - a.sem[key])
    .filter((p) => p.sem[key] >= 0.3)
    .slice(0, 4);
  document.getElementById("resultsMeta").textContent =
    `Intelligent search: “${q}” — ${ranked.length} semantic matches ranked by meaning`;
  document.getElementById("results").innerHTML = ranked.length
    ? ranked.map((p) => paperRow(p, Math.round(p.sem[key] * 100))).join("")
    : `<div class="empty"><b>No semantic matches</b>Try rephrasing your question.</div>`;
  toast("Semantic ranking complete ✓");
}

/* ------------------ VIEWER & REQUESTS ------------------ */
function openViewer(id) {
  const p = PAPERS.find((x) => x.id === id);
  document.getElementById("vTitle").textContent = p.title;
  document.getElementById("vMeta").innerHTML =
    `<span class="tag grey">${p.authors}</span><span class="tag grey">${p.program} · ${p.year}</span><span class="tag gold">${p.tag}</span>${p.restricted ? '<span class="tag red">Restricted</span>' : ""}`;
  document.getElementById("vAbstract").textContent = " " + p.abstract;
  document.getElementById("vFile").textContent =
    p.title.toLowerCase().split(" ").slice(0, 3).join("-") + ".pdf";
  document.getElementById("vPages").textContent =
    p.pages + " pages · OCR indexed";
  const btn = document.getElementById("vOpenBtn");
  if (p.restricted && currentRole === "student") {
    btn.textContent = "Request to view";
    btn.onclick = () => {
      closeModals();
      requestView();
    };
  } else {
    btn.textContent = "Open full text";
    btn.onclick = () => toast("Opening full-text viewer…");
  }
  openModal("viewerModal");
}
function requestView() {
  toast("View request sent to the adviser ✓");
}
function pendingCount() {
  return REQUESTS.filter((r) => !r.decided).length;
}
function renderRequests() {
  const tb = document.getElementById("requestsBody");
  if (!tb) return;
  tb.innerHTML = REQUESTS.map((r, i) => {
    const cell = r.decided
      ? `<span class="tag ${r.decided === "Accepted" ? "" : "red"}">${r.decided}</span>`
      : `<div class="req-actions"><button class="btn btn-primary btn-sm" onclick="decide(${i},'Accepted')">Accept</button><button class="btn btn-ghost btn-sm" onclick="decide(${i},'Rejected')">Reject</button></div>`;
    return `<tr><td>${r.who}</td><td>${esc(r.what)}</td><td>${r.why}</td><td style="white-space:nowrap;color:var(--faint)">${r.when}</td><td>${cell}</td></tr>`;
  }).join("");
  const b = document.getElementById("reqBadge");
  if (b) {
    const n = pendingCount();
    b.textContent = n;
    b.style.display = n ? "grid" : "none";
  }
  const s = document.getElementById("statPending");
  if (s) s.textContent = pendingCount();
}
function decide(i, v) {
  REQUESTS[i].decided = v;
  renderRequests();
  toast(`Request ${v.toLowerCase()} — requester will be notified`);
}

/* ------------------ OUTPUTS ------------------ */
function renderOutputs() {
  const tb = document.getElementById("outputsBody");
  if (!tb) return;
  const q = (
    document.getElementById("outputsFilter").value || ""
  ).toLowerCase();
  tb.innerHTML = OUTPUTS.filter((o) => !q || o.title.toLowerCase().includes(q))
    .map((o) => {
      const i = OUTPUTS.indexOf(o);
      const access = o.archived
        ? '<span class="tag grey">Archived</span>'
        : o.restricted
          ? '<span class="tag red">Restricted</span>'
          : '<span class="tag">Public</span>';
      const actions = o.archived
        ? `<button class="btn btn-ghost btn-sm" onclick="restoreOutput(${i})">Restore</button>`
        : `<button class="btn btn-ghost btn-sm" onclick="toast('Edit form would open — hook to backend')">Update info</button>
        <button class="btn btn-ghost btn-sm" onclick="toggleRestrict(${i})">${o.restricted ? "Unrestrict" : "Restrict"}</button>
        <button class="btn btn-ghost btn-sm" onclick="confirmArchive(${i})">Archive</button>`;
      return `<tr style="${o.archived ? "opacity:.5" : ""}"><td>${esc(o.title)}</td><td style="white-space:nowrap">${o.program} · ${o.year}</td><td>${access}</td><td style="white-space:nowrap">${actions}</td></tr>`;
    })
    .join("");
}
function toggleRestrict(i) {
  OUTPUTS[i].restricted = !OUTPUTS[i].restricted;
  const p = PAPERS.find((x) => x.id === OUTPUTS[i].id);
  if (p) p.restricted = OUTPUTS[i].restricted;
  renderOutputs();
  if (document.getElementById("results")) renderResults();
  toast(
    OUTPUTS[i].restricted
      ? "Output restricted — view requests now required"
      : "Output is now public",
  );
}
function confirmArchive(i) {
  openConfirm(
    "Archive this research output?",
    `“${OUTPUTS[i].title}” will be hidden from search results. An administrator can restore it later.`,
    () => {
      OUTPUTS[i].archived = true;
      renderOutputs();
      closeModals();
      toast("Output archived ✓");
    },
  );
}
function restoreOutput(i) {
  OUTPUTS[i].archived = false;
  renderOutputs();
  toast("Output restored to the archive ✓");
}

/* ------------------ TAGS ------------------ */
function renderTags() {
  const tb = document.getElementById("tagsBody");
  if (!tb) return;
  const ro = !!cfg.tagsReadOnly;
  document.getElementById("newTagBtn").style.display = ro
    ? "none"
    : "inline-flex";
  document.getElementById("tagsSub").textContent = ro
    ? "Institutional research priorities (view only for your role)"
    : "Create, update, or archive outdated agenda tags";
  tb.innerHTML = TAGS.map((t, i) => {
    const actions = t.active
      ? `<button class="btn btn-ghost btn-sm" onclick="openTagModal(${i})">Update</button> <button class="btn btn-ghost btn-sm" onclick="confirmTagArchive(${i})">Archive tag</button>`
      : `<button class="btn btn-ghost btn-sm" onclick="TAGS[${i}].active=true;renderTags();toast('Tag restored ✓')">Restore</button>`;
    return `<tr style="${t.active ? "" : "opacity:.55"}"><td><span class="tag ${t.active ? "gold" : "grey"}">${t.name}</span></td>
      <td style="color:var(--muted)">${t.desc}</td><td>${t.count}</td>
      <td><span class="tag ${t.active ? "" : "grey"}">${t.active ? "Active" : "Archived"}</span></td>
      <td class="tag-actions-col" style="white-space:nowrap;${ro ? "display:none" : ""}">${actions}</td></tr>`;
  }).join("");
  document
    .querySelectorAll(".tag-actions-col")
    .forEach((el) => (el.style.display = ro ? "none" : ""));
}
let editingTag = null;
function openTagModal(i) {
  editingTag = i === undefined ? null : i;
  document.getElementById("tagModalTitle").textContent =
    editingTag === null ? "New research agenda tag" : "Update agenda tag";
  document.getElementById("tagName").value =
    editingTag === null ? "" : TAGS[i].name;
  document.getElementById("tagDesc").value =
    editingTag === null ? "" : TAGS[i].desc;
  openModal("tagModal");
}
function saveTag() {
  const name = document.getElementById("tagName").value.trim(),
    desc = document.getElementById("tagDesc").value.trim();
  if (!name) {
    toast("Tag name is required", "err");
    return;
  }
  if (editingTag === null) TAGS.unshift({ name, desc, count: 0, active: true });
  else {
    TAGS[editingTag].name = name;
    TAGS[editingTag].desc = desc;
  }
  renderTags();
  closeModals();
  toast("Agenda tag saved ✓");
}
function confirmTagArchive(i) {
  openConfirm(
    "Archive this agenda tag?",
    `“${TAGS[i].name}” will no longer be selectable for new uploads. Existing outputs keep the tag.`,
    () => {
      TAGS[i].active = false;
      renderTags();
      closeModals();
      toast("Tag archived ✓");
    },
  );
}

/* ------------------ ACCOUNTS ------------------ */
function configureAccounts() {
  const a = cfg.accounts;
  if (!a) return;
  document.getElementById("accountsTitle").textContent = a.title;
  document.getElementById("accountsSub").textContent = a.sub;
  document.getElementById("newAccountBtn").style.display = a.newBtn
    ? "inline-flex"
    : "none";
  document.getElementById("classListBtn").style.display = a.classList
    ? "inline-flex"
    : "none";
  document.getElementById("accountModalRole").innerHTML = a.roles
    .map((r) => `<option>${r}</option>`)
    .join("");
  document.getElementById("accountsBody").innerHTML = a.rows
    .map((r) => {
      const status =
        r.toggle !== undefined
          ? `<label class="switch"><input type="checkbox" ${r.toggle ? "checked" : ""} onchange="toast(this.checked?'Account activated ✓':'Account deactivated')"><span class="slider"></span></label>`
          : `<span class="tag ${r.status === "Active" ? "" : "grey"}">${r.status}</span>`;
      let actions = "";
      if (r.statusSel)
        actions = `<select style="padding:6px 8px;border:1px solid var(--line);border-radius:7px;background:#fff;font-size:13px" onchange="toast('Status changed to '+this.value+' ✓')"><option>Enrolled</option><option>Graduated</option><option>On leave</option><option>Dropped</option></select>`;
      if (r.actions)
        actions += r.actions
          .map(
            (x) =>
              ` <button class="btn btn-ghost btn-sm" onclick="roleAction('${x}')">${x}</button>`,
          )
          .join("");
      return `<tr><td>${r.name}</td><td>${r.role}</td><td>${status}</td><td style="white-space:nowrap">${actions}</td></tr>`;
    })
    .join("");
}
function roleAction(label) {
  if (label.startsWith("Revoke"))
    openConfirm(
      label + "?",
      "This user will immediately lose the permissions of this role. You can grant it again anytime.",
      () => {
        closeModals();
        toast(label + " ✓");
      },
    );
  else toast(label + " ✓");
}
function uploadClassList() {
  toast("Class list uploaded — 42 student accounts created ✓");
}

/* ------------------ UPLOAD ------------------ */
let filePicked = false;
function pickFile() {
  filePicked = true;
  document.getElementById("uploadZoneTxt").textContent =
    "bscs4a-thesis-manuscript.pdf attached ✓ (OCR will run on upload)";
  document.getElementById("uploadZone").style.borderColor = "var(--green)";
}
function submitUpload() {
  if (!filePicked) {
    toast("Attach the manuscript file first", "err");
    return;
  }
  if (!document.getElementById("upTitle").value.trim()) {
    toast("Research title is required", "err");
    return;
  }
  toast("Research output uploaded and tagged ✓");
  filePicked = false;
  document.getElementById("uploadZoneTxt").textContent =
    "Drop PDF or scanned file here, or click to browse";
  document.getElementById("uploadZone").style.borderColor = "";
  document.getElementById("upTitle").value = "";
}

/* ------------------ LOGS ------------------ */
function renderLogs(f) {
  const el = document.getElementById("logsBody");
  if (!el) return;
  el.innerHTML = LOGS.filter((l) => f === "all" || l.k === f)
    .map(
      (l) =>
        `<div class="log-item"><span class="log-time">${l.t}</span><span class="log-dot ${l.dot}"></span><span>${l.txt}</span></div>`,
    )
    .join("");
}
function filterLogs(btn) {
  document
    .querySelectorAll("#logFilter button")
    .forEach((b) => b.classList.remove("on"));
  btn.classList.add("on");
  renderLogs(btn.dataset.f);
}

/* ------------------ SETTINGS ------------------ */
function changePassword() {
  const cur = document.getElementById("pwCur").value,
    nw = document.getElementById("pwNew").value,
    cf = document.getElementById("pwConf").value;
  if (!cur || !nw || !cf) {
    toast("Fill in all password fields", "err");
    return;
  }
  if (nw.length < 8 || !/\d/.test(nw)) {
    toast("New password needs 8+ characters and a number", "err");
    return;
  }
  if (nw !== cf) {
    toast("New passwords do not match", "err");
    return;
  }
  ["pwCur", "pwNew", "pwConf"].forEach(
    (id) => (document.getElementById(id).value = ""),
  );
  toast("Password changed ✓");
}

/* ------------------ SHARED UI ------------------ */
function toast(msg, type) {
  const t = document.getElementById("toast");
  if (!t) return;
  t.textContent = msg;
  t.className = "toast show" + (type === "err" ? " err" : "");
  clearTimeout(t._h);
  t._h = setTimeout(() => t.classList.remove("show"), 2600);
}
function openModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.add("open");
}
function closeModals() {
  document
    .querySelectorAll(".modal-bg")
    .forEach((m) => m.classList.remove("open"));
}
function openConfirm(title, body, onYes) {
  document.getElementById("confirmTitle").textContent = title;
  document.getElementById("confirmBody").textContent = body;
  document.getElementById("confirmBtn").onclick = onYes;
  openModal("confirmModal");
}
function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/"/g, "&quot;");
}
