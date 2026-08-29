'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useResume } from '@/context/ResumeContext';
import { TEMPLATES } from '@/lib/sampleResumes';
import { TemplateId } from '@/types/resume';
import {
  User,
  FileText,
  Briefcase,
  Award,
  GraduationCap,
  Code,
  FolderGit2,
  Layers,
  Settings,
  Eye,
  CheckCircle2,
  RotateCcw,
  Upload,
  FileDown,
  Sparkles,
  ChevronRight,
  Info,
} from 'lucide-react';

// Form Section Components
import { PersonalInfoSection } from '@/components/builder/PersonalInfoSection';
import { SummarySection } from '@/components/builder/SummarySection';
import { ExperienceSection } from '@/components/builder/ExperienceSection';
import { InternshipsSection } from '@/components/builder/InternshipsSection';
import { EducationSection } from '@/components/builder/EducationSection';
import { SkillsSection } from '@/components/builder/SkillsSection';
import { ProjectsSection } from '@/components/builder/ProjectsSection';
import { AdditionalSections } from '@/components/builder/AdditionalSections';
import { SettingsDrawer } from '@/components/builder/SettingsDrawer';
import { CompletenessCard } from '@/components/builder/CompletenessCard';
import { A4ResumePreview } from '@/components/preview/A4ResumePreview';

const SECTION_NAV = [
  { id: 'personal', label: 'Personal Info', icon: User },
  { id: 'summary', label: 'Summary', icon: FileText },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'skills', label: 'Skills', icon: Code },
  { id: 'projects', label: 'Projects', icon: FolderGit2 },
  { id: 'internships', label: 'Internships', icon: Award },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'additional', label: 'Certifications & More', icon: Layers },
  { id: 'settings', label: 'Design & Settings', icon: Settings },
];

export default function BuilderPage() {
  const {
    resumeData,
    activeSection,
    setActiveSection,
    setTemplate,
    loadSampleResume,
    exportJson,
    importJson,
    resetDraft,
  } = useResume();

  const [mobileTab, setMobileTab] = useState<'editor' | 'preview'>('editor');
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [jsonImportError, setJsonImportError] = useState<string | null>(null);

  const isSampleLoaded = resumeData.personalInfo.fullName === 'Police Manoj';

  const handleJsonUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = importJson(content);
      if (!success) {
        setJsonImportError('Invalid JSON format. Please upload a valid ResumeMaker export file.');
      } else {
        setJsonImportError(null);
      }
    };
    reader.readAsText(file);
  };

  const renderActiveFormSection = () => {
    switch (activeSection) {
      case 'personal':
        return <PersonalInfoSection />;
      case 'summary':
        return <SummarySection />;
      case 'education':
        return <EducationSection />;
      case 'skills':
        return <SkillsSection />;
      case 'projects':
        return <ProjectsSection />;
      case 'internships':
        return <InternshipsSection />;
      case 'experience':
        return <ExperienceSection />;
      case 'additional':
        return <AdditionalSections />;
      case 'settings':
        return <SettingsDrawer />;
      default:
        return <PersonalInfoSection />;
    }
  };

  return (
    <div className="flex flex-col flex-1 bg-surface min-h-[calc(100vh-4rem)]">
      {/* 1. Builder Workspace Toolbar (Contained inside builder flow - NOT globally fixed) */}
      <div className="bg-white border-b border-border relative z-10 shadow-2xs">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5">
            {/* Left: Document Title & Template Switcher */}
            <div className="flex flex-wrap items-center gap-2">
              <input
                type="text"
                value={resumeData.title}
                onChange={() => {}}
                className="font-bold text-xs sm:text-sm text-primary-text bg-transparent hover:bg-surface px-2 py-1 rounded border border-transparent hover:border-border focus:border-primary focus:bg-white focus:outline-none max-w-[180px] sm:max-w-[220px] truncate"
                placeholder="Untitled Resume"
              />

              {/* Template Selector Dropdown */}
              <div className="flex items-center gap-1 text-xs bg-surface border border-border rounded-lg px-2 py-1">
                <span className="text-secondary-text font-medium hidden sm:inline text-[11px]">Template:</span>
                <select
                  value={resumeData.settings.templateId}
                  onChange={(e) => setTemplate(e.target.value as TemplateId)}
                  className="bg-transparent font-bold text-primary-text focus:outline-none cursor-pointer text-xs"
                >
                  {TEMPLATES.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Auto-save Status */}
              <div className="hidden xl:flex items-center gap-1 text-[11px] text-muted-text">
                <CheckCircle2 className="w-3.5 h-3.5 text-success" />
                <span>Saved locally</span>
              </div>
            </div>

            {/* Right: Actions & Tools */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              {/* Load Sample Resume Button (Police Manoj) */}
              <button
                type="button"
                onClick={loadSampleResume}
                title="Load generic fictional demonstration resume"
                className="px-2.5 sm:px-3 py-1.5 text-xs font-semibold text-primary bg-primary-light hover:bg-blue-100 border border-primary/20 rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs"
              >
                <Sparkles className="w-3.5 h-3.5 shrink-0" />
                <span>Load Sample Resume</span>
              </button>

              {/* Start New Resume */}
              <button
                type="button"
                onClick={() => setIsResetConfirmOpen(true)}
                title="Clear form and start a blank resume"
                className="px-2.5 py-1.5 text-xs font-semibold text-secondary-text hover:text-error bg-surface hover:bg-red-50 border border-border rounded-lg transition-colors flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden sm:inline">Start New</span>
              </button>

              {/* Export JSON */}
              <button
                type="button"
                onClick={exportJson}
                title="Backup resume data to JSON file"
                className="p-1.5 text-secondary-text hover:text-primary-text bg-surface hover:bg-slate-100 border border-border rounded-lg"
              >
                <FileDown className="w-4 h-4" />
              </button>

              {/* Import JSON */}
              <label
                title="Import JSON backup"
                className="p-1.5 text-secondary-text hover:text-primary-text bg-surface hover:bg-slate-100 border border-border rounded-lg cursor-pointer"
              >
                <Upload className="w-4 h-4" />
                <input type="file" accept=".json" onChange={handleJsonUpload} className="hidden" />
              </label>

              {/* Full Preview Page Link */}
              <Link
                href="/preview"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-secondary-text hover:text-primary-text bg-white border border-border rounded-lg hover:bg-surface shadow-2xs"
              >
                <Eye className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden sm:inline">Full Preview</span>
              </Link>
            </div>
          </div>

          {/* Mobile Tab Toggle */}
          <div className="flex lg:hidden mt-2 pt-2 border-t border-border">
            <div className="grid grid-cols-2 gap-1 w-full bg-slate-100 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setMobileTab('editor')}
                className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
                  mobileTab === 'editor' ? 'bg-white text-primary shadow-xs' : 'text-secondary-text'
                }`}
              >
                Edit Form
              </button>
              <button
                type="button"
                onClick={() => setMobileTab('preview')}
                className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
                  mobileTab === 'preview' ? 'bg-white text-primary shadow-xs' : 'text-secondary-text'
                }`}
              >
                Live A4 Preview
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Demonstration Sample Notice Banner (if active) */}
      {isSampleLoaded && (
        <div className="bg-blue-50/90 border-b border-blue-200 px-4 py-2 text-xs text-blue-900">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Info className="w-4 h-4 text-primary shrink-0" />
              <span>
                <strong>Sample resume loaded (Police Manoj)</strong> — replace the demo information with your own or click <strong>&quot;Start New&quot;</strong> to start blank.
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsResetConfirmOpen(true)}
              className="text-[11px] font-bold underline hover:text-blue-700 shrink-0"
            >
              Clear Demo Data
            </button>
          </div>
        </div>
      )}

      {/* 3. JSON Import Error Alert */}
      {jsonImportError && (
        <div className="max-w-7xl mx-auto px-4 mt-3 w-full">
          <div className="p-3 bg-red-50 text-error border border-red-200 rounded-xl text-xs flex justify-between items-center">
            <span>{jsonImportError}</span>
            <button type="button" onClick={() => setJsonImportError(null)} className="font-bold">
              ✕
            </button>
          </div>
        </div>
      )}

      {/* 4. Main Workspace Layout (Desktop 3-Region, Generous Bottom Padding) */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5 pb-16 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Region 1: Left Navigation & Completeness (Desktop ~270px) */}
          <div className={`lg:col-span-3 space-y-4 ${mobileTab === 'preview' ? 'hidden lg:block' : 'block'}`}>
            <CompletenessCard />

            {/* Section Navigation Pills */}
            <div className="bg-white rounded-xl border border-border p-2 shadow-subtle space-y-0.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-text px-3 py-1.5 block">
                Resume Sections
              </span>
              {SECTION_NAV.map((sec) => {
                const Icon = sec.icon;
                const isActive = activeSection === sec.id;
                return (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => setActiveSection(sec.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-primary text-white shadow-xs'
                        : 'text-secondary-text hover:text-primary-text hover:bg-surface'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-secondary-text'}`} />
                      <span>{sec.label}</span>
                    </div>
                    {isActive && <ChevronRight className="w-3.5 h-3.5 text-white/80" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Region 2: Center Editor Form (Desktop ~560px) */}
          <div className={`lg:col-span-5 ${mobileTab === 'preview' ? 'hidden lg:block' : 'block'}`}>
            {renderActiveFormSection()}

            {/* Bottom Section Navigator Buttons */}
            <div className="flex justify-between items-center mt-4 pt-2">
              <button
                type="button"
                onClick={() => {
                  const currIdx = SECTION_NAV.findIndex((s) => s.id === activeSection);
                  if (currIdx > 0) setActiveSection(SECTION_NAV[currIdx - 1].id);
                }}
                disabled={activeSection === SECTION_NAV[0].id}
                className="px-3.5 py-2 text-xs font-semibold text-secondary-text hover:text-primary-text bg-white border border-border rounded-lg disabled:opacity-40 transition-colors"
              >
                ← Previous Section
              </button>
              <button
                type="button"
                onClick={() => {
                  const currIdx = SECTION_NAV.findIndex((s) => s.id === activeSection);
                  if (currIdx < SECTION_NAV.length - 1) setActiveSection(SECTION_NAV[currIdx + 1].id);
                }}
                disabled={activeSection === SECTION_NAV[SECTION_NAV.length - 1].id}
                className="px-3.5 py-2 text-xs font-semibold text-white bg-primary hover:bg-primary-hover rounded-lg shadow-xs disabled:opacity-40 transition-colors"
              >
                Next Section →
              </button>
            </div>
          </div>

          {/* Region 3: Right Live A4 Preview (Desktop ~550px, Self-Contained) */}
          <div className={`lg:col-span-4 ${mobileTab === 'editor' ? 'hidden lg:block' : 'block'}`}>
            <div className="h-[calc(100vh-9rem)] min-h-[520px] max-h-[850px] sticky top-20">
              <A4ResumePreview />
            </div>
          </div>
        </div>
      </div>

      {/* Start New Resume Confirmation Modal */}
      {isResetConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl border border-border p-6 max-w-sm w-full shadow-2xl space-y-4">
            <h3 className="font-bold text-base text-primary-text">Start a new resume?</h3>
            <p className="text-xs text-secondary-text leading-relaxed">
              Your current resume will be cleared from this editor.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsResetConfirmOpen(false)}
                className="px-3.5 py-2 text-xs font-semibold text-secondary-text border border-border rounded-lg hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  resetDraft();
                  setIsResetConfirmOpen(false);
                }}
                className="px-3.5 py-2 text-xs font-semibold text-white bg-error hover:bg-red-700 rounded-lg shadow-xs transition-colors"
              >
                Start New Resume
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
