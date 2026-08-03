const profile = {
  name: "Neetu Mohanan",
  logo: "assets/images/logo.svg",
  photoJpg: "assets/images/neethu-photo.jpeg",
  photoFallback: "assets/images/neethu-photo.svg",
  linkedin: "https://www.linkedin.com/in/neethu3302/",
  location: "Tracy, California",
  origin: "Kerala, India",
  whoAmIVideo: {
    id: "1oZO6ATqa5Dz3PhSto9cuMeXzrpSjtawl",
    title: "Who Am I? — The Quiet Girl Who Dreamed to Shine"
  }
};

const nav = [
  { label: "Home", href: "index.html" },
  { label: "About", items: [
    ["Bio", "bio.html"], ["My Philosophy of Education", "philosophy.html"], ["Beliefs About Equity in the Classroom", "equity.html"]
  ]},
  { label: "Coursework", items: [
    ["Coursework Overview", "coursework.html"], ["Phase 1 · Preparing", "phase-1.html"], ["Phase 2 · Belonging", "phase-2.html"], ["Phase 3 · Showcase", "phase-3.html"], ["Phase 4 · Practitioner", "phase-4.html"], ["Phase 5 · Integration", "phase-5.html"]
  ]},
  { label: "Reflections", href: "reflections.html" },
  { label: "Acronym Dictionary", href: "acronym-dictionary.html" },
  { label: "Reading & Resource List", href: "reading-resources.html" },
  { label: "Ed Tech Tools", href: "ed-tech-tools.html" },
  { label: "Teaching Toolbox", items: [
    ["Classroom Culture & Management Toolbox", "classroom-culture.html"], ["English Learners / Emerging Bilingual Strategies", "english-learners.html"]
  ]}
];

const phaseData = {
  "phase-1": { phase: "01", title: "Preparing for Classroom Placements", subtitle: "Identity, cultural responsiveness, and professional readiness form the foundation of my residency.", featured: `
    <div class="featured-block who-am-i">
      <div class="featured-label">Who Am I? · Presentation narrative</div>
      <h2>The Quiet Girl Who Dreamed to Shine</h2>
      <p class="featured-lead">A five-minute story of identity, courage, and the teacher I am becoming—aligned with the Who Am I? rubric criteria.</p>
      ${driveVideoEmbed(profile.whoAmIVideo.id, profile.whoAmIVideo.title)}
      <div class="cards cards--compact">
        <article class="card"><span class="number">AUTHENTICITY</span><h3>Identity & self-reflection</h3><p>I share my Kerala roots, my quiet childhood, and the teacher who first made me feel seen. I reflect honestly on how my culture shaped my values—and how I am learning to examine biases about quiet students.</p></article>
        <article class="card"><span class="number">CONNECTION</span><h3>Engagement & cohort</h3><p>My story invites others to share their journeys. Sports, dance, family, and cross-cultural moves are bridges that help classmates see the whole person behind the credential student.</p></article>
        <article class="card"><span class="number">UNIQUENESS</span><h3>Expression of self</h3><p>From mathematics and Java development to elementary education—my path is not typical, and that is my strength. I bring analytical thinking, persistence, and empathy into the classroom.</p></article>
      </div>
    </div>`, assignments: [
    ["Who Am I? Presentation", "The Quiet Girl Who Dreamed to Shine — my story of Kerala roots, family, quiet strength, and becoming an educator. Watch the presentation video above; I shared this with my cohort and reflected on identity, personal beliefs, and the biases I am learning to examine."],
    ["Book Study: Culturally Responsive Teaching and the Brain", "Reading and reflecting on Zaretta Hammond’s work on culture, neuroscience, trust, and building independent learners. Key ideas shaping my practice: the link between trust, rigor, and culturally grounded instruction."]
  ]},
  "phase-2": { phase: "02", title: "Establishing a Caring, Equitable, and Inclusive Environment", subtitle: "Learning to build classrooms where every student feels known, safe, challenged, and valued.", assignments: [
    ["Health Effects on Learning", "Physical Activity & Learning — exploring how movement supports brain health, focus, behavior, and stamina in elementary classrooms."]
  ]},
  "phase-3": { phase: "03", title: "Complete the TPA and Showcase Knowledge", subtitle: "Connecting planning, instruction, assessment, and reflection through evidence of student learning.", assignments: [] },
  "phase-4": { phase: "04", title: "Becoming a Practitioner", subtitle: "Deepening instructional judgment through assessment design, literacy supports, and reflective practice.", assignments: [] },
  "phase-5": { phase: "05", title: "Putting It All Together", subtitle: "Synthesizing a year of learning into a coherent, equitable, and student-centered teaching practice.", assignments: [] }
};

const pages = {
  home: { home: true },
  bio: { title: "My Story", crumb: "About · Bio", ornament: "N", subtitle: "From Kerala to California—from mathematics and software development to the classroom, guided by persistence, curiosity, and care.", body: `
    <div class="story-layout">
      <aside class="quote-panel">
        <div class="bio-photo">${profilePhoto()}</div>
        <blockquote style="margin-top:20px">“Quiet people can shine too.”</blockquote>
        <cite>Neetu Mohanan · Personal belief</cite>
      </aside>
      <div class="prose">
        <h2>The person behind the portfolio</h2>
        <p>I am <strong>Neetu Mohanan</strong>, originally from Kerala, India, and now living in Tracy, California with my family. I grew up in Karukachal, where my father taught me that education is a gift worth protecting and sharing. That belief continues to shape the educator I am becoming.</p>
        <h3>Education & professional background</h3>
        <p>I earned a <strong>Bachelor of Science in Mathematics</strong> from Mahatma Gandhi University, Kerala (2013), followed by a diploma in Computer Applications. I completed a <strong>Post Graduate Program in Business Analysis and Business Intelligence</strong> through the University of Texas McCombs School of Business and Great Learning (2020), and I am currently pursuing an <strong>MCA in Artificial Intelligence</strong> at Amrita University (expected 2026).</p>
        <p>Before entering teacher preparation, I worked as a <strong>Java Developer at Infleca Innovation Pvt Ltd</strong> (2019–2021), building Spring Boot applications, writing clean documented code, and collaborating on database-driven solutions. Earlier, as a Java Developer Trainee, I completed intensive J2EE and Spring Boot training and contributed to the Famstack application. That experience taught me precision, teamwork, and how to break complex problems into steps students can understand.</p>
        <h3>Identity, beliefs & biases</h3>
        <p>Growing up in Kerala, I learned to value humility, respect for elders, and hard work. Moving to the United States added new layers to my identity—as a parent, a professional, and now a teacher candidate. I am learning to examine my own assumptions: who gets called on in class, whose stories are centered, and whether I confuse quietness with disengagement. Becoming an educator means reflecting honestly on these beliefs so I can create space for every child to shine.</p>
        <h3>Why teaching matters to me</h3>
        <p>As a child I was quiet and introverted, yet curious—I loved running, long jump, group dance, and writing stories. I remember what it felt like to be overlooked for being quiet, and I remember the difference a caring teacher made when she recognized my effort. Through <strong>Residency@TCSJ</strong>, I am preparing to become an elementary educator who creates classrooms where every child—especially the quiet ones—feels safe to participate, take risks, and discover their strengths.</p>
        <h3>Beyond the classroom</h3>
        <p>Outside of work and study, I enjoy <strong>sports and dance</strong>. These activities remind me that learning happens through movement, expression, confidence, and joy—values I want to bring into my future classroom.</p>
        <p><a href="${profile.linkedin}" target="_blank" rel="noopener noreferrer">Connect on LinkedIn →</a></p>
      </div>
    </div>` },
  philosophy: { title: "My Philosophy of Education", crumb: "About · Philosophy", ornament: "φ", subtitle: "Every child deserves rigorous learning, genuine belonging, and a teacher who notices both their voice and their silence.", body: `
    <div class="story-layout"><aside class="quote-panel"><blockquote>Education becomes powerful when students feel safe enough to be curious.</blockquote><cite>Working philosophy</cite></aside><div class="prose"><h2>A classroom built on dignity</h2><p>I believe learning begins with relationships. Students learn best when they feel known, respected, and confident that mistakes will be treated as part of growth. My role is to create meaningful access to learning while holding high expectations for every child.</p><h3>Responsive, reflective practice</h3><p>I want to understand students' cultures, languages, interests, and experiences and use that knowledge to make instruction relevant. I will reflect on my own assumptions, study evidence of learning, and adjust my teaching rather than expecting every student to learn in the same way.</p><h3>Student voice and joyful challenge</h3><p>My classroom should invite questions, conversation, movement, creativity, and productive struggle. Students should leave knowing that their ideas matter and that they are capable of doing difficult things.</p><h3>Connection to my journey</h3><p>My path—from mathematics and software development to elementary education—taught me that complex ideas become reachable when they are broken into clear steps, modeled patiently, and practiced with support. I bring that same commitment to clarity and care into my teaching.</p></div></div>` },
  equity: { title: "My Beliefs About Equity in the Classroom", crumb: "About · Equity", ornament: "=", subtitle: "Equity is not giving every learner the same thing. It is understanding what each learner needs to participate, grow, and belong.", body: `
    <div class="cards">${[
      ["01 · ACCESS", "Remove barriers", "Design learning with multiple entry points, clear scaffolds, and meaningful supports so all students can engage with grade-level ideas."],
      ["02 · IDENTITY", "Honor the whole child", "See culture, language, family, ability, and lived experience as strengths—not problems to fix."],
      ["03 · VOICE", "Make room to be heard", "Create varied ways to contribute so confident speakers and quiet thinkers are both recognized."]
    ].map(c=>`<article class="card reveal"><span class="number">${c[0]}</span><h3>${c[1]}</h3><p>${c[2]}</p></article>`).join("")}</div>
    <div class="luxury-panel reveal">
      <div class="section-title section-title--left">
        <h2>Equity in daily practice</h2>
        <div class="gold-rule gold-rule--left"></div>
      </div>
      <div class="prose prose--flush">
        <p>I will examine patterns in participation and achievement, seek student and family perspectives, and respond with curiosity. Fairness requires reflection, flexibility, and the courage to change a routine when it does not serve every learner.</p>
        <p>I am especially committed to noticing quiet students like I once was—making sure belonging is not measured by volume alone.</p>
      </div>
    </div>` },
  coursework: { title: "Coursework Journey", crumb: "Residency · Coursework", ornament: "5", subtitle: "Five phases documenting the movement from preparation to confident, reflective classroom practice.", body: `<p class="page-note">Per the Residency@TCSJ e-portfolio guidelines, I highlight coursework that is most meaningful to me—not every assignment needs a full write-up.</p><div class="cards">${Object.entries(phaseData).map(([slug,p])=>`<article class="card reveal"><span class="number">PHASE ${p.phase}</span><h3>${p.title}</h3><p>${p.subtitle}</p><a href="${slug}.html">Explore this phase →</a></article>`).join("")}</div>` },
  reflections: { title: "Weekly Reflections", crumb: "Learning · Reflections", ornament: "R", subtitle: "What I learned, how I feel about it, and what I continue to wonder.", body: `
    <p class="page-note">Each entry follows the e-portfolio reflection format: <strong>Learned · Felt · Wondering</strong>.</p>
    <div class="timeline">
      <article class="reflection reflection-rich reveal"><div class="reflection-date">Week 1</div><div><h3>A bright spot: Who Am I?</h3><div class="reflection-prompts"><p><strong>Learned:</strong> Sharing my “Who Am I?” presentation helped me hear the diverse paths in our cohort. I learned that identity stories build trust quickly when people are brave enough to be personal.</p><p><strong>Felt:</strong> Nervous at first, then proud and connected. It felt meaningful to be seen beyond my quietness.</p><p><strong>Wondering:</strong> How can I design future classroom routines so quiet students feel invited—not pressured—to share?</p></div></div></article>
      <article class="reflection reflection-rich reveal"><div class="reflection-date">Week 2</div><div><h3>Understanding the Clinical Practice Hub</h3><div class="reflection-prompts"><p><strong>Learned:</strong> The Clinical Practice Hub connects coursework, fieldwork, assessments, and documentation. There are many moving parts to track across the residency year.</p><p><strong>Felt:</strong> Overwhelmed at times, but also motivated. I want to stay organized so nothing important slips through.</p><p><strong>Wondering:</strong> What systems will help me balance coursework, classroom placement, and weekly reflections without losing depth?</p></div></div></article>
    </div>` },
  "acronym-dictionary": { title: "Acronym Dictionary", crumb: "Resources · Dictionary", ornament: "A", subtitle: "Program language translated into clear, useful definitions in my own words.", body: `<div class="table-wrap"><table><thead><tr><th>Acronym</th><th>Meaning</th><th>In my own words</th></tr></thead><tbody>
    <tr><td><a href="https://www.teacherscollege.edu/" target="_blank" rel="noopener">TCSJ</a></td><td>Teachers College of San Joaquin</td><td>My teacher-preparation program and professional learning community.</td></tr>
    <tr><td>TPA</td><td>Teaching Performance Assessment</td><td>An evidence-based demonstration of planning, teaching, assessment, and reflection.</td></tr>
    <tr><td>ELD</td><td>English Language Development</td><td>Intentional instruction that supports emerging bilingual students in developing academic English.</td></tr>
    <tr><td>IEP</td><td>Individualized Education Program</td><td>A collaborative plan outlining a student's learning goals, services, supports, and progress.</td></tr>
    <tr><td>FAPE</td><td>Free Appropriate Public Education</td><td>Every student with a disability has the right to education suited to their needs at no cost to the family.</td></tr>
    <tr><td>LRE</td><td>Least Restrictive Environment</td><td>Students learn alongside peers to the greatest extent appropriate—not isolated unnecessarily.</td></tr>
    <tr><td>CRT</td><td>Culturally Responsive Teaching</td><td>Teaching that honors students' cultures and builds the trust needed for rigorous learning.</td></tr>
    <tr><td>SEL</td><td>Social-Emotional Learning</td><td>Helping students understand emotions, relationships, and responsible decision-making.</td></tr>
    <tr><td>PBIS</td><td>Positive Behavioral Interventions and Supports</td><td>A schoolwide framework for teaching expectations and reinforcing positive behavior.</td></tr>
    </tbody></table></div>` },
  "reading-resources": { title: "Reading & Resource List", crumb: "Resources · Reading", ornament: "§", subtitle: "Books, articles, and trusted resources that shape my thinking—organized in a way that makes sense to me.", body: `<div class="cards">
    <article class="card"><span class="number">BOOK STUDY</span><h3><a href="https://crtandthebrain.com/" target="_blank" rel="noopener">Culturally Responsive Teaching and the Brain</a></h3><p><em>Zaretta Hammond</em> — Connects culture, neuroscience, trust, and cognitive development. Key takeaway: relationships and rigor go together; students need both safety and high expectations to become independent learners.</p></article>
    <article class="card"><span class="number">PROGRAM</span><h3><a href="https://www.teacherscollege.edu/" target="_blank" rel="noopener">Teachers College of San Joaquin</a></h3><p>Home base for Residency@TCSJ—coursework, field support, and professional learning throughout the credential year.</p></article>
    </div>` },
  "ed-tech-tools": { title: "Ed Tech Tools", crumb: "Resources · Technology", ornament: "⌘", subtitle: "Technology I want to remember—linked and described for future classroom use.", body: `<div class="cards">
    <article class="card"><span class="number">CREATE</span><h3><a href="https://www.canva.com/" target="_blank" rel="noopener">Canva</a></h3><p>Visual design for accessible handouts, anchor charts, student choice projects, and family communication. Best for making learning visible and inviting.</p></article>
    <article class="card"><span class="number">CONNECT</span><h3><a href="https://padlet.com/" target="_blank" rel="noopener">Padlet</a></h3><p>A flexible board for student thinking, multimedia responses, and collaborative collections—especially helpful for quiet students who prefer writing first.</p></article>
    </div>` },
  "classroom-culture": { title: "Classroom Culture & Management Toolbox", crumb: "Teaching Toolbox · Culture", ornament: "C", subtitle: "A working collection of strategies and routines that support supportive learning environments—evolving throughout my residency.", body: `<div class="cards"><article class="card"><span class="number">BELONGING</span><h3>Warm, specific welcomes</h3><p>Greet students by name and notice something authentic about their presence, effort, or contribution.</p></article><article class="card"><span class="number">VOICE</span><h3>Multiple ways to participate</h3><p>Use think time, partner talk, writing, visuals, and whole-group sharing so participation is not limited to fast speakers.</p></article><article class="card"><span class="number">REPAIR</span><h3>Restorative conversations</h3><p>Respond to conflict by naming impact, listening to perspectives, repairing harm, and restoring community.</p></article><article class="card"><span class="number">ROUTINES</span><h3>Teach procedures explicitly</h3><p>Model, practice, revisit, and positively reinforce routines rather than assuming students already know them.</p></article><article class="card"><span class="number">REGULATION</span><h3>Movement and reset</h3><p>Use intentional movement breaks to support attention, brain health, behavior, and stamina.</p></article><article class="card"><span class="number">REFLECT</span><h3>Study the patterns</h3><p>Ask whose voice is missing, when problems occur, and what classroom condition can be redesigned.</p></article></div>` },
  "english-learners": { title: "English Learners / Emerging Bilingual Strategies", crumb: "Teaching Toolbox · Language", ornament: "L", subtitle: "Strategies learned from ELD classes—treating multilingualism as an asset.", body: `<div class="cards"><article class="card"><span class="number">COMPREHENSIBLE INPUT</span><h3>Make meaning visible</h3><p>Use gestures, visuals, modeling, examples, and purposeful repetition without reducing intellectual challenge.</p></article><article class="card"><span class="number">ACADEMIC TALK</span><h3>Rehearse before sharing</h3><p>Provide wait time, partner practice, sentence frames, and multiple chances to refine an idea.</p></article><article class="card"><span class="number">LANGUAGE ASSET</span><h3>Invite the full repertoire</h3><p>Allow students to use home languages to plan, connect ideas, and demonstrate understanding when appropriate.</p></article><article class="card"><span class="number">VOCABULARY</span><h3>Teach words in context</h3><p>Connect key terms with morphology, examples, visuals, and repeated use in meaningful tasks.</p></article><article class="card"><span class="number">FAMILY PARTNERSHIP</span><h3>Communicate accessibly</h3><p>Use respectful, understandable communication and honor families’ knowledge of their children.</p></article></div>` }
};

const heroWave = `<div class="hero-wave"><svg viewBox="0 0 1440 80" preserveAspectRatio="none"><path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80 Z"/></svg></div>`;

const heroTags = ["Elementary Education", "Equity & Belonging", "Residency@TCSJ", "Kerala → California"];

function driveVideoEmbed(fileId, title) {
  const src = `https://drive.google.com/file/d/${fileId}/preview`;
  const view = `https://drive.google.com/file/d/${fileId}/view?usp=sharing`;
  return `<div class="video-embed"><iframe src="${src}" title="${title}" allow="autoplay; encrypted-media; fullscreen" allowfullscreen loading="lazy"></iframe></div><p class="video-caption"><a href="${view}" target="_blank" rel="noopener noreferrer">Open in Google Drive ↗</a></p>`;
}

function profilePhoto(className = "profile-photo") {
  return `<img class="${className}" src="${profile.photoJpg}" alt="${profile.name}" loading="eager" onerror="this.onerror=null;this.src='${profile.photoFallback}';">`;
}

function heroPortraitLuxury() {
  return `<div class="hero-visual">
    <div class="hero-deco hero-deco--1" aria-hidden="true"></div>
    <div class="hero-deco hero-deco--2" aria-hidden="true"></div>
    <div class="portrait-luxury">
      <div class="portrait-glow" aria-hidden="true"></div>
      <div class="portrait-ring" aria-hidden="true"></div>
      <div class="portrait-frame">${profilePhoto("hero-photo")}</div>
      <div class="portrait-badge"><span class="portrait-badge-dot"></span>Residency@TCSJ</div>
      <div class="portrait-meta">
        <strong>${profile.name}</strong>
        <span>Aspiring Elementary Educator</span>
        <span class="portrait-credential">MCA · Artificial Intelligence</span>
      </div>
    </div>
  </div>`;
}

function heroStats() {
  return `<div class="hero-stats">
    <div class="hero-stat"><strong>Kerala → CA</strong><span>Identity & roots</span></div>
    <div class="hero-stat"><strong>5 Phases</strong><span>Coursework journey</span></div>
    <div class="hero-stat"><strong>Equity First</strong><span>Teaching philosophy</span></div>
  </div>`;
}

function heroBackground() {
  return `<div class="hero-bg" aria-hidden="true">
    <div class="hero-orb hero-orb--1"></div>
    <div class="hero-orb hero-orb--2"></div>
    <div class="hero-orb hero-orb--3"></div>
    <div class="hero-shimmer"></div>
    <div class="hero-grid-pattern"></div>
  </div>`;
}

function heroTagRow() {
  return `<div class="hero-tags">${heroTags.map((t, i) => `<span style="animation-delay:${i * .15}s">${t}</span>`).join("")}</div>`;
}

function navHTML(mobile = false) {
  if (mobile) {
    return nav.map(n => n.items
      ? `<div class="mobile-label">${n.label}</div>${n.items.map(i => `<a href="${i[1]}">${i[0]}</a>`).join("")}`
      : `<a href="${n.href}">${n.label}</a>`).join("");
  }
  return nav.map(n => n.items
    ? `<div class="nav-group"><button class="nav-toggle" type="button" aria-haspopup="true">${n.label} ▾</button><div class="dropdown">${n.items.map(i => `<a href="${i[1]}">${i[0]}</a>`).join("")}</div></div>`
    : `<a class="nav-link" href="${n.href}">${n.label}</a>`).join("");
}

function chrome() {
  return `<div class="scroll-progress" id="scrollProgress"></div>`;
}

function header() {
  return `<header class="site-header" id="siteHeader"><div class="header-accent" aria-hidden="true"></div><div class="header-inner"><a class="brand" href="index.html"><img class="brand-logo" src="${profile.logo}" alt="" width="46" height="46"><span class="brand-copy"><strong>${profile.name}</strong><span class="brand-tagline"><span class="brand-dot"></span>Residency@TCSJ · E-Portfolio</span></span></a><nav class="desktop-nav" aria-label="Main navigation">${navHTML()}</nav><button class="menu-button" id="menuButton" aria-expanded="false" aria-controls="mobileNav" aria-label="Open menu"><span></span><span></span><span></span></button></div><nav class="mobile-nav" id="mobileNav" aria-label="Mobile navigation">${navHTML(true)}</nav></header>`;
}

function footer() {
  return `<footer class="site-footer"><div class="footer-inner"><div><strong>Learning with purpose. Teaching with heart.</strong><p>This e-portfolio documents my evolving journey through Residency@TCSJ—the development of an equitable, student-centered elementary teaching practice.</p></div><div class="footer-mark">Neetu Mohanan · 2026–27</div></div><div class="copyright">Residency@TCSJ E-Portfolio · Teachers College of San Joaquin</div></footer><button class="back-to-top" id="backToTop" aria-label="Back to top"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 19V5M5 12l7-7 7 7"/></svg></button>`;
}

function pageHero(p) {
  return `<section class="page-hero" data-ornament="${p.ornament||p.phase||"N"}"><div class="page-hero-inner"><div class="breadcrumbs">${p.crumb||`Coursework · Phase ${p.phase}`}</div><h1>${p.title}</h1><p>${p.subtitle}</p></div></section>`;
}

function home() {
  return `<section class="hero">
    ${heroBackground()}
    <div class="hero-inner">
      <div class="hero-copy">
        <p class="eyebrow"><span class="eyebrow-dot"></span>Residency@TCSJ · 2026–27</p>
        <h1>A quiet voice.<br><em>A bright purpose.</em></h1>
        <div class="hero-divider" aria-hidden="true"></div>
        <p class="hero-lead">I'm <strong>${profile.name}</strong>—from ${profile.origin}, now in ${profile.location}. With a foundation in mathematics, software development, and business analysis, I am building an elementary teaching practice rooted in belonging, equity, and the belief that every child deserves to be seen.</p>
        ${heroStats()}
        <div class="actions">
          <a class="button" href="bio.html">Discover my story</a>
          <a class="button secondary" href="coursework.html">Explore coursework</a>
        </div>
        ${heroTagRow()}
      </div>
      ${heroPortraitLuxury()}
    </div>
    ${heroWave}
    <a class="hero-scroll" href="#intro" aria-label="Scroll to explore"><span>Explore</span><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12l7 7 7-7"/></svg></a>
  </section>
  <section class="intro-strip" id="intro">
    <div class="intro-grid">
      <div class="intro-item"><div class="intro-icon">✦</div><strong>Kerala → California</strong><span>Karukachal to Tracy</span></div>
      <div class="intro-item"><div class="intro-icon">◈</div><strong>MCA · Artificial Intelligence</strong><span>Amrita University · Expected 2026</span></div>
      <div class="intro-item"><div class="intro-icon">◇</div><strong>BSc · Mathematics</strong><span>Mahatma Gandhi University, Kerala</span></div>
      <div class="intro-item"><div class="intro-icon">♡</div><strong>Residency@TCSJ</strong><span>Elementary Education</span></div>
    </div>
  </section>
  <section class="banner-wrap">
    <div class="luxury-banner reveal">
      <blockquote>“Every child deserves a teacher who notices both their voice and their silence.”</blockquote>
      <cite>— My guiding belief</cite>
    </div>
  </section>
  <section class="section section-alt reveal">
    <div class="section-title">
      <p class="eyebrow">My e-portfolio</p>
      <h2>Where identity becomes teaching practice</h2>
      <div class="gold-rule"></div>
      <p>Required pages for Residency@TCSJ—story, philosophy, coursework across five phases, weekly reflections, and professional tools.</p>
    </div>
    <div class="cards">
      <article class="card reveal"><span class="number">01 · BIO</span><h3>Who I am</h3><p>Kerala roots, education, professional journey, and the beliefs shaping my teaching identity.</p><a href="bio.html">Read my bio →</a></article>
      <article class="card reveal"><span class="number">02 · PHILOSOPHY</span><h3>My Philosophy of Education</h3><p>Relationships, rigor, and joyful challenge in an elementary classroom.</p><a href="philosophy.html">Read philosophy →</a></article>
      <article class="card reveal"><span class="number">03 · EQUITY</span><h3>Beliefs About Equity</h3><p>Access, identity, and voice—equity as daily practice, not a poster on the wall.</p><a href="equity.html">Read equity beliefs →</a></article>
      <article class="card reveal"><span class="number">04 · COURSEWORK</span><h3>Five phases</h3><p>Who Am I?, book study, TPA, action research, classroom management, and more.</p><a href="coursework.html">View coursework →</a></article>
      <article class="card reveal"><span class="number">05 · REFLECTIONS</span><h3>Weekly reflections</h3><p>Learned · Felt · Wondering from my residency weeks so far.</p><a href="reflections.html">Open reflections →</a></article>
      <article class="card reveal"><span class="number">06 · RESOURCES</span><h3>Dictionary · Reading · Ed Tech</h3><p>Acronyms, book summaries with links, and technology tools to remember.</p><a href="acronym-dictionary.html">Browse resources →</a></article>
      <article class="card reveal"><span class="number">07 · TOOLBOX</span><h3>Culture & ELD strategies</h3><p>Classroom management routines and English learner supports from coursework.</p><a href="classroom-culture.html">Open toolbox →</a></article>
    </div>
  </section>`;
}

function phasePage(p) {
  const list = p.assignments.length
    ? `<div class="phase-list">${p.assignments.map((a, i) => `<article class="assignment reveal"><div class="assignment-icon">${String(i + 1).padStart(2, "0")}</div><div><h3>${a[0]}</h3><p>${a[1]}</p></div></article>`).join("")}</div>`
    : "";
  return `${pageHero(p)}<section class="section reveal"><div class="section-title"><p class="eyebrow">Coursework</p><h2>Meaningful artifacts</h2><div class="gold-rule"></div><p>Coursework highlighted per Residency@TCSJ e-portfolio guidelines—focused on work most meaningful to my development.</p></div>${p.featured || ""}${list}<div class="next-panel reveal"><div><strong>Continue exploring</strong><span>View other phases of my residency coursework journey.</span></div><a href="coursework.html">Back to all phases →</a></div></section>`;
}

function markActiveNav() {
  const key = document.body.dataset.page || "home";
  const current = key === "home" ? "index.html" : `${key}.html`;
  document.querySelectorAll(".nav-link, .dropdown a, .mobile-nav a").forEach(a => {
    if (a.getAttribute("href") === current) a.classList.add("active");
  });
}

function initInteractions() {
  const header = document.getElementById("siteHeader");
  const progress = document.getElementById("scrollProgress");
  const backToTop = document.getElementById("backToTop");
  const menuBtn = document.getElementById("menuButton");
  const mobileNav = document.getElementById("mobileNav");

  let ticking = false;
  window.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      if (header) header.classList.toggle("scrolled", y > 60);
      if (progress) progress.style.width = `${docH > 0 ? (y / docH) * 100 : 0}%`;
      if (backToTop) backToTop.classList.toggle("visible", y > 400);
      document.querySelector(".hero")?.style.setProperty("--hero-parallax", `${y * 0.15}px`);
      ticking = false;
    });
  }, { passive: true });

  backToTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  menuBtn?.addEventListener("click", () => {
    const open = mobileNav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(open));
  });

  document.addEventListener("click", e => {
    if (!menuBtn?.contains(e.target) && !mobileNav?.contains(e.target)) {
      mobileNav?.classList.remove("open");
      menuBtn?.setAttribute("aria-expanded", "false");
    }
  });

  const revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
  } else {
    document.querySelectorAll(".reveal").forEach(el => el.classList.add("revealed"));
  }

  document.querySelectorAll(".hero-scroll").forEach(link => {
    link.addEventListener("click", e => {
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

function render() {
  const root = document.getElementById("app");
  const key = document.body.dataset.page || "home";
  const p = phaseData[key] || pages[key] || pages.home;
  const content = p.home
    ? home()
    : phaseData[key]
      ? phasePage(p)
      : `${pageHero(p)}<section class="section ${["bio","philosophy"].includes(key) ? "narrow" : ""} reveal">${p.body}</section>`;
  root.innerHTML = chrome() + header() + `<main>${content}</main>` + footer();
  markActiveNav();
  initInteractions();
}

document.addEventListener("DOMContentLoaded", render);
