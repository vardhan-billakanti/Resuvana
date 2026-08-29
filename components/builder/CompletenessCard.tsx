'use client';

import React from 'react';
import { useResume } from '@/context/ResumeContext';
import { CheckCircle2, Circle, Sparkles, ArrowRight } from 'lucide-react';

export const CompletenessCard: React.FC = () => {
  const { completeness, setActiveSection } = useResume();
  const { score, items } = completeness;

  return (
    <div className="bg-white rounded-xl border border-border p-4 shadow-subtle mb-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <span className="text-xs font-bold text-primary-text block">Resume Completeness</span>
          <span className="text-[11px] text-secondary-text">
            {score >= 80 ? 'Comprehensive and application-ready' : 'Add core sections to enhance resume completeness'}
          </span>
        </div>
        <div className="flex items-center gap-1.5 bg-primary-light px-2.5 py-1 rounded-full border border-primary/20">
          <Sparkles className="w-3 h-3 text-primary" />
          <span className="text-xs font-bold text-primary">{score}%</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-100 rounded-full h-2 mb-3.5 overflow-hidden">
        <div
          className={`h-2 rounded-full transition-all duration-500 ${
            score >= 80 ? 'bg-success' : score >= 50 ? 'bg-primary' : 'bg-warning'
          }`}
          style={{ width: `${Math.max(score, 5)}%` }}
        />
      </div>

      {/* Checklist items */}
      <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-xs">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              if (item.id === 'projects_or_exp') setActiveSection('projects');
              else if (item.id === 'links_or_certs') setActiveSection('certifications');
              else setActiveSection(item.id);
            }}
            className="flex items-center gap-1.5 text-left p-1 rounded hover:bg-slate-50 transition-colors group"
          >
            {item.completed ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-success shrink-0" />
            ) : (
              <Circle className="w-3.5 h-3.5 text-muted-text shrink-0" />
            )}
            <span
              className={`truncate text-[11px] ${
                item.completed ? 'text-primary-text font-medium' : 'text-secondary-text group-hover:text-primary'
              }`}
            >
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
