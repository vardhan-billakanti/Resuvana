# Resuvana

An intelligent, ATS-optimized resume builder that transforms raw career experience into high-impact, professional resumes with real-time A4 preview and automated STAR enhancement.

## Overview

**Resuvana** is a modern Next.js web application built to help job seekers create clean, ATS-compliant resumes tailored to industry standards. Featuring an intelligent client-side assistance engine, Resuvana helps users transform task-oriented bullet points into quantifiable STAR-format (Situation, Task, Action, Result) accomplishments, suggests relevant skill taxonomies, and generates export-ready PDFs with pixel-perfect typesetting.

## Features

- **Multi-Section Form Builder**: Guided workflows for Personal Details, Professional Summary, Work Experience, Education, Projects, Technical/Soft Skills, Internships, and Custom Sections.
- **Real-Time A4 Document Preview**: High-fidelity, responsive A4 paper simulation with responsive scaling and live synchronization.
- **Multiple ATS-Friendly Templates**:
  - *Classic ATS*: Optimized for high-throughput applicant tracking systems and text scanners.
  - *Executive*: Clean, authoritative styling with emphasis on leadership scope and ROI.
  - *Modern Professional*: Contemporary typography and subtle accent dividers.
  - *Technical*: Prioritizes technical skills matrices, repositories, and architectural achievements.
  - *Graduate & Minimal*: Streamlined layouts focused on education, internships, and core proficiencies.
- **Built-in AI Assistant Engine**:
  - STAR Method bullet enhancement (Action, Task, Impact).
  - Role-tailored summary generation across junior, mid-level, and senior experience tiers.
  - Contextual skill recommendations across Software, Cybersecurity, Data, and Product roles.
- **Local Privacy & Offline First**: All resume data remains securely in browser state; no credentials or telemetry are dispatched to external servers.
- **Export & Backup**: High-resolution vector PDF export via client-side rendering and JSON export/import for seamless state backups.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **UI Library**: React 18
- **Styling**: Tailwind CSS, PostCSS
- **Icons**: Lucide React
- **Export Engine**: html2pdf.js, Canvas Confetti
- **Language**: TypeScript

## Architecture

```
User Form Input (Builder Views)
           │
           ▼
    ResumeContext (Global State & Local Persistence)
           │
           ├─► lib/aiAssistant.ts (STAR Transformation & Skill Taxonomy)
           ├─► TemplateRenderer.tsx (Template Selection & A4 Layout)
           │         │
           │         ├─► Classic ATS / Modern / Executive / Technical
           │
           ▼
    A4ResumePreview.tsx & lib/pdfGenerator.ts
           │
           ▼
    Downloadable ATS PDF / JSON Backup
```

## Project Structure

```
├── app/
│   ├── builder/         # Core resume editing workspace
│   ├── preview/         # Fullscreen A4 preview page
│   ├── templates/       # Template showcase and switcher
│   ├── layout.tsx       # Root layout and theme wrapper
│   └── page.tsx         # Landing page and features overview
├── components/
│   ├── builder/         # Form sections (Personal, Experience, Skills, etc.)
│   ├── preview/         # A4 paper preview container
│   └── templates/       # Template renderers (Classic, Executive, Modern, etc.)
├── context/
│   └── ResumeContext.tsx # Centralized resume state management
├── lib/
│   ├── aiAssistant.ts   # Rule-based STAR enhancement and suggestion engine
│   ├── pdfGenerator.ts  # PDF canvas generator
│   └── sampleResumes.ts # Pre-populated starter templates
├── types/
│   └── resume.ts        # Comprehensive TypeScript data models
└── .env.example         # Environment variable template
```

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/vardhan-billakanti/Resuvana.git
   cd Resuvana
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment (optional):
   ```bash
   cp .env.example .env.local
   ```

4. Start development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `npm run dev`: Start the local Next.js development server.
- `npm run build`: Build the production-optimized bundle.
- `npm run start`: Run the production server.
- `npm run lint`: Run ESLint analysis.

## Security

Resuvana processes all resume data and document formatting entirely on the client side. No personal resumes, user profiles, or API keys are transmitted across external networks.

## Author

**Billakanti Jaya Vardhan**
- GitHub: [@vardhan-billakanti](https://github.com/vardhan-billakanti)
