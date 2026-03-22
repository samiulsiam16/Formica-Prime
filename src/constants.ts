import { Project, BlogPost } from './types';

export const ANT_DIALOGUES = {
  worker: ["WHERE CRUMB?", "CARRYING. ALWAYS CARRYING.", "MY BACK HAS GIVEN UP BUT MY SPIRIT HASN'T", "IS IT LUNCH? IT FEELS LIKE LUNCH.", "QUEEN SAYS SHIP IT", "I HAVEN'T SLEPT IN 3 DAYS", "THIS IS FINE 🔥", "ANOTHER TUNNEL, ANOTHER DAY"],
  creative: ["THE KERNING IS WRONG", "HAVE YOU CONSIDERED PURPLE?", "THIS NEEDS MORE TEXTURE", "THE LOGO SPEAKS. LISTEN TO IT.", "I NEED SILENCE TO CREATE", "ARTISTICALLY, THIS CRUMB IS INFERIOR"],
  strategy: ["I HAVE A THEORY.", "THE DATA SUGGESTS CHAOS.", "ACTUALLY, IF YOU LOOK AT THE PHEROMONE TRAILS...", "I MAPPED THIS. I REGRET MAPPING THIS.", "THE CRUMB MIGRATION PATTERNS ARE CLEAR."],
  reporter: ["BREAKING NEWS:", "DID YOU SEE THAT?!", "I'M GETTING THIS ON RECORD.", "NO COMMENT IS ALSO A COMMENT.", "SOURCES CONFIRM: YES."],
  queen: ["WE DO NOT MISS DEADLINES.", "THE TUNNEL IS THE BRAND.", "EVERY CRUMB HAS A STRATEGY.", "PROCEED. DO NOT DISAPPOINT ME.", "I AM AWARE."],
  merchant: ["GREAT VALUE!", "LET'S TALK NUMBERS.", "LIMITED TIME, MY FRIEND.", "YOU WON'T FIND THIS ANYWHERE ELSE.", "DEAL. SHAKE ON IT. SHAKE WITH ALL 6."],
  motion: ["HAVE YOU SEEN MY PORTFOLIO?", "IT MOVES. EVERYTHING MOVES.", "I ONCE ANIMATED A CRUMB. IT WAS BEAUTIFUL.", "MORE FRAMES. ALWAYS MORE FRAMES."],
  tiny: ["I'M FINE.", "WHICH TUNNEL IS THE BATHROOM?", "I JUST FOUND A NEW TUNNEL! ...WAIT.", "HOW LONG HAVE YOU ALL WORKED HERE?"]
};

export const NEWS_ITEMS = [
  "🚨 BREAKING: LOCAL WORKER DISCOVERS UNPRECEDENTED CRUMB DEPOSIT — COLONY IN FRENZY",
  "📢 QUEEN APPROVES TUNNEL EXPANSION — CONSTRUCTION ANT #7 REFUSES SAFETY BRIEFING",
  "🏆 WORKER #4471 PROMOTED TO SENIOR CRUMB ANALYST — COWORKERS JEALOUS",
  "⚠️ STRATEGIC PHEROMONE RESERVES RUNNING LOW — BRAINY ANT BLAMES MERCURY RETROGRADE",
  "🎉 GALLERY TUNNEL WINS UNDERGROUND DESIGN AWARD — ARTSY ANT CRIES AT CEREMONY",
  "🍪 UNCONFIRMED REPORTS OF COOKIE FRAGMENT NEAR SECTOR 7 — ALL UNITS ON ALERT",
  "🔥 THIS IS FINE: THIRD TUNNEL COLLAPSE THIS WEEK — COLONY CONTINUES OPERATIONS",
  "📰 SCOOP ANT WINS PULITZER FOR INVESTIGATIVE CRUMB JOURNALISM"
];

export const PROJECTS: Project[] = [
  {
    id: 'hivemind',
    title: "HIVEMIND REBRAND",
    category: "Branding",
    crumbLevel: 5,
    description: "A complete visual overhaul for a global tech collective. We dug deep into their core values and built a brand that resonates across all sectors.",
    client: "HiveMind Collective",
    timeline: "6 Months",
    role: "Lead Creative Agency",
    tools: ["Figma", "After Effects", "Pheromone Mapping"],
    results: ["340% Traffic Increase", "2 Design Awards", "$2M Revenue Generated", "12 Countries Reached"],
    quote: {
      text: "The Colony delivered beyond expectation. We didn't understand half of what they built, but our sales tripled, so we asked no questions.",
      author: "CEO Ant",
      authorTitle: "HiveMind Collective"
    }
  },
  {
    id: 'forager',
    title: "FORAGER CAMPAIGN",
    category: "Campaigns",
    crumbLevel: 4,
    description: "A viral social campaign for an outdoor brand that encouraged users to find their own 'crumbs' of adventure.",
    client: "Forager Outdoor",
    timeline: "3 Months",
    role: "Campaign Strategy & Execution",
    tools: ["Social Media", "Video Production", "Ant-Analytics"],
    results: ["1.2M Impressions", "50k New Followers", "Sold Out in 48 Hours"],
    quote: {
      text: "They made a crumb look cinematic. The crumb won a festival award. We are still in shock.",
      author: "Marketing Lead",
      authorTitle: "Forager Outdoor"
    }
  },
  {
    id: 'queens-commerce',
    title: "QUEEN'S COMMERCE",
    category: "Web",
    crumbLevel: 5,
    description: "Building the most robust e-commerce platform in the underground world. Scalable, fast, and Queen-approved.",
    client: "Colony Retail",
    timeline: "8 Months",
    role: "Full-Stack Development",
    tools: ["React", "Node.js", "Tunnel-DB"],
    results: ["99.9% Uptime", "10k Orders/Day", "Zero Tunnel Collapses"],
    quote: {
      text: "Fast, accessible, and built so well it will outlast the tunnel system itself.",
      author: "Operations Queen",
      authorTitle: "Colony Retail"
    }
  },
  {
    id: 'anthill',
    title: "ANTHILL IDENTITY",
    category: "Identity",
    crumbLevel: 3,
    description: "A fresh identity for a co-working space designed for the modern worker ant.",
    client: "Anthill Co-working",
    timeline: "2 Months",
    role: "Visual Identity",
    tools: ["Illustrator", "Brand Strategy"],
    results: ["Fully Booked", "Local Design Award", "Happy Workers"],
    quote: {
      text: "They understood our chaos and organized it into a brand.",
      author: "Manager Ant",
      authorTitle: "Anthill Co-working"
    }
  },
  {
    id: 'signal',
    title: "COLONY SIGNAL",
    category: "Branding",
    crumbLevel: 4,
    description: "Brand strategy for a SaaS startup looking to broadcast their signal to the surface world.",
    client: "Signal SaaS",
    timeline: "4 Months",
    role: "Brand Strategy",
    tools: ["Workshops", "Market Analysis"],
    results: ["Series A Funded", "Clear Positioning", "Strong Signal"],
    quote: {
      text: "The strategy was so deep we found oil. And then we found our brand.",
      author: "Founder Ant",
      authorTitle: "Signal SaaS"
    }
  },
  {
    id: 'surface-app',
    title: "SURFACE WORLD APP",
    category: "Web",
    crumbLevel: 5,
    description: "Mobile UX/UI design for a delivery app connecting the surface world with the colony.",
    client: "Surface Delivery",
    timeline: "5 Months",
    role: "UX/UI Design",
    tools: ["Figma", "Prototyping"],
    results: ["4.8 App Store Rating", "1M Downloads", "Efficient Routes"],
    quote: {
      text: "The interface is so intuitive even a surface human can use it.",
      author: "Product Lead",
      authorTitle: "Surface Delivery"
    }
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: "THE PSYCHOLOGY OF THE PERFECT LOGO (A ANT'S PERSPECTIVE)",
    author: 'creative',
    authorName: 'Artsy',
    date: 'MAR 22, 2026',
    readTime: '3 min read',
    teaser: "Why kerning matters more than your life, and why purple is the only valid color choice.",
    content: "In the colony, we don't just see logos; we feel them. A logo is a pheromone trail for your brand. If the kerning is off, the trail is broken. We spent 400 hours debating the curve of a single 'C'. It was worth it.",
    color: '#F5E6C8'
  },
  {
    id: '2',
    title: "WHY YOUR WEBSITE IS SLOWER THAN A WORKER ANT IN FEBRUARY",
    author: 'worker',
    authorName: 'Carry',
    date: 'MAR 20, 2026',
    readTime: '5 min read',
    teaser: "Optimization isn't a luxury; it's survival. Learn how we shave milliseconds off load times.",
    content: "Speed is everything. When a tunnel is collapsing, you don't want to wait for a 5MB hero image to load. We build lean, we build fast, and we build for the deep earth.",
    color: '#FAFAF5'
  },
  {
    id: '3',
    title: "CRUMB THEORY: HOW DATA SHAPES MODERN MARKETING",
    author: 'strategy',
    authorName: 'Brainy',
    date: 'MAR 18, 2026',
    readTime: '7 min read',
    teaser: "Data is the new sugar. We analyze every crumb to predict where the next big deposit will be.",
    content: "If you watch the migration patterns long enough, you see the future. Marketing is just predicting where the crumbs will fall before they hit the ground.",
    color: '#E8F4FD'
  },
  {
    id: '4',
    title: "WE LAUNCHED A CAMPAIGN IN 48 HOURS. HERE'S WHAT HAPPENED.",
    author: 'reporter',
    authorName: 'Scoop',
    date: 'MAR 15, 2026',
    readTime: '4 min read',
    teaser: "A behind-the-scenes look at the chaos, the coffee, and the eventual triumph.",
    content: "It was 2 AM. The Queen was pacing. Artsy was crying. Carry was on his 12th cup of coffee. But at 8 AM, the signal went live. The colony roared.",
    color: '#FFFDE7'
  }
];
