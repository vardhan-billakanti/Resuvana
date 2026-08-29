import React from 'react';
import { ResumeData } from '@/types/resume';

interface TemplateProps {
  data: ResumeData;
}

export const TemplateExecutive: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, summary, education, experience, internships, skills, projects, certifications, achievements, awards, publications, languages, interests, customSections, settings, enabledSections } = data;

  const fontClass =
    settings.font === 'merriweather' || settings.font === 'garamond'
      ? 'font-serif'
      : 'font-sans';

  const marginClass =
    settings.margins === 'compact' ? 'p-8' : settings.margins === 'wide' ? 'p-14' : 'p-10';

  const fontSizeClass =
    settings.fontSize === 'small' ? 'text-[11px] leading-[1.4]' : settings.fontSize === 'large' ? 'text-[13px] leading-[1.6]' : 'text-[12px] leading-[1.5]';

  const isBlank = !personalInfo.fullName && !summary.summaryText && education.length === 0 && skills.length === 0;

  return (
    <div
      className={`a4-page bg-white text-gray-900 ${fontClass} ${marginClass} ${fontSizeClass} shadow-resume mx-auto transition-all`}
      id="resume-document"
    >
      {/* Executive Header */}
      <header className="text-center pb-4 border-b-2 border-slate-900 mb-4 page-break-avoid">
        <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-widest text-slate-950">
          {personalInfo.fullName || 'YOUR FULL NAME'}
        </h1>
        <p className="text-sm font-semibold tracking-wider uppercase text-slate-700 mt-1">
          {personalInfo.professionalTitle || 'Executive Title / Strategic Leadership Role'}
        </p>

        <div className="flex flex-wrap justify-center items-center gap-x-3 text-xs text-slate-600 mt-2.5">
          <div>{personalInfo.location || 'City, State, Country'}</div>
          <span>|</span>
          <span>{personalInfo.phone || '+1 (555) 000-0000'}</span>
          <span>|</span>
          {personalInfo.email ? (
            <a href={`mailto:${personalInfo.email}`} className="text-slate-900 hover:underline">
              {personalInfo.email}
            </a>
          ) : (
            <span className="text-slate-400">you@example.com</span>
          )}
          {personalInfo.linkedin && (
            <>
              <span>|</span>
              <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="text-slate-900 hover:underline">
                LinkedIn
              </a>
            </>
          )}
          {personalInfo.portfolio && (
            <>
              <span>|</span>
              <a href={personalInfo.portfolio} target="_blank" rel="noreferrer" className="text-slate-900 hover:underline">
                Executive Portfolio
              </a>
            </>
          )}
        </div>
      </header>

      {/* Executive Summary */}
      {enabledSections.summary && (summary.summaryText || isBlank) && (
        <section className="mb-4 page-break-avoid">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-0.5 mb-2">
            Executive Profile
          </h2>
          <p className="text-slate-800 text-justify leading-relaxed">
            {summary.summaryText || (
              <span className="text-slate-400 italic">
                Add an executive profile emphasizing your strategic vision, leadership milestones, and business impact...
              </span>
            )}
          </p>
        </section>
      )}

      {/* Core Competencies & Skills */}
      {enabledSections.skills && (skills.length > 0 || isBlank) && (
        <section className="mb-4 page-break-avoid">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-0.5 mb-2">
            Core Competencies & Areas of Expertise
          </h2>
          {skills.length === 0 ? (
            <p className="text-xs text-slate-400 italic">Add your executive competencies, strategic areas, and technical proficiencies...</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
              {skills.map((category) => (
                <div key={category.id} className="border-l-2 border-slate-800 pl-2">
                  <div className="font-bold text-slate-900 text-[11px] uppercase">{category.categoryName}</div>
                  <div className="text-slate-700">{category.skills.join(', ')}</div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Executive Experience */}
      {enabledSections.experience && experience.length > 0 && (
        <section className="mb-4 page-break-avoid">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-0.5 mb-2.5">
            Professional Experience & Leadership
          </h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id} className="page-break-avoid">
                <div className="flex justify-between items-baseline font-bold text-slate-950 text-[13px]">
                  <span>{exp.jobTitle || 'Executive Title'}</span>
                  <span className="text-xs font-normal text-slate-600">
                    {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div className="flex justify-between items-baseline text-xs font-semibold text-slate-800 mb-1">
                  <span>{exp.company || 'Organization Name'}</span>
                  <span className="font-normal italic text-slate-600">{exp.location}</span>
                </div>
                {exp.description && <p className="text-slate-800 mb-1.5">{exp.description}</p>}
                {exp.bulletPoints && exp.bulletPoints.length > 0 && exp.bulletPoints[0] !== '' && (
                  <ul className="list-disc list-outside ml-4 space-y-1 text-slate-800">
                    {exp.bulletPoints.filter(Boolean).map((bullet, idx) => (
                      <li key={idx}>{bullet}</li>
                    ))}
                  </ul>
                )}
                {exp.achievements && (
                  <div className="text-xs bg-slate-50 border-l-2 border-slate-800 p-1.5 mt-1.5">
                    <span className="font-bold text-slate-900">Key Business Impact:</span> {exp.achievements}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {enabledSections.education && (education.length > 0 || isBlank) && (
        <section className="mb-4 page-break-avoid">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-0.5 mb-2">
            Education & Academic Credentials
          </h2>
          {education.length === 0 ? (
            <p className="text-xs text-slate-400 italic">Add your academic degrees and executive credentials...</p>
          ) : (
            <div className="space-y-2">
              {education.map((edu) => (
                <div key={edu.id} className="page-break-avoid">
                  <div className="flex justify-between items-baseline font-bold text-slate-950">
                    <span>{edu.institution || 'University / Institution'}</span>
                    <span className="text-xs font-normal text-slate-600">
                      {edu.startDate} – {edu.endDate}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline text-xs text-slate-800">
                    <span>{edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}</span>
                    <span className="italic text-slate-600">{edu.location}</span>
                  </div>
                  {edu.academicAchievements && (
                    <p className="text-xs text-slate-600 mt-0.5">{edu.academicAchievements}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Certifications, Board & Honors */}
      {((enabledSections.certifications && certifications.length > 0) ||
        (enabledSections.achievements && achievements.length > 0)) && (
        <section className="mb-3 page-break-avoid">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-900 border-b border-slate-300 pb-0.5 mb-2">
            Board Positions, Certifications & Honors
          </h2>
          <div className="space-y-1.5 text-xs">
            {enabledSections.certifications &&
              certifications.map((cert) => (
                <div key={cert.id} className="flex justify-between items-baseline">
                  <span className="text-slate-900">
                    <span className="font-bold">{cert.certificationName}</span> — {cert.issuingOrganization}
                  </span>
                  <span className="text-slate-600">{cert.issueDate}</span>
                </div>
              ))}
            {enabledSections.achievements &&
              achievements.map((ach) => (
                <div key={ach.id} className="text-xs pt-0.5">
                  <span className="font-bold text-slate-900">{ach.achievement}</span>
                  {ach.organization && <span>, {ach.organization}</span>}
                  {ach.date && <span className="text-slate-600"> ({ach.date})</span>}
                  {ach.description && <p className="text-slate-700 mt-0.5">{ach.description}</p>}
                </div>
              ))}
          </div>
        </section>
      )}
    </div>
  );
};
