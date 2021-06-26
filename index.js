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

  updateLocalStorage();
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
   <button type="button" class="btn btn-outline-primary float-end">
     Open Task
   </button>
 </div>
</div>
</div>`;
};

// TO STORE DATA GLOBALLY IN BROWSER SO THAT IT CAN BE ACCESSED AFTER REFRESHING. THE ARRAY STORES OBJECTS CONTAINING DATA OF EACH INDIVIDUAL CARD
let globalStore = [];

 
const loadInitialCard=()=>
{
  //To access local storage data using only key 
  const getInitialData= localStorage.getItem("tasky");
  if(!getInitialData) return;  // checks if getInitialData has no value and stops executing. This could be done when theres a system change

  //To de-stringify data. {cards} stores the destringyfied data by using JSON.parse and stores the data of each card
  const {cards}= JSON.parse(getInitialData);

  cards.map((card)=>{
    const createNewCard= newCard(card);
    taskContainer.insertAdjacentHTML("beforeend", createNewCard);
    globalStore.push(card);
  });
}

const updateLocalStorage = () =>
  localStorage.setItem("tasky", JSON.stringify({ cards: globalStore }));


const deleteCard = (event) => {
  // id
  event = window.event;
  const targetID = event.target.id;
  const tagname = event.target.tagName; // BUTTON

  // search the globalStore, remove the object which matches with the id
  globalStore = globalStore.filter((card) => card.id !== targetID);

  updateLocalStorage();

  // access DOM to remove them

  if (tagname === "BUTTON") {
    // task__container
    return taskContainer.removeChild(
      event.target.parentNode.parentNode.parentNode // col-lg-4
    );
  }

  // task__container
  return taskContainer.removeChild(
    event.target.parentNode.parentNode.parentNode.parentNode // col-lg-4
  );
};

/*

//get id of the card and remove the object with the id  
const deleteCard=(event)=>
{
  //make an id for trash button to access it
  //to get the id


  // gets the event from the browser
  event=window.event;

  //gets the id from the target event, so make the id of card and button as same to delete it
  const targetID=event.target.id;

  // accessing the button  
  const tagname= event.target.tagName;
  console.log(tagname);

  //making a new array by filtering out elements that DONT have to be deleted in a new array.
  const updatedArray= globalStore.filter(
    //acceses the element card by its ID and store which doesnt have to be deleted 
    (card)=> card.id!== targetID
    );

  //access DOM to remove
    globalStore= updatedArray;
    localStorage.setItem("tasky",JSON.stringify({cards: globalStore}));

    if (tagname==="BUTTON"){
      //return event.target.parentNode.parentNode.parentNode.parentNode.removeChild
      return taskContainer.removeChild(

        event.target.parentNode.parentNode.parentNode 
        
      );
    }

    
    return taskContainer.removeChild(
      event.target.parentNode.parentNode.parentNode.parentNode  
    );

    
};
*/