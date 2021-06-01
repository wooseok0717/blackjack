///////////////////////////////////////////////////////
//////////////////////// MODEL ////////////////////////
///////////////////////////////////////////////////////

////////////////// Table Constructor //////////////////
function Table() {
  this.deck = new Deck();
  this.player = new Player();
  this.dealer = new Player();
  this.deck.initialize();
  this.deck.shuffle();

  this.playerHit = () => {
    this.player.hit(this.deck);
  };
  this.dealerHit = () => {
    this.dealer.hit(this.deck);
  };
  this.gameStart = () => {
    this.player.emptyHands();
    this.dealer.emptyHands();
    this.playerHit();
    this.dealerHit();
    this.playerHit();
    this.dealerHit();
  };

}

////////////////// Card Constructor //////////////////
function Card(value, suite) {
  this.value = value;
  this.suite = suite;
}

////////////////// Deck Constructor //////////////////
function Deck(count=4) {
  this.count = count;
  this.value = ['Ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King'];
  this.suite = ['Hearts', 'Spades', 'Diamonds', 'Clubs'];
  this.deck = [];
  // Deck Methods
  this.initialize = () => {
    this.value.forEach(val => {
      this.suite.forEach(icon => {
        for (var x = 0; x < count; x++) {
          this.deck.push(new Card(val, icon));
        }
      })
    })
  }
  this.shuffle = () => {
    for (var x = 0; x < this.deck.length; x++) {
      var y = Math.floor(Math.random() * this.deck.length);
      var temp = this.deck[x];
      this.deck[x] = this.deck[y];
      this.deck[y] = temp;
    }
  }
  this.draw = () => {
    var card = this.deck.pop();
    return card;
  }
}

////////////////// Player Constructor //////////////////
function Player() {
  this.hand = [];
  this.value = 0;

  this.emptyHands = () => {
    this.hand = [];
    this.value = 0;
  }
  this.hit = (deck) => {
    var newCard = deck.draw();
    this.hand.push(newCard);
    if (typeof(newCard.value) === 'number') {
      this.value += newCard.value;
    } else if (newCard.value === 'Ace') {
      this.value += 11;
    } else {
      this.value += 10;
    }
  }
}

///////////////////////////////////////////////////////
//////////////////////// VIEW /////////////////////////
///////////////////////////////////////////////////////


///////////////////////////////////////////////////////
////////////////////// Controller /////////////////////
///////////////////////////////////////////////////////