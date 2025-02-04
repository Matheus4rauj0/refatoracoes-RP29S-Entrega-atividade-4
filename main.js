class TaskManager {
    constructor() {
        this.button = document.querySelector(".button-add-task");
        this.input = document.querySelector(".input-task");
        this.allList = document.querySelector(".list-task");
        this.myList = [];
        this.currentFilter = "all";

        this.loadTasks();
        this.button.addEventListener("click", () => this.addTask());
    }

    addTask() {
        if (this.input.value.trim() === "") {
            alert("O campo está vazio, insira uma tarefa.");
            return;
        }
        
        this.myList.push(this.createTask(this.input.value));
        this.updateView();
    }

    createTask(task) {
        return { task, completed: false };
    }

    updateView() {
        this.allList.innerHTML = this.myList
            .filter(item => this.filterTasks(item))
            .map((item, index) => this.createTaskHTML(item, index))
            .join(" ");
        
        localStorage.setItem("list", JSON.stringify(this.myList));
    }

    createTaskHTML(item, index) {
        return `
        <li class="task ${item.completed ? "done" : ""}">
            <img src="img/25404.png" alt="check-task" onclick="taskManager.toggleTask(${index})">
            <p>${item.task}</p>
            <img class="delete" src="img/126468.png" alt="delete-task" onclick="taskManager.deleteTask(${index})">
        </li>`;
    }

    deleteTask(index) {
        this.myList.splice(index, 1);
        this.updateView();
    }

    toggleTask(index) {
        this.myList[index].completed = !this.myList[index].completed;
        this.updateView();
    }

    loadTasks() {
        const storedTasks = localStorage.getItem("list");
        this.myList = storedTasks ? JSON.parse(storedTasks) : [];
        this.updateView();
    }

    filterTasks(item) {
        return (
            this.currentFilter === "all" ||
            (this.currentFilter === "pending" && !item.completed) ||
            (this.currentFilter === "completed" && item.completed)
        );
    }

    setFilter(filter) {
        this.currentFilter = filter;
        this.updateView();
    }
}

const taskManager = new TaskManager();
