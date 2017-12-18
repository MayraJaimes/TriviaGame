var randomChoices;
var questionHTML="";
var remainSec="";

var randomizeArray = arr => arr.sort(() => Math.random() - 0.5);

var trivia = [
	{question:"In Disney's 'The Little Mermaid' who does Ariel fall in love with?", 
	choices:["Prince Eric",
		"Prince Phillip",
		"Prince Charming",
		"Prince Joseph"], 
	answer: "Prince Eric"},

	{question:"What was the name of the monkey in the Disney movie 'Aladdin'?", 
	choices:["Abu",
		"Donkey Kong",
		"Rafiki",
		"Jack"], 
	answer: "Abu"},

	{question:"What is the name of Mickey Mouse´s dog?", 
	choices:["Pluto",
		"Donald",
		"Bolt",
		"Oliver"], 
	answer: "Pluto"},

	{question:"What are the names of the 7 dwarfs from the Disney movie 'Snow White and the Seven Dwarfs'?", 
	choices:["Happy, Sleepy, Sneezy, Dopey, Grumpy, Bashful and Doc", 
		"Joyful, Lazy, Sneezy, Dopey, Grumpy, Bashful and Doc",
		"Happy, Sleepy, Sneezy, Dopey, Moody, Bashful and Doc",
		"Joyful, Sleepy, Sneezy, Dopey, Grumpy, Bashful and Doc"],
	answer: "Happy, Sleepy, Sneezy, Dopey, Grumpy, Bashful and Doc"},

	{question:"In which Disney film will you find the villain, Cruella De Vil?", 
	choices:["Dalmatians",
		"Cinderella",
		"Sleeping Beauty",
		"Lion King"], 
	answer: "Dalmatians"},

	{question:"What animals portray surfer dudes in Finding Nemo?", 
	choices:["Turtles",
		"Sharks",
		"Seals",
		"Dolphins"], 
	answer: "Prince Eric"},

	{question:"What is the name of Woody's owner in Toy Story?", 
	choices:["Andy",
		"Ryan",
		"Sid",
		"Lenny"], 
	answer: "Andy"},

	{question:"What puts Snow White into a deep sleep?", 
	choices:["A poisoned apple",
		"A needle",
		"A car accident",
		"A lost slipper"], 
	answer: "A poisoned apple"}
]

for (i=0; i<trivia.length; i++) {
	randomChoices = randomizeArray(trivia[i].choices);
		questionHTML += 
			`<div id="question_${i}" class="questions-group">
				<div id="question">
				${trivia[i].question}
				</div>
				<div class="buttons" data-answer="${trivia[i].answer}" data-question-num="${i}"> 
					<button class="choiceButton">${trivia[i].choices[0]}</button>
					<button class="choiceButton">${trivia[i].choices[1]}</button>
					<button class="choiceButton">${trivia[i].choices[2]}</button>
					<button class="choiceButton">${trivia[i].choices[3]}</button>
				</div>
			</div>`
	}
	
$(".triviaPage").append(questionHTML);

var number = 10;
var intervalId;

function run() {
	clearInterval(intervalId);
      intervalId = setInterval(decrement, 1000);
    }

function decrement() {
      number--;
      $(".time").html(number + " seconds")
      	if (number === 1) {
      		$(".time").html(number + " second")
      	}
        if (number === 0) {
        stop();
    	}
    	$(".questions-group").on("click", stop);
    }

function stop() {
	clearInterval(intervalId);
    }

function reset() {
	number = 10;
     $(".time").html(number);
}

$("#startButton").on("click", function() {
	$(".startPage").css("display", "none");
	$(".triviaPage").css("display", "block");
	$("#question_0").show(); 
	run();
});

$('.questions-group').on('click', 'button', function() {
	var userPickedAnswer = $(this).text();
	var rightanswer = $(this).closest("div").attr("data-answer");
	var questionNumber = $(this).closest("div").attr("data-question-num");

	if (userPickedAnswer === rightanswer) {
		$(".triviaPage").css("display", "none");
		$(".rightAnswerPage").css("display", "block");
	}

	if (userPickedAnswer != rightanswer) {
		$(".triviaPage").css("display", "none");
		$(".wrongAnswerPage").css("display", "block");
	}

	if (number === 0) {
		$(".triviaPage").css("display", "none");
		$(".timeOutPage").css("display", "block");
	}
});

intervalId;

function nextQuestion(number){
	var nextNum = parseInt(number) + 1;
	$("#question_" + number).hide();
	$("#question_" + nextNum).show();
	$(".triviaPage").css("display", "block");
	reset();	
	run();
};


//nextQuestion(questionNumber);
