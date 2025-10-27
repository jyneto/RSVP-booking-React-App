import { useBooking } from "../context/BookingCtx";

export default function Confirmation() {
    const { state, tables } = useBooking();
    const table = tables.find(t => t.id === state.tableId);
    return (
        <div className="wedding-card" style={{ textAlign: "center" }}>
            <h2 style={{ color: "#556B2F" }}>RSVP Confirmation</h2>
            <p>Thank you, <b>{state.fullName}</b>, for your RSVP!</p>
            <p>Event: <b>{state.date}</b> at <b>{state.time}</b> • Party size: <b>{state.partySize}</b></p>
            {state.isAttending ? (
                <>
                    <p>We are happy you are attending!</p>
                    {table && (
                        <p>Your table: <b>Table {table.tableNumber}</b></p>
                    )}
                    {state.allergies && (
                        <p>Dietary restrictions: <b>{state.allergies}</b></p>
                    )}
                    <p>A confirmation email has been sent to <b>{state.email}</b>.</p>
                </>
            ) : (
                <>
                    <p>We're sorry you can't make it, but thank you for letting us know!</p>
                    <p>Your RSVP has been registered and a confirmation email has been sent to <b>{state.email}</b>.</p>
                </>
            )}
            
         <a href={import.meta.env.VITE_MVC_URL} className="wedding-btn" rel="noreferrer" >Homepage</a>

        </div>
    );
}