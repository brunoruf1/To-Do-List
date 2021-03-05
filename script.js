//Recebe primeira string da tarefa
let novaTarefa = document.getElementById("texto-tarefa");
//Botão que adiciona a nova tarefa 
let addTarefa = document.getElementById("botao-tarefa");
//Vai exibir as tarefas na tela
let listaTarefa = document.getElementById("lista-tarefas");
//Vai receber a informação de quando a janela de edição deve abrir
let janelaEdicao = document.getElementById("janela-edicao");
//Vai fazer o efeito de escurecer o fundo da tela quando a janela de edição estiver aberta
let janelaFundo = document.getElementById("janela-fundo");
//Vai receber a informação de quando a janela de edição deve fechar
let fecharEdicao = document.getElementById("fechar-edicao");
//Botão que será monitorado pela tecla Enter. Irá disparar uma função quando for apertado
let atualizarTarefa = document.getElementById("atualizar-tarefa");
//Input text que vai receber a edição da tarefa
let editarNomeTarefa = document.getElementById("editar-nome-tarefa");
//Exibe na tela o código ID da tarefa. O sistema pode compor até 3000 tarefas.
let idTarefaEdicao = document.getElementById("id-tarefa-edicao");

//Vai monitorar o input text e disparar a arrow function quando Enter for pressionado
novaTarefa.addEventListener("keypress" ,(e) => { 
//Comeca a função apenas caso a tecla enter for pressionada
    if (e.keyCode == 13){
//Dentro da condição, o objeto tarefa é declarado, sendo composto pela string digitada e um random de 1 a 3000
        let tarefa = {nome: novaTarefa.value, id: gerarId()};
//Chama a função de adicionar a tarefa mandando o parametro da nova tarefa inserida
        adicionarTarefa(tarefa);                
    }  
})
//Monitora o botão de fechar a edição quando clica no X
fecharEdicao.addEventListener ("click", (e) =>{
//Chama a função de alternar janela, voltando pra janela principal assim que o X é clicado
    alternarJanelaEdicao();
})
//Monitora o botão de adicionar tarefa e quando o botão é clicado, dispara a arrow function
addTarefa.addEventListener("click", (e) => {
//Cria um objeto tarefa composto pela string digitada e um random de 1 a 3000
    let tarefa = {nome: novaTarefa.value, id: gerarId()};
//Chama a funcao de adicionar tarefa enviando o objeto como parametro
    adicionarTarefa(tarefa);
})
//Botão de editar que dispara a arrow function quando é clicado
atualizarTarefa.addEventListener("click", (e) => {
//Impede que a ação do click seja executada por padrão
    e.preventDefault();
//Vai declarar uma variável que recebe a ID da tarefa retirando o # para ser composta só de números
    let idTarefa = idTarefaEdicao.innerHTML.replace("#", "");
//Declara um objeto composto pela string digitada na janela de edição e da ID da tarefa recebida acima
    let tarefa = {nome: editarNomeTarefa.value, id: idTarefa}
//Vai criar a tarefa atual e vai receber o valor da ID da tarefa
    let tarefaAtual = document.getElementById(idTarefa);
//Se a tarefa atual receber o valor
    if (tarefaAtual){
//Declara uma variavel que dispara a função criarTagLI mandando o objeto tarefa como parâmetro
        let li = criarTagLI(tarefa);
//Após a edição, exibe a tarefa na tela, colocando a tarefaAtual no lugar da tarefa LI de antes
        listaTarefa.replaceChild(li, tarefaAtual);
//Quando a tarefa atual é adicionada, chama a função de retornar a tela principal
        alternarJanelaEdicao();
    } 
})
//Declaracao de função para gerar código de identificação da tarefa
function gerarId(){
//Retorna para a função uma função matemática que randomiza um número de 0 a 1, multiplica por 3000 e depois arredonda para o menor valor inteiro
    return Math.floor(Math.random() * 3000);
}
//Declaração de função para adicionar tarefa
function adicionarTarefa(tarefa){
//Se o comprimento da string digitada não for zero, ou seja, caso o usuário digite mais que 1 caractere
    if(novaTarefa.value.length != 0){
//Ele cria uma variavel que recebe a função de criarTagLI, recebendo o objeto tarefa como parâmetro
        let li = criarTagLI(tarefa);
//Vai mostrar o objeto li na tela usando o innerHTML da variavel listaTarefa
        listaTarefa.appendChild(li);
//O campo de digitação da nova tarefa recebe uma string vazia para limpar o campo de digitação
        novaTarefa.value = "";
//Caso o comprimento da string digitada for igual a zero, ou seja, caso o usuário nao digite nada e queira clicar para adicionar tarefa
    }else{
//Ele recebe um alerta impedindo a continuação do programa, orientando-o a digitar algo na caixa
        alert("Insira um texto!");
    }
}
//Criação de função para criar a Tag LI recebendo o objeto tarefa como parametro, composto por string nome e código id
function criarTagLI(tarefa){
//declara uma variável li que recebe a criação de um elemento de lista
        let li = document.createElement("li");
//Atribui uma ID para o elemento LI que é a mesma ID do objeto tarefa
        li.id = tarefa.id;
//Cria uma variável que recebe a criação de um elemento span
        let span = document.createElement("span");
//Adiciona o texto de tarefa digitado por primeiro a uma classlist da variável span, para poder ser manipulado se necessário
        span.classList.add("texto-tarefa");
//Exibe dentro da span o nome do objeto tarefa
        span.innerHTML = (tarefa.nome);
//Cria uma variável div e atribui à criação de um novo elemento div
        let div = document.createElement("div");
//Cria uma variável editar e atribui à criação de um novo elemento de botão
        let editar = document.createElement("button");
//Adiciona o botão de acesso à uma classlist da variável editar
        editar.classList.add("btnAcao");
//Exibe na tela o notão editar atribuído de um ícone de lápis
        editar.innerHTML = '<i class = "fa fa-pencil"></i>';
//Assim que o botão editar for clicado, ele é atribuído do valor da ID da tarefa
        editar.setAttribute("onclick", `editar(${tarefa.id})`);
//Variável excluir que recebe a criação de um novo elemento button
        let excluir = document.createElement("button");
//Adiciona o botão de acesso à uma classlist da variável excluir
        excluir.classList.add("btnAcao");
//Exibe na tela o notão editar atribuído de um ícone de lixeira
        excluir.innerHTML = '<i class = "fa fa-trash"></i>';
//Assim que o botão excluir for clicado, ele é atribuído do valor da ID da tarefa
        excluir.setAttribute("onclick", `excluir(${tarefa.id})`);
//Exibe na tela a variável editar dentro do elemento div em formato de botão lápis
        div.appendChild(editar);
//Exibe na tela a variável excluir dentro do elemento div em formato de botão lixeira
        div.appendChild(excluir);
//Exibe o span que é o texto da tarefa exibido na caixa de tarefas
        li.appendChild(span);
//Exibe o div que é a divisão de botões de ação exibido na caixa de tarefas
        li.appendChild(div);
//Retorna para a função o valor de LI para poder fazer a sua criação
        return li;
    }
//Declaração de função editar com o parâmetro de id da tarefa
function editar(idTarefa){
//Declara uma li e atribui a ela a criação do elemento idTarefa
    let li = document.getElementById(idTarefa);
//Se LI receber um valor verdadeiro
    if (li){
//Vai exibir na tela uma # concatenado com a id da tarefa dentro da caixa idTarefaEdicao
        idTarefaEdicao.innerHTML = "#" + idTarefa;
//Chama a função de alternar a janela para abrir uma janela e fechar outra
        alternarJanelaEdicao();
    }
}
//Declaração de função excluir com o parâmetro de id da tarefa
function excluir(idTarefa){
//Define uma variável que receberá a confirmação final se o usuário realmente deseja excluir a tarefa, pois ela não pode ser recuperada
    let exclusao = window.confirm("Deseja excluir esta tarefa?");
//Se o valor for verdadeiro
    if (exclusao){
//Ele cria uma LI e atribui a criação de um elemento idTarefa
        var li = document.getElementById(idTarefa);
//Se LI receber valor verdadeiro
        if(li){
//A lista tarefas vai remover a LI em questão da sua classList
            listaTarefa.removeChild(li);
        }
    }
}
//Declara uma função de alterar a janela
function alternarJanelaEdicao(){
//Se a janela edição não existir, ela adiciona. Se ela existir, ela apaga
    janelaEdicao.classList.toggle("abrir");
//Se a janela fundo não existir, ela adiciona. Se ela existir, ela apaga
    janelaFundo.classList.toggle("abrir");
//Acima, enquanto uma está funcionando, a outra não está. Isso permite a alteração de janelas
}