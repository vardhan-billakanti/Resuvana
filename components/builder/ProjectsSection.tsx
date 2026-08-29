'use client';

import React, { useState } from 'react';
import { useResume } from '@/context/ResumeContext';
import { FolderGit2, Plus, Trash2, Copy, ArrowUp, ArrowDown, Sparkles, ChevronDown, ChevronUp, AlertCircle, X, ExternalLink } from 'lucide-react';
import { AIAssistant } from '@/lib/aiAssistant';

export const ProjectsSection: React.FC = () => {
  const { resumeData, addProject, updateProject, deleteProject, duplicateProject, moveProject } = useResume();
  const projects = resumeData.projects;

  const [expandedId, setExpandedId] = useState<string | null>(projects[0]?.id || null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [techInputMap, setTechInputMap] = useState<Record<string, string>>({});

  // AI Project Description Modal
  const [aiProjModal, setAiProjModal] = useState<{
    isOpen: boolean;
    projId: string;
    suggestions: string[];
  }>({
    isOpen: false,
    projId: '',
    suggestions: [],
  });

  const handleAddContribution = (projId: string) => {
    const proj = projects.find((p) => p.id === projId);
    if (!proj) return;
    updateProject(projId, { keyContributions: [...proj.keyContributions, ''] });
  };

  const handleUpdateContribution = (projId: string, index: number, value: string) => {
    const proj = projects.find((p) => p.id === projId);
    if (!proj) return;
    const updated = [...proj.keyContributions];
    updated[index] = value;
    updateProject(projId, { keyContributions: updated });
  };

  const handleRemoveContribution = (projId: string, index: number) => {
    const proj = projects.find((p) => p.id === projId);
    if (!proj) return;
    const updated = proj.keyContributions.filter((_, i) => i !== index);
    updateProject(projId, { keyContributions: updated });
  };

  const handleAddTech = (projId: string) => {
    const text = techInputMap[projId]?.trim();
    if (!text) return;
    const proj = projects.find((p) => p.id === projId);
    if (!proj) return;
    const current = proj.technologies || [];
    if (!current.includes(text)) {
      updateProject(projId, { technologies: [...current, text] });
    }
    setTechInputMap((prev) => ({ ...prev, [projId]: '' }));
  };

  const handleRemoveTech = (projId: string, tech: string) => {
    const proj = projects.find((p) => p.id === projId);
    if (!proj) return;
    updateProject(projId, { technologies: proj.technologies.filter((t) => t !== tech) });
  };

  const handleOpenAiProject = (projId: string) => {
    const proj = projects.find((p) => p.id === projId);
    if (!proj) return;
    const suggestions = AIAssistant.improveProjectDescription(proj.shortDescription || proj.projectName, proj.technologies);
    setAiProjModal({
      isOpen: true,
      projId,
      suggestions,
    });
  };

  const handleApplyAiProjDesc = (desc: string) => {
    updateProject(aiProjModal.projId, { shortDescription: desc });
    setAiProjModal((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <div className="bg-white rounded-xl border border-border p-5 sm:p-6 shadow-subtle">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-border mb-5 gap-3">
        <div>
          <h2 className="text-lg font-bold text-primary-text flex items-center gap-2">
            <FolderGit2 className="w-5 h-5 text-primary" />
            Key Projects
          </h2>
          <p className="text-xs text-secondary-text mt-0.5">
            Demonstrate real-world technical competence by detailing what you built, technologies used, and outcomes achieved.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            addProject();
            setTimeout(() => {
              const latest = projects[projects.length - 1];
              if (latest) setExpandedId(latest.id);
            }, 50);
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-primary hover:bg-primary-hover rounded-lg shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Project
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-border rounded-xl bg-surface/50">
          <FolderGit2 className="w-8 h-8 text-muted-text mx-auto mb-2" />
          <p className="text-sm font-medium text-primary-text">No projects added yet</p>
          <p className="text-xs text-secondary-text max-w-sm mx-auto mt-1 mb-4">
            Projects are essential for college students and engineers to prove practical skills.
          </p>
          <button
            type="button"
            onClick={addProject}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-primary bg-primary-light hover:bg-blue-100 rounded-lg transition-colors border border-primary/20"
          >
            <Plus className="w-4 h-4" />
            Add First Project
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((proj, index) => {
            const isExpanded = expandedId === proj.id;
            return (
              <div
                key={proj.id}
                className="border border-border rounded-xl bg-surface overflow-hidden transition-all"
              >
                {/* Header */}
                <div
                  className="flex items-center justify-between p-3.5 sm:p-4 bg-white border-b border-border/80 cursor-pointer select-none hover:bg-slate-50 transition-colors"
                  onClick={() => setExpandedId(isExpanded ? null : proj.id)}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 flex items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-700">
                      {index + 1}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-primary-text">
                        {proj.projectName || 'Untitled Project'}
                      </h4>
                      <p className="text-xs text-secondary-text">
                        {proj.technologies && proj.technologies.length > 0 ? proj.technologies.join(', ') : 'Technologies'} • {proj.startDate || 'Start'} {proj.endDate ? `– ${proj.endDate}` : ''}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      onClick={() => moveProject(index, 'up')}
                      disabled={index === 0}
                      className="p-1 text-secondary-text hover:text-primary-text disabled:opacity-30 rounded hover:bg-slate-100"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveProject(index, 'down')}
                      disabled={index === projects.length - 1}
                      className="p-1 text-secondary-text hover:text-primary-text disabled:opacity-30 rounded hover:bg-slate-100"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => duplicateProject(proj.id)}
                      className="p-1 text-secondary-text hover:text-primary-text rounded hover:bg-slate-100"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteConfirmId(proj.id)}
                      className="p-1 text-error hover:bg-red-50 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setExpandedId(isExpanded ? null : proj.id)}
                      className="p-1 text-secondary-text hover:text-primary-text"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Body Form */}
                {isExpanded && (
                  <div className="p-4 sm:p-5 space-y-4 bg-white animate-fadeIn">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-primary-text mb-1">
                          Project Name <span className="text-error">*</span>
                        </label>
                        <input
                          type="text"
                          value={proj.projectName}
                          onChange={(e) => updateProject(proj.id, { projectName: e.target.value })}
                          placeholder="e.g. Web Application Vulnerability Scanner"
                          className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-surface focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-primary-text"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-primary-text mb-1">
                          Your Role / Contribution Title
                        </label>
                        <input
                          type="text"
                          value={proj.role || ''}
                          onChange={(e) => updateProject(proj.id, { role: e.target.value })}
                          placeholder="e.g. Lead Developer or Full Stack Contributor"
                          className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-surface focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-primary-text"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-primary-text mb-1">
                          GitHub Repository URL
                        </label>
                        <input
                          type="url"
                          value={proj.githubLink || ''}
                          onChange={(e) => updateProject(proj.id, { githubLink: e.target.value })}
                          placeholder="https://github.com/username/project"
                          className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-surface focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-primary-text"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-primary-text mb-1">
                          Live Demo / Deployment URL
                        </label>
                        <input
                          type="url"
                          value={proj.projectLink || ''}
                          onChange={(e) => updateProject(proj.id, { projectLink: e.target.value })}
                          placeholder="https://myproject-live.app"
                          className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-surface focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-primary-text"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-primary-text mb-1">
                          Project Timeline (Dates)
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={proj.startDate || ''}
                            onChange={(e) => updateProject(proj.id, { startDate: e.target.value })}
                            placeholder="e.g. Jan 2024"
                            className="w-1/2 px-3 py-2 text-sm border border-border rounded-lg bg-surface focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 text-primary-text"
                          />
                          <span className="text-secondary-text text-xs">–</span>
                          <input
                            type="text"
                            value={proj.endDate || ''}
                            onChange={(e) => updateProject(proj.id, { endDate: e.target.value })}
                            placeholder="e.g. Mar 2024"
                            className="w-1/2 px-3 py-2 text-sm border border-border rounded-lg bg-surface focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 text-primary-text"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Technologies Tag Input */}
                    <div>
                      <label className="block text-xs font-semibold text-primary-text mb-1">
                        Technologies Stack
                      </label>
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {proj.technologies.map((t, tIdx) => (
                          <span
                            key={tIdx}
                            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs bg-slate-100 text-slate-800 rounded-md border border-slate-200"
                          >
                            {t}
                            <button
                              type="button"
                              onClick={() => handleRemoveTech(proj.id, t)}
                              className="text-slate-400 hover:text-error"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={techInputMap[proj.id] || ''}
                          onChange={(e) => setTechInputMap({ ...techInputMap, [proj.id]: e.target.value })}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddTech(proj.id);
                            }
                          }}
                          placeholder="Type tech (e.g. React, Python, PostgreSQL) and press Add"
                          className="flex-1 px-3 py-1.5 text-xs border border-border rounded-lg bg-surface focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 text-primary-text"
                        />
                        <button
                          type="button"
                          onClick={() => handleAddTech(proj.id)}
                          className="px-3 py-1.5 text-xs font-semibold text-primary bg-primary-light hover:bg-blue-100 rounded-lg border border-primary/20"
                        >
                          Add Tech
                        </button>
                      </div>
                    </div>

                    {/* Short Description */}
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-xs font-semibold text-primary-text">
                          Short Overview
                        </label>
                        <button
                          type="button"
                          onClick={() => handleOpenAiProject(proj.id)}
                          className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary hover:text-primary-hover"
                        >
                          <Sparkles className="w-3 h-3" />
                          AI Improve Overview
                        </button>
                      </div>
                      <input
                        type="text"
                        value={proj.shortDescription}
                        onChange={(e) => updateProject(proj.id, { shortDescription: e.target.value })}
                        placeholder="e.g. Developed an automated Python scanner to detect common OWASP vulnerabilities."
                        className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-surface focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 text-primary-text"
                      />
                    </div>

                    {/* Key Contributions */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-xs font-semibold text-primary-text">
                          Key Implementation Highlights & Features
                        </label>
                        <button
                          type="button"
                          onClick={() => handleAddContribution(proj.id)}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-hover"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          Add Bullet
                        </button>
                      </div>
                      <div className="space-y-2">
                        {proj.keyContributions.map((contrib, cIdx) => (
                          <div key={cIdx} className="flex items-start gap-2">
                            <span className="text-secondary-text text-sm mt-2">•</span>
                            <input
                              type="text"
                              value={contrib}
                              onChange={(e) => handleUpdateContribution(proj.id, cIdx, e.target.value)}
                              placeholder="e.g. Engineered multithreaded crawler to scan web pages 3x faster than single-threaded tools."
                              className="flex-1 px-3 py-2 text-sm border border-border rounded-lg bg-surface focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 text-primary-text"
                            />
                            {proj.keyContributions.length > 1 && (
                              <button
                                type="button"
                                onClick={() => handleRemoveContribution(proj.id, cIdx)}
                                className="p-2 text-muted-text hover:text-error rounded-md"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Measurable Results */}
                    <div>
                      <label className="block text-xs font-semibold text-primary-text mb-1">
                        Measurable Outcome / Adoption Metric <span className="text-muted-text font-normal">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        value={proj.results || ''}
                        onChange={(e) => updateProject(proj.id, { results: e.target.value })}
                        placeholder="e.g. Detected 100% of benchmark vulnerabilities; adopted by 150+ students in lab."
                        className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-surface focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 text-primary-text"
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
              <h3 className="font-bold text-base text-primary-text">Delete this project?</h3>
            </div>
            <p className="text-xs text-secondary-text mb-5">
              Are you sure you want to remove this project from your resume?
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
                  if (deleteConfirmId) deleteProject(deleteConfirmId);
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

      {/* AI Project Desc Modal */}
      {aiProjModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-xl border border-border shadow-2xl max-w-xl w-full p-6">
            <div className="flex items-center justify-between pb-3 border-b border-border mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-primary-light text-primary rounded-lg">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-primary-text">AI Project Description Enhancer</h3>
                  <p className="text-xs text-secondary-text">Structured: What you built + tech stack + impact</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setAiProjModal((prev) => ({ ...prev, isOpen: false }))}
                className="text-muted-text hover:text-primary-text text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2.5 mb-6">
              {aiProjModal.suggestions.map((suggestion, sIdx) => (
                <div
                  key={sIdx}
                  onClick={() => handleApplyAiProjDesc(suggestion)}
                  className="p-3 border border-border hover:border-primary rounded-lg bg-surface hover:bg-primary-light/30 cursor-pointer transition-all text-xs text-primary-text group"
                >
                  <p className="leading-relaxed mb-1">{suggestion}</p>
                  <span className="text-[11px] font-semibold text-primary opacity-0 group-hover:opacity-100">
                    Use this description ↗
                  </span>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-border">
              <button
                type="button"
                onClick={() => setAiProjModal((prev) => ({ ...prev, isOpen: false }))}
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
