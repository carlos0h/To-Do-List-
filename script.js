let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
let filtroAtivo = "todas";

const form = document.querySelector("form");
const input = document.querySelector("#inputTarefa");
const lista = document.querySelector("#listaTarefas");
const contador = document.querySelector("#contador");
const listaVazia = document.querySelector("#listaVazia");
const botoesFiltro = document.querySelectorAll(".btnFiltro");
const selectCategoria = document.querySelector("#selectCategoria");
const inputPrazo = document.querySelector("#inputPrazo");

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
            b.classList.remove("ativo");
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

        function salvarEdicao(){

            const novoTexto = inputEdicao.value.trim();
            const item = inputEdicao.closest("li");
            const index = Array.from(lista.children).indexOf(item);

            if(novoTexto == ""){
                inputEdicao.replaceWith(span);
                return;
            }
            span.textContent = novoTexto;
            tarefas[index].texto = novoTexto;
            salvarTarefas();

            inputEdicao.replaceWith(span);
        }
        inputEdicao.addEventListener("blur", salvarEdicao);

        inputEdicao.addEventListener("keydown", function(event){
            if(event.key == "Enter"){
                inputEdicao.blur();
            }
        });
    }
});

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const texto = input.value.trim();
    if(texto == ""){
        input.value = "";
        return;
    }

    const novaTarefa = {texto: texto, concluida: false, categoria: selectCategoria.value, prazo: inputPrazo.value};
    tarefas.push(novaTarefa);
    salvarTarefas();

    criarElementoTarefa(novaTarefa);

    atualizarContador();
    verificarListaVazia();
    aplicarFiltro();
    input.value = ""; 
    inputPrazo.value = "";
});

function estaAtrasada(prazo, concluida){
    if (prazo == ""){
        return false;
    }
    if(concluida){
        return false;
    }

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const dataPrazo = new Date(prazo + "T00:00:00");

    if(dataPrazo < hoje){
        return true;
    } else{
        return false;
    }
}

function criarElementoTarefa(TarefaObj){
    const tarefa = document.createElement("li");
    const spanPrazo = document.createElement("span");
    spanPrazo.classList.add("prazo");

    if(TarefaObj.prazo !== ""){
        const dataFormatada = new Date(TarefaObj.prazo + "T00:00:00");
        const dia = String(dataFormatada.getDate()).padStart(2, "0");
        const mes = String(dataFormatada.getMonth() + 1).padStart(2, "0");
        const ano = dataFormatada.getFullYear();

        spanPrazo.textContent = dia + "/" + mes + "/" + ano;

        if(estaAtrasada(TarefaObj.prazo, TarefaObj.concluida)){
            spanPrazo.classList.add("atrasada");
        }
    }

    if(TarefaObj.concluida){
        tarefa.classList.add("concluida");
    }

    tarefa.classList.add("categoria-" + TarefaObj.categoria);
    
    const botaoCheck = document.createElement("button");
    botaoCheck.classList.add("check");
    botaoCheck.innerHTML = `<svg viewBox="0 0 24 24" width="14" height="14"><path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

    const textoTarefa = document.createElement("span");
    textoTarefa.textContent = TarefaObj.texto;

    const botaoExcluir = document.createElement("button");
    botaoExcluir.classList.add("btnExcluir");
    botaoExcluir.innerHTML = `<svg viewBox="0 0 24 24" width="14" height="14"><path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0l-1 14a2 2 0 01-2 2H7a2 2 0 01-2-2L4 6h16z" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

    tarefa.appendChild(botaoCheck);
    tarefa.appendChild(textoTarefa);
    tarefa.appendChild(spanPrazo);
    tarefa.appendChild(botaoExcluir);

    lista.appendChild(tarefa);
}

tarefas.forEach (function(TarefaObj){
    criarElementoTarefa(TarefaObj);
});

atualizarContador();
verificarListaVazia();
aplicarFiltro();