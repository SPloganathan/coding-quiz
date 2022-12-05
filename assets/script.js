/* setting the overall timer as 75s */
var time = 75;
/* var to track the question number */
var questionTracker = 1;
/* when we click on the 'start quiz' button the game has
   to start and the question should display 
   so we are query selecting 'start-quiz' button and adding a click eventlistener.*/
var startButton = document.querySelector("#start-quiz");
/* on clicking the 'start quiz' button the entire 'title section' should disappear
   and questions should appear. So we are query selecting 'title-section'  */
var titleSection = document.querySelector("#title-section");
/* on starting the quiz the question and answers should display so we are query selecting 'question-answer' */
var questionAnswerSection = document.querySelector("#question-answer");

startButton.addEventListener("click", function () {
  /* startTimer() is used to call the timer function written below */
  questionTracker = 1;
  time = 75;
  startTimer();
  addQuestionToHtml(questionTracker);
  /* through JS we are changing the CSS properties to hide the 'title-section'  */
  titleSection.style.display = "none";
  /* through JS we are changing the CSS properties to display the 'question-answer' section */
  questionAnswerSection.style.display = "flex";
});
/* added question and answers as an array of object */
var questionAnswer = [
  {
    id: 1,
    question:
      "1. Which of the following methods is used to access HTML elements using Javascript?",
    options: [
      "getElementbyId()",
      "getElementsByClassName()",
      "Both A and B",
      "None of the above",
    ],
    answer: "Both A and B",
  },
  {
    id: 2,
    question:
      "2. Upon encountering empty statements, what does the Javascript Interpreter do?",
    options: [
      "Throws an error",
      "Ignores the statements",
      "Gives a warning",
      "None of the above",
    ],
    answer: "Ignores the statements",
  },
  {
    id: 3,
    question:
      "3. Which of the following methods can be used to display data in some form using Javascript?",
    options: [
      "document.write()",
      "console.log()",
      "window.alert()",
      "All of the above",
    ],
    answer: "All of the above",
  },
  {
    id: 4,
    question: "4. What is the use of the 'noscript' tag in Javascript?",
    options: [
      "The contents are displayed by non-JS-based browsers.",
      "Clears all the cookies and cache.",
      "Both A and B",
      "None of the above",
    ],
    answer: "The contents are displayed by non-JS-based browsers.",
  },
  {
    id: 5,
    question:
      "5. When an operator's value is NULL, the typeof returned by the unary operator is:",
    options: ["Boolean", "Undefined", "Object", "Integer"],
    answer: "Object",
  },
];

/* when start quiz button is pressed by default one of the questions should appear in the HTMl and 
below is the function for it*/
function addQuestionToHtml(quesNum) {
  /* Ending the questionaries when we reach the end of questionAnswer array */
  if (questionTracker === questionAnswer.length + 1) {
    setTimeout(() => {
      /* hiding questionaire section and displaying the score section after 1 second */
      document.querySelector("#initial-value").value = "";
      document.querySelector("#result").innerHTML = "";
      return;
    }, 500);
  }
  /* finding the required question from the questionAnswer array using find method */
  let questionObject = questionAnswer.find(
    (eachQuestion) => eachQuestion.id === quesNum
  );
  /* through query selector getting the id 'question' and assigning the question from the array */
  document.querySelector("#question").innerHTML = questionObject.question;
  /* why let elements? 
Since query selecting id='options' gives the children as array and storing it in a variable */
  /* using for loop we are setting each options into its respective <div> based on the iterated index */
  let elements = document.querySelector("#options").children;

  for (let i = 0; i < elements.length; i++) {
    elements[i].classList.remove("prevent-click-event");
    elements[i].innerHTML = questionObject.options[i];
    /* to get the respective question and option we are using data attributes to set */
    elements[i].setAttribute("data-quesNum", quesNum);
    elements[i].setAttribute("data-option", questionObject.options[i]);
    /* on selecting the options */
    elements[i].addEventListener("click", function (event) {
      /* prevent multiple clicks on the same option using CSS 
      pointer-events=none */
      elements[i].classList.add("prevent-click-event");
      event.stopImmediatePropagation();
      /* we are getting the HTML element of the selected option and this will be found in (default)event.target */
      const optionElement = event.target;
      const quesNumValue = optionElement.getAttribute("data-quesNum");
      const selectedOption = optionElement.getAttribute("data-option");
      /* finding the question details using the question id using 'find()' method */
      let answerObject = questionAnswer.find(
        (eachQuestion) => eachQuestion.id === Number(quesNumValue)
      );
      /* verifying whether the selected option is right/wrong */
      if (selectedOption === answerObject.answer) {
        document.querySelector("#result").innerHTML = "Right";
      } else {
        document.querySelector("#result").innerHTML = "Wrong";
        /* reducing the timer value by 15s when a question is answered wrong */
        time -= 15;
      }
      questionTracker++;
      /* next question will be displayed after 500ms and result will be set to empty */
      /* setTimeOut is a inbuilt function which accepts a function and a timer */
      setTimeout(() => {
        addQuestionToHtml(questionTracker);
        document.querySelector("#result").innerHTML = "";
      }, 500);
    });
  }
}

/* when we type the initials it should turn to uppercase letters */
let initialElement = document.querySelector("#initial-value");
initialElement.addEventListener("keyup", function () {
  initialElement.value = initialElement.value.toUpperCase();
});

var submitButton = document.querySelector("#initial-submit");
submitButton.addEventListener("click", function () {
  /* getting the scores and intials usig query selector */
  let initialValue = document.querySelector("#initial-value").value;
  let scoreValue = time;
  /* using getitem, checking the previous scores if any! */
  let previousScore = window.localStorage.getItem("scores");
  // score = [{name:"sak", score:22}];

  if (previousScore) {
    /* if previous score exist it will be converted into object using 'json parse' */
    const scores = JSON.parse(previousScore);
    /* pushing the new scores into the local storage 'scores' */
    scores.push({ name: initialValue, score: scoreValue });
    // [{name:"sak", score:22}, {name:"sakthi", score:30}]
    window.localStorage.setItem("scores", JSON.stringify(scores));
  } else {
    const score = [{ name: initialValue, score: scoreValue }];
    window.localStorage.setItem("scores", JSON.stringify(score));
  }
  /* highscore section visibility logic */
  document.querySelector("#score-section").style.display = "none";
  displayHighScore();
});

function displayHighScore() {
  document.querySelector("#display-highscore").style.display = "flex";
  /* getting all the scores and setting it into a new variable 'allscores' as a object using parse */
  let allScores = JSON.parse(window.localStorage.getItem("scores"));
  /* creating a empty string variable which will be used for concatinating each scores */
  let htmlString = "";
  /* iterating each score using 'forEach' and appending the score in 'htmlString' */
  /*  sorting the scores based on the highscores value using sort function*/
  allScores
    .sort((a, b) => b.score - a.score)
    .forEach((eachScore, index) => {
      htmlString += `<p>${index + 1}, ${eachScore.name}, ${
        eachScore.score
      }</p>`;
    });
  /* and setting the values in 'highscore-result */
  document.querySelector("#highscore-result").innerHTML = htmlString;
}
/* click event for Header Highscore  */
document.querySelector("#score-link").addEventListener("click", function () {
  document.querySelector("#header").style.display = "none";
  document.querySelector("#title-section").style.display = "none";
  document.querySelector("#question-answer").style.display = "none";
  document.querySelector("#score-section").style.display = "none";
  displayHighScore();
});
/* on clicking of highscore button the local storage gets cleared */
document
  .querySelector("#clear-highscores")
  .addEventListener("click", function () {
    window.localStorage.clear();
    /* since the html DOM element will not be cleared we are doing it manually */
    document.querySelector("#highscore-result").innerHTML = "";
  });

function startTimer() {
  let timer = document.querySelector("#timer");
  timer.style.display = "flex";
  var displayTimer = setInterval(() => {
    time--;
    if (time < 0) {
      time = 0;
    }
    timer.innerHTML = time;
    if (time === 0 || questionTracker === questionAnswer.length + 1) {
      /* clear interval is a inbuilt function to clear/stop the timer */
      clearInterval(displayTimer);
      questionAnswerSection.style.display = "none";
      /* display the final score based on the timer */
      /* backtick ` symbol is used for concatinating static and dynamic values */
      document.querySelector(
        "#final-score"
      ).innerHTML = `Your final score is ${time}`;
      document.querySelector("#score-section").style.display = "flex";
    }
  }, 1000);
}
/* for Go Back Button */
document.querySelector("#go-back").addEventListener("click", function () {
  document.querySelector("#header").style.display = "flex";
  document.querySelector("#title-section").style.display = "flex";
  document.querySelector("#display-highscore").style.display = "none";
  document.querySelector("#timer").style.display = "none";
});
