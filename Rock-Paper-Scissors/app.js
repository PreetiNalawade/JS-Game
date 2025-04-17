let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");

const userScoreBoard = document.querySelector("#user-score");
const compScoreBoard = document.querySelector("#comp-score");

//Computer Choice
const genCompChoice = () => {
  const options = ["rock", "paper", "scissors"];
  const randomIdx = Math.floor(Math.random() * 3);
  return options[randomIdx];
};

//User Choice
choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    const userChoice = choice.getAttribute("id");
    playGame(userChoice);
  });
});

//Play Game
const playGame = (userChoice) => {
  const compChoice = genCompChoice();
  if (userChoice === genCompChoice) {
    drawGame();
  } else {
    let userWin = true;
    if (userChoice === "rock") {
      userWin = compChoice === "paper" ? false : true;
    } else if (userChoice === "paper") {
      userWin = compChoice === "scissors" ? false : true;
    } else {
      userWin = compChoice === "rock" ? false : true;
    }
    showWinner(userChoice, compChoice, userWin);
  }
};

//Game draw
const drawGame = () => {
  msg.innerText = "Draw! Play Again";
  msg.style.backgroundColor = "#081b31";
};

const showWinner = (userChoice, compChoice, userWin) => {
  if (userWin) {
    userScore++;
    userScoreBoard.innerText = userScore;
    msg.innerText = `You Win! Your ${userChoice} beats ${compChoice} `;
    msg.style.backgroundColor = "green";
  } else {
    compScore++;
    compScoreBoard.innerText = compScore;
    msg.innerText = `You lose! ${compChoice} beats your ${userChoice}`;
    msg.style.backgroundColor = "red";
  }
};
