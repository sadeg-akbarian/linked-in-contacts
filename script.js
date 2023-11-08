const contactArray = [];
let personNumber = -1;

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
        console.log(contactArray[7]);
        console.log(contactArray[7][0]);
        console.log(typeof contactArray[7][0]);
        const paragraph = document.querySelector("#blabla");
        paragraph.innerText = JSON.stringify(contactArray[7][0], null, 2);
        const newDiv = document.createElement("div");
        newDiv.classList.add("divPerson");
        const newImage = document.createElement("img");
        newImage.setAttribute("src", contactArray[7][0].picture);
        newDiv.appendChild(newImage);
        const newName = document.createElement("p");
        newName.innerText = `${contactArray[7][0].name.title}. ${contactArray[7][0].name.first} ${contactArray[7][0].name.last}`;
        newDiv.appendChild(newName);
        const newTitle = document.createElement("p");
        newTitle.innerText = contactArray[7][0].title;
        newDiv.appendChild(newTitle);
        const connections = document.createElement("p");
        connections.innerText = `${contactArray[7][0].mutualConnections} mutual Connections`;
        newDiv.appendChild(connections);
        const newConnectButton = document.createElement("button");
        newConnectButton.innerText = "Connect";
        newConnectButton.classList.add("connectButton");
        newDiv.appendChild(newConnectButton);
        const newCloseButton = document.createElement("button");
        newCloseButton.innerText = "x";
        newCloseButton.classList.add("closeButton");
        newDiv.appendChild(newCloseButton);
        document.body.appendChild(newDiv);
      }
    });
}

for (let i = 0; i < 8; i++) {
  fetchNewPerson();
}
