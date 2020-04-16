/*
Challenges
Change the game to follow the following rule

1. A player looses his ENTIRE scores when he plays 2 six in a row. After that its the next player's turn.
(Hint: always save the previous dice roll in a variable)
2. add a input field to the html where players can set the winning score, so that they can change the predefined score of
   100 (Hint: you can read the value with the .value property in js. Tis is the opportunity to make use of google)
3. Add another dice to the game so there are 2 dices now. The player looses his current score when one of them is a 1
    (you willneed css to position the second dice)
*/


var scores, roundScore, activePlayer, gamePlaying;
init();

document.querySelector('.dice').style.display = 'none';

document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying){
           // 1. random number
  var dice = Math.floor(Math.random() * 6) + 1;

  // 2. display the result
  var diceDom = document.querySelector('.dice');
  diceDom.style.display = 'block';
  diceDom.src = 'dice-' + dice + '.png';

  // 3. update the round score IF the rolled number was not a 1
  if(dice !== 1){
      //add score
      roundScore += dice;
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
  }else{
      //next player
      nextPlayer();
  }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying){
        //add CURRENT score to GLOBAL score
    scores[activePlayer] += roundScore;

    //update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    //check if player won the game
    if(scores[activePlayer] >= 100){
        document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
        document.querySelector('.dice').style.display = 'none'; 
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        gamePlaying = false;
    }else{
        //nextPlayer
        nextPlayer();
    }
    }    
});

function nextPlayer(){
       //next player
       activePlayer === 0 ?  activePlayer = 1 : activePlayer = 0;
       roundScore = 0;

       document.getElementById('current-0').textContent = '0' ;
       document.getElementById('current-1').textContent = '0' ;

       document.querySelector('.player-0-panel').classList.toggle('active');
       document.querySelector('.player-1-pane').classList.toggle('active');

       // document.querySelector('.player-0-panel').classList.remove('active');
       // document.querySelector('.player-1-pane').classList.add('active');

       document.querySelector('.dice').style.display = 'none';
}
document.querySelector('.btn-new').addEventListener('click', init); //reset player's score   

function init(){
    scores = [0, 0];
    roundScore = 0; //it has to be one cos its one score at a time
    activePlayer = 0;
    gamePlaying = true;

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-pane').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-pane').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}