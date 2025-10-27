import type { FormEvent } from "react";
import { useState } from "react";
import { useBooking } from "../context/BookingCtx";

export default function SelectDate() {
    const { state, setState } = useBooking();
    const [localDate, setLocalDate] = useState(state.date ?? "");
    const [localTime, setLocalTime] = useState(state.time ?? "18:00");
    const [partySize, setPartySize] = useState<number>(state.partySize ?? 2);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!localDate) return setError("Please choose a date");
        if (!localTime) return setError("Please choose a time");
        if (!partySize || partySize < 1) return setError("Please enter a valid party size");

        // Save into global booking state and go to contact step
        setState(prev => ({ ...prev, date: localDate, time: localTime, partySize, step: 2 }));
    };

    return (
        <div className="wedding-card">
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                <div className="wedding-title">Select Date & Time</div>
                {error && <p style={{ color: "crimson", textAlign: "center" }}>{error}</p>}
                <div className="wedding-grid">
                    <label>
                        Date*
                        <input type="date" value={localDate} onChange={(e) => { setLocalDate(e.target.value); setError(null); }} required />
                    </label>
                    <label>
                        Time*
                        <input type="time" value={localTime} onChange={(e) => { setLocalTime(e.target.value); setError(null); }} required />
                    </label>
                    <label>
                        Party size
                        <input type="number" min={1} max={20} value={partySize} onChange={(e) => setPartySize(Number(e.target.value))} />
                    </label>
                </div>
                <div style={{marginTop:18, display:"flex", gap:12, justifyContent:'center'}}>
                    <button type="submit" className="wedding-btn">Next</button>
                </div>
            </form>
        </div>
    );
}
