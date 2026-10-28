let container = document.querySelector(".color-container");
let roundScore = document.querySelector("#round-score");
let avgScore = document.querySelector("#avg-score");
let tryAgainBtn = document.querySelector(".try-again-btn");
let bestMatchScore = document.querySelector(".best-match-score");
let bestAverageScore = document.querySelector(".best-average-score");
let colorArr = [];
let blockCount = 40;
let blocks;
let scoreArr;
let finalScores = [];
let maxScore;
let maxScoreArr = [];

let shuffleBtn = document.querySelector(".shuffle-btn");

let selectSound = new Audio("./assets/select.mp3");
let popSound = new Audio("./assets/pop.mp3");
let stopSound = new Audio("./assets/stop.mp3");
selectSound.volume = 0.4;

function colorDiff(a, b) {
   return 100 - (Math.abs(a - b) * 100) / 255;
}

function generateBlocks() {
   for (let i = 1; i <= blockCount; i++) {
      container.innerHTML += `<div class="block"></div>`;

      let rand1 = Math.floor(Math.random() * 256);
      let rand2 = Math.floor(Math.random() * 256);
      let rand3 = Math.floor(Math.random() * 256);

      colorArr.push(`rgb(${rand1}, ${rand2}, ${rand3})`);
   }
   blocks = document.querySelectorAll(".color-container .block");
   let i = 0;
   blocks.forEach((block) => {
      block.style.background = colorArr[i++];
   });
   tryAgainBtn.classList.add("display-none");
   scoreArr = [];
   let first, second, third;
   let totalAvg;

   let count = 0;
   blocks.forEach((block) => {
      block.addEventListener("click", () => {
         if (block.classList.contains("popped")) {
            return;
         }

         let hasSelectedClass = block.classList.contains("selected");

         // clicking/tapping the picked color again cancels it
         if (hasSelectedClass) {
            block.classList.remove("selected");
            count = 0;
            stopSound.play();
            return;
         }

         if (!hasSelectedClass) {
            let rgb;
            let matches;
            let diff1, diff2, diff3, avg;
            rgb = block.style.background;
            matches = rgb.match(/\d+/g);
            if (count == 0) {
               first = parseInt(matches[0]);
               second = parseInt(matches[1]);
               third = parseInt(matches[2]);
            } else {
               let temp1 = parseInt(matches[0]);
               let temp2 = parseInt(matches[1]);
               let temp3 = parseInt(matches[2]);

               diff1 = colorDiff(first, temp1);
               diff2 = colorDiff(second, temp2);
               diff3 = colorDiff(third, temp3);

               avg = (diff1 + diff2 + diff3) / 3;

               scoreArr.push(avg);
               let sum = 0;
               for (let i = 0; i < scoreArr.length; i++) {
                  sum += scoreArr[i];
               }

               totalAvg = sum / scoreArr.length;

               roundScore.innerHTML = avg.toFixed(2) + "%";
               avgScore.innerHTML = totalAvg.toFixed(2) + "%";
            }

            block.classList.add("selected");
            count++;
            if (count == 2) {
               let selected = document.querySelectorAll(".selected:not(.popped)");
               selected.forEach((s) => {
                  s.style.opacity = 0;
                  s.classList.add("popped");
               });
               count = 0;
               blockCount -= 2;
               popSound.play();
            } else {
               selectSound.play();
            }
         }

         if (blockCount === 0) {
            finalScores.push(totalAvg);
            totalAvg = 0;
            tryAgainBtn.classList.remove("display-none");
            let maxFinalScore = Math.max(...finalScores);
            bestAverageScore.innerHTML = maxFinalScore.toFixed(2) + "%";
         }

         maxScore = Math.max(...scoreArr);
         if (maxScore >= 0 && maxScore <= 100) {
            bestMatchScore.innerHTML = maxScore.toFixed(2) + "%";
         }
      });
   });
}

generateBlocks();

function newRound() {
   container.innerHTML = "";
   colorArr = [];
   blockCount = 40;
   roundScore.innerHTML = "";
   avgScore.innerHTML = "";
   generateBlocks();
   bestMatchScore.innerHTML = "";
}

tryAgainBtn.addEventListener("click", newRound);
shuffleBtn.addEventListener("click", newRound);
