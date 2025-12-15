export interface Role {
  id: string;
  title: string;
  category: string;
  skills: string[];
  prerequisites: string[];
  bestFor: string[];
  description: string;
  whatYouLearn: string[];
  typicalBackground: string;
  commonNextSteps: string[];
  whyGoodFit: string;
  timeCommitment: string;
  department: string;
}

export const roles: Role[] = [
  {
    id: "web-dev-assistant",
    title: "Web Development Assistant",
    category: "Development",
    skills: ["HTML/CSS", "JavaScript", "Git version control", "Responsive design", "Debugging"],
    prerequisites: ["CSC 226 (or enrolled)", "Basic programming experience"],
    bestFor: ["First-year students", "Students exploring web technologies", "Visual learners"],
    description: "Help maintain and update departmental websites and web applications. Work directly with faculty and staff to implement design changes and add new features.",
    whatYouLearn: [
      "How to work with existing codebases",
      "Real-world web development workflows",
      "Communication with non-technical stakeholders",
      "Browser compatibility and accessibility basics",
      "Basic project management"
    ],
    typicalBackground: "Students who have completed or are taking CSC 226. Many start with little web experience but are curious about how websites work. No prior job experience needed.",
    commonNextSteps: [
      "Frontend Developer (local businesses)",
      "Software Development Intern",
      "IT Student Support Specialist",
      "Teaching Assistant for web-focused courses"
    ],
    whyGoodFit: "This role provides immediate visual feedback on your work, making it easier to see progress. You'll build a portfolio of real projects while learning industry-standard tools. Faculty supervisors understand you're learning.",
    timeCommitment: "8-10 hours/week",
    department: "ITS / Academic Departments"
  },
  {
    id: "teaching-assistant",
    title: "Teaching Assistant (CS Courses)",
    category: "Teaching & Mentoring",
    skills: ["Explaining complex concepts", "Patience and empathy", "Debugging others' code", "Presentation skills"],
    prerequisites: ["Completed the course you're assisting with", "B+ or higher in that course", "Faculty recommendation"],
    bestFor: ["Students considering teaching/grad school", "Strong communicators", "Students who want to deepen understanding"],
    description: "Support students in introductory or mid-level CS courses through lab sessions, office hours, and assignment review. Help create a welcoming learning environment.",
    whatYouLearn: [
      "How to break down complex problems for others",
      "Common misconceptions in CS education",
      "Mentorship and leadership skills",
      "Deeper mastery of course material",
      "How to give constructive feedback"
    ],
    typicalBackground: "Students who performed well in a specific CS course and showed interest in helping peers. International students and those who struggled initially often make excellent TAs because they remember what confusion feels like.",
    commonNextSteps: [
      "Lead Teaching Assistant",
      "Graduate teaching assistantship",
      "Peer tutor coordinator",
      "Student Success Mentor",
      "Industry roles with mentorship components"
    ],
    whyGoodFit: "If you learn best by teaching, this solidifies your knowledge while building leadership skills. You'll be part of a community of TAs who support each other.",
    timeCommitment: "6-8 hours/week",
    department: "Computer Science Department"
  },
  {
    id: "data-assistant",
    title: "Data & Research Assistant",
    category: "Research & Analysis",
    skills: ["Data cleaning", "Excel/Google Sheets", "Basic statistics", "Python or R", "Documentation"],
    prerequisites: ["CSC 236 or equivalent", "Interest in research or data analysis"],
    bestFor: ["Detail-oriented students", "Students considering research careers", "Students interested in data science"],
    description: "Support faculty research projects or institutional research by collecting, cleaning, and analyzing data. May involve surveys, data visualization, or literature reviews.",
    whatYouLearn: [
      "How research actually works (not just theory)",
      "Data ethics and privacy considerations",
      "Statistical thinking and interpretation",
      "How to document your process",
      "Collaboration with researchers from other fields"
    ],
    typicalBackground: "Students with programming fundamentals who are curious about applying CS to real-world questions. You don't need advanced statistics—just willingness to learn and careful attention to detail.",
    commonNextSteps: [
      "Research internships (REU programs)",
      "Data analyst positions",
      "Graduate research assistant",
      "Business intelligence roles",
      "Academic librarian specializing in data"
    ],
    whyGoodFit: "This role shows you how CS connects to other disciplines. You'll develop critical thinking about data while building a portfolio of research contributions. Faculty mentors often write strong grad school recommendations.",
    timeCommitment: "8-12 hours/week (flexible)",
    department: "Faculty Research Labs / Institutional Research"
  },
  {
    id: "it-support",
    title: "IT Student Support Specialist",
    category: "Support & Infrastructure",
    skills: ["Troubleshooting", "Customer service", "Active listening", "Technical documentation", "Basic networking"],
    prerequisites: ["CSC 146 or demonstrated technical aptitude", "Strong interpersonal skills"],
    bestFor: ["First-year and sophomore students", "Students who enjoy helping others", "Students building confidence"],
    description: "Provide frontline technical support to students, faculty, and staff. Handle help desk tickets, troubleshoot common issues, and escalate complex problems.",
    whatYouLearn: [
      "How to diagnose problems systematically",
      "Professional communication under pressure",
      "How campus technology infrastructure works",
      "Time management with unpredictable workload",
      "When to ask for help vs. trying to solve alone"
    ],
    typicalBackground: "Students who are comfortable with computers but may not have deep programming experience yet. Many IT specialists discover interests in cybersecurity, systems administration, or UX through this work.",
    commonNextSteps: [
      "Lead IT Support Specialist",
      "Cybersecurity roles",
      "Systems Administrator Assistant",
      "Network Operations intern",
      "Technical project coordinator"
    ],
    whyGoodFit: "You'll quickly develop confidence by solving real problems daily. The work is varied, so you'll discover what aspects of technology interest you most. Builds essential soft skills that complement technical coursework.",
    timeCommitment: "10-12 hours/week (includes some evening/weekend coverage)",
    department: "Information Technology Services"
  },
  {
    id: "software-dev-intern",
    title: "Software Development Intern",
    category: "Development",
    skills: ["Object-oriented programming", "Testing", "API integration", "Code review", "Agile workflow"],
    prerequisites: ["CSC 236", "Data structures knowledge", "Portfolio or project examples"],
    bestFor: ["Juniors and seniors", "Students targeting industry roles", "Students with personal projects"],
    description: "Work on internal software projects for campus departments or local partner organizations. Contribute to full development lifecycle from planning to deployment.",
    whatYouLearn: [
      "How professional software teams operate",
      "Writing code that others will maintain",
      "Testing strategies and quality assurance",
      "Client communication and requirement gathering",
      "How to estimate time and manage scope"
    ],
    typicalBackground: "Students who have completed core CS courses and demonstrated initiative through personal projects or hackathons. Prior labor experience in IT or web development is common but not required.",
    commonNextSteps: [
      "Summer internships at tech companies",
      "Full-time software engineer positions",
      "Technical lead for student projects",
      "Startup founding team member",
      "Graduate programs in software engineering"
    ],
    whyGoodFit: "This is the closest on-campus experience to industry software development. You'll build skills directly applicable to job interviews and co-op positions. Strong mentorship from experienced developers.",
    timeCommitment: "10-15 hours/week",
    department: "ITS Software Development Team / Partner Organizations"
  },
  {
    id: "lab-monitor",
    title: "Computer Lab Monitor",
    category: "Support & Infrastructure",
    skills: ["Responsibility", "Basic troubleshooting", "Time management", "Multitasking"],
    prerequisites: ["None (open to first-year students)", "Reliability and punctuality"],
    bestFor: ["First-year students", "Students needing flexible work", "Students building work history"],
    description: "Ensure computer labs are safe, clean, and functional. Help students with basic questions, report equipment issues, and maintain a productive study environment.",
    whatYouLearn: [
      "Professional workplace responsibility",
      "How to balance work and coursework",
      "Basic troubleshooting and escalation",
      "Exposure to different CS students and their projects",
      "Time management and showing up consistently"
    ],
    typicalBackground: "No prior experience required. This is often a first campus job for many students. What matters most is reliability and a willingness to help others.",
    commonNextSteps: [
      "IT Student Support Specialist",
      "Teaching Assistant",
      "Web Development Assistant",
      "Office assistant roles in academic departments",
      "Student leadership positions"
    ],
    whyGoodFit: "This role has lower technical barriers, making it accessible when you're still learning fundamentals. Provides structure and income while you explore what interests you. Often leads to stronger campus connections.",
    timeCommitment: "8-12 hours/week (flexible scheduling)",
    department: "Computer Science Department / Library"
  },
  {
    id: "database-admin-assistant",
    title: "Database Administration Assistant",
    category: "Research & Analysis",
    skills: ["SQL", "Database design", "Data integrity", "Backup procedures", "Documentation"],
    prerequisites: ["CSC 236", "CSC 226 recommended", "Strong organizational skills"],
    bestFor: ["Juniors and seniors", "Students interested in backend systems", "Detail-oriented learners"],
    description: "Assist with maintaining institutional databases, creating reports, ensuring data integrity, and documenting database schemas. May support multiple departments.",
    whatYouLearn: [
      "Production database management",
      "How data flows through organizations",
      "Security and privacy best practices",
      "SQL optimization and query design",
      "Cross-departmental communication"
    ],
    typicalBackground: "Students who have completed database coursework or shown strong aptitude in data structures. Many come from data assistant or research roles. Attention to detail is crucial.",
    commonNextSteps: [
      "Database administrator positions",
      "Backend developer roles",
      "Data engineer internships",
      "Business analyst positions",
      "Graduate programs in data management"
    ],
    whyGoodFit: "If you like working with structured systems and ensuring things run smoothly behind the scenes, this builds specialized skills in high demand. Less visible than web development but equally valuable.",
    timeCommitment: "10-12 hours/week",
    department: "Information Technology Services / Institutional Research"
  },
  {
    id: "ux-research-assistant",
    title: "UX Research Assistant",
    category: "Design & Research",
    skills: ["User interviews", "Usability testing", "Note-taking and synthesis", "Empathy", "Design thinking"],
    prerequisites: ["Interest in human-centered design", "Strong communication", "No specific CS course required"],
    bestFor: ["Students interested in design", "Psychology or CS double majors", "Students exploring non-coding paths"],
    description: "Conduct user research for campus technology projects. Run interviews, usability tests, and synthesize findings to inform design decisions.",
    whatYouLearn: [
      "How to talk to users and gather honest feedback",
      "Research methods (interviews, surveys, observation)",
      "How to advocate for user needs",
      "Synthesis and pattern recognition",
      "Collaboration between designers and developers"
    ],
    typicalBackground: "Students with curiosity about why people struggle with technology. Background in CS, psychology, or design helps, but willingness to listen is most important. Some UX assistants come from TA roles.",
    commonNextSteps: [
      "UX designer internships",
      "Product management roles",
      "Human-computer interaction graduate programs",
      "Accessibility specialist positions",
      "Service design roles"
    ],
    whyGoodFit: "This role bridges technical and human sides of computing. You'll develop skills that complement programming and open doors to design-focused careers. Growing field with strong demand.",
    timeCommitment: "6-10 hours/week (project-based)",
    department: "ITS / Academic Technology / Faculty Research"
  }
];
