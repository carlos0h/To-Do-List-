const form = document.querySelector("form");
const input = document.querySelector("#inputTarefa");
const lista = document.querySelector("#listaTarefas");

lista.addEventListener("click", function(event) {
    const item = event.target.closest("li");
    if (!item) return; 

    if (event.target.classList.contains("check")) {
        item.classList.toggle("concluida");
    }

    if (event.target.classList.contains("btnExcluir")) {
        item.remove();
    }
});

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const texto = input.value;

    const tarefa = document.createElement("li");

    const botaoCheck = document.createElement("button");
    botaoCheck.classList.add("check");
    botaoCheck.textContent = "✓";

    const textoTarefa = document.createElement("span");
    textoTarefa.textContent = texto;

    const botaoExcluir = document.createElement("button");
    botaoExcluir.classList.add("btnExcluir");
    botaoExcluir.textContent = "🗑";

    tarefa.appendChild(botaoCheck);
    tarefa.appendChild(textoTarefa);
    tarefa.appendChild(botaoExcluir);

    lista.appendChild(tarefa);

    input.value = ""; 
});