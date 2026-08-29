'use client';

import React, { useState } from 'react';
import { TEMPLATES } from '@/lib/sampleResumes';
import { useResume } from '@/context/ResumeContext';
import { useRouter } from 'next/navigation';
import { TemplateId } from '@/types/resume';
import {
  LayoutTemplate,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import { TemplateThumbnail } from '@/components/templates/TemplateThumbnail';

export default function TemplatesPage() {
  const { setTemplate } = useResume();
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  const filterOptions = ['All', 'ATS', 'Professional', 'Student', 'Executive'];

  const filteredTemplates = TEMPLATES.filter((t) => {
    if (selectedFilter === 'All') return true;
    return t.category.toLowerCase() === selectedFilter.toLowerCase();
  });

  const handleUseTemplate = (templateId: TemplateId) => {
    setTemplate(templateId);
    router.push('/builder');
  };

  return (
    <div className="bg-surface min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-light text-primary text-xs font-semibold border border-primary/20">
            <LayoutTemplate className="w-3.5 h-3.5" />
            <span>Curated Collection</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-primary-text tracking-tight">
            6 Professional ATS-Conscious Templates
          </h1>
          <p className="text-sm text-secondary-text leading-relaxed">
            Every template is engineered for high legibility, clean visual hierarchy, and machine-readable structure across applicant tracking workflows.
          </p>

          {/* Filter Bar */}
          <div className="flex flex-wrap justify-center items-center gap-2 pt-4">
            {filterOptions.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setSelectedFilter(f)}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                  selectedFilter === f
                    ? 'bg-primary text-white shadow-xs'
                    : 'bg-white text-secondary-text hover:text-primary-text border border-border hover:bg-slate-50'
                }`}
              >
                {f === 'All' ? 'All Templates (6)' : f}
              </button>
            ))}
          </div>
        </div>

        {/* 6-Card Grid (3x2 on desktop, 2 on tablet, 1 on mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="bg-white rounded-2xl border border-border overflow-hidden shadow-subtle hover:shadow-card-hover transition-all flex flex-col group"
            >
              {/* Real Miniature Template Thumbnail */}
              <div className="h-64 bg-slate-100/70 p-3 border-b border-border flex flex-col justify-between relative overflow-hidden group-hover:bg-slate-100 transition-colors">
                <div className="flex justify-between items-center z-10 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white text-primary-text border border-border shadow-2xs">
                    {template.category}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    <ShieldCheck className="w-3 h-3" />
                    ATS-Friendly
                  </span>
                </div>

                {/* Micro Resume Preview Component */}
                <div className="flex-1 w-full flex items-center justify-center overflow-hidden">
                  <TemplateThumbnail templateId={template.id} />
                </div>
              </div>

              {/* Template Info */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-bold text-base text-primary-text">{template.name}</h3>
                  <p className="text-xs text-secondary-text leading-relaxed">{template.description}</p>

                  <div className="mt-3 pt-3 border-t border-border/70">
                    <span className="text-[11px] font-bold text-primary-text block mb-1">Best suited for:</span>
                    <p className="text-[11px] text-secondary-text">{template.bestSuitedFor}</p>
                  </div>

                  <div className="pt-2">
                    <span className="text-[10px] font-bold text-secondary-text block mb-1.5 uppercase tracking-wider">Features:</span>
                    <div className="flex flex-wrap gap-1">
                      {template.features.map((feat, fIdx) => (
                        <span key={fIdx} className="text-[10px] font-medium bg-surface text-secondary-text px-2 py-0.5 rounded border border-border">
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleUseTemplate(template.id)}
                  className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-bold text-white bg-primary hover:bg-primary-hover rounded-xl shadow-xs transition-all"
                >
                  <span>Use This Template</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
