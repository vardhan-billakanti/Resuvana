'use client';

import React, { useState } from 'react';
import { useResume } from '@/context/ResumeContext';
import { Code, Plus, Trash2, X, Sparkles } from 'lucide-react';
import { AIAssistant } from '@/lib/aiAssistant';

export const SkillsSection: React.FC = () => {
  const { resumeData, addSkillCategory, updateSkillCategory, deleteSkillCategory, addSkillToCategory, removeSkillFromCategory, setSkillsForCategory } = useResume();
  const skillCategories = resumeData.skills;
  const targetRole = resumeData.summary.targetRole || resumeData.personalInfo.professionalTitle || '';

  const [skillInputMap, setSkillInputMap] = useState<Record<string, string>>({});
  const [newCategoryName, setNewCategoryName] = useState('');
  const [isAddingCategory, setIsAddingCategory] = useState(false);

  const handleAddSkill = (catId: string) => {
    const text = skillInputMap[catId]?.trim();
    if (!text) return;
    addSkillToCategory(catId, text);
    setSkillInputMap((prev) => ({ ...prev, [catId]: '' }));
  };

  const handleAddCategorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;
    addSkillCategory(newCategoryName.trim());
    setNewCategoryName('');
    setIsAddingCategory(false);
  };

  const handleAutoSuggestSkills = () => {
    const recommended = AIAssistant.recommendSkills(targetRole);

    // If technical category exists, add recommended technical
    let techCat = skillCategories.find((c) => c.categoryName.toLowerCase().includes('technical') || c.categoryName.toLowerCase().includes('programming'));
    if (!techCat && skillCategories.length > 0) {
      techCat = skillCategories[0];
    }

    if (techCat) {
      const combined = Array.from(new Set([...techCat.skills, ...recommended.technical]));
      setSkillsForCategory(techCat.id, combined);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-border p-5 sm:p-6 shadow-subtle">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-border mb-5 gap-3">
        <div>
          <h2 className="text-lg font-bold text-primary-text flex items-center gap-2">
            <Code className="w-5 h-5 text-primary" />
            Skills & Competencies
          </h2>
          <p className="text-xs text-secondary-text mt-0.5">
            Organize skills by category. Clean, text-searchable skills maximize ATS keyword matching.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleAutoSuggestSkills}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-primary bg-primary-light hover:bg-blue-100 border border-primary/20 rounded-lg transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Suggest Skills for Role
          </button>
          <button
            type="button"
            onClick={() => setIsAddingCategory(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-primary hover:bg-primary-hover rounded-lg shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Category
          </button>
        </div>
      </div>

      {/* Add Category Drawer / Form */}
      {isAddingCategory && (
        <form onSubmit={handleAddCategorySubmit} className="mb-5 p-4 bg-surface rounded-xl border border-border">
          <label className="block text-xs font-bold text-primary-text mb-1.5">
            New Skill Category Title
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="e.g. Cloud & DevOps, Databases, Soft Skills"
              className="flex-1 px-3 py-2 text-sm border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-primary-text"
              autoFocus
            />
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-white bg-primary hover:bg-primary-hover rounded-lg"
            >
              Add Category
            </button>
            <button
              type="button"
              onClick={() => setIsAddingCategory(false)}
              className="px-3 py-2 text-xs font-semibold text-secondary-text border border-border rounded-lg bg-white hover:bg-slate-50"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Categories List */}
      <div className="space-y-4">
        {skillCategories.map((category) => (
          <div key={category.id} className="p-4 rounded-xl border border-border bg-surface">
            <div className="flex items-center justify-between mb-3">
              <input
                type="text"
                value={category.categoryName}
                onChange={(e) => updateSkillCategory(category.id, e.target.value)}
                className="font-bold text-sm text-primary-text bg-transparent border-b border-transparent hover:border-border focus:border-primary focus:outline-none px-1 py-0.5"
              />
              <button
                type="button"
                onClick={() => deleteSkillCategory(category.id)}
                title="Delete Category"
                className="p-1 text-muted-text hover:text-error rounded"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Skill tags */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {category.skills.map((skill, sIdx) => (
                <span
                  key={sIdx}
                  className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium bg-white text-primary-text rounded-md border border-border shadow-2xs group"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => removeSkillFromCategory(category.id, sIdx)}
                    className="text-muted-text hover:text-error"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              {category.skills.length === 0 && (
                <span className="text-xs text-muted-text italic">No skills added in this category yet.</span>
              )}
            </div>

            {/* Input to add skill */}
            <div className="flex gap-2">
              <input
                type="text"
                value={skillInputMap[category.id] || ''}
                onChange={(e) => setSkillInputMap({ ...skillInputMap, [category.id]: e.target.value })}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSkill(category.id);
                  }
                }}
                placeholder="Type skill name and press Enter (e.g. Python, Docker, React)"
                className="flex-1 px-3 py-1.5 text-xs border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 text-primary-text"
              />
              <button
                type="button"
                onClick={() => handleAddSkill(category.id)}
                className="px-3 py-1.5 text-xs font-semibold text-primary bg-primary-light hover:bg-blue-100 rounded-lg border border-primary/20"
              >
                Add Skill
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
