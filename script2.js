const fetch = localStorage.getItem("id")
const url = `https://rickandmortyapi.com/api/character/${fetch}`;
const main = document.querySelector("main")
const body = document.querySelector("body")
const request = new XMLHttpRequest();

function getCharacter(data){
    console.log(data)
        
        let card = document.createElement("div");
        let image = document.createElement("img");
        let name = document.createElement("h1");
        let gender = document.createElement("p")
        let btn = document.createElement("button");
        
        btn.innerHTML = "Back";
        name.innerHTML = data.name
        gender.innerHTML = data.gender
        image.setAttribute("src", data.image);
        btn.addEventListener("click", () => {
            window.location.href = "./index.html"
          });
      
        card.append(image, name, gender, btn)
        main.appendChild(card)    
}

function fetchData(){
    request.open("GET", url)
    request.send()
    request.onload = () => {
        const data = (JSON.parse(request.responseText))
        getCharacter(data)
    }
}

window.addEventListener("load", fetchData)