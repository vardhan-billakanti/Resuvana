import React from 'react';
import { ResumeData } from '@/types/resume';

interface TemplateProps {
  data: ResumeData;
}

export const TemplateModernProfessional: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, summary, education, experience, internships, skills, projects, certifications, achievements, awards, publications, languages, interests, customSections, settings, enabledSections } = data;

  const accentColor = settings.accentColor || '#2563EB';

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
      {/* Header Banner */}
      <header className="pb-3 border-b-2 mb-4 page-break-avoid" style={{ borderColor: accentColor }}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-950">
              {personalInfo.fullName || 'YOUR FULL NAME'}
            </h1>
            <p className="text-sm font-semibold mt-0.5" style={{ color: accentColor }}>
              {personalInfo.professionalTitle || 'Professional Title / Headline'}
            </p>
          </div>
          <div className="text-right text-xs text-gray-600 space-y-0.5">
            <div>{personalInfo.location || 'City, State, Country'}</div>
            <div className="flex items-center gap-2 justify-start sm:justify-end">
              <span>{personalInfo.phone || '+1 (555) 000-0000'}</span>
              <span>•</span>
              {personalInfo.email ? (
                <a href={`mailto:${personalInfo.email}`} className="text-gray-900 hover:underline font-medium">
                  {personalInfo.email}
                </a>
              ) : (
                <span className="text-gray-400">you@example.com</span>
              )}
            </div>
          </div>
        </div>

        {/* Links row */}
        {(personalInfo.linkedin || personalInfo.github || personalInfo.portfolio || personalInfo.otherLink) && (
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-600 mt-2.5 pt-2 border-t border-gray-100">
            {personalInfo.linkedin && (
              <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="text-gray-800 hover:underline">
                <span className="font-semibold" style={{ color: accentColor }}>LinkedIn:</span> {personalInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}
              </a>
            )}
            {personalInfo.github && (
              <a href={personalInfo.github} target="_blank" rel="noreferrer" className="text-gray-800 hover:underline">
                <span className="font-semibold" style={{ color: accentColor }}>GitHub:</span> {personalInfo.github.replace(/^https?:\/\/(www\.)?github\.com\//, '')}
              </a>
            )}
            {personalInfo.portfolio && (
              <a href={personalInfo.portfolio} target="_blank" rel="noreferrer" className="text-gray-800 hover:underline">
                <span className="font-semibold" style={{ color: accentColor }}>Portfolio:</span> {personalInfo.portfolio.replace(/^https?:\/\//, '')}
              </a>
            )}
          </div>
        )}
      </header>

      {/* Professional Summary */}
      {enabledSections.summary && (summary.summaryText || isBlank) && (
        <section className="mb-4 page-break-avoid">
          <h2
            className="text-xs font-bold uppercase tracking-wider pb-0.5 mb-1.5 flex items-center gap-2"
            style={{ color: accentColor }}
          >
            <span>Professional Summary</span>
            <span className="flex-1 h-[1px] bg-gray-200" />
          </h2>
          <p className="text-gray-800 text-justify">
            {summary.summaryText || (
              <span className="text-gray-400 italic">
                Add a professional overview highlighting your technical strengths, accomplishments, and career direction...
              </span>
            )}
          </p>
        </section>
      )}

      {/* Experience */}
      {enabledSections.experience && experience.length > 0 && (
        <section className="mb-4 page-break-avoid">
          <h2
            className="text-xs font-bold uppercase tracking-wider pb-0.5 mb-2 flex items-center gap-2"
            style={{ color: accentColor }}
          >
            <span>Professional Experience</span>
            <span className="flex-1 h-[1px] bg-gray-200" />
          </h2>
          <div className="space-y-3.5">
            {experience.map((exp) => (
              <div key={exp.id} className="page-break-avoid">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-gray-900 text-[13px]">{exp.jobTitle || 'Job Title'}</span>
                  <span className="text-xs font-medium text-gray-600 bg-gray-100 px-1.5 py-0.5 rounded">
                    {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div className="flex justify-between items-baseline text-xs text-gray-700 mb-1 font-medium">
                  <span style={{ color: accentColor }}>{exp.company || 'Company Name'}</span>
                  <span className="text-gray-500 italic">{exp.location}</span>
                </div>
                {exp.description && <p className="text-gray-800 mb-1">{exp.description}</p>}
                {exp.bulletPoints && exp.bulletPoints.length > 0 && exp.bulletPoints[0] !== '' && (
                  <ul className="list-disc list-outside ml-4 space-y-1 text-gray-800">
                    {exp.bulletPoints.filter(Boolean).map((bullet, idx) => (
                      <li key={idx}>{bullet}</li>
                    ))}
                  </ul>
                )}
                {exp.achievements && (
                  <p className="text-xs text-gray-800 mt-1 pl-2 border-l-2" style={{ borderColor: accentColor }}>
                    <span className="font-semibold text-gray-950">Achievement:</span> {exp.achievements}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {enabledSections.projects && projects.length > 0 && (
        <section className="mb-4 page-break-avoid">
          <h2
            className="text-xs font-bold uppercase tracking-wider pb-0.5 mb-2 flex items-center gap-2"
            style={{ color: accentColor }}
          >
            <span>Key Projects</span>
            <span className="flex-1 h-[1px] bg-gray-200" />
          </h2>
          <div className="space-y-3">
            {projects.map((proj) => (
              <div key={proj.id} className="page-break-avoid">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-gray-900">{proj.projectName || 'Project Title'}</span>
                  {(proj.startDate || proj.endDate) && (
                    <span className="text-xs text-gray-500">
                      {proj.startDate} {proj.endDate ? `– ${proj.endDate}` : ''}
                    </span>
                  )}
                </div>
                {proj.technologies && proj.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1 my-1">
                    {proj.technologies.map((t, idx) => (
                      <span key={idx} className="text-[10px] font-medium bg-slate-100 text-slate-700 px-1.5 py-0.2 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
                {proj.shortDescription && <p className="text-gray-800 mb-1">{proj.shortDescription}</p>}
                {proj.keyContributions && proj.keyContributions.length > 0 && proj.keyContributions[0] !== '' && (
                  <ul className="list-disc list-outside ml-4 space-y-0.5 text-gray-800">
                    {proj.keyContributions.filter(Boolean).map((bullet, idx) => (
                      <li key={idx}>{bullet}</li>
                    ))}
                  </ul>
                )}
                <div className="flex gap-4 text-xs mt-1">
                  {proj.githubLink && (
                    <a href={proj.githubLink} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                      GitHub Repository ↗
                    </a>
                  )}
                  {proj.projectLink && (
                    <a href={proj.projectLink} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                      Live Demo ↗
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Internships */}
      {enabledSections.internships && internships.length > 0 && (
        <section className="mb-4 page-break-avoid">
          <h2
            className="text-xs font-bold uppercase tracking-wider pb-0.5 mb-2 flex items-center gap-2"
            style={{ color: accentColor }}
          >
            <span>Internships & Training</span>
            <span className="flex-1 h-[1px] bg-gray-200" />
          </h2>
          <div className="space-y-3">
            {internships.map((item) => (
              <div key={item.id} className="page-break-avoid">
                <div className="flex justify-between items-baseline font-bold text-gray-900">
                  <span>{item.role || 'Role'}</span>
                  <span className="text-xs font-normal text-gray-600">
                    {item.startDate} – {item.isCurrent ? 'Present' : item.endDate}
                  </span>
                </div>
                <div className="flex justify-between items-baseline text-xs text-gray-700 mb-1">
                  <span style={{ color: accentColor }} className="font-semibold">{item.organization || 'Organization'}</span>
                  <span className="text-gray-500 italic">{item.location}</span>
                </div>
                {item.description && <p className="text-gray-800 mb-1">{item.description}</p>}
                {item.responsibilities && item.responsibilities.length > 0 && item.responsibilities[0] !== '' && (
                  <ul className="list-disc list-outside ml-4 space-y-0.5 text-gray-800">
                    {item.responsibilities.filter(Boolean).map((resp, idx) => (
                      <li key={idx}>{resp}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {enabledSections.skills && (skills.length > 0 || isBlank) && (
        <section className="mb-4 page-break-avoid">
          <h2
            className="text-xs font-bold uppercase tracking-wider pb-0.5 mb-2 flex items-center gap-2"
            style={{ color: accentColor }}
          >
            <span>Skills & Competencies</span>
            <span className="flex-1 h-[1px] bg-gray-200" />
          </h2>
          {skills.length === 0 ? (
            <p className="text-xs text-gray-400 italic">Add your programming skills, frameworks, tools, and databases...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {skills.map((category) => (
                <div key={category.id} className="bg-slate-50 p-2 rounded border border-slate-100">
                  <div className="font-bold text-gray-900 mb-0.5" style={{ color: accentColor }}>
                    {category.categoryName}
                  </div>
                  <div className="text-gray-800">{category.skills.join(' • ')}</div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Education */}
      {enabledSections.education && (education.length > 0 || isBlank) && (
        <section className="mb-4 page-break-avoid">
          <h2
            className="text-xs font-bold uppercase tracking-wider pb-0.5 mb-2 flex items-center gap-2"
            style={{ color: accentColor }}
          >
            <span>Education</span>
            <span className="flex-1 h-[1px] bg-gray-200" />
          </h2>
          {education.length === 0 ? (
            <p className="text-xs text-gray-400 italic">Add your educational qualifications and coursework...</p>
          ) : (
            <div className="space-y-2.5">
              {education.map((edu) => (
                <div key={edu.id} className="page-break-avoid">
                  <div className="flex justify-between items-baseline font-bold text-gray-900">
                    <span>{edu.institution || 'University / Institution'}</span>
                    <span className="text-xs font-normal text-gray-600">
                      {edu.startDate} – {edu.isCurrent ? 'Expected ' : ''}{edu.endDate}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline text-xs text-gray-800">
                    <span>
                      {edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}
                      {edu.gpa && <span className="font-semibold text-gray-900"> | GPA: {edu.gpa}</span>}
                    </span>
                    <span className="italic text-gray-500">{edu.location}</span>
                  </div>
                  {edu.relevantCoursework && (
                    <p className="text-xs text-gray-700 mt-0.5">
                      <span className="font-semibold text-gray-900">Coursework:</span> {edu.relevantCoursework}
                    </p>
                  )}
                  {edu.academicAchievements && (
                    <p className="text-xs text-gray-700 mt-0.5">
                      <span className="font-semibold text-gray-900">Honors:</span> {edu.academicAchievements}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Certifications & Achievements */}
      {((enabledSections.certifications && certifications.length > 0) ||
        (enabledSections.achievements && achievements.length > 0)) && (
        <section className="mb-3 page-break-avoid">
          <h2
            className="text-xs font-bold uppercase tracking-wider pb-0.5 mb-2 flex items-center gap-2"
            style={{ color: accentColor }}
          >
            <span>Certifications & Honors</span>
            <span className="flex-1 h-[1px] bg-gray-200" />
          </h2>
          <div className="space-y-1.5 text-xs">
            {enabledSections.certifications &&
              certifications.map((cert) => (
                <div key={cert.id} className="flex justify-between items-baseline">
                  <span className="text-gray-900">
                    <span className="font-semibold">{cert.certificationName}</span> — {cert.issuingOrganization}
                  </span>
                  <span className="text-gray-500">{cert.issueDate}</span>
                </div>
              ))}
            {enabledSections.achievements &&
              achievements.map((ach) => (
                <div key={ach.id} className="text-xs pt-1">
                  <div className="flex justify-between font-semibold text-gray-900">
                    <span>{ach.achievement}</span>
                    <span className="text-gray-500 font-normal">{ach.date}</span>
                  </div>
                  {ach.description && <p className="text-gray-700">{ach.description}</p>}
                </div>
              ))}
          </div>
        </section>
      )}

      {/* Languages & Interests */}
      {(enabledSections.languages || enabledSections.interests) && (languages.length > 0 || interests.length > 0) && (
        <section className="mb-2 page-break-avoid">
          <h2
            className="text-xs font-bold uppercase tracking-wider pb-0.5 mb-1.5 flex items-center gap-2"
            style={{ color: accentColor }}
          >
            <span>Languages & Interests</span>
            <span className="flex-1 h-[1px] bg-gray-200" />
          </h2>
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs">
            {enabledSections.languages && languages.length > 0 && (
              <div>
                <span className="font-bold text-gray-900">Languages: </span>
                <span className="text-gray-800">
                  {languages.map((l) => `${l.language} (${l.proficiency})`).join(', ')}
                </span>
              </div>
            )}
            {enabledSections.interests && interests.length > 0 && (
              <div>
                <span className="font-bold text-gray-900">Interests: </span>
                <span className="text-gray-800">{interests.map((i) => i.name).join(', ')}</span>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
};
