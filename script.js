let input = document.getElementById('input');
let btn = document.getElementById('btn');
let wrng = document.querySelector('wrng');
let guesses = document.getElementById('guesses');


let answer = Math.floor(Math.random()* 100) +1;
// alert(answer);

let numGuesses = 0;

btn.addEventListener('click', () => {
    guessNumber ();
});

function guessNumber () {
    if(input.value <1 || input.value >100 || isNaN(input.value)) {
    wrng.innerHTML = "Enter Between 1 to 100";

} else {
    numGuesses++;
    guesses.innerHTML = numGuesses;

    if(input.value > answer) {
        wrng.innerHTML = "Too High";
    }
    else if(input.value < answer) {
        wrng.innerHTML = "Too Low";
    }
    else {
        wrng.innerHTML = "Congratulations! You guessed the correct number";
        input.value = "";
        numGuesses = 0;
        guesses.innerHTML = numGuesses;
    }   
}
}
