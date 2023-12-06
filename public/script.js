console.log("Welcome to Tic Tac Toe")
let music = new Audio("")
let audioTurn = new Audio("ting.wav")
let gameover = new Audio("gameover.mp3")
let turn = "X"
let isgameover = false;

const changeTurn = () => {
    return turn === "X" ? "0" : "X"
}

const checkWin = () => {
    let boxtext = document.getElementsByClassName('boxtext')
    let wins = [
        [0, 1, 2, 5, 5, 0],
        [3, 4, 5, 5, 15, 0],
        [6, 7, 8, 5, 25, 0],
        [0, 3, 6, -5, 15, 90],
        [1, 4, 7, 5, 15, 90],
        [2, 5, 8, 15, 15, 90],
        [0, 4, 8, 5, 15, 45],
        [2, 4, 6, 5, 15, 135],
    ]
    wins.forEach(winnerIndex => {
        if ((boxtext[winnerIndex[0]].innerText === boxtext[winnerIndex[1]].innerText) && (boxtext[winnerIndex[2]].innerText === boxtext[winnerIndex[1]].innerText) && (boxtext[winnerIndex[0]].innerText !== "")) {
            document.querySelector('.info').innerText = boxtext[winnerIndex[0]].innerText + "Won"
            const width = window.innerWidth;

            isgameover = true
            gameover.play()
            console.log(winnerIndex)
            let transformY = winnerIndex[4]
            let transformX = winnerIndex[3]
            if (width < 900) {

                transformY = (winnerIndex == wins[0]) ? transformY + 4 : winnerIndex == wins[2] ? transformY + 25 : transformY + 15
                transformX = winnerIndex == wins[3] ? transformX - 15 : winnerIndex == wins[5] ? transformX + 5 : transformX - 4
            }


            document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "150px";
            document.querySelector(".line").style.transform = `translate(${transformX}vw, ${transformY}vw) rotate(${winnerIndex[5]}deg)`

            document.querySelector(".line").style.width = width > 900 ? "20vw" : "60vw"

        }
    })
}

// Game Logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector('.boxtext')
    element.addEventListener('click', () => {
        if (boxtext.innerText === '') {
            boxtext.innerText = turn;
            turn = changeTurn();
            audioTurn.play();
            checkWin();
            if (!isgameover) {
                document.getElementsByClassName("info")[0].innerText = "Turn for" + turn;
            }
        }
    })
});


reset.addEventListener('click', (e) => {
    gameover.pause()
    gameover.load()
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element => {
        element.innerText = ""
    });
    turn = "X";
    isgameover = false;
    document.querySelector(".line").style.width = "0";
    document.getElementsByClassName("info")[0].innerText = "Turn for" + turn;
    document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "0px"

})