handOps=["Rock","Paper","Scissors"]; 

// função para escolher a "mão" do computador
function selectComputerHand(){
    let randomIndex = Math.floor(Math.random() * handOps.length);   
    return handOps[randomIndex];
}

function showScore(score){
    return `Wins: ${score.wins}; Losses: ${score.losses}; Ties: ${score.ties}`;

}

function resetScore(score){
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;

    // zerando a pontuação no localStorage
    localStorage.setItem('score', JSON.stringify(score));
    alert('The score are just reset\n' + showScore(score) );
}

// verificando que ganhou
function vencendor(userEscolha, computerHand){
    /*  pedra GANHA tesoura
        tesoura GANHA papel
        papel   GANHA pedra
    */

   // recuperando a pontução do localStorage
   score = JSON.parse(localStorage.getItem('score'));
   
   let mensagem;
    if (userEscolha === computerHand){
        mensagem = 'Tie';
        score.ties++;
        
    } else if ((userEscolha ==='Rock' && computerHand === 'Scissors') 
            || (userEscolha ==='Paper' && computerHand === 'Rock')
            || (userEscolha ==='Scissors' && computerHand === 'Paper')){
                
        mensagem ='You won';
        score.wins++; 
    }else{
        mensagem ='Computer won';
        score.losses++;
    }

    // armazenando a pontuação
    localStorage.setItem('score', JSON.stringify(score));
        
    // imprimindo a mensagem de quem ganhor
    alert(`You got ${userEscolha}. ${mensagem}\n ${showScore(score)}`);
    
}

// objeto Score que vai guardar a pontução
let score = {
    wins: 0,
    losses: 0,
    ties:0
};

// obtendo a escolha do usuário
const buttons = document.querySelector('.buttons');
let userEscolha;

buttons.addEventListener('click', (event)=>{
    // pegando o conteudo do botão que foi clicado
    userEscolha = event.target.textContent;
    
    if(userEscolha === 'Reset Score'){
        resetScore(score);
        return;
    }
    // escolha do computador sempre que o um dos botões forem clicados
    let computerHand = selectComputerHand();
    console.log('computador: ' + computerHand);

    console.log('usuario: '+userEscolha); 
    
    // se qualquer outro botão for clicado que não o de Reset calculamos o vencedor
    vencendor(userEscolha, computerHand);
});
