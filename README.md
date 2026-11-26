# UNSTUCK — From Confusion to Completion

UNSTUCK is an AI-powered browser assistant that makes government services easier to access and use.

It helps people discover government schemes, understand eligibility requirements, prepare necessary documents and navigate online government application forms through simple, step-by-step guidance.

## Problem Statement

Many people struggle to access online government services because they find it difficult to:

- Find the correct government portal.
- Understand scheme eligibility criteria.
- Identify required documents.
- Understand and fill online application forms.
- Complete applications independently.

As a result, people often depend on internet centres or others for assistance.

## Our Solution

UNSTUCK provides two major assistance workflows.

### 1. Scheme Assistance

Helps students and individuals discover relevant government schemes and welfare benefits.

Features:
- Scheme Finder
- Eligibility Checker
- Document Assistant
- Application Tracker

### 2. Public Service Assistance

Helps users navigate government websites and understand online application procedures.

Features:
- Service Finder
- Form Guide
- AI-powered Browser Assistant
- Guided Form Filling

Users can review the information entered and remain in control of important actions, including final submission.

## How It Works

1. The user describes what they need.
2. UNSTUCK identifies the user's requirement.
3. The system directs the user to Scheme Assistance or Public Service Assistance.
4. AI provides relevant information and guidance.
5. Users check eligibility, prepare documents or navigate supported application forms.
6. Users review the information and proceed with their applications.

## Technology Stack

- **Frontend:** React, TypeScript, Tailwind CSS
- **Backend:** Python, FastAPI
- **AI Integration:** LLM API
- **Browser Automation:** Playwright
- **Document Processing:** OCR
- **Database:** SQLite
- **Development Tools:** VS Code, Git, GitHub

## System Architecture

UNSTUCK uses a shared backend to connect both workflows.

- React and TypeScript provide the user interface.
- FastAPI manages backend requests and application logic.
- The Scheme Module handles scheme discovery and eligibility checking.
- The Public Service Module helps users identify portals and understand application forms.
- LLM integration provides AI-powered explanations and guidance.
- OCR extracts information from uploaded documents.
- Playwright supports browser automation for selected government portals.
- SQLite stores relevant user information and application progress.

## MVP Scope

The initial prototype focuses on selected government schemes and supported public-service applications.

The main demonstrations include:

- Scholarship discovery and eligibility checking.
- Scheme-specific document checklists.
- Government portal identification.
- AI-powered form explanations.
- Guided browser-based form filling.
- Application progress tracking.

## Security and User Control

- Scheme information is based on official sources.
- Unverified eligibility criteria are clearly identified.
- Users review extracted document information.
- OTPs and CAPTCHAs remain under user control.
- Final application submission requires user approval.
- Only necessary user information is collected.

## Future Enhancements

- Support for Kannada, English, Hindi and other regional languages.
- Voice-based assistance.
- Integration with additional government schemes and services.
- Improved document recognition.
- Application deadline reminders.
- Offline-friendly assistance.

## Vision

Our vision is to make digital public services easier to understand and access, especially for people who are less comfortable navigating online platforms.

**One platform. Two workflows. A simpler way to get things done.**

*Built with the belief that accessing an online service shouldn't feel like solving a puzzle.*
