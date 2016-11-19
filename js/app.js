var words = [
        'Doxickeys',
        'Pseghting',
        'Moqnuqeck',
        'Poncicles',
        'Bamanapan',
        'Groindogs',
        'Lorfickle',
        'Smoamcake',
        'Limgistic',
        'Mostaming',
        'Dreamdump',
        'Miltmirks',
        'Dangmurse',
        'Momingles'
    ],
    wordLength = words[0].length,
    wordTotal = words.length,
    playedWords = [],
    roundCounter = 0,
    player = {
        'one': {
            'word': [],
            'displayWord': [],
            'progress': 0,
            'score': 0
        },
        'two': {
            'word': [],
            'displayWord': [],
            'progress': 0,
            'score': 0
        }
    };

// Fisher Yates Shuffle
function shuffle(array) {
    // Shuffle
    var m = array.length, t, i;
    while (m) {
        i = Math.floor(Math.random() * m--);
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    return array;
}

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
    shuffle(words);
    player.one.word = words[0].split('');
    player.two.word = words[1].split('');
    playedWords.push(words[0], words[1]);
    displayWords();
}

// Add spans and ids to displayed words
function displayWords() {
    for (let i = 0; i < wordLength; i++){
        player.one.displayWord[i] = '<span id="p1-r' + roundCounter + '-c' + (i+1) + '">' + player.one.word[i] + '</span>';
        player.two.displayWord[i] = '<span id="p2-r' + roundCounter + '-c' + (i+1) + '">' + player.two.word[i] + '</span>';
    }
    $('#js-p1-wordlist').prepend(
        '<li><h2>' + player.one.displayWord.join('') + '</h2></li>'
    );
    $('#js-p2-wordlist').prepend(
        '<li><h2>' + player.two.displayWord.join('') + '</h2></li>'
    );
    $('h2 span:first-of-type').addClass('active');
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
            $('#p1-r' + roundCounter + '-c' + player.one.progress).addClass('input').removeClass('active').next().addClass('active');
            $('#p2-r' + roundCounter + '-c' + player.two.progress).addClass('input').removeClass('active').next().addClass('active');
            console.log('P1 & P2 - Matched (Both Advance)', player.one.word, player.two.word);
        } else if (player.one.progress < player.two.progress) {
            player.one.progress = player.one.progress + 1;
            player.one.word.shift();
            $('#p1-r' + roundCounter + '-c' + player.one.progress).addClass('input').removeClass('active').next().addClass('active');
            console.log('P1 & P2 - Matched (Player 1 Advances)', player.one.word, player.two.word);
        } else if (player.two.progress < player.one.progress){
            player.two.progress = player.two.progress + 1;
            player.two.word.shift();
            $('#p2-r' + roundCounter + '-c' + player.two.progress).addClass('input').removeClass('active').next().addClass('active');
            console.log('P1 & P2 - Matched (Player 2 Advances)', player.two.word, player.two.word);
        }
    } else if (input.key === player.one.word[0]) {
        player.one.progress = player.one.progress + 1;
        player.one.word.shift();
        $('#p1-r' + roundCounter + '-c' + player.one.progress).addClass('input').removeClass('active').next().addClass('active');
        console.log('P1 - Matched', player.one.word)
    } else if (input.key === player.two.word[0]) {
        player.two.progress = player.two.progress + 1;
        player.two.word.shift();
        $('#p2-r' + roundCounter + '-c' + player.two.progress).addClass('input').removeClass('active').next().addClass('active');
        console.log('P2 - Matched', player.two.word)
    }
    roundWinner();
}

// Determine round winner & update scores.
function roundWinner() {
    if (player.one.word.length === 0 && player.two.word.length === 0){
        player.one.score = player.one.score + 1;
        player.two.score = player.two.score + 1;
        $('#console').text('Players Tie Round ' + roundCounter);
        startRound();
    } else if (player.one.word.length === 0) {
        player.one.score = player.one.score + 1;
        $('#console').text('Player One Wins Round ' + roundCounter);
        startRound();
    } else if (player.two.word.length === 0) {
        player.two.score = player.two.score + 1;
        $('#console').text('Player Two Wins Round ' + roundCounter);
        startRound();
    }
    updateScores();
}

// Start a round.
function startRound() {

    // Reset player.progress & increment round counter.
    player.one.progress = 0;
    player.two.progress = 0;
    roundCounter++;

    // Check progress.
    if (words.length > 0) {
        addWords();
        watchKeys();
        words.splice(0,2);
    } else if (words.length === 0){
        gameOver();
    }
}

// Game over.
function gameOver() {

    // Check for winner.
    if (player.one.score > player.two.score) {
        console.log('P1 Wins Game');
        $('#console').text('Player One Wins the Game - P1: ' + player.one.score + ' P2: ' + player.two.score);
    } else if (player.one.score < player.two.score) {
        console.log('P2 Wins Game');
        $('#console').text('Player Two Wins the Game - P1: ' + player.one.score + ' P2: ' + player.two.score);
    }

    // Reset words, playedWords & roundcounter.
    words = playedWords;
    playedWords = [];
    roundCounter = 0;

    // Start new game.
    startGame();
}

// Start the game.
function startGame() {

    // Init Scores
    player.one.score = 0;
    player.two.score = 0;
    updateScores();

    // Init Word Lists
    $('#js-p1-wordlist').html('');
    $('#js-p2-wordlist').html('');

    // Start Rounds
    startRound();
}

// Ready the DOM for BATTLE.
$(document).ready(function () {
    // Start game.
    startGame();
});