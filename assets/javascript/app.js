$(document).ready(function() {
    var randomChoices;
    var randomQuestions;
    var incorrectAnswers = 0;
    var correctAnswers = 0;
    var unansweredQuestions = 0;
    var number = 10;
    var questionNumber = 0;
    var questionCounter = 1;
    var rightanswer;
    var rightImage;
    var intervalId;
    var getStartButton = document.getElementById("startButton");
    var getStartPage = document.getElementById("startPage");
    var getTriviaPage = document.getElementById("triviaPage");
    var getTimer = document.getElementById("timer");
    var getTimeOutPage = document.getElementById("timeOutPage");
    var getRightAnswerPage = document.getElementById("rightAnswerPage");
    var getWrongAnswerPage = document.getElementById("wrongAnswerPage");
    var getEndPage = document.getElementById("endPage");
    var getResetButton = document.getElementById("resetButton");
    var trivia = [{
        question: "In Disney's 'The Little Mermaid' who does Ariel fall in love with?",
        choices: ["Prince Eric",
            "Prince Phillip",
            "Prince Charming",
            "Prince Joseph"],
        answer: "Prince Eric",
        image: "image0.jpg"
        },

        {question: "What was the name of the monkey in the Disney movie 'Aladdin'?",
        choices: ["Abu",
            "Donkey Kong",
            "Rafiki",
            "Jack"],
        answer: "Abu",
        image: "image1.jpg"
        },

        {question: "What is the name of Mickey Mouse´s dog?",
        choices: ["Pluto",
            "Donald",
            "Bolt",
            "Oliver"],
        answer: "Pluto",
        image: "image2.jpg"
        },

        {question: "What is the name of one of the 7 dwarfs from the Disney movie 'Snow White and the Seven Dwarfs'?",
        choices: ["Moody",
            "Joyful",
            "Lazy",
            "Happy"],
        answer: "Happy",
        image: "image3.jpg"
        },

        {question: "In which Disney film will you find the villain, Cruella De Vil?",
        choices: ["Dalmatians",
            "Cinderella",
            "Sleeping Beauty",
            "Lion King"],
        answer: "Dalmatians",
        image: "image4.jpg"
        },

        {question: "What animals portray surfer dudes in Finding Nemo?",
        choices: ["Turtles",
            "Sharks",
            "Seals",
            "Dolphins"],
        answer: "Turtles",
        image: "image5.jpg"
        },

        {question: "What is the name of Woody's owner in Toy Story?",
        choices: ["Andy",
            "Ryan",
            "Sid",
            "Lenny"],
        answer: "Andy",
        image: "image6.jpg"
        },

        {question: "What puts Snow White into a deep sleep?",
        choices: ["A poisoned apple",
            "A needle",
            "A car accident",
            "A lost slipper"
        ],
        answer: "A poisoned apple",
        image: "image7.jpg"
        }
    ]

    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    return array;
    }

    function setHTML() { 
        var questionHTML='';
        for (i = 0; i < trivia.length; i++) {
            shuffleArray(trivia[i].choices);
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
    return questionHTML;
    }

    function run() {
        clearInterval(intervalId);
        intervalId = setInterval(decrement, 1000);
    }

    function decrement() {
        number--;
        getTimer.innerHTML = "Time Remaining: " + number + " seconds";
        $(".questions-group").on("click", stop);
    	if (number === 0) {
            stop();
            timerEnd();
        }
    }

    function stop() {
        clearInterval(intervalId);
    }

    function reset() {
        number = 10;
        getTimer.innerHTML = "Time Remaining: " + number + " seconds";
    }

    function hideAllQuestions() {
        for (i=0; i<trivia.length; i++) {
            $('#question_' + i).hide();
        }
    }        

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
            $(".questionCounter").html(`Question ${questionCounter} out of 8`);
            reset();
            run();

        } else {
            getTriviaPage.style.display = "none";
            getWrongAnswerPage.style.display = "none";
            getTimeOutPage.style.display = "none";
            getRightAnswerPage.style.display = "none";
            getEndPage.style.display = "block";
            getEndPage.querySelector(".numCorrectAnswers").innerHTML = correctAnswers;
            getEndPage.querySelector(".numIncorrectAnswers").innerHTML = incorrectAnswers;
            getEndPage.querySelector(".numUnanswered").innerHTML = unansweredQuestions;
         };   
    };

    function timerEnd() {
        rightanswer = $('#answer_' + questionNumber).text().trim();
        getTimeOutPage.querySelector(".correctAnswer").innerHTML = rightanswer;
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

    function resetGame () {
        incorrectAnswers = 0;
        correctAnswers = 0;
        unansweredQuestions = 0;
        number = 10;
        questionNumber = 0;
        questionCounter = 1;
        getEndPage.style.display = "none";
        getStartPage.style.display = "block";
        getTimer.innerHTML = "Time Remaining: 10 seconds";
        startGame();
    }

    function startGame () {
        shuffleArray(trivia);
        var gameHTML= setHTML();
        getTriviaPage.innerHTML = gameHTML;
        getTimer.innerHTML = "Time Remaining: 10 seconds";
        hideAllQuestions();
        getTimer.style.display = "block";
        getStartPage.style.display = "none";
        getTriviaPage.style.display = "block";
        $(".questionCounter").html(`Question ${questionCounter} out of 8`);
        document.getElementById("question_0").style.display = "block";
        run();
        intervalId;
        addQuestionClickEvents();
    };

    function addQuestionClickEvents() {
        $('.questions-group').on('click', 'button', function() {
            var userPickedAnswer = $(this).text();
            rightanswer = $('#answer_' + questionNumber).text().trim();            
            $(".questionCounter").html(`Question ${questionCounter} out of 8`);
            if (userPickedAnswer === rightanswer) {
                correctAnswers++;
                insertImage();
                getTriviaPage.style.display = "none";
                getRightAnswerPage.style.display = "block";
                setTimeout(function() {nextQuestion(questionNumber)}, 2000);
            }
            if (userPickedAnswer != rightanswer) {
                incorrectAnswers++;
                insertImage();
                getTriviaPage.style.display = "none";
                getWrongAnswerPage.style.display = "block";
                getWrongAnswerPage.querySelector(".correctAnswer").innerHTML = rightanswer;
                setTimeout(function() {nextQuestion(questionNumber)}, 2000);
            }
        });
    }
    getStartButton.addEventListener("click", startGame);

    getResetButton.addEventListener("click", resetGame);
});


