'use client';

import React, { useState } from 'react';
import { useResume } from '@/context/ResumeContext';
import { GraduationCap, Plus, Trash2, Copy, ArrowUp, ArrowDown, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';

export const EducationSection: React.FC = () => {
  const { resumeData, addEducation, updateEducation, deleteEducation, duplicateEducation, moveEducation } = useResume();
  const educations = resumeData.education;

  const [expandedId, setExpandedId] = useState<string | null>(educations[0]?.id || null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  return (
    <div className="bg-white rounded-xl border border-border p-5 sm:p-6 shadow-subtle">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-border mb-5 gap-3">
        <div>
          <h2 className="text-lg font-bold text-primary-text flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-primary" />
            Education & Academic Credentials
          </h2>
          <p className="text-xs text-secondary-text mt-0.5">
            List your universities, degrees, GPA/CGPA, relevant coursework, and honors.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            addEducation();
            setTimeout(() => {
              const latest = educations[educations.length - 1];
              if (latest) setExpandedId(latest.id);
            }, 50);
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-primary hover:bg-primary-hover rounded-lg shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Education
        </button>
      </div>

      {educations.length === 0 ? (
        <div className="text-center py-8 border-2 border-dashed border-border rounded-xl bg-surface/50">
          <GraduationCap className="w-8 h-8 text-muted-text mx-auto mb-2" />
          <p className="text-sm font-medium text-primary-text">No education entries added</p>
          <button
            type="button"
            onClick={addEducation}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-primary bg-primary-light hover:bg-blue-100 rounded-lg transition-colors border border-primary/20 mt-3"
          >
            <Plus className="w-4 h-4" />
            Add Education
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {educations.map((edu, index) => {
            const isExpanded = expandedId === edu.id;
            return (
              <div
                key={edu.id}
                className="border border-border rounded-xl bg-surface overflow-hidden transition-all"
              >
                {/* Header */}
                <div
                  className="flex items-center justify-between p-3.5 sm:p-4 bg-white border-b border-border/80 cursor-pointer select-none hover:bg-slate-50 transition-colors"
                  onClick={() => setExpandedId(isExpanded ? null : edu.id)}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 flex items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-700">
                      {index + 1}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-primary-text">
                        {edu.institution || 'University / Institution'}
                      </h4>
                      <p className="text-xs text-secondary-text">
                        {edu.degree || 'Degree'} {edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ''} • {edu.startDate || 'Start'} – {edu.isCurrent ? 'Expected ' : ''}{edu.endDate || 'Graduation'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      onClick={() => moveEducation(index, 'up')}
                      disabled={index === 0}
                      className="p-1 text-secondary-text hover:text-primary-text disabled:opacity-30 rounded hover:bg-slate-100"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveEducation(index, 'down')}
                      disabled={index === educations.length - 1}
                      className="p-1 text-secondary-text hover:text-primary-text disabled:opacity-30 rounded hover:bg-slate-100"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => duplicateEducation(edu.id)}
                      className="p-1 text-secondary-text hover:text-primary-text rounded hover:bg-slate-100"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteConfirmId(edu.id)}
                      className="p-1 text-error hover:bg-red-50 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setExpandedId(isExpanded ? null : edu.id)}
                      className="p-1 text-secondary-text hover:text-primary-text"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Form Body */}
                {isExpanded && (
                  <div className="p-4 sm:p-5 space-y-4 bg-white animate-fadeIn">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-primary-text mb-1">
                          Institution / University <span className="text-error">*</span>
                        </label>
                        <input
                          type="text"
                          value={edu.institution}
                          onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
                          placeholder="e.g. Jawaharlal Nehru Technological University"
                          className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-surface focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-primary-text"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-primary-text mb-1">
                          Degree / Qualification <span className="text-error">*</span>
                        </label>
                        <input
                          type="text"
                          value={edu.degree}
                          onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                          placeholder="e.g. Bachelor of Technology (B.Tech) or B.S."
                          className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-surface focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-primary-text"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-primary-text mb-1">
                          Field of Study / Major <span className="text-error">*</span>
                        </label>
                        <input
                          type="text"
                          value={edu.fieldOfStudy}
                          onChange={(e) => updateEducation(edu.id, { fieldOfStudy: e.target.value })}
                          placeholder="e.g. Computer Science & Engineering"
                          className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-surface focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-primary-text"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-primary-text mb-1">
                          Location (City, Country)
                        </label>
                        <input
                          type="text"
                          value={edu.location}
                          onChange={(e) => updateEducation(edu.id, { location: e.target.value })}
                          placeholder="e.g. Hyderabad, India"
                          className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-surface focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-primary-text"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-primary-text mb-1">
                          Start Date & Graduation Date
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={edu.startDate}
                            onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
                            placeholder="e.g. Aug 2022"
                            className="w-1/2 px-3 py-2 text-sm border border-border rounded-lg bg-surface focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-primary-text"
                          />
                          <span className="text-secondary-text text-xs">–</span>
                          <input
                            type="text"
                            value={edu.endDate}
                            onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
                            placeholder="e.g. May 2026"
                            className="w-1/2 px-3 py-2 text-sm border border-border rounded-lg bg-surface focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-primary-text"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-primary-text mb-1">
                          GPA / CGPA <span className="text-muted-text font-normal">(Optional)</span>
                        </label>
                        <input
                          type="text"
                          value={edu.gpa || ''}
                          onChange={(e) => updateEducation(edu.id, { gpa: e.target.value })}
                          placeholder="e.g. 8.8 / 10.0 CGPA or 3.9 / 4.0 GPA"
                          className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-surface focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-primary-text"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-primary-text mb-1">
                          Academic Honors / Rank <span className="text-muted-text font-normal">(Optional)</span>
                        </label>
                        <input
                          type="text"
                          value={edu.academicAchievements || ''}
                          onChange={(e) => updateEducation(edu.id, { academicAchievements: e.target.value })}
                          placeholder="e.g. Dean's Honor List, Top 5% of class"
                          className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-surface focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-primary-text"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-primary-text mb-1">
                          Relevant Coursework <span className="text-muted-text font-normal">(Optional)</span>
                        </label>
                        <input
                          type="text"
                          value={edu.relevantCoursework || ''}
                          onChange={(e) => updateEducation(edu.id, { relevantCoursework: e.target.value })}
                          placeholder="e.g. Data Structures, Algorithms, Operating Systems, Cryptography, DBMS"
                          className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-surface focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-primary-text"
                        />
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
              <h3 className="font-bold text-base text-primary-text">Delete this education entry?</h3>
            </div>
            <p className="text-xs text-secondary-text mb-5">
              Are you sure you want to remove this education qualification?
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
                  if (deleteConfirmId) deleteEducation(deleteConfirmId);
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
