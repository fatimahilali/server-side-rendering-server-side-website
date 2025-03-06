/**
 * @author Fatima
 * @description Oneindig scrollen in een galerij door afbeeldingen te dupliceren.
 * @file script.js
 */

// Functie om afbeeldingen te dupliceren en toe te voegen aan de galerij
function voegAfbeeldingenToe() {
  document.querySelector(".gallery").innerHTML += document.querySelector(".gallery").innerHTML;
}

// Luister naar het scrollen van de gebruiker
window.addEventListener("scroll", function() {
  // Controleer of de gebruiker bijna onderaan de pagina is
  if (window.scrollY + window.innerHeight >= document.body.scrollHeight - 100) {
      voegAfbeeldingenToe(); // Voeg nieuwe afbeeldingen toe
  }
});
