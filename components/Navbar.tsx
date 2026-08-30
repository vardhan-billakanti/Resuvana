'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FileText, Sparkles, LayoutTemplate, ShieldCheck, Menu, X, ArrowRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-border transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white shadow-xs group-hover:bg-primary-hover transition-colors">
              <FileText className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base tracking-tight text-primary-text flex items-center gap-1.5">
                Resuvana
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary-light px-1.5 py-0.2 rounded border border-primary/20">
                  ATS READY
                </span>
              </span>
              <span className="text-[10px] text-secondary-text -mt-0.5">Professional Resume Creator</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            <Link
              href="/templates"
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                pathname === '/templates'
                  ? 'text-primary bg-primary-light'
                  : 'text-secondary-text hover:text-primary-text hover:bg-slate-50'
              }`}
            >
              <LayoutTemplate className="w-3.5 h-3.5" />
              Templates
            </Link>

            <Link
              href="/builder"
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                pathname === '/builder'
                  ? 'text-primary bg-primary-light'
                  : 'text-secondary-text hover:text-primary-text hover:bg-slate-50'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              Builder
            </Link>

            <Link
              href="/#how-it-works"
              className="px-3.5 py-2 rounded-lg text-xs font-semibold text-secondary-text hover:text-primary-text hover:bg-slate-50 transition-colors"
            >
              How It Works
            </Link>

            <Link
              href="/#ats-guide"
              className="px-3.5 py-2 rounded-lg text-xs font-semibold text-secondary-text hover:text-primary-text hover:bg-slate-50 transition-colors flex items-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              ATS Guide
            </Link>
          </div>

          {/* Right Action */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/builder"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-primary hover:bg-primary-hover rounded-xl shadow-xs transition-all transform active:scale-98"
            >
              <span>Create My Resume</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-secondary-text hover:text-primary-text hover:bg-slate-100"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 border-b border-border bg-white space-y-2">
          <Link
            href="/templates"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-semibold text-primary-text hover:bg-slate-50"
          >
            Templates Gallery
          </Link>
          <Link
            href="/builder"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-semibold text-primary-text hover:bg-slate-50"
          >
            Resume Builder
          </Link>
          <Link
            href="/#how-it-works"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-semibold text-primary-text hover:bg-slate-50"
          >
            How It Works
          </Link>
          <Link
            href="/#ats-guide"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-semibold text-primary-text hover:bg-slate-50"
          >
            ATS Guidelines
          </Link>
          <div className="pt-2">
            <Link
              href="/builder"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold text-white bg-primary rounded-xl"
            >
              Create My Resume ↗
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
