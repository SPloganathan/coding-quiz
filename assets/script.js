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
      "Which of the following methods is used to access HTML elements using Javascript?",
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
      "Upon encountering empty statements, what does the Javascript Interpreter do?",
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
      "Which of the following methods can be used to display data in some form using Javascript?",
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
    question: "What is the use of the <noscript> tag in Javascript?",
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
      "When an operator's value is NULL, the typeof returned by the unary operator is:",
    options: ["Boolean", "Undefined", "Object", "Integer"],
    answer: "Object",
  },
];
