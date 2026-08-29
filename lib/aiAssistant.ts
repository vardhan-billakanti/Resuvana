import { PersonalInfo, ProfessionalSummary, EducationItem, ProjectItem, SkillCategory } from '@/types/resume';

interface SummaryGenerationInput {
  targetRole: string;
  experienceLevel: string;
  skills: string[];
  education?: string;
  projects?: string[];
  currentRole?: string;
}

const ACTION_VERBS = [
  'Architected', 'Spearheaded', 'Engineered', 'Orchestrated', 'Implemented',
  'Accelerated', 'Optimized', 'Streamlined', 'Pioneered', 'Delivered',
  'Designed', 'Automated', 'Consolidated', 'Elevated', 'Formulated'
];

const SKILL_DATABASE: Record<string, { technical: string[]; soft: string[]; tools: string[] }> = {
  software: {
    technical: ['Data Structures & Algorithms', 'System Architecture', 'RESTful APIs', 'Database Design', 'Microservices', 'Clean Code'],
    tools: ['Git & GitHub', 'Docker', 'Kubernetes', 'CI/CD Pipelines', 'Postman', 'VS Code'],
    soft: ['Analytical Problem Solving', 'Agile / Scrum Collaboration', 'Code Reviews & Mentoring', 'Technical Documentation'],
  },
  frontend: {
    technical: ['React.js', 'Next.js', 'TypeScript', 'JavaScript (ES6+)', 'HTML5 & CSS3', 'Tailwind CSS', 'State Management', 'Web Performance'],
    tools: ['Webpack/Vite', 'Figma', 'Jest/React Testing Library', 'Git', 'Chrome DevTools'],
    soft: ['User Experience Intuition', 'Cross-functional Communication', 'Attention to Detail', 'Accessibility Focus'],
  },
  backend: {
    technical: ['Node.js', 'Python', 'Java / Spring Boot', 'Go', 'PostgreSQL', 'MongoDB', 'Redis', 'API Gateway', 'Authentication (OAuth2/JWT)'],
    tools: ['Docker', 'Kafka / RabbitMQ', 'AWS / GCP', 'Linux Shell', 'Swagger'],
    soft: ['System Scalability Mindset', 'Root Cause Analysis', 'Performance Tuning', 'Collaborative Problem Solving'],
  },
  cybersecurity: {
    technical: ['Network Security', 'Vulnerability Assessment', 'Penetration Testing', 'OWASP Top 10', 'Cryptography', 'SIEM & Log Analysis', 'Incident Response'],
    tools: ['Wireshark', 'Burp Suite', 'Nmap', 'Metasploit', 'Kali Linux', 'Splunk'],
    soft: ['Risk Assessment', 'Ethical Judgment', 'Critical Thinking', 'Security Incident Reporting', 'Cross-team Advisory'],
  },
  data: {
    technical: ['Python', 'SQL & Query Optimization', 'Pandas & NumPy', 'Machine Learning', 'Data Modeling', 'ETL Pipelines', 'Statistical Analysis'],
    tools: ['Tableau / Power BI', 'Jupyter Notebooks', 'PostgreSQL', 'Snowflake', 'BigQuery', 'Docker'],
    soft: ['Data Storytelling', 'Business Insights Synthesis', 'Hypothesis Testing', 'Stakeholder Communication'],
  },
  management: {
    technical: ['Product Roadmap Planning', 'Agile / Scrum Methodologies', 'User Story Mapping', 'KPI / OKR Tracking', 'Market & Competitive Analysis', 'Budgeting'],
    tools: ['Jira / Linear', 'Confluence', 'Figma', 'Notion', 'Google Analytics', 'Miro'],
    soft: ['Cross-functional Leadership', 'Stakeholder Management', 'Strategic Decision Making', 'Conflict Resolution', 'Executive Presentation'],
  },
};

export class AIAssistant {
  /**
   * Generates multiple professional summary options tailored to the user's role and background.
   */
  static generateSummaries(input: SummaryGenerationInput): string[] {
    const role = input.targetRole.trim() || 'Software Professional';
    const topSkills = input.skills.slice(0, 4).join(', ') || 'modern software technologies';
    const level = input.experienceLevel.toLowerCase();

    if (level === 'student' || level === 'fresher') {
      return [
        `Motivated and detail-oriented ${role} candidate with a solid foundation in ${topSkills}. Proven ability to build practical hands-on projects, solve complex algorithmic challenges, and collaborate effectively in team environments. Eager to contribute technical skills and fresh perspectives to a high-impact engineering team.`,
        `Ambitious Computer Science & Technology graduate specializing in ${topSkills}. Demonstrated competence through comprehensive academic coursework, technical projects, and active development. Seeking an entry-level ${role} position to deliver clean, maintainable code and drive measurable product improvements.`,
        `Results-driven aspiring ${role} with practical project experience utilizing ${topSkills}. Passionate about continuous learning, modern best practices, and building robust, scalable solutions. Ready to leverage strong analytical abilities in a fast-paced development role.`,
      ];
    }

    if (level === 'senior' || level === 'lead' || level === 'executive') {
      return [
        `Accomplished Senior ${role} with extensive experience architecting high-availability systems, leading cross-functional engineering teams, and driving core product strategy. Deep expertise in ${topSkills}. Proven track record of optimizing performance, reducing latency, and delivering enterprise-grade platforms on schedule.`,
        `Strategic ${role} and technical leader with a strong track record of designing scalable cloud architectures, mentoring high-performing teams, and executing complex software initiatives. Expert in ${topSkills} with a strong focus on engineering excellence and measurable business ROI.`,
        `High-impact ${role} specializing in distributed architectures and technical leadership. Skilled in ${topSkills} with proven success delivering resilient solutions that scale seamlessly to millions of users while streamlining development workflows.`,
      ];
    }

    // Mid-level / standard professional
    return [
      `Results-driven ${role} with comprehensive experience building scalable, user-centric applications and robust systems using ${topSkills}. Adept at collaborating across cross-functional teams to solve technical bottlenecks, improve test coverage, and deliver features on time.`,
      `Dynamic ${role} with a proven record of designing, developing, and deploying resilient software solutions. Proficient in ${topSkills}, agile workflows, and full-lifecycle product engineering. Committed to writing clean, maintainable code and driving architectural improvements.`,
      `Detail-oriented ${role} skilled in ${topSkills}. Experienced in optimizing application performance, integrating modern APIs, and maintaining robust CI/CD pipelines to ensure seamless feature delivery.`,
    ];
  }

  /**
   * Enhances a work or internship bullet point using the STAR method (Action + Task + Quantifiable Result).
   */
  static improveBullet(originalBullet: string, mode: 'action' | 'concise' | 'impact' = 'impact'): string[] {
    const text = originalBullet.trim().replace(/^[-•*]\s*/, '');
    if (!text) return [];

    const randomVerb1 = ACTION_VERBS[Math.floor(Math.random() * 5)];
    const randomVerb2 = ACTION_VERBS[5 + Math.floor(Math.random() * 5)];
    const randomVerb3 = ACTION_VERBS[10 + Math.floor(Math.random() * 5)];

    // Clean initial text if it starts with lower-case or weak words like "Worked on", "Helped with", "Responsible for"
    const cleanedText = text
      .replace(/^(worked on|helped with|responsible for|handled|was in charge of|did)\s+/i, '')
      .replace(/^[a-z]/, (c) => c.toUpperCase());

    const resultOptions: string[] = [];

    // Option 1: High Impact with Quantifiable Outcomes
    resultOptions.push(
      `${randomVerb1} ${cleanedText.toLowerCase().replace(/^[A-Z]/, c => c.toLowerCase())}, boosting operational efficiency by 25% and reducing processing turnaround time.`
    );

    // Option 2: Action-Oriented & Engineering Focused
    resultOptions.push(
      `${randomVerb2} the implementation of ${cleanedText.toLowerCase()}, ensuring high code quality, robust test coverage (>85%), and seamless cross-platform reliability.`
    );

    // Option 3: Concise & Direct (ATS favorite)
    resultOptions.push(
      `${randomVerb3} ${cleanedText.toLowerCase()}, eliminating system bottlenecks and improving end-to-end performance.`
    );

    return resultOptions;
  }

  /**
   * Improves project descriptions to highlight tech stack, role, and tangible results.
   */
  static improveProjectDescription(rawDesc: string, techStack: string[] = []): string[] {
    const text = rawDesc.trim();
    const tech = techStack.length > 0 ? techStack.join(', ') : 'modern web technologies';

    return [
      `Engineered a high-performance solution utilizing ${tech} to solve key user challenges. Implemented responsive UI components, robust data validation, and modular backend endpoints to guarantee sub-second response times.`,
      `Designed and deployed an end-to-end application built with ${tech}. Focused on clean architecture, comprehensive API integration, and automated testing to ensure 99.9% uptime and optimal user experience.`,
      `Architected a full-stack project with ${tech}, featuring asynchronous processing, secure authentication protocols, and scalable state management. Delivered measurable performance improvements across all benchmarks.`,
    ];
  }

  /**
   * Recommends relevant skill categories based on target role.
   */
  static recommendSkills(roleTitle: string): { technical: string[]; soft: string[]; tools: string[] } {
    const query = roleTitle.toLowerCase();

    if (query.includes('cyber') || query.includes('security') || query.includes('pen')) {
      return SKILL_DATABASE.cybersecurity;
    }
    if (query.includes('front') || query.includes('react') || query.includes('ui')) {
      return SKILL_DATABASE.frontend;
    }
    if (query.includes('back') || query.includes('api') || query.includes('node') || query.includes('java')) {
      return SKILL_DATABASE.backend;
    }
    if (query.includes('data') || query.includes('ai') || query.includes('machine') || query.includes('ml')) {
      return SKILL_DATABASE.data;
    }
    if (query.includes('product') || query.includes('manage') || query.includes('lead')) {
      return SKILL_DATABASE.management;
    }

    return SKILL_DATABASE.software;
  }
}
