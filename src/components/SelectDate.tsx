import type { FormEvent } from "react";
import { useState } from "react";
import { useBooking } from "../context/BookingCtx";
import "./selectDate.css";

const EVENT_DATE = "2026-08-23"; // samma som i backend

export default function SelectDate() {
  const { state, setState } = useBooking();
  const [localDate, setLocalDate] = useState(state.date ?? "");
  const [localTime, setLocalTime] = useState(state.time ?? "18:00");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!localDate) return setError("Please choose a date");

    if (localDate !== EVENT_DATE) {
      return setError(`Bookings can only be made on ${EVENT_DATE}.`);
    }

    if (!localTime) return setError("Please choose a time");

    setState(prev => ({
      ...prev,
      date: localDate,
      time: localTime,
      step: 2,
    }));
  };

  const openPicker = (id: string) => {
    const el = document.getElementById(id) as HTMLInputElement | null;
    if (!el) return;
    const anyEl = el as any;
    if (typeof anyEl.showPicker === "function") {
      try { anyEl.showPicker(); return; } catch {}
    }
    el.focus();
    try { el.click(); } catch {}
  };

  return (
    <div className="wedding-card">
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <div className="wedding-title">Select Date &amp; Time</div>

        {error && (
          <p style={{ color: "crimson", textAlign: "center" }}>{error}</p>
        )}

        <div className="wedding-grid">
          {/* DATE FIELD */}
          <label className="field-label">
            <span className="field-title">Date*</span>

            <div
              className="clickable-input"
              onClick={() => openPicker("dateInput")}
            >
              <span className="input-text">
                {localDate || "Click to choose a date"}
              </span>

              {/* <span className="input-icon">📅</span> */}

              <input
                id="dateInput"
                type="date"
                value={localDate}
                onChange={(e) => {
                  const value = e.target.value;
                  setLocalDate(value);

                  if (value && value !== EVENT_DATE) {
                    setError(`Bookings can only be made on ${EVENT_DATE}.`);
                  } else {
                    setError(null);
                  }
                }}
                className="real-input"
                required
              />
            </div>
          </label>

          {/* TIME FIELD */}
          <label className="field-label">
            <span className="field-title">Time*</span>

            <div
              className="clickable-input"
              onClick={() => openPicker("timeInput")}
              style={{ opacity: !localDate ? 0.5 : 1 }}
            >
              <span className="input-text">
                {localTime || "Click to choose a time"}
              </span>
{/* 
              <span className="input-icon">⏰</span> */}

              <input
                id="timeInput"
                type="time"
                value={localTime}
                onChange={(e) => {
                  setLocalTime(e.target.value);
                  setError(null);
                }}
                className="real-input"
                required
                disabled={!localDate}
              />
            </div>
          </label>
        </div>

        <div
          style={{
            marginTop: 18,
            display: "flex",
            gap: 12,
            justifyContent: "center",
          }}
        >
          <button
            type="submit"
            className="wedding-btn"
            disabled={!localDate || !!error}
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
}
