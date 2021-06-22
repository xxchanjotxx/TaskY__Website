console.log("hi");
const taskContainer=document.querySelector(".task__container");

const newCard=( {id, imageUrl, taskTitle, taskType, taskDescription } )=>{ 
   return ` <div class="col-md-6 col-lg-4" id=${id} >
<div class="card">
  <div class="card-header d-flex justify-content-end gap-3">
    <button type="button" class="btn btn-outline-success m">
      <i class="fas fa-pencil-alt"></i>
    </button>
    <button type="button" class="btn btn-outline-danger">
      <i class="fas fa-trash"></i>
    </button>
  </div>
  <div class="card-body">
    <img src=${imageUrl}
    <h5 class="card-title">${taskTitle}/h5>
    <p class="card-text">
     ${taskDescription}
    </p>
    <span class="badge bg-primary">${taskType}</span></h5>

  </div>
  <div class="card-footer text-muted">
    <button type="button" class="btn btn-outline-primary float-end">
      Open Task
    </button>
  </div>
</div>
</div>`
};

const saveChange =() =>{
    const taskdata= {
        id: `${Date.now()}`,
        imageUrl: document.getElementById("imageurl").value,
        taskTitle:document.getElementById("tasktitle").value,
        taskType:document.getElementById("tasktype").value,
        taskDescription:document.getElementById("taskdescription").value,
    };

    const createNewCard= newCard(taskdata);
    console.log(createNewCard);
    taskContainer.insertAdjacentHTML("beforeend", createNewCard );
};


