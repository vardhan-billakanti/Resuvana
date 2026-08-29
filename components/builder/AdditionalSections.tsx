'use client';

import React, { useState } from 'react';
import { useResume } from '@/context/ResumeContext';
import {
  ShieldCheck,
  Trophy,
  Award as AwardIcon,
  BookOpen,
  Languages,
  Heart,
  Plus,
  Trash2,
  Layers,
  ChevronDown,
  ChevronUp,
  X,
} from 'lucide-react';
import { LanguageProficiency } from '@/types/resume';

export const AdditionalSections: React.FC = () => {
  const {
    resumeData,
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
  } = useResume();

  const [interestInput, setInterestInput] = useState('');
  const [activeTab, setActiveTab] = useState<'certs' | 'achieve' | 'lang' | 'custom'>('certs');

  const handleAddInterest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!interestInput.trim()) return;
    addInterest(interestInput.trim());
    setInterestInput('');
  };

  return (
    <div className="bg-white rounded-xl border border-border p-5 sm:p-6 shadow-subtle">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-border mb-5 gap-3">
        <div>
          <h2 className="text-lg font-bold text-primary-text flex items-center gap-2">
            <Layers className="w-5 h-5 text-primary" />
            Certifications & Additional Sections
          </h2>
          <p className="text-xs text-secondary-text mt-0.5">
            Add credentials, awards, languages, interests, or custom sections to enhance your profile.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-1 p-1 bg-surface rounded-lg border border-border mb-5">
        <button
          type="button"
          onClick={() => setActiveTab('certs')}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
            activeTab === 'certs' ? 'bg-white text-primary shadow-2xs' : 'text-secondary-text hover:text-primary-text'
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          Certifications ({resumeData.certifications.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('achieve')}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
            activeTab === 'achieve' ? 'bg-white text-primary shadow-2xs' : 'text-secondary-text hover:text-primary-text'
          }`}
        >
          <Trophy className="w-3.5 h-3.5" />
          Achievements & Awards ({resumeData.achievements.length + resumeData.awards.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('lang')}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
            activeTab === 'lang' ? 'bg-white text-primary shadow-2xs' : 'text-secondary-text hover:text-primary-text'
          }`}
        >
          <Languages className="w-3.5 h-3.5" />
          Languages & Interests
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('custom')}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
            activeTab === 'custom' ? 'bg-white text-primary shadow-2xs' : 'text-secondary-text hover:text-primary-text'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          Custom Sections ({resumeData.customSections.length})
        </button>
      </div>

      {/* Tab 1: Certifications */}
      {activeTab === 'certs' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-primary-text">Industry Certifications & Credentials</span>
            <button
              type="button"
              onClick={addCertification}
              className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-hover"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Certification
            </button>
          </div>

          {resumeData.certifications.length === 0 ? (
            <p className="text-xs text-muted-text italic py-4 text-center border border-dashed border-border rounded-lg">
              No certifications added. (e.g. AWS Certified, Cisco, CompTIA, Google Cloud)
            </p>
          ) : (
            resumeData.certifications.map((cert) => (
              <div key={cert.id} className="p-3.5 rounded-lg border border-border bg-surface space-y-3">
                <div className="flex justify-between items-start">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1 mr-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-primary-text mb-0.5">
                        Certification Name
                      </label>
                      <input
                        type="text"
                        value={cert.certificationName}
                        onChange={(e) => updateCertification(cert.id, { certificationName: e.target.value })}
                        placeholder="e.g. Introduction to Cybersecurity"
                        className="w-full px-2.5 py-1.5 text-xs border border-border rounded bg-white text-primary-text"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-primary-text mb-0.5">
                        Issuing Organization
                      </label>
                      <input
                        type="text"
                        value={cert.issuingOrganization}
                        onChange={(e) => updateCertification(cert.id, { issuingOrganization: e.target.value })}
                        placeholder="e.g. Cisco Networking Academy"
                        className="w-full px-2.5 py-1.5 text-xs border border-border rounded bg-white text-primary-text"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-primary-text mb-0.5">
                        Issue Date (Year/Month)
                      </label>
                      <input
                        type="text"
                        value={cert.issueDate}
                        onChange={(e) => updateCertification(cert.id, { issueDate: e.target.value })}
                        placeholder="e.g. Jan 2024"
                        className="w-full px-2.5 py-1.5 text-xs border border-border rounded bg-white text-primary-text"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-primary-text mb-0.5">
                        Credential ID / Link (Optional)
                      </label>
                      <input
                        type="text"
                        value={cert.credentialId || ''}
                        onChange={(e) => updateCertification(cert.id, { credentialId: e.target.value })}
                        placeholder="e.g. CISCO-SEC-98421"
                        className="w-full px-2.5 py-1.5 text-xs border border-border rounded bg-white text-primary-text"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => deleteCertification(cert.id)}
                    className="p-1.5 text-muted-text hover:text-error rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 2: Achievements & Awards */}
      {activeTab === 'achieve' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-primary-text">Competitions, Hackathons & Honors</span>
            <button
              type="button"
              onClick={addAchievement}
              className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-hover"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Achievement
            </button>
          </div>

          {resumeData.achievements.length === 0 ? (
            <p className="text-xs text-muted-text italic py-4 text-center border border-dashed border-border rounded-lg">
              No achievements added. (e.g. Hackathon Finalist, Merit Scholarship, Coding Rank)
            </p>
          ) : (
            resumeData.achievements.map((ach) => (
              <div key={ach.id} className="p-3.5 rounded-lg border border-border bg-surface space-y-3">
                <div className="flex justify-between items-start">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1 mr-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-primary-text mb-0.5">
                        Achievement Title
                      </label>
                      <input
                        type="text"
                        value={ach.achievement}
                        onChange={(e) => updateAchievement(ach.id, { achievement: e.target.value })}
                        placeholder="e.g. Top 10 Finalist — National Cyber CTF"
                        className="w-full px-2.5 py-1.5 text-xs border border-border rounded bg-white text-primary-text"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-primary-text mb-0.5">
                        Organization / Event
                      </label>
                      <input
                        type="text"
                        value={ach.organization}
                        onChange={(e) => updateAchievement(ach.id, { organization: e.target.value })}
                        placeholder="e.g. National Cyber Security Federation"
                        className="w-full px-2.5 py-1.5 text-xs border border-border rounded bg-white text-primary-text"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-semibold text-primary-text mb-0.5">
                        Description & Details
                      </label>
                      <input
                        type="text"
                        value={ach.description}
                        onChange={(e) => updateAchievement(ach.id, { description: e.target.value })}
                        placeholder="e.g. Solved 18 cryptography and forensic challenges among 400+ collegiate teams."
                        className="w-full px-2.5 py-1.5 text-xs border border-border rounded bg-white text-primary-text"
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => deleteAchievement(ach.id)}
                    className="p-1.5 text-muted-text hover:text-error rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 3: Languages & Interests */}
      {activeTab === 'lang' && (
        <div className="space-y-6">
          {/* Languages */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-bold text-primary-text">Languages Spoken</span>
              <button
                type="button"
                onClick={addLanguage}
                className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-hover"
              >
                <Plus className="w-3.5 h-3.5" />
                Add Language
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {resumeData.languages.map((l) => (
                <div key={l.id} className="flex items-center gap-2 p-2 rounded-lg border border-border bg-surface">
                  <input
                    type="text"
                    value={l.language}
                    onChange={(e) => updateLanguage(l.id, { language: e.target.value })}
                    placeholder="e.g. English"
                    className="flex-1 px-2 py-1 text-xs border border-border rounded bg-white text-primary-text"
                  />
                  <select
                    value={l.proficiency}
                    onChange={(e) => updateLanguage(l.id, { proficiency: e.target.value as LanguageProficiency })}
                    className="px-2 py-1 text-xs border border-border rounded bg-white text-primary-text"
                  >
                    <option value="Native">Native</option>
                    <option value="Fluent">Fluent</option>
                    <option value="Professional">Professional</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Basic">Basic</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => deleteLanguage(l.id)}
                    className="p-1 text-muted-text hover:text-error"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Interests */}
          <div className="pt-4 border-t border-border">
            <label className="block text-xs font-bold text-primary-text mb-1.5">
              Personal & Professional Interests
            </label>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {resumeData.interests.map((item) => (
                <span
                  key={item.id}
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-xs bg-slate-100 text-slate-800 rounded-md border border-slate-200"
                >
                  {item.name}
                  <button
                    type="button"
                    onClick={() => removeInterest(item.id)}
                    className="text-slate-400 hover:text-error"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>

            <form onSubmit={handleAddInterest} className="flex gap-2">
              <input
                type="text"
                value={interestInput}
                onChange={(e) => setInterestInput(e.target.value)}
                placeholder="e.g. Open-source development, Cybersecurity research, Chess"
                className="flex-1 px-3 py-1.5 text-xs border border-border rounded-lg bg-surface text-primary-text"
              />
              <button
                type="submit"
                className="px-3 py-1.5 text-xs font-semibold text-primary bg-primary-light hover:bg-blue-100 rounded-lg border border-primary/20"
              >
                Add Interest
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Tab 4: Custom Sections */}
      {activeTab === 'custom' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-primary-text">Custom Tailored Sections</span>
            <button
              type="button"
              onClick={() => addCustomSection('Volunteer & Leadership')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-hover"
            >
              <Plus className="w-3.5 h-3.5" />
              Create Custom Section
            </button>
          </div>

          {resumeData.customSections.length === 0 ? (
            <p className="text-xs text-muted-text italic py-4 text-center border border-dashed border-border rounded-lg">
              No custom sections created. Add custom sections like Volunteer Work, Leadership, Conferences, or Extracurriculars.
            </p>
          ) : (
            resumeData.customSections.map((sec) => (
              <div key={sec.id} className="p-4 rounded-xl border border-border bg-surface space-y-3">
                <div className="flex justify-between items-center">
                  <input
                    type="text"
                    value={sec.sectionTitle}
                    onChange={(e) => updateCustomSection(sec.id, e.target.value)}
                    placeholder="Section Title (e.g. Volunteer Experience)"
                    className="font-bold text-sm text-primary-text bg-white px-2 py-1 rounded border border-border"
                  />
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => addCustomEntry(sec.id)}
                      className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" /> Add Entry
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteCustomSection(sec.id)}
                      className="p-1 text-muted-text hover:text-error rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  {sec.entries.map((entry) => (
                    <div key={entry.id} className="p-3 bg-white rounded-lg border border-border space-y-2">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={entry.title}
                          onChange={(e) => updateCustomEntry(sec.id, entry.id, { title: e.target.value })}
                          placeholder="Title / Role (e.g. Campus Lead)"
                          className="px-2 py-1 text-xs border border-border rounded text-primary-text"
                        />
                        <input
                          type="text"
                          value={entry.date || ''}
                          onChange={(e) => updateCustomEntry(sec.id, entry.id, { date: e.target.value })}
                          placeholder="Timeline (e.g. 2023 – 2024)"
                          className="px-2 py-1 text-xs border border-border rounded text-primary-text"
                        />
                        <input
                          type="text"
                          value={entry.subtitle || ''}
                          onChange={(e) => updateCustomEntry(sec.id, entry.id, { subtitle: e.target.value })}
                          placeholder="Organization / Subtitle (e.g. Google Developer Student Clubs)"
                          className="sm:col-span-2 px-2 py-1 text-xs border border-border rounded text-primary-text"
                        />
                        <textarea
                          rows={2}
                          value={entry.description || ''}
                          onChange={(e) => updateCustomEntry(sec.id, entry.id, { description: e.target.value })}
                          placeholder="Brief description of responsibilities and achievements..."
                          className="sm:col-span-2 px-2 py-1 text-xs border border-border rounded text-primary-text"
                        />
                      </div>
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={() => deleteCustomEntry(sec.id, entry.id)}
                          className="text-[11px] text-error hover:underline"
                        >
                          Remove entry
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
