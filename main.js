// Constantes que obtem o valor dado em seus respectivos campos
const button = document.querySelector(".button-add-task")
const input = document.querySelector(".input-task")
const allList = document.querySelector(".list-task")

let myList = []
// Matriz variável que guarda as tarefas inseridas

// Função que adiciona tarefas e emite um alerta caso não digitem nenhum valor na caixa de texto
function addTask(){
    if (input.value != ""){
    myList.push({
        task: input.value,
        completed:false
    })
    
    viewTask()
}else{
    alert("O campo está vazio, insira uma tarefa.")
}
}
// Função que mostra as tarefas inseridas na página
function viewTask(){

    let newLi = ""

    // Ação que imprime as tarefas conforme os itens e ordens em que foram adicionados
    myList.forEach((item, index) => {
        if (
            currentFilter === 'all' ||
            (currentFilter === 'pending' && !item.completed) ||
            (currentFilter === 'completed' && item.completed)
            // Filtro em que divide as tarefas entre "todas", "pendentes" e "completas"
        ) {
        newLi = newLi + `
        <li class="task ${item.completed && "done"}">
                <img src="img/25404.png" alt="check-task" onclick="checkItem(${index})">
                <p>${item.task}</p>
                <img class="delete" src="img/126468.png" alt="delete-task" onclick="deleteItem(${index})">
            </li>
            `}
            // Código que adiciona a seção da nova tarefa inserida na página
    })

    allList.innerHTML = newLi
    // Transforma a lista em que foi adicionada uma nova tarefa como nova "Lista total"

    localStorage.setItem("list", JSON.stringify(myList))
    // Guarda a lista atual com as tarefas inseridas no local pagina do naegador

}
// Função para deletar itens
function deleteItem(index){
    myList.splice(index, 1)

    viewTask()
}
// Função para marcar os itens como concluídos
function checkItem(index){
    myList [index].completed = !myList [index].completed

    viewTask()
}
// Função para manter os itens da lista na página mesmo após atualiza-la
function UpdateTask(){
    const localStorageTasks = localStorage.getItem("list")
    // Pega os itens guardados no local da pagina do navegador

    myList = JSON.parse(localStorageTasks)
    // Reinsere os itens guardados no local da pagina devolta na lista

    viewTask()
}

let currentFilter = "all";

function filterTasks(filter) {
    currentFilter = filter;
    viewTask();
}

UpdateTask()
button.addEventListener("click", addTask)