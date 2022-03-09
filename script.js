let round = 1;
let todaysWord;

window.onload = function loadPage() {
  resetBoard();
};

function guessWord() {
  guess =
    document.getElementById(round + "-1").value +
    document.getElementById(round + "-2").value +
    document.getElementById(round + "-3").value +
    document.getElementById(round + "-4").value +
    document.getElementById(round + "-5").value;
  console.log("Guess: " + guess);
  round++;

  disableLetters(round);

  if (guess == todaysWord) {
    document.getElementById("success").innerHTML = "Success!";
    document.getElementById("guessButton").style.visibility = "hidden";
    document.body.style.background = "#6AFF4D";
    disableLetters(0, true);
  } else {
    document.getElementById("success").innerHTML = "Try again";
    console.log("No luck yet");
  }
}

async function resetBoard() {
  round = 1;
  resetWord();
  disableLetters(round, false);
}

async function resetWord() {
  res = await getWord();
  todaysWord = res["word"];

  console.log("Today's word: " + todaysWord);

  document.getElementById("guessButton").style.visibility = "visible";

  document.body.style.background = "#FFFFFF";
}

async function getWord() {
  const url = "https://wordle-generator.kingsmillio.workers.dev";

  try {
    let res = await fetch(url);

    return await res.json();
  } catch (error) {
    console.log(error);
  }
}

function disableLetters(round, reset = false) {
  for (let i = 1; i <= 5; i++) {
    // iterate through rows
    for (let j = 1; j <= 5; j++) {
      // iterate through characters
      if (i == round) {
        // if current round, enable row
        document.getElementById(i + "-" + j).removeAttribute("disabled");
      } else {
        // otherwise, disable row
        document.getElementById(i + "-" + j).setAttribute("disabled", "");
      }

      if (reset == true) {
        document.getElementById(i + "-" + j).value = "";
      }
    }
  }
}

function jump(elmnt, content) {
  document.addEventListener("keyup", function (event) {
    if (event.keyCode == 13) {
      next = elmnt.tabIndex + 1;
      document.jumpForm.elements[next].focus();
    }
  });
}
