'use client';

import React, { useState } from 'react';
import { useResume } from '@/context/ResumeContext';
import { Award, Plus, Trash2, Copy, ArrowUp, ArrowDown, ChevronDown, ChevronUp, AlertCircle, Tag, X } from 'lucide-react';

export const InternshipsSection: React.FC = () => {
  const { resumeData, addInternship, updateInternship, deleteInternship, duplicateInternship, moveInternship } = useResume();
  const internships = resumeData.internships;

  const [expandedId, setExpandedId] = useState<string | null>(internships[0]?.id || null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [techInputMap, setTechInputMap] = useState<Record<string, string>>({});

  const handleAddResponsibility = (internId: string) => {
    const intern = internships.find((i) => i.id === internId);
    if (!intern) return;
    updateInternship(internId, { responsibilities: [...intern.responsibilities, ''] });
  };

  const handleUpdateResponsibility = (internId: string, index: number, value: string) => {
    const intern = internships.find((i) => i.id === internId);
    if (!intern) return;
    const updated = [...intern.responsibilities];
    updated[index] = value;
    updateInternship(internId, { responsibilities: updated });
  };

  const handleRemoveResponsibility = (internId: string, index: number) => {
    const intern = internships.find((i) => i.id === internId);
    if (!intern) return;
    const updated = intern.responsibilities.filter((_, i) => i !== index);
    updateInternship(internId, { responsibilities: updated });
  };

  const handleAddTech = (internId: string) => {
    const text = techInputMap[internId]?.trim();
    if (!text) return;
    const intern = internships.find((i) => i.id === internId);
    if (!intern) return;
    const currentTech = intern.technologiesUsed || [];
    if (!currentTech.includes(text)) {
      updateInternship(internId, { technologiesUsed: [...currentTech, text] });
    }
    setTechInputMap((prev) => ({ ...prev, [internId]: '' }));
  };

  const handleRemoveTech = (internId: string, tech: string) => {
    const intern = internships.find((i) => i.id === internId);
    if (!intern) return;
    const currentTech = intern.technologiesUsed || [];
    updateInternship(internId, { technologiesUsed: currentTech.filter((t) => t !== tech) });
  };

  return (
    <div className="bg-white rounded-xl border border-border p-5 sm:p-6 shadow-subtle">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-border mb-5 gap-3">
        <div>
          <h2 className="text-lg font-bold text-primary-text flex items-center gap-2">
            <Award className="w-5 h-5 text-primary" />
            Internships & Industrial Training
          </h2>
          <p className="text-xs text-secondary-text mt-0.5">
            Crucial section for students and fresh graduates to showcase hands-on organizational work.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            addInternship();
            setTimeout(() => {
              const latest = internships[internships.length - 1];
              if (latest) setExpandedId(latest.id);
            }, 50);
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-primary hover:bg-primary-hover rounded-lg shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Internship
        </button>
      </div>

      {internships.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-border rounded-xl bg-surface/50">
          <Award className="w-8 h-8 text-muted-text mx-auto mb-2" />
          <p className="text-sm font-medium text-primary-text">No internships added</p>
          <p className="text-xs text-secondary-text max-w-sm mx-auto mt-1 mb-4">
            Add summer internships, industrial training, or research apprenticeships here.
          </p>
          <button
            type="button"
            onClick={addInternship}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-primary bg-primary-light hover:bg-blue-100 rounded-lg transition-colors border border-primary/20"
          >
            <Plus className="w-4 h-4" />
            Add Internship
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {internships.map((intern, index) => {
            const isExpanded = expandedId === intern.id;
            return (
              <div
                key={intern.id}
                className="border border-border rounded-xl bg-surface overflow-hidden transition-all"
              >
                {/* Header Row */}
                <div
                  className="flex items-center justify-between p-3.5 sm:p-4 bg-white border-b border-border/80 cursor-pointer select-none hover:bg-slate-50 transition-colors"
                  onClick={() => setExpandedId(isExpanded ? null : intern.id)}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 flex items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-700">
                      {index + 1}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-primary-text">
                        {intern.role || 'Internship Role'}
                      </h4>
                      <p className="text-xs text-secondary-text">
                        {intern.organization || 'Organization'} • {intern.startDate || 'Start'} – {intern.isCurrent ? 'Present' : intern.endDate || 'End'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      onClick={() => moveInternship(index, 'up')}
                      disabled={index === 0}
                      className="p-1 text-secondary-text hover:text-primary-text disabled:opacity-30 rounded hover:bg-slate-100"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveInternship(index, 'down')}
                      disabled={index === internships.length - 1}
                      className="p-1 text-secondary-text hover:text-primary-text disabled:opacity-30 rounded hover:bg-slate-100"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => duplicateInternship(intern.id)}
                      className="p-1 text-secondary-text hover:text-primary-text rounded hover:bg-slate-100"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteConfirmId(intern.id)}
                      className="p-1 text-error hover:bg-red-50 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setExpandedId(isExpanded ? null : intern.id)}
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
                          Role / Title <span className="text-error">*</span>
                        </label>
                        <input
                          type="text"
                          value={intern.role}
                          onChange={(e) => updateInternship(intern.id, { role: e.target.value })}
                          placeholder="e.g. Cybersecurity Intern"
                          className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-surface focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-primary-text"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-primary-text mb-1">
                          Organization / Company <span className="text-error">*</span>
                        </label>
                        <input
                          type="text"
                          value={intern.organization}
                          onChange={(e) => updateInternship(intern.id, { organization: e.target.value })}
                          placeholder="e.g. CyberSecure Labs"
                          className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-surface focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-primary-text"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-primary-text mb-1">
                          Location
                        </label>
                        <input
                          type="text"
                          value={intern.location}
                          onChange={(e) => updateInternship(intern.id, { location: e.target.value })}
                          placeholder="e.g. Hyderabad, India or Remote"
                          className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-surface focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-primary-text"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-primary-text mb-1">
                          Start & End Date
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={intern.startDate}
                            onChange={(e) => updateInternship(intern.id, { startDate: e.target.value })}
                            placeholder="e.g. May 2024"
                            className="w-1/2 px-3 py-2 text-sm border border-border rounded-lg bg-surface focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-primary-text"
                          />
                          <span className="text-secondary-text text-xs">–</span>
                          <input
                            type="text"
                            value={intern.isCurrent ? 'Present' : intern.endDate}
                            onChange={(e) => updateInternship(intern.id, { endDate: e.target.value })}
                            placeholder="e.g. Jul 2024"
                            disabled={intern.isCurrent}
                            className="w-1/2 px-3 py-2 text-sm border border-border rounded-lg bg-surface focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-primary-text"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Responsibilities */}
                    <div className="pt-2">
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-xs font-semibold text-primary-text">
                          Key Tasks & Responsibilities
                        </label>
                        <button
                          type="button"
                          onClick={() => handleAddResponsibility(intern.id)}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-hover"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          Add Task
                        </button>
                      </div>

                      <div className="space-y-2">
                        {intern.responsibilities.map((resp, rIdx) => (
                          <div key={rIdx} className="flex items-start gap-2">
                            <span className="text-secondary-text text-sm mt-2">•</span>
                            <input
                              type="text"
                              value={resp}
                              onChange={(e) => handleUpdateResponsibility(intern.id, rIdx, e.target.value)}
                              placeholder="e.g. Conducted vulnerability scans across 15 web apps using Burp Suite and OWASP ZAP."
                              className="flex-1 px-3 py-2 text-sm border border-border rounded-lg bg-surface focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-primary-text"
                            />
                            {intern.responsibilities.length > 1 && (
                              <button
                                type="button"
                                onClick={() => handleRemoveResponsibility(intern.id, rIdx)}
                                className="p-2 text-muted-text hover:text-error rounded-md"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Technologies Used */}
                    <div>
                      <label className="block text-xs font-semibold text-primary-text mb-1">
                        Technologies / Tools Used
                      </label>
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {(intern.technologiesUsed || []).map((t, tIdx) => (
                          <span
                            key={tIdx}
                            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs bg-slate-100 text-slate-800 rounded-md border border-slate-200"
                          >
                            {t}
                            <button
                              type="button"
                              onClick={() => handleRemoveTech(intern.id, t)}
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
                          value={techInputMap[intern.id] || ''}
                          onChange={(e) => setTechInputMap({ ...techInputMap, [intern.id]: e.target.value })}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddTech(intern.id);
                            }
                          }}
                          placeholder="Type tool/tech and press Add (e.g. Wireshark, Python, Linux)"
                          className="flex-1 px-3 py-1.5 text-xs border border-border rounded-lg bg-surface focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 text-primary-text"
                        />
                        <button
                          type="button"
                          onClick={() => handleAddTech(intern.id)}
                          className="px-3 py-1.5 text-xs font-semibold text-primary bg-primary-light hover:bg-blue-100 rounded-lg border border-primary/20"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Delete Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-xl border border-border p-6 max-w-sm w-full shadow-xl">
            <div className="flex items-center gap-3 mb-3 text-error">
              <AlertCircle className="w-6 h-6" />
              <h3 className="font-bold text-base text-primary-text">Delete this internship?</h3>
            </div>
            <p className="text-xs text-secondary-text mb-5">
              Are you sure you want to remove this internship entry?
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
                  if (deleteConfirmId) deleteInternship(deleteConfirmId);
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
    </div>
  );
};
