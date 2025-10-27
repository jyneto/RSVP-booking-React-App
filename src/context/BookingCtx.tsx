import { createContext, useContext, useState } from "react";
import type { GuestCreateDTO, Table } from "../api/guest";

//Gör state oberoende av Api-typ där det behövs

type BookingState = Omit<GuestCreateDTO, 'isAttending' | 'tableId'> & {
    isAttending: boolean | null; //ett krav för att kunna gå vidare i bokningsflödet
    tableId: number | null; // null tills bord är valts
    // steps: 1 = select date/time/party, 2 = contact details, 3 = select table (if attending) 4 = confirmation
    step: 1 | 2 | 3 | 4;
    date: string;
    time: string;
    partySize: number;
};

type BookingContextType = {
    state: BookingState;
    setState: React.Dispatch<React.SetStateAction<BookingState>>;
    tables: Table[];
    setTables: React.Dispatch<React.SetStateAction<Table[]>>;
};

const BookingCtx = createContext<BookingContextType | null>(null);

export function BookingProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState<BookingState>({
    /* RSVP-fält */
    fullName: "",
    email: "",
    phone: "",
    allergies: "",
    isAttending: null,
    tableId: null,
    /* bokningsfilter */
    // Event is fixed in backend; default to the event date/time so users skip date selection
    date: "2026-08-23",
    time: "18:00",
    partySize: 2,
    /* steg */
    // start at step 2 (contact details) because date/time are fixed for the event
    step: 2
    });
    
    const [tables, setTables] = useState<Table[]>([]);

    return (
        <BookingCtx.Provider value={{ state, setState, tables, setTables }}>
            {children}
        </BookingCtx.Provider>
    );
}

export function useBooking() {
    const context = useContext(BookingCtx);
    if (!context) 
        throw new Error("useBooking must be used within a BookingProvider");
    return context;
}