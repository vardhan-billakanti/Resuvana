import React from 'react';
import { ResumeData } from '@/types/resume';

interface TemplateProps {
  data: ResumeData;
}

export const TemplateMinimal: React.FC<TemplateProps> = ({ data }) => {
  const {
    personalInfo,
    summary,
    education,
    experience,
    internships,
    skills,
    projects,
    certifications,
    achievements,
    awards,
    publications,
    languages,
    interests,
    customSections,
    settings,
    enabledSections,
  } = data;

  const fontClass =
    settings.font === 'merriweather' || settings.font === 'garamond'
      ? 'font-serif'
      : 'font-sans';

  const marginClass =
    settings.margins === 'compact' ? 'p-7' : settings.margins === 'wide' ? 'p-12' : 'p-9';

  const fontSizeClass =
    settings.fontSize === 'small'
      ? 'text-[11px] leading-[1.4]'
      : settings.fontSize === 'large'
      ? 'text-[13px] leading-[1.6]'
      : 'text-[12px] leading-[1.48]';

  const isBlank =
    !personalInfo.fullName &&
    !summary.summaryText &&
    education.length === 0 &&
    skills.length === 0;

  return (
    <div
      className={`a4-page bg-white text-gray-900 ${fontClass} ${marginClass} ${fontSizeClass} shadow-resume mx-auto transition-all`}
      id="resume-document"
    >
      {/* Minimal Header */}
      <header className="pb-3 border-b border-gray-300 mb-3.5 page-break-avoid">
        <h1 className="text-2xl sm:text-3xl font-light tracking-tight text-gray-950 mb-0.5">
          <span className="font-bold">{personalInfo.fullName || 'YOUR FULL NAME'}</span>
        </h1>
        <p className="text-xs sm:text-sm font-medium text-blue-600 mb-2 tracking-wide">
          {personalInfo.professionalTitle || 'Professional Title / Target Headline'}
        </p>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
          <span>{personalInfo.location || 'City, State, Country'}</span>
          <span className="text-gray-300">•</span>
          <span>{personalInfo.phone || '+1 (555) 000-0000'}</span>
          <span className="text-gray-300">•</span>
          {personalInfo.email ? (
            <a href={`mailto:${personalInfo.email}`} className="text-gray-800 hover:text-blue-600 transition-colors">
              {personalInfo.email}
            </a>
          ) : (
            <span className="text-gray-400">you@example.com</span>
          )}
          {personalInfo.linkedin && (
            <>
              <span className="text-gray-300">•</span>
              <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="text-gray-800 hover:text-blue-600 transition-colors">
                LinkedIn
              </a>
            </>
          )}
          {personalInfo.github && (
            <>
              <span className="text-gray-300">•</span>
              <a href={personalInfo.github} target="_blank" rel="noreferrer" className="text-gray-800 hover:text-blue-600 transition-colors">
                GitHub
              </a>
            </>
          )}
          {personalInfo.portfolio && (
            <>
              <span className="text-gray-300">•</span>
              <a href={personalInfo.portfolio} target="_blank" rel="noreferrer" className="text-gray-800 hover:text-blue-600 transition-colors">
                Portfolio
              </a>
            </>
          )}
        </div>
      </header>

      {/* Professional Summary */}
      {enabledSections.summary && (summary.summaryText || isBlank) && (
        <section className="mb-3.5 page-break-avoid">
          <div className="section-heading mb-1">
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-gray-500">
              About
            </h2>
          </div>
          <div className="section-divider h-[1px] bg-gray-200 w-full mb-2" />
          <div className="section-content">
            <p className="text-gray-700 text-justify leading-relaxed">
              {summary.summaryText || (
                <span className="text-gray-400 italic">
                  Add a concise professional overview highlighting your background, expertise, and career aspirations...
                </span>
              )}
            </p>
          </div>
        </section>
      )}

      {/* Experience */}
      {enabledSections.experience && experience.length > 0 && (
        <section className="mb-3.5 page-break-avoid">
          <div className="section-heading mb-1">
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-gray-500">
              Experience
            </h2>
          </div>
          <div className="section-divider h-[1px] bg-gray-200 w-full mb-2" />
          <div className="section-content space-y-3">
            {experience.map((exp) => (
              <div key={exp.id} className="page-break-avoid">
                <div className="flex justify-between items-baseline font-semibold text-gray-900">
                  <span>{exp.jobTitle || 'Job Title'}</span>
                  <span className="text-xs font-normal text-gray-500">
                    {exp.startDate} — {exp.isCurrent ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div className="flex justify-between items-baseline text-xs text-gray-600 mb-1">
                  <span className="text-blue-600 font-medium">{exp.company || 'Company Name'}</span>
                  <span className="italic">{exp.location}</span>
                </div>
                {exp.description && <p className="text-gray-700 mb-1 leading-relaxed">{exp.description}</p>}
                {exp.bulletPoints && exp.bulletPoints.length > 0 && exp.bulletPoints[0] !== '' && (
                  <ul className="list-disc list-outside ml-4 space-y-0.5 text-gray-700">
                    {exp.bulletPoints.filter(Boolean).map((bullet, idx) => (
                      <li key={idx}>{bullet}</li>
                    ))}
                  </ul>
                )}
                {exp.achievements && (
                  <p className="text-xs text-gray-700 mt-1">
                    <span className="font-semibold text-gray-900">Achievement:</span> {exp.achievements}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Internships */}
      {enabledSections.internships && internships.length > 0 && (
        <section className="mb-3.5 page-break-avoid">
          <div className="section-heading mb-1">
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-gray-500">
              Internships
            </h2>
          </div>
          <div className="section-divider h-[1px] bg-gray-200 w-full mb-2" />
          <div className="section-content space-y-2.5">
            {internships.map((item) => (
              <div key={item.id} className="page-break-avoid">
                <div className="flex justify-between items-baseline font-semibold text-gray-900">
                  <span>{item.role || 'Role'}</span>
                  <span className="text-xs font-normal text-gray-500">
                    {item.startDate} — {item.isCurrent ? 'Present' : item.endDate}
                  </span>
                </div>
                <div className="flex justify-between items-baseline text-xs text-gray-600 mb-1">
                  <span className="text-blue-600 font-medium">{item.organization || 'Organization'}</span>
                  <span className="italic">{item.location}</span>
                </div>
                {item.description && <p className="text-gray-700 mb-1">{item.description}</p>}
                {item.responsibilities && item.responsibilities.length > 0 && item.responsibilities[0] !== '' && (
                  <ul className="list-disc list-outside ml-4 space-y-0.5 text-gray-700">
                    {item.responsibilities.filter(Boolean).map((resp, idx) => (
                      <li key={idx}>{resp}</li>
                    ))}
                  </ul>
                )}
                {item.technologiesUsed && item.technologiesUsed.length > 0 && (
                  <p className="text-xs text-gray-600 mt-0.5">
                    <span className="font-semibold text-gray-800">Technologies:</span> {item.technologiesUsed.join(', ')}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {enabledSections.projects && projects.length > 0 && (
        <section className="mb-3.5 page-break-avoid">
          <div className="section-heading mb-1">
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-gray-500">
              Projects
            </h2>
          </div>
          <div className="section-divider h-[1px] bg-gray-200 w-full mb-2" />
          <div className="section-content space-y-2.5">
            {projects.map((proj) => (
              <div key={proj.id} className="page-break-avoid">
                <div className="flex justify-between items-baseline font-semibold text-gray-900">
                  <span>{proj.projectName || 'Project Title'}</span>
                  {(proj.startDate || proj.endDate) && (
                    <span className="text-xs font-normal text-gray-500">
                      {proj.startDate} {proj.endDate ? `— ${proj.endDate}` : ''}
                    </span>
                  )}
                </div>
                {proj.technologies && proj.technologies.length > 0 && (
                  <div className="text-xs text-blue-600 font-medium my-0.5">
                    {proj.technologies.join(' • ')}
                  </div>
                )}
                {proj.shortDescription && <p className="text-gray-700 mb-1">{proj.shortDescription}</p>}
                {proj.keyContributions && proj.keyContributions.length > 0 && proj.keyContributions[0] !== '' && (
                  <ul className="list-disc list-outside ml-4 space-y-0.5 text-gray-700">
                    {proj.keyContributions.filter(Boolean).map((bullet, idx) => (
                      <li key={idx}>{bullet}</li>
                    ))}
                  </ul>
                )}
                <div className="flex gap-4 text-xs text-gray-500 mt-0.5">
                  {proj.githubLink && (
                    <a href={proj.githubLink} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                      GitHub
                    </a>
                  )}
                  {proj.projectLink && (
                    <a href={proj.projectLink} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {enabledSections.skills && (skills.length > 0 || isBlank) && (
        <section className="mb-3.5 page-break-avoid">
          <div className="section-heading mb-1">
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-gray-500">
              Skills
            </h2>
          </div>
          <div className="section-divider h-[1px] bg-gray-200 w-full mb-2" />
          <div className="section-content">
            {skills.length === 0 ? (
              <p className="text-xs text-gray-400 italic">Add your core technical and professional skills...</p>
            ) : (
              <div className="space-y-1 text-xs">
                {skills.map((category) => (
                  <div key={category.id} className="flex flex-wrap items-baseline">
                    <span className="font-semibold text-gray-900 min-w-[130px]">{category.categoryName}:</span>
                    <span className="text-gray-700 flex-1">{category.skills.join(', ')}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Education */}
      {enabledSections.education && (education.length > 0 || isBlank) && (
        <section className="mb-3.5 page-break-avoid">
          <div className="section-heading mb-1">
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-gray-500">
              Education
            </h2>
          </div>
          <div className="section-divider h-[1px] bg-gray-200 w-full mb-2" />
          <div className="section-content">
            {education.length === 0 ? (
              <p className="text-xs text-gray-400 italic">Add your university, degree, and coursework...</p>
            ) : (
              <div className="space-y-2">
                {education.map((edu) => (
                  <div key={edu.id} className="page-break-avoid">
                    <div className="flex justify-between items-baseline font-semibold text-gray-900">
                      <span>{edu.institution || 'University / Institution'}</span>
                      <span className="text-xs font-normal text-gray-500">
                        {edu.startDate} — {edu.isCurrent ? 'Expected ' : ''}{edu.endDate}
                      </span>
                    </div>
                    <div className="flex justify-between items-baseline text-xs text-gray-700">
                      <span>
                        {edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}
                        {edu.gpa && <span className="text-gray-500"> • GPA: {edu.gpa}</span>}
                      </span>
                      <span className="italic text-gray-500">{edu.location}</span>
                    </div>
                    {edu.relevantCoursework && (
                      <p className="text-xs text-gray-600 mt-0.5">
                        <span className="font-medium text-gray-800">Coursework:</span> {edu.relevantCoursework}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Certifications & Honors */}
      {((enabledSections.certifications && certifications.length > 0) ||
        (enabledSections.achievements && achievements.length > 0)) && (
        <section className="mb-3 page-break-avoid">
          <div className="section-heading mb-1">
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-gray-500">
              Certifications & Honors
            </h2>
          </div>
          <div className="section-divider h-[1px] bg-gray-200 w-full mb-2" />
          <div className="section-content space-y-1.5 text-xs text-gray-700">
            {enabledSections.certifications &&
              certifications.map((cert) => (
                <div key={cert.id} className="flex justify-between items-baseline">
                  <span>
                    <span className="font-semibold text-gray-900">{cert.certificationName}</span> — {cert.issuingOrganization}
                  </span>
                  <span className="text-gray-500">{cert.issueDate}</span>
                </div>
              ))}
            {enabledSections.achievements &&
              achievements.map((ach) => (
                <div key={ach.id} className="pt-0.5">
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
          <div className="section-heading mb-1">
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-gray-500">
              Languages & Interests
            </h2>
          </div>
          <div className="section-divider h-[1px] bg-gray-200 w-full mb-2" />
          <div className="section-content flex flex-wrap gap-x-6 gap-y-1 text-xs">
            {enabledSections.languages && languages.length > 0 && (
              <div>
                <span className="font-semibold text-gray-900">Languages: </span>
                <span>{languages.map((l) => `${l.language} (${l.proficiency})`).join(', ')}</span>
              </div>
            )}
            {enabledSections.interests && interests.length > 0 && (
              <div>
                <span className="font-semibold text-gray-900">Interests: </span>
                <span>{interests.map((i) => i.name).join(', ')}</span>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Custom Sections */}
      {enabledSections.customSections && customSections && customSections.length > 0 && (
        <>
          {customSections.map((sec) => (
            <section key={sec.id} className="mb-3.5 page-break-avoid">
              <div className="section-heading mb-1">
                <h2 className="text-[11px] font-bold uppercase tracking-widest text-gray-500">
                  {sec.sectionTitle}
                </h2>
              </div>
              <div className="section-divider h-[1px] bg-gray-200 w-full mb-2" />
              <div className="section-content space-y-2">
                {sec.entries.map((entry) => (
                  <div key={entry.id} className="text-xs">
                    <div className="flex justify-between font-semibold text-gray-900">
                      <span>{entry.title}</span>
                      <span className="font-normal text-gray-500">{entry.date}</span>
                    </div>
                    {entry.subtitle && <p className="italic text-gray-600">{entry.subtitle}</p>}
                    {entry.description && <p className="text-gray-700">{entry.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </>
      )}
    </div>
  );
};
