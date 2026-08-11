const form = document.querySelector("form");
const input = document.querySelector("#inputTarefa");
const lista = document.querySelector("#listaTarefas");
const contador = document.querySelector("#contador");

function atualizarContador(){
    const pendentes = lista.querySelectorAll("li:not(.concluida)").length;

    if(pendentes == 1){
        contador.textContent = "1 tarefa pendente";

    }else{
        contador.textContent = `${pendentes} tarefas pendentes`; 
    }
}

lista.addEventListener("click", function(event) {
    const item = event.target.closest("li");
    if (!item) return; 

    if (event.target.classList.contains("check")) {
        item.classList.toggle("concluida");
        atualizarContador();
    }

    if (event.target.classList.contains("btnExcluir")) {
        item.remove();
        atualizarContador();
    }
});

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const texto = input.value.trim();
    if(texto == ""){
        input.value = "";
        return;
    }

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
    atualizarContador();
    input.value = ""; 
});
    atualizarContador();