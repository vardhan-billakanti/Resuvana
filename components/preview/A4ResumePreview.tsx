'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useResume } from '@/context/ResumeContext';
import { TemplateRenderer } from '@/components/templates/TemplateRenderer';
import { exportResumeToPdf, triggerBrowserPrint } from '@/lib/pdfGenerator';
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  Download,
  Printer,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import confetti from 'canvas-confetti';

const A4_WIDTH_PX = 794; // 210mm at 96 DPI
const A4_HEIGHT_PX = 1123; // 297mm at 96 DPI

export const A4ResumePreview: React.FC = () => {
  const { resumeData } = useResume();
  const [zoomLevel, setZoomLevel] = useState<number>(0.65);
  const [docHeight, setDocHeight] = useState<number>(A4_HEIGHT_PX);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const viewportRef = useRef<HTMLDivElement>(null);
  const docRef = useRef<HTMLDivElement>(null);

  // Calculate automatic fit scale based on current viewport dimensions
  const calculateFitScale = useCallback(() => {
    if (!viewportRef.current) return;
    const availWidth = Math.max(viewportRef.current.clientWidth - 32, 200);
    const availHeight = Math.max(viewportRef.current.clientHeight - 32, 300);

    // Calculate scale to fit the whole A4 page (both width and height) with safe margins
    const scaleW = availWidth / A4_WIDTH_PX;
    const scaleH = availHeight / A4_HEIGHT_PX;

    // Use the minimum of scaleW and scaleH so the whole page fits cleanly
    const optimalScale = Math.min(scaleW, scaleH);
    const clampedScale = Math.max(0.3, Math.min(optimalScale, 1.3));
    setZoomLevel(Number(clampedScale.toFixed(2)));
  }, []);

  // Run auto-fit on mount and window resize
  useEffect(() => {
    // slight delay to ensure layout has settled
    const timer = setTimeout(() => {
      calculateFitScale();
    }, 50);

    const handleResize = () => calculateFitScale();
    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, [calculateFitScale]);

  // Track document height dynamically using ResizeObserver for multi-page support
  useEffect(() => {
    if (!docRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect.height > 0) {
          setDocHeight(Math.max(entry.contentRect.height, A4_HEIGHT_PX));
        }
      }
    });
    observer.observe(docRef.current);
    return () => observer.disconnect();
  }, []);

  // Zoom controls (25% to 200% with 10% steps)
  const handleZoomIn = () =>
    setZoomLevel((prev) => Math.min(Number((prev + 0.1).toFixed(2)), 2.0));
  const handleZoomOut = () =>
    setZoomLevel((prev) => Math.max(Number((prev - 0.1).toFixed(2)), 0.25));
  const handleFitClick = () => calculateFitScale();

  const handleDownloadPdf = async () => {
    setIsExporting(true);
    try {
      const success = await exportResumeToPdf('resume-document', resumeData.personalInfo.fullName);
      if (success) {
        confetti({
          particleCount: 75,
          spread: 60,
          origin: { y: 0.8 },
        });
      }
    } catch (e) {
      console.error('PDF export error:', e);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div
      className={`flex flex-col h-full bg-slate-100 rounded-2xl border border-border overflow-hidden select-none ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none bg-slate-900/95 backdrop-blur-md p-3 sm:p-6' : ''
      }`}
    >
      {/* Top Preview Toolbar */}
      <div className="flex flex-wrap items-center justify-between px-3.5 py-2.5 bg-white border-b border-border text-xs gap-2 shrink-0">
        {/* Status Badges */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-50 text-emerald-700 font-semibold rounded-md border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px]">Live Preview</span>
          </div>
          <span className="text-secondary-text hidden sm:inline text-[11px]">A4 Format</span>
        </div>

        {/* Action & Zoom Controls */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {/* Zoom Controls */}
          <div className="flex items-center bg-surface rounded-lg border border-border p-0.5">
            <button
              type="button"
              onClick={handleZoomOut}
              title="Zoom Out"
              className="p-1 hover:bg-white text-secondary-text hover:text-primary-text rounded transition-colors"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="px-1.5 text-[11px] font-bold text-primary-text min-w-[42px] text-center">
              {Math.round(zoomLevel * 100)}%
            </span>
            <button
              type="button"
              onClick={handleZoomIn}
              title="Zoom In"
              className="p-1 hover:bg-white text-secondary-text hover:text-primary-text rounded transition-colors"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleFitClick}
              title="Fit to Screen"
              className="px-2 py-0.5 text-[10px] font-bold text-primary hover:bg-white rounded transition-colors"
            >
              Fit
            </button>
          </div>

          {/* Fullscreen Toggle */}
          <button
            type="button"
            onClick={() => setIsFullscreen(!isFullscreen)}
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Preview'}
            className="p-1.5 hover:bg-surface text-secondary-text hover:text-primary-text rounded-lg border border-border transition-colors"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>

          {/* Print Fallback */}
          <button
            type="button"
            onClick={triggerBrowserPrint}
            title="Print Document"
            className="p-1.5 hover:bg-surface text-secondary-text hover:text-primary-text rounded-lg border border-border hidden sm:inline-flex transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
          </button>

          {/* Download PDF CTA Button */}
          <button
            type="button"
            onClick={handleDownloadPdf}
            disabled={isExporting}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-primary hover:bg-primary-hover rounded-lg shadow-xs transition-all disabled:opacity-50"
          >
            {isExporting ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Exporting...</span>
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

      {/* Scrollable Preview Canvas Viewport */}
      <div
        ref={viewportRef}
        className="flex-1 overflow-auto p-4 flex justify-center items-start custom-scrollbar relative"
      >
        {/* Sizer Container: controls exact proportional layout flow */}
        <div
          style={{
            width: `${A4_WIDTH_PX * zoomLevel}px`,
            height: `${docHeight * zoomLevel}px`,
            position: 'relative',
            flexShrink: 0,
            transition: 'width 100ms ease, height 100ms ease',
          }}
        >
          {/* Inner Document Container: full unscaled A4 page, scaled from top-left */}
          <div
            ref={docRef}
            style={{
              width: `${A4_WIDTH_PX}px`,
              minHeight: `${A4_HEIGHT_PX}px`,
              transform: `scale(${zoomLevel})`,
              transformOrigin: 'top left',
              position: 'absolute',
              top: 0,
              left: 0,
              transition: 'transform 100ms ease',
            }}
          >
            <div className="shadow-2xl rounded-sm bg-white overflow-hidden">
              <TemplateRenderer data={resumeData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
