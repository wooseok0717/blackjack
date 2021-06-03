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
  this.aceCount = 0;

  this.emptyHands = () => {
    this.hand = [];
    this.value = 0;
  }
  this.hit = (deck) => {
    var newCard = deck.draw();
    if (newCard.value === 'Ace') {
      this.aceCount++;
    }
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
  buttons.setAttribute('id', 'buttons');
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
  stayButton.addEventListener('click', handleStay);
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

///////////////////// Render Bust ///////////////////////
function renderDealerBust() {
  var dealerBust = document.createElement('div');
  dealerBust.innerHTML = 'Dealer Busted!! You won!!';
  return dealerBust;
}

///////////////////// Render Draw ///////////////////////
function renderDraw() {
  var draw = document.createElement('div');
  draw.innerHTML = 'Draw!!';
  return draw;
}

///////////////////// Render Draw ///////////////////////
function renderLost() {
  var lost = document.createElement('div');
  lost.innerHTML = 'You Lost!';
  return lost;
}

///////////////////// Render Draw ///////////////////////
function renderWon() {
  var lost = document.createElement('div');
  lost.innerHTML = 'You Won!!';
  return lost;
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
  console.log(activeTable.deck.deck.length);
  if (activeTable.deck.deck.length < 30) {
    activeTable = new Table();
  };
  activeTable.gameStart();
  document.querySelector('#center').innerHTML = '';
  renderPlayer(activeTable.dealer);
  renderPlayer(activeTable.player);
  renderButtons();
}

///////////////// Activate Hit Player //////////////////
function handleHit() {
  activeTable.playerHit();
  if (!checkBust(activeTable.player.value)) {
    renderPlayer(activeTable.player);
    renderButtons();
  } else {
    if (activeTable.player.aceCount) {
      activeTable.player.value -= 10;
      activeTable.player.aceCount--;
      renderPlayer(activeTable.player);
      renderButtons();
    } else {
      renderPlayer(activeTable.player);
      handleBust();
    }
  }
}

//////////////////// Handle Stay //////////////////////
function handleStay() {
  document.querySelector('#buttons').innerHTML = '';
  playDealer();
}

//////////////////// Handle Bust //////////////////////
function handleBust() {
  var center = document.querySelector('#center');
  center.innerHTML = '';
  center.append(renderBust());
  center.append(renderRematch());
}

//////////////////// Play Dealer //////////////////////
function playDealer() {
  while (activeTable.dealer.value <= 16) {
    activeTable.dealerHit();
    if (activeTable.dealer.value > 21 && activeTable.dealer.aceCount) {
      activeTable.dealer.value -= 10;
      activeTable.dealer.aceCount--;
    }
  }
  renderPlayer(activeTable.dealer);
  checkStatus();
}

//////////////// Handle Dealer Bust //////////////////
function handleDealerBust() {
  var center = document.querySelector('#center');
  center.innerHTML = '';
  center.append(renderDealerBust());
  center.append(renderRematch());
}

//////////////// Handle Dealer Bust //////////////////
function handleDraw() {
  var center = document.querySelector('#center');
  center.innerHTML = '';
  center.append(renderDraw());
  center.append(renderRematch());
}

//////////////////// Handle Lost //////////////////////
function handleLost() {
  var center = document.querySelector('#center');
  center.innerHTML = '';
  center.append(renderLost());
  center.append(renderRematch());
}

//////////////////// Handle Lost //////////////////////
function handleWon() {
  var center = document.querySelector('#center');
  center.innerHTML = '';
  center.append(renderWon());
  center.append(renderRematch());
}

/////////////////// Check Status ////////////////////
function checkStatus() {
  if (activeTable.dealer.value > 21) {
    handleDealerBust();
  } else if (activeTable.dealer.value === activeTable.player.value) {
    handleDraw();
  } else if (activeTable.dealer.value > activeTable.player.value) {
    handleLost();
  } else {
    handleWon();
  }
}

////////////////// Check For Bust ///////////////////
function checkBust(input) {
  if (input > 21) {
    return true;
  } else {
    false;
  }
}