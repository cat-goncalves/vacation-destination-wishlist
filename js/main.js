import { createCard } from "./card.js"

const cardContainer = document.querySelector("#cardContainer")

document.querySelector("#submitForm").addEventListener("click", handleFormSubmission)
document.querySelector(".edit")

function handleFormSubmission(event) {
  event.preventDefault()

  let destination = document.querySelector("#name").value 
  let location = document.querySelector("#location").value
  let imgURL = document.querySelector("#photo").value
  let description = document.querySelector("#description").value

  createCard(destination, location, imgURL, description)
  document.querySelector("form").reset()
  changeHeading()
}

function changeHeading() {
  if(cardContainer.hasChildNodes()){
    document.querySelector("#cardHeading").innerText = "My Wishlist"
  }
}



