### GRUPP 3

Det här projektet är skapat av Alva Karlborg, Amanda Tell och Fredrik Bramell.
Det är ett Blackjackspel som använder sig av API:et https://deckofcardsapi.com/, 
för att hämta en kortlek, kortens valör och bilder på korten.
Vi har använt detta för att generera slumpade kort vid tryck på en knapp, både för spelaren och datorn/dealern.
Kortens valör adderas och spelaren vinner när denne uppnått 21 eller om dealern blir "tjock", dvs en summa som är större än 21.

Vi har även inkluderat "tokens" som spelaren kan satsa, vinna och förlora. Detta för att öka spänningen.
Dessa sparas i LocalStorage och uppdateras under spelets gång, beroende på spelets resultat.
Vinner spelaren får denne tillbaka poten gånger två, blir det lika får spelaren tillbaka insatsen och förlorar spelaren får dealern poten, dvs den töms. 
