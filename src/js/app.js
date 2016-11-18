var words = [
        'Dooickeys',
        'Pseghting',
        'Moqnuqeek',
        'Poncicles',
        'Bamanapan',
        'Groindogs',
        'Lorfickle',
        'Smoomcake',
        'Limgistic',
        'Mostaming',
        'Dreamdump',
        'Miltmirks',
        'Dangmurse',
        'Dosmingle'
    ],
    player = {
        'one': {
            'word': [],
            'progress': 0,
            'score': 0,
            'winner': false
        },
        'two': {
            'word': [],
            'progress': 0,
            'score': 0,
            'winner': false
        }
    };

function watchKeys() {
    $('body').keypress(function(input) {
        battle(input);
    });
}

function keepScore () {
    $('#js-p1-score').text(player.one.score);
    $('#js-p2-score').text(player.two.score);
}

function getWinner() {
    if (words.length === 0) {
        console.log('game over');
    }
}

function shuffle(array) {
    var m = array.length, t, i;
    while (m) {
        i = Math.floor(Math.random() * m--);
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    return array;
}

function addWords() {
    player.one.word = words[0].split('');
    player.two.word = words[1].split('');
    words.splice(0, 2);

    $('#js-p1-wordlist').prepend(
        '<li><h2>' + player.one.word.join('') + '</h2></li>'
    );
    $('#js-p2-wordlist').prepend(
        '<li><h2>' + player.two.word.join('') + '</h2></li>'
    );
}

function battle(input) {
    if (input.key === player.one.word[0] && input.key === player.two.word[0]) {
        if (player.one.progress === player.two.progress){
            player.one.progress = player.one.progress + 1;
            player.two.progress = player.two.progress + 1;
            player.one.word.shift();
            player.two.word.shift();
            console.log('p1 & p2 - matched (both advance)', player.one.word, player.two.word);
        } else if (player.one.progress < player.two.progress) {
            player.one.progress = player.one.progress + 1;
            player.one.word.shift();
            console.log('p1 & p2 - matched (player 1 advances)', player.one.word, player.two.word);
        } else {
            player.two.progress = player.two.progress + 1;
            player.two.word.shift();
            console.log('p1 & p2 - matched (player 2 advances)', player.one.word, player.two.word);
        }
    } else if (input.key === player.one.word[0]){
        player.one.progress = player.one.progress + 1;
        player.one.word.shift();
        console.log('p1 - matched', player.one.word)
    } else if (input.key === player.two.word[0]){
        player.two.progress = player.two.progress + 1;
        player.two.word.shift();
        console.log('p2 - matched', player.two.word)
    }
    getRoundWinner();
}

function getRoundWinner() {
    if (player.one.word.length === 0) {
        player.one.score = player.one.score + 1;
        startRound();
        console.log('p1 - wins round');
    } else if (player.two.word.length === 0) {
        player.two.score = player.two.score + 1;
        startRound();
        console.log('p2 - wins round');
    }
    keepScore();
}

function startRound() {
    shuffle(words);
    addWords();
    watchKeys();
}

function init() {
    keepScore();
    startRound();
    getWinner();
}

$(document).ready(function() {
    init();
});

