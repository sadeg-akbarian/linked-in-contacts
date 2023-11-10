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
console.log(initialNumberOfPendings);
if (initialNumberOfPendings !== null) {
  pending = initialNumberOfPendings;
}

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

function displayNewPerson(lastAddedPerson) {
  console.log(lastAddedPerson);
  console.log(lastAddedPerson[0]);
  console.log(typeof lastAddedPerson[0]);
  const newDiv = document.createElement("div");
  const dateString = Date.now().toString(36);
  console.log(dateString);
  const randomness = Math.random().toString(36).substring(2);
  console.log(randomness);
  console.log(dateString + randomness);
  newDiv.id = dateString + randomness;
  newDiv.classList.add("divPerson");
  const newImage = document.createElement("img");
  newImage.setAttribute("src", lastAddedPerson[0].picture);
  newDiv.appendChild(newImage);
  const newName = document.createElement("p");
  newName.innerText = `${lastAddedPerson[0].name.title}. ${lastAddedPerson[0].name.first} ${lastAddedPerson[0].name.last}`;
  newDiv.appendChild(newName);
  const newTitle = document.createElement("p");
  newTitle.innerText = lastAddedPerson[0].title;
  newDiv.appendChild(newTitle);
  const connections = document.createElement("p");
  connections.innerText = `${lastAddedPerson[0].mutualConnections} mutual Connections`;
  newDiv.appendChild(connections);
  const newConnectButton = document.createElement("button");
  newConnectButton.innerText = "Connect";
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
      console.log(pendingDisplayed);
      displayNumberOfPendings.innerText =
        pendingDisplayed + " pendings invitations";
      personsContainer.innerHTML = "";
    }
    displayNewPerson(contactArray[i]);
  }
  console.log(contactArray);
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
      contactArray.push(newPerson);
      console.log(contactArray);
      personNumber++;
      console.log(personNumber);
      renderContacts();
    });
}

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

for (let i = 0; i < 8; i++) {
  fetchNewPerson();
}

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

personsContainer.addEventListener("click", function (event) {
  console.log(event.target);
  console.log(event.target.classList[0]);
  if (event.target.classList[0] === "closeButton") {
    console.log("yeeeeeeeeessssssssssssssss");
    const parentDiv = event.target.parentElement;
    console.log(parentDiv);
    const fullName = parentDiv.querySelector("p").innerText;
    console.log(fullName);
    const fullNameSplitted = fullName.split(" ");
    console.log(fullNameSplitted);
    const firstName = fullNameSplitted[1];
    console.log(firstName);
    const lastName = fullNameSplitted[2];
    console.log(lastName);
    console.log(contactArray);
    let indexOfPersonToDelete;
    for (let person of contactArray) {
      if (
        person[0].name.first === firstName &&
        person[0].name.last === lastName
      ) {
        console.log(contactArray.indexOf(person));
        indexOfPersonToDelete = contactArray.indexOf(person);
      }
    }
    console.log(indexOfPersonToDelete);
    contactArray.splice(indexOfPersonToDelete, 1);
    console.log(contactArray);
    personNumber--;
    fetchNewPerson();
  } else if (event.target.classList[0] === "connectButton") {
    console.log("Genaaaaaauuuuuuu");
    console.log(event.target.innerText);
    console.log(event.target.parentElement.id);
    console.log(typeof event.target.parentElement.id);
    if (event.target.innerText === "Connect") {
      pending++;
    } else {
      pending--;
    }
    localStorage.setItem("NumberOfPendings", JSON.stringify(pending));
    checkedPersonID = event.target.parentElement.id;
    renderPendingState();
  }
});

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

function renderPendingState() {
  console.log(pending);
  console.log(checkedPersonID);
  if (pending === 0) {
    pendingDisplayed = "No";
    console.log("ääääääääääääääääääääääääääääää");
  } else {
    pendingDisplayed = pending;
    console.log("ääääääääääääääääääääääääääääää");
  }
  displayNumberOfPendings.innerText =
    pendingDisplayed + " pendings invitations";
  const checkedPerson = document.querySelector("#" + checkedPersonID);
  console.log(checkedPerson);
  const clickedConnectButton = checkedPerson.querySelector(".connectButton");
  console.log(clickedConnectButton);
  console.log(clickedConnectButton.innerText);
  if (clickedConnectButton.innerText === "Connect") {
    clickedConnectButton.innerText = "Pending";
  } else {
    clickedConnectButton.innerText = "Connect";
  }
}
