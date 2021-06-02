///////////////////////////////////////////////////////
//////////////////////// MODEL ////////////////////////
///////////////////////////////////////////////////////

////////////////// Table Constructor //////////////////
function Table() {
  this.deck = new Deck();
  this.player = new Player('player');
  this.dealer = new Player('dealer');
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
function Player(name) {
  this.name = name;
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

//////////////////// Render Cards /////////////////////
function renderCard(card) {
  var currentImg = "images/" + card.value + card.suite + ".jpg"
  var current = document.createElement('img');
  current.setAttribute('src', currentImg);
  current.classList.add('card');
  return current;
}

//////////////////// Render Cards //////////////////////
function renderCards(hand) {
  result = [];
  hand.forEach(card => {
    result.push(renderCard(card));
  });
  return result;
}

//////////////////// Render Cards //////////////////////
function renderHand(player) {
  var hand = document.createElement('div');
  hand.classList.add('hand');
  renderCards(player.hand).forEach(card => {
    hand.append(card);
  });
  return hand;
}

function renderValue(player) {
  var value = document.createElement('div');
  value.classList.add(player.name + 'value', 'value');
  value.innerHTML = 'Value: ' + player.value;
  return value;
}
//////////////////// Render Hand //////////////////////
function renderPlayer(player) {
  var currentPlayer = document.querySelector('#' + player.name);
  currentPlayer.innerHTML = "";
  var name = document.createElement('div');
  name.classList.add('playername');
  name.innerHTML = player.name;
  currentPlayer.append(renderHand(player));
  currentPlayer.append(name);
  currentPlayer.append(renderValue(player));
}

/////////////////// Render Buttons /////////////////////
function renderButtons() {
  var buttons = document.createElement('div');
  buttons.classList.add('buttons');
  buttons.append(renderDouble());
  buttons.append(renderHit());
  buttons.append(renderStay());
  document.querySelector('#player').append(buttons);
}

///////////////////// Render HIT ///////////////////////
function renderHit() {
  var hitButton = document.createElement('button');
  hitButton.classList.add('hit');
  hitButton.innerHTML = "HIT";
  hitButton.addEventListener('click', handleHit);
  return hitButton;
}

///////////////////// Render Stay ///////////////////////
function renderStay() {
  var stayButton = document.createElement('button');
  stayButton.classList.add('stay');
  stayButton.innerHTML = 'STAY';
  stayButton.addEventListener('click', () => {console.log('hello')});
  return stayButton;
}

///////////////////// Render Double ///////////////////////
function renderDouble() {
  var doubleButton = document.createElement('button');
  doubleButton.classList.add('double');
  doubleButton.innerHTML = 'DOUBLE';
  doubleButton.addEventListener('click', () => {console.log('hello')});
  return doubleButton;
}

//////////////////// Render START //////////////////////

function renderStart() {
  var startButton = document.createElement('button');
  startButton.innerHTML = 'START';
  startButton.classList.add('startbutton');
  startButton.addEventListener('click', brandNewGame);
  document.querySelector('#center').append(startButton);
}

//////////////////// Render Rematch //////////////////////
function renderRematch() {
  var rematchButton = document.createElement('button');
  rematchButton.innerHTML = 'Rematch?'
  rematchButton.addEventListener('click', startGame);
  return rematchButton;
}


///////////////////// Render Bust ///////////////////////
function renderBust() {
  var busted = document.createElement('div');
  busted.innerHTML = 'BUSTED'
  return busted;
}

///////////////////////////////////////////////////////
////////////////////// Controller /////////////////////
///////////////////////////////////////////////////////

/////////////////// Start New Game /////////////////////

renderStart();
var activeTable;
function brandNewGame() {
  activeTable = new Table();
  startGame();
}

///////////////////// Start Game ///////////////////////
function startGame() {
  activeTable.gameStart();
  document.querySelector('#center').innerHTML = '';
  renderPlayer(activeTable.dealer);
  renderPlayer(activeTable.player);
  renderButtons();
}

//////////////////// Activate Hit //////////////////////
function handleHit() {
  activeTable.playerHit();
  renderPlayer(activeTable.player);
  if (!checkBust(activeTable.player.value)) {
    renderButtons();
  } else {
    handleBust();
  }
}

//////////////////// Handle Bust //////////////////////
function handleBust() {
  var center = document.querySelector('#center');
  center.innerHTML = '';
  center.append(renderBust());
  center.append(renderRematch());
}

////////////////// Check For Bust ///////////////////
function checkBust(input) {
  if (input > 21) {
    return true;
  } else {
    false;
  }
}