let boxes= document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset");
let turnO= true;//playerx , playerO
let newBtn= document.querySelector(".newBtn");
let win=document.querySelector(".win");
let msg= document.querySelector(".msg");

const winnPatterns=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
    ];
    const newGame=()=>{
        turnO= true;
        enableBoxes();
        win.classList.add("hide");
    };
    
    
    boxes.forEach((box)=> {
        box.addEventListener("click", ()=>{
            //   console.log("Button was clicked ");
            if (turnO) { // player O
                box.innerText = "O";
                turnO = false;
            } else { //player X
                box.innerText = "X";
                turnO = true;
            }
            box.disabled = true; // Disable only the clicked box
            checkWinner();
        });
    });
    
    const disableBoxes = ()=>{
        for (box of boxes) {
            box.disabled = true;
        }
    };

    const enableBoxes = ()=>{
        for (box of boxes) {
            box.disabled = false;
            box.innerText = "";
        }
    };
    
    const showWinner= (winner)=>{
        msg.innerText=`Congratulation! winner is ${winner} `;
        win.classList.remove("hide");
        disableBoxes();
    };
    
    const checkWinner=()=>{
        for (let pattern of winnPatterns) {
           
           let pos1Val= boxes[pattern[0]].innerText;
           let pos2Val=boxes[pattern[1]].innerText;
           let pos3Val= boxes[pattern[2]].innerText;
           
           if (pos1Val!="" && pos2Val!="" && pos3Val!="") {
               if (pos1Val===pos2Val &&  pos2Val===pos3Val) {
                   disableBoxes();
                   showWinner(pos1Val);
               };
           };
        };
    };
    resetBtn.addEventListener("click",newGame);
    newBtn.addEventListener("click",newGame);