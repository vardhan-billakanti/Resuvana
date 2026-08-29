'use client';

import React from 'react';
import Link from 'next/link';
import {
  FileText,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  GraduationCap,
  Briefcase,
  Download,
  Eye,
  Check,
  ChevronRight,
} from 'lucide-react';
import { TEMPLATES } from '@/lib/sampleResumes';
import { useResume } from '@/context/ResumeContext';
import { useRouter } from 'next/navigation';
import { TemplateId } from '@/types/resume';
import { TemplateThumbnail } from '@/components/templates/TemplateThumbnail';

export default function LandingPage() {
  const { setTemplate } = useResume();
  const router = useRouter();

  const handleSelectTemplateAndBuild = (templateId: TemplateId) => {
    setTemplate(templateId);
    router.push('/builder');
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 1. Hero Section */}
      <section className="relative pt-12 pb-20 sm:pt-16 sm:pb-24 border-b border-border bg-gradient-to-b from-surface via-white to-white overflow-hidden">
        {/* Subtle geometric background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary/20 text-xs font-semibold text-primary shadow-2xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Built for College Students, Graduates & Experienced Professionals</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-primary-text tracking-tight leading-[1.15]">
              Build a professional resume{' '}
              <span className="text-primary underline decoration-primary/30 decoration-wavy underline-offset-8">
                without the formatting headache.
              </span>
            </h1>

            {/* Supporting Subtitle */}
            <p className="text-base sm:text-lg text-secondary-text max-w-2xl mx-auto leading-relaxed">
              Choose from 6 professional templates, add your experience and skills, refine your content with AI tools, and download a polished A4 resume ready for applications.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                href="/builder"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-bold text-white bg-primary hover:bg-primary-hover rounded-xl shadow-xs transition-all transform active:scale-98"
              >
                <span>Create My Resume</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/templates"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-primary-text bg-white hover:bg-surface border border-border rounded-xl transition-colors"
              >
                <span>Explore Templates (6)</span>
              </Link>
            </div>

            {/* Trust Highlights */}
            <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 pt-6 text-xs text-secondary-text">
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-success" /> ATS-Friendly Templates
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-success" /> No Sign-Up Required
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-success" /> Clean Searchable A4 PDF
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-success" /> No Watermarks
              </span>
            </div>
          </div>

          {/* Interactive Hero Visual Showcase */}
          <div className="mt-14 max-w-4xl mx-auto rounded-2xl border border-border bg-white shadow-2xl p-4 sm:p-6">
            <div className="flex items-center justify-between pb-4 border-b border-border mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <span className="text-xs font-semibold text-secondary-text ml-2">
                  ResumeMaker Workspace — Live A4 Document
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  ATS-Friendly Preview
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              {/* Left Column: Feature Highlights */}
              <div className="md:col-span-5 space-y-3.5">
                <div className="p-3 bg-surface rounded-xl border border-border">
                  <div className="flex items-center gap-2 font-bold text-xs text-primary-text mb-1">
                    <Sparkles className="w-4 h-4 text-primary" />
                    AI-Enhanced STAR Bullets
                  </div>
                  <p className="text-[11px] text-secondary-text leading-relaxed">
                    Refines rough bullet points into structured achievements (Action + Task + Result).
                  </p>
                </div>

                <div className="p-3 bg-surface rounded-xl border border-border">
                  <div className="flex items-center gap-2 font-bold text-xs text-primary-text mb-1">
                    <GraduationCap className="w-4 h-4 text-teal-700" />
                    Student & Fresher Ready
                  </div>
                  <p className="text-[11px] text-secondary-text leading-relaxed">
                    Prioritizes technical projects, coursework, CGPA/GPA, and internships for maximum clarity.
                  </p>
                </div>

                <div className="p-3 bg-surface rounded-xl border border-border">
                  <div className="flex items-center gap-2 font-bold text-xs text-primary-text mb-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    Machine-Readable Architecture
                  </div>
                  <p className="text-[11px] text-secondary-text leading-relaxed">
                    Standard typography, single-column reading order, and 100% selectable text.
                  </p>
                </div>

                <Link
                  href="/builder"
                  className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-bold text-white bg-primary hover:bg-primary-hover rounded-xl shadow-xs transition-colors"
                >
                  Start Building Your Resume ↗
                </Link>
              </div>

              {/* Right Column: Mini Resume Preview Card with Fictional Data (Police Manoj) */}
              <div className="md:col-span-7 bg-slate-50 p-4 rounded-xl border border-border flex justify-center">
                <div className="w-full max-w-sm bg-white p-5 rounded shadow-md border border-gray-200 text-[10px] text-gray-800 space-y-2">
                  <div className="border-b-2 border-primary pb-1.5">
                    <h3 className="font-extrabold text-xs text-gray-950">POLICE MANOJ</h3>
                    <p className="text-primary font-semibold text-[9px]">Aspiring Software Engineer</p>
                    <p className="text-gray-500 text-[8px]">Hyderabad, India • police.manoj@example.com • +91 90000 00000</p>
                  </div>

                  <div>
                    <h4 className="font-bold uppercase text-[9px] text-primary border-b border-gray-100 pb-0.5">Education</h4>
                    <p className="font-bold text-gray-900">B.Tech in Computer Science and Engineering</p>
                    <p className="text-gray-600">HIT &amp; Science • CGPA: 8.7/10.0 • 2022–2026</p>
                  </div>

                  <div>
                    <h4 className="font-bold uppercase text-[9px] text-primary border-b border-gray-100 pb-0.5">Key Projects</h4>
                    <p className="font-bold text-gray-900">Distributed Task Queue Engine (TypeScript, Redis)</p>
                    <p className="text-gray-600">• Built asynchronous worker pool processing 2,500 jobs/minute with automated retries.</p>
                  </div>

                  <div>
                    <h4 className="font-bold uppercase text-[9px] text-primary border-b border-gray-100 pb-0.5">Technical Skills</h4>
                    <p className="text-gray-700">Python, Java, TypeScript, React.js, Next.js, Docker, PostgreSQL, Redis, Git</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Real Template Showcase Grid (6 Templates in 3x2 Grid) */}
      <section className="py-16 sm:py-20 bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-primary-text tracking-tight">
              6 Professional ATS-Conscious Templates
            </h2>
            <p className="text-sm text-secondary-text mt-2">
              Clean, conservative, and designed specifically for high readability and structured parsing.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEMPLATES.map((tmpl) => (
              <div
                key={tmpl.id}
                className="bg-white rounded-2xl border border-border overflow-hidden shadow-subtle hover:shadow-card-hover transition-all flex flex-col group"
              >
                {/* Real Miniature Template Thumbnail */}
                <div className="h-64 bg-slate-100/70 p-3 border-b border-border flex flex-col justify-between relative overflow-hidden group-hover:bg-slate-100 transition-colors">
                  <div className="flex justify-between items-center z-10 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white text-primary-text border border-border shadow-2xs">
                      {tmpl.category}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      ATS-Friendly
                    </span>
                  </div>

                  {/* Authentic Micro Resume Component */}
                  <div className="flex-1 w-full flex items-center justify-center overflow-hidden">
                    <TemplateThumbnail templateId={tmpl.id} />
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-bold text-base text-primary-text">{tmpl.name}</h3>
                    <p className="text-xs text-secondary-text mt-1 leading-relaxed">
                      {tmpl.description}
                    </p>

                    <div className="mt-3 pt-3 border-t border-border/80">
                      <span className="text-[11px] font-bold text-primary-text block mb-1">
                        Best suited for:
                      </span>
                      <p className="text-[11px] text-secondary-text">{tmpl.bestSuitedFor}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSelectTemplateAndBuild(tmpl.id)}
                    className="w-full flex items-center justify-center gap-1.5 py-2.5 text-xs font-bold text-primary bg-primary-light hover:bg-primary hover:text-white rounded-xl transition-all border border-primary/20"
                  >
                    <span>Use Template</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/templates"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
            >
              <span>View full template gallery</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. How It Works Workflow */}
      <section id="how-it-works" className="py-16 sm:py-20 bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Simple 3-Step Process</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-primary-text tracking-tight mt-1">
              How Resume Maker Works
            </h2>
            <p className="text-sm text-secondary-text mt-2">
              Guided progression that turns your credentials into a clean, interview-ready document.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="bg-surface rounded-2xl border border-border p-6 relative">
              <div className="w-10 h-10 rounded-xl bg-primary text-white font-extrabold text-base flex items-center justify-center mb-4 shadow-xs">
                1
              </div>
              <h3 className="font-bold text-base text-primary-text mb-2">Choose an ATS Template</h3>
              <p className="text-xs text-secondary-text leading-relaxed">
                Select from 6 layouts (Classic ATS, Modern Professional, Graduate, Executive, Minimal, Technical Specialist) tailored to your career stage.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-surface rounded-2xl border border-border p-6 relative">
              <div className="w-10 h-10 rounded-xl bg-primary text-white font-extrabold text-base flex items-center justify-center mb-4 shadow-xs">
                2
              </div>
              <h3 className="font-bold text-base text-primary-text mb-2">Enter Details & Refine with AI</h3>
              <p className="text-xs text-secondary-text leading-relaxed">
                Fill in structured sections. Use our AI Summary & Bullet improver to enhance responsibilities into high-impact STAR achievements.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-surface rounded-2xl border border-border p-6 relative">
              <div className="w-10 h-10 rounded-xl bg-primary text-white font-extrabold text-base flex items-center justify-center mb-4 shadow-xs">
                3
              </div>
              <h3 className="font-bold text-base text-primary-text mb-2">Download A4 PDF</h3>
              <p className="text-xs text-secondary-text leading-relaxed">
                Export an exact A4 PDF with 100% searchable text, correct typography, zero watermarks, and auto-formatted filename.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Use Cases: Student vs Professional */}
      <section className="py-16 sm:py-20 bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-primary-text tracking-tight">
              Tailored for Every Career Stage
            </h2>
            <p className="text-sm text-secondary-text mt-2">
              Whether you are applying for your first internship or leading engineering teams, we prioritize what matters most.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Student Card */}
            <div className="bg-white rounded-2xl border border-border p-6 sm:p-8 shadow-subtle space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-teal-50 text-teal-700">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-primary-text">College Students & Freshers</h3>
                  <p className="text-xs text-secondary-text">Internship & Campus Placement Focus</p>
                </div>
              </div>

              <p className="text-xs text-secondary-text leading-relaxed">
                Students without extensive corporate tenure need to highlight academic excellence, coursework, practical projects, and technical proficiencies.
              </p>

              <ul className="space-y-2 text-xs text-primary-text pt-2">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-teal-600" />
                  <span>Projects-first architecture with tech stacks & GitHub repository links</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-teal-600" />
                  <span>Prominent Degree, CGPA/GPA, and relevant academic coursework</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-teal-600" />
                  <span>Categorized Technical Skills without misleading percentage bars</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-teal-600" />
                  <span>Dedicated Internships & Industrial Training section</span>
                </li>
              </ul>

              <Link
                href="/builder"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 text-xs font-bold text-teal-800 bg-teal-50 hover:bg-teal-100 rounded-xl transition-colors border border-teal-200 mt-2"
              >
                <span>Build Graduate Resume</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Professional Card */}
            <div className="bg-white rounded-2xl border border-border p-6 sm:p-8 shadow-subtle space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-blue-50 text-primary">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-primary-text">Experienced Professionals</h3>
                  <p className="text-xs text-secondary-text">Impact & Career Progression Focus</p>
                </div>
              </div>

              <p className="text-xs text-secondary-text leading-relaxed">
                Experienced candidates need clear career progression, quantifiable business impact, system architecture scope, and leadership competencies.
              </p>

              <ul className="space-y-2 text-xs text-primary-text pt-2">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary" />
                  <span>Impact-oriented bullet points using the STAR method</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary" />
                  <span>Executive summary generator emphasizing core technical leadership</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary" />
                  <span>Clear promotion timeline, company names, and date ranges</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary" />
                  <span>Certifications, honors, and speaking engagements</span>
                </li>
              </ul>

              <Link
                href="/builder"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 text-xs font-bold text-primary bg-primary-light hover:bg-blue-100 rounded-xl transition-colors border border-primary/20 mt-2"
              >
                <span>Build Professional Resume</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ATS Guide Breakdown */}
      <section id="ats-guide" className="py-16 sm:py-20 bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Applicant Tracking System (ATS) Insights</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-primary-text tracking-tight">
                Understanding ATS Readability & Machine Parsing
              </h2>
              <p className="text-xs sm:text-sm text-secondary-text leading-relaxed">
                Applicant Tracking Systems parse incoming resumes by converting document content into structured candidate records. Complex multi-column layouts, decorative graphics, and text embedded in images can interfere with parsing in some applicant tracking systems.
              </p>

              <div className="space-y-2.5 pt-2 text-xs">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-primary-text">Standard Section Headings:</span>
                    <span className="text-secondary-text"> Uses recognizable headers like Experience, Education, and Skills so parsers correctly categorize entries.</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-primary-text">Linear Reading Order:</span>
                    <span className="text-secondary-text"> Predictable single-column structure helps prevent text mixing during document extraction.</span>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-success shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-primary-text">Selectable, Searchable Text:</span>
                    <span className="text-secondary-text"> Content remains readable and indexable without relying on rasterized graphics.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 bg-surface p-6 rounded-2xl border border-border">
              <h3 className="font-bold text-sm text-primary-text mb-4">Formatting Best Practices</h3>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl">
                  <span className="font-bold text-amber-900 block mb-0.5">⚠️ Avoid Arbitrary Rating Bars (e.g. &quot;Java 90%&quot;)</span>
                  <span className="text-secondary-text text-[11px]">
                    Decorative percentage bars cannot be meaningfully parsed by automated systems and provide little evidence of real competence. List categorized skills with concrete project evidence instead.
                  </span>
                </div>

                <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl">
                  <span className="font-bold text-amber-900 block mb-0.5">⚠️ Use Conventional Section Names</span>
                  <span className="text-secondary-text text-[11px]">
                    Unusual headings like &quot;My Story&quot; or &quot;What I Know&quot; may be skipped by keyword extractors. Use standard industry conventions like &quot;Professional Experience&quot; and &quot;Technical Skills&quot;.
                  </span>
                </div>

                <div className="p-3 bg-emerald-50/60 border border-emerald-200 rounded-xl">
                  <span className="font-bold text-emerald-800 block mb-0.5">✓ Our Approach: Clean Typography + Clear Evidence</span>
                  <span className="text-secondary-text text-[11px]">
                    Present your qualifications with structured sections, action-oriented bullet points, and verified credentials.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Call To Action Banner */}
      <section className="py-16 sm:py-20 bg-primary text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Ready to build your polished resume?
          </h2>
          <p className="text-sm sm:text-base text-blue-100 max-w-2xl mx-auto">
            No registration required. Interactive live A4 preview with instant PDF download.
          </p>
          <div className="pt-2">
            <Link
              href="/builder"
              className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold text-primary bg-white hover:bg-slate-50 rounded-xl shadow-lg transition-all transform active:scale-98"
            >
              <span>Create My Resume</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
