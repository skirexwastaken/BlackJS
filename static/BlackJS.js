// BlackJS: Black Jack written using JS
class BlackJS{
    constructor(){

        // All cards
        this.cards = [
            "2♠️", "3♠️", "4♠️", "5♠️", "6♠️", "7♠️", "8♠️", "9♠️", "10♠️",
            "2♥️", "3♥️", "4♥️", "5♥️", "6♥️", "7♥️", "8♥️", "9♥️", "10♥️",
            "2♣️", "3♣️", "4♣️", "5♣️", "6♣️", "7♣️", "8♣️", "9♣️", "10♣️",
            "2♦️", "3♦️", "4♦️", "5♦️", "6♦️", "7♦️", "8♦️", "9♦️", "10♦️",
            "J♠️", "Q♠️", "K♠️",
            "J♥️", "Q♥️", "K♥️",
            "J♣️", "Q♣️", "K♣️",
            "J♦️", "Q♦️", "K♦️",
            "A♠️", "A♥️", "A♣️", "A♦️"

        ]

        // Values of each card
        this.cardValues = {
            "2♠️":2, "3♠️":3, "4♠️":4, "5♠️":5, "6♠️":6, "7♠️":7, "8♠️":8, "9♠️":9, "10♠️":10,
            "2♥️":2, "3♥️":3, "4♥️":4, "5♥️":5, "6♥️":6, "7♥️":7, "8♥️":8, "9♥️":9, "10♥️":10,
            "2♣️":2, "3♣️":3, "4♣️":4, "5♣️":5, "6♣️":6, "7♣️":7, "8♣️":8, "9♣️":9, "10♣️":10,
            "2♦️":2, "3♦️":3, "4♦️":4, "5♦️":5, "6♦️":6, "7♦️":7, "8♦️":8, "9♦️":9, "10♦️":10,
            "J♠️":10, "Q♠️":10, "K♠️":10,
            "J♥️":10, "Q♥️":10, "K♥️":10,
            "J♣️":10, "Q♣️":10, "K♣️":10,
            "J♦️":10, "Q♦️":10, "K♦️":10,
            "A♠️":[1,11], "A♥️":[1,11], "A♣️":[1,11], "A♦️":[1,11]

        }

        // Player's balance and bet amount
        this.balance = 100
        this.betAmount = 20

        // Player's cards and their total value
        this.myCards = []
        this.playerCount = 0
        
        // Dealer's cards and their total value
        this.dealerCards = []
        this.dealerCount = 0
        
        // Variable that tracks if a game is currently running
        this.started = false
    }

    // Function that increases bet amount using button
    increaseBetAmount(){
        // Can't increase the bet amount while currently playing a game
        if (this.started){
            return
        }

        if (this.betAmount < 100){
            this.betAmount += 10
            this.updateBetAmount()
        }
    }

    // Function that decreases bet amount using button
    decreaseBetAmount(){
        // Can't decrease the bet amount while currently playing a game
        if (this.started){
            return
        }

        if (this.betAmount > 10){
            this.betAmount -= 10
            this.updateBetAmount()
        }
    }

    // Function that recalculates player's balance
    calculateBalance(result){
        
        // True -> Player won the game
        if (result == true){
            this.balance += this.betAmount
        }

        // False -> Player lost the game
        else{
            this.balance -= this.betAmount
        }

        // Balance elemnt in html is updated
        this.updateBalance()

    }

    // Function that calculates player's cards value
    calculatePlayerCount(){
        this.playerCount = 0
        for (const card of this.myCards){
            const cardValue = this.cardValues[card]
            if (typeof cardValue == "number"){
                this.playerCount += cardValue
            }

            else{
                this.playerCount += cardValue[1]
            }
        }
    }

    // Function that calculates dealer's cards value
    calculateDealerCount(){
        this.dealerCount = 0
        for (const card of this.dealerCards){
            const cardValue = this.cardValues[card]
            if (typeof cardValue == "number"){
                this.dealerCount += cardValue
            }

            else{
                this.dealerCount += cardValue[1]
            }
        }
    }

    // Function that updates the Player's Hand element in html
    updatePlayerHand(){
        document.getElementById("myHand").innerHTML = "My Hand: "+this.myCards+" ("+String(this.playerCount)+")"
    }

    // Function that updates the Dealer's Hand element in html
    updateDealerHand(){
        document.getElementById("dealerHand").innerHTML = "Dealer's Hand: "+this.dealerCards+" ("+String(this.dealerCount)+")"
    }

    // Function that updates the Bet Amount element in html
    updateBetAmount(){
        document.getElementById("betAmount").innerHTML = "Bet Amount: "+this.betAmount
    }

    // Function that updates the Balance element in html
    updateBalance(){
        document.getElementById("balance").innerHTML="Balance: "+this.balance

        // Title of the game changes based on Player's balance
        if (this.balance == 0){
            document.getElementById("mainTitle").innerHTML = "BlackJS: We took your money ;]"
        }

        else if (this.balance >= 500){
            document.getElementById("mainTitle").innerHTML = "BlackJS: You took our money :["
        }

        else{
            if (document.getElementById("mainTitle").innerHTML != "BlackJS: We want your money :]"){
                document.getElementById("mainTitle").innerHTML = "BlackJS: We want your money :]"
            }
        }
    }

    // Adds a random card to player's hand
    playerTakesCard(){
        const card = this.cards[Math.floor(Math.random() * this.cards.length)]
        this.myCards.push(card)
        this.cards.splice(this.cards.indexOf(card),1)
    }

    // Adds a random card to dealer's hand
    dealerTakesCard(){
        const card = this.cards[Math.floor(Math.random() * this.cards.length)]
        this.dealerCards.push(card)
        this.cards.splice(this.cards.indexOf(card),1)
    }

    // Function that updates the game result in html
    updateGameStatus(content){
        document.getElementById("gameStatus").innerHTML = content

        // If the new content doesn't say "Game Ongoing", it changed the game status to ended
        if (!(content == "Result: Game Ongoing")){
            this.started=false
        }
    }

    // Function that restarts all of the variables to their default values so a new game can be started
    restartGame(){
        this.cards = [
            "2♠️", "3♠️", "4♠️", "5♠️", "6♠️", "7♠️", "8♠️", "9♠️", "10♠️",
            "2♥️", "3♥️", "4♥️", "5♥️", "6♥️", "7♥️", "8♥️", "9♥️", "10♥️",
            "2♣️", "3♣️", "4♣️", "5♣️", "6♣️", "7♣️", "8♣️", "9♣️", "10♣️",
            "2♦️", "3♦️", "4♦️", "5♦️", "6♦️", "7♦️", "8♦️", "9♦️", "10♦️",
            "J♠️", "Q♠️", "K♠️",
            "J♥️", "Q♥️", "K♥️",
            "J♣️", "Q♣️", "K♣️",
            "J♦️", "Q♦️", "K♦️",
            "A♠️", "A♥️", "A♣️", "A♦️"

        ]

        this.myCards = []
        this.playerCount = 0
        
        this.dealerCards = []
        this.dealerCount = 0
    }

    // Function that starts a new game
    start(){

        // Checking if game is ongoing and if Player has enough money to make a bet with the current bet amount
        if (this.started || this.balance - this.betAmount < 0){
            return
        }

        // Upon start the game variables are restarted
        this.restartGame()

        // Gives the first two cards to Player and Dealer
        for (let i in [0,1]){
            this.playerTakesCard()
            this.dealerTakesCard()
        }

        // Calculates Player's and Dealer's card value
        this.calculatePlayerCount()
        this.calculateDealerCount()

        // Updating GUI elements
        this.updateGameStatus("Result: Game Ongoing")
        this.updatePlayerHand()
        document.getElementById("dealerHand").innerHTML = "Dealer's Hand: "+this.dealerCards[0]+" ..."+" ("+String(this.cardValues[this.dealerCards[0]])+")"

        // Setting the game status to ongoing
        this.started = true

        // If player has Black Jack right after start, he automatically Holds
        if (this.playerCount == 21){
            this.hold()
        }
    }

    // Function that allows player to take a new card
    hit(){

        // Checking if game is ongoing
        if (!(this.started)){
            return
        }

        // Player gets a new card, the total value of their cards is recalculated and the GUI is updated
        this.playerTakesCard()
        this.calculatePlayerCount()
        this.updatePlayerHand()

        // If player has over 21 -> Attempt to find Ace, if Ace is found, its valued is changed from 11 -> 1
        if (this.playerCount > 21){
            for (const card of ["A♠️", "A♥️", "A♣️", "A♦️"]){
                if (this.myCards.includes(card)){
                    this.playerCount -= 10
                    this.updatePlayerHand()
                    break
                }
            }
        }

        // If player has 21, he ends his turn
        if (this.playerCount == 21){
            this.hold()
        }

        // If player has over 21, he looses
        if (this.playerCount > 21){
            this.updateGameStatus("Result: Dealer has won!")
            this.calculateBalance(false)
            this.started = false
            return
        }
    }

    // Function that "ends Player's turn", Dealer starts playing
    hold(){

        // Checking if game is ongoing
        if (!(this.started)){
            return
        }

        // Dealer takes a new card until the value of their cards is not at least 17
        while(this.dealerCount < 17){
            this.dealerTakesCard()
            this.calculateDealerCount()

            // If dealer has a total cards value of over 21
            if (this.dealerCount > 21){

                // Trying to convert Ace from 11 -> 1
                for (const card of ["A♠️", "A♥️", "A♣️", "A♦️"]){
                    if (this.dealerCards.includes(card)){
                        this.dealerCount -= 10
                        this.updateDealerHand()
                        break
                    }
                }

                // If dealer still has a total cards value of over 21 then the player wins
                if (this.dealerCount > 21){
                    this.updateGameStatus("Result: Player has won!")
                    this.updateDealerHand()
                    this.calculateBalance(true)
                    this.started = false
                    return
                }
            }
        }

        // If dealer has a BlackJack
        if (this.dealerCount == 21){

            // If player also has a BlackJack it's a tie
            if (this.playerCount == 21){
                this.updateGameStatus("Result: It was a tie!")
                this.updateDealerHand()
                this.started = false
                return
            }

            // If player doesn't have a BlackJack then the dealer wins
            else{
                this.updateGameStatus("Result: Dealer has won!")
                this.updateDealerHand()
                this.calculateBalance(false)
                this.started = false
                return

            }
        }

        // If only player has the BlackJack then the player wins
        if (this.playerCount == 21){
            this.updateGameStatus("Result: Player has won!")
            this.updateDealerHand()
            this.calculateBalance(true)
            this.started = false
            return
        }

        // If dealer has a higher total cards value
        if (this.dealerCount > this.playerCount){
            this.updateGameStatus("Result: Dealer has won!")
            this.updateDealerHand()
            this.calculateBalance(false)
            this.started = false
            return
        }

        // If dealer has the same cards value as the player then it's a tie
        else if (this.dealerCount == this.playerCount){
            this.updateGameStatus("Result: It was a tie!")
            this.updateDealerHand()
            this.started = false
            return
        }

        // If player has higher cards value than the dealer then the player wins
        else{
            this.updateGameStatus("Result: Player has won!")
            this.updateDealerHand()
            this.calculateBalance(true)
            this.started = false
            return
        }

    }
}

// Creating an instance of BlackJS
gameInstance = new BlackJS()