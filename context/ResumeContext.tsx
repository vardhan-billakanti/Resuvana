'use client';

import React, { createContext, useContext, useEffect, useState, useMemo, useRef } from 'react';
import {
  ResumeData,
  PersonalInfo,
  ProfessionalSummary,
  EducationItem,
  ExperienceItem,
  InternshipItem,
  SkillCategory,
  ProjectItem,
  CertificationItem,
  AchievementItem,
  AwardItem,
  PublicationItem,
  LanguageItem,
  InterestItem,
  CustomSection,
  CustomSectionEntry,
  ResumeSettings,
  TemplateId,
} from '@/types/resume';
import { FICTIONAL_SAMPLE_RESUME, EMPTY_RESUME } from '@/lib/sampleResumes';

const STORAGE_KEY = 'resume_maker_draft_v3';

interface CompletenessItem {
  id: string;
  label: string;
  completed: boolean;
  weight: number;
}

interface ResumeContextType {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
  activeSection: string;
  setActiveSection: (section: string) => void;
  lastSavedTime: Date | null;
  completeness: {
    score: number;
    items: CompletenessItem[];
  };

  // Section updates
  updatePersonalInfo: (data: Partial<PersonalInfo>) => void;
  updateSummary: (data: Partial<ProfessionalSummary>) => void;
  updateSettings: (settings: Partial<ResumeSettings>) => void;
  toggleSection: (sectionKey: keyof ResumeData['enabledSections']) => void;
  setTemplate: (templateId: TemplateId) => void;

  // Education
  addEducation: () => void;
  updateEducation: (id: string, data: Partial<EducationItem>) => void;
  deleteEducation: (id: string) => void;
  duplicateEducation: (id: string) => void;
  moveEducation: (index: number, direction: 'up' | 'down') => void;

  // Experience
  addExperience: () => void;
  updateExperience: (id: string, data: Partial<ExperienceItem>) => void;
  deleteExperience: (id: string) => void;
  duplicateExperience: (id: string) => void;
  moveExperience: (index: number, direction: 'up' | 'down') => void;

  // Internships
  addInternship: () => void;
  updateInternship: (id: string, data: Partial<InternshipItem>) => void;
  deleteInternship: (id: string) => void;
  duplicateInternship: (id: string) => void;
  moveInternship: (index: number, direction: 'up' | 'down') => void;

  // Skills
  addSkillCategory: (categoryName?: string) => void;
  updateSkillCategory: (id: string, categoryName: string) => void;
  deleteSkillCategory: (id: string) => void;
  addSkillToCategory: (categoryId: string, skill: string) => void;
  removeSkillFromCategory: (categoryId: string, skillIndex: number) => void;
  setSkillsForCategory: (categoryId: string, skills: string[]) => void;

  // Projects
  addProject: () => void;
  updateProject: (id: string, data: Partial<ProjectItem>) => void;
  deleteProject: (id: string) => void;
  duplicateProject: (id: string) => void;
  moveProject: (index: number, direction: 'up' | 'down') => void;

  // Certifications
  addCertification: () => void;
  updateCertification: (id: string, data: Partial<CertificationItem>) => void;
  deleteCertification: (id: string) => void;

  // Achievements
  addAchievement: () => void;
  updateAchievement: (id: string, data: Partial<AchievementItem>) => void;
  deleteAchievement: (id: string) => void;

  // Awards
  addAward: () => void;
  updateAward: (id: string, data: Partial<AwardItem>) => void;
  deleteAward: (id: string) => void;

  // Publications
  addPublication: () => void;
  updatePublication: (id: string, data: Partial<PublicationItem>) => void;
  deletePublication: (id: string) => void;

  // Languages
  addLanguage: () => void;
  updateLanguage: (id: string, data: Partial<LanguageItem>) => void;
  deleteLanguage: (id: string) => void;

  // Interests
  addInterest: (name: string) => void;
  removeInterest: (id: string) => void;

  // Custom Sections
  addCustomSection: (title?: string) => void;
  updateCustomSection: (id: string, title: string) => void;
  deleteCustomSection: (id: string) => void;
  addCustomEntry: (sectionId: string) => void;
  updateCustomEntry: (sectionId: string, entryId: string, data: Partial<CustomSectionEntry>) => void;
  deleteCustomEntry: (sectionId: string, entryId: string) => void;

  // Presets & Import/Export
  loadSampleResume: () => void;
  loadPreset: (type: 'sample' | 'empty') => void;
  exportJson: () => void;
  importJson: (jsonString: string) => boolean;
  resetDraft: () => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // NEW USER ALWAYS STARTS WITH A CLEAN, BLANK RESUME
  const [resumeData, setResumeData] = useState<ResumeData>(EMPTY_RESUME);
  const [activeSection, setActiveSection] = useState<string>('personal');
  const [lastSavedTime, setLastSavedTime] = useState<Date | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Load draft from localStorage on mount & safely purge any legacy personal demo data
  useEffect(() => {
    try {
      localStorage.removeItem('resume_maker_draft_v1');
      localStorage.removeItem('resume_maker_draft_v2');

      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const str = JSON.stringify(parsed).toLowerCase();
        if (str.includes('billakanti') || str.includes('jayavardhan')) {
          localStorage.removeItem(STORAGE_KEY);
          setResumeData(EMPTY_RESUME);
        } else if (parsed && parsed.personalInfo) {
          setResumeData(parsed);
          setLastSavedTime(new Date());
        }
      }
    } catch (e) {
      console.error('Failed to load resume draft from localStorage', e);
      setResumeData(EMPTY_RESUME);
    }
    setIsInitialized(true);
  }, []);

  // Debounced auto-save to localStorage to guarantee zero keystroke lag
  useEffect(() => {
    if (!isInitialized) return;

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(resumeData));
        setLastSavedTime(new Date());
      } catch (e) {
        console.error('Failed to save resume draft to localStorage', e);
      }
    }, 300);

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [resumeData, isInitialized]);

  // Intelligent Completeness Calculation Engine (starts at 0% for blank, calculates accurately from real inputs)
  const completeness = useMemo(() => {
    const hasContact = Boolean(
      resumeData.personalInfo.fullName.trim() &&
      resumeData.personalInfo.professionalTitle.trim() &&
      resumeData.personalInfo.email.trim() &&
      resumeData.personalInfo.phone.trim() &&
      resumeData.personalInfo.location.trim()
    );

    const hasSummary = Boolean(
      resumeData.summary.summaryText && resumeData.summary.summaryText.trim().length >= 15
    );

    const hasEducation = Boolean(
      resumeData.education.length > 0 &&
      resumeData.education.some((e) => e.institution.trim() && e.degree.trim())
    );

    const hasSkills = Boolean(
      resumeData.skills.length > 0 &&
      resumeData.skills.some((c) => c.skills.length > 0)
    );

    // Practical experience or projects (A student with projects/internships achieves complete status)
    const hasWorkOrProjects = Boolean(
      (resumeData.projects.length > 0 && resumeData.projects.some((p) => p.projectName.trim())) ||
      (resumeData.experience.length > 0 && resumeData.experience.some((e) => e.company.trim())) ||
      (resumeData.internships.length > 0 && resumeData.internships.some((i) => i.organization.trim()))
    );

    const hasLinksOrCerts = Boolean(
      resumeData.personalInfo.linkedin?.trim() ||
      resumeData.personalInfo.github?.trim() ||
      resumeData.personalInfo.portfolio?.trim() ||
      resumeData.certifications.length > 0
    );

    const items: CompletenessItem[] = [
      { id: 'personal', label: 'Contact Information', completed: hasContact, weight: 25 },
      { id: 'summary', label: 'Professional Summary', completed: hasSummary, weight: 15 },
      { id: 'education', label: 'Education', completed: hasEducation, weight: 20 },
      { id: 'skills', label: 'Skills & Competencies', completed: hasSkills, weight: 15 },
      { id: 'projects_or_exp', label: 'Projects or Experience', completed: hasWorkOrProjects, weight: 15 },
      { id: 'links_or_certs', label: 'Links / Credentials', completed: hasLinksOrCerts, weight: 10 },
    ];

    const earned = items.reduce((acc, item) => (item.completed ? acc + item.weight : acc), 0);
    return {
      score: earned,
      items,
    };
  }, [resumeData]);

  // Section updates
  const updatePersonalInfo = (data: Partial<PersonalInfo>) => {
    setResumeData((prev) => ({
      ...prev,
      lastModified: new Date().toISOString(),
      personalInfo: { ...prev.personalInfo, ...data },
    }));
  };

  const updateSummary = (data: Partial<ProfessionalSummary>) => {
    setResumeData((prev) => ({
      ...prev,
      lastModified: new Date().toISOString(),
      summary: { ...prev.summary, ...data },
    }));
  };

  const updateSettings = (settings: Partial<ResumeSettings>) => {
    setResumeData((prev) => ({
      ...prev,
      lastModified: new Date().toISOString(),
      settings: { ...prev.settings, ...settings },
    }));
  };

  const setTemplate = (templateId: TemplateId) => {
    setResumeData((prev) => ({
      ...prev,
      lastModified: new Date().toISOString(),
      settings: { ...prev.settings, templateId },
    }));
  };

  const toggleSection = (sectionKey: keyof ResumeData['enabledSections']) => {
    setResumeData((prev) => ({
      ...prev,
      lastModified: new Date().toISOString(),
      enabledSections: {
        ...prev.enabledSections,
        [sectionKey]: !prev.enabledSections[sectionKey],
      },
    }));
  };

  // Education Helpers
  const addEducation = () => {
    const newItem: EducationItem = {
      id: `edu-${Date.now()}`,
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      location: '',
      isCurrent: false,
    };
    setResumeData((prev) => ({
      ...prev,
      education: [...prev.education, newItem],
    }));
  };

  const updateEducation = (id: string, data: Partial<EducationItem>) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.map((item) => (item.id === id ? { ...item, ...data } : item)),
    }));
  };

  const deleteEducation = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((item) => item.id !== id),
    }));
  };

  const duplicateEducation = (id: string) => {
    const item = resumeData.education.find((e) => e.id === id);
    if (!item) return;
    const duplicated: EducationItem = { ...item, id: `edu-${Date.now()}` };
    setResumeData((prev) => ({
      ...prev,
      education: [...prev.education, duplicated],
    }));
  };

  const moveEducation = (index: number, direction: 'up' | 'down') => {
    setResumeData((prev) => {
      const list = [...prev.education];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= list.length) return prev;
      const [moved] = list.splice(index, 1);
      list.splice(targetIndex, 0, moved);
      return { ...prev, education: list };
    });
  };

  // Experience Helpers
  const addExperience = () => {
    const newItem: ExperienceItem = {
      id: `exp-${Date.now()}`,
      jobTitle: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      isCurrent: false,
      description: '',
      bulletPoints: [''],
    };
    setResumeData((prev) => ({
      ...prev,
      experience: [...prev.experience, newItem],
    }));
  };

  const updateExperience = (id: string, data: Partial<ExperienceItem>) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.map((item) => (item.id === id ? { ...item, ...data } : item)),
    }));
  };

  const deleteExperience = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.filter((item) => item.id !== id),
    }));
  };

  const duplicateExperience = (id: string) => {
    const item = resumeData.experience.find((e) => e.id === id);
    if (!item) return;
    const duplicated: ExperienceItem = { ...item, id: `exp-${Date.now()}` };
    setResumeData((prev) => ({
      ...prev,
      experience: [...prev.experience, duplicated],
    }));
  };

  const moveExperience = (index: number, direction: 'up' | 'down') => {
    setResumeData((prev) => {
      const list = [...prev.experience];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= list.length) return prev;
      const [moved] = list.splice(index, 1);
      list.splice(targetIndex, 0, moved);
      return { ...prev, experience: list };
    });
  };

  // Internships Helpers
  const addInternship = () => {
    const newItem: InternshipItem = {
      id: `intern-${Date.now()}`,
      organization: '',
      role: '',
      location: '',
      startDate: '',
      endDate: '',
      isCurrent: false,
      description: '',
      responsibilities: [''],
      technologiesUsed: [],
      displayUnder: 'internships',
    };
    setResumeData((prev) => ({
      ...prev,
      internships: [...prev.internships, newItem],
    }));
  };

  const updateInternship = (id: string, data: Partial<InternshipItem>) => {
    setResumeData((prev) => ({
      ...prev,
      internships: prev.internships.map((item) => (item.id === id ? { ...item, ...data } : item)),
    }));
  };

  const deleteInternship = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      internships: prev.internships.filter((item) => item.id !== id),
    }));
  };

  const duplicateInternship = (id: string) => {
    const item = resumeData.internships.find((e) => e.id === id);
    if (!item) return;
    const duplicated: InternshipItem = { ...item, id: `intern-${Date.now()}` };
    setResumeData((prev) => ({
      ...prev,
      internships: [...prev.internships, duplicated],
    }));
  };

  const moveInternship = (index: number, direction: 'up' | 'down') => {
    setResumeData((prev) => {
      const list = [...prev.internships];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= list.length) return prev;
      const [moved] = list.splice(index, 1);
      list.splice(targetIndex, 0, moved);
      return { ...prev, internships: list };
    });
  };

  // Skills Helpers
  const addSkillCategory = (categoryName = 'Technical Skills') => {
    const newCategory: SkillCategory = {
      id: `skill-cat-${Date.now()}`,
      categoryName,
      skills: [],
    };
    setResumeData((prev) => ({
      ...prev,
      skills: [...prev.skills, newCategory],
    }));
  };

  const updateSkillCategory = (id: string, categoryName: string) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.map((c) => (c.id === id ? { ...c, categoryName } : c)),
    }));
  };

  const deleteSkillCategory = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.filter((c) => c.id !== id),
    }));
  };

  const addSkillToCategory = (categoryId: string, skill: string) => {
    const trimmed = skill.trim();
    if (!trimmed) return;
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.map((c) => {
        if (c.id !== categoryId) return c;
        if (c.skills.includes(trimmed)) return c;
        return { ...c, skills: [...c.skills, trimmed] };
      }),
    }));
  };

  const removeSkillFromCategory = (categoryId: string, skillIndex: number) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.map((c) => {
        if (c.id !== categoryId) return c;
        return { ...c, skills: c.skills.filter((_, i) => i !== skillIndex) };
      }),
    }));
  };

  const setSkillsForCategory = (categoryId: string, skills: string[]) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.map((c) => (c.id === categoryId ? { ...c, skills } : c)),
    }));
  };

  // Projects Helpers
  const addProject = () => {
    const newItem: ProjectItem = {
      id: `proj-${Date.now()}`,
      projectName: '',
      shortDescription: '',
      technologies: [],
      keyContributions: [''],
    };
    setResumeData((prev) => ({
      ...prev,
      projects: [...prev.projects, newItem],
    }));
  };

  const updateProject = (id: string, data: Partial<ProjectItem>) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.map((item) => (item.id === id ? { ...item, ...data } : item)),
    }));
  };

  const deleteProject = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.filter((item) => item.id !== id),
    }));
  };

  const duplicateProject = (id: string) => {
    const item = resumeData.projects.find((p) => p.id === id);
    if (!item) return;
    const duplicated: ProjectItem = { ...item, id: `proj-${Date.now()}` };
    setResumeData((prev) => ({
      ...prev,
      projects: [...prev.projects, duplicated],
    }));
  };

  const moveProject = (index: number, direction: 'up' | 'down') => {
    setResumeData((prev) => {
      const list = [...prev.projects];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= list.length) return prev;
      const [moved] = list.splice(index, 1);
      list.splice(targetIndex, 0, moved);
      return { ...prev, projects: list };
    });
  };

  // Certifications Helpers
  const addCertification = () => {
    const newItem: CertificationItem = {
      id: `cert-${Date.now()}`,
      certificationName: '',
      issuingOrganization: '',
      issueDate: '',
    };
    setResumeData((prev) => ({
      ...prev,
      certifications: [...prev.certifications, newItem],
    }));
  };

  const updateCertification = (id: string, data: Partial<CertificationItem>) => {
    setResumeData((prev) => ({
      ...prev,
      certifications: prev.certifications.map((item) => (item.id === id ? { ...item, ...data } : item)),
    }));
  };

  const deleteCertification = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((item) => item.id !== id),
    }));
  };

  // Achievements Helpers
  const addAchievement = () => {
    const newItem: AchievementItem = {
      id: `ach-${Date.now()}`,
      achievement: '',
      organization: '',
      date: '',
      description: '',
    };
    setResumeData((prev) => ({
      ...prev,
      achievements: [...prev.achievements, newItem],
    }));
  };

  const updateAchievement = (id: string, data: Partial<AchievementItem>) => {
    setResumeData((prev) => ({
      ...prev,
      achievements: prev.achievements.map((item) => (item.id === id ? { ...item, ...data } : item)),
    }));
  };

  const deleteAchievement = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      achievements: prev.achievements.filter((item) => item.id !== id),
    }));
  };

  // Awards Helpers
  const addAward = () => {
    const newItem: AwardItem = {
      id: `award-${Date.now()}`,
      awardName: '',
      organization: '',
      date: '',
      description: '',
    };
    setResumeData((prev) => ({
      ...prev,
      awards: [...prev.awards, newItem],
    }));
  };

  const updateAward = (id: string, data: Partial<AwardItem>) => {
    setResumeData((prev) => ({
      ...prev,
      awards: prev.awards.map((item) => (item.id === id ? { ...item, ...data } : item)),
    }));
  };

  const deleteAward = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      awards: prev.awards.filter((item) => item.id !== id),
    }));
  };

  // Publications Helpers
  const addPublication = () => {
    const newItem: PublicationItem = {
      id: `pub-${Date.now()}`,
      publicationTitle: '',
      authors: '',
      journal: '',
      date: '',
    };
    setResumeData((prev) => ({
      ...prev,
      publications: [...prev.publications, newItem],
    }));
  };

  const updatePublication = (id: string, data: Partial<PublicationItem>) => {
    setResumeData((prev) => ({
      ...prev,
      publications: prev.publications.map((item) => (item.id === id ? { ...item, ...data } : item)),
    }));
  };

  const deletePublication = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      publications: prev.publications.filter((item) => item.id !== id),
    }));
  };

  // Languages Helpers
  const addLanguage = () => {
    const newItem: LanguageItem = {
      id: `lang-${Date.now()}`,
      language: '',
      proficiency: 'Professional',
    };
    setResumeData((prev) => ({
      ...prev,
      languages: [...prev.languages, newItem],
    }));
  };

  const updateLanguage = (id: string, data: Partial<LanguageItem>) => {
    setResumeData((prev) => ({
      ...prev,
      languages: prev.languages.map((item) => (item.id === id ? { ...item, ...data } : item)),
    }));
  };

  const deleteLanguage = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      languages: prev.languages.filter((item) => item.id !== id),
    }));
  };

  // Interests Helpers
  const addInterest = (name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    const newItem: InterestItem = { id: `int-${Date.now()}`, name: trimmed };
    setResumeData((prev) => ({
      ...prev,
      interests: [...prev.interests, newItem],
    }));
  };

  const removeInterest = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      interests: prev.interests.filter((i) => i.id !== id),
    }));
  };

  // Custom Sections Helpers
  const addCustomSection = (sectionTitle = 'Additional Activities') => {
    const newSection: CustomSection = {
      id: `custom-${Date.now()}`,
      sectionTitle,
      entries: [
        {
          id: `entry-${Date.now()}`,
          title: '',
          subtitle: '',
          date: '',
          bulletPoints: [''],
        },
      ],
    };
    setResumeData((prev) => ({
      ...prev,
      customSections: [...prev.customSections, newSection],
    }));
  };

  const updateCustomSection = (id: string, sectionTitle: string) => {
    setResumeData((prev) => ({
      ...prev,
      customSections: prev.customSections.map((s) => (s.id === id ? { ...s, sectionTitle } : s)),
    }));
  };

  const deleteCustomSection = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      customSections: prev.customSections.filter((s) => s.id !== id),
    }));
  };

  const addCustomEntry = (sectionId: string) => {
    const newEntry: CustomSectionEntry = {
      id: `entry-${Date.now()}`,
      title: '',
      subtitle: '',
      date: '',
      bulletPoints: [''],
    };
    setResumeData((prev) => ({
      ...prev,
      customSections: prev.customSections.map((s) => {
        if (s.id !== sectionId) return s;
        return { ...s, entries: [...s.entries, newEntry] };
      }),
    }));
  };

  const updateCustomEntry = (sectionId: string, entryId: string, data: Partial<CustomSectionEntry>) => {
    setResumeData((prev) => ({
      ...prev,
      customSections: prev.customSections.map((s) => {
        if (s.id !== sectionId) return s;
        return {
          ...s,
          entries: s.entries.map((e) => (e.id === entryId ? { ...e, ...data } : e)),
        };
      }),
    }));
  };

  const deleteCustomEntry = (sectionId: string, entryId: string) => {
    setResumeData((prev) => ({
      ...prev,
      customSections: prev.customSections.map((s) => {
        if (s.id !== sectionId) return s;
        return { ...s, entries: s.entries.filter((e) => e.id !== entryId) };
      }),
    }));
  };

  // Explicit Fictional Sample Loader (Police Manoj)
  const loadSampleResume = () => {
    setResumeData({
      ...FICTIONAL_SAMPLE_RESUME,
      lastModified: new Date().toISOString(),
    });
  };

  const loadPreset = (type: 'sample' | 'empty') => {
    if (type === 'sample') {
      loadSampleResume();
    } else {
      resetDraft();
    }
  };

  const exportJson = () => {
    const filename = resumeData.personalInfo.fullName.trim()
      ? `${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_resume_data.json`
      : 'resume_data.json';
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(resumeData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', filename);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const importJson = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed && typeof parsed === 'object' && parsed.personalInfo) {
        setResumeData(parsed);
        return true;
      }
      return false;
    } catch (e) {
      console.error('Invalid JSON import', e);
      return false;
    }
  };

  const resetDraft = () => {
    setResumeData(EMPTY_RESUME);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      // ignore
    }
  };

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        setResumeData,
        activeSection,
        setActiveSection,
        lastSavedTime,
        completeness,
        updatePersonalInfo,
        updateSummary,
        updateSettings,
        toggleSection,
        setTemplate,
        addEducation,
        updateEducation,
        deleteEducation,
        duplicateEducation,
        moveEducation,
        addExperience,
        updateExperience,
        deleteExperience,
        duplicateExperience,
        moveExperience,
        addInternship,
        updateInternship,
        deleteInternship,
        duplicateInternship,
        moveInternship,
        addSkillCategory,
        updateSkillCategory,
        deleteSkillCategory,
        addSkillToCategory,
        removeSkillFromCategory,
        setSkillsForCategory,
        addProject,
        updateProject,
        deleteProject,
        duplicateProject,
        moveProject,
        addCertification,
        updateCertification,
        deleteCertification,
        addAchievement,
        updateAchievement,
        deleteAchievement,
        addAward,
        updateAward,
        deleteAward,
        addPublication,
        updatePublication,
        deletePublication,
        addLanguage,
        updateLanguage,
        deleteLanguage,
        addInterest,
        removeInterest,
        addCustomSection,
        updateCustomSection,
        deleteCustomSection,
        addCustomEntry,
        updateCustomEntry,
        deleteCustomEntry,
        loadSampleResume,
        loadPreset,
        exportJson,
        importJson,
        resetDraft,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = (): ResumeContextType => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};
