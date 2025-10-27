Reflektion över bokningsapplikationen

I denna reflektion beskriver jag hur jag strukturerade projektet, hur state hanteras genom bokningsflödet, hur jag säkerställer korrekta API-anrop, samt hur felhantering och vidareutveckling kan se ut.

Komponentstruktur och underhållbarhet
Jag delade upp applikationen i små, återanvändbara komponenter: en komponent för datum/tid (SelectDate), en för bordsval (SelectTable), en för kontaktuppgifter (ContactDetails) och en för bekräftelse (Confirmation). Dessutom använder jag en enkel Context (`BookingCtx`) för att hålla delad state. Denna separation gör koden lätt att läsa och testa: varje komponent har ett tydligt ansvar. Om jag eller en annan utvecklare behöver lägga till nya steg (t.ex. menyval eller betalning) kan vi skapa nya komponenter och lägga till dem i flödet utan att bryta existerande logik.

Statehantering genom flödet
Jag använder Context API för att spara bokningsdata (namn, e-post, datum, tid, party size, valt bord och steg). Context ger en lättviktig lösning som passar detta projekt eftersom state är begränsad till bokningsflödet och inte kräver global komplexitet. Förväntade för- och nackdelar: Context gör det enkelt att läsa/uppdatera state i flera komponenter utan prop‑drilling. Om applikationen växer mycket i komplexitet (realtidsuppdateringar, avancerade offline-flöden) kan Redux eller en server-driven state‑lösning vara mer lämplig för bättre förutsägbarhet och tidresande debug-möjligheter.

Säkerställande av korrekta API-anrop
För att säkerställa att data som skickas till API:et är korrekt validerar och normaliserar frontend värden innan sändning (t.ex. trimma och lowercasa e-post). Backend kräver att bokningar ligger på ett bestämt event‑datum; därför sätter applikationen detta som default och skickar endast party size och val av bord till API:et. Vid hämtning av tillgängliga bord ska frontend skicka ett availability‑request (starttime + partySize) så att servern kan beräkna överlapp och tillgänglighet server‑side — detta minskar race conditions och säkerställer korrekt kapacitetskontroll.

Felhantering och användarfeedback
Under API-anrop visas loading‑indikatorer och knappar inaktiveras för att förhindra dubbelklick. Vid serverfel visas användarvänliga felmeddelanden och för vissa kända fall (t.ex. duplicate email) visas en informativ text eller användaren dirigeras till bekräftelse med ett tydligt meddelande. Om API:et är långsamt ger appen tydlig feedback (spinner, timeout-meddelande) och ger möjlighet att försöka igen.

Vidareutveckling
För framtida funktioner (t.ex. administratörspanel, betalning, flera event) är koden redan strukturerad för expansion: fler komponenter kan läggas till och Context kan migreras till ett mer robust state‑hanteringsbibliotek om nödvändigt. Jag skulle också lägga till fler automatiska tester (unit + integration) runt kritiska flöden (t.ex. bordsval och kapacitetskontroll) för att öka tillförlitligheten.

Sammanfattning
Projektet är designat för att vara enkelt att förstå och vidareutveckla. Genom att hålla state lokal för bokningsflödet, normalisera input och skicka relevanta availability‑requests till servern säkerställer jag att bokningar blir korrekta och robusta. Med ett par förbättringar (mer komplett felhantering, mobilpolish och bygg/deploy‑skript) når applikationen både funktionskraven och en bra användarupplevelse.
