export function toUtcIso(date: string, time: string): string {
    // date = "2026-08-15", time = "18:00"
    // Tolka som lokal tid och konvertera till UTC ISO-sträng
   const localDateTime = new Date(`${date}T${time}:00`);
   return new Date(localDateTime.getTime() - localDateTime.getTimezoneOffset() * 60000).toISOString();
}