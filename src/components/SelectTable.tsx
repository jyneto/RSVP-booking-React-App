import { useEffect, useState } from "react";
import { getAvailableTables as getAvailFromBookings, createBooking } from "../api/booking";
import { submitRSVP } from "../api/guest";
import{ toUtcIso } from "../utils/time";
import { useBooking } from "../context/BookingCtx";

export default function SelectTable() {
    const { state, setState, tables, setTables} = useBooking();
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    const startTimeUtc = toUtcIso(state.date, state.time);
    getAvailFromBookings(startTimeUtc, state.partySize)
      .then(rows => { 
        if (!mounted) return;
        setTables(rows.map( r => ({
          id: r.tableId,
          tableNumber: r.tableNumber,
          capacity: r.capacity,
          availableSeats: r.capacity, // Enkel logik för tillgängliga platser
        })));
      })
      .catch(err => {
        if (!mounted) return;
        setError(String(err?.message || err));
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });
    return () => { mounted = false; };
  }, [setTables, state.date, state.time, state.partySize]);
    return (
        <div>
            <h2 style={{color:'#7a8450',textAlign:'center'}}>Choose table</h2>
            {loading && <p style={{textAlign:'center'}}>Loading available tables...</p>}
            {error && <p style={{ color: "crimson", textAlign:'center' }}>Error: {error}</p>}
            {!loading && !error && (tables.length === 0 && <p style={{textAlign:'center'}}>No available tables for selected date/time/party size.</p>)}
            <div style={{display:"flex", flexWrap:"wrap", gap:12, justifyContent:"center", alignItems:"stretch"}}>
        {tables.map(t => (
          <button
            key={t.id}
            className={`table-btn${state.tableId === t.id ? ' selected' : ''}`}
            onClick={() => setState(s => ({ ...s, tableId: t.id }))}
          >
            <div><strong>Table #{t.tableNumber}</strong></div>
            <div>Capacity: {t.capacity}</div>
            {typeof t.availableSeats === "number" && (
              <div style={{color: t.availableSeats > 0 ? '#556B2F' : 'crimson', fontWeight:600}}>
                Available seats: {t.availableSeats}
              </div>
            )}
            {state.tableId === t.id && <div style={{color:'#7a8450',marginTop:4}}>Selected</div>}
          </button>
        ))}
            </div>
            <div style={{ marginTop:24, display:"flex", gap:12, justifyContent:'center' }}>
              <button
                  disabled={state.tableId == null || submitting}
                  onClick={async () => {
                    if (state.tableId == null) return;
                    setSubmitting(true);
                    setError(null);
                    try {
                      //Create Guest RSVP
                      const {id: guestId} =
                      await submitRSVP({
                        fullName: state.fullName,
                        email: state.email,
                        phone: state.phone || null,
                        allergies: state.allergies || null,
                        isAttending: state.isAttending == true,
                        tableId: state.tableId!,
                      });

                      const startTimeUtcISO = toUtcIso(state.date, state.time);
                      await createBooking({
                        tableId: state.tableId!,
                        guestId,
                        startTimeUtcISO,
                        partySize: state.partySize,
                      });
                      setState(s => ({ ...s, step: 4 }));
                    } catch (err: any) {
                      const msg =
                        err?.response?.data?.message ||
                        err?.response?.data?.title ||
                        err?.message ||
                        "Could not complete RSVP";
                      setError(String(msg));
                    } finally {
                      setSubmitting(false);
                    }
                  }}
                  className="wedding-btn"
                >
                  {submitting ? "Skickar..." : "Fortsätt"}
               </button>
          <a href="/" className="wedding-btn">Back to Homepage</a>

        {error && <p style={{ color: "crimson", textAlign: 'center' }}>{error}</p>}
      </div>
    </div>
  );
}
