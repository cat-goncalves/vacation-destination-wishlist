export async function createCard(destination, location, url, description) {
  if (url === "") {
     url = await getPhoto(destination)
  }

    //create card container + append
    let card = document.createElement("div")
    card.classList.add("card")
    cardContainer.appendChild(card)
  
    //create img
    let img = document.createElement("img")
    img.classList.add("card-img-top")
    img.alt = `photo of ${destination}`
    img.src = url
    card.appendChild(img)
  
    // create card-body div + append to card
    let cardBody = document.createElement("div")
    cardBody.classList.add("card-body")
    card.appendChild(cardBody)
  
    // create card-title
    let cardTitle = document.createElement("h5")
    cardTitle.classList.add("card-title")
    cardTitle.innerHTML = destination
    cardBody.appendChild(cardTitle)
  
    // create location
    let cardSubtitle = document.createElement("h6")
    cardSubtitle.setAttribute("class","card-subtitle mb-2 text-muted")
    cardSubtitle.innerHTML = location
    cardBody.appendChild(cardSubtitle)

    // create timestamp
    let timestamp = document.createElement("small")
    timestamp.setAttribute("class","card-subtitle mb-2 text-muted")
    timestamp.innerHTML = `created on: ${moment().format('MMMM Do YYYY, h:mm:ss a')}`
    cardBody.appendChild(timestamp)
    

    // create p tag
    let cardText = document.createElement("p")
    cardText.classList.add("card-text")
    cardText.innerHTML = description
    cardBody.appendChild(cardText)
  
    // create button container
    let buttonContainer = document.createElement("div")
    buttonContainer.classList.add("buttonContainer")
    cardBody.appendChild(buttonContainer)
  
    // create edit button
    let editButton = document.createElement("button")
    editButton.setAttribute("class", "btn btn-warning")
    editButton.innerHTML = "Edit"
    editButton.addEventListener("click", editCard)
    buttonContainer.appendChild(editButton)
  
    // create delete button
    let deleteButton = document.createElement("button")
    deleteButton.setAttribute("class", "btn btn-danger")
    deleteButton.innerHTML = "Remove"
    deleteButton.addEventListener("click", deleteCard)
    buttonContainer.appendChild(deleteButton)   
}

async function editCard(event) {
  
  let card = event.target.parentElement.parentElement.parentElement
  let cardImg = card.childNodes[0]
  let cardBody = event.target.parentElement.parentElement
  let cardTitle = cardBody.childNodes[0]
  let cardSubtitle = cardBody.childNodes[1]
  let timestamp = cardBody.childNodes[2]
  let cardText = cardBody.childNodes[3]

  console.log(cardBody.childNodes)

  let newDestination = window.prompt("Enter new destination")
  cardTitle.innerHTML = newDestination

  let newLocation = window.prompt("Enter new location")
  cardSubtitle.innerHTML = newLocation
  
  cardImg.src = await getPhoto(newDestination)

  let newDescription = window.prompt("Enter new description")
  cardText.innerHTML = newDescription

  timestamp.innerHTML = `edited on: ${moment().format('MMMM Do YYYY, h:mm:ss a')}`
}

function deleteCard(event) {
  let card = event.target.parentElement.parentElement.parentElement
  card.remove()
}

async function getPhoto(destination) {
  const api_key = null
  let api_url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${destination}&fit=crop&w=210&h=140&client_id=${api_key}`
  let result

  await fetch(api_url)
    .then(res => res.json())
    .then(data => {
      result = data.urls.small
  })
  .catch(err => {
    document.querySelector('h2').innerText = "We're having trouble finding that word. Try again"
    console.log(`error${err}`)
  })
  return result
}