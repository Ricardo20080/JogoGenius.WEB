const colors = ["green", "red", "yellow", "blue"];

let sequence = [];
let playerSequence = [];

let score = 0;
let round = 0;

let canClick = false;

const startBtn = document.querySelector("#start-btn");
const message = document.querySelector("#message");
const roundText = document.querySelector("#round");
const scoreText = document.querySelector("#score");

const blocks = document.querySelectorAll(".color");

/* =========================
   START (INICIA JOGO / NOVA PARTIDA)
========================= */

startBtn.addEventListener("click", startGame);

function startGame(){

    score = 0;
    scoreText.innerText = score;

    round++;
    roundText.innerText = round;

    sequence = [];
    playerSequence = [];

    startBtn.disabled = true;

    message.innerText = "Memorize a sequência...";

    addToSequence();
}

/* =========================
   ADICIONA COR NA SEQUÊNCIA
========================= */

function addToSequence(){

    const random = colors[Math.floor(Math.random() * colors.length)];
    sequence.push(random);

    playerSequence = [];

    showSequence();
}

/* =========================
   MOSTRA SEQUÊNCIA
========================= */

function showSequence(){

    canClick = false;

    let i = 0;

    const interval = setInterval(() => {

        flash(sequence[i]);

        i++;

        if(i >= sequence.length){
            clearInterval(interval);

            canClick = true;
            message.innerText = "Sua vez!";
        }

    }, 700);
}

/* =========================
   CLIQUE DO JOGADOR
========================= */

blocks.forEach(block => {

    block.addEventListener("click", () => {

        if(!canClick) return;

        const color = block.dataset.color;

        flash(color);

        playerSequence.push(color);

        check(playerSequence.length - 1);

    });

});

/* =========================
   VERIFICAÇÃO
========================= */

function check(index){

    if(playerSequence[index] !== sequence[index]){
        gameOver();
        return;
    }

    if(playerSequence.length === sequence.length){

        score++;
        scoreText.innerText = score;

        message.innerText = "Boa! Próxima sequência...";

        canClick = false;

        setTimeout(() => {
            addToSequence(); // ✔ cresce infinitamente
        }, 1000);
    }
}

/* =========================
   FLASH
========================= */

function flash(color){

    const el = document.querySelector(`.${color}`);

    el.classList.add("active");

    setTimeout(() => {
        el.classList.remove("active");
    }, 300);
}

/* =========================
   GAME OVER
========================= */

function gameOver(){

    canClick = false;

    message.innerText = "Você errou! Clique em Iniciar.";

    startBtn.disabled = false;

    saveRecord();
}

/* =========================
   RECORD
========================= */

function saveRecord(){

    let record = Number(localStorage.getItem("record")) || 0;

    if(score > record){
        localStorage.setItem("record", score);
        message.innerText = "🔥 Novo recorde!";
    }
}