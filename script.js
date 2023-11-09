const personsContainer = document.querySelector("#personsContainer");

const contactArray = [];
let personNumber = -1;
let pending = 0;

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

function displayNewPerson(xxx) {
  console.log(xxx);
  console.log(xxx[0]);
  console.log(typeof xxx[0]);
  const newDiv = document.createElement("div");
  const dateString = Date.now().toString(36);
  console.log(dateString);
  const randomness = Math.random().toString(36);
  console.log(randomness);
  console.log(dateString + randomness);
  newDiv.id = dateString + randomness;
  newDiv.classList.add("divPerson");
  const newImage = document.createElement("img");
  newImage.setAttribute("src", xxx[0].picture);
  newDiv.appendChild(newImage);
  const newName = document.createElement("p");
  newName.innerText = `${xxx[0].name.title}. ${xxx[0].name.first} ${xxx[0].name.last}`;
  newDiv.appendChild(newName);
  const newTitle = document.createElement("p");
  newTitle.innerText = xxx[0].title;
  newDiv.appendChild(newTitle);
  const connections = document.createElement("p");
  connections.innerText = `${xxx[0].mutualConnections} mutual Connections`;
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
      personsContainer.innerHTML = "";
      personsContainer.classList.add("personsContainerAfterLoading");
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
  const parentDiv = event.target.parentElement;
  console.log(parentDiv);
  personsContainer.removeChild(event.target.parentElement);
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
  // const copy = structuredClone(contactArray);
  // console.log(copy);
  contactArray.splice(indexOfPersonToDelete, 1);
  console.log(contactArray);
  personNumber--;
  fetchNewPerson();
});

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
