import { Project, FeatureNode, StatItem, Testimonial, BlogItem, WorkExperience } from "./types";

export const EXPERTISES: FeatureNode[] = [
  {
    id: "exp-1",
    title: "Mobile & Frontend Systems",
    description: "Designing responsive, state-driven user interfaces and native mobile apps. Deep mechanical knowledge of React Native Reanimated, Zustand, and Tailwind.",
    icon: "smartphone",
    tags: ["React Native", "Next.js", "TypeScript", "Zustand"],
    role: "Lead Mobile Specialist"
  },
  {
    id: "exp-2",
    title: "Web3 & Blockchain",
    description: "Architecting decentralized applications, custom sub-graphs, and smart contracts across Ethereum, Solana, and BSC. Expert Dune Analytics modeling.",
    icon: "cpu",
    tags: ["Solidity", "Dapps", "Dune Analytics", "Chainlink"],
    role: "Blockchain Engineer"
  },
  {
    id: "exp-3",
    title: "Backend & Cloud Services",
    description: "Building resilient microservices, high-throughput RESTful / GraphQL APIs, and real-time Socket connections hosted on Docker grids.",
    icon: "database",
    tags: ["Node.js", "Express", "Prisma", "PostgreSQL"],
    role: "API Architect"
  },
  {
    id: "exp-4",
    title: "Automation & LLM Workflows",
    description: "Developing robust automation frameworks with n8n, Make.com, and LLM services to optimize core operations and eliminate repetitive overhead.",
    icon: "activity",
    tags: ["AI Agents", "n8n", "Make.com", "Telegram APIs"],
    role: "Automation Specialist"
  }
];

export const PROJECTS: Project[] = [
  {
    id: "proj-1",
    title: "BetterOS Productivity Suite",
    description: "A production-grade habit-tracking and workflow productivity engine pushed to Apple TestFlight and Google Play Console, utilizing automated CD pipelines.",
    category: "Mobile Application",
    tags: ["React Native", "TypeScript", "CI/CD", "Zustand"],
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=1200&q=80",
    mockupAlt: "Minimal dashboard interface on high-end smartphone screen.",
    techStack: ["React Native", "Tailwind", "CI/CD", "Node.js"],
    link: "https://github.com/bl4ckh401"
  },
  {
    id: "proj-2",
    title: "Quran Guide AI",
    description: "Intelligent companion launched on Apple App Store, incorporating interactive Quran recitation tracking, smart search queries, and customized LLM API integrations.",
    category: "AI / Mobile Application",
    tags: ["React Native", "AI Integration", "TypeScript", "App Store"],
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=1100&q=80",
    mockupAlt: "Elegant mobile application screenshot illustrating high-contrast night theme interface.",
    techStack: ["React Native", "OpenAI API", "Reanimated", "Express"],
    link: "https://github.com/bl4ckh401"
  },
  {
    id: "proj-3",
    title: "Nairobi Dairy",
    description: "A full-stack local delivery marketplace platform featuring offline-first data caching capabilities and an API-driven real-time inventory management ledger.",
    category: "Retail Tech / Web & Mobile",
    tags: ["Next.js", "Offline First", "PostgreSQL", "Prisma"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    mockupAlt: "Real-time order routing panels on desktop viewport.",
    techStack: ["React", "PostgreSQL", "Node.js", "Tailwind CSS"],
    link: "https://github.com/bl4ckh401"
  },
  {
    id: "proj-4",
    title: "Equator PnL Telegram Grid",
    description: "Enterprise bot reporting platform mapping million-point trading volumes across Binance, Bybit, and Blofin APIs to automate reports with perfect frametimes.",
    category: "Web3 / Automation",
    tags: ["WebSockets", "Telegram Bot", "Binance API", "Node.js"],
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    mockupAlt: "Glowing cyan telemetry streams reporting blockchain rates.",
    techStack: ["Node.js", "Binance SDK", "WebSockets", "Docker"],
    link: "https://github.com/bl4ckh401"
  }
];

export const STATS: StatItem[] = [
  {
    id: "stat-1",
    value: 4,
    suffix: "+ Yrs",
    label: "Professional Engineering",
    description: "Designing, optimizing, and deploying production-grade digital applications with strict timing constraints."
  },
  {
    id: "stat-2",
    value: 100,
    suffix: "%",
    label: "Manual Workflow Errors Avoided",
    description: "Integrated automated n8n, Make.com pipelines, and custom Telegram bots to monitor asset values reliably."
  },
  {
    id: "stat-3",
    value: 13,
    suffix: " DeFi Ops",
    label: "Professional Members Serviced",
    description: "Built high-density dashboards evaluating metrics across 7 major blockchain networks securely."
  },
  {
    id: "stat-4",
    value: 2025,
    suffix: " Gold",
    label: "Hackathon Winner",
    description: "Awarded first place in the Cypherium Kenya Blockchain Hackathon for developing a decentralized utility product."
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    quote: "Kimutai built BetterOS and Nairobi Dairy's inventory architecture, shifting our standard operations from manual sheets to real-time. The offline-first synchronization handles spotty networks without a single lost record.",
    author: "Elena Vostrikov",
    role: "Operations Director",
    organization: "Savity Studios",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: "test-2",
    quote: "His command of WebSockets, trading APIs, and n8n workflow integrations dramatically increased our speed. We saw manual errors drop to zero once his PnL reporting loops went live across our investment desks.",
    author: "Marcus Vance",
    role: "Portfolio Manager",
    organization: "Equator Capital",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
  }
];

export const BLOGS: BlogItem[] = [
  {
    id: "blog-1",
    title: "Making Offline-First Mobile Architectures Butter Smooth",
    excerpt: "Developing full-stack mobile systems with React Native requires handling shaky coverage gracefully. By implementing active SQLite transaction queues and silent synchronization states, we capture secure records with deterministic persistence.",
    date: "May 10, 2026",
    category: "Mobile Design",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: "blog-2",
    title: "Optimizing Webhook Channels and Stream Metrics",
    excerpt: "A deep dive into integrating Binance, Bybit, and Blofin APIs simultaneously with Node.js. Learn to decouple high-volume network events from main execution contexts with clean memory caching strategies.",
    date: "Mar 18, 2026",
    category: "DeFi Infrastructure",
    readTime: "11 min read",
    image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "blog-3",
    title: "No-Code Core as a Cloud Catalyst",
    excerpt: "Why typical workflow platforms like n8n and Make.com fail when paired with unstructured data. How to correctly orchestrate serverless API loops and LLM prompt schemas to reduce enterprise manual intervention by 80%.",
    date: "Jan 05, 2026",
    category: "Workflow Automation",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1502239608882-93b729c6af43?auto=format&fit=crop&w=400&q=80"
  }
];

export const WORK_EXPERIENCES: WorkExperience[] = [
  {
    id: "work-1",
    company: "Savity Studios",
    location: "Nairobi, Kenya",
    role: "Full-Stack Mobile Developer (Founder)",
    period: "Nov 2025 - Present",
    bullets: [
      "Built and deployed BetterOS, a productivity app pushed to Apple TestFlight and Google Play Console using automated React Native CI/CD.",
      "Launched Nairobi Dairy, an offline-first mobile delivery marketplace with inventory sync.",
      "Architected and deployed Quran Guide AI, combining React Native with intelligent translation APIs on the iOS Store.",
      "Designed secure database architectures supporting real-time user records and high production loads."
    ]
  },
  {
    id: "work-2",
    company: "MUIAA LTD",
    location: "Nairobi, Kenya",
    role: "Full-Stack Web3 Developer & AI Automation Specialist",
    period: "Feb 2025 - May 2026",
    bullets: [
      "Developed secure financial web & mobile portals for African savings groups utilizing Next.js, Node.js, and PostgreSQL.",
      "Engineered automated workflows through n8n and Make.com reducing manual verification efforts by 80%.",
      "Created smart API middleware, caching routes, and LLM-powered content categorizers to boost internal team speed."
    ]
  },
  {
    id: "work-3",
    company: "Equator Capital (EQAM)",
    location: "Nairobi, Kenya",
    role: "DeFi Analyst & Full-Stack Blockchain Developer",
    period: "Aug 2023 - Feb 2025",
    bullets: [
      "Crafted full-stack quantitative analytics dashboards supporting 13 high-profile investment partners.",
      "Designed Telegram telemetry bots tracking high-density pricing spikes across Binance, Bybit, and Blofin APIs in real-time.",
      "Orchestrated cross-chain contract evaluations tracking portfolios across 7 distinct DeFi networks."
    ]
  },
  {
    id: "work-4",
    company: "Ngeni Labs",
    location: "Nairobi, Kenya",
    role: "Blockchain Developer",
    period: "Mar 2023 - Dec 2023",
    bullets: [
      "Orchestrated custom price monitoring feeds with Chainlink oracle nodes to feed deterministic analytics dashboards.",
      "Built resilient Telegram risk control bots and PnL alerts connected to live transaction pools."
    ]
  },
  {
    id: "work-5",
    company: "Nile Capital",
    location: "Nairobi, Kenya",
    role: "Blockchain Developer",
    period: "Feb 2022 - Feb 2023",
    bullets: [
      "Engineered on-chain staking contracts, liquidity pools, and dApp frontends across Ethereum, Solana, and BSC.",
      "Delivered clean yield farming trackers and custom visual tools for active user on-chain auditing."
    ]
  }
];
