import {api} from "./http";

export type Table = {
    id: number;
    tableNumber: number;
    capacity: number;
    availableSeats: number; // Lägg till detta fält
};

export type GuestCreateDTO = {
    fullName: string;
    email: string;
    phone?: string | null;
    allergies?: string | null;
    isAttending: boolean;
    tableId?: number | null; // makes it optional
};
// export async function getAvailableTables(): Promise<Table[]> {
//     const response = await api.get("/guest/available-tables");
//     return response.data;
// }

export async function submitRSVP(payload: GuestCreateDTO): Promise<{id: number}> {
    const response = await api.post("/guest", payload);
    return response.data;
}



