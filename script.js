const taskInput = document.getElementById("taskInput");
const addInput = document.getElementById("add-button");
const taskLists = document.getElementById("taskList");
const completedCount = document.getElementById("completedCount");
const errorMessage = document.getElementById("message");
const taskCountButton = document.getElementById("taskCount");
const clearAllBtn = document.getElementById("clear-all");

addInput.addEventListener("click",function() {
    if(taskInput.value.trim() === "") {
        errorMessage.textContent = "Input required";
        return;
    }      
     const task = document.createElement("li");
     const newTask = taskInput.value.trim();
    for(let i=0; i<taskLists.children.length; i++) {
        const existingTask = taskLists.children[i].querySelector("span").textContent;
        if(existingTask === newTask) {
            errorMessage.textContent = "Task Already Existed"
            return
        }
    }
      const taskText = document.createElement("span");
     taskText.textContent = newTask;
     task.appendChild(taskText) 
      taskLists.appendChild(task)
      taskCountButton.textContent = "Task:" + taskLists.children.length
      taskInput.value = "";

      tasks.push(newTask)
      localStorage.setItem("tasks",JSON.stringify(tasks))
     
    const deleteButton = document.createElement("button");
       deleteButton.textContent = "Delete"
       task.appendChild(deleteButton)
       

    deleteButton.addEventListener("click",function() {
         const deletedTask = taskText.textContent;
           const taskIndex = tasks.indexOf(deletedTask)
             tasks.splice(taskIndex,1)
             localStorage.setItem("tasks",JSON.stringify(tasks));
        task.remove()
        taskCountButton.textContent = "Task:" + taskLists.children.length
        completedCount.textContent = "Completed Task:" + taskLists.querySelectorAll(".completed").length
    })   

    const completeButton = document.createElement("button");
      completeButton.textContent = "complete";
      task.appendChild(completeButton)

      completeButton.addEventListener("click", function() {
        task.classList.toggle("completed")
        completedCount.textContent = "Completed Task:" + taskLists.querySelectorAll(".completed").length

        if(task.classList.contains("completed")) {
            completeButton.textContent = "completed"
        }
        else {
            completeButton.textContent = "complete"
        }          
      })

      const editbutton = document.createElement("button");
        editbutton.textContent = "Edit"
         task.appendChild(editbutton)

        editbutton.addEventListener("click",function() {
               if(task.querySelector(".edit-input")) {
              return;
          }

            const editInput = document.createElement("input")
            editInput.classList.add("edit-input");
            editbutton.textContent = "Save"
            task.appendChild(editInput);

            const editError = document.createElement("p")
            editInput.after(editError);
           editInput.value = taskText.textContent;
            
           const cancelBtn = document.createElement("button");
                cancelBtn.textContent = "Cancel"
                 task.appendChild(cancelBtn)
         
              cancelBtn.addEventListener("click",function() {
                editInput.remove();
                cancelBtn.remove();
                editError.remove();
                cancelBtn.remove();
                editbutton.textContent = "Edit"

              })   

                 editInput.addEventListener("input",function() {
                editError.textContent = "";
              })

           editInput.addEventListener("change",function() {
              if(editInput.value.trim() ==="") {
                editError.textContent = "Input Required";
                return
              }
               const editedTask = editInput.value.trim();     
              for(let i=0; i<taskLists.children.length; i++) {
                if(taskLists.children[i] === task) {
                    continue;   
                }
                 const existedEditedTask = taskLists.children[i].querySelector("span").textContent;
              if(existedEditedTask === editedTask) {
                editError.textContent = "Already Task Existed";
                 return;
              }
              }
              const oldTask = taskText.textContent;
              const taskIndex = tasks.indexOf(oldTask)
                tasks[taskIndex] = editedTask
                localStorage.setItem("tasks",JSON.stringify(tasks))
                
               taskText.textContent = editedTask;
               editInput.remove()
               editError.remove();
               editbutton.textContent = "Edit";
           })

        })
})
taskInput.addEventListener("input", function() {
   errorMessage.textContent = "";
});
   clearAllBtn.addEventListener("click",function() {
               taskLists.innerHTML = "";
                localStorage.removeItem("tasks")
                taskCountButton.textContent = "Task:" + taskLists.children.length
                completedCount.textContent = "Completed Task:" + taskLists.querySelectorAll(".completed").length
              })


const savedTasks = localStorage.getItem("tasks");
const tasks = savedTasks ? JSON.parse(savedTasks) : [];
if(savedTasks) {
     tasks.forEach((value) => {
       const taskElement = document.createElement("li")
       const taskText = document.createElement("span")
             taskText.textContent = value;
              taskElement.appendChild(taskText)
            taskLists.appendChild(taskElement)
     })
}




