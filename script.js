const form = document.querySelector("form");
const input = document.querySelector("#inputTarefa");
const lista = document.querySelector("#listaTarefas");

const botoesCheck = document.querySelectorAll(".check");

    botoesCheck.forEach(function(botao){
        botao.addEventListener("click", function(){
        botao.parentElement.classList.toggle("concluida");
    
    });
});




form.addEventListener("submit", function(event){
    event.preventDefault();

    const texto = input.value; 

    const tarefa = document.createElement("li");

    const botaoCheck = document.createElement("button");
    botaoCheck.classList.add("check");
    botaoCheck.textContent = "✓";

    botaoCheck.addEventListener("click", function(){
        tarefa.classList.toggle("concluida");
    });


    const textoTarefa = document.createElement("span");
    textoTarefa.textContent = texto;

    tarefa.appendChild(botaoCheck);
    tarefa.appendChild(textoTarefa);



    lista.appendChild(tarefa);
});