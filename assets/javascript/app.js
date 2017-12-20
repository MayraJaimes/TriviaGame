var randomChoices;
var questionHTML = "";
var incorrectAnswers = 0;
var correctAnswers = 0;
var unansweredQuestions = 0;
var rightanswer = $('#answer_' + questionNumber).text();
var number = 10;
var intervalId;
var questionNumber = 0;

var randomizeArray = arr => arr.sort(() => Math.random() - 0.5);

var trivia = [{
        question: "In Disney's 'The Little Mermaid' who does Ariel fall in love with?",
        choices: ["Prince Eric",
            "Prince Phillip",
            "Prince Charming",
            "Prince Joseph"],
        answer: "Prince Eric",
        image: "question0.jpg"
    },

    {
        question: "What was the name of the monkey in the Disney movie 'Aladdin'?",
        choices: ["Abu",
            "Donkey Kong",
            "Rafiki",
            "Jack"],
        answer: "Abu",
        image: "image1.jpg"
    },

    {
        question: "What is the name of Mickey Mouse´s dog?",
        choices: ["Pluto",
            "Donald",
            "Bolt",
            "Oliver"],
        answer: "Pluto",
        image: "image2.jpg"
    },

    {
        question: "What is the name of one of the 7 dwarfs from the Disney movie 'Snow White and the Seven Dwarfs'?",
        choices: ["Moody",
            "Joyful",
            "Lazy",
            "Happy"],
        answer: "Happy",
        image: "image3.jpg"
    },

    {
        question: "In which Disney film will you find the villain, Cruella De Vil?",
        choices: ["Dalmatians",
            "Cinderella",
            "Sleeping Beauty",
            "Lion King"],
        answer: "Dalmatians",
        image: "image4.jpg"
    },

    {
        question: "What animals portray surfer dudes in Finding Nemo?",
        choices: ["Turtles",
            "Sharks",
            "Seals",
            "Dolphins"],
        answer: "Turtles",
        image: "image5.jpg"
    },

    {
        question: "What is the name of Woody's owner in Toy Story?",
        choices: ["Andy",
            "Ryan",
            "Sid",
            "Lenny"],
        answer: "Andy",
        image: "image6.jpg"
    },

    {
        question: "What puts Snow White into a deep sleep?",
        choices: ["A poisoned apple",
            "A needle",
            "A car accident",
            "A lost slipper"
        ],
        answer: "A poisoned apple",
        image: "image7.jpg"
    }
]

$(".time").html("10 seconds");

//document.getElementById(id).innerHTML = new HTML

for (i = 0; i < trivia.length; i++) {
    randomChoices = randomizeArray(trivia[i].choices);
    questionHTML +=
        `<div id="question_${i}" class="questions-group">
                <div id="answer_${i}" class="answerSheet">
                    ${trivia[i].answer}
                </div>
                <div id="image_${i}" class="imageSheet">
                    ${trivia[i].image}
                </div>
				<div class="questionText">
				    ${trivia[i].question}
				</div>
				<div class="buttons"> 
					<button class="choiceButton">${trivia[i].choices[0]}</button>
					<button class="choiceButton">${trivia[i].choices[1]}</button>
					<button class="choiceButton">${trivia[i].choices[2]}</button>
					<button class="choiceButton">${trivia[i].choices[3]}</button>
				</div>
			</div>`
}

$("#triviaPage").append(questionHTML);


function run() {
    clearInterval(intervalId);
    intervalId = setInterval(decrement, 1000);
}

function decrement() {
    number--;
    $(".time").text(number + " seconds");

    $(".questions-group").on("click", stop);
    
    if (number === 1) {
        document.querySelector(".time").innerHTML = (number + " second");
    }

	if (number === 0) {
        stop();
        timerEnd();
    }
}

function stop() {
    clearInterval(intervalId);
}

//Reset Function
function reset() {
    number = 10;
    document.querySelector(".time").innerHTML = number;
}
 
//Start Button
document.getElementById("startButton").addEventListener("click", function(){
    document.getElementById("startPage").style.display = "none";
    document.getElementById("triviaPage").style.display = "block";
    document.getElementById("question_0").style.display = "block";
    run();
});

//Choices Buttons
$('.questions-group').on('click', 'button', function() {
    var userPickedAnswer = $(this).text();
    rightanswer = $('#answer_' + questionNumber).text().trim();
    
//Answer Correct
    if (userPickedAnswer === rightanswer) {
        correctAnswers++;
        insertImage();
        document.getElementById("triviaPage").style.display = "none";
        document.getElementById("rightAnswerPage").style.display = "block";
        setTimeout(function() { nextQuestion(questionNumber) }, 1000 * 2);
    }

//Answer Incorrect
    if (userPickedAnswer != rightanswer) {
        incorrectAnswers++;
        insertImage();
        document.getElementById("triviaPage").style.display = "none";
        document.getElementById("wrongAnswerPage").style.display = "block";
        document.querySelector("#wrongAnswerPage .correctAnswer").innerHTML = rightanswer;
        setTimeout(function() { nextQuestion(questionNumber) }, 1000 * 2);
    }
});

intervalId;

//Going to next question
function nextQuestion(number) {
    if (number != 7) {
        var nextNum = parseInt(number) + 1;
        questionNumber = nextNum;
        var currNumber = parseInt(number);
        $("#question_" + currNumber).hide();
        $("#question_" + nextNum).show();
        document.getElementById("triviaPage").style.display = "block";
        document.getElementById("timeOutPage").style.display = "none";
        document.getElementById("wrongAnswerPage").style.display = "none";
        document.getElementById("rightAnswerPage").style.display = "none";
        document.getElementById("endPage").style.display = "none";
        reset();
        run();
    } else {
        document.getElementById("wrongAnswerPage").style.display = "none";
        document.getElementById("timeOutPage").style.display = "none";
        document.getElementById("rightAnswerPage").style.display = "none";
        document.getElementById("endPage").style.display = "block";
    }
    document.querySelector(".numCorrectAnswers").innerHTML = correctAnswers;
    document.querySelector(".numIncorrectAnswers").innerHTML = incorrectAnswers;
    document.querySelector(".numUnanswered").innerHTML = unansweredQuestions;
};

function timerEnd() {
    unansweredQuestions++;
    document.getElementById("triviaPage").style.display = "none";
    document.getElementById("timeOutPage").style.display = "block";
    document.querySelector("#timeOutPage .correctAnswer").innerHTML = rightanswer;
    setTimeout(function() { nextQuestion(questionNumber) }, 1000 * 2);
};

function insertImage(){
    questionImage = $('#image_' + questionNumber).text();
    $(".image").html(`<img src="assets/images/image${questionNumber}.jpg" alt="${rightanswer}">`);
}
