// Steve Prager Card Matching Game - app.js
// Udacity FEND Project #2


 // GLOBAL VARS 
const activeCards = [];  // Array to hold 'active' or selected cards
const activeCardTimer = 1; // Time (in seconds) for 'active' cards to hold after a selection
let pairsMatched = 0; // Total number of pairs currently matched
let moveCounter = 0; // Total number of moves currently made
let cardSymbols = ['fa-diamond', 'fa-diamond', 'fa-paper-plane-o', 'fa-paper-plane-o',
                   'fa-anchor','fa-anchor', 'fa-bolt', 'fa-bolt', 'fa-cube', 'fa-cube',
                   'fa-leaf', 'fa-leaf', 'fa-bicycle', 'fa-bicycle', 'fa-bomb', 'fa-bomb']; // Note each symbol class is represented twice (as it will appear in the deck twice)
const cardCount = cardSymbols.length; // Number of cards in the game
const totalPairs = cardCount / 2; // Total number of pairs in the card game
let starCount = 3; // Game score (in stars). Reduced as more moves are applied
const threeStarThreshold = 15; // 3-star score threshold (in moves). More moves means 3-star score is impossible.
const twoStarThreshold = 25; // 2-star score threshold (in moves). More moves means 2-star score is impossible.
const startTime = new Date(); // Start Time. Set when the page is loaded.


// Create an HTML card deck and add to the DOM
// Since 'deck' element is a <ul> element, cards will be <li> elements and symbols will be <i> font elements
function createDeck() {

	// Shuffle card symbols  
	shuffledCards = shuffle(cardSymbols);

	// Pull deck element
	const deck = document.querySelector('.deck');

	// Loop through cardCount, create card, add symbol, add to deck
	for (let i = 0; i < cardCount; i++) {

		const newCard = document.createElement('li');
		const newSymbol = document.createElement('i');
	    newCard.classList.add('card');
	    newSymbol.classList.add('fa', cardSymbols[i]);
		newCard.appendChild(newSymbol);
		deck.appendChild(newCard);
	}	
}

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

    	// Increment pairsmatched
    	pairsMatched++;
    }
}


// INCREMENT MOVE COUNTER
function incrementMoveCounter() {

	// Increment the move counter variable
	moveCounter++;

	// grab the move counter element
	const counter = document.querySelector('.moves');

	// Update the element's text content
	counter.textContent = moveCounter;
}


// UPDATE SCORE (STARS) IF THRESHOLD IS REACHED
function updateScore() {

	// Check move counter - if at a threshold, remove one star and update stars variable
	if (moveCounter === threeStarThreshold || moveCounter === twoStarThreshold) {
		const stars = document.querySelector('.stars');
		stars.removeChild(stars.lastElementChild);
		starCount--;
	}
}

// CHECK IF GAME HAS BEEN WON. IF SO, UPDATE SCREEN. 
function checkWinner() {
	if (moveCounter > 0) {
	//if (pairsMatched === totalPairs) {

		// Update modal text to show current score and time playing game
		const modalScore = document.querySelector('.score');
		modalScore.innerHTML = document.querySelector('.stars').innerHTML;

		// Set star style to display properly
		modalScore.style.listStyle = "none";
		const modalScoreStars = document.querySelectorAll('.score li');
		for (i = 0; i < modalScoreStars.length; i++) {
			modalScoreStars[i].style.display = "inline-block";
		}

		// Adjust ms time to seconds
		const modalTime = document.querySelector('.time');
		modalTime.textContent = Math.round((new Date() - startTime) / 1000);

		// Display modal
		const victoryModal = document.querySelector('#victoryModal');
		victoryModal.style.display = 'block';

	}
}


// EXECUTION CODE

// Create deck
createDeck();

// ADD EVENT LISTENERS TO CARDS THAT RESPOND TO RULES OF GAME 
// Fetch cards
const cardList = document.querySelectorAll('.card');

// Loop through cards and add listeners
for (let i = 0; i < cardList.length; i++) {
	cardList[i].addEventListener('click', function selectCard() {
				
		// Add active card (executed in conditional). If two active cards... 
		if (addActiveCard(this) === 2) {
			
            // Increment move counter
			incrementMoveCounter();
			
			// Update the (star) score
            updateScore();
	
	        // Check for a match
    	    checkMatch(activeCards);

    	    // Remove active cards from list
			removeActiveCards();

			// Check for a winner
			checkWinner();
		}

	})
}



