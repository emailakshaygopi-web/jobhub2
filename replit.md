# Overview

JobHub is an AI-powered job search automation system that helps users streamline their job application process. The application combines resume analysis, automated job searching, application tracking, and AI-generated cover letters into a comprehensive platform for job seekers.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **UI Components**: Shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens and animations
- **State Management**: TanStack Query for server state and local React state for UI
- **Routing**: Wouter for lightweight client-side routing
- **Layout**: Main layout with sidebar navigation and header component

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM with PostgreSQL as the database
- **File Processing**: Multer for handling resume uploads with memory storage
- **Validation**: Zod schemas for type-safe data validation
- **Development**: Hot reload with Vite middleware integration

## Database Schema
- **Users**: Basic user management with username/password authentication
- **Resumes**: File storage with parsed content and AI optimization versions
- **Job Applications**: Application tracking with status, platform, and metadata
- **Jobs**: Job listings from external APIs with search capabilities
- **Cover Letters**: AI-generated cover letters linked to applications
- **Company Research**: Cached company information for reuse

## AI Integration Services
- **Resume Analysis**: AI-powered resume parsing and optimization scoring
- **Job Matching**: Intelligent job matching based on resume content
- **Cover Letter Generation**: Personalized cover letter creation using AI
- **Company Research**: Automated company information gathering
- **Email Automation**: Follow-up email generation and sending

## External Dependencies

- **Database**: Neon PostgreSQL serverless database
- **AI Services**: Google Gemini API for text generation and analysis
- **Job Search APIs**: Adzuna API for job listing aggregation
- **Email Service**: EmailJS or similar service for automated email sending
- **File Processing**: PDF and document parsing capabilities
- **UI Components**: Radix UI primitives for accessible components
- **Development Tools**: Replit-specific plugins for development environment