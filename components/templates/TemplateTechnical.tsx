import React from 'react';
import { ResumeData } from '@/types/resume';

interface TemplateProps {
  data: ResumeData;
}

export const TemplateTechnical: React.FC<TemplateProps> = ({ data }) => {
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
      {/* Technical Header */}
      <header className="pb-3 border-b-2 border-blue-800 mb-3.5 page-break-avoid">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline gap-1">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-950 mb-0.5">
              {personalInfo.fullName || 'YOUR FULL NAME'}
            </h1>
            <p className="text-xs sm:text-sm font-semibold text-blue-700 font-mono">
              {personalInfo.professionalTitle || 'Software Engineer / Technical Specialist'}
            </p>
          </div>
          <div className="text-xs text-gray-600 sm:text-right">
            <div>{personalInfo.location || 'City, State, Country'}</div>
            <div className="text-gray-800 font-medium">{personalInfo.phone || '+1 (555) 000-0000'}</div>
          </div>
        </div>

        {/* Contact & Repository Links */}
        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-700 mt-2 pt-2 border-t border-gray-100 font-mono text-[11px]">
          {personalInfo.email ? (
            <a href={`mailto:${personalInfo.email}`} className="text-blue-700 hover:underline">
              {personalInfo.email}
            </a>
          ) : (
            <span className="text-gray-400">you@example.com</span>
          )}
          {personalInfo.github && (
            <>
              <span className="text-gray-300">|</span>
              <a href={personalInfo.github} target="_blank" rel="noreferrer" className="text-blue-700 hover:underline">
                github: {personalInfo.github.replace(/^https?:\/\/(www\.)?github\.com\//, '')}
              </a>
            </>
          )}
          {personalInfo.linkedin && (
            <>
              <span className="text-gray-300">|</span>
              <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="text-blue-700 hover:underline">
                linkedin: {personalInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}
              </a>
            </>
          )}
          {personalInfo.portfolio && (
            <>
              <span className="text-gray-300">|</span>
              <a href={personalInfo.portfolio} target="_blank" rel="noreferrer" className="text-blue-700 hover:underline">
                web: {personalInfo.portfolio.replace(/^https?:\/\//, '')}
              </a>
            </>
          )}
        </div>
      </header>

      {/* Technical Summary */}
      {enabledSections.summary && (summary.summaryText || isBlank) && (
        <section className="mb-3.5 page-break-avoid">
          <div className="section-heading mb-1">
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-900 font-mono flex items-center gap-1.5">
              <span>&gt; Technical Profile</span>
            </h2>
          </div>
          <div className="section-divider h-[1px] bg-blue-200 w-full mb-2" />
          <div className="section-content">
            <p className="text-gray-800 text-justify">
              {summary.summaryText || (
                <span className="text-gray-400 italic">
                  Add a summary detailing your engineering background, core architecture stack, and technical problem-solving capabilities...
                </span>
              )}
            </p>
          </div>
        </section>
      )}

      {/* Technical Skills Matrix */}
      {enabledSections.skills && (skills.length > 0 || isBlank) && (
        <section className="mb-3.5 page-break-avoid">
          <div className="section-heading mb-1">
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-900 font-mono flex items-center gap-1.5">
              <span>&gt; Technical Skills Matrix</span>
            </h2>
          </div>
          <div className="section-divider h-[1px] bg-blue-200 w-full mb-2" />
          <div className="section-content">
            {skills.length === 0 ? (
              <p className="text-xs text-gray-400 italic">Add programming languages, frameworks, developer tools, databases, and cloud services...</p>
            ) : (
              <div className="space-y-1 text-xs">
                {skills.map((category) => (
                  <div key={category.id} className="flex flex-wrap items-baseline">
                    <span className="font-bold text-gray-900 min-w-[145px] text-blue-950 font-mono text-[11px]">
                      {category.categoryName}:
                    </span>
                    <span className="text-gray-800 flex-1">{category.skills.join(' • ')}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Projects & Technical Implementations */}
      {enabledSections.projects && projects.length > 0 && (
        <section className="mb-3.5 page-break-avoid">
          <div className="section-heading mb-1">
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-900 font-mono flex items-center gap-1.5">
              <span>&gt; Key Technical Projects</span>
            </h2>
          </div>
          <div className="section-divider h-[1px] bg-blue-200 w-full mb-2" />
          <div className="section-content space-y-2.5">
            {projects.map((proj) => (
              <div key={proj.id} className="page-break-avoid">
                <div className="flex justify-between items-baseline font-bold text-gray-950">
                  <span className="text-[13px]">{proj.projectName || 'Project Title'}</span>
                  {(proj.startDate || proj.endDate) && (
                    <span className="text-xs font-normal text-gray-600 font-mono">
                      {proj.startDate} {proj.endDate ? `– ${proj.endDate}` : ''}
                    </span>
                  )}
                </div>
                {proj.technologies && proj.technologies.length > 0 && (
                  <div className="text-xs font-medium text-blue-700 my-0.5 font-mono text-[11px]">
                    Stack: {proj.technologies.join(', ')}
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
                {proj.results && (
                  <p className="text-xs text-gray-700 mt-0.5">
                    <span className="font-semibold text-gray-900">Benchmark/Impact:</span> {proj.results}
                  </p>
                )}
                <div className="flex gap-4 text-xs font-mono text-[11px] text-blue-700 mt-0.5">
                  {proj.githubLink && (
                    <a href={proj.githubLink} target="_blank" rel="noreferrer" className="hover:underline">
                      [repo] {proj.githubLink.replace('https://', '')}
                    </a>
                  )}
                  {proj.projectLink && (
                    <a href={proj.projectLink} target="_blank" rel="noreferrer" className="hover:underline">
                      [demo] {proj.projectLink.replace('https://', '')}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {enabledSections.experience && experience.length > 0 && (
        <section className="mb-3.5 page-break-avoid">
          <div className="section-heading mb-1">
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-900 font-mono flex items-center gap-1.5">
              <span>&gt; Work Experience</span>
            </h2>
          </div>
          <div className="section-divider h-[1px] bg-blue-200 w-full mb-2" />
          <div className="section-content space-y-3">
            {experience.map((exp) => (
              <div key={exp.id} className="page-break-avoid">
                <div className="flex justify-between items-baseline font-bold text-gray-950 text-[13px]">
                  <span>{exp.jobTitle || 'Role'}</span>
                  <span className="text-xs font-normal text-gray-600 font-mono">
                    {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div className="flex justify-between items-baseline text-xs text-blue-800 mb-1 font-medium">
                  <span>{exp.company || 'Company'}</span>
                  <span className="text-gray-500 italic">{exp.location}</span>
                </div>
                {exp.description && <p className="text-gray-800 mb-1">{exp.description}</p>}
                {exp.bulletPoints && exp.bulletPoints.length > 0 && exp.bulletPoints[0] !== '' && (
                  <ul className="list-disc list-outside ml-4 space-y-0.5 text-gray-800">
                    {exp.bulletPoints.filter(Boolean).map((bullet, idx) => (
                      <li key={idx}>{bullet}</li>
                    ))}
                  </ul>
                )}
                {exp.achievements && (
                  <p className="text-xs text-gray-800 mt-1">
                    <span className="font-semibold text-blue-900">Core Impact:</span> {exp.achievements}
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
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-900 font-mono flex items-center gap-1.5">
              <span>&gt; Engineering Internships</span>
            </h2>
          </div>
          <div className="section-divider h-[1px] bg-blue-200 w-full mb-2" />
          <div className="section-content space-y-2.5">
            {internships.map((item) => (
              <div key={item.id} className="page-break-avoid">
                <div className="flex justify-between items-baseline font-bold text-gray-950">
                  <span>{item.role || 'Internship'}</span>
                  <span className="text-xs font-normal text-gray-600 font-mono">
                    {item.startDate} – {item.isCurrent ? 'Present' : item.endDate}
                  </span>
                </div>
                <div className="flex justify-between items-baseline text-xs text-blue-800 mb-1 font-medium">
                  <span>{item.organization || 'Organization'}</span>
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
                {item.technologiesUsed && item.technologiesUsed.length > 0 && (
                  <p className="text-xs text-gray-700 mt-0.5 font-mono text-[11px]">
                    Tech: {item.technologiesUsed.join(', ')}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {enabledSections.education && (education.length > 0 || isBlank) && (
        <section className="mb-3.5 page-break-avoid">
          <div className="section-heading mb-1">
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-900 font-mono flex items-center gap-1.5">
              <span>&gt; Education & Credentials</span>
            </h2>
          </div>
          <div className="section-divider h-[1px] bg-blue-200 w-full mb-2" />
          <div className="section-content">
            {education.length === 0 ? (
              <p className="text-xs text-gray-400 italic">Add your university, degree, coursework, and GPA...</p>
            ) : (
              <div className="space-y-2">
                {education.map((edu) => (
                  <div key={edu.id} className="page-break-avoid">
                    <div className="flex justify-between items-baseline font-bold text-gray-950">
                      <span>{edu.institution || 'University / Institution'}</span>
                      <span className="text-xs font-normal text-gray-600 font-mono">
                        {edu.startDate} – {edu.isCurrent ? 'Expected ' : ''}{edu.endDate}
                      </span>
                    </div>
                    <div className="flex justify-between items-baseline text-xs text-gray-800">
                      <span>
                        {edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}
                        {edu.gpa && <span className="font-semibold text-gray-950"> | GPA: {edu.gpa}</span>}
                      </span>
                      <span className="italic text-gray-500">{edu.location}</span>
                    </div>
                    {edu.relevantCoursework && (
                      <p className="text-xs text-gray-700 mt-0.5">
                        <span className="font-semibold text-gray-900">Coursework:</span> {edu.relevantCoursework}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Certifications & Achievements */}
      {((enabledSections.certifications && certifications.length > 0) ||
        (enabledSections.achievements && achievements.length > 0)) && (
        <section className="mb-3 page-break-avoid">
          <div className="section-heading mb-1">
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-900 font-mono flex items-center gap-1.5">
              <span>&gt; Certifications & Hackathons</span>
            </h2>
          </div>
          <div className="section-divider h-[1px] bg-blue-200 w-full mb-2" />
          <div className="section-content space-y-1.5 text-xs text-gray-800">
            {enabledSections.certifications &&
              certifications.map((cert) => (
                <div key={cert.id} className="flex justify-between items-baseline">
                  <span>
                    <span className="font-semibold">{cert.certificationName}</span> — {cert.issuingOrganization}
                  </span>
                  <span className="text-gray-600 font-mono">{cert.issueDate}</span>
                </div>
              ))}
            {enabledSections.achievements &&
              achievements.map((ach) => (
                <div key={ach.id} className="pt-0.5">
                  <span className="font-semibold text-gray-950">{ach.achievement}</span>
                  {ach.organization && <span className="text-gray-700">, {ach.organization}</span>}
                  {ach.date && <span className="text-gray-500 font-mono"> ({ach.date})</span>}
                  {ach.description && <p className="text-gray-700 mt-0.5">{ach.description}</p>}
                </div>
              ))}
          </div>
        </section>
      )}

      {/* Languages & Interests */}
      {(enabledSections.languages || enabledSections.interests) && (languages.length > 0 || interests.length > 0) && (
        <section className="mb-2 page-break-avoid">
          <div className="section-heading mb-1">
            <h2 className="text-xs font-bold uppercase tracking-wider text-blue-900 font-mono flex items-center gap-1.5">
              <span>&gt; Languages & Interests</span>
            </h2>
          </div>
          <div className="section-divider h-[1px] bg-blue-200 w-full mb-2" />
          <div className="section-content flex flex-wrap gap-x-6 gap-y-1 text-xs">
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

      {/* Custom Sections */}
      {enabledSections.customSections && customSections && customSections.length > 0 && (
        <>
          {customSections.map((sec) => (
            <section key={sec.id} className="mb-3.5 page-break-avoid">
              <div className="section-heading mb-1">
                <h2 className="text-xs font-bold uppercase tracking-wider text-blue-900 font-mono flex items-center gap-1.5">
                  <span>&gt; {sec.sectionTitle}</span>
                </h2>
              </div>
              <div className="section-divider h-[1px] bg-blue-200 w-full mb-2" />
              <div className="section-content space-y-2">
                {sec.entries.map((entry) => (
                  <div key={entry.id} className="text-xs">
                    <div className="flex justify-between font-bold text-gray-950">
                      <span>{entry.title}</span>
                      <span className="font-normal text-gray-600 font-mono">{entry.date}</span>
                    </div>
                    {entry.subtitle && <p className="italic text-gray-700">{entry.subtitle}</p>}
                    {entry.description && <p className="text-gray-800">{entry.description}</p>}
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
