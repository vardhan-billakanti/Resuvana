'use client';

import React from 'react';
import { useResume } from '@/context/ResumeContext';
import { User, Briefcase, Mail, Phone, MapPin, Globe, Github, Linkedin, Link as LinkIcon } from 'lucide-react';

export const PersonalInfoSection: React.FC = () => {
  const { resumeData, updatePersonalInfo } = useResume();
  const info = resumeData.personalInfo;

  const isEmailValid = (email: string) => {
    if (!email) return true;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isUrlValid = (url: string) => {
    if (!url) return true;
    try {
      new URL(url.startsWith('http') ? url : `https://${url}`);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <div className="bg-white rounded-xl border border-border p-5 sm:p-6 shadow-subtle">
      <div className="flex items-center justify-between pb-4 border-b border-border mb-5">
        <div>
          <h2 className="text-lg font-bold text-primary-text flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            Personal Information
          </h2>
          <p className="text-xs text-secondary-text mt-0.5">
            Your contact details form the essential header of your resume.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Full Name */}
        <div className="sm:col-span-1">
          <label className="block text-xs font-semibold text-primary-text mb-1">
            Full Name <span className="text-error">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-text">
              <User className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={info.fullName}
              onChange={(e) => updatePersonalInfo({ fullName: e.target.value })}
              placeholder="e.g. Police Manoj"
              className="w-full pl-9 pr-3 py-2 text-sm border border-border rounded-lg bg-surface focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-primary-text"
            />
          </div>
        </div>

        {/* Professional Title */}
        <div className="sm:col-span-1">
          <label className="block text-xs font-semibold text-primary-text mb-1">
            Professional Title / Target Headline <span className="text-error">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-text">
              <Briefcase className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={info.professionalTitle}
              onChange={(e) => updatePersonalInfo({ professionalTitle: e.target.value })}
              placeholder="e.g. Software Engineer or Product Specialist"
              className="w-full pl-9 pr-3 py-2 text-sm border border-border rounded-lg bg-surface focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-primary-text"
            />
          </div>
        </div>

        {/* Email */}
        <div className="sm:col-span-1">
          <label className="block text-xs font-semibold text-primary-text mb-1">
            Email Address <span className="text-error">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-text">
              <Mail className="w-4 h-4" />
            </div>
            <input
              type="email"
              value={info.email}
              onChange={(e) => updatePersonalInfo({ email: e.target.value })}
              placeholder="e.g. you@example.com"
              className={`w-full pl-9 pr-3 py-2 text-sm border rounded-lg bg-surface focus:bg-white focus:outline-none focus:ring-2 transition-colors text-primary-text ${
                info.email && !isEmailValid(info.email)
                  ? 'border-error focus:ring-error/20 focus:border-error'
                  : 'border-border focus:ring-primary/20 focus:border-primary'
              }`}
            />
          </div>
          {info.email && !isEmailValid(info.email) && (
            <p className="text-[11px] text-error mt-1">Please enter a valid email address.</p>
          )}
        </div>

        {/* Phone */}
        <div className="sm:col-span-1">
          <label className="block text-xs font-semibold text-primary-text mb-1">
            Phone Number <span className="text-error">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-text">
              <Phone className="w-4 h-4" />
            </div>
            <input
              type="tel"
              value={info.phone}
              onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
              placeholder="e.g. +1 (555) 019-2834"
              className="w-full pl-9 pr-3 py-2 text-sm border border-border rounded-lg bg-surface focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-primary-text"
            />
          </div>
        </div>

        {/* Location */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold text-primary-text mb-1">
            Location (City, State / Country) <span className="text-error">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-text">
              <MapPin className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={info.location}
              onChange={(e) => updatePersonalInfo({ location: e.target.value })}
              placeholder="e.g. Austin, Texas, United States"
              className="w-full pl-9 pr-3 py-2 text-sm border border-border rounded-lg bg-surface focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-primary-text"
            />
          </div>
        </div>

        {/* LinkedIn */}
        <div className="sm:col-span-1">
          <label className="block text-xs font-semibold text-primary-text mb-1">
            LinkedIn Profile URL <span className="text-muted-text font-normal">(Optional)</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-text">
              <Linkedin className="w-4 h-4" />
            </div>
            <input
              type="url"
              value={info.linkedin || ''}
              onChange={(e) => updatePersonalInfo({ linkedin: e.target.value })}
              placeholder="https://linkedin.com/in/username"
              className="w-full pl-9 pr-3 py-2 text-sm border border-border rounded-lg bg-surface focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-primary-text"
            />
          </div>
        </div>

        {/* GitHub */}
        <div className="sm:col-span-1">
          <label className="block text-xs font-semibold text-primary-text mb-1">
            GitHub Profile URL <span className="text-muted-text font-normal">(Optional)</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-text">
              <Github className="w-4 h-4" />
            </div>
            <input
              type="url"
              value={info.github || ''}
              onChange={(e) => updatePersonalInfo({ github: e.target.value })}
              placeholder="https://github.com/username"
              className="w-full pl-9 pr-3 py-2 text-sm border border-border rounded-lg bg-surface focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-primary-text"
            />
          </div>
        </div>

        {/* Portfolio */}
        <div className="sm:col-span-1">
          <label className="block text-xs font-semibold text-primary-text mb-1">
            Portfolio Website <span className="text-muted-text font-normal">(Optional)</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-text">
              <Globe className="w-4 h-4" />
            </div>
            <input
              type="url"
              value={info.portfolio || ''}
              onChange={(e) => updatePersonalInfo({ portfolio: e.target.value })}
              placeholder="https://yourportfolio.dev"
              className="w-full pl-9 pr-3 py-2 text-sm border border-border rounded-lg bg-surface focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-primary-text"
            />
          </div>
        </div>

        {/* Custom Link */}
        <div className="sm:col-span-1">
          <label className="block text-xs font-semibold text-primary-text mb-1">
            Other Professional Link <span className="text-muted-text font-normal">(Optional)</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-text">
              <LinkIcon className="w-4 h-4" />
            </div>
            <input
              type="url"
              value={info.otherLink || ''}
              onChange={(e) => updatePersonalInfo({ otherLink: e.target.value })}
              placeholder="https://leetcode.com/username"
              className="w-full pl-9 pr-3 py-2 text-sm border border-border rounded-lg bg-surface focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-primary-text"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
