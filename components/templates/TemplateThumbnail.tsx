'use client';

import React from 'react';
import { TemplateId } from '@/types/resume';

interface TemplateThumbnailProps {
  templateId: TemplateId;
}

export const TemplateThumbnail: React.FC<TemplateThumbnailProps> = ({ templateId }) => {
  // 1. Classic ATS
  if (templateId === 'classic-ats') {
    return (
      <div className="w-full h-full bg-white p-2.5 text-[7px] text-gray-900 font-sans leading-tight border border-gray-200 rounded shadow-2xs overflow-hidden select-none flex flex-col justify-between">
        <div className="text-center pb-1 border-b border-gray-800">
          <div className="font-bold text-[8.5px] uppercase tracking-wider text-black">POLICE MANOJ</div>
          <div className="text-[6px] font-medium text-gray-700">Aspiring Software Engineer</div>
          <div className="text-[5.5px] text-gray-500 mt-0.5">Hyderabad, India • police.manoj@example.com • +91 90000 00000</div>
        </div>

        <div className="mt-1">
          <div className="font-bold uppercase text-[6px] border-b border-gray-400 pb-0.5 text-black">Summary</div>
          <p className="text-[5.5px] text-gray-700 mt-0.5 line-clamp-2 leading-normal">
            Detail-oriented Computer Science undergraduate with hands-on expertise in full-stack web development and REST APIs.
          </p>
        </div>

        <div className="mt-1">
          <div className="font-bold uppercase text-[6px] border-b border-gray-400 pb-0.5 text-black">Education</div>
          <div className="flex justify-between font-bold text-[5.8px] text-gray-900 mt-0.5">
            <span>HIT &amp; Science</span>
            <span className="font-normal text-gray-500">2022 – 2026</span>
          </div>
          <div className="text-[5.2px] text-gray-600">B.Tech in CSE • CGPA: 8.7/10.0</div>
        </div>

        <div className="mt-1">
          <div className="font-bold uppercase text-[6px] border-b border-gray-400 pb-0.5 text-black">Technical Skills</div>
          <div className="text-[5.2px] text-gray-800 mt-0.5">
            <span className="font-bold">Languages:</span> Python, Java, TypeScript, SQL, C++
          </div>
        </div>

        <div className="mt-1">
          <div className="font-bold uppercase text-[6px] border-b border-gray-400 pb-0.5 text-black">Projects</div>
          <div className="font-bold text-[5.8px] text-gray-900 mt-0.5">Distributed Task Queue Engine</div>
          <div className="text-[5.2px] text-gray-600 line-clamp-1">• Built asynchronous Redis worker pool processing 2,500 jobs/min.</div>
        </div>
      </div>
    );
  }

  // 2. Modern Professional
  if (templateId === 'modern-professional') {
    return (
      <div className="w-full h-full bg-white p-2.5 text-[7px] text-gray-900 font-sans leading-tight border border-blue-100 rounded shadow-2xs overflow-hidden select-none flex flex-col justify-between">
        <div className="pb-1 border-b-2 border-blue-600">
          <div className="flex justify-between items-end">
            <div>
              <div className="font-extrabold text-[9px] text-gray-950">POLICE MANOJ</div>
              <div className="text-[6px] font-semibold text-blue-600">Aspiring Software Engineer</div>
            </div>
            <div className="text-right text-[5.5px] text-gray-500">
              <div>Hyderabad, India</div>
              <div>police.manoj@example.com</div>
            </div>
          </div>
        </div>

        <div className="mt-1">
          <div className="font-bold uppercase text-[6px] text-blue-600 flex items-center gap-1">
            <span>Summary</span>
            <span className="flex-1 h-[0.5px] bg-gray-200" />
          </div>
          <p className="text-[5.5px] text-gray-700 mt-0.5 line-clamp-2 leading-normal">
            Motivated developer focused on building scalable, modern web services and reliable software architectures.
          </p>
        </div>

        <div className="mt-1">
          <div className="font-bold uppercase text-[6px] text-blue-600 flex items-center gap-1">
            <span>Skills</span>
            <span className="flex-1 h-[0.5px] bg-gray-200" />
          </div>
          <div className="flex flex-wrap gap-1 mt-0.5">
            <span className="bg-slate-100 px-1 py-0.2 rounded text-[4.8px] font-medium text-slate-700">TypeScript</span>
            <span className="bg-slate-100 px-1 py-0.2 rounded text-[4.8px] font-medium text-slate-700">React.js</span>
            <span className="bg-slate-100 px-1 py-0.2 rounded text-[4.8px] font-medium text-slate-700">Node.js</span>
            <span className="bg-slate-100 px-1 py-0.2 rounded text-[4.8px] font-medium text-slate-700">Docker</span>
            <span className="bg-slate-100 px-1 py-0.2 rounded text-[4.8px] font-medium text-slate-700">PostgreSQL</span>
          </div>
        </div>

        <div className="mt-1">
          <div className="font-bold uppercase text-[6px] text-blue-600 flex items-center gap-1">
            <span>Internship</span>
            <span className="flex-1 h-[0.5px] bg-gray-200" />
          </div>
          <div className="flex justify-between font-bold text-[5.8px] text-gray-900 mt-0.5">
            <span>Software Intern — Nexora Tech</span>
            <span className="text-[4.8px] bg-blue-50 text-blue-700 px-1 rounded">2024</span>
          </div>
          <div className="text-[5.2px] text-gray-600 line-clamp-1">• Built 6 modular REST APIs boosting test coverage to 82%.</div>
        </div>
      </div>
    );
  }

  // 3. Graduate & Fresher
  if (templateId === 'graduate') {
    return (
      <div className="w-full h-full bg-white p-2.5 text-[7px] text-gray-900 font-sans leading-tight border border-teal-100 rounded shadow-2xs overflow-hidden select-none flex flex-col justify-between">
        <div className="pb-1 border-b-2 border-teal-700">
          <div className="font-bold text-[8.5px] text-gray-950">POLICE MANOJ</div>
          <div className="text-[6px] font-semibold text-teal-700">Computer Science Undergraduate</div>
          <div className="text-[5.5px] text-gray-500">Hyderabad, India • police.manoj@example.com • github.com/police-manoj</div>
        </div>

        <div className="mt-1">
          <span className="text-[5.5px] font-bold uppercase text-teal-900 bg-teal-50 px-1 py-0.2 rounded">Education</span>
          <div className="font-bold text-[5.8px] text-gray-950 mt-0.5">B.Tech in Computer Science • HIT &amp; Science</div>
          <div className="text-[5.2px] text-teal-800 font-medium">CGPA: 8.7/10.0 • Academic Merit Award</div>
        </div>

        <div className="mt-1">
          <span className="text-[5.5px] font-bold uppercase text-teal-900 bg-teal-50 px-1 py-0.2 rounded">Projects</span>
          <div className="font-bold text-[5.8px] text-gray-950 mt-0.5">Distributed Task Queue Engine (TypeScript, Redis)</div>
          <div className="text-[5.2px] text-gray-600 line-clamp-1">• Built asynchronous worker pool processing 2,500 jobs/min.</div>
        </div>

        <div className="mt-1">
          <span className="text-[5.5px] font-bold uppercase text-teal-900 bg-teal-50 px-1 py-0.2 rounded">Skills</span>
          <div className="text-[5.2px] text-gray-800 mt-0.5">
            Python, Java, TypeScript, React.js, PostgreSQL, Docker, Git
          </div>
        </div>
      </div>
    );
  }

  // 4. Executive & Leadership
  if (templateId === 'executive') {
    return (
      <div className="w-full h-full bg-white p-2.5 text-[7px] text-slate-900 font-sans leading-tight border border-slate-300 rounded shadow-2xs overflow-hidden select-none flex flex-col justify-between">
        <div className="text-center pb-1 border-b-2 border-slate-900">
          <div className="font-extrabold text-[8.5px] uppercase tracking-widest text-slate-950">POLICE MANOJ</div>
          <div className="text-[5.8px] font-semibold uppercase tracking-wider text-slate-700">Engineering Lead / Technical Architect</div>
          <div className="text-[5.5px] text-slate-500 mt-0.5">Hyderabad, India | police.manoj@example.com | +91 90000 00000</div>
        </div>

        <div className="mt-1">
          <div className="font-bold uppercase text-[5.8px] tracking-wider text-slate-900 border-b border-slate-300 pb-0.5">Executive Profile</div>
          <p className="text-[5.2px] text-slate-700 mt-0.5 line-clamp-2 leading-normal">
            Strategic technical leader with a track record of architecting distributed platforms and mentoring high-performing engineering teams.
          </p>
        </div>

        <div className="mt-1">
          <div className="font-bold uppercase text-[5.8px] tracking-wider text-slate-900 border-b border-slate-300 pb-0.5">Core Competencies</div>
          <div className="grid grid-cols-2 gap-1 text-[4.8px] text-slate-700 mt-0.5">
            <div>• Distributed Systems Architecture</div>
            <div>• Technical Agile Leadership</div>
          </div>
        </div>

        <div className="mt-1">
          <div className="font-bold uppercase text-[5.8px] tracking-wider text-slate-900 border-b border-slate-300 pb-0.5">Leadership Experience</div>
          <div className="flex justify-between font-bold text-[5.8px] text-slate-950 mt-0.5">
            <span>Engineering Lead — Nexora Systems</span>
            <span className="font-normal text-slate-500">2021 – Present</span>
          </div>
          <div className="text-[5.2px] text-slate-600 line-clamp-1">• Led core platform modernization reducing response latency by 40%.</div>
        </div>
      </div>
    );
  }

  // 5. Minimal Professional
  if (templateId === 'minimal-professional') {
    return (
      <div className="w-full h-full bg-white p-2.5 text-[7px] text-gray-900 font-sans leading-tight border border-gray-200 rounded shadow-2xs overflow-hidden select-none flex flex-col justify-between">
        <div className="pb-1 border-b border-gray-200">
          <div className="font-bold text-[9px] text-gray-950 tracking-tight">POLICE MANOJ</div>
          <div className="text-[6px] font-medium text-blue-600 tracking-wide">Software Engineer</div>
          <div className="text-[5.2px] text-gray-500 mt-0.5">Hyderabad • police.manoj@example.com • +91 90000 00000</div>
        </div>

        <div className="mt-1">
          <div className="font-bold uppercase text-[5.5px] tracking-widest text-gray-400">About</div>
          <p className="text-[5.2px] text-gray-700 mt-0.5 line-clamp-2 leading-relaxed">
            Analytical software engineer with solid foundations in algorithmic design, full-stack systems, and modern APIs.
          </p>
        </div>

        <div className="mt-1">
          <div className="font-bold uppercase text-[5.5px] tracking-widest text-gray-400">Experience</div>
          <div className="flex justify-between font-semibold text-[5.8px] text-gray-900 mt-0.5">
            <span>Software Intern — Nexora Tech</span>
            <span className="font-normal text-gray-400">2024</span>
          </div>
          <div className="text-[5.2px] text-gray-600 line-clamp-1">• Designed robust REST endpoints and automated integration tests.</div>
        </div>

        <div className="mt-1">
          <div className="font-bold uppercase text-[5.5px] tracking-widest text-gray-400">Skills</div>
          <div className="text-[5.2px] text-gray-700 mt-0.5">
            Python, Java, TypeScript, React.js, PostgreSQL, Docker, Git
          </div>
        </div>
      </div>
    );
  }

  // 6. Technical Specialist
  return (
    <div className="w-full h-full bg-white p-2.5 text-[7px] text-gray-900 font-sans leading-tight border border-blue-200 rounded shadow-2xs overflow-hidden select-none flex flex-col justify-between">
      <div className="pb-1 border-b-2 border-blue-800">
        <div className="flex justify-between items-baseline">
          <div className="font-extrabold text-[8.5px] text-gray-950 tracking-tight">POLICE MANOJ</div>
          <div className="text-[5.5px] font-mono text-gray-500">Hyderabad, India</div>
        </div>
        <div className="text-[6px] font-semibold text-blue-800">Software Engineer / Technical Specialist</div>
        <div className="text-[5.2px] font-mono text-blue-700 mt-0.5">police.manoj@example.com | github.com/police-manoj</div>
      </div>

      <div className="mt-1">
        <div className="font-bold uppercase text-[5.8px] text-blue-900 border-b border-blue-200 pb-0.2">&gt; Skills Matrix</div>
        <div className="text-[5px] text-gray-800 mt-0.5 space-y-0.2">
          <div><span className="font-bold text-blue-950 font-mono">Languages:</span> Python, Java, TypeScript, C++, SQL</div>
          <div><span className="font-bold text-blue-950 font-mono">Stack:</span> React, Next.js, Node.js, Docker, Redis</div>
        </div>
      </div>

      <div className="mt-1">
        <div className="font-bold uppercase text-[5.8px] text-blue-900 border-b border-blue-200 pb-0.2">&gt; Key Projects</div>
        <div className="font-bold text-[5.8px] text-gray-950 mt-0.5">Distributed Task Queue Engine</div>
        <div className="text-[5.2px] text-gray-600 line-clamp-1 font-mono">• Redis Streams worker pool processing 2,500 jobs/min.</div>
      </div>

      <div className="mt-1">
        <div className="font-bold uppercase text-[5.8px] text-blue-900 border-b border-blue-200 pb-0.2">&gt; Education</div>
        <div className="text-[5.2px] text-gray-700">B.Tech in CSE (CGPA: 8.7) • HIT &amp; Science (2022–2026)</div>
      </div>
    </div>
  );
};
