var randomChoices;
var questionHTML = "";
var incorrectAnswers = 0;
var correctAnswers = 0;
var unansweredQuestions = 0;
var number = 10;
var questionNumber = 0;
var questionCounter = 1;
var rightanswer;
var rightImage;
var intervalId;
var getTriviaPage = document.getElementById("triviaPage");
var getTimeOutPage = document.getElementById("timeOutPage");
var getRightAnswerPage = document.getElementById("rightAnswerPage");
var getEndPage = document.getElementById("endPage");
var getWrongAnswerPage = document.getElementById("wrongAnswerPage");
var getStartPage = document.getElementById("startPage");

var randomizeArray = arr => arr.sort(() => Math.random() - 0.5);

var trivia = [{
        question: "In Disney's 'The Little Mermaid' who does Ariel fall in love with?",
        choices: ["Prince Eric",
            "Prince Phillip",
            "Prince Charming",
            "Prince Joseph"],
        answer: "Prince Eric",
        image: "image0.jpg"
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
                <div class="questionCounter">
                    Question ${questionCounter} out of 8
                </div>
			</div>`
}

$("#triviaPage").append(questionHTML);
$(".timer").html("Time Remaining: 10 seconds");

function run() {
    clearInterval(intervalId);
    intervalId = setInterval(decrement, 1000);
}

function decrement() {
    number--;
    $(".timer").text("Time Remaining: " + number + " seconds");
    $(".questions-group").on("click", stop);
    if (number === 1) {
        //document.querySelector(".timer").innerHTML = (number + " second");
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
    $(".timer").text("Time Remaining: " + number + " seconds");
}
 
//Start Button
document.getElementById("startButton").addEventListener("click", function(){
    document.querySelector(".timer").style.display = "block";
    getStartPage.style.display = "none";
    getTriviaPage.style.display = "block";
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
        getTriviaPage.style.display = "none";
        getRightAnswerPage.style.display = "block";
        setTimeout(function() {nextQuestion(questionNumber)}, 2000);
    }

//Answer Incorrect
    if (userPickedAnswer != rightanswer) {
        incorrectAnswers++;
        insertImage();
        getTriviaPage.style.display = "none";
        getWrongAnswerPage.style.display = "block";
        document.querySelector("#wrongAnswerPage .correctAnswer").innerHTML = rightanswer;
        setTimeout(function() {nextQuestion(questionNumber)}, 2000);
    }
});

intervalId;

function nextQuestion(number) {
    if (number != 7) {
        var nextNum = parseInt(number) + 1;
        questionNumber = nextNum;
        var currNumber = parseInt(number);
        $("#question_" + currNumber).hide();
        $("#question_" + nextNum).show();
        getTriviaPage.style.display = "block";
        getTimeOutPage.style.display = "none";
        getWrongAnswerPage.style.display = "none";
        getRightAnswerPage.style.display = "none";
        getEndPage.style.display = "none";
        questionCounter = parseInt(questionNumber) + 1;
        reset();
        run();
    } else {
        getWrongAnswerPage.style.display = "none";
        getTimeOutPage.style.display = "none";
        getRightAnswerPage.style.display = "none";
        getEndPage.style.display = "block";
    }
    document.querySelector(".numCorrectAnswers").innerHTML = correctAnswers;
    document.querySelector(".numIncorrectAnswers").innerHTML = incorrectAnswers;
    document.querySelector(".numUnanswered").innerHTML = unansweredQuestions;
    $(".questionCounter").html(`Question ${questionCounter} out of 8`);

};

function timerEnd() {
    rightanswer = $('#answer_' + questionNumber).text().trim();
    document.querySelector("#timeOutPage .correctAnswer").innerHTML = rightanswer;
    unansweredQuestions++;
    getTriviaPage.style.display = "none";
    getTimeOutPage.style.display = "block";
    insertImage();
    setTimeout(function() {nextQuestion(questionNumber)}, 2000);
};

function insertImage(){
    rightanswer = $('#answer_' + questionNumber).text().trim();
    rightImage = $('#image_' + questionNumber).text().trim();
    var correctImage = `<img src="assets/images/${rightImage}" alt="${rightanswer}"/>`;
    $(".image").html(correctImage);
}
