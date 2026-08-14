let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
let filtroAtivo ="todas";



const form = document.querySelector("form");
const input = document.querySelector("#inputTarefa");
const lista = document.querySelector("#listaTarefas");
const contador = document.querySelector("#contador");
const listaVazia = document.querySelector("#listaVazia");
const botoesFiltro = document.querySelectorAll(".btnFiltro");


function salvarTarefas(){
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function aplicarFiltro() {
    const itens = lista.querySelectorAll("li");

    itens.forEach(function(item) {
        const concluida = item.classList.contains("concluida");

        if (filtroAtivo === "todas") {
            item.style.display = "flex";
        } else if (filtroAtivo === "pendentes") {
            if (concluida) {
                item.style.display = "none";
            } else {
                item.style.display = "flex";
            }
        } else if (filtroAtivo === "concluidas") {
            if (concluida) {
                item.style.display = "flex";
            } else {
                item.style.display = "none";
            }
        }
    });
}

function verificarListaVazia(){
    const totalItens = lista.querySelectorAll("li").length;
    
    if(totalItens === 0){
        listaVazia.style.display = "block";
    }else{
        listaVazia.style.display = "none";
    }
}

botoesFiltro.forEach(function(botao){
    botao.addEventListener("click", function(){
        botoesFiltro.forEach(function(b){
            b.classList.add("ativo");
        });
        botao.classList.add("ativo");

        filtroAtivo = botao.dataset.filtro;
        aplicarFiltro();
    });
});

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

        const index = Array.from(lista.children).indexOf(item);
        tarefas[index].concluida = item.classList.contains("concluida");
        salvarTarefas();
        atualizarContador();
        verificarListaVazia();
        aplicarFiltro();
    }

    if (event.target.classList.contains("btnExcluir")) {
        const index = Array.from(lista.children).indexOf(item);
        tarefas.splice(index, 1);
        salvarTarefas();

        item.remove();
        atualizarContador();
        verificarListaVazia();
    }
});

lista.addEventListener("dblclick", function(event){
    if(!event.target.classList.contains("check") && !event.target.classList.contains("btnExcluir") 
    && event.target.tagName == "SPAN"){

        const span = event.target;
        const textoAtual = span.textContent;

        const inputEdicao = document.createElement("input");
        inputEdicao.type = "text";
        inputEdicao.classList.add("inputEdicao");
        inputEdicao.value = textoAtual;

        span.replaceWith(inputEdicao);
        inputEdicao.focus();
    }
});

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const texto = input.value.trim();
    if(texto == ""){
        input.value = "";
        return;
    }

    const novaTarefa = {texto: texto, concluida: false};
    tarefas.push(novaTarefa);
    salvarTarefas();

    criarElementoTarefa(novaTarefa);

    atualizarContador();
    verificarListaVazia();
    aplicarFiltro();
    input.value = ""; 
});

    function criarElementoTarefa(TarefaObj){
        const tarefa = document.createElement("li");

        if(TarefaObj.concluida){
            tarefa.classList.add("concluida");
        }

        const botaoCheck = document.createElement("button");
        botaoCheck.classList.add("check");
        botaoCheck.textContent = "✓";

        const textoTarefa = document.createElement("span");
        textoTarefa.textContent = TarefaObj.texto;

        const botaoExcluir = document.createElement("button");
        botaoExcluir.classList.add("btnExcluir");
        botaoExcluir.textContent = "🗑";

        tarefa.appendChild(botaoCheck);
        tarefa.appendChild(textoTarefa);
        tarefa.appendChild(botaoExcluir);
   
        lista.appendChild(tarefa);
    }

    tarefas.forEach (function(TarefaObj){
        criarElementoTarefa(TarefaObj);
    });

    atualizarContador();
    verificarListaVazia();
    aplicarFiltro();