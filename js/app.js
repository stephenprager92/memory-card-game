/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

// SET UP EVENT LISTENERS FOR CARD

// First, we need our handler functions

// FLIP CARD - flips the card to reflect the "other" side
function flipCard(card) {

	//Toggle the class list to add or remove visibility classes
    card.classList.add('open');
    card.classList.add('show');
}


// ADD CLICK EVENT HANDLERS TO CARDS
// Note we are not attaching event handler to deck container (even with slightly optimized performance) 
// because I don't want to cause flip on empty spaces or other objects in deck area

// Fetch cards
const cardList = document.querySelectorAll('.card');

// Loop through cards and add event listeners
for (let i = 0; i < cardList.length; i++) {
	cardList[i].addEventListener('click', function selectCard() {
		// WE'LL ADD GAME RULES HERE LATER
		flipCard(this);
	})
}

