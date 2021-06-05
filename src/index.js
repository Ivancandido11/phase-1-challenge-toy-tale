let addToy = false

const handleAddNewToy = () => {
  const addBtn = document.querySelector("#new-toy-btn")
  const toyFormContainer = document.querySelector(".container")
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyFormContainer.style.display = "block"
    } else {
      toyFormContainer.style.display = "none"
    }
  })
}

const createToyCard = (name, url, id, likes) => {
  const toyCard = document.createElement("div")
  const toyName = document.createElement("h2")
  const toyImg = document.createElement("img")
  const toyLikes = document.createElement("p")
  const toyLikeBtn = document.createElement("button")
  const andysToyCollection = document.querySelector("#toy-collection")
  toyCard.classList = "card"
  toyName.innerText = name
  toyImg.src = url
  toyImg.classList = "toy-avatar"
  toyLikes.innerHTML = `${likes} Likes`
  toyLikeBtn.classList = "like-btn"
  toyLikeBtn.innerText = "like"
  toyLikeBtn.id = id
  toyCard.append(toyName, toyImg, toyLikes, toyLikeBtn)
  andysToyCollection.append(toyCard)
  toyLikeBtn.addEventListener("click", () => {
    fetch(`http://localhost:3000/toys/${id}`)
      .then(resp => resp.json())
      .then(obj => {
        obj.likes = obj.likes + 1
        const toyData = {
          likes: obj.likes
        }
        const configObject = {
          method: "PATCH",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify(toyData)
        }
        fetch(`http://localhost:3000/toys/${id}`, configObject)
          .then(response => response.json())
          .then(obj => {
            toyLikes.innerHTML = `${obj.likes} Likes`
          })
      })
  })
}

const addNewToy = () => {
  const input = document.querySelectorAll(".input-text")
  const toyData = {
    name: input[0].value,
    image: input[1].value,
    likes: 0
  }
  const configObject = {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(toyData)
  }
  fetch("http://localhost:3000/toys", configObject)
    .then(resp => resp.json())
    .then(obj => {
      obj.name = input[0].value
      obj.image = input[1].value
      const id = obj.id
      obj.likes = 0
      createToyCard(obj.name, obj.image, id, obj.likes)
    })
}
const createToyBtn = document.querySelector(".submit")
createToyBtn.addEventListener("click", (event) => {
  event.preventDefault()
  addNewToy()
})

const getAllToysToTheDom = () => {
  fetch("http://localhost:3000/toys/")
    .then(resp => resp.json())
    .then(obj => {
      obj.forEach(element => {
        createToyCard(element.name, element.image, element.id, element.likes)
      })
    })
}

const init = () => {
  getAllToysToTheDom()
  handleAddNewToy()
}

document.addEventListener("DOMContentLoaded", init)

// When the page loads I want to add all of the current toys to the page.
