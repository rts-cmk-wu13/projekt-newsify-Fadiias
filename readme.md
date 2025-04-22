[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/IV_CIJNp)
## Opgavebeskrivelse - Newsify
I dette projekt skal I udvikle en nyheds-webapplikation som er optimeret til den mobile skærm. I applikationen skal der listes nyheder fra [The New York Times](https://developer.nytimes.com/apis) i et kategoriseret nyhedsoverblik. Det skal være muligt at vælge (klikke på) en nyhed i listen, hvorefter brugeren vil blive sendt videre til den fulde artikel på nytimes.com.<br><br>
Nyhedsartikler skal også kunne gemmes i et privat nyhedsarkiv. Gem funktionen bliver synlig når der swipes til venstre ([se illustration](./assets/swipe-illustration.png "swipe illustration")) på en nyhed. Fra det private nyhedsarkiv kan ligeledes tilgås artikler og artikler kan slettes. Slet funktionen bliver synlig når der swipes til venstre ([se illustration](./assets/swipe-illustration.png "swipe illustration")) på en arkiveret nyhed.<br><br>
Fra settings panelet skal brugeren have mulighed for at administrere det kategoriserede nyhedsoverblik ved at slå visning til eller fra for nyhedskategorier. Fra settings panelet skal brugeren også kunne skifte mellem lyst og mørkt tema.
<br>

### **Målet med opgaven er:**
* At arbejde med automatisering i din udviklingsproces.
* At arbejde med modularisering af css. 
* At arbejde med lagring af indstillinger og data.
* At optimere brugeroplevelsen gennem microinteractions og animationer.

## Applikations tech stack

* HTML (structure)<br>
* JavaScript (logic / data collection)<br>
* Vite (build system)<br>
* Sass (css preprocessor)<br>
* Vitest (testing)
* GitHub / Netlify (host)<br>

## Krav til opgaven

### **User Interface:**
Se Figma-fil (og billeder) i mappen projekt-UI.

1. **Automatisering**<br>
    Din udviklingsproces skal automatiseres med Vite. Du skal opsætte tasks til at flytte og behandle de filer du udvikler til en "dist"-mappe i din udviklingsproces.
    * Oretter/flytter html filer.
    * behandler og sammenskriver sass-filer til en samlet css fil.
    * behandler javascript filer, og sammenskriver dem til én fil.
    * øvrige processer tilføjes efter behov.
   
1. **Animationer**<br>
   En nyhedskategori kan være "åben", så de relaterede artikler fremgår af en liste herunder. En nyhedskategori kan også være    "lukket", sådan at det kun er nyhedskategorien som fremgår af listen men ikke de relaterede artiker. Det er din opgave at animere overgangen mellem "åben" / "lukket" tilstand på en lækker måde.
 
   I settingspanelt kan man "tænde og slukke" for nyhedskategorier. Det er din opgave at animere "kontakternes/switches" overgang fra "tændt" til "slukket".
 
1. **Funktioner**<br>
   I settings-panelet skal brugeren have mulighed for at administrere det kategoriserede nyhedsoverblik ved at slå visning til og fra på udvalgte nyhedskategorier. Det skal også være muligt at skifte mellem lyst og mørkt tema fra settings panelt    og applikationen skal "huske" indstillingerne. 
   
   Nyhedsartikler skal også kunne gemmes i et privat nyhedsarkiv. Gem funktionen bliver synlig når der swipes til venstre ([se illustration](./assets/swipe-illustration.png   "swipe illustration")) på en nyhed. Fra det private nyhedsarkiv kan ligeledes tilgås artikler og artikler kan slettes. Slet    funktionen bliver synlig når der swipes til venstre ([se illustration](./assets/swipe-illustration.png "swipe illustration")) på en arkiveret nyhed.<br>

1. **Testing med Vitest**<br>
   Din applikation skal testes med Vitest. Du skal opsætte og skrive tests for at sikre, at din kode fungerer som forventet. Testene skal dække både funktionalitet og edge cases.

1. **Deploy via GitHub Pages eller Netlify**<br>
   Din webapplikation skal udgives på GitHub Pages eller Netlify.

## Nice to have opgaver
Husk at 'nice-to-have' opgaverne **ikke** er valgfrie opgaver! Det forventes at I begynder at udvikle nedenstående features, når I er færdige med de oblikatoriske opgaver. Husk også at jo flere features I har med i projektet, jo federe er det at vise frem i sit portfolio.

1. Tilføj Swipe-down to refresh på nyhedsliste:
    ([se illustration](./assets/pull-to-refresh-823x1024.png "swipe-down"))
1. Feature tutorial første gang webapplikationen bruges: ([se illustration](./assets/tutorial.png "tutorial"))
1. Gør det muligt at redigere rækkefølgen på kategorier i settings. Rækkefølgen skal have indflydelse på den rækkefølge kategorierne listes i nyhedslisten.

## Evaluering
Jeres projekter vil blive testet på en telefon, så det er vigtigt at I også tester på jeres egne telefoner, og ikke udelukkende tester i browserens emulator.

### **Projektdokumentation**
I filen der hedder [projektdokumentation.md](./projektdokumentation.md) skal I dokumentere jeres projekt og de værktøjer I bruger, samt jeres proces.
