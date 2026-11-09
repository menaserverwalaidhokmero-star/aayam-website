import { DiscoveryItem, CommunitySpark, ProjectTask, Article, UserProfile } from '../types';

export const INITIAL_DISCOVERIES: DiscoveryItem[] = [
  {
    id: 'spatial-optics-2026',
    title: 'Refractive Spatial Optics & Volumetric Interfaces',
    subtitle: 'Replacing planar glass screens with diffraction prisms and ambient photons',
    category: 'Spatial Computing',
    author: 'Kaelen Voss',
    authorRole: 'Optics Researcher, Zurich',
    readTime: '6 min read',
    date: 'Nov 8, 2026',
    imageUrl: '/src/assets/images/discovery_spatial_computing_1794213485870.jpg',
    excerpt: 'How multi-plane holographic refraction is transforming physical spaces into interactive computing canvases without cumbersome headsets.',
    fullStory: `Traditional head-mounted displays impose ocular fatigue and social isolation. The breakthrough in micro-prismatic diffraction grids allows ambient light sources to form stable, high-definition volumetric focal planes directly in open room air.

By coordinating micro-lens arrays with sub-millimeter eye tracking, interface elements float in real optical parallax. The interface exists as pure light: text exhibits razor-sharp typography at arbitrary focal depths, while tactile mid-air ultrasound emitters provide haptic resistance when interacting with volumetric buttons.

Architectural studios and high-speed simulation labs are already running full-fidelity 3D structural iterations where multiple collaborators examine floating CAD models simultaneously without wearable displays.`,
    keyTakeaways: [
      'Diffraction prisms generate true volumetric focal planes with zero ocular strain.',
      'Mid-air acoustic ultrasound arrays provide tactile haptic feedback.',
      'Multi-user spatial consensus without single-wearer head-mounted isolation.',
      'Immediate integration with physical architectural materials and ambient daylight.'
    ],
    tags: ['Spatial Computing', 'Diffraction Optics', 'Haptics', 'Industrial Design'],
    likes: 342,
    bookmarked: true
  },
  {
    id: 'biomimetic-lattice-architecture',
    title: 'Biomimetic Lattice Geometry & Living Timber',
    subtitle: 'Self-stiffening reciprocal structures inspired by vascular plant tissue',
    category: 'Biomimetic Design',
    author: 'Sora Tanaka',
    authorRole: 'Architectural Biologist, Kyoto',
    readTime: '8 min read',
    date: 'Nov 6, 2026',
    imageUrl: '/src/assets/images/discovery_biomimetic_architecture_1794213486506.jpg',
    excerpt: 'A new paradigm of timber architecture that breathes, responds to ambient relative humidity, and self-repairs micro-fractures.',
    fullStory: `By studying the cellular mechanics of high-altitude alpine conifers, researchers have developed reciprocal wooden lattice systems that passively adjust their porosity in response to meteorological shifts.

During heavy rainfall or high humidity, hygroscopic micro-ribs expand slightly, naturally tightening structural joints and providing natural rainwater shedding. In arid, high-heat conditions, the lattice expands ventilation apertures, drawing cool subterranean air through geothermal channels into the building interior.

Furthermore, integrating dormant fungal mycelium cultures within the interstitial joint pockets allows autonomous biochemical seal repair if hairline fissures form under seismic stress.`,
    keyTakeaways: [
      'Zero-energy passive HVAC mediated entirely through wood hygromorphic swelling.',
      'Reciprocal lattice distributes point loads uniformly across organic curves.',
      'Embedded bio-mycelial spores seal microscopic fissures autonomously.',
      'Embodies negative embodied carbon footprint through regional certified timber.'
    ],
    tags: ['Architecture', 'Biomimicry', 'Mass Timber', 'Living Systems'],
    likes: 489,
    bookmarked: false
  },
  {
    id: 'cyber-acoustics-tactile-synths',
    title: 'Tactile Analog Synthesizers & Bio-Acoustic Resonators',
    subtitle: 'Reclaiming physical mechanical weight in an era of ephemeral software knobs',
    category: 'Analog Acoustics',
    author: 'Julian Mercer',
    authorRole: 'Instrument Designer, Berlin',
    readTime: '5 min read',
    date: 'Nov 4, 2026',
    imageUrl: '/src/assets/images/discovery_cyber_acoustics_1794213487795.jpg',
    excerpt: 'Why master craftspeople and sound sculptors are turning away from touchscreens toward high-inertia brass potentiometers and physical voltage valves.',
    fullStory: `When musicians interact with software on flat glass, muscle memory has no mechanical resistance to orient itself. High-inertia weighted rotary dials—carved from solid brass and balanced on stainless steel bearings—provide a calibrated mechanical drag that connects auditory feedback directly to neuromuscular intuition.

The latest wave of cyber-acoustic instruments integrates discreet digital microprocessor patchbays behind authentic vacuum tube saturation stages. Performers sculpt harmonic overtones by physically routing woven conductive cords, bridging the tactile richness of 1970s studio hardware with modern microtonal tuning systems.

Laboratory measurements show that musicians make 40% more nuanced micro-adjustments when turning knurled brass knobs than when dragging virtual faders on high-refresh tablets.`,
    keyTakeaways: [
      'Kinetic resistance in rotary potentiometers measurably enhances microtonal precision.',
      'Hybrid analog tube saturation paired with programmable micro-controllers.',
      'Tactile memory reduces cognitive load during live auditory performances.',
      'Durability engineered for 50+ year operational lifespans.'
    ],
    tags: ['Synthesizers', 'Acoustics', 'Tactile UI', 'Hardware Craft'],
    likes: 278,
    bookmarked: true
  },
  {
    id: 'horizon-pavilion-monolith',
    title: 'The Horizon Pavilion: Monolithic Continuous Curves',
    subtitle: 'Structural glass ribbons redefining seaside cultural spaces',
    category: 'Sustainable Materials',
    author: 'Elena Vance',
    authorRole: 'Creative Director, AAYAM Labs',
    readTime: '7 min read',
    date: 'Nov 1, 2026',
    imageUrl: '/src/assets/images/hero_horizon_creative_1794213485146.jpg',
    excerpt: 'An investigation into curved structural laminated glass that eliminates opaque columns while withstanding extreme coastal gale forces.',
    fullStory: `The Horizon Pavilion stands as a testament to what happens when computational topology optimization meets artisanal glass blowing at massive architectural scales.

Rather than relying on vertical steel columns that interrupt continuous sightlines toward the sea horizon, the building utilizes double-curved laminated low-iron glass panels as primary load-bearing members. Each panel acts both as transparent enclosure and structural shell, channeling dead loads and wind uplift directly into subterranean basalt footings.

At dusk, the interior illumination reveals how the sweeping roofs float weightlessly above the dunes, blurring the boundary between civil engineering and functional landscape sculpture.`,
    keyTakeaways: [
      'Load-bearing structural glass replaces internal opaque structural columns.',
      'Double-curvature geometry boosts aerodynamic gale resistance by 65%.',
      'Low-iron glass with microscopic solar control coatings limits thermal solar gain.',
      'Harmonious integration into coastal nature reserves.'
    ],
    tags: ['Architecture', 'Structural Glass', 'Coastal Design', 'Computational Engineering'],
    likes: 612,
    bookmarked: false
  },
  {
    id: 'generative-topography-algorithms',
    title: 'Reactive Algorithmic Canvases & Fluid Dynamics',
    subtitle: 'Real-time Navier-Stokes simulations in modern creative software',
    category: 'Generative Systems',
    author: 'David Chen',
    authorRole: 'Graphics Programmer, Tokyo',
    readTime: '6 min read',
    date: 'Oct 29, 2026',
    imageUrl: '/src/assets/images/discovery_spatial_computing_1794213485870.jpg',
    excerpt: 'Bringing organic fluid mechanics and cellular automata directly into client-side web browser experiences with WebGL and Canvas 2D.',
    fullStory: `Static graphic design assets are rapidly giving way to dynamic, living generative systems. By applying discrete approximations of the Navier-Stokes fluid equations directly in browser contexts, designers create brand identities that react to cursor velocity, audio rhythms, and ambient sunlight.

Instead of fixed logo guidelines, contemporary studios author parametric rulebooks: particle densities, viscosity constants, and chromatic dispersion gradients. The result is an identity that feels genuinely alive while maintaining geometric rigor.`,
    keyTakeaways: [
      'Fluid velocity advection calculated in real-time at 60 FPS.',
      'Brand identities shift from static vector lockups to living computational behaviors.',
      'Interactive particle vectors respond to user gestures without latency.',
      'Compact code footprints compared to heavy pre-rendered video loops.'
    ],
    tags: ['Generative Art', 'Canvas', 'Creative Coding', 'Fluid Dynamics'],
    likes: 415,
    bookmarked: false
  },
  {
    id: 'mycelium-acoustic-aerogels',
    title: 'Mycelium Acoustic Aerogels & Porous Carbon',
    subtitle: 'Replacing petro-chemical foam panels with carbon-negative fungal acoustics',
    category: 'Sustainable Materials',
    author: 'Marcella Rivera',
    authorRole: 'Materials Engineer, Milan',
    readTime: '5 min read',
    date: 'Oct 24, 2026',
    imageUrl: '/src/assets/images/discovery_biomimetic_architecture_1794213486506.jpg',
    excerpt: 'How fungal hyphae grown on agricultural husks produce acoustic dampening superior to polyurethane foam at a fraction of the carbon cost.',
    fullStory: `Sound recording studios, auditoriums, and open-plan workspaces have long depended on fiberglass and polyurethane foams for acoustic isolation—materials that leach microplastics and require high-energy petrochemical synthesis.

By inoculating hemp shives and agricultural straw with selected Ganoderma mycelium strains, engineers cultivate dense, micro-porous acoustic panels within 8 days. After drying and gentle heat pressing, the panels feature a natural cellular labyrinth that traps sound waves across low and mid frequencies with an NRC (Noise Reduction Coefficient) rating of 0.92.`,
    keyTakeaways: [
      'NRC rating of 0.92 exceeds conventional synthetic acoustic foams.',
      '100% biodegradable and compostable at end of life cycle.',
      'Grown in 8-day localized micro-factories using agricultural byproduct waste.',
      'Naturally fire-retardant without hazardous chemical halogen additives.'
    ],
    tags: ['Biomaterials', 'Acoustics', 'Circular Economy', 'Sustainable Design'],
    likes: 310,
    bookmarked: true
  }
];

export const INITIAL_COMMUNITY_SPARKS: CommunitySpark[] = [
  {
    id: 'spark-1',
    authorName: 'Dr. Aris Thorne',
    authorHandle: '@aris_thorne',
    authorAvatar: '/src/assets/images/avatar_nova_creator_1794213487195.jpg',
    role: 'Spatial Systems Architect',
    timestamp: '2 hours ago',
    title: 'Why tactile physical controls outperform touchscreens in high-stress creative tasks',
    content: 'We recently ran a test with 40 modular synthesizer artists and architectural modellers. Replacing multi-touch gestures with knurled mechanical rotary encoders reduced task completion hesitation by 34%. There is something fundamental about proprioception that flat glass simply cannot replicate.',
    category: 'Insight',
    likes: 128,
    userLiked: false,
    comments: [
      {
        id: 'c1',
        author: 'Maya Lin',
        avatar: '',
        text: 'Completely agree! The micro-vibration when a potentiometer clicks into center detent is irreplaceable.',
        timestamp: '1 hour ago'
      },
      {
        id: 'c2',
        author: 'Kenji Sato',
        avatar: '',
        text: 'This aligns with aviation cockpit research. Critical controls are always physically distinct shapes so pilots can operate them by blind touch.',
        timestamp: '35 mins ago'
      }
    ]
  },
  {
    id: 'spark-2',
    authorName: 'Lyra Mercer',
    authorHandle: '@lyram',
    authorAvatar: '/src/assets/images/avatar_nova_creator_1794213487195.jpg',
    role: 'Creative Technologist',
    timestamp: '5 hours ago',
    title: 'Prototype: Real-time harmonic color palette generator with WCAG AAA guarantees',
    content: 'I built an algorithm that sculpts 5-step harmonious color ramps where every single color combination automatically passes WCAG AAA contrast against either pure dark slate or clean white. Check out the Chromatic Studio tool here in AAYAM!',
    category: 'Prototype',
    likes: 94,
    userLiked: true,
    comments: [
      {
        id: 'c3',
        author: 'Elena Vance',
        avatar: '/src/assets/images/avatar_nova_creator_1794213487195.jpg',
        text: 'The contrast math is exceptionally tight. Using OKLCH color space makes lightness transitions look so natural!',
        timestamp: '3 hours ago'
      }
    ]
  },
  {
    id: 'spark-3',
    authorName: 'Finnian O’Connor',
    authorHandle: '@finn_design',
    authorAvatar: '/src/assets/images/avatar_nova_creator_1794213487195.jpg',
    role: 'Sound Designer & Acoustician',
    timestamp: 'Yesterday',
    title: 'Acoustic ecology in remote workspaces: Brown noise vs Binaural drones',
    content: 'When entering deep focus, white noise can feel overly sharp and cause subtle ear fatigue after 45 minutes. Sub-octave brown noise combined with periodic pentatonic chimes keeps the auditory cortex grounded without overwhelming working memory.',
    category: 'Resource',
    likes: 215,
    userLiked: false,
    comments: [
      {
        id: 'c4',
        author: 'Sora Tanaka',
        avatar: '',
        text: 'The Deep Flow ambient synthesizer in AAYAM has been on in my background for my entire modeling sprint today.',
        timestamp: '18 hours ago'
      }
    ]
  }
];

export const INITIAL_PROJECT_TASKS: ProjectTask[] = [
  {
    id: 'task-1',
    title: 'Finalize chromatic color scale for Horizon Design System',
    category: 'Design System',
    completed: true,
    priority: 'high',
    createdAt: '2026-11-06'
  },
  {
    id: 'task-2',
    title: 'Review biomimetic mass timber structural calculations with Kyoto lab',
    category: 'Architecture',
    completed: false,
    priority: 'high',
    createdAt: '2026-11-07'
  },
  {
    id: 'task-3',
    title: 'Test Web Audio ambient binaural pulse decay curves in Soundscape tool',
    category: 'Acoustics',
    completed: false,
    priority: 'medium',
    createdAt: '2026-11-08'
  },
  {
    id: 'task-4',
    title: 'Curate 4 new breakthrough discoveries for Weekly Horizon Digest',
    category: 'Curation',
    completed: true,
    priority: 'low',
    createdAt: '2026-11-08'
  }
];

export const EDITORIAL_ARTICLES: Article[] = [
  {
    id: 'art-1',
    title: 'The Architecture of Silence: Designing for Cognitive Presence',
    subtitle: 'Why the next luxury in software and physical environments is the deliberate absence of distraction',
    readTime: '7 min read',
    date: 'November 2026',
    author: 'Elena Vance',
    authorAvatar: '/src/assets/images/avatar_nova_creator_1794213487195.jpg',
    coverImage: '/src/assets/images/hero_horizon_creative_1794213485146.jpg',
    summary: 'An exploration into why hyper-connected dashboards exhaust human cognition, and how ambient calm computing restores deep creative flow.',
    content: [
      'For the past fifteen years, the prevailing doctrine of digital software design was maximum engagement: red notification badges, incessant audio chirps, and auto-refreshing feeds engineered to hijack dopamine loops.',
      'We are now witnessing a profound aesthetic and philosophical correction. The most respected creators and technologists no longer prize hyper-stimulated tools. Instead, they seek instruments characterized by restraint, quiet confidence, and tactile honesty.',
      'Calm computing posits that an interface should inhabit our peripheral attention until summoned, communicating critical state with graceful subtlety rather than shrill alarmism.',
      'When software respects human biological tempo, creative work transforms from a hurried sprint into an enduring state of deep, restorative flow.'
    ]
  },
  {
    id: 'art-2',
    title: 'Beyond the Flat Glass: The Return of Tactile Computation',
    subtitle: 'Exploring the physical renaissance in modern instrument design and creative interfaces',
    readTime: '9 min read',
    date: 'October 2026',
    author: 'Julian Mercer',
    authorAvatar: '/src/assets/images/avatar_nova_creator_1794213487195.jpg',
    coverImage: '/src/assets/images/discovery_cyber_acoustics_1794213487795.jpg',
    summary: 'Why touchscreens are reaching their limits in professional creative workflows, and why physical dials, sliders, and haptics are mounting a historic comeback.',
    content: [
      'A glass slab treats every gesture the same. Whether you are deleting a spam email or fine-tuning an acoustic filter cutoff, your fingertips glide across frictionless silicate.',
      'Human hands evolved over millions of years to grasp branches, chip flint, carve wood, and calibrate delicate mechanical watches. When we rob our fingers of texture, resistance, and weight, we amputate half of our brain’s sensory feedback bandwidth.',
      'The modern renaissance of physical hardware is not nostalgic retro-fetishism; it is high-performance biomechanics. An analog dial with viscous fluid damping lets a designer land on an exact 0.1% increment blindly, guided entirely by muscle proprioception.',
      'The future of creative tools will not be purely physical or purely digital, but a seamless cybernetic fusion where tactile hardware directs boundless algorithmic computation.'
    ]
  }
];

export const INITIAL_USER_PROFILE: UserProfile = {
  name: 'Elena Vance',
  handle: '@elena_vance',
  title: 'Principal Design Technologist & Curation Fellow',
  bio: 'Exploring the intersection of generative algorithmic design, biomimetic architecture, and tactile acoustic instruments. Founding member of AAYAM Studio.',
  avatarUrl: '/src/assets/images/avatar_nova_creator_1794213487195.jpg',
  location: 'San Francisco & Zurich',
  website: 'https://aayam.creative.studio',
  theme: 'dark',
  accentColor: 'amber',
  soundEnabled: true,
  reducedMotion: false
};
