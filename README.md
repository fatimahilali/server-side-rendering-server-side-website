# Qatar Museums Gallery - Responsive Webapp

## Live Website

[Klik hier om de website te bekijken](https://server-side-rendering-server-side-website-b81m.onrender.com/)

## Over het project

Een interactieve gallery waar je artwork kunt ontdekken uit de Qatar Museums-collectie. De webapp haalt afbeeldingen en informatie op via een externe API en toont deze in een, responsive gallery.

## Features

- **Gallery-weergave:** Overzicht van artwork met afbeeldingen en titels.  
- **Detailpagina:** Klik op een artwork voor meer informatie.  
- **Responsive design:** Werkt op mobiel, tablet en desktop.  
- **API-integratie:** Haalt automatisch artwork op via Directus API.  

## Responsive Design

De website is Mobile First ontworpen.

- **Mobiel (≤ 768px):** Eén kolom, grote tapbare afbeeldingen.  
- **Tablet (768px - 1024px):** Twee kolommen, verbeterde lay-out.  
- **Desktop (≥ 1024px):** Vier kolommen, hover-effecten.  

## Ontwerpkeuzes

- **Hover-effecten:** Artwork vergroot en krijgt een schaduw bij hover.  
- **Focus states:** Duidelijke focusstijlen voor toegankelijkheid.  
- **Dynamische layout:** CSS Grid past de weergave aan per schermformaat.  

## Kenmerken & Technieken

Het project maakt gebruik van:

- **HTML:** Semantische opbouw voor toegankelijkheid.  
- **CSS:** Grid en Flexbox voor responsiviteit..  
- **JavaScript (Express.js): Fetch API en server-side rendering met Liquid.  
- **API:** Directus API voor het ophalen van artwork.  

## Installatie & Gebruik

Volg deze stappen om het project lokaal te draaien:

### 1️⃣ Clone de repository  

Open je terminal en voer het volgende uit:
git clone https://github.com/fatimahilali/server-side-rendering-server-side-website.git cd
server-side-rendering-server-side-website

## 2️⃣ Installeer afhankelijkheden  

npm install

### 3️⃣ Start de applicatie  

npm start

### 4️⃣ Open in de browser  

Ga naar: [http://localhost:8000](http://localhost:8000)

## Belangrijke code

De webapp haalt artwork en gerelateerde werken op via de **Directus API** en toont deze in de gallery en op de detailpagina.

### Fetch alle artworks (Homepagina)

```js

// Haal alle artworks op via de Directus API
const apiResponse = await fetch('https://fdnd-agency.directus.app/items/fabrique_art_objects');
const apiResponseJSON = await apiResponse.json();
response.render('index.liquid', { artworks: apiResponseJSON.data });
Fetch één artwork + gerelateerde werken (Detailpagina)

// Haal een specifiek artwork en gerelateerde artworks op
const artworkId = request.params.id;
const detailResponse = await fetch(`https://fdnd-agency.directus.app/items/fabrique_art_objects/${artworkId}?fields=title,image,slug`);
const relatedResponse = await fetch(`https://fdnd-agency.directus.app/items/fabrique_art_objects?limit=4&fields=title,image,slug`);
const artworkData = await detailResponse.json();
const relatedData = await relatedResponse.json();

response.render('detail.liquid', { artwork: artworkData.data, relatedArtworks: relatedData.data });

Wat doet deze code?

Haalt alle artworks op en toont ze op de homepage.
Haalt details van één artwork op wanneer een gebruiker op een item klikt.



