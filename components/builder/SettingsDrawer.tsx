'use client';

import React from 'react';
import { useResume } from '@/context/ResumeContext';
import { Settings, Eye, Sliders, Type, Palette, LayoutGrid } from 'lucide-react';

const ACCENT_COLORS = [
  { name: 'Royal Blue', value: '#2563EB' },
  { name: 'Forest Teal', value: '#0F766E' },
  { name: 'Classic Slate', value: '#1E293B' },
  { name: 'Deep Indigo', value: '#4F46E5' },
  { name: 'Steel Navy', value: '#0369A1' },
  { name: 'Charcoal Black', value: '#111827' },
];

export const SettingsDrawer: React.FC = () => {
  const { resumeData, updateSettings, toggleSection } = useResume();
  const { settings, enabledSections } = resumeData;

  return (
    <div className="bg-white rounded-xl border border-border p-5 sm:p-6 shadow-subtle space-y-6">
      <div>
        <h2 className="text-lg font-bold text-primary-text flex items-center gap-2">
          <Settings className="w-5 h-5 text-primary" />
          Document & Layout Settings
        </h2>
        <p className="text-xs text-secondary-text mt-0.5">
          Fine-tune typography, spacing, margins, and visibility of individual sections.
        </p>
      </div>

      {/* Typography & Accent Palette */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-secondary-text flex items-center gap-1.5">
          <Palette className="w-4 h-4 text-primary" />
          Accent Color Theme
        </h3>
        <div className="flex flex-wrap gap-2.5">
          {ACCENT_COLORS.map((c) => (
            <button
              key={c.value}
              type="button"
              onClick={() => updateSettings({ accentColor: c.value })}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                settings.accentColor === c.value
                  ? 'border-primary bg-primary-light/40 shadow-xs ring-2 ring-primary/20'
                  : 'border-border bg-surface hover:bg-slate-100'
              }`}
            >
              <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: c.value }} />
              <span>{c.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Typography Settings */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t border-border">
        {/* Font Family */}
        <div>
          <label className="block text-xs font-bold text-primary-text mb-1">
            Font Family
          </label>
          <select
            value={settings.font}
            onChange={(e) => updateSettings({ font: e.target.value as any })}
            className="w-full px-2.5 py-1.5 text-xs border border-border rounded-lg bg-surface text-primary-text"
          >
            <option value="inter">Inter (Clean Modern Sans)</option>
            <option value="roboto">Roboto (Geometric Sans)</option>
            <option value="merriweather">Merriweather (Classic Serif)</option>
          </select>
        </div>

        {/* Font Size Scale */}
        <div>
          <label className="block text-xs font-bold text-primary-text mb-1">
            Font Size Scale
          </label>
          <select
            value={settings.fontSize}
            onChange={(e) => updateSettings({ fontSize: e.target.value as any })}
            className="w-full px-2.5 py-1.5 text-xs border border-border rounded-lg bg-surface text-primary-text"
          >
            <option value="small">Small (Fit more on 1 page)</option>
            <option value="medium">Medium (Standard Recommended)</option>
            <option value="large">Large (High Legibility)</option>
          </select>
        </div>

        {/* Page Margins */}
        <div>
          <label className="block text-xs font-bold text-primary-text mb-1">
            Page Margins
          </label>
          <select
            value={settings.margins}
            onChange={(e) => updateSettings({ margins: e.target.value as any })}
            className="w-full px-2.5 py-1.5 text-xs border border-border rounded-lg bg-surface text-primary-text"
          >
            <option value="compact">Compact (0.5 in)</option>
            <option value="normal">Normal (0.75 in)</option>
            <option value="wide">Wide (1.0 in)</option>
          </select>
        </div>
      </div>

      {/* Section Visibility Toggles */}
      <div className="pt-4 border-t border-border">
        <h3 className="text-xs font-bold uppercase tracking-wider text-secondary-text mb-3 flex items-center gap-1.5">
          <Eye className="w-4 h-4 text-primary" />
          Section Visibility on Resume
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
          {([
            { key: 'summary', label: 'Professional Summary' },
            { key: 'education', label: 'Education' },
            { key: 'experience', label: 'Work Experience' },
            { key: 'internships', label: 'Internships' },
            { key: 'skills', label: 'Skills & Competencies' },
            { key: 'projects', label: 'Key Projects' },
            { key: 'certifications', label: 'Certifications' },
            { key: 'achievements', label: 'Achievements' },
            { key: 'languages', label: 'Languages' },
            { key: 'interests', label: 'Interests' },
            { key: 'customSections', label: 'Custom Sections' },
          ] as const).map((sec) => (
            <label
              key={sec.key}
              className={`flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer select-none transition-all ${
                enabledSections[sec.key]
                  ? 'bg-primary-light/30 border-primary/30 text-primary-text'
                  : 'bg-slate-50 border-border text-muted-text opacity-70'
              }`}
            >
              <input
                type="checkbox"
                checked={enabledSections[sec.key]}
                onChange={() => toggleSection(sec.key)}
                className="w-4 h-4 text-primary rounded border-border focus:ring-primary"
              />
              <span className="font-medium text-[11px] truncate">{sec.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};
