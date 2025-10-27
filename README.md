# RSVP Booking React App

This repository contains a small single‑page React application (TypeScript + Vite) that implements a step‑based RSVP/booking flow for a wedding or small event.

Main purpose
- Let guests enter contact details and attendance.
- If attending: choose an available table for the event (server validates availability and capacity).
- Submit a booking/RSPV to the backend and show a clear confirmation.

Key features
- Step-based UX with progress indicator
- Separate components: SelectDate (optional), SelectTable, ContactDetails, Confirmation
- Context API for booking state
- API integration (fetch available tables, submit RSVP)
- Client-side validation, loading states and friendly error messages

Quick start (development)
1. Install dependencies:
```cmd
npm install
```
2. (Optional) If you use local HTTPS for the dev server (recommended when embedding in an HTTPS MVC page), generate mkcert certs and place `localhost.pem` and `localhost-key.pem` in project root. See notes below.
3. Start dev server:
```cmd
npm run dev
```
The app will run on https://localhost:5173/ (or http depending on config).

Build for production
```cmd
npm run build
```
The production output will be in `dist/`. To serve this from your ASP.NET MVC app, copy the `dist` contents into the MVC project's `wwwroot/rsvp/` folder and link to `/rsvp/index.html`.

Environment
- Configure the API base URL and MVC URL in `.env.local` (this file is ignored by Git):
```
VITE_API_BASE_URL=https://localhost:7008/api
VITE_MVC_URL=http://localhost:5039
```

HTTPS dev server (mkcert)
- To load the React dev server inside an HTTPS MVC page you should run Vite with a trusted local certificate. You can create certs with `mkcert` and put `localhost.pem` + `localhost-key.pem` in the project root. Vite is configured to pick them up if present.

Security / Git
- `.gitignore` excludes `*.pem` and `.env*` — keep secrets out of the repo. If you accidentally commit secrets, remove them from the index and rotate keys.

Project layout (important files)
- `src/components/` — UI components (ContactDetails, SelectTable, Confirmation, ProgressBar, SelectDate)
- `src/context/BookingCtx.tsx` — shared booking state
- `src/api/guest.ts` — API helpers for fetching tables and submitting RSVP
- `vite.config.ts` — Vite config (supports optional local HTTPS)
- `REFLECTION.md` — VG-level reflection about the implementation

Notes & next steps
- If your backend enforces a fixed event date/time (common for weddings), the UI defaults to those values and skips date selection. You can re-enable `SelectDate` if your event supports multiple dates/times.
- For production deployment I recommend adding a small script to copy `dist` into the MVC `wwwroot` and updating the MVC view to link to `/rsvp/index.html`.

Questions or help
- If you want I can:
  - add a build→deploy script that copies `dist` into your MVC project,
  - help push this repo to GitHub (commands prepared), or
  - implement the availability POST payload so the frontend asks the backend for available tables using the event start time and party size.

---
Created as part of a course assignment — implement and test the booking flow, handle errors and provide the VG reflection in `REFLECTION.md`.
