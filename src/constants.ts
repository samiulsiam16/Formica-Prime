import { Project, BlogPost, TimelineEntry, ColonyWisdom, RejectedConcept } from './types';

export const ROYAL_CLIENTS = [
  "HIVEMIND GLOBAL COLLECTIVE",
  "SURFACE WORLD VENTURES",
  "FORAGER INDUSTRIES",
  "COLONY CAPITAL GROUP",
  "THE UNDERGROUND EXCHANGE",
  "CRUMB FUTURES LLC"
];

export const TIMELINE_ENTRIES: TimelineEntry[] = [
  {
    year: "2018",
    title: "THE FOUNDING DIG",
    description: "Two ants with a laptop and a dream dug the first tunnel beneath a park bench in Brooklyn. The Queen was not yet Queen. She was merely 'That ant with very good taste and terrifying eye contact.'",
    illustration: "laptop"
  },
  {
    year: "2018 Q3",
    title: "FIRST CLIENT",
    description: "A surface-world bakery hired the colony to redesign their logo. The colony delivered 47 logo concepts. The client chose the first one. This has never been discussed again.",
    illustration: "logo_stack"
  },
  {
    year: "2019",
    title: "THE GREAT EXPANSION",
    description: "Tunnels 2 through 8 excavated. Creative Ant 'Artsy' joined the colony after being discovered living inside a design school's air vent, critiquing student work through the ventilation system.",
    illustration: "vent"
  },
  {
    year: "2019 Q4",
    title: "THE FIRST TUNNEL COLLAPSE",
    description: "Tunnel 3 collapsed during the colony's busiest month. All 6 ants worked through the night. The project shipped on time. The tunnel was not rebuilt for 8 months. No one spoke of it.",
    illustration: "collapse"
  },
  {
    year: "2020",
    title: "THE SURFACE WORLD GOES QUIET",
    description: "Humans stopped going outside. The colony, already underground, experienced no disruption. Business tripled. The Queen made a note: 'Underground is the future.'",
    illustration: "smug_queen"
  },
  {
    year: "2020 Q3",
    title: "HIVEMIND PROJECT",
    description: "First major enterprise client. The colony worked for 6 months on a complete identity system. Brainy Ant produced a 200-page strategy document. The client read 4 pages. It was enough.",
    illustration: "huge_doc"
  },
  {
    year: "2021",
    title: "SCOOP JOINS THE COLONY",
    description: "Reporter Ant 'Scoop' arrived uninvited with a press badge and a story idea. The Queen hired them on the spot. 'Anyone with that much audacity belongs here,' she said.",
    illustration: "scoop_burst"
  },
  {
    year: "2021 Q4",
    title: "50 PROJECTS",
    description: "The colony completed its 50th project. Artsy cried. Brainy made a graph. Carry kept working because 'we have six more due this week.' The Queen nodded and drank her 4,000th cup of coffee.",
    illustration: "coffee_queen"
  },
  {
    year: "2022",
    title: "THE MARKET OPENS",
    description: "The Market Tunnels section opened for business. Deals Ant joined to manage the stalls. On their first day they closed three contracts before lunch and ate lunch in 4 minutes. The colony was impressed and mildly terrified.",
    illustration: "market_stall"
  },
  {
    year: "2022 Q3",
    title: "SPARK ARRIVES",
    description: "Motion Ant 'Spark' descended from the surface world in a shower of literal sparks — a welding accident nearby created an opportunity. 'I was already animating before I landed,' she said.",
    illustration: "spark_fall"
  },
  {
    year: "2023",
    title: "100 PROJECTS",
    description: "One hundred completed projects. The Queen declared a colonial holiday. Worker Ant Carry celebrated by completing project 101 during the holiday. 'I don't know how to stop,' they admitted. Everyone agreed this was correct.",
    illustration: "counter_100"
  },
  {
    year: "NOW",
    title: "THE COLONY GROWS",
    description: "You are here. The colony is 8 tunnels wide, 6 chambers deep, and operated by 7 certified professionals and one intern named Tiny who has been lost in the CSS since day 47. The Queen has never been prouder. Or busier.",
    illustration: "full_map"
  }
];

export const COLONY_WISDOM: ColonyWisdom[] = [
  { text: "A LOGO IS NOT A BRAND. A BRAND IS EVERYTHING. A LOGO IS JUST THE FACE." },
  { text: "IF YOUR BRIEF IS VAGUE, YOUR RESULTS WILL BE VAGUE. BE SPECIFIC." },
  { text: "GOOD DESIGN IS 10% TALENT, 90% NOT FEARING THE BLANK PAGE." },
  { text: "THE CLIENT IS ALWAYS PARTLY RIGHT. FIGURE OUT WHICH PART." },
  { text: "TYPOGRAPHY IS THE VOICE. COLOR IS THE EMOTION. SHAPE IS THE PERSONALITY." },
  { text: "A CAMPAIGN THAT TRIES TO REACH EVERYONE REACHES NO ONE." },
  { text: "REVISION 7 IS USUALLY WORSE THAN REVISION 3. TRUST REVISION 3." },
  { text: "THE BEST BRIEF IS ONE THAT MAKES THE ANSWER OBVIOUS BEFORE YOU START." },
  { text: "YOUR COMPETITOR'S REBRAND IS NOT A REASON TO REBRAND." },
  { text: "CONTENT IS NOT STRATEGY. STRATEGY TELLS CONTENT WHERE TO GO." },
  { text: "IF EVERY ELEMENT IS EMPHASIZED, NOTHING IS EMPHASIZED." },
  { text: "SHOW THE WORK. THE WORK IS THE PITCH." }
];

export const REJECTED_CONCEPTS: RejectedConcept[] = [
  { id: '1', title: "LOGO CONCEPT #12", causeOfDeath: "Died of: 'Can you make the font bigger?'", mockupType: 'logo' },
  { id: '2', title: "THE GRADIENT PHASE", causeOfDeath: "Died of: 2017", mockupType: 'gradient' },
  { id: '3', title: "MASCOT THAT WAS TOO SCARY", causeOfDeath: "Died of: Honest feedback", mockupType: 'mascot' },
  { id: '4', title: "CAMPAIGN IDEA #7", causeOfDeath: "Died of: 'Let's circle back'", mockupType: 'campaign' },
  { id: '5', title: "THE WORDMARK NOBODY LIKED", causeOfDeath: "Died of: Unanimous client family vote", mockupType: 'wordmark' },
  { id: '6', title: "CONCEPT 'EDGY REBRAND'", causeOfDeath: "Died of: Legal department", mockupType: 'rebrand' },
  { id: '7', title: "THE WEBSITE WITH AUTOPLAY MUSIC", causeOfDeath: "Died of: Common sense (eventually)", mockupType: 'website' },
  { id: '8', title: "ORIGINAL COLONY LOGO", causeOfDeath: "Died of: Artsy's evolving taste (rest in peace)", mockupType: 'logo' }
];

export const ANT_DIALOGUES = {
  worker: ["WHERE CRUMB?", "CARRYING. ALWAYS CARRYING.", "MY BACK HAS GIVEN UP BUT MY SPIRIT HASN'T", "IS IT LUNCH? IT FEELS LIKE LUNCH.", "QUEEN SAYS SHIP IT", "I HAVEN'T SLEPT IN 3 DAYS", "THIS IS FINE 🔥", "ANOTHER TUNNEL, ANOTHER DAY"],
  creative: ["THE KERNING IS WRONG", "HAVE YOU CONSIDERED PURPLE?", "THIS NEEDS MORE TEXTURE", "THE LOGO SPEAKS. LISTEN TO IT.", "I NEED SILENCE TO CREATE", "ARTISTICALLY, THIS CRUMB IS INFERIOR"],
  strategy: ["I HAVE A THEORY.", "THE DATA SUGGESTS CHAOS.", "ACTUALLY, IF YOU LOOK AT THE PHEROMONE TRAILS...", "I MAPPED THIS. I REGRET MAPPING THIS.", "THE CRUMB MIGRATION PATTERNS ARE CLEAR."],
  reporter: ["BREAKING NEWS:", "DID YOU SEE THAT?!", "I'M GETTING THIS ON RECORD.", "NO COMMENT IS ALSO A COMMENT.", "SOURCES CONFIRM: YES."],
  queen: ["WE DO NOT MISS DEADLINES.", "THE TUNNEL IS THE BRAND.", "EVERY CRUMB HAS A STRATEGY.", "PROCEED. DO NOT DISAPPOINT ME.", "I AM AWARE."],
  merchant: ["GREAT VALUE!", "LET'S TALK NUMBERS.", "LIMITED TIME, MY FRIEND.", "YOU WON'T FIND THIS ANYWHERE ELSE.", "DEAL. SHAKE ON IT. SHAKE WITH ALL 6."],
  motion: ["HAVE YOU SEEN MY PORTFOLIO?", "IT MOVES. EVERYTHING MOVES.", "I ONCE ANIMATED A CRUMB. IT WAS BEAUTIFUL.", "MORE FRAMES. ALWAYS MORE FRAMES."],
  tiny: ["I'M FINE.", "WHICH TUNNEL IS THE BATHROOM?", "I JUST FOUND A NEW TUNNEL! ...WAIT.", "HOW LONG HAVE YOU ALL WORKED HERE?"],
  oracle: ["THE FUTURE IS A CRUMB IN THE DARK.", "I SEE TUNNELS YOU CANNOT IMAGINE.", "THE QUEEN'S WILL IS THE COLONY'S PATH.", "ASK, AND THE PHEROMONES SHALL ANSWER."],
  radio: ["KEEP DIGGING TO THE BEAT.", "THIS TRACK IS A REAL CRUMB-SHAKER.", "LO-FI TUNNEL BEATS TO DIG/RELAX TO.", "YOU'RE LISTENING TO ANT FM."]
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
