var words = [
        'dog',
        'cat',
        'fox',
        'bug',
        'pup',
        'emu'
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


function updateScores() {
    $('#js-p1-score').text(player.one.score);
    $('#js-p2-score').text(player.two.score);
}

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
            console.log('P1 & P2 - matched (both advance)', player.one.word, player.two.word);
        } else if (player.one.progress < player.two.progress) {
            player.one.progress = player.one.progress + 1;
            player.one.word.shift();
            console.log('P1 & P2 - matched (player 1 advances)', player.one.word, player.two.word);
        } else {
            player.two.progress = player.two.progress + 1;
            player.two.word.shift();
            console.log('P1 & P2 - matched (player 2 advances)', player.one.word, player.two.word);
        }
    } else if (input.key === player.one.word[0]) {
        player.one.progress = player.one.progress + 1;
        player.one.word.shift();
        console.log('P1 - matched', player.one.word)
    } else if (input.key === player.two.word[0]) {
        player.two.progress = player.two.progress + 1;
        player.two.word.shift();
        console.log('P2 - matched', player.two.word)
    }
    roundWinner();
}

function roundWinner() {
    if (player.one.word.length === 0) {
        console.log('P1 wins round');
        words.splice(0, 2);
        player.one.score = player.one.score + 1;
        startRound();
    } else if (player.two.word.length === 0) {
        console.log('P2 wins round');
        words.splice(0, 2);
        player.two.score = player.two.score + 1;
        startRound();
    }
    updateScores();
}

function startRound() {
    if (playedWords.length < wordTotal) {
        addWords();
        $('body').keypress(function (input) {
            doBattle(input);
        });
    } else {
        gameOver();
    }
}

function gameOver() {
    console.log('game over');
    if (player.one.score > player.two.score) {
        console.log('P1 Wins Game')
    } else if ( player.one.score < player.two.score ) {
        console.log('P2 Wins Game')
    }
}

function startGame() {
    updateScores();
    startRound();
}

$(document).ready(function () {
    startGame();
});