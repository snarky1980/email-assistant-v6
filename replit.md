# Email Assistant v6 - React Application

## Overview
Modern React application for professional email generation with intelligent variable highlighting. Built with React 19, Vite, and Tailwind CSS.

## Recent Changes
- **2025-09-25**: Successfully set up for Replit environment
  - Installed dependencies using pnpm
  - Configured Vite for port 5000 and proper host settings
  - Set up development workflow  
  - Configured autoscale deployment

## Project Architecture
- **Frontend**: React 19 + Vite + Tailwind CSS
- **UI Components**: Radix UI components with custom styling
- **Package Manager**: pnpm
- **Build Tool**: Vite 6.x
- **Deployment**: Configured for Replit autoscale

## User Preferences
- Uses pnpm for package management (existing project preference)
- French comments in configuration files (preserved)
- Tailwind CSS for styling
- Component-based architecture with custom hooks

## Development Setup
- Server runs on port 5000 (required for Replit)
- Host configured as 0.0.0.0 with allowedHosts: "all"
- Hot reload enabled via Vite
- ESLint configured for code quality

## Key Features
- Email template generation
- Variable highlighting and editing
- Template selection interface  
- Form validation with React Hook Form
- Responsive design with Tailwind

## Deployment Configuration
- Target: Autoscale (suitable for stateless frontend)
- Build: `pnpm build`
- Run: `pnpm preview`