'use client';

import React, { useState } from 'react';
import { useResume } from '@/context/ResumeContext';
import { Sparkles, FileText, Check, Wand2, RefreshCw, Layers } from 'lucide-react';
import { AIAssistant } from '@/lib/aiAssistant';
import { ExperienceLevel } from '@/types/resume';

export const SummarySection: React.FC = () => {
  const { resumeData, updateSummary } = useResume();
  const { summary, personalInfo, skills, education, projects } = resumeData;

  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState<number | null>(null);

  const handleOpenAiGenerator = () => {
    const allSkills = skills.flatMap((s) => s.skills);
    const projNames = projects.map((p) => p.projectName);

    const generated = AIAssistant.generateSummaries({
      targetRole: summary.targetRole || personalInfo.professionalTitle || 'Software Engineer',
      experienceLevel: summary.experienceLevel || 'student',
      skills: allSkills,
      education: education[0]?.degree || '',
      projects: projNames,
    });

    setAiSuggestions(generated);
    setSelectedSuggestionIndex(0);
    setIsAiModalOpen(true);
  };

  const handleApplyAiSummary = () => {
    if (selectedSuggestionIndex !== null && aiSuggestions[selectedSuggestionIndex]) {
      updateSummary({ summaryText: aiSuggestions[selectedSuggestionIndex] });
      setIsAiModalOpen(false);
    }
  };

  const handleMakeConcise = () => {
    if (!summary.summaryText) return;
    const sentences = summary.summaryText
      .split(/(?<=[.!?])\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .join(' ');
    updateSummary({ summaryText: sentences });
  };

  return (
    <div className="bg-white rounded-xl border border-border p-5 sm:p-6 shadow-subtle">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-border mb-5 gap-3">
        <div>
          <h2 className="text-lg font-bold text-primary-text flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Professional Summary
          </h2>
          <p className="text-xs text-secondary-text mt-0.5">
            A concise 2–4 sentence overview highlighting your background, core strengths, and career focus.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleOpenAiGenerator}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-primary bg-primary-light hover:bg-blue-100 border border-primary/20 rounded-lg transition-colors shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5" />
            AI Summary Generator
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        {/* Target Role */}
        <div>
          <label className="block text-xs font-semibold text-primary-text mb-1">
            Target Job Role / Position
          </label>
          <input
            type="text"
            value={summary.targetRole}
            onChange={(e) => updateSummary({ targetRole: e.target.value })}
            placeholder="e.g. Cybersecurity Analyst or Full Stack Engineer"
            className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-surface focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-primary-text"
          />
        </div>

        {/* Experience Level */}
        <div>
          <label className="block text-xs font-semibold text-primary-text mb-1">
            Career Stage / Experience Level
          </label>
          <select
            value={summary.experienceLevel}
            onChange={(e) => updateSummary({ experienceLevel: e.target.value as ExperienceLevel })}
            className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-surface focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-primary-text"
          >
            <option value="student">Student / College Undergraduate</option>
            <option value="fresher">Fresh Graduate (Entry Level)</option>
            <option value="junior">Junior (1–2 Years)</option>
            <option value="mid-level">Mid-Level (3–5 Years)</option>
            <option value="senior">Senior (6+ Years)</option>
            <option value="lead">Tech Lead / Engineering Manager</option>
            <option value="executive">Director / Executive</option>
          </select>
        </div>
      </div>

      {/* Summary Textarea */}
      <div className="mb-3">
        <div className="flex justify-between items-center mb-1">
          <label className="text-xs font-semibold text-primary-text">
            Summary Description
          </label>
          <span className="text-[11px] text-muted-text">
            {summary.summaryText.length} characters • {summary.summaryText.split(/\s+/).filter(Boolean).length} words
          </span>
        </div>
        <textarea
          rows={4}
          value={summary.summaryText}
          onChange={(e) => updateSummary({ summaryText: e.target.value })}
          placeholder="Write a clear, achievement-oriented professional summary or use the AI Generator above to draft tailored options..."
          className="w-full p-3 text-sm border border-border rounded-lg bg-surface focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-primary-text leading-relaxed"
        />
      </div>

      {/* Quick helper buttons */}
      <div className="flex flex-wrap gap-2 text-xs text-secondary-text items-center pt-2">
        <span className="font-medium text-xs text-primary-text">Quick Actions:</span>
        <button
          type="button"
          onClick={handleMakeConcise}
          disabled={!summary.summaryText}
          className="px-2.5 py-1 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md transition-colors disabled:opacity-50"
        >
          Make More Concise
        </button>
        <button
          type="button"
          onClick={handleOpenAiGenerator}
          className="px-2.5 py-1 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md transition-colors"
        >
          Regenerate Options
        </button>
      </div>

      {/* AI Summary Generator Modal */}
      {isAiModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl border border-border shadow-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-border mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-primary-light text-primary rounded-lg">
                  <Wand2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-primary-text">AI Professional Summary Generator</h3>
                  <p className="text-xs text-secondary-text">Select the summary version that best aligns with your background</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAiModalOpen(false)}
                className="text-muted-text hover:text-primary-text p-1 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 mb-6">
              {aiSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedSuggestionIndex(index)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    selectedSuggestionIndex === index
                      ? 'border-primary bg-primary-light/40 shadow-xs'
                      : 'border-border bg-surface hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-xs font-bold text-primary-text">
                        Option {index + 1}
                        {index === 0 && ' (Recommended)'}
                      </span>
                    </div>
                    {selectedSuggestionIndex === index && (
                      <span className="p-1 bg-primary text-white rounded-full">
                        <Check className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-primary-text leading-relaxed">{suggestion}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-border">
              <button
                type="button"
                onClick={handleOpenAiGenerator}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-secondary-text hover:text-primary-text"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Generate More
              </button>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsAiModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-secondary-text hover:text-primary-text border border-border rounded-lg bg-surface"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleApplyAiSummary}
                  className="px-4 py-2 text-xs font-semibold text-white bg-primary hover:bg-primary-hover rounded-lg shadow-xs transition-colors"
                >
                  Use Selected Summary
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
