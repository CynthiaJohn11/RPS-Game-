const otherContainers = document.querySelectorAll(".non-rules");
const body = document.getElementById("body");
const score = document.getElementById("score");
const gameButtons = document.querySelectorAll(".gameButtons");
const gamePage = document.querySelector(".startGame");
const inGamePage = document.querySelector(".inGame");
const userChoice = document.getElementById("userChoice");
const statusField = document.querySelector(".status");
const playAgain = document.getElementById("playAgain");
const houseChoiced = document.getElementById("houseChoice");
const rules = document.getElementById("rules");
const rulesBtn = document.querySelector(".rulesbtn");
const result = document.getElementById("result");
const closeRules = document.getElementById("close");
const playerBoard = document.querySelector(".player");
const houseBoard = document.querySelector(".house");
const choices = ["scissors", "spock", "lizard", "rock", "paper"];
const getComputerChoice = () => choices[Math.floor(Math.random() * 5)];
// creating a variable and directing them to html,css inorder to store their v alues
// creating a variable that stores object and a function
const changeLayout = (choice) => {
   gamePage.style.display = "none";
   // the 5 choice variable shouldn't display
   inGamePage.style.display = "flex";
   //when the game becames display flex
   userChoice.innerHTML = `<img src="images/icon-${choice}.svg">`;
   //here it allows user to access any of the 5 choice stated
   //note without this it will only display scissor icon
   //`<img src="images/icon-${choice}.svg"> mean a link image of all the icon in the choice variable
   userChoice.classList.add(choice);
};
const houseChoice = (choice) => {
   houseChoiced.innerHTML = `<img src="images/icon-${choice}.svg">`;
   houseChoiced.classList.add(choice);
   houseChoiced.style.backgroundColor = "#fff";
   // the background color here is the bg where the icon rest on
};
let userScore = 0;
if (Number(localStorage.getItem("score")) != null){
    //Returns the current value associated with the given key, or null if the given key does not exist.
   userScore = Number(localStorage.getItem("score")); // get the score from the localStorage
   score.textContent = userScore;
//display based on the given number from the local storage in the var userscore
}
const scoreTracker = (winStatus) => {
   if (winStatus) {
      userScore++;
   } else {
      userScore--;
   }
   localStorage.setItem("score", userScore.toString());
};

const statusDisplay = () => {
   statusField.style.display = "flex";
   score.textContent = userScore;
   if (result.textContent == "You Win") // add background effect for the winner
      playerBoard.classList.add("winnerEffect");
   else if (result.textContent == "You Lose")
      houseBoard.classList.add("winnerEffect");
    // add the transparent circle design to each of the winner when one wins
};
const gamePlay = (choice) => {
   let isWin; // tracks the win or lose of the player
   let computerChoice = getComputerChoice();
   if (choice === computerChoice) {
      result.textContent = "You Draw";
   } else if (
      (choice === "paper" &&
         (computerChoice === "rock" || computerChoice === "spock")) ||
      (choice === "rock" &&
         (computerChoice === "scissors" || computerChoice === "lizard")) ||
      (choice === "scissors" &&
         (computerChoice === "paper" || computerChoice === "lizard")) ||
      (choice === "spock" &&
         (computerChoice === "scissors" || computerChoice === "rock")) ||
      (choice === "lizard" &&
         (computerChoice === "paper" || computerChoice === "spock"))
   ) {
      result.textContent = "You Win";
      isWin = true;
      scoreTracker(isWin);
   } else {
      result.textContent = "You Lose";
      isWin = false;
      scoreTracker(isWin);
   }
   return computerChoice;
   // if any is equal, true or false it displays a content
};
gameButtons.forEach((gameButton, index) => {
   gameButton.onclick = () => {
      changeLayout(choices[index]);
      let computerChoice = gamePlay(choices[index]);
      setTimeout(() => houseChoice(computerChoice), 1000);
      setTimeout(statusDisplay, 2000);
      playAgain.onclick = () => {
         // reset all the changes and start the game again
         inGamePage.style.display = "none";
         houseChoiced.innerHTML = ``;
         houseChoiced.classList.remove(computerChoice);
         if (houseBoard.classList.contains("winnerEffect"))
            houseBoard.classList.remove("winnerEffect");
         if (playerBoard.classList.contains("winnerEffect"))
            playerBoard.classList.remove("winnerEffect");

         userChoice.classList.remove(choices[index]);
         statusField.style.display = "none";
         gamePage.style.display = "block";
         houseChoiced.style.backgroundColor = "hsl(237, 49%, 15%, 0.5)";
      };
   };
});
rulesBtn.onclick = () => {
   rules.style.display = "flex";
   otherContainers.forEach(
      (otherContainer) => (otherContainer.style.opacity = "0.5")
   );
   body.classList.add("darkBody");
};
closeRules.onclick = () => {
   rules.style.display = "none";
   otherContainers.forEach(
      (otherContainer) => (otherContainer.style.opacity = "1")
   );
   body.classList.remove("darkBody");
};
