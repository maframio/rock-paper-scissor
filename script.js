handOps=["rock","paper","scissors"]; 

// função para escolher a "mão" do computador
function selectComputerHand(){
    let randomIndex = Math.floor(Math.random() * handOps.length);   
    return handOps[randomIndex];
}

function selectUserHand(event){
    return event.originalTarget.alt;// eu fiz mas não sei como
}

function showScore(score){
    // score = JSON.parse(localStorage.getItem('score'));
    let gameScore = `Wins: ${score.wins}; Losses: ${score.losses}; Ties: ${score.ties}`;
    return gameScore;
}

function resetScore(score){
    // let score = JSON.parse(localStorage.getItem('score'));

    score.wins = 0;
    score.losses = 0;
    score.ties = 0;

    // zerando a pontuação no localStorage
    localStorage.setItem('score', JSON.stringify(score));
    mudaScoreTexto(score);

    // "escondendo as mãos das escolhas"
    const escolhasElement = document.querySelector('.escolhas');
    escolhasElement.classList.add('hidden');

    // alert('The score are just reset\n' + showScore(score) );

}

function mudaScoreTexto(score){
    // recuperando a pontução do localStorage
    // score = JSON.parse(localStorage.getItem('score'));

    const scoreElement = document.querySelector(".score-text");
  
    if(scoreElement.hasChildNodes()){
        // replace
        // document.replaceChild(newScoreText, scoreElement.children);
        scoreElement.innerText = showScore(score);
        // console.log(scoreElement);
    }

}

function mudaGanhador(ganhador){
    const ganhadorElement = document.querySelector(".ganhador");
    if(ganhador === 'user'){
        ganhadorElement.innerText = "You won.";
    }else if(ganhador === 'computer'){
        ganhadorElement.innerText = "You lose.";
    } else{
        ganhadorElement.innerText = "Tie.";
    }

    // removendo a classe que faz o elemento "desparecer" da página
    ganhadorElement.classList.remove('hidden');
}

function mostraEscolhas(userEscolha, computerHand){
    const escolhasElement = document.querySelector('.escolhas');
    const userOp = document.querySelector('.userOp');
    const computerOp = document.querySelector('.computerOp');

    // verificando as escolhas para colocar a imagem correspondente

    // escolhasElement.innerText = `You: ${userEscolha} - Computer: ${computerHand}`;
    // escolhasElement.innerHTML = `You: ${userEscolha} - Computer: ${computerHand}`;
    userOp.src = `images/${userEscolha}.png`;
    computerOp.src = `images/${computerHand}.png`;

    escolhasElement.classList.remove('hidden');
}

// verificando que ganhou
function vencendor(userEscolha, computerHand, score){
    /*  pedra GANHA tesoura
        tesoura GANHA papel
        papel   GANHA pedra
    */
   
   let mensagem;
   let ganhador;
    if (userEscolha === computerHand){
        mensagem = 'Tie';
        score.ties++;
        ganhador = "Tie";
        
    } else if ((userEscolha ==='rock' && computerHand === 'scissors') 
            || (userEscolha ==='paper' && computerHand === 'rock')
            || (userEscolha ==='scissors' && computerHand === 'paper')){
                
        mensagem ='You won';
        ganhador = 'user';
        score.wins++; 
    }else{
        mensagem ='Computer won';
        ganhador = 'computer';
        score.losses++;
    }

    // armazenando a pontuação
    localStorage.setItem('score', JSON.stringify(score));

    // mudar vencedor
    mudaGanhador(ganhador);

    // mostra escolhas
    mostraEscolhas(userEscolha, computerHand);

    mudaScoreTexto(score);
        
    // imprimindo a mensagem de quem ganhor
    // alert(`You got ${userEscolha}. ${mensagem}\n ${showScore(score)}`);
    
}

// cria um objeto se não existir um no localStorage
let score = JSON.parse(localStorage.getItem('score')) || { wins: 0, losses: 0, ties: 0 };

// obtendo a escolha do usuário
const buttons = document.querySelector('.buttons');
let userEscolha;

// adicionando a pontuação na página
const scoreElement = document.createElement("p");
scoreElement.className ="score-text"; // adicionando uma classe ao parágrafo de pontuação

// transformando a string da pontuação em um elemento do dom
const scoreText = document.createTextNode(showScore(score));

scoreElement.appendChild(scoreText);
buttons.after(scoreElement);

buttons.addEventListener('click', (event)=>{
    // pegando o conteudo do botão que foi clicado
    userEscolha = event.target.textContent;
    userEscolha = selectUserHand(event);
  
    // escolha do computador sempre que o um dos botões forem clicados
    let computerHand = selectComputerHand();
    console.log('computador: ' + computerHand);

    console.log('usuario: ' + userEscolha); 
    
    // se qualquer outro botão for clicado que não o de Reset calculamos o vencedor
    vencendor(userEscolha, computerHand, score);
});


const reset = document.querySelector(".reset")
reset.addEventListener('click', ()=>{
    // console.log('hello world');
    let score = JSON.parse(localStorage.getItem('score'));
    resetScore(score);

});



