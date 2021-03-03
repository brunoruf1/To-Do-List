var novaTarefa = document.getElementById("txt1")
var addTarefa = document.getElementById("botaoTarefa")
var listaTarefa = document.getElementById("listaTarefas")
var janelaEdicao = document.getElementById("janelaEdicao")
var janelaFundo = document.getElementById("janelaFundo")
var fecharEdicao = document.getElementById("fecharEdicao")
var atualizarTarefa = document.getElementById("atualizarTarefa")
var editarNomeTarefa = document.getElementById("editarNomeTarefa")
var idTarefaEdicao = document.getElementById("idTarefaEdicao")

novaTarefa.addEventListener("keypress" ,(e) => { 
    if (e.keyCode == 13){
        var tarefa = {nome: novaTarefa.value, id: gerarId()}
        adicionarTarefa(tarefa)                     
    }  
})

fecharEdicao.addEventListener ("click", (e) =>{
    alternarJanelaEdicao()
})

addTarefa.addEventListener("click", (e) => {

    var tarefa = {nome: novaTarefa.value, id: gerarId()}
    adicionarTarefa(tarefa)
})

atualizarTarefa.addEventListener("click", (e) => {
    e.preventDefault();
    var idTarefa = idTarefaEdicao.innerHTML.replace("#", "")
    var tarefa = {nome: editarNomeTarefa.value, id: idTarefa}
    var tarefaAtual = document.getElementById(idTarefa)
    if (tarefaAtual){
        var li = criarTagLI(tarefa)
        listaTarefa.replaceChild(li, tarefaAtual)
        alternarJanelaEdicao()
    } 
})

function gerarId(){
    return Math.floor(Math.random() * 3000)
}

function adicionarTarefa(tarefa){
    if(novaTarefa.value.length != 0){
        var li = criarTagLI(tarefa)
        listaTarefa.appendChild(li)
        novaTarefa.value = ""
    }else{
        alert("Insira um texto!")
    }
}

function criarTagLI(tarefa){

        var li = document.createElement("li")
        li.id = tarefa.id
        var span = document.createElement("span")
        span.classList.add("txt1")
        span.innerHTML = (tarefa.nome)
    
        var div = document.createElement("div")
        
        var editar = document.createElement("button")
        editar.classList.add("btnAcao")
        editar.innerHTML = '<i class = "fa fa-pencil"></i>'
        editar.setAttribute("onclick", `editar(${tarefa.id})`)
    
        var excluir = document.createElement("button")
        excluir.classList.add("btnAcao")
        excluir.innerHTML = '<i class = "fa fa-trash"></i>'
        excluir.setAttribute("onclick", `excluir(${tarefa.id})`)
    
        div.appendChild(editar)
        div.appendChild(excluir)
    
        li.appendChild(span)
        li.appendChild(div)
        return li
    }

function editar(idTarefa){
    var li = document.getElementById(idTarefa)
    if (li){
        idTarefaEdicao.innerHTML = "#" + idTarefa;
        alternarJanelaEdicao()
    }
}

function excluir(idTarefa){
    var exclusao = window.confirm("Deseja excluir esta tarefa?")
    if (exclusao){
        var li = document.getElementById(idTarefa)
        if(li){
            listaTarefa.removeChild(li)
        }
    }
}

function alternarJanelaEdicao(){
    janelaEdicao.classList.toggle("abrir")
    janelaFundo.classList.toggle("abrir")
}