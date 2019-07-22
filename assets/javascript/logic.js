
var questions = [{
    question: "Who is the youngest actor to win an Oscar?",
    choices: ["Meryl Streep", "Tatum O'Neal", "Micky Rooney", "Quvenzhane Wallis"],
    answer: "Tatum O'Neal"
}, {
    question: "Who is the youngest male actor to win an Oscar for leading role?",
    choices: ["Nicolas Cage", "Eddie Redmayne", "Adrien Brody", "Robert De Niro"],
    answer: "Adrien Brody"
}, {
    question: "Who is the youngest director to win an Oscar?",
    choices: ["Clint Eastwood", "Damien Chazelle", "Akira Kurosawa", "Woody Allen"],
    answer: "Damien Chazelle"
}, {
    question: "Which actor has the most nominations for an Oscar?",
    choices: ["Meryl Streep", "Daniel Day-Lewis", "Leonardo DiCaprio", "Katharine Hepburn"],
    answer: "Meryl Streep"
}, {
    question: "Which actor has won the most Oscars?",
    choices: ["Daniel Day-Lewis", "Meryl Streep", "Marlon Brando", "Katharine Hepburn"],
    answer: "Katharine Hepburn"
}, {
    question: "Which of these films is NOT tied for most Oscar wins?",
    choices: ["Titanic", "The Godfather", "Ben-hur", "West Side Story"],
    answer: "The Godfather"
}];

var wrong = 0;
var correct = 0;
var time = 16;
var currentQ = 0;
var intervalId;


$('#start-button').show();
$('#restart-button').hide();

$('#start-button').on('click', function () {
    $('#start-button').hide();
    $('#timer').show();
    run();
    decrement();
    displayQuestion();
});




function run() {
    clearInterval(intervalId)
    intervalId = setInterval(decrement, 1000);
};

function decrement() {
    time--;
    $('#timer').html('You currently have ' + time + ' seconds left.');
    if (time === 0) {
        stop();
        outOfTime();
    };
};

function stop() {
    clearInterval(intervalId);
};

function resetTimer() {
    time = 16;
    run();
};




function displayQuestion() {
    $('#question').html(questions[currentQ].question);
    for (i=0; i<questions[currentQ].choices.length; i++) {
        var choices = $('<button>');
        choices.html(questions[currentQ].choices[i]);
        choices.addClass('answerChoices');
        choices.addClass('btn btn-warning');
        $('#choice-holder').append(choices);
    };

    $('.answerChoices').on('click', function() {
        var userChoice = $(this).text();
        if (userChoice === questions[currentQ].answer) {
            stop();
            displayCorrect();
        } else {
            stop();
            displayWrong();
        };
    });
    resetTimer();
};


function displayCorrect() {
    let cycle = setTimeout(displayQuestion, 4000);
    $('.answerChoices').hide();
    $('#question').text('You got it right!!');
    if (currentQ === (questions.length - 1)) {
        clearTimeout(cycle);
        let endGame = setTimeout(gameOver, 5000);
    };
    correct++;
    currentQ++;
};

function displayWrong() {
    let cycle = setTimeout(displayQuestion, 4000);
    $('.answerChoices').hide();
    $('#question').text('Sorry. Wrong answer.');
    $('<div>The correct answer was: ' + questions[currentQ].answer + '</div>').appendTo($('#question'));
    if (currentQ === (questions.length - 1)) {
        clearTimeout(cycle);
        let endGame = setTimeout(gameOver, 5000);
    };
    wrong++;
    currentQ++;
};

function outOfTime() {
    let cycle = setTimeout(displayQuestion, 4000);
    $('.answerChoices').hide();
    $('#question').text('Sorry. You ran out of time.');
    $('<div>The correct answer was: ' + questions[currentQ].answer + '</div>').appendTo($('#question'));
    if (currentQ === (questions.length - 1)) {
        clearTimeout(cycle);
        let endGame = setTimeout(gameOver, 5000);
    };
    wrong++;
    currentQ++;
};

function gameOver() {
    $('.answerChoices').hide();
    $('#timer').hide();
    $('#question').text('Thanks for playing.');
    $('<div>You got ' + correct + ' correct,</div>').appendTo($('#question'));
    $('<div>and ' + wrong + ' wrong.</div>').appendTo($('#question'));
    $('#restart-button').show();
};

function hideRestart() {
    wrong = 0;
    correct = 0;
    currentQ = 0;
    time = 0;
    timer = 'You currently have ' + time + 'seconds left.';
    intervalId;
    $('#restart-button').hide();
};

$('#restart-button').on('click', function() {
    $('#question').html('');
    hideRestart();
    displayQuestion();
    $('#timer').show();
});
