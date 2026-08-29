/**
 * PDF Generation Utility for Resume Maker
 * Generates clean, searchable, watermark-free A4 PDFs with standard naming convention.
 */

export const getResumeFileName = (fullName: string): string => {
  const clean = fullName
    .trim()
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .split(/\s+/)
    .filter(Boolean)
    .join('_');
  return clean ? `${clean}_Resume.pdf` : 'Resume.pdf';
};

export const exportResumeToPdf = async (
  elementId: string,
  fullName: string,
  onProgress?: (progress: number) => void
): Promise<boolean> => {
  if (typeof window === 'undefined') return false;

  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with id #${elementId} not found for PDF export.`);
    return false;
  }

  const filename = getResumeFileName(fullName);

  try {
    // Dynamic import to avoid SSR issues
    // @ts-ignore
    const html2pdf = (await import('html2pdf.js')).default || (await import('html2pdf.js'));

    const opt = {
      margin: 0,
      filename: filename,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        letterRendering: true,
        logging: false,
      },
      jsPDF: {
        unit: 'mm',
        format: 'a4',
        orientation: 'portrait',
      },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
    };

    if (onProgress) onProgress(30);

    await html2pdf().set(opt).from(element).save();

    if (onProgress) onProgress(100);
    return true;
  } catch (err) {
    console.warn('html2pdf client export failed, falling back to window.print()', err);
    triggerBrowserPrint();
    return false;
  }
};

export const triggerBrowserPrint = (): void => {
  if (typeof window !== 'undefined') {
    window.print();
  }
};
