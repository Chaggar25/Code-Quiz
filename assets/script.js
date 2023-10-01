// Common variables and initial setup
var score = 0;
var timer = 30;
var interval;
var currentQuestionIndex = 0;

// HTML element references
var containerBtn = document.querySelector(".answerText");
var container = document.querySelector(".instructions");
var textQuestion = document.querySelector(".centerText");
var answer = document.querySelector(".answer");
var timeLeft = document.getElementById("timer");
var scoreLink = document.querySelector(".a-score");

// Color variables
var firstColor = "#252eda";
var textAlignment = "left";
var secondColor = "#240080";
var thirdColor = "#bdf407";

// High Score related variables
var highScore = [];
var highScoreObj;

// Initial setup function
function initialContent() {
    // Create a button element
    var button = document.createElement("button");

    // Set button attributes
    button.id = "start-btn";
    button.textContent = "Start Quiz";

    
    var parentElement = document.querySelector(".descriptionText");
    parentElement.appendChild(button);
}


//quiz questions 
var questions = [
    
        {
            q: "True or False: DOM is built into a Javascript language",
            choices: ["True", "False", "None of Above"],
            answer: "True"
        },
    
    //Question #2
    {
        q : "The Browser event submit allows us to do the Following ",
        choices: ["Submit a form using a button", "Submit a form using the Enter key", "Submit a form using a button and the Enter key"],
        answer: "C"
    },

    //Question #3
    {
        q : "How do we use JavaScript to get the information entered into a form's input field",
        choices: ["We Can select the form's imput element and use the value property to read its data","We Can select the form itself and use the value property to read all of its data","We Can select the form's imput element and use the textcontent or innerHTML property to read its data",],
        answer: "A"
    },
        

    //Question #4
    {
        q : "String values must be enclosed within ___________ when being assigned to variables",
        choices: ["Coma", "Curly Brackets", "Parenthesis",],
        answer: "B"
    },
       

    //Question #5
    {
        q : "The condition in an if / else statement is enclosed with _____________",
        choices: ["Curly Brackets", "Quotes", "Square Brackets", ],
        answer: "A"
    },
       

    //Question #6
    {
        q : "A very useful tools used during development and debbuging for printing content to the debugger is __________",
        choices: ["Javascript", "Termanl/Bash", "for loops", ],
        answer: "C"
    },
        

    //Question #7
    {
        q : "Commonly used data type Do NOT include: ",
        choices: ["Strings", "Booleans", "alerts", ],
        answer: "B"
    },
        

    //Question #8
    {
        q : "What does event.preventDefault() do?",
        choices: [ "It stops the browser from allowing the page upon a form submission", "It stops the browser from reloading the form submission event to occur", "All of them", ],
        answer: "B"
    }
];

        

function startQuiz() {
    var startButton = document.getElementById("start-btn");
    startButton.style.display = "none";

    interval = setInterval(function () {
        timer--;
        document.querySelector(".timer").textContent = "Time: " + timer;

        if (timer <= 0) {
            endQuiz();
        }
    }, 1000);

    showQuestion(currentQuestionIndex);
}

function showQuestion(index) {
    if (index < questions.length) {
        var questionContainer = document.querySelector(".descriptionText");
        var question = questions[index];

        textQuestion.textContent = question.q;
        containerBtn.innerHTML = "";

        for (var i = 0; i < question.choices.length; i++) {
            var choice = question.choices[i];

            var choiceElement = document.createElement("div");
            choiceElement.classList.add("option");
            choiceElement.textContent = choice;

            choiceElement.addEventListener("click", createChoiceClickHandler(choice, index));

            containerBtn.appendChild(choiceElement);
        }
    } else {
        endQuiz();
    }
}

// Add the createChoiceClickHandler function
function createChoiceClickHandler(selectedChoice, questionIndex) {
    return function(event) {
        checkAnswer(selectedChoice, questionIndex);
    };
}

function checkAnswer(selectedChoice, index) {
    var question = questions[index];

    if (selectedChoice === question.answer) {
        score += 10;
    } else {
        timer -= 10;
    }

    currentQuestionIndex++;
    showQuestion(currentQuestionIndex);
}

function endQuiz() {
    clearInterval(interval);

    var questionSection = document.querySelector(".descriptionText");
    questionSection.style.display = "none";

    textQuestion.textContent = "Quiz Ended! Your Score: " + score;

    // Save the score and initials
    var span = document.createElement("span");
    span.style.display = "flex";
    span.style.flexWrap = "wrap";
    span.style.justifyContent = "center";
    span.style.flex = "flex-wrap";
    span.innerHTML = "<p class='p-store' style ='text-align:left'> Enter Initials: </p>" +
        "<form class='form-store' style='padding:12px'><input type='text' name='initials placeholder='Enter initials' id='initials'/>" +
        "<button id='save' type='submit' onclick='saveScore()' style = 'background:" + firstColor +
        "; color:" + secondColor + "; border-radius:10px'>Submit</button></form>";

    container.appendChild(span);

    retrieveHighScore();
}

// Event listeners for your HTML elements
var startButton = document.getElementById("start-btn");
startButton.addEventListener("click", startQuiz);
scoreLink.addEventListener("click", retrieveHighScore);

// High Score related functions
function retrieveHighScore() {
    // ... (previous code)

// High Score related functions
function retrieveHighScore() {
    // Clear the current content
    container.innerHTML = "";

    // Retrieve high scores from local storage
    var storedHighScores = JSON.parse(localStorage.getItem("userScore"));

    if (storedHighScores) {
        // Sort high scores in descending order (highest score first)
        storedHighScores.sort(function(a, b) {
            return b.score - a.score;
        });

        // Create and display the high score list
        var highScoreList = document.createElement("ul");
        highScoreList.style.listStyle = "none";

        for (var i = 0; i < storedHighScores.length; i++) {
            var listItem = document.createElement("li");
            listItem.textContent = (i + 1) + ". " + storedHighScores[i].user + " - " + storedHighScores[i].score;
            highScoreList.appendChild(listItem);
        }

        container.appendChild(highScoreList);
    } else {
        // No high scores available
        var noHighScoreMsg = document.createElement("p");
        noHighScoreMsg.textContent = "No high scores available.";
        container.appendChild(noHighScoreMsg);
    }
}



}

function saveScore() {
    event.preventDefault();
    var input = document.querySelector("#initials").value;

    if (input === "") {
        displayErrorMessage("You must enter your initials for your score.");
    } else {
        // Display success message
        displayErrorMessage("Score registered successfully!");

        highScoreObj = {
            user: input,
            score: score
        };

        highScore.push(highScoreObj);
        localStorage.setItem("userScore", JSON.stringify(highScore));

        // Display high scores
        var listUnOrdered = document.createElement("ul");
        listUnOrdered.style.background = secondColor;
        listUnOrdered.style.justifyContent = "space-between";
        listUnOrdered.style.listStyle = "none";

        for (var i = 0; i < highScore.length; i++) {
            var li = document.createElement("li");
            li.innerHTML = "<div style = 'text-align: left;'>" + (i + 1) + ". " +
                highScore[i].user + " - " + highScore[i].score +
                "</div>";
            li.style.textAlign = textAlignment;
            li.style.background = thirdColor;
            li.style.borderBottom = "10px";
            listUnOrdered.appendChild(li);
        }

        container.appendChild(listUnOrdered);
    }
}

function displayErrorMessage(msg) {
    alert(msg);
}

function clearLocalStore() {
    localStorage.clear();
}

// Initial setup
initialContent();

function retrieveHighScore() {
    console.log("Retrieve high scores function called."); 
}

