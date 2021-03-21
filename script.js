let novaTarefa = document.getElementById("texto-tarefa");
let addTarefa = document.getElementById("botao-tarefa");
let listaTarefa = document.getElementById("lista-tarefas");
let janelaEdicao = document.getElementById("janela-edicao");
let janelaFundo = document.getElementById("janela-fundo");
let fecharEdicao = document.getElementById("fechar-edicao");
let atualizarTarefa = document.getElementById("atualizar-tarefa");
let editarNomeTarefa = document.getElementById("editar-nome-tarefa");
let idTarefaEdicao = document.getElementById("id-tarefa-edicao");

novaTarefa.addEventListener("keypress" ,(e) => { 
    if (e.keyCode == 13){
        let tarefa = {nome: novaTarefa.value, id: gerarId()};
        adicionarTarefa(tarefa);                
    }  
})
fecharEdicao.addEventListener ("click", (e) =>{
    alternarJanelaEdicao();
})
addTarefa.addEventListener("click", (e) => {
    let tarefa = {nome: novaTarefa.value, id: gerarId()};
    adicionarTarefa(tarefa);
})
atualizarTarefa.addEventListener("click", (e) => {
    e.preventDefault();
    let idTarefa = idTarefaEdicao.innerHTML.replace("#", "");
    let tarefa = {nome: editarNomeTarefa.value, id: idTarefa}
    let tarefaAtual = document.getElementById(idTarefa);
    if (tarefaAtual){
        let li = criarTagLI(tarefa);
        listaTarefa.replaceChild(li, tarefaAtual);
        alternarJanelaEdicao();
    } 
})
function gerarId(){
    return Math.floor(Math.random() * 3000);
}
function adicionarTarefa(tarefa){
    if(novaTarefa.value.length != 0){
        let li = criarTagLI(tarefa);
        listaTarefa.appendChild(li);
        novaTarefa.value = "";
    }else{
        alert("Insira um texto!");
    }
}
function criarTagLI(tarefa){
        let li = document.createElement("li");
        li.id = tarefa.id;
        let span = document.createElement("span");
        span.classList.add("texto-tarefa");
        span.innerHTML = (tarefa.nome);
        let div = document.createElement("div");
        let editar = document.createElement("button");
        editar.classList.add("btnAcao");
        editar.innerHTML = '<i class = "fa fa-pencil"></i>';
        editar.setAttribute("onclick", `editar(${tarefa.id})`);
        let excluir = document.createElement("button");
        excluir.classList.add("btnAcao");
        excluir.innerHTML = '<i class = "fa fa-trash"></i>';
        excluir.setAttribute("onclick", `excluir(${tarefa.id})`);
        div.appendChild(editar);
        div.appendChild(excluir);
        li.appendChild(span);
        li.appendChild(div);
        return li;
    }
function editar(idTarefa){
    let li = document.getElementById(idTarefa);
    if (li){
        idTarefaEdicao.innerHTML = "#" + idTarefa;
        alternarJanelaEdicao();
    }
}
function excluir(idTarefa){
    let exclusao = window.confirm("Deseja excluir esta tarefa?");
    if (exclusao){
        var li = document.getElementById(idTarefa);
        if(li){
            listaTarefa.removeChild(li);
        }
    }
}
function alternarJanelaEdicao(){
    janelaEdicao.classList.toggle("abrir");
    janelaFundo.classList.toggle("abrir");
}