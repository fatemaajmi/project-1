const cards = document.querySelectorAll(".card")
let matched = 0
let cardOne, cardTwo
let disableDeck = false
let openCards =[]
let countdownElement = document.getElementById('second')


let flipCard=(({target: clickedCard}) =>{
    if(cardOne !== clickedCard && !disableDeck) {
        clickedCard.classList.add("flip")
        if(!cardOne) {
            return cardOne = clickedCard
        }
        cardTwo = clickedCard
        disableDeck = true
        let cardOneImg = cardOne.querySelector(".back-view img").src,
        cardTwoImg = cardTwo.querySelector(".back-view img").src
        matchCards(cardOneImg, cardTwoImg)
    }
})
let matchCards=((img1, img2)=> {
    if(img1 === img2) {
        matched++
            const pushToOpenCards= ((matchCards)=>{
                openCards.push(matchCards)
                if(openCards.length=3){
                    
                }
            })
            pushToOpenCards(matchCards)
            console.log(openCards)
        if(matched == 4) {
            setTimeout(() => {
                return shuffleCard()
            }, 1000)             
        }
        cardOne.removeEventListener("click", flipCard)
        cardTwo.removeEventListener("click", flipCard)
        cardOne = cardTwo = ""
        return disableDeck = false
    }

    setTimeout(() => {
        cardOne.classList.add("shake")
        cardTwo.classList.add("shake")
    }, 400)
    setTimeout(() => {
        cardOne.classList.remove("shake", "flip")
        cardTwo.classList.remove("shake", "flip")
        cardOne = cardTwo = ""
        disableDeck = false
    }, 1200)
})
let shuffleCard=(() =>{
    matched = 0
    disableDeck = false
    cardOne = cardTwo = ""
    let arr = [1, 2, 3, 4, 1, 2, 3, 4]
    arr.sort(() => Math.random() > 0.5 ? 1 : -1)
    cards.forEach((card, i) => {
        card.classList.remove("flip")
        let imgTag = card.querySelector(".back-view img")
        imgTag.src = `cards/img-${arr[i]}.JPG`
        card.addEventListener("click", flipCard)
    })
})
shuffleCard()


cards.forEach(card => {
    card.addEventListener("click", flipCard)
})



let countdown=((minutes)=> {
    let seconds = minutes * 60
    let interval = setInterval(function() {
        let minutesRemaining = Math.floor(seconds / 60)
        let secondsRemaining = seconds % 60

        countdownElement.innerHTML = minutesRemaining + ":" + (secondsRemaining < 10 ? "0" : "") + secondsRemaining

        if (--seconds < 0) {
            clearInterval(interval)
            countdownElement.innerHTML = "Time Up .. Try again"
            shuffleCard()
            countdown(1)
        }
        if (matched==4){
            clearInterval(interval)
            countdownElement.innerHTML = "You Win !!!" 
            countdown(1)
        }

    }, 1000) 
})

countdown(1)

