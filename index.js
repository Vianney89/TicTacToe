function createGrid(main_container) {
    let count=0;
    for(let i=1; i<4; i++) {
        let subContainer = document.createElement("div");
        subContainer.className = "subContainer";
        main_container.appendChild(subContainer);
        for(let j=1; j<4; j++) {
            let cell = document.createElement("div");
            cell.className = "inline";
            cell.setAttribute("cell-id",count) ;
            subContainer.appendChild(cell);
            count ++;
        }
    }
}

function gameBehavior(e, square) {
    let status = tictactoe(e.target);
    let index = e.target.getAttribute("cell-id");
    square[index] = status;
    console.log(square);
    let winner = calculateWinner(square);
    if(winner) {
        //delete events
        let main_container = document.querySelector("#mainContainerTICTACTOE");
        let divClone = main_container.cloneNode(true);
        document.body.replaceChild(divClone, main_container);
        //display winner
        let containerWinner = document.querySelector("#winner");
        containerWinner.textContent = "Winner is " + winner;
    } else {
        if(!square.includes(null)){
            let containerWinner = document.querySelector("#winner");
            containerWinner.textContent = "DRAW";
        }
    }
}

function setEvents(elements) {
    let square = new Array(9).fill(null);
    for( let i = 0 ; i<elements.length ; i++){
        let div = elements[i]; 
        div.addEventListener("click", function(e) {
            gameBehavior(e, square);
        });
    }
}

function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        // var a = lines[i][0];
        // var b = lines[i][1];
        // var c = lines[i][2];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
}

function tictactoe(element) {
    let target = element;
    if(target && target.textContent) {
        alert("already clicked");
        return;
    }
    if(target.textContent == "") {
        target.textContent = (statusXO) ? "X" : "O";
        statusXO = !statusXO;
    }
    return target.textContent;
}



var statusXO = true; // X
createGrid(document.querySelector("#mainContainerTICTACTOE"));
setEvents(document.querySelectorAll("#mainContainerTICTACTOE>div.subContainer>div")); 
