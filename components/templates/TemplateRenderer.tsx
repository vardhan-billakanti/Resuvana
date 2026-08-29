import React from 'react';
import { ResumeData } from '@/types/resume';
import { TemplateClassicAts } from './TemplateClassicAts';
import { TemplateModernProfessional } from './TemplateModernProfessional';
import { TemplateGraduate } from './TemplateGraduate';
import { TemplateExecutive } from './TemplateExecutive';
import { TemplateMinimal } from './TemplateMinimal';
import { TemplateTechnical } from './TemplateTechnical';

interface TemplateRendererProps {
  data: ResumeData;
}

export const TemplateRenderer: React.FC<TemplateRendererProps> = ({ data }) => {
  const templateId = data.settings?.templateId || 'classic-ats';

  switch (templateId) {
    case 'modern-professional':
      return <TemplateModernProfessional data={data} />;
    case 'graduate':
      return <TemplateGraduate data={data} />;
    case 'executive':
      return <TemplateExecutive data={data} />;
    case 'minimal-professional':
      return <TemplateMinimal data={data} />;
    case 'technical-specialist':
      return <TemplateTechnical data={data} />;
    case 'classic-ats':
    default:
      return <TemplateClassicAts data={data} />;
  }
};
