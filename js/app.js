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


 // GLOBAL VARS 
const activeCards = [];  // Array to hold 'active' or selected cards
const activeCardTimer = 2; // Time (in ms) for 'active' cards to hold after a selection


// SET UP EVENT LISTENERS FOR CARD

// First, we need our handler functions

// FLIP CARD - flips the card to reflect the "other" side
function flipCard(card) {

	//Toggle the class list to add or remove visibility classes
    card.classList.toggle('open');
    card.classList.toggle('show');
}

// MODIFY ACTIVE CARD LIST

// ADD CARD TO LIST 
// Since we are using push, this function returns the length of the active card list (check for 2)
function addActiveCard(card) {
	flipCard(card);
	return activeCards.push(card);
}

// REMOVE CARDS FROM LIST
function removeActiveCards() {
    
    // Note this needs to be on a delay for users to see the symbols - therefore, set Timeout
    setTimeout( function() {

    	// First, check for match
    	checkMatch(activeCards);

        // Then, iterate and flip
    	const len = activeCards.length;

		for (i = 0; i < len; i++) {
			card = activeCards.pop();
			flipCard(card);
		}
	}, activeCardTimer * 1000);
}

// CHECK FOR MATCH IN ACTIVE CARD LIST
function checkMatch(activeCards) {
    
    // Pull <i> child elements of each active card (where symbol classes are found)
    activeCardChild1 = activeCards[0].firstElementChild;
    activeCardChild2 = activeCards[1].firstElementChild;


    // Compare symbols (found as second class) of active card <i> children to see if there is a match 
    if (activeCardChild1.classList[1] === activeCardChild2.classList[1]) {

    	// If match, add match class to each card
    	activeCards[0].classList.toggle('match');
    	activeCards[1].classList.toggle('match');
    
    }
}

// ADD EVENT LISTENERS TO CARDS THAT RESPOND TO RULES OF GAME 
// Fetch cards
const cardList = document.querySelectorAll('.card');

// Loop through cards and add listeners
for (let i = 0; i < cardList.length; i++) {
	cardList[i].addEventListener('click', function selectCard() {
		
		// If two active cards, evaluate match and remove from active list
		if (addActiveCard(this) === 2) {
			removeActiveCards();
		}
	})
}



