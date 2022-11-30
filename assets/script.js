/* when we click on the 'start quiz' button the game has
   to start and the question should display 
   so we are query selecting 'start-quiz' button and adding a click eventlistener.*/
var startButton = document.querySelector("#start-quiz");
/* on clicking the 'start quiz' button the entire 'title section' should disappear
   and questions should appear. So we are query selecting 'title-section'  */
var titleSection = document.querySelector("#title-section");

startButton.addEventListener("click", function () {
  /* through JS we are changing the CSS properties to hide the 'title-section'  */
  titleSection.style.display = "none";
});
