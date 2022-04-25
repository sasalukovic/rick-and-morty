let currentPage = 1;
const url = `https://rickandmortyapi.com/api/character/?page=`;
const main = document.querySelector("main");
const section = document.querySelector("section");
const request = new XMLHttpRequest();

function createCharacters(characters) {
  console.log(characters);
  main.innerHTML = "";
  characters.results.forEach((e) => {
    let card = document.createElement("div");
    let image = document.createElement("img");
    let name = document.createElement("h1");
    let btn = document.createElement("button");

    btn.innerHTML = "Like";
    image.setAttribute("src", e.image);
    name.innerHTML = e.name;
    btn.addEventListener("click", () => {
      window.location.href = "./index2.html";
      localStorage.setItem("id", e.id);
    });

    card.append(image, name, btn);
    main.appendChild(card);
  });
}

let btn1 = document.createElement("button");
let btn2 = document.createElement("button");
let btn3 = document.createElement("button");
let btn4 = document.createElement("button");
let btn5 = document.createElement("button");
let btn6 = document.createElement("button");
let btn7 = document.createElement("button");
let btn8 = document.createElement("button");
section.append(btn1, btn2, btn3, btn4, btn5, btn6, btn7);

btn1.innerHTML = "<";
btn2.classList.add("btn-page")
btn3.classList.add("btn-page")
btn4.classList.add("btn-page")
btn5.classList.add("btn-page")
btn6.classList.add("btn-page")
btn7.innerHTML = ">";

let btnPages = []
btnPages.push(btn2, btn3, btn4, btn5, btn6)

btnPages.forEach((e)=> {
  e.addEventListener("click", () => {
    currentPage = e.innerHTML
    fetchData()
  })
})

function pagination(){
    if (currentPage == 1 || currentPage == 2) {
        for (var i = 0; i < 5; i++) {
            btnPages[i].innerText = i + 1;
        }
    }
    if (currentPage > 2 && currentPage < 41) {
        btnPages[0].innerText = (currentPage - 2).toString();
        btnPages[1].innerText = currentPage - 1;
        btnPages[2].innerText = currentPage;
        btnPages[3].innerText = currentPage + 1;
        btnPages[4].innerText = currentPage + 2;
    }
    if (currentPage == 41 || currentPage == 42) {
        for (var i = 0; i < 5; i++) {
            btnPages[i].innerText = 38 + i;
        }
    }
    console.log(currentPage);
}

btn1.addEventListener("click", () => {
    currentPage--;
    fetchData(); 
    if(currentPage<1){
        return currentPage = 1
    }
    pagination();
  }
)

btn7.addEventListener("click", () => {
  currentPage++;
  fetchData();
  if(currentPage>42){
      return currentPage = 42
  }
  pagination();
 }
)

function fetchData() {
  request.open("GET", url + currentPage);
  request.send();
  request.onload = () => {
    createCharacters(JSON.parse(request.responseText));
  };
}
window.addEventListener("load", fetchData);
window.addEventListener("load", pagination)