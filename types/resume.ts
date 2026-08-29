export type TemplateId =
  | 'classic-ats'
  | 'modern-professional'
  | 'graduate'
  | 'executive'
  | 'minimal-professional'
  | 'technical-specialist';

export type LanguageProficiency = 'Native' | 'Fluent' | 'Professional' | 'Intermediate' | 'Basic';

export type ExperienceLevel = 'student' | 'fresher' | 'junior' | 'mid-level' | 'senior' | 'lead' | 'executive';

export interface PersonalInfo {
  fullName: string;
  professionalTitle: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
  otherLink?: string;
  otherLinkLabel?: string;
}

export interface ProfessionalSummary {
  summaryText: string;
  targetRole: string;
  experienceLevel: ExperienceLevel;
  yearsOfExperience?: string;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  isCurrent?: boolean;
  location: string;
  gpa?: string;
  relevantCoursework?: string;
  academicAchievements?: string;
}

export interface ExperienceItem {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  description: string;
  bulletPoints: string[];
  achievements?: string;
}

export interface InternshipItem {
  id: string;
  organization: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrent?: boolean;
  description: string;
  responsibilities: string[];
  achievements?: string;
  technologiesUsed?: string[];
  displayUnder: 'experience' | 'internships';
}

export interface SkillCategory {
  id: string;
  categoryName: string;
  skills: string[];
}

export interface ProjectItem {
  id: string;
  projectName: string;
  shortDescription: string;
  technologies: string[];
  role?: string;
  projectLink?: string;
  githubLink?: string;
  startDate?: string;
  endDate?: string;
  keyContributions: string[];
  results?: string;
}

export interface CertificationItem {
  id: string;
  certificationName: string;
  issuingOrganization: string;
  issueDate: string;
  expirationDate?: string;
  credentialId?: string;
  credentialUrl?: string;
}

export interface AchievementItem {
  id: string;
  achievement: string;
  organization: string;
  date: string;
  description: string;
}

export interface AwardItem {
  id: string;
  awardName: string;
  organization: string;
  date: string;
  description: string;
}

export interface PublicationItem {
  id: string;
  publicationTitle: string;
  authors: string;
  journal: string;
  date: string;
  url?: string;
  description?: string;
}

export interface LanguageItem {
  id: string;
  language: string;
  proficiency: LanguageProficiency;
}

export interface InterestItem {
  id: string;
  name: string;
}

export interface CustomSectionEntry {
  id: string;
  title: string;
  subtitle?: string;
  date?: string;
  location?: string;
  description?: string;
  bulletPoints: string[];
}

export interface CustomSection {
  id: string;
  sectionTitle: string;
  entries: CustomSectionEntry[];
}

export interface ResumeSettings {
  templateId: TemplateId;
  font: 'inter' | 'roboto' | 'merriweather' | 'garamond';
  fontSize: 'small' | 'medium' | 'large';
  lineSpacing: 'compact' | 'normal' | 'relaxed';
  margins: 'compact' | 'normal' | 'wide';
  accentColor: string;
  showSectionDividers: boolean;
}

export interface ResumeData {
  id: string;
  title: string;
  lastModified: string;
  personalInfo: PersonalInfo;
  summary: ProfessionalSummary;
  education: EducationItem[];
  experience: ExperienceItem[];
  internships: InternshipItem[];
  skills: SkillCategory[];
  projects: ProjectItem[];
  certifications: CertificationItem[];
  achievements: AchievementItem[];
  awards: AwardItem[];
  publications: PublicationItem[];
  languages: LanguageItem[];
  interests: InterestItem[];
  customSections: CustomSection[];
  settings: ResumeSettings;
  enabledSections: {
    summary: boolean;
    education: boolean;
    experience: boolean;
    internships: boolean;
    skills: boolean;
    projects: boolean;
    certifications: boolean;
    achievements: boolean;
    awards: boolean;
    publications: boolean;
    languages: boolean;
    interests: boolean;
    customSections: boolean;
  };
}

export interface TemplateInfo {
  id: TemplateId;
  name: string;
  description: string;
  bestSuitedFor: string;
  isAtsOptimized: boolean;
  category: 'ATS' | 'Professional' | 'Student' | 'Executive';
  accentColor: string;
  features: string[];
}
