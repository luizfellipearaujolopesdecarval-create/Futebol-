const telaInicio = document.getElementById("inicio");
const telaQuiz = document.getElementById("quiz");
const telaFinal = document.getElementById("final");
const telaRecompensa = document.getElementById("recompensa");

const btnComecar = document.getElementById("btnComecar");
const btnProxima = document.getElementById("btnProxima");
const btnRecompensa = document.getElementById("btnRecompensa");

const pergunta = document.getElementById("pergunta");
const alternativas = document.getElementById("alternativas");
const contador = document.getElementById("contador");
const progresso = document.getElementById("progresso");

const pontuacao = document.getElementById("pontuacao");
const mensagemFinal = document.getElementById("mensagemFinal");

let indice = 0;
let acertos = 0;

btnComecar.addEventListener("click", () => {
    telaInicio.classList.add("escondido");
    telaQuiz.classList.remove("escondido");
    mostrarPergunta();
});

function mostrarPergunta(){

    btnProxima.classList.add("escondido");

    const atual = perguntas[indice];

    contador.innerHTML = `Pergunta ${indice+1} de ${perguntas.length}`;

    progresso.style.width =
        ((indice)/perguntas.length)*100 + "%";

    pergunta.innerHTML = atual.pergunta;

    alternativas.innerHTML = "";

    atual.alternativas.forEach((texto,i)=>{

        const botao = document.createElement("button");

        botao.innerHTML = texto;

        botao.className = "alternativa";

        botao.onclick = ()=>responder(botao,i);

        alternativas.appendChild(botao);

    });

}

function responder(botao,resposta){

    const correta = perguntas[indice].correta;

    const botoes = document.querySelectorAll(".alternativa");

    botoes.forEach(b=>b.disabled=true);

    if(resposta===correta){

        botao.classList.add("correta");

        acertos++;

    }else{

        botao.classList.add("errada");

        botoes[correta].classList.add("correta");

    }

    btnProxima.classList.remove("escondido");

}

btnProxima.addEventListener("click",()=>{

    indice++;

    if(indice<perguntas.length){

        mostrarPergunta();

    }else{

        finalizar();

    }

});

function finalizar(){

    telaQuiz.classList.add("escondido");

    telaFinal.classList.remove("escondido");

    pontuacao.innerHTML =
        `Você acertou ${acertos} de ${perguntas.length} perguntas!`;

    if(acertos<=10){

        mensagemFinal.innerHTML =
        "😅 Acho que você precisa conversar mais comigo.";

    }else if(acertos<=20){

        mensagemFinal.innerHTML =
        "🙂 Você me conhece bem!";

    }else if(acertos<=29){

        mensagemFinal.innerHTML =
        "😎 Caramba! Você realmente presta atenção em mim.";

    }else{

        mensagemFinal.innerHTML =
        "👑 PERFEITO!! Você acertou tudo! ❤️";

    }

    progresso.style.width="100%";

}

btnRecompensa.addEventListener("click",()=>{

    telaFinal.classList.add("escondido");

    telaRecompensa.classList.remove("escondido");

});
