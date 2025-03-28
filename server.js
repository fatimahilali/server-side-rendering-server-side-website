// Importeer het npm package Express (uit de door npm aangemaakte node_modules map)
// Deze package is geïnstalleerd via `npm install`, en staat als 'dependency' in package.json
import express from 'express'

// Importeer de Liquid package (ook als dependency via npm geïnstalleerd)
import { Liquid } from 'liquidjs';


// Maak een nieuwe Express applicatie aan, waarin we de server configureren
const app = express()

// Gebruik de map 'public' voor statische bestanden (resources zoals CSS, JavaScript, afbeeldingen en fonts)
// Bestanden in deze map kunnen dus door de browser gebruikt worden
app.use(express.static('public'))

// Stel Liquid in als 'view engine'
const engine = new Liquid();
app.engine('liquid', engine.express()); 

// Stel de map met Liquid templates in
// Let op: de browser kan deze bestanden niet rechtstreeks laden (zoals voorheen met HTML bestanden)
app.set('views', './views')




// Route-handler voor de hoofdpagina ('/')
app.get('/', async function (request, response) {
  // Haal de data op van de Directus API
  const apiResponse = await fetch('https://fdnd-agency.directus.app/items/fabrique_art_objects');
  const apiResponseJSON = await apiResponse.json();

  // Render de Liquid-template en geef de data mee
  response.render('index.liquid', { artworks: apiResponseJSON.data });
});



// bron:https://www.geeksforgeeks.org/how-to-handle-route-parameters-in-express/


app.get('/detail/:id', async function (request, response) {
  const artworkId = request.params.id; 

  // Haal de specifieke artwork data op
  const apiResponse = await fetch(`https://fdnd-agency.directus.app/items/fabrique_art_objects/${artworkId}?fields=title,image,slug`);
  const artworkData = await apiResponse.json();

  // Haal vier gerelateerde kunstwerken op
  const relatedResponse = await fetch(`https://fdnd-agency.directus.app/items/fabrique_art_objects?limit=4&fields=title,image,slug`);
  const relatedData = await relatedResponse.json();

  // Render de pagina en stuur de opgehaalde data mee
  response.render('detail.liquid', { artwork: artworkData.data, relatedArtworks: relatedData.data
  });
});





//Opdracht filteren
app.get('/filter', async function (request, response) {
  const apiResponse = await fetch('https://fdnd-agency.directus.app/items/fabrique_art_objects');
  const apiResponseJSON = await apiResponse.json(); 

  response.render("filter.liquid", { assignment: apiResponseJSON.data });
});



// Maak een POST route voor de index; hiermee kun je bijvoorbeeld formulieren afvangen
// Hier doen we nu nog niets mee, maar je kunt er mee spelen als je wilt
app.post('/', async function (request, response) {
  // Je zou hier data kunnen opslaan, of veranderen, of wat je maar wilt
  // Er is nog geen afhandeling van een POST, dus stuur de bezoeker terug naar /
  response.redirect(303, '/')
})

// Stel het poortnummer in waar Express op moet gaan luisteren
// Lokaal is dit poort 8000, als dit ergens gehost wordt, is het waarschijnlijk poort 80
app.set('port', process.env.PORT || 8000)

// Start Express op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () {
  // Toon een bericht in de console en geef het poortnummer door
  console.log(`Application started on http://localhost:${app.get('port')}`)
})




// 404-foutpagina : bron :  (backend opdracht)
app.use((req, res) => {
  return res.status(404).render('404.liquid',);
});

