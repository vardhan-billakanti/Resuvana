'use client';

import React, { useState } from 'react';
import { useResume } from '@/context/ResumeContext';
import { Briefcase, Plus, Trash2, Copy, ArrowUp, ArrowDown, Sparkles, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';
import { AIAssistant } from '@/lib/aiAssistant';

export const ExperienceSection: React.FC = () => {
  const { resumeData, addExperience, updateExperience, deleteExperience, duplicateExperience, moveExperience } = useResume();
  const experiences = resumeData.experience;

  const [expandedId, setExpandedId] = useState<string | null>(experiences[0]?.id || null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // AI Bullet Assistant state
  const [aiBulletModal, setAiBulletModal] = useState<{
    isOpen: boolean;
    expId: string;
    bulletIndex: number;
    originalText: string;
    suggestions: string[];
  }>({
    isOpen: false,
    expId: '',
    bulletIndex: 0,
    originalText: '',
    suggestions: [],
  });

  const handleOpenAiBullet = (expId: string, bulletIndex: number, text: string) => {
    const suggestions = AIAssistant.improveBullet(text || 'Built key features and improved performance');
    setAiBulletModal({
      isOpen: true,
      expId,
      bulletIndex,
      originalText: text,
      suggestions,
    });
  };

  const handleApplyAiBullet = (newBullet: string) => {
    const exp = experiences.find((e) => e.id === aiBulletModal.expId);
    if (!exp) return;
    const updatedBullets = [...exp.bulletPoints];
    updatedBullets[aiBulletModal.bulletIndex] = newBullet;
    updateExperience(aiBulletModal.expId, { bulletPoints: updatedBullets });
    setAiBulletModal((prev) => ({ ...prev, isOpen: false }));
  };

  const handleAddBullet = (expId: string) => {
    const exp = experiences.find((e) => e.id === expId);
    if (!exp) return;
    updateExperience(expId, { bulletPoints: [...exp.bulletPoints, ''] });
  };

  const handleUpdateBullet = (expId: string, index: number, value: string) => {
    const exp = experiences.find((e) => e.id === expId);
    if (!exp) return;
    const updated = [...exp.bulletPoints];
    updated[index] = value;
    updateExperience(expId, { bulletPoints: updated });
  };

  const handleRemoveBullet = (expId: string, index: number) => {
    const exp = experiences.find((e) => e.id === expId);
    if (!exp) return;
    const updated = exp.bulletPoints.filter((_, i) => i !== index);
    updateExperience(expId, { bulletPoints: updated });
  };

  return (
    <div className="bg-white rounded-xl border border-border p-5 sm:p-6 shadow-subtle">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-border mb-5 gap-3">
        <div>
          <h2 className="text-lg font-bold text-primary-text flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-primary" />
            Work Experience
          </h2>
          <p className="text-xs text-secondary-text mt-0.5">
            Highlight your career achievements, technical responsibilities, and leadership roles.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            addExperience();
            setTimeout(() => {
              const latest = experiences[experiences.length - 1];
              if (latest) setExpandedId(latest.id);
            }, 50);
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-primary hover:bg-primary-hover rounded-lg shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Experience
        </button>
      </div>

      {experiences.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-border rounded-xl bg-surface/50">
          <Briefcase className="w-8 h-8 text-muted-text mx-auto mb-2" />
          <p className="text-sm font-medium text-primary-text">No work experience added yet</p>
          <p className="text-xs text-secondary-text max-w-sm mx-auto mt-1 mb-4">
            If you are a student or fresh graduate, you can focus on Internships and Projects below.
          </p>
          <button
            type="button"
            onClick={addExperience}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-primary bg-primary-light hover:bg-blue-100 rounded-lg transition-colors border border-primary/20"
          >
            <Plus className="w-4 h-4" />
            Add First Experience
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {experiences.map((exp, index) => {
            const isExpanded = expandedId === exp.id;
            return (
              <div
                key={exp.id}
                className="border border-border rounded-xl bg-surface overflow-hidden transition-all"
              >
                {/* Header Row */}
                <div
                  className="flex items-center justify-between p-3.5 sm:p-4 bg-white border-b border-border/80 cursor-pointer select-none hover:bg-slate-50 transition-colors"
                  onClick={() => setExpandedId(isExpanded ? null : exp.id)}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 flex items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-700">
                      {index + 1}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-primary-text">
                        {exp.jobTitle || 'Untitled Position'}
                      </h4>
                      <p className="text-xs text-secondary-text">
                        {exp.company || 'Company Name'} • {exp.startDate || 'Start'} – {exp.isCurrent ? 'Present' : exp.endDate || 'End'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      onClick={() => moveExperience(index, 'up')}
                      disabled={index === 0}
                      title="Move Up"
                      className="p-1 text-secondary-text hover:text-primary-text disabled:opacity-30 rounded hover:bg-slate-100"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveExperience(index, 'down')}
                      disabled={index === experiences.length - 1}
                      title="Move Down"
                      className="p-1 text-secondary-text hover:text-primary-text disabled:opacity-30 rounded hover:bg-slate-100"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => duplicateExperience(exp.id)}
                      title="Duplicate"
                      className="p-1 text-secondary-text hover:text-primary-text rounded hover:bg-slate-100"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteConfirmId(exp.id)}
                      title="Delete"
                      className="p-1 text-error hover:bg-red-50 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setExpandedId(isExpanded ? null : exp.id)}
                      className="p-1 text-secondary-text hover:text-primary-text"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Expanded Form */}
                {isExpanded && (
                  <div className="p-4 sm:p-5 space-y-4 bg-white animate-fadeIn">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-primary-text mb-1">
                          Job Title <span className="text-error">*</span>
                        </label>
                        <input
                          type="text"
                          value={exp.jobTitle}
                          onChange={(e) => updateExperience(exp.id, { jobTitle: e.target.value })}
                          placeholder="e.g. Senior Software Engineer"
                          className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-surface focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-primary-text"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-primary-text mb-1">
                          Company / Organization <span className="text-error">*</span>
                        </label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                          placeholder="e.g. Acme Corp"
                          className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-surface focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-primary-text"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-primary-text mb-1">
                          Location
                        </label>
                        <input
                          type="text"
                          value={exp.location}
                          onChange={(e) => updateExperience(exp.id, { location: e.target.value })}
                          placeholder="e.g. San Francisco, CA or Remote"
                          className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-surface focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-primary-text"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-primary-text mb-1">
                          Start Date & End Date
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={exp.startDate}
                            onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                            placeholder="e.g. Mar 2021"
                            className="w-1/2 px-3 py-2 text-sm border border-border rounded-lg bg-surface focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-primary-text"
                          />
                          <span className="text-secondary-text text-xs">–</span>
                          <input
                            type="text"
                            value={exp.isCurrent ? 'Present' : exp.endDate}
                            onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                            disabled={exp.isCurrent}
                            placeholder="e.g. Present"
                            className="w-1/2 px-3 py-2 text-sm border border-border rounded-lg bg-surface focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-primary-text disabled:bg-slate-100 disabled:text-muted-text"
                          />
                        </div>
                        <div className="flex items-center gap-2 mt-1.5">
                          <input
                            type="checkbox"
                            id={`current-${exp.id}`}
                            checked={exp.isCurrent}
                            onChange={(e) => updateExperience(exp.id, { isCurrent: e.target.checked, endDate: e.target.checked ? 'Present' : '' })}
                            className="w-3.5 h-3.5 text-primary rounded border-border focus:ring-primary"
                          />
                          <label htmlFor={`current-${exp.id}`} className="text-xs text-secondary-text cursor-pointer select-none">
                            I currently work here
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Bullet Points */}
                    <div className="pt-2">
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-xs font-semibold text-primary-text">
                          Key Achievements & Responsibilities (Action + Task + Result)
                        </label>
                        <button
                          type="button"
                          onClick={() => handleAddBullet(exp.id)}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-hover"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          Add Bullet
                        </button>
                      </div>

                      <div className="space-y-2">
                        {exp.bulletPoints.map((bullet, bIdx) => (
                          <div key={bIdx} className="flex items-start gap-2">
                            <span className="text-secondary-text text-sm mt-2">•</span>
                            <div className="flex-1 relative">
                              <input
                                type="text"
                                value={bullet}
                                onChange={(e) => handleUpdateBullet(exp.id, bIdx, e.target.value)}
                                placeholder="e.g. Architected microservices with Go and AWS EKS, cutting p99 latency from 450ms to 85ms."
                                className="w-full pl-3 pr-20 py-2 text-sm border border-border rounded-lg bg-surface focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-primary-text"
                              />
                              <button
                                type="button"
                                onClick={() => handleOpenAiBullet(exp.id, bIdx, bullet)}
                                className="absolute right-1.5 top-1.5 inline-flex items-center gap-1 px-2 py-1 text-[11px] font-semibold text-primary bg-primary-light hover:bg-blue-100 rounded-md transition-colors border border-primary/20"
                                title="Enhance bullet with AI action verbs and STAR metrics"
                              >
                                <Sparkles className="w-3 h-3" />
                                AI Fix
                              </button>
                            </div>
                            {exp.bulletPoints.length > 1 && (
                              <button
                                type="button"
                                onClick={() => handleRemoveBullet(exp.id, bIdx)}
                                className="p-2 text-muted-text hover:text-error rounded-md"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Key Award/Achievement text */}
                    <div>
                      <label className="block text-xs font-semibold text-primary-text mb-1">
                        Notable Recognition / Key Achievement <span className="text-muted-text font-normal">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        value={exp.achievements || ''}
                        onChange={(e) => updateExperience(exp.id, { achievements: e.target.value })}
                        placeholder="e.g. Awarded Engineering Excellence Award in 2023 for leading database sharding."
                        className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-surface focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-primary-text"
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-xl border border-border p-6 max-w-sm w-full shadow-xl">
            <div className="flex items-center gap-3 mb-3 text-error">
              <AlertCircle className="w-6 h-6" />
              <h3 className="font-bold text-base text-primary-text">Delete this experience?</h3>
            </div>
            <p className="text-xs text-secondary-text mb-5">
              This action cannot be undone. Entered details for this role will be removed from your resume draft.
            </p>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="px-3 py-1.5 text-xs font-semibold text-secondary-text border border-border rounded-lg hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (deleteConfirmId) deleteExperience(deleteConfirmId);
                  setDeleteConfirmId(null);
                }}
                className="px-3 py-1.5 text-xs font-semibold text-white bg-error hover:bg-red-700 rounded-lg shadow-xs"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* AI Bullet Enhancer Modal */}
      {aiBulletModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-xl border border-border shadow-2xl max-w-xl w-full p-6">
            <div className="flex items-center justify-between pb-3 border-b border-border mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-primary-light text-primary rounded-lg">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-primary-text">AI Bullet Point Enhancer</h3>
                  <p className="text-xs text-secondary-text">STAR framework: Action verb + task + measurable impact</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setAiBulletModal((prev) => ({ ...prev, isOpen: false }))}
                className="text-muted-text hover:text-primary-text text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {aiBulletModal.originalText && (
              <div className="p-3 bg-surface rounded-lg border border-border mb-4 text-xs">
                <span className="font-semibold text-secondary-text block mb-1">Original Draft:</span>
                <p className="text-primary-text italic">{aiBulletModal.originalText}</p>
              </div>
            )}

            <div className="space-y-2.5 mb-6">
              <span className="text-xs font-bold text-primary-text block">Recommended Professional Enhancements:</span>
              {aiBulletModal.suggestions.map((suggestion, sIdx) => (
                <div
                  key={sIdx}
                  onClick={() => handleApplyAiBullet(suggestion)}
                  className="p-3 border border-border hover:border-primary rounded-lg bg-surface hover:bg-primary-light/30 cursor-pointer transition-all text-xs text-primary-text group"
                >
                  <div className="flex justify-between items-start gap-2">
                    <p className="leading-relaxed">{suggestion}</p>
                    <span className="text-[11px] font-semibold text-primary opacity-0 group-hover:opacity-100 whitespace-nowrap">
                      Apply ↗
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-border">
              <button
                type="button"
                onClick={() => setAiBulletModal((prev) => ({ ...prev, isOpen: false }))}
                className="px-3 py-1.5 text-xs font-semibold text-secondary-text border border-border rounded-lg hover:bg-surface"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
