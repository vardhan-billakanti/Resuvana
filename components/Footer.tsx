import React from 'react';
import Link from 'next/link';
import { FileText, ShieldCheck, CheckCircle2, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-surface border-t border-border mt-16 pt-12 pb-8 text-xs text-secondary-text">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-border">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-xs">
                <FileText className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-sm text-primary-text">Resuvana</span>
            </div>
            <p className="text-xs leading-relaxed text-secondary-text">
              Engineered for students, graduates, and professionals to create clean, ATS-compliant resumes with zero formatting friction.
            </p>
            <div className="flex items-center gap-1 text-[11px] text-emerald-700 font-medium">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Client-Side Privacy</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-primary-text mb-3">Templates</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/templates" className="hover:text-primary transition-colors">
                  Classic ATS (General)
                </Link>
              </li>
              <li>
                <Link href="/templates" className="hover:text-primary transition-colors">
                  Modern Professional (Tech/Business)
                </Link>
              </li>
              <li>
                <Link href="/templates" className="hover:text-primary transition-colors">
                  Graduate & Student (Projects Focus)
                </Link>
              </li>
              <li>
                <Link href="/templates" className="hover:text-primary transition-colors">
                  Executive & Leadership (Impact Focus)
                </Link>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-primary-text mb-3">Capabilities</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/builder" className="hover:text-primary transition-colors">
                  Live A4 Interactive Preview
                </Link>
              </li>
              <li>
                <Link href="/builder" className="hover:text-primary transition-colors">
                  AI Summary & Bullet Generator
                </Link>
              </li>
              <li>
                <Link href="/builder" className="hover:text-primary transition-colors">
                  Instant Searchable PDF Export
                </Link>
              </li>
              <li>
                <Link href="/builder" className="hover:text-primary transition-colors">
                  JSON Data Backup & Restore
                </Link>
              </li>
            </ul>
          </div>

          {/* Privacy & Ethical ATS Note */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-primary-text mb-3">Our Standards</h4>
            <p className="text-[11px] leading-relaxed text-secondary-text mb-2">
              We prioritize strict single-column reading order, standard section names, and searchable text over gimmicky graphic bars.
            </p>
            <p className="text-[10px] text-muted-text leading-normal">
              No account required. Drafts remain securely stored in your browser session.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-[11px]">
          <p>© {new Date().getFullYear()} Resuvana. Built for students & professionals.</p>
          <div className="flex items-center gap-4">
            <Link href="/builder" className="hover:text-primary">
              Builder
            </Link>
            <Link href="/templates" className="hover:text-primary">
              Templates
            </Link>
            <Link href="/#how-it-works" className="hover:text-primary">
              Documentation
            </Link>
          </div>
        </div>

        {/* Creator Attribution */}
        <div className="mt-6 pt-6 border-t border-border flex flex-col items-center justify-center text-center gap-1.5">
          <p className="text-xs text-secondary-text font-normal tracking-wide">
            Designed & Developed by{' '}
            <a
              href="https://vardhanbillakanti.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="creator-credit-link"
            >
              Billakanti Jaya Vardhan
            </a>
          </p>
          <p className="text-[11px] text-muted-text font-normal tracking-wider">
            © 2026 · All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};
