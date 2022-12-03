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
    elements[i].innerHTML = questionObject.options[i];
    /* to get the respective question and option we are using data attributes to set */
    elements[i].setAttribute("data-quesNum", quesNum);
    elements[i].setAttribute("data-option", questionObject.options[i]);
    /* on selecting the options */
    elements[i].addEventListener("click", function (event) {
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
      }
      questionTracker++;
      /* Ending the questionaries when we reach the end of questionAnswer array */
      if (questionTracker === questionAnswer.length + 1) {
        setTimeout(() => {
          /* hiding questionaire section and displaying the score section after 1 second */
          questionAnswerSection.style.display = "none";
          var scoreSection = document.querySelector("#score-section");
          scoreSection.style.display = "flex";
          return;
        }, 1000);
      }
      /* next question will be displayed after 300ms and result will be set to empty */
      /* setTimeOut is a inbuilt function which accepts a function and a timer */
      setTimeout(() => {
        addQuestionToHtml(questionTracker);
        document.querySelector("#result").innerHTML = "";
      }, 1000);
    });
  }
}
/* var to track the question number */
var questionTracker = 1;

addQuestionToHtml(questionTracker);
