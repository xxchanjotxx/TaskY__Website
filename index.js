// Task Container parent of all cards. We access it first by using query selector and its class name. It stores all the cards.
const taskContainer = document.querySelector(".task__container");

// Created an arrow function to store the values entered in an object (taskData) when the "Save changes button is clicked"
// To access this function, inserted onclick="saveChange()" in the save changes button
const saveChange = () => {
  const taskData = {
    id: `${Date.now()}`, //generates a unique number for each card
    imageUrl: document.getElementById("imageurl").value, //storing the value of image url entered by the user through the ID name
    taskTitle: document.getElementById("tasktitle").value,
    taskType: document.getElementById("tasktype").value,
    taskDescription: document.getElementById("taskdescription").value,
  };

  // Created a constant to store the data of a new card by passing the object of taskData as arguements in the function newCard()
  const createNewCard = newCard(taskData);
  //uses the parent object, taskContainer to store the new card adjacent to each other by using the values returned by newCard, stored in createNewCard
  taskContainer.insertAdjacentHTML("beforeend", createNewCard);

  
  //inserting the data in array of objects which is entered by user. Each object of data for every card is stored at diff indexes
  globalStore.push(taskData);
  //to locally store the data using key and value. REFER TO ONENOTE.
  localStorage.setItem("tasky", JSON.stringify({ cards: globalStore }));
};


// The parameters are from the taskData which is used to store what user inputs
// Here the functionv returns an HTML code for card creation with the parameters used instead of straight values. Template literal is used
const newCard = ({ id, imageUrl, taskTitle, taskType, taskDescription }) => {
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
</div>`;
};

// TO STORE DATA GLOBALLY IN BROWSER SO THAT IT CAN BE ACCESSED AFTER REFRESHING
let globalStore = [];
