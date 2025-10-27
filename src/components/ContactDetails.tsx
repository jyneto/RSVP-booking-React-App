import type { FormEvent } from "react";
import { useState } from "react";
import { submitRSVP } from "../api/guest";
import { useBooking } from "../context/BookingCtx";

export default function ContactDetails() {
    const { state, setState } = useBooking();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!state.fullName?.trim()) return setError("Full name is required");
        if (!state.email?.trim()) return setError("Email is required");
        setLoading(true);
        setError(null);

        if (state.isAttending === null) return setError("Please choose attendance option");
        try {
            if (state.isAttending === true) {
                // Gå till SelectTable för bordsval
                setState(prev => ({ ...prev, step: 3 }));
            } else {
                // Registrera RSVP direkt och visa bekräftelse
               await submitRSVP({
                    fullName: state.fullName,
                    email: state.email ,
                    phone: state.phone || null,
                    allergies: state.allergies || null,
                    isAttending: false,

                });

                setState((prev) => ({ ...prev, step: 4 }));
            }
        } catch (err: any) {
            const errorText = err?.response?.data?.message || err?.message || "";
            const errorJson = err?.response?.data?.errors ? JSON.stringify(err.response.data.errors) : "";
            if (!state.isAttending && (
                errorText.toLowerCase().includes("already exist") ||
                errorJson.toLowerCase().includes("already exist") ||
                errorText.toLowerCase().includes("validation error")
            )) {
                // setError("We have now registered your RSVP. We're sorry you can't make it. See you some other time!");
                setTimeout(() => setState((prev) => ({ ...prev, step: 4 })), 1500);
            } else {
                setError(errorText || "Failed to submit RSVP");
            }
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="wedding-card">
            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                <div className="wedding-title">Contact Details</div>
                <div style={{textAlign:'center', marginBottom:8}}>
                    <small style={{color:'#556B2F'}}>Event date: <strong>{state.date}</strong> • Time: <strong>{state.time}</strong></small>
                    <div><small>Party size: <strong>{state.partySize}</strong></small></div>
                </div>
                {error && <p style={{ color: "crimson", textAlign: "center" }}>{error}</p>}
                <div className="wedding-grid">
                    <label>Full Name*
                        <input
                            // value={state.fullName}  
                            value={state.fullName ?? ""} 
                            onChange={(e) => setState({ ...state, fullName: e.target.value })}
                            required
                        />
                    </label>
                    <label>
                        Email*
                        <input
                            type="email"
                            value={state.email ?? ""}
                            onChange={(e) => setState({ ...state, email: e.target.value })}
                            required
                        />
                    </label>
                    <label>
                        Phone Number
                        <input
                            type="tel"
                            value={state.phone ?? ""}
                            onChange={(e) => setState({ ...state, phone: e.target.value })}
                        />
                    </label>
                    <label>
                        Dietrary Restrictions / Allergies
                        <input
                            type="text"
                            value={state.allergies ?? ""}
                            onChange={(e) => setState({ ...state, allergies: e.target.value })}
                        />
                    </label>
                    <div>
                        <span>Are you attending?</span>
                        <div style={{display: "flex", gap:12, marginTop:6}}>
                            <label>
                                <input
                                    type="radio"
                                    name="isAttending"
                                    className="radio-btn"
                                    checked={state.isAttending === true}
                                    onChange={() => setState({ ...state, isAttending: true })}
                                    required
                                />
                                Yes
                            </label>
                            <label>
                                <input 
                                   
                                    type="radio"
                                    name="isAttending"
                                    className="radio-btn"
                                    checked={state.isAttending === false}
                                    onChange={() => setState({ ...state, isAttending: false })}
                                />
                                No
                            </label>
                        </div>
                    </div>
                </div>
                <div style={{marginTop:18, display:"flex", gap:12, justifyContent:'center'}}>
                    
                    <button type="submit" className="wedding-btn" disabled={loading || state.isAttending === null}>
                        {loading ? "Submitting..." : "Submit RSVP"}
                    </button>
                </div>
            </form>
        </div>
    );
}