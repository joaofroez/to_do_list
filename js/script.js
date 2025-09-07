const addTaskButton = document.getElementById('add-task-button');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list')

function saveTasks(){
    const tasksLi = document.querySelectorAll('#task-list li');

    const tasks = [];

    tasksLi.forEach(taskLi => {
        
        const taskSpan = taskLi.querySelector('span');
        const taskCheckbox = taskLi.querySelector('input[type="checkbox"]');

        tasks.push({
            text: taskSpan.innerText,
            completed: taskCheckbox.checked
        });

    });
    
    localStorage.setItem('tasks', JSON.stringify(tasks));
    console.log("Tarefas salvas no localStorage.");
}

function createTaskElement(taskText, isCompleted){
    const newTask = document.createElement('li');

    const taskCheckboxDiv =document.createElement('div');
    taskCheckboxDiv.className = 'task-content';

    const checkbox = document.createElement('input');
    checkbox.className = 'task-checkbox';
    checkbox.type = 'checkbox';

    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.className = 'delete-button';

    taskCheckboxDiv.appendChild(checkbox);
    taskCheckboxDiv.appendChild(taskSpan);

    newTask.appendChild(taskCheckboxDiv);
    newTask.appendChild(deleteButton);

    checkbox.checked = isCompleted
    if (isCompleted) {
        newTask.classList.add('completed');
    }

    deleteButton.addEventListener('click', function(){
        taskList.removeChild(newTask);
        saveTasks();
    })

    checkbox.addEventListener('change', function(){
        if(checkbox.checked) {
            newTask.classList.add('completed')
        }else {
            newTask.classList.remove('completed')
        }
        saveTasks();
    });

    return newTask;
}

function loadTasks(){
        const savedTasks  = localStorage.getItem('tasks');
        
        if(savedTasks){
            const tasks = JSON.parse(savedTasks);
            console.log("Array de tarefas lido do localStorage:", tasks);
            tasks.forEach(task =>{
                console.log("Criando elemento para a tarefa:", task.text, "Completa:", task.completed);
                const savedTask = createTaskElement(task.text, task.completed);
                taskList.appendChild(savedTask);
            });
        }
        console.log("Tarefas carregadas do localStorage");
}


addTaskButton.addEventListener('click', function(){
    const taskText = taskInput.value.trim();

    if(taskText !== ""){
        
        const newTaskElement = createTaskElement(taskText, false);

        taskList.appendChild(newTaskElement);
        taskInput.value = "";
        saveTasks();   

    }else {
        alert("Por favor, digite uma tarefa.");
    }
});

window.addEventListener('DOMContentLoaded', loadTasks);