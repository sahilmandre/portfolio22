// Central content source for the portfolio.
// All sections read from here so copy lives in one place.

export const SITE = {
  name: 'Sahil Mandre',
  role: 'Front-End Developer',
  title: 'Packaged App Development Senior Analyst @ Accenture',
  tagline:
    'I build fast, interactive things for the web — and increasingly, in 3D.',
  location: 'Indore, India',
  email: 'sahilmandre@gmail.com',
  phone: '+917987391196',
  resume: '/resume/SahilMandre_resume_2026.pdf',
  yearsExperience: 5,
}

export const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/sahilmandre', icon: 'github' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/sahilmandre/', icon: 'linkedin' },
  { label: 'Instagram', href: 'https://www.instagram.com/sahilmandre/', icon: 'instagram' },
  { label: 'YouTube', href: 'https://www.youtube.com/sahilmandre', icon: 'youtube' },
  { label: 'Facebook', href: 'https://www.facebook.com/sahil.mandre.58/', icon: 'facebook' },
]

// --- The journey (2D timeline + basis for the 3D scroll scenes) ---
export const JOURNEY = [
  {
    year: '2000–2017',
    title: 'The school years',
    place: 'Jabalpur',
    icon: 'school',
    blurb:
      'Where it started — growing up in Jabalpur, curious and restless, always taking things apart just to see how they worked.',
  },
  {
    year: '2009–2015',
    title: 'Goalkeeper',
    place: 'Jabalpur district team',
    icon: 'football',
    blurb:
      'Six years guarding the net as a district-level goalkeeper. Football taught me focus under pressure, quick reads, and how to stay calm as the last line of defence.',
  },
  {
    year: '2017–2021',
    title: 'B.Tech, Computer Science',
    place: 'RGPV, Bhopal',
    icon: 'college',
    blurb:
      'Moved to Bhopal for engineering. Led the college fest organizing committee, hosted events as an anchor, and even performed as a mimicry artist.',
  },
  {
    year: '2020',
    title: 'Coding, for real',
    place: 'During the COVID lockdown',
    icon: 'code',
    blurb:
      'Lockdown flipped a switch. With the world indoors, I taught myself to build for the web — HTML, CSS, JavaScript, then React — and never looked back.',
  },
  {
    year: '2021',
    title: 'Associate Software Developer',
    place: 'V2 Venture Tech · Udaipur',
    icon: 'briefcase',
    blurb:
      'My first job — building Salesforce Lightning components and learning what it really means to ship software.',
  },
  {
    year: '2021–2025',
    title: 'System Engineer',
    place: 'TCS · Indore',
    icon: 'building',
    blurb:
      'Almost four years going deep on React — Redux, React Query, performance and clean front-end architecture — delivering interfaces for global clients.',
  },
  {
    year: '2025–Now',
    title: 'Senior Analyst',
    place: 'Accenture · Indore',
    icon: 'spark',
    blurb:
      'Today I am the sole frontend developer on my project at Accenture, building ReactJS features and weaving OpenAI / GenAI into real products.',
  },
]

// --- Professional experience (detailed) ---
export const EXPERIENCE = [
  {
    company: 'Accenture Solutions Pvt. Ltd.',
    role: 'Packaged App Development Senior Analyst',
    period: 'Nov 2025 – Present',
    location: 'Indore, MP',
    points: [
      'Sole frontend developer designing, developing and delivering ReactJS features while working directly with clients on requirements.',
      'Integrated OpenAI APIs into the frontend for AI-driven, real-time content generation from user input.',
      'Built scalable, reusable React components using modern hooks and lazy loading for better performance.',
      'Aligned UI logic with backend and GenAI workflows for seamless feature integration.',
    ],
    tags: ['React', 'OpenAI / GenAI', 'Hooks', 'Performance'],
  },
  {
    company: 'Tata Consultancy Services',
    role: 'System Engineer',
    period: 'Dec 2021 – Nov 2025',
    location: 'Indore, MP',
    points: [
      'Integrated APIs and managed state with Redux and React Query — ~20% gain in data-processing efficiency.',
      'Cut load times ~30% through lazy loading, code splitting and optimization.',
      'Standardised Git workflows, reducing merge conflicts ~40% across the team.',
      'Refactored codebases for clean, scalable architecture — ~25% fewer bug incidents.',
      'Built responsive UIs with React, Bootstrap and Material UI — 90% responsiveness across devices.',
    ],
    tags: ['React', 'Redux', 'React Query', 'Material UI', 'Bootstrap'],
  },
  {
    company: 'V2 Venture Tech',
    role: 'Associate Software Developer',
    period: 'Jul 2021 – Oct 2021',
    location: 'Udaipur, RJ',
    points: [
      'Worked hands-on with Salesforce Lightning App Builder — ~25% less dev time for custom components.',
      'Learned Salesforce best practices alongside senior developers; implemented 10+ techniques.',
      'Built and customised Lightning components — ~30% better UI performance and satisfaction.',
    ],
    tags: ['Salesforce', 'Lightning', 'Apex'],
  },
]

// --- Skills ---
export const SKILLS = [
  { group: 'Frontend', items: ['React', 'JavaScript', 'TypeScript', 'Angular', 'HTML', 'CSS'] },
  { group: 'Styling', items: ['Tailwind CSS', 'Bootstrap', 'Material UI', 'Shadcn', 'Styled Components'] },
  { group: 'State & Data', items: ['Redux', 'React Query', 'Supabase'] },
  { group: 'Backend', items: ['Node.js', 'Express', 'MongoDB'] },
  { group: 'AI & Tooling', items: ['OpenAI / GenAI', 'Git', 'Vite', 'VS Code'] },
]

// --- Quick facts (About) ---
export const FACTS = [
  { label: 'Based in', value: 'Indore, India' },
  { label: 'Experience', value: '5 years' },
  { label: 'Focus', value: 'Front-end & 3D web' },
  { label: 'Now', value: 'Senior Analyst · Accenture' },
]

// --- Projects ---
export const PROJECTS = [
  {
    name: 'Tradelogy',
    tagline: 'Real-time stock trading dashboard',
    description:
      'A full-stack MERN application delivering real-time trading insights, portfolio tracking and performance analytics — a responsive React dashboard backed by streamlined Node/Express/MongoDB APIs and TanStack Query.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'TanStack Query'],
    live: 'https://tradelogy.in/',
    code: 'https://github.com/sahilmandre',
    image: '/assets/images/projectImages/tradelogy.webp',
    featured: true,
  },
  {
    name: 'Hulu Clone',
    tagline: 'Streaming UI clone',
    description:
      'A faithful Hulu interface built with React and Tailwind CSS, focused on responsive layout and clean component structure.',
    tech: ['React', 'Tailwind CSS'],
    live: 'https://huluclone-gq08qulf2-sahilmandre.vercel.app/',
    image: '/assets/images/projectImages/hulu.webp',
  },
  {
    name: 'Design Symposium',
    tagline: 'Event website',
    description:
      'A WordPress site with custom SCSS for a design symposium — bespoke styling and easy content management.',
    tech: ['WordPress', 'Custom SCSS'],
    live: 'https://designsymposium.in/',
    image: '/assets/images/projectImages/designSymposium.webp',
  },
  {
    name: 'Bootstrap Demo',
    tagline: 'Responsive layout study',
    description:
      'A hand-built responsive page demonstrating Bootstrap grid, components and utility-first layout.',
    tech: ['HTML', 'CSS', 'Bootstrap'],
    live: 'https://sahilmandre.github.io/bootstrapdemo/',
    image: '/assets/images/projectImages/bsdemo.webp',
  },
]

// --- Portfolio evolution (time machine) ---
export const EVOLUTION = [
  {
    year: '2021',
    title: 'The first portfolio',
    tech: 'React · HTML · CSS',
    href: 'https://potfolio-sahil.web.app/',
    image: '/assets/images/projectImages/portfolio2021.webp',
    external: true,
    note: 'My very first personal site — where it all began.',
  },
  {
    year: '2022',
    title: 'The Angular era',
    tech: 'Angular 15 · Bootstrap',
    href: '/legacy/2022/',
    image: '/assets/images/bg1.webp',
    external: false,
    note: 'A bolder, component-driven rebuild. Preserved here — still fully live.',
  },
  {
    year: '2026',
    title: 'The 3D journey',
    tech: 'React · Three.js · GSAP',
    href: '#top',
    external: false,
    current: true,
    note: 'The one you are exploring right now.',
  },
]

// --- Beyond code ---
export const BEYOND = [
  {
    title: 'Co-Founder — Mission Azad',
    icon: 'shield',
    blurb:
      'Co-founded an NGO providing free martial-arts and self-defense training to 1,20,000+ women and girls across multiple states — promoting safety and empowerment.',
  },
  {
    title: 'Fest Lead · Anchor · Mimicry Artist',
    icon: 'mic',
    blurb:
      'Led the college fest organizing committee, coordinated shows end-to-end, hosted events as an anchor, and performed mimicry to entertain the crowd.',
  },
]

export const AWARDS = [
  'On-the-Spot (Team) Award',
  'Best Team Award',
  'Learning Achievement Award',
]

export const CERTS = [
  'Generative AI — Microsoft (Career Essentials)',
  'GitHub Professional Certificate',
  'The Ultimate React Course 2024 · 70h',
]
