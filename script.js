const personsContainer = document.querySelector("#personsContainer");

const contactArray = [];
let personNumber = -1;
let pending = 0;

function addnewPerson() {}

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
      if (personNumber === 7) {
        for (let i = 0; i < contactArray.length; i++) {
          if (i === 0) {
            personsContainer.innerHTML = "";
            personsContainer.classList.add("personsContainerAfterLoading");
          }
          console.log(contactArray[i]);
          console.log(contactArray[i][0]);
          console.log(typeof contactArray[i][0]);
          const newDiv = document.createElement("div");
          const dateString = Date.now().toString(36);
          console.log(dateString);
          const randomness = Math.random().toString(36);
          console.log(randomness);
          console.log(dateString + randomness);
          newDiv.id = dateString + randomness;
          newDiv.classList.add("divPerson");
          const newImage = document.createElement("img");
          newImage.setAttribute("src", contactArray[i][0].picture);
          newDiv.appendChild(newImage);
          const newName = document.createElement("p");
          newName.innerText = `${contactArray[i][0].name.title}. ${contactArray[i][0].name.first} ${contactArray[i][0].name.last}`;
          newDiv.appendChild(newName);
          const newTitle = document.createElement("p");
          newTitle.innerText = contactArray[i][0].title;
          newDiv.appendChild(newTitle);
          const connections = document.createElement("p");
          connections.innerText = `${contactArray[i][0].mutualConnections} mutual Connections`;
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
      }
    });
}

for (let i = 0; i < 8; i++) {
  fetchNewPerson();
}

personsContainer.addEventListener("click", function (event) {
  console.log(event.target);
  console.log(event.target.parentElement);
  personsContainer.removeChild(event.target.parentElement);
});
