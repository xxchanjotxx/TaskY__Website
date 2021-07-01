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
   <button type="button" class="btn btn-outline-success m" onclick="editCard.apply(this, arguments)">
     <i class="fas fa-pencil-alt" onclick="editCard.apply(this, arguments)"></i>
   </button>
   <button type="button" id=${id} class="btn btn-outline-danger" onclick="deleteCard.apply(this, arguments) ">
     <i class="fas fa-trash" onclick="deleteCard.apply(this, arguments)" id=${id}></i>
   </button>
 </div>
 <div class="card-body">
   <img src=${imageUrl} class="card-img-top">
   <h5 class="card-title">${taskTitle}</h5>
   <p class="card-text">
    ${taskDescription}
   </p>
   <span class="badge bg-primary">${taskType}</span></h5>

 </div>
 <div class="card-footer text-muted">
   <button type="button" class="btn btn-outline-primary float-end" id=${id} >
     Open Task
   </button>
 </div>
</div>
</div>`;
};

// TO STORE DATA GLOBALLY IN BROWSER SO THAT IT CAN BE ACCESSED AFTER REFRESHING. THE ARRAY STORES OBJECTS CONTAINING DATA OF EACH INDIVIDUAL CARD
let globalStore = [];

const loadInitialCard = () => {
  //To access local storage data using only key
  const getInitialData = localStorage.getItem("tasky");
  if (!getInitialData) return; // checks if getInitialData has no value and stops executing. This could be done when theres a system change

  //To de-stringify data. {cards} stores the destringyfied data by using JSON.parse and stores the data of each card
  const { cards } = JSON.parse(getInitialData);

  cards.map((card) => {
    const createNewCard = newCard(card);
    taskContainer.insertAdjacentHTML("beforeend", createNewCard);
    globalStore.push(card);
  });
};

//get id of the card and remove the object with the id
const deleteCard = (event) => {
  //make an id for trash button to access it
  //to get the id

  // gets the event from the browser
  event = window.event;

  //gets the id from the target event, so make the id of card and button as same to delete it
  const targetID = event.target.id;

  // accessing the button
  const tagname = event.target.tagName;
  console.log(tagname);

  //making a new array by filtering out elements that DONT have to be deleted in a new array.
  const updatedArray = globalStore.filter(
    //acceses the element card by its ID and store which doesnt have to be deleted
    (card) => card.id !== targetID
  );

  //access DOM to remove
  globalStore = updatedArray;
  localStorage.setItem("tasky", JSON.stringify({ cards: globalStore }));

  if (tagname === "BUTTON") {
    //return event.target.parentNode.parentNode.parentNode.parentNode.removeChild
    return taskContainer.removeChild(
      event.target.parentNode.parentNode.parentNode
    );
  }

  return taskContainer.removeChild(
    event.target.parentNode.parentNode.parentNode.parentNode
  );
};

const editCard = (event) => {
  //get event
  event = window.event;
  const targetID = event.target.id;
  const tagname = event.target.tagName;

  // first access the parent element to edit a specific card and not all
  let parentElement;

  //referring to the card here
  if (tagname == "BUTTON") {
    parentElement = event.target.parentNode.parentNode;
  }
  // for the icon
  else {
    parentElement = event.target.parentNode.parentNode.parentNode;
  }

  // accessing the card title for the card to be edited using the parent element
  //childNodes[5] goes into the card body and then further

  // USE CONSOLE AND CODE TO REFER
  let taskTitle = parentElement.childNodes[3].childNodes[3]; //goes from card->card-body->card-title
  let taskDescription = parentElement.childNodes[3].childNodes[5]; //goes from card->card-body->card-description
  let taskType = parentElement.childNodes[3].childNodes[7]; //goes from card->card-body->card-type

  //accesing the open task button to change it to save changes when editing
  let saveEdit = parentElement.childNodes[5].childNodes[1];
  //changing the open task text to save changes
  saveEdit.innerHTML = "Save Changes";

  //making tasktitle editable  (argument, value)
  taskTitle.setAttribute("contenteditable", "true");
  taskDescription.setAttribute("contenteditable", "true");
  taskType.setAttribute("contenteditable", "true");

  //when we click on save changes button it goes to save the data function
  saveEdit.setAttribute("onclick", "saveEditChanges.apply(this,arguments)");
};

const saveEditChanges = (event) => {
  //get event
  event = window.event;
  const targetID = event.target.id;
  const tagname = event.target.tagName;

  // first access the parent element to edit a specific card and not all
  let parentElement;

  //referring to the card here
  if (tagname == "BUTTON") {
    parentElement = event.target.parentNode.parentNode;
  }
  // for the icon
  else {
    parentElement = event.target.parentNode.parentNode.parentNode;
  }

  // accessing the card title for the card to be edited using the parent element
  //childNodes[5] goes into the card body and then further

  // USE CONSOLE AND CODE TO REFER
  let taskTitle = parentElement.childNodes[3].childNodes[3]; //goes from card->card-body->card-title
  let taskDescription = parentElement.childNodes[3].childNodes[5]; //goes from card->card-body->card-description
  let taskType = parentElement.childNodes[3].childNodes[7]; //goes from card->card-body->card-type

  //updated data stored
  const updatedData = {
    taskTitle: taskTitle.innerHTML,
    taskType: taskType.innerHTML,
    taskDescription: taskDescription.innerHTML,
  };

  //map through the global array and return the original data replaced by the updatedData
  globalStore = globalStore.map((task) => {
    if (task.id === targetID) {
      return {
        id: task.id,
        imageUrl: task.imageUrl,
        taskTitle: updatedData.taskTitle,
        taskType: updatedData.taskType,
        taskDescription: updatedData.taskDescription,
      };
    }
    return task; //important as it will make useless info ignored in map
  });

  localStorage.setItem("tasky", JSON.stringify({ cards: globalStore }));

  //not letting user edit after clicking save by making contenteditable as false
  taskTitle.setAttribute("contenteditable", "false");
  taskDescription.setAttribute("contenteditable", "false");
  taskType.setAttribute("contenteditable", "false");

  //to remove onclick button so that it doesnt keep calling functions and cause malfucntions

  saveEdit.removeAttribute("onclick");

  //making the button again as "Open task" once saved
  saveEdit.innerHTML = "Open Task";
  console.log(saveEdit.innerHTML);
};
