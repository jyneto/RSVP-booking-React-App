# Wedding RSVP Booking App

A step-based React booking (RSVP) system backed by an ASP.NET Core REST API.  
Originally built as a restaurant booking sample for a course assignment, the project was adapted into a wedding RSVP system while preserving the required booking functionality and improving validation, UX, and admin tooling.

---

## Quick overview

Frontend
- React + Vite (TypeScript)
- Step-based booking flow (select date/time → contact details → choose table → confirmation)
- Context API for state, responsive UI, clear loading and error states

Backend
- ASP.NET Core Web API (.NET 9)
- Repository + Service pattern, EF Core for persistence
- DTO-based API contracts and server-side validation
- Anonymous RSVP endpoint for guests and admin-protected endpoints for management

Admin
- ASP.NET Core MVC admin dashboard
- CRUD for Guests, Tables, Bookings and dashboard counters
- Admin UI calls the API using HttpClient with Bearer token

---

## What the app does (user flow)

1. Select date/time and party size (only the wedding date is allowed: `2026-08-23`)
2. Fetch available tables (`POST /api/bookings/available`) — server computes overlap, used seats and remaining capacity
3. Enter contact details and attending status
   - If attending → choose a table (table selection enforces capacity)
   - If not attending → RSVP is saved without a table/booking
4. Submit reservation → backend creates guest/booking as appropriate
5. Confirmation page with reservation details

All API errors and validation messages are surfaced in the UI.

---

## Key endpoints (examples)
- `POST /api/guest` — public RSVP (GuestCreateDTO)
- `POST /api/bookings` — create booking (BookingCreateDTO)
- `POST /api/bookings/available` — check table availability for a slot (AvailabilityRequestDTO)
- `GET /api/bookings`, `GET /api/bookings/{id}` — bookings read
- `api/admin/*` — admin only CRUD endpoints for guests, tables, bookings
- `POST /api/auth/login` — obtain JWT token for admin area

Refer to controllers for exact DTOs and response shapes.

---

## Why this still satisfies the assignment

The original assignment required:
- A step-based booking flow — implemented in the React SPA with progress indicators.
- Requesting available tables and respecting capacity — server computes overlapping bookings and used seats to return valid tables.
- Contact/booking submission — SPA sends DTOs to API; backend validates and persists.
- Modern responsive UI and error handling — implemented with loading states, validation messages and mobile-friendly layout.

Transition rationale:
- The restaurant booking requirements map directly to a wedding RSVP system: both need date/time control, seat capacity, booking overlap prevention and contact data.
- Allows users to choose 1 or 2 guests attending. 
- The app restricts possible dates to the wedding date (business rule) but still demonstrates date/time validation.
- RSVP-only guests (not attending) are saved without a booking, still meeting the "submit reservation" requirement.

In short: original functional goals remain implemented and validated; domain semantics changed to fit a wedding use case without removing assignment requirements.

---

## Notable implementation details

- Booking overlap rule: `existing.Start < newEnd && newStart < existing.End`
- Time handling: times normalized to UTC server-side
- Seat accounting: `UsedSeatsAsync` sums `PartySize` over overlapping bookings
- Table assignment for guests:
  - `GuestCreateDTO` enforces `TableId` when `IsAttending == true`
  - Service layer validates table existence and current guest count vs capacity before persisting
- Admin dashboard uses the same API and requires JWT role `Admin`

---

## Run locally

1. Restore packages:
   - `dotnet restore`
2. Update DB (apply EF migrations):
   - __dotnet ef database update__
3. Run backend:
   - `dotnet run` or in Visual Studio use __Debug > Start Debugging__
4. Run frontend:
   - `npm install` (or `pnpm`/`yarn`)
   - `npm run dev` (Vite)

Open the SPA in the browser for the guest flow; navigate to the admin MVC area and authenticate to manage data.

---

## Evolution: Restaurant app → Wedding RSVP

| Area | Restaurant app | Wedding RSVP app |
|------|----------------|------------------|
| Dates allowed | Multiple possible dates | Only wedding date (`2026-08-23`) |
| User intent | Restaurant reservation | Wedding RSVP (attend/decline) |
| Table choice | Always part of booking | Required only if attending |
| Booking form | Generic | RSVP + attending flag |
| UI tone | Restaurant branding | Wedding invitation theme |

What stayed: step-based SPA, fetching available tables, server-side validation, persistence, responsive UI, and clear error handling.
