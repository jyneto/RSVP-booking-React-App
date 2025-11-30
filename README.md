Wedding RSVP Booking App

A step-based React booking system integrated with an ASP.NET Core REST API

Overview

This project began as a restaurant booking application following the course assignment instructions.
During development, it evolved into a Wedding RSVP system, but the core functionality of the booking flow remains fully intact:

Selecting date, time, and party size

Fetching available tables based on those choices

Providing contact details

Submitting a reservation to the backend API

Displaying a confirmation page

Alongside the React SPA, an MVC Admin Dashboard is included, allowing administrators to manage:

Guests

Tables

Bookings

Dashboard counters (total guests, bookings, free tables, menu items)

This README explains the system, how it fulfills the assignment requirements, and how to run everything locally.

Tech Stack
Frontend — React (TypeScript)

React + Vite

Context API for global state

Step-based booking flow

API integration (Axios-style HTTP wrapper)

Modern, responsive UI with custom CSS

Clear error messages and loading states

Backend — ASP.NET Core 8 Web API

REST endpoints for guests, tables, bookings

Validation (capacity, overlapping bookings, date rules)

Repository + Service pattern

EF Core + SQL Server

DTO-based API communication

Anonymous RSVP endpoint for wedding guests

Admin Panel — ASP.NET Core MVC

Admin-protected area

CRUD pages for bookings, guests, tables

Dashboard with statistics

Connected to REST API via HttpClient with Bearer token

Assignment Requirements & How This Project Meets Them
Step-Based Booking Flow (React)

The app guides the user through:

Select Date & Time

Enter Contact Details

Choose a Table (if attending)

See Confirmation

A progress bar visually shows each step.

Enter Date, Time, Party Size

Handled in SelectDate.tsx:

Fully clickable custom inputs

Only the wedding date (2026-08-23) is allowed

Party size is chosen on the table-selection step (still fulfills requirement)

Fetching Available Tables

React calls:

POST /api/bookings/available


The backend calculates:

overlapping bookings

used seats

remaining capacity

tables that can fit the selected party size

Results are displayed in SelectTable.tsx.

Submit a Booking with Contact Details

In ContactDetails.tsx, the user provides:

Full name

Email

Phone

Allergies

Attending (Yes/No)

If attending → continues to table selection
If not attending → RSVP is saved without booking (but still fulfills “submit reservation”).

API Integration with Error Handling

All API calls show:

Loading states

Red error messages

Validation messages from API (party size, capacity, wrong date, duplicates)

Modern UI/UX + Responsive Design

Wedding-themed styling

Clickable fields with icons

Mobile-friendly layouts

Clear step indicators

Feedback on selection (highlighted table, red warnings, etc.)

Evolution of the Project

Although the assignment was originally for a restaurant booking system, the project was adapted into a wedding RSVP application.

What Changed
Restaurant App	Wedding RSVP App
Multiple possible dates	Only the wedding date allowed
Restaurant guests	Wedding guests
Generic booking form	RSVP with attending/decline
Party size on first page	Moved to table-selection step
Restaurant branding	Wedding invitation theme
What Stayed the Same (Assignment Requirements)

✔ Step-based SPA
✔ Fetch available tables
✔ Contact details submission
✔ Booking stored in backend
✔ Modern responsive UI
✔ Error handling + validation
✔ REST API integration

Additional Features (Bonus)

MVC Admin Dashboard

Guest + Table + Booking CRUD

Real-time calculated available seats

Strict time/date validation

Repository + service pattern in API

Well-structured architecture

Better UX design than bare minimum

This makes the system more realistic, polished, and professional while fulfilling (and exceeding) course expectations.
