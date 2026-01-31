EXECUTE

A minimal two-screen focus app that helps users commit to a single task and execute it with discipline.
The app uses a secure serverless AI API to generate short, strict motivation messages and is deployed on Vercel.

🔹 What This Project Does

Screen 1: User enters a single focus goal

Screen 2: App displays the goal and shows 3 short, strict motivation lines

AI logic runs securely on the backend using a serverless function

No accounts, no distractions, no extra features

The goal is clarity → action → completion.

🔹 Tech Stack

Frontend: HTML, CSS, Vanilla JavaScript

Backend: Vercel Serverless Function

AI: Groq API (via backend only)

Deployment: Vercel

🔹 Project Structure
execute-ai
├── public
│   ├── index.html
│   ├── styles.css
│   ├── script.js
│   └── assets
│       └── logo.svg
└── api
    └── motivation.js


public/ → static site served at /

api/ → serverless backend (/api/motivation)

🔹 Key Learnings

Clean separation between frontend and backend

Secure handling of API keys using environment variables

How Vercel serves static files and serverless APIs together

Debugging real deployment issues (404, root directory structure)

Finishing a project with limited scope instead of overbuilding

🔹 Live Demo

👉 Deployed on Vercel
https://execute-ai.vercel.app/

🔹 Status

This project is finished.
It was intentionally kept minimal as a beginner project.

No further features are planned.