import React from 'react';
import { ResumeData } from '@/types/resume';

interface TemplateProps {
  data: ResumeData;
}

export const TemplateGraduate: React.FC<TemplateProps> = ({ data }) => {
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

  const accentColor = settings.accentColor || '#0F766E';

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
      {/* Header Banner */}
      <header className="pb-3 border-b-2 mb-3.5 page-break-avoid" style={{ borderColor: accentColor }}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-1.5">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-950">
              {personalInfo.fullName || 'YOUR FULL NAME'}
            </h1>
            <p className="text-sm font-semibold mt-0.5" style={{ color: accentColor }}>
              {personalInfo.professionalTitle || 'Graduate Title / Target Role'}
            </p>
          </div>
          <div className="text-xs text-gray-600 md:text-right">
            <div>{personalInfo.location || 'City, State, Country'}</div>
            <div className="flex flex-wrap gap-2 md:justify-end">
              <span>{personalInfo.phone || '+1 (555) 000-0000'}</span>
              <span className="text-gray-400">•</span>
              {personalInfo.email ? (
                <a href={`mailto:${personalInfo.email}`} className="text-gray-900 hover:underline">
                  {personalInfo.email}
                </a>
              ) : (
                <span className="text-gray-400">you@example.com</span>
              )}
            </div>
          </div>
        </div>

        {/* Links bar */}
        {(personalInfo.github || personalInfo.linkedin || personalInfo.portfolio) && (
          <div className="flex flex-wrap gap-x-4 text-xs mt-2 pt-1.5 border-t border-gray-100 text-gray-600">
            {personalInfo.github && (
              <a href={personalInfo.github} target="_blank" rel="noreferrer" className="text-gray-900 hover:underline">
                <span className="font-semibold text-teal-800">GitHub:</span> {personalInfo.github.replace(/^https?:\/\//, '')}
              </a>
            )}
            {personalInfo.linkedin && (
              <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="text-gray-900 hover:underline">
                <span className="font-semibold text-teal-800">LinkedIn:</span> {personalInfo.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, '')}
              </a>
            )}
            {personalInfo.portfolio && (
              <a href={personalInfo.portfolio} target="_blank" rel="noreferrer" className="text-gray-900 hover:underline">
                <span className="font-semibold text-teal-800">Portfolio:</span> {personalInfo.portfolio.replace(/^https?:\/\//, '')}
              </a>
            )}
          </div>
        )}
      </header>

      {/* Career Objective / Summary */}
      {enabledSections.summary && (summary.summaryText || isBlank) && (
        <section className="mb-3.5 page-break-avoid">
          <div className="section-heading mb-1">
            <h2 className="text-xs font-bold uppercase tracking-wider text-teal-900 bg-teal-50 px-2 py-0.5 rounded inline-block">
              Career Objective
            </h2>
          </div>
          <div className="section-divider h-[1px] bg-teal-100/80 w-full mb-2" />
          <div className="section-content">
            <p className="text-gray-800 text-justify">
              {summary.summaryText || (
                <span className="text-gray-400 italic">
                  Add an objective outlining your academic specialization, technical skills, and career goals...
                </span>
              )}
            </p>
          </div>
        </section>
      )}

      {/* Education (Prioritized for Students & Graduates) */}
      {enabledSections.education && (education.length > 0 || isBlank) && (
        <section className="mb-3.5 page-break-avoid">
          <div className="section-heading mb-1">
            <h2 className="text-xs font-bold uppercase tracking-wider text-teal-900 bg-teal-50 px-2 py-0.5 rounded inline-block">
              Education
            </h2>
          </div>
          <div className="section-divider h-[1px] bg-teal-100/80 w-full mb-2" />
          <div className="section-content">
            {education.length === 0 ? (
              <p className="text-xs text-gray-400 italic">Add your university, degree, coursework, and honors...</p>
            ) : (
              <div className="space-y-2">
                {education.map((edu) => (
                  <div key={edu.id} className="page-break-avoid">
                    <div className="flex justify-between items-baseline font-bold text-gray-950">
                      <span>{edu.institution || 'University / College'}</span>
                      <span className="text-xs font-medium text-gray-600">
                        {edu.startDate} – {edu.isCurrent ? 'Expected ' : ''}{edu.endDate}
                      </span>
                    </div>
                    <div className="flex justify-between items-baseline text-xs text-gray-800">
                      <span className="font-semibold" style={{ color: accentColor }}>
                        {edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}
                      </span>
                      <span className="italic text-gray-600">{edu.location}</span>
                    </div>
                    {edu.gpa && (
                      <p className="text-xs font-medium text-gray-800 mt-0.5">
                        Academic Standing / GPA: <span className="font-bold text-gray-950">{edu.gpa}</span>
                      </p>
                    )}
                    {edu.relevantCoursework && (
                      <p className="text-xs text-gray-700 mt-0.5">
                        <span className="font-semibold text-gray-900">Key Coursework:</span> {edu.relevantCoursework}
                      </p>
                    )}
                    {edu.academicAchievements && (
                      <p className="text-xs text-gray-700 mt-0.5">
                        <span className="font-semibold text-gray-900">Academic Honors:</span> {edu.academicAchievements}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Skills & Technical Competencies */}
      {enabledSections.skills && (skills.length > 0 || isBlank) && (
        <section className="mb-3.5 page-break-avoid">
          <div className="section-heading mb-1">
            <h2 className="text-xs font-bold uppercase tracking-wider text-teal-900 bg-teal-50 px-2 py-0.5 rounded inline-block">
              Technical & Soft Skills
            </h2>
          </div>
          <div className="section-divider h-[1px] bg-teal-100/80 w-full mb-2" />
          <div className="section-content">
            {skills.length === 0 ? (
              <p className="text-xs text-gray-400 italic">Add your programming languages, tools, frameworks, and soft skills...</p>
            ) : (
              <div className="space-y-1 text-xs">
                {skills.map((category) => (
                  <div key={category.id} className="flex flex-wrap items-baseline">
                    <span className="font-bold text-gray-900 min-w-[130px]" style={{ color: accentColor }}>
                      {category.categoryName}:
                    </span>
                    <span className="text-gray-800 flex-1">{category.skills.join(', ')}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Projects */}
      {enabledSections.projects && projects.length > 0 && (
        <section className="mb-3.5 page-break-avoid">
          <div className="section-heading mb-1">
            <h2 className="text-xs font-bold uppercase tracking-wider text-teal-900 bg-teal-50 px-2 py-0.5 rounded inline-block">
              Technical Projects
            </h2>
          </div>
          <div className="section-divider h-[1px] bg-teal-100/80 w-full mb-2" />
          <div className="section-content space-y-2.5">
            {projects.map((proj) => (
              <div key={proj.id} className="page-break-avoid">
                <div className="flex justify-between items-baseline font-bold text-gray-950">
                  <div className="flex items-center gap-2">
                    <span>{proj.projectName || 'Project Title'}</span>
                    {proj.role && <span className="text-xs font-normal text-teal-700">| {proj.role}</span>}
                  </div>
                  {(proj.startDate || proj.endDate) && (
                    <span className="text-xs font-normal text-gray-600">
                      {proj.startDate} {proj.endDate ? `– ${proj.endDate}` : ''}
                    </span>
                  )}
                </div>
                {proj.technologies && proj.technologies.length > 0 && (
                  <p className="text-xs text-teal-800 font-medium my-0.5">
                    Technologies: {proj.technologies.join(', ')}
                  </p>
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
                    <span className="font-semibold text-gray-900">Outcome/Impact:</span> {proj.results}
                  </p>
                )}
                <div className="flex gap-4 text-xs text-teal-700 mt-0.5">
                  {proj.githubLink && (
                    <a href={proj.githubLink} target="_blank" rel="noreferrer" className="hover:underline">
                      GitHub Repo ↗
                    </a>
                  )}
                  {proj.projectLink && (
                    <a href={proj.projectLink} target="_blank" rel="noreferrer" className="hover:underline">
                      Live Project Demo ↗
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
        <section className="mb-3.5 page-break-avoid">
          <div className="section-heading mb-1">
            <h2 className="text-xs font-bold uppercase tracking-wider text-teal-900 bg-teal-50 px-2 py-0.5 rounded inline-block">
              Internships & Practical Training
            </h2>
          </div>
          <div className="section-divider h-[1px] bg-teal-100/80 w-full mb-2" />
          <div className="section-content space-y-2.5">
            {internships.map((item) => (
              <div key={item.id} className="page-break-avoid">
                <div className="flex justify-between items-baseline font-bold text-gray-900">
                  <span>{item.role || 'Role'}</span>
                  <span className="text-xs font-normal text-gray-600">
                    {item.startDate} – {item.isCurrent ? 'Present' : item.endDate}
                  </span>
                </div>
                <div className="flex justify-between items-baseline text-xs text-teal-800 mb-1">
                  <span className="font-semibold">{item.organization || 'Organization'}</span>
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
                  <p className="text-xs text-gray-700 mt-0.5">
                    <span className="font-semibold text-gray-900">Tech:</span> {item.technologiesUsed.join(', ')}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Experience (If any) */}
      {enabledSections.experience && experience.length > 0 && (
        <section className="mb-3.5 page-break-avoid">
          <div className="section-heading mb-1">
            <h2 className="text-xs font-bold uppercase tracking-wider text-teal-900 bg-teal-50 px-2 py-0.5 rounded inline-block">
              Work Experience
            </h2>
          </div>
          <div className="section-divider h-[1px] bg-teal-100/80 w-full mb-2" />
          <div className="section-content space-y-2.5">
            {experience.map((exp) => (
              <div key={exp.id} className="page-break-avoid">
                <div className="flex justify-between items-baseline font-bold text-gray-900">
                  <span>{exp.jobTitle || 'Job Title'}</span>
                  <span className="text-xs font-normal text-gray-600">
                    {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div className="flex justify-between items-baseline text-xs text-teal-800 mb-1 font-medium">
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
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications & Achievements */}
      {((enabledSections.certifications && certifications.length > 0) ||
        (enabledSections.achievements && achievements.length > 0)) && (
        <section className="mb-3 page-break-avoid">
          <div className="section-heading mb-1">
            <h2 className="text-xs font-bold uppercase tracking-wider text-teal-900 bg-teal-50 px-2 py-0.5 rounded inline-block">
              Certifications & Honors
            </h2>
          </div>
          <div className="section-divider h-[1px] bg-teal-100/80 w-full mb-2" />
          <div className="section-content space-y-1.5 text-xs">
            {enabledSections.certifications &&
              certifications.map((cert) => (
                <div key={cert.id} className="flex justify-between items-baseline">
                  <span className="text-gray-900">
                    <span className="font-semibold">{cert.certificationName}</span> — {cert.issuingOrganization}
                  </span>
                  <span className="text-gray-600">{cert.issueDate}</span>
                </div>
              ))}
            {enabledSections.achievements &&
              achievements.map((ach) => (
                <div key={ach.id} className="pt-1">
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
            <h2 className="text-xs font-bold uppercase tracking-wider text-teal-900 bg-teal-50 px-2 py-0.5 rounded inline-block">
              Languages & Interests
            </h2>
          </div>
          <div className="section-divider h-[1px] bg-teal-100/80 w-full mb-2" />
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
                <h2 className="text-xs font-bold uppercase tracking-wider text-teal-900 bg-teal-50 px-2 py-0.5 rounded inline-block">
                  {sec.sectionTitle}
                </h2>
              </div>
              <div className="section-divider h-[1px] bg-teal-100/80 w-full mb-2" />
              <div className="section-content space-y-2">
                {sec.entries.map((entry) => (
                  <div key={entry.id} className="text-xs">
                    <div className="flex justify-between font-bold text-gray-900">
                      <span>{entry.title}</span>
                      <span className="font-normal text-gray-700">{entry.date}</span>
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
