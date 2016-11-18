var words = [
        'dog',
        'cat',
        'fox',
        'bug'
        //'pup',
        //'emu'
    ],
    wordTotal = words.length,
    playedWords = [],
    player = {
        'one': {
            'word': [],
            'progress': 0,
            'score': 0
        },
        'two': {
            'word': [],
            'progress': 0,
            'score': 0
        }
    };

// Watch for key input.
function watchKeys() {
    $('body').keypress(function (input) {
        doBattle(input);
    });
}

// Updated the scores.
function updateScores() {
    $('#js-p1-score').text(player.one.score);
    $('#js-p2-score').text(player.two.score);
}

// Add words to play.
function addWords() {
    player.one.word = words[0].split('');
    player.two.word = words[1].split('');
    playedWords.push(words[0], words[1]);

    $('#js-p1-wordlist').prepend(
        '<li><h2>' + player.one.word.join('') + '</h2></li>'
    );
    $('#js-p2-wordlist').prepend(
        '<li><h2>' + player.two.word.join('') + '</h2></li>'
    );
}

// Determine who advances.
function doBattle(input) {
    // P1 or P2 advances to next letter next after matched input.
    // If P1 and P2 share progress & active character they both advance.
    // If a player has a lead the character is given to the opposing player.
    if (input.key === player.one.word[0] && input.key === player.two.word[0]) {
        if (player.one.progress === player.two.progress) {
            player.one.progress = player.one.progress + 1;
            player.two.progress = player.two.progress + 1;
            player.one.word.shift();
            player.two.word.shift();
            console.log('P1 & P2 - Matched (Both Advance)', player.one.word, player.two.word);
        } else if (player.one.progress < player.two.progress) {
            player.one.progress = player.one.progress + 1;
            player.one.word.shift();
            console.log('P1 & P2 - Matched (Player 1 Advances)', player.one.word, player.two.word);
        } else {
            player.two.progress = player.two.progress + 1;
            player.two.word.shift();
            console.log('P1 & P2 - Matched (Player 2 Advances)', player.one.word, player.two.word);
        }
    } else if (input.key === player.one.word[0]) {
        player.one.progress = player.one.progress + 1;
        player.one.word.shift();
        console.log('P1 - Matched', player.one.word)
    } else if (input.key === player.two.word[0]) {
        player.two.progress = player.two.progress + 1;
        player.two.word.shift();
        console.log('P2 - Matched', player.two.word)
    }
    roundWinner();
}

// Determine round winner.
function roundWinner() {
    if (player.one.word.length === 0) {
        player.one.score = player.one.score + 1;
        console.log('P1 - Wins Round');
    } else if (player.two.word.length === 0) {
        player.two.score = player.two.score + 1;
        console.log('P2 - Wins Round');
    }
    updateScores();
    if (playedWords.length > wordTotal) {
        startRound();
    } else {
        words.splice(0, 2);
        gameOver();
    }
}

// Start a round.
function startRound() {
    addWords();
    watchKeys();
}

// Game over.
function gameOver() {
    console.log('game over');
    if (player.one.score > player.two.score) {
        console.log('P1 Wins Game')
    } else if (player.one.score < player.two.score) {
        console.log('P2 Wins Game')
    }
    startGame();
}

// Start the game.
function startGame() {
    if ( words.length === 0) {
        words = playedWords;
    }
    // Init Scores
    updateScores();
    // If restarting game.

    // Start Rounds
    startRound();
}

// Ready the DOM for BATTLE.
$(document).ready(function () {
    // Start game.
    startGame();
});