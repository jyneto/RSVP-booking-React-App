import { api } from "./http";

export type AvailableTable ={
    tableId: number;
    tableNumber: number;
    capacity: number;
};

export async function getAvailableTables(startTimeUtcISO: string, partySize: number): Promise<AvailableTable[]> {
    const response = await api.post(`/tables/available`, {
        params: {
            startTime: startTimeUtcISO,
            partySize
        }
    });
    return response.data;
}

export async function createBooking(input: {
    tableId: number;
    guestId: number;
    startTimeUtcISO: string;
    partySize: number;
})
{
    const response = await api.post(`/bookings`,{
        tableId: input.tableId,
        guestId: input.guestId,
        startTimeUtcISO: input.startTimeUtcISO,
        partySize: input.partySize
    });
    return response.data; //BookingGetDTO
}