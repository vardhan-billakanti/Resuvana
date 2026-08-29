'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useResume } from '@/context/ResumeContext';
import { TemplateRenderer } from '@/components/templates/TemplateRenderer';
import { TEMPLATES } from '@/lib/sampleResumes';
import { TemplateId } from '@/types/resume';
import { exportResumeToPdf, triggerBrowserPrint } from '@/lib/pdfGenerator';
import {
  ArrowLeft,
  Download,
  Printer,
  LayoutTemplate,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  RefreshCw,
  Info,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PreviewPage() {
  const { resumeData, setTemplate, resetDraft } = useResume();
  const [isExporting, setIsExporting] = useState(false);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [showPrintTips, setShowPrintTips] = useState(false);

  const handleDownloadPdf = async () => {
    setIsExporting(true);
    try {
      const success = await exportResumeToPdf('resume-preview-document', resumeData.personalInfo.fullName);
      if (success) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Floating Sticky Action Bar */}
      <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-b border-border py-3 px-4 sm:px-6 shadow-xs no-print">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Left: Back to Editor & Template Switcher */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
            <Link
              href="/builder"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-primary bg-primary-light hover:bg-blue-100 border border-primary/20 rounded-xl transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Edit Resume</span>
            </Link>

            <div className="flex items-center gap-1.5 text-xs bg-surface border border-border rounded-lg px-2.5 py-1">
              <span className="text-secondary-text font-medium">Template:</span>
              <select
                value={resumeData.settings.templateId}
                onChange={(e) => setTemplate(e.target.value as TemplateId)}
                className="bg-transparent font-bold text-primary-text focus:outline-none cursor-pointer"
              >
                {TEMPLATES.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Right: Export & Print actions */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={() => setShowPrintTips(!showPrintTips)}
              className="p-2 text-secondary-text hover:text-primary-text bg-surface hover:bg-slate-100 border border-border rounded-lg"
              title="Print guidelines"
            >
              <Info className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={triggerBrowserPrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-secondary-text hover:text-primary-text bg-white border border-border rounded-xl hover:bg-slate-50 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={isExporting}
              className="inline-flex items-center gap-2 px-5 py-2 text-xs font-bold text-white bg-primary hover:bg-primary-hover rounded-xl shadow-xs transition-colors disabled:opacity-50"
            >
              {isExporting ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Exporting PDF...</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Print Helper Dropdown */}
        {showPrintTips && (
          <div className="max-w-5xl mx-auto mt-3 p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs text-blue-900 flex justify-between items-start">
            <div className="space-y-1">
              <span className="font-bold block">💡 Browser Print Optimization Tips:</span>
              <p>1. In the Print dialog, set <strong>Destination</strong> to &quot;Save as PDF&quot;.</p>
              <p>2. Set <strong>Paper Size</strong> to &quot;A4&quot;.</p>
              <p>3. Set <strong>Margins</strong> to &quot;None&quot; or &quot;Default&quot; and check <strong>Background Graphics</strong>.</p>
            </div>
            <button
              type="button"
              onClick={() => setShowPrintTips(false)}
              className="text-blue-700 hover:text-blue-900 font-bold p-1"
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {/* Document Viewport */}
      <div className="flex-1 overflow-auto py-8 px-4 flex justify-center items-start">
        <div className="shadow-2xl rounded-sm overflow-hidden bg-white max-w-full">
          <div id="resume-preview-document">
            <TemplateRenderer data={resumeData} />
          </div>
        </div>
      </div>
    </div>
  );
}
