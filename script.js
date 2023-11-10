const personsContainer = document.querySelector("#personsContainer");
const displayNumberOfPendings = document.querySelector("#numberOfPendings");

const contactArray = [];
let personNumber = -1;
let pending = 0;
let pendingDisplayed;
let checkedPersonID = "";

const initialNumberOfPendings = JSON.parse(
  localStorage.getItem("NumberOfPendings")
);
if (initialNumberOfPendings !== null) {
  pending = initialNumberOfPendings;
}

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

function displayNewPerson(currentIterationInContactArray) {
  const newDiv = document.createElement("div");
  newDiv.id = currentIterationInContactArray[0].id;
  newDiv.classList.add("divPerson");
  const newImage = document.createElement("img");
  newImage.setAttribute("src", currentIterationInContactArray[0].picture);
  newDiv.appendChild(newImage);
  const newName = document.createElement("p");
  newName.innerText = `${currentIterationInContactArray[0].name.title}. ${currentIterationInContactArray[0].name.first} ${currentIterationInContactArray[0].name.last}`;
  newDiv.appendChild(newName);
  const newTitle = document.createElement("p");
  newTitle.innerText = currentIterationInContactArray[0].title;
  newDiv.appendChild(newTitle);
  const connections = document.createElement("p");
  connections.innerText = `${currentIterationInContactArray[0].mutualConnections} mutual Connections`;
  newDiv.appendChild(connections);
  const newConnectButton = document.createElement("button");
  newConnectButton.innerText = currentIterationInContactArray[0].buttonState;
  newConnectButton.classList.add("connectButton");
  newDiv.appendChild(newConnectButton);
  const newCloseButton = document.createElement("button");
  newCloseButton.innerText = "x";
  newCloseButton.classList.add("closeButton");
  newDiv.appendChild(newCloseButton);
  personsContainer.appendChild(newDiv);
}

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

function renderContacts() {
  for (let i = 0; i < contactArray.length; i++) {
    if (i === 0) {
      if (pending === 0) {
        pendingDisplayed = "No";
      } else {
        pendingDisplayed = pending;
      }
      displayNumberOfPendings.innerText =
        pendingDisplayed + " pendings invitations";
      personsContainer.innerHTML = "";
    }
    displayNewPerson(contactArray[i]);
  }
}

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

function fetchNewPerson() {
  fetch("https://dummy-apis.netlify.app/api/contact-suggestions?count=1")
    .then((response) => {
      if (response.ok === true) {
        return response.json();
      }
    })
    .then((newPerson) => {
      const dateString = Date.now().toString(36);
      const randomness = Math.random().toString(36).substring(2);
      newPerson[0].id = dateString + randomness;
      newPerson[0].buttonState = "Connect";
      contactArray.push(newPerson);
      personNumber++;
      renderContacts();
    });
}

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

for (let i = 0; i < 8; i++) {
  fetchNewPerson();
}

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

personsContainer.addEventListener("click", function (event) {
  if (event.target.classList[0] === "closeButton") {
    const parentDiv = event.target.parentElement;
    let indexOfPersonToDelete;
    for (let person of contactArray) {
      if (parentDiv.id === person[0].id) {
        indexOfPersonToDelete = contactArray.indexOf(person);
      }
    }
    contactArray.splice(indexOfPersonToDelete, 1);
    personNumber--;
    fetchNewPerson();
  } else if (event.target.classList[0] === "connectButton") {
    if (event.target.innerText === "Connect") {
      pending++;
    } else {
      pending--;
    }
    localStorage.setItem("NumberOfPendings", JSON.stringify(pending));
    checkedPersonID = event.target.parentElement.id;
    let indexOfPersonClicked;
    for (let person of contactArray) {
      if (person[0].id === checkedPersonID) {
        if (person[0].buttonState === "Connect") {
          person[0].buttonState = "Pending";
        } else {
          person[0].buttonState = "Connect";
        }
        indexOfPersonClicked = contactArray.indexOf(person);
      }
    }
    renderPendingState(indexOfPersonClicked);
  }
});

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

function renderPendingState(indexOfPersonInContactArray) {
  if (pending === 0) {
    pendingDisplayed = "No";
  } else {
    pendingDisplayed = pending;
  }
  displayNumberOfPendings.innerText =
    pendingDisplayed + " pendings invitations";
  const checkedPerson = document.querySelector("#" + checkedPersonID);
  const clickedConnectButton = checkedPerson.querySelector(".connectButton");
  clickedConnectButton.innerText =
    contactArray[indexOfPersonInContactArray][0].buttonState;
}
