import React from 'react';
import { ResumeData } from '@/types/resume';

interface TemplateProps {
  data: ResumeData;
}

export const TemplateClassicAts: React.FC<TemplateProps> = ({ data }) => {
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
      {/* Header / Personal Info */}
      <header className="text-center pb-3 border-b-2 border-gray-800 mb-3.5 page-break-avoid">
        <h1 className="text-2xl font-bold uppercase tracking-wide text-black mb-0.5">
          {personalInfo.fullName || 'YOUR FULL NAME'}
        </h1>
        <p className="text-sm font-medium text-gray-800 mb-2">
          {personalInfo.professionalTitle || 'Professional Title / Target Headline'}
        </p>

        <div className="flex flex-wrap justify-center items-center gap-x-2.5 gap-y-1 text-xs text-gray-700">
          {personalInfo.location ? (
            <span>{personalInfo.location}</span>
          ) : (
            <span className="text-gray-400">City, State, Country</span>
          )}
          <span className="text-gray-400">•</span>
          {personalInfo.phone ? (
            <span>{personalInfo.phone}</span>
          ) : (
            <span className="text-gray-400">+1 (555) 000-0000</span>
          )}
          <span className="text-gray-400">•</span>
          {personalInfo.email ? (
            <a href={`mailto:${personalInfo.email}`} className="text-gray-900 hover:underline">
              {personalInfo.email}
            </a>
          ) : (
            <span className="text-gray-400">you@example.com</span>
          )}
          {personalInfo.linkedin && (
            <>
              <span className="text-gray-400">•</span>
              <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="text-gray-900 hover:underline">
                LinkedIn
              </a>
            </>
          )}
          {personalInfo.github && (
            <>
              <span className="text-gray-400">•</span>
              <a href={personalInfo.github} target="_blank" rel="noreferrer" className="text-gray-900 hover:underline">
                GitHub
              </a>
            </>
          )}
          {personalInfo.portfolio && (
            <>
              <span className="text-gray-400">•</span>
              <a href={personalInfo.portfolio} target="_blank" rel="noreferrer" className="text-gray-900 hover:underline">
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
            <h2 className="text-xs font-bold uppercase tracking-wider text-black">
              Professional Summary
            </h2>
          </div>
          <div className="section-divider h-[1px] bg-gray-400 w-full mb-2" />
          <div className="section-content">
            <p className="text-gray-800 text-justify">
              {summary.summaryText || (
                <span className="text-gray-400 italic">
                  Add a concise 2–4 sentence summary highlighting your core strengths, experience, and career focus...
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
            <h2 className="text-xs font-bold uppercase tracking-wider text-black">
              Professional Experience
            </h2>
          </div>
          <div className="section-divider h-[1px] bg-gray-400 w-full mb-2" />
          <div className="section-content space-y-2.5">
            {experience.map((exp) => (
              <div key={exp.id} className="page-break-avoid">
                <div className="flex justify-between items-baseline font-bold text-gray-900">
                  <span>{exp.jobTitle || 'Job Title'}</span>
                  <span className="text-xs font-normal text-gray-700">
                    {exp.startDate} – {exp.isCurrent ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div className="flex justify-between items-baseline text-xs italic text-gray-800 mb-1">
                  <span>{exp.company || 'Company Name'}</span>
                  <span>{exp.location}</span>
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
                    <span className="font-semibold">Key Achievement:</span> {exp.achievements}
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
            <h2 className="text-xs font-bold uppercase tracking-wider text-black">
              Internships & Practical Training
            </h2>
          </div>
          <div className="section-divider h-[1px] bg-gray-400 w-full mb-2" />
          <div className="section-content space-y-2.5">
            {internships.map((item) => (
              <div key={item.id} className="page-break-avoid">
                <div className="flex justify-between items-baseline font-bold text-gray-900">
                  <span>{item.role || 'Internship Role'}</span>
                  <span className="text-xs font-normal text-gray-700">
                    {item.startDate} – {item.isCurrent ? 'Present' : item.endDate}
                  </span>
                </div>
                <div className="flex justify-between items-baseline text-xs italic text-gray-800 mb-1">
                  <span>{item.organization || 'Organization Name'}</span>
                  <span>{item.location}</span>
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
                  <p className="text-xs text-gray-700 mt-1">
                    <span className="font-semibold text-gray-900">Technologies:</span> {item.technologiesUsed.join(', ')}
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
            <h2 className="text-xs font-bold uppercase tracking-wider text-black">
              Education
            </h2>
          </div>
          <div className="section-divider h-[1px] bg-gray-400 w-full mb-2" />
          <div className="section-content">
            {education.length === 0 ? (
              <p className="text-xs text-gray-400 italic">Add your university, degree, coursework, and honors...</p>
            ) : (
              <div className="space-y-2">
                {education.map((edu) => (
                  <div key={edu.id} className="page-break-avoid">
                    <div className="flex justify-between items-baseline font-bold text-gray-900">
                      <span>{edu.institution || 'University / Institution'}</span>
                      <span className="text-xs font-normal text-gray-700">
                        {edu.startDate} – {edu.isCurrent ? 'Expected ' : ''}{edu.endDate}
                      </span>
                    </div>
                    <div className="flex justify-between items-baseline text-xs text-gray-800">
                      <span>
                        {edu.degree}{edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}
                        {edu.gpa && <span className="font-medium"> | GPA: {edu.gpa}</span>}
                      </span>
                      <span className="italic">{edu.location}</span>
                    </div>
                    {edu.relevantCoursework && (
                      <p className="text-xs text-gray-700 mt-0.5">
                        <span className="font-semibold text-gray-900">Relevant Coursework:</span> {edu.relevantCoursework}
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
          </div>
        </section>
      )}

      {/* Projects */}
      {enabledSections.projects && projects.length > 0 && (
        <section className="mb-3.5 page-break-avoid">
          <div className="section-heading mb-1">
            <h2 className="text-xs font-bold uppercase tracking-wider text-black">
              Key Projects
            </h2>
          </div>
          <div className="section-divider h-[1px] bg-gray-400 w-full mb-2" />
          <div className="section-content space-y-2.5">
            {projects.map((proj) => (
              <div key={proj.id} className="page-break-avoid">
                <div className="flex justify-between items-baseline font-bold text-gray-900">
                  <span>
                    {proj.projectName || 'Project Title'}
                    {proj.technologies && proj.technologies.length > 0 && (
                      <span className="text-xs font-normal text-gray-700 italic ml-2">
                        ({proj.technologies.join(', ')})
                      </span>
                    )}
                  </span>
                  {(proj.startDate || proj.endDate) && (
                    <span className="text-xs font-normal text-gray-700">
                      {proj.startDate} {proj.endDate ? `– ${proj.endDate}` : ''}
                    </span>
                  )}
                </div>
                {proj.shortDescription && <p className="text-gray-800 mb-1">{proj.shortDescription}</p>}
                {proj.keyContributions && proj.keyContributions.length > 0 && proj.keyContributions[0] !== '' && (
                  <ul className="list-disc list-outside ml-4 space-y-0.5 text-gray-800">
                    {proj.keyContributions.filter(Boolean).map((bullet, idx) => (
                      <li key={idx}>{bullet}</li>
                    ))}
                  </ul>
                )}
                <div className="flex gap-4 text-xs text-gray-700 mt-0.5">
                  {proj.githubLink && (
                    <a href={proj.githubLink} target="_blank" rel="noreferrer" className="text-gray-900 hover:underline">
                      GitHub: {proj.githubLink.replace('https://', '')}
                    </a>
                  )}
                  {proj.projectLink && (
                    <a href={proj.projectLink} target="_blank" rel="noreferrer" className="text-gray-900 hover:underline">
                      Demo: {proj.projectLink.replace('https://', '')}
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
            <h2 className="text-xs font-bold uppercase tracking-wider text-black">
              Skills & Competencies
            </h2>
          </div>
          <div className="section-divider h-[1px] bg-gray-400 w-full mb-2" />
          <div className="section-content">
            {skills.length === 0 ? (
              <p className="text-xs text-gray-400 italic">Add your programming languages, tools, frameworks, and soft skills...</p>
            ) : (
              <div className="space-y-1">
                {skills.map((category) => (
                  <div key={category.id} className="flex flex-wrap text-xs">
                    <span className="font-bold text-gray-900 min-w-[140px]">{category.categoryName}:</span>
                    <span className="text-gray-800 flex-1">{category.skills.join(', ')}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Certifications */}
      {enabledSections.certifications && certifications.length > 0 && (
        <section className="mb-3.5 page-break-avoid">
          <div className="section-heading mb-1">
            <h2 className="text-xs font-bold uppercase tracking-wider text-black">
              Certifications
            </h2>
          </div>
          <div className="section-divider h-[1px] bg-gray-400 w-full mb-2" />
          <div className="section-content space-y-1">
            {certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between items-baseline text-xs">
                <span className="text-gray-900">
                  <span className="font-semibold">{cert.certificationName}</span> — {cert.issuingOrganization}
                  {cert.credentialId && <span className="text-gray-600"> (ID: {cert.credentialId})</span>}
                </span>
                <span className="text-gray-700">{cert.issueDate}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Achievements & Awards */}
      {enabledSections.achievements && achievements.length > 0 && (
        <section className="mb-3.5 page-break-avoid">
          <div className="section-heading mb-1">
            <h2 className="text-xs font-bold uppercase tracking-wider text-black">
              Achievements & Honors
            </h2>
          </div>
          <div className="section-divider h-[1px] bg-gray-400 w-full mb-2" />
          <div className="section-content space-y-1.5">
            {achievements.map((ach) => (
              <div key={ach.id} className="text-xs">
                <div className="flex justify-between font-semibold text-gray-900">
                  <span>{ach.achievement}</span>
                  <span className="font-normal text-gray-700">{ach.date}</span>
                </div>
                {ach.organization && <p className="text-gray-700 italic">{ach.organization}</p>}
                {ach.description && <p className="text-gray-800">{ach.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Languages & Interests */}
      {(enabledSections.languages || enabledSections.interests) && (languages.length > 0 || interests.length > 0) && (
        <section className="mb-3 page-break-avoid">
          <div className="section-heading mb-1">
            <h2 className="text-xs font-bold uppercase tracking-wider text-black">
              Additional Information
            </h2>
          </div>
          <div className="section-divider h-[1px] bg-gray-400 w-full mb-2" />
          <div className="section-content space-y-1 text-xs">
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
      {enabledSections.customSections && customSections.length > 0 && (
        <>
          {customSections.map((sec) => (
            <section key={sec.id} className="mb-3.5 page-break-avoid">
              <div className="section-heading mb-1">
                <h2 className="text-xs font-bold uppercase tracking-wider text-black">
                  {sec.sectionTitle}
                </h2>
              </div>
              <div className="section-divider h-[1px] bg-gray-400 w-full mb-2" />
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
