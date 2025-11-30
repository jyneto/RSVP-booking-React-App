import { api } from "./http";

export type AvailableTable ={
  tableId: number;
  tableNumber: number;
  capacity: number;
  availableSeats: number;
};

function clampToPlusOne(n: number){
  return Math.min(Math.max(n, 1), 2);
}

export async function submitRsvpWithBooking(input:  {
  fullName: string;
  email: string;
  phone?: string | null; 
  allergies?: string | null;
  tableId?: number;
  startTimeUtcISO: string;
  partySize: number;
})
{
  const response = await api.post(`/bookings/rsvp`, {
    fullName: input.fullName,
    email: input.email,
    phone: input.phone,
    allergies: input.allergies,
    isAttending: true,
    tableId: input.tableId,
    startTime: input.startTimeUtcISO,
    partySize: clampToPlusOne(input.partySize)
  });
  return response.data;
}

export async function getAvailableTables(startTimeUtcISO: string, partySize: number): Promise<AvailableTable[]> {
  const size = clampToPlusOne(partySize);
  // send top-level JSON body that matches AvailabilityRequestDTO (StartTime, PartySize)
  const response = await api.post(`/bookings/available`, {
    startTime: startTimeUtcISO,
    partySize: size
  });

  return response.data;
}

export async function createBooking(input: {
  tableId: number;
  guestId: number;
  startTimeUtcISO: string;
  partySize: number;
}) {
  const response = await api.post(`/bookings`, {
    tableId: input.tableId,
    guestId: input.guestId,
    startTime: input.startTimeUtcISO,         // matches BookingCreateDTO.StartTime
    partySize: clampToPlusOne(input.partySize) // enforce 1–2 here too
  });
  return response.data;
}
