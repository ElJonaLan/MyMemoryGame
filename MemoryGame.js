const gameBoard = document.querySelector('#game');
let card1 = '';
let card2 = '';
let cardsFlipped = 0;
let noClicking = false; //how does noClicking work?

const colors = [
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'indigo',
  'violet',
  'black',
  'grey',
  'maroon',
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'indigo',
  'violet',
  'black',
  'grey',
  'maroon'
];

function shuffle(arr) {
  let counter = arr.length;
  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    let temp = arr[counter];
    arr[counter] = arr[index];
    arr[index] = temp;
  }
  return arr;
}

let shuffledColors = shuffle(colors);

function createDivs(colorArr) {
  for (let color of colorArr) {
    const newDiv = document.createElement('div');
    newDiv.classList.add(color)
    newDiv.addEventListener('click', cardClick);
    gameBoard.append(newDiv);
  }
}

function cardClick(e) {
  let currentCard = e.target;
  if (noClicking) {
    return;
  }
  if (currentCard.classList.contains('flipped')) {
    return;
  }
  currentCard.style.backgroundColor = currentCard.classList[0];

  if (!card1 || !card2) {
    currentCard.classList.add('flipped');
    // go over this 
    card1 = card1 || currentCard;
    card2 = currentCard === card1 ? '' : currentCard;
  }

  if (card1 && card2) {
    noClicking = true;
    let color1 = card1.classList[0];
    let color2 = card2.classList[0];

    if (color1 === color2) {
      cardsFlipped += 2;
      card1.removeEventListener('click', cardClick);
      card2.removeEventListener('click', cardClick);
      card1 = '';
      card2 = '';
      noClicking = false;
    } else {
      setTimeout(function() {
        card1.style.backgroundColor = '';
        card2.style.backgroundColor = '';
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        card1 = '';
        card2 = '';
        noClicking = false;
      }, 1000)
    }
  }
  if (cardsFlipped === colors.length) {
    alert('You Win');
  }
}

createDivs(shuffledColors);