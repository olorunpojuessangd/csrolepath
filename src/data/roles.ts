import { Role, PrereqCheckItem } from '../types/role';

export type { Role, PrereqCheckItem };


export const roles: Role[] = [
  {
    id: "web-dev-assistant",
    title: "Web Development Assistant",
    category: "Development",
    skills: ["HTML/CSS", "JavaScript", "Git version control", "Responsive design", "Debugging", "Accessibility"],
    prerequisites: ["CSC 226 (Software Design) or enrolled", "Basic web programming curiosity"],
    prerequisiteChecklist: [
      { id: "csc226", label: "Completed or currently enrolled in CSC 226 (Software Design & Implementation)", isCourse: true, courseCode: "CSC 226" },
      { id: "git_basics", label: "Familiarity with basic Git commands or willing to learn GitHub workflow" },
      { id: "web_interest", label: "Interest in frontend UI design and web technologies" }
    ],
    bestFor: ["First-year & sophomore students", "Students exploring frontend engineering", "Visual & hands-on learners"],
    description: "Help maintain and update departmental websites and web applications. Work directly with faculty and staff to implement design changes and add new features.",
    whatYouLearn: [
      "How to work with existing production codebases",
      "Real-world web development workflows and version control",
      "Communication with non-technical campus stakeholders",
      "Browser compatibility and WCAG accessibility standards",
      "Agile task management and issue tracking"
    ],
    typicalBackground: "Students who have completed or are taking CSC 226. Many start with little web experience but are curious about how websites work. No prior campus job experience required.",
    commonNextSteps: [
      "Frontend / Full-stack Developer Internships",
      "Software Development Intern (ITS)",
      "Teaching Assistant for Web Development courses",
      "Freelance Web Developer for local non-profits"
    ],
    whyGoodFit: "This role provides immediate visual feedback on your work, making it easier to build confidence. You'll build a portfolio of real projects while learning industry-standard tools. Faculty supervisors understand you're learning.",
    timeCommitment: "10 hrs/week (standard contract)",
    secondaryEligible: false,
    department: "Information Technology Services / Academic Departments",
    location: "CMIT Technology Building / Hutchins Library",
    contactPerson: "ITS Web Support Supervisor & CS Department Coordinator",
    hiringCycle: "Late Spring for Fall semester · Late Fall for Spring semester",
    handshakeQuery: "Web Development Assistant",
    internshipAlignment: "Directly prepares you for Frontend and Full-Stack Software Engineering internships by providing live repository experience, Git collaboration, and UI component design on your resume.",
    applicationMaterials: [
      "Updated Labor Resume (showing CS courses taken)",
      "Unofficial Transcript / Current Course Schedule",
      "Short statement of interest or link to GitHub / portfolio (optional but encouraged)"
    ]
  },
  {
    id: "teaching-assistant",
    title: "Teaching Assistant (CS Courses)",
    category: "Teaching & Mentoring",
    skills: ["Explaining complex concepts", "Patience and empathy", "Debugging others' code", "Presentation skills", "Code review"],
    prerequisites: ["Completed the specific course with a B+ or higher", "Faculty recommendation or permission", "Good academic standing"],
    prerequisiteChecklist: [
      { id: "completed_target_course", label: "Completed the target course (e.g., CSC 226, 236, or 126) with B+ or higher", isCourse: true, courseCode: "Target CS Course" },
      { id: "faculty_connection", label: "Connected with the course instructor about TA availability" },
      { id: "patience_comms", label: "Strong communication skills and enthusiasm for helping peers debug" }
    ],
    bestFor: ["Students considering grad school", "Strong communicators", "Students who want to deepen CS fundamentals"],
    description: "Support students in introductory or mid-level CS courses through lab sessions, office hours, and assignment review. Help create a welcoming learning environment.",
    whatYouLearn: [
      "How to break down complex technical problems for diverse learners",
      "Common conceptual misconceptions in computer science",
      "Mentorship, leadership, and group facilitation skills",
      "Deep mastery of core algorithms and course material",
      "How to provide constructive, growth-oriented code feedback"
    ],
    typicalBackground: "Students who performed well in a specific CS course and showed interest in helping peers. International students and those who struggled initially often make exceptional TAs because they remember what confusion feels like.",
    commonNextSteps: [
      "Lead Teaching Assistant / Head TA",
      "Graduate Teaching Assistantship (MS/PhD)",
      "Peer Tutor Coordinator",
      "Technical Mentorship / Developer Advocate roles"
    ],
    whyGoodFit: "If you learn best by teaching, this solidifies your technical foundation while building leadership skills. You'll work closely with CS faculty who can write strong reference letters for internships and grad school.",
    timeCommitment: "10 hrs/week (primary) · 5 hrs/week available as secondary",
    secondaryEligible: true,
    department: "Computer Science Department",
    location: "CMIT Technology Building (CS Labs)",
    contactPerson: "CS Department Chair & Course Instructors",
    hiringCycle: "Mid-to-Late semester prior (March for Fall / October for Spring)",
    handshakeQuery: "Computer Science Teaching Assistant",
    internshipAlignment: "TAs excel in technical behavioral interviews because they practice articulating algorithmic concepts and code reviews every week. Demonstrates leadership and deep conceptual mastery to recruiters.",
    applicationMaterials: [
      "Handshake Student Labor Application",
      "Berea College Unofficial Transcript",
      "Permission / Endorsement from Course Faculty"
    ]
  },
  {
    id: "data-assistant",
    title: "Data & Research Assistant",
    category: "Research & Analysis",
    skills: ["Data cleaning", "Excel/Google Sheets", "Basic statistics", "Python / R", "Data visualization", "Critical thinking"],
    prerequisites: ["CSC 236 (Data Structures) or equivalent", "Interest in research or quantitative analysis"],
    prerequisiteChecklist: [
      { id: "csc236", label: "Completed or taking CSC 236 (Data Structures) or equivalent programming", isCourse: true, courseCode: "CSC 236" },
      { id: "python_sheets", label: "Basic familiarity with Python, R, or spreadsheet analysis" },
      { id: "attention_detail", label: "Careful attention to detail and data integrity" }
    ],
    bestFor: ["Students interested in data science", "Students considering research/grad school", "Analytical problem solvers"],
    description: "Support faculty research projects or institutional research by collecting, cleaning, and analyzing data. May involve surveys, data visualization, or literature reviews.",
    whatYouLearn: [
      "Practical data manipulation with Python (Pandas), R, or advanced SQL",
      "How academic research methodologies and empirical studies are designed",
      "Creating clear charts and visual reports for diverse audiences",
      "Handling real-world, imperfect institutional datasets",
      "Scientific writing and presentation skills"
    ],
    typicalBackground: "Students who enjoy finding patterns in information. Often taken by students who liked math or stats alongside CS. Faculty understand you may be learning analysis tools on the job.",
    commonNextSteps: [
      "NSF REU (Research Experiences for Undergraduates)",
      "Data Science / Analytics Internships",
      "Graduate Research Assistant (MS/PhD)",
      "Business Intelligence & Quantitative Analyst roles"
    ],
    whyGoodFit: "This role shows you how CS connects to real-world domains. You'll develop critical thinking about data while building co-authored research papers or presentations. Faculty mentors write stellar grad school recommendations.",
    timeCommitment: "10 hrs/week (standard contract)",
    secondaryEligible: false,
    department: "Faculty Research Labs / Institutional Research",
    location: "CMIT Technology Building / Frost Building",
    contactPerson: "Faculty Principal Investigators & Institutional Research Director",
    hiringCycle: "Rolling basis · Major openings posted in April and November",
    handshakeQuery: "Data Research Assistant",
    internshipAlignment: "Direct stepping stone to Data Science, Machine Learning, and Research Analyst internships. Gives you concrete project deliverables and statistical tools (Pandas, NumPy, visualization) for your resume.",
    applicationMaterials: [
      "Labor Resume highlighting relevant Math/CS coursework",
      "Unofficial Transcript",
      "Brief description of research interests or data projects"
    ]
  },
  {
    id: "it-support",
    title: "IT Student Support Specialist",
    category: "Support & Infrastructure",
    skills: ["Hardware & software troubleshooting", "Customer service", "Active listening", "Technical documentation", "Network diagnostics"],
    prerequisites: ["CSC 146 or demonstrated technical aptitude", "Strong interpersonal skills"],
    prerequisiteChecklist: [
      { id: "tech_aptitude", label: "Comfort with MacOS/Windows troubleshooting and campus WiFi setups" },
      { id: "customer_service", label: "Strong verbal communication and patience with users" },
      { id: "first_job_ok", label: "No prior CS coursework strictly required—first-year students welcome!" }
    ],
    bestFor: ["First-year and sophomore students", "Students who enjoy hands-on troubleshooting", "Students building confidence in tech"],
    description: "Provide frontline technical support to students, faculty, and staff. Handle help desk tickets, troubleshoot common hardware/software issues, and configure campus devices.",
    whatYouLearn: [
      "How to diagnose complex technical issues systematically",
      "Professional communication and de-escalation under pressure",
      "How enterprise IT and network infrastructure function",
      "Ticketing systems (ServiceNow / Jira) and SLA workflows",
      "When to escalate issues vs. solving independently"
    ],
    typicalBackground: "Students who are comfortable with computers but may not have deep programming experience yet. Many IT specialists discover passions in cybersecurity, cloud infrastructure, or systems administration through this work.",
    commonNextSteps: [
      "Lead IT Support Specialist",
      "Cybersecurity / SOC Analyst Internships",
      "Systems Administrator Assistant",
      "Network Operations / Cloud Infrastructure roles"
    ],
    whyGoodFit: "You'll quickly develop confidence by solving real problems daily. The work is varied, so you'll discover what aspects of technology interest you most. Builds essential soft skills that complement technical coursework.",
    timeCommitment: "10 hrs/week (standard contract · shift-based scheduling)",
    secondaryEligible: false,
    department: "Information Technology Services (ITS)",
    location: "Hutchins Library Helpdesk / Technology Resource Center",
    contactPerson: "ITS Helpdesk Manager",
    hiringCycle: "Early Fall (August) for new students · Spring semester replenishment",
    handshakeQuery: "ITS Student Support Specialist",
    internshipAlignment: "Provides tangible ITIL framework, hardware diagnostics, and ticketing experience that directly qualifies you for IT Support, System Admin, and Cybersecurity internships.",
    applicationMaterials: [
      "Berea Handshake Application Form",
      "Resume detailing customer service or technical troubleshooting experience"
    ]
  },
  {
    id: "software-dev-intern",
    title: "Software Development Intern",
    category: "Development",
    skills: ["Full-stack development", "Unit & integration testing", "API design & integration", "Code review", "Agile/Scrum workflow", "Database queries"],
    prerequisites: ["CSC 236 (Data Structures)", "Object-oriented programming mastery", "Portfolio or personal project examples"],
    prerequisiteChecklist: [
      { id: "csc236", label: "Completed CSC 236 (Data Structures)", isCourse: true, courseCode: "CSC 236" },
      { id: "oop_mastery", label: "Proficiency in at least one modern language (Python, Java, TypeScript, C++)" },
      { id: "portfolio_project", label: "At least one personal project or class project hosted on GitHub" }
    ],
    bestFor: ["Juniors and seniors", "Students targeting Big Tech & industry SWE roles", "Self-driven builders"],
    description: "Work on internal software projects for campus departments or local partner organizations. Contribute to full development lifecycle from planning to deployment.",
    whatYouLearn: [
      "How professional software engineering teams operate in sprints",
      "Writing clean, modular code that others will maintain",
      "Automated testing strategies and continuous integration (CI/CD)",
      "Client communication, sprint planning, and scope estimation",
      "Production deployment and bug triage"
    ],
    typicalBackground: "Students who have completed core CS courses and demonstrated initiative through personal projects or hackathons. Prior labor experience in IT or web development is common but not required.",
    commonNextSteps: [
      "Summer SWE Internships at Tech Companies (Google, Microsoft, startups)",
      "Full-time Software Engineer positions upon graduation",
      "Technical Lead for senior capstone projects",
      "Graduate programs in Computer Science"
    ],
    whyGoodFit: "This is the closest on-campus experience to industry software development. You'll build skills directly applicable to coding interviews and co-op positions with strong mentorship from senior developers.",
    timeCommitment: "10–15 hrs/week (lead structure — primary only)",
    secondaryEligible: false,
    isLeadStructure: true,
    department: "ITS Software Engineering Team / Partner Organizations",
    location: "CMIT Technology Building / ITS Annex",
    contactPerson: "Director of Enterprise Applications & CS Faculty Mentor",
    hiringCycle: "February–March for upcoming Academic Year",
    handshakeQuery: "Software Development Intern",
    internshipAlignment: "Gold-standard resume builder: lets you talk about sprint cycles, pull requests, code reviews, and production deployments in technical interviews.",
    applicationMaterials: [
      "Technical Resume with GitHub Profile link",
      "Unofficial Transcript",
      "Sample Code / Repository Demonstration"
    ]
  },
  {
    id: "makerspace-lab-assistant",
    title: "CMIT Tech & Makerspace Assistant",
    category: "Support & Infrastructure",
    skills: ["3D Printing & CAD", "Linux/Raspberry Pi", "Hardware Troubleshooting", "Lab Safety & Tool Maintenance", "Peer Mentoring"],
    prerequisites: ["Curiosity for hands-on hardware & prototyping", "Reliability and helpful peer attitude"],
    prerequisiteChecklist: [
      { id: "hands_on_interest", label: "Interest in 3D printing, microcontrollers (Arduino/Pi), or hardware tinkering" },
      { id: "lab_safety", label: "Willingness to complete equipment safety training" },
      { id: "first_year_welcome", label: "Open to all class years—great for first-years!" }
    ],
    bestFor: ["First-year & sophomore students", "Students interested in IoT, robotics, or hardware", "Makers & builders"],
    description: "Support the CS department's hardware lab and makerspace in CMIT. Assist students with 3D printers, microcontrollers, VR gear, and maintain Linux workstation environments.",
    whatYouLearn: [
      "Hardware prototyping with microcontrollers, sensors, and 3D design software",
      "Linux terminal operations and departmental lab station maintenance",
      "Lab safety management, inventory tracking, and equipment maintenance",
      "Mentoring fellow students through hands-on technical course projects",
      "Troubleshooting electronic components, wiring, and network peripherals"
    ],
    typicalBackground: "Curious students of all years who enjoy hands-on making and tinkering. No prior hardware experience strictly required—department supervisors provide comprehensive equipment training.",
    commonNextSteps: [
      "Robotics & Embedded Systems Internships",
      "Software Development Intern (ITS)",
      "IT Student Support Specialist",
      "Teaching Assistant for Hardware / Architecture courses"
    ],
    whyGoodFit: "Provides hands-on physical computing experience without requiring heavy theoretical CS prerequisites. You get direct access to cutting-edge maker tools and faculty in CMIT.",
    timeCommitment: "10 hrs/week (standard contract)",
    secondaryEligible: false,
    department: "Computer Science Department",
    location: "CMIT Technology Building (Makerspace & Hardware Labs)",
    contactPerson: "CMIT Technology Lab Director",
    hiringCycle: "Early August for Fall term · Late November for Spring term",
    handshakeQuery: "Makerspace Assistant",
    internshipAlignment: "Demonstrates tangible hardware-software integration, rapid prototyping, and systems troubleshooting skills highly valued in IoT and engineering internships.",
    applicationMaterials: [
      "Berea Handshake Labor Profile",
      "Weekly class schedule for lab coverage"
    ]
  },
  {
    id: "database-admin-assistant",
    title: "Database Administration Assistant",
    category: "Research & Analysis",
    skills: ["SQL", "Database normalization", "Data integrity & backups", "ETL pipelines", "Documentation", "Query optimization"],
    prerequisites: ["CSC 236 (Data Structures)", "Interest in data modeling & SQL", "High attention to detail"],
    prerequisiteChecklist: [
      { id: "csc236", label: "Completed CSC 236 (Data Structures)", isCourse: true, courseCode: "CSC 236" },
      { id: "sql_curiosity", label: "Interest in relational databases, SQL queries, and data schemas" },
      { id: "data_hygiene", label: "Commitment to confidential data security and system integrity" }
    ],
    bestFor: ["Sophomores and juniors", "Students interested in backend / data engineering", "Systematic organizers"],
    description: "Assist with database maintenance, schema documentation, query optimization, and data migration pipelines under the mentorship of senior database administrators.",
    whatYouLearn: [
      "Production database management and query tuning",
      "How enterprise data flows through multi-tier institutional systems",
      "Backup recovery procedures and disaster recovery planning",
      "Data privacy compliance and role-based access control (RBAC)",
      "Writing automated scripts for data transformation and sanity checks"
    ],
    typicalBackground: "Students who enjoy structured thinking, logic puzzles, and backend architecture. Often a second labor position after taking CSC 236.",
    commonNextSteps: [
      "Database Administrator (DBA) Internships",
      "Backend Engineer / Cloud Infrastructure roles",
      "Data Engineer Internships",
      "Enterprise Systems Analyst"
    ],
    whyGoodFit: "Gives you exposure to how large organizations actually manage mission-critical data. A standout resume builder for students pursuing backend, cloud, or data engineering careers.",
    timeCommitment: "10 hrs/week (standard contract)",
    secondaryEligible: false,
    department: "ITS Enterprise Database & Infrastructure Team",
    location: "CMIT Technology Building / ITS Operations",
    contactPerson: "Lead Database Administrator & Infrastructure Manager",
    hiringCycle: "Late Fall for Spring term · Late Spring for Fall term",
    handshakeQuery: "Database Administration Assistant",
    internshipAlignment: "SQL and relational database management are required in over 85% of software and data engineering job descriptions. Provides undeniable production database credentials.",
    applicationMaterials: [
      "Resume highlighting programming & database projects",
      "Unofficial Transcript",
      "Short paragraph explaining interest in database management"
    ]
  },
  {
    id: "ux-research-assistant",
    title: "UX Research & Design Assistant",
    category: "Design & Research",
    skills: ["User interviews", "Usability testing", "Figma wireframing", "Survey design", "Qualitative analysis", "Accessibility (WCAG)"],
    prerequisites: ["Curiosity about user behavior and human-centered design", "Strong listening & writing skills"],
    prerequisiteChecklist: [
      { id: "design_interest", label: "Interest in UX/UI design, Human-Centered Computing, or user psychology" },
      { id: "interview_comms", label: "Comfort conducting student interviews and usability tests" },
      { id: "open_majors", label: "Open to CS, Design, and Psychology students alike" }
    ],
    bestFor: ["Students interested in Product Design & UX", "Creative problem solvers", "Cross-disciplinary students"],
    description: "Conduct usability studies, interview student and faculty users, create wireframe prototypes in Figma, and help make campus software tools intuitive and accessible.",
    whatYouLearn: [
      "How to conduct generative interviews and moderated usability testing",
      "Qualitative synthesis methods (affinity mapping, persona creation)",
      "How to advocate for end-user accessibility and cognitive ergonomics",
      "Effective bridge communication between designers, developers, and stakeholders",
      "Figma prototyping and design system fundamentals"
    ],
    typicalBackground: "Students with curiosity about why people struggle with technology. Background in CS, psychology, or design helps, but willingness to listen is most important. Some UX assistants come from TA roles.",
    commonNextSteps: [
      "UX Design & Product Design Internships",
      "Associate Product Manager (APM) Programs",
      "Human-Computer Interaction (HCI) Graduate Programs",
      "Accessibility & Inclusive Design Specialist"
    ],
    whyGoodFit: "This role bridges technical and human sides of computing. You'll develop skills that complement programming and open doors to design-focused careers in a rapidly growing field with strong industry demand.",
    timeCommitment: "10 hrs/week (standard contract)",
    secondaryEligible: false,
    department: "ITS / Academic Technology / Faculty Research",
    location: "CMIT Technology Building / Makerspace",
    contactPerson: "Director of Academic Technology & HCI Faculty",
    hiringCycle: "Early Fall and Mid-Spring semesters",
    handshakeQuery: "UX Research Assistant",
    internshipAlignment: "Direct portfolio evidence: provides case studies with user research, usability test videos, and wireframe prototypes that are required for Product Design and UX internships.",
    applicationMaterials: [
      "Resume highlighting writing, communication, or design experience",
      "Brief portfolio or sample UX case study link (if available)"
    ]
  }
];
