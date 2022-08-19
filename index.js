let deckId
const firstCardInput = document.getElementById("firstCard")
const secondCardInput = document.getElementById("secondCard")
const remainCards = document.getElementById("remainCards")
const compScoreInput = document.getElementById("compScore")
const myScoreInput = document.getElementById("myScore")
const myScoreboard = document.getElementById("myScoreboard")
const compScoreboard = document.getElementById("compScoreboard")
const messageEl = document.getElementById("messageEl")
const drawBtn = document.getElementById("draw")
const resetBtn = document.getElementById("reset")

let remaining = 0
let myScore = 0
let compScore = 0
let myTotalScore = 0
let compTotalScore = 0
let message = ""

function getDeck() {
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        .then(res => res.json())
        .then(data => {
            deckId = data.deck_id
            remainCards.innerHTML = `Remaining cards: ${data.remaining}`
        })
}

function draw() {
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
        firstCardInput.innerHTML = `<img class="card" src="${data.cards[0].images.png}">`
        secondCardInput.innerHTML = `<img class="card" src="${data.cards[1].images.png}">`
        remainCards.innerHTML = `Remaining cards: ${data.remaining}`
        /*
        "JACK" - 11 points 
        "KING" - 13 points 
        "QUEEN" - 12 points 
        "ACE" - 14 points 
        */
        myScore = data.cards[0].value === "JACK" ? 11 : data.cards[0].value === "KING" ? 13 : data.cards[0].value === "QUEEN" ? 12 : data.cards[0].value === "ACE" ? 14 : data.cards[0].value
        compScore = data.cards[1].value === "JACK" ? 11 : data.cards[1].value === "KING" ? 13 : data.cards[1].value === "QUEEN" ? 12 : data.cards[1].value === "ACE" ? 14 : data.cards[1].value
        myScoreInput.innerHTML = `Me: ${myScore}`
        compScoreInput.innerHTML = `Computer: ${compScore}`
        myTotalScore += Number(myScore)
        compTotalScore += Number(compScore)
        myScoreboard.innerHTML = `My score: ${myTotalScore}`
        compScoreboard.innerHTML = `Computer score: ${compTotalScore}`
        if (data.remaining === 0) {
                if (myTotalScore > compTotalScore) {
                    message = "Congrats! You win!"
                } else if (compTotalScore > myTotalScore) {
                    message = "You lost. The game's over!"
                } else {
                    message = "Draw. Would you like to play again?"
                }
                messageEl.textContent = message
                drawBtn.style.display = "none"
                resetBtn.style.display = "inline-block"
            }
        })
        }

        function reset() {
            remaining = 0
            myScore = 0
            compScore = 0
            myTotalScore = 0
            compTotalScore = 0
            message = "War!"
            messageEl.textContent = message
            firstCardInput.innerHTML = ``
            secondCardInput.innerHTML = ``
            myScoreboard.innerHTML = `My score:`
            compScoreboard.innerHTML = `Computer score:`
            myScoreInput.innerHTML = `Me:`
            compScoreInput.innerHTML = `Computer:`
            drawBtn.style.display = "inline-block"
            resetBtn.style.display = "none"
        }

document.getElementById("newDeck").addEventListener("click", getDeck)
drawBtn.addEventListener("click", draw)
resetBtn.addEventListener("click", reset)

/* "JACK" "KING" "QUEEN" "ACE" */