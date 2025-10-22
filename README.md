# Vignan Timetable Manager

A modern, human-friendly timetable management app for universities. It helps students, faculty, and administrators discover sections, rooms, and schedules quickly — with real-time UX and Excel imports.

- Live preview: https://25d0fb082c484d628f25850b8ea5bad5-36fb012a126d467085b78099f.fly.dev/

## Features
- Clean landing page with quick actions and dark mode
- Section, Faculty, and Room views with printable/exportable layouts
- Excel Timetable Explorer: import multi-sheet Excel, auto-detect columns, validate, query, and store locally
- Optional Firebase integration (guarded if not configured)

## Quickstart
Requirements: Node.js 18+

1) Install dependencies
- cd timetable
- npm install

2) Start dev server
- npm start

3) Build for production
- npm run build
- Output: timetable/build

## Optional: Firebase environment
Create a .env file in timetable/ with the following keys if you plan to use Firebase:
- REACT_APP_FIREBASE_API_KEY=
- REACT_APP_FIREBASE_AUTH_DOMAIN=
- REACT_APP_FIREBASE_PROJECT_ID=
- REACT_APP_FIREBASE_STORAGE_BUCKET=
- REACT_APP_FIREBASE_MESSAGING_SENDER_ID=
- REACT_APP_FIREBASE_APP_ID=

The app automatically runs without Firebase (local data fallback).

## Deploying (Netlify)
- Base directory: timetable
- Build command: npm run build
- Publish directory: timetable/build
Note: Your Netlify account must have permission to deploy; otherwise builds will be denied.

## Project structure (high level)
- timetable/src/components/pages/Home.js — Landing page
- timetable/src/components/TimeTable.js — Timetable + Excel Explorer
- timetable/src/components/ExcelTimetableExplorer.js — Excel import/validation/query
- timetable/src/lib/firebase.js — Optional Firebase wiring (guarded)

## Contributing
Please see CONTRIBUTING.md.

## Sponsors
See SPONSORS.md for ways to support this project.

## License
No license specified yet. If you intend to use this in production, please open a PR to add a license.
