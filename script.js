const form = document.querySelector("form");
const input = document.querySelector("#inputTarefa");
const lista = document.querySelector("#listaTarefa");

form.addEventListener("submit", function(event){
    event.preventDefault();

    const texto = input.value; 

    const tarefa = document.createElement("li");
    tarefa.textContent = texto;

    lista.appendChild(tarefa);
});