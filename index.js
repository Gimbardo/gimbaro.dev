
let droplet = document.getElementById("droplet")
let main = document.getElementById("main-title")

handleRain()

let chevron = document.getElementById("chevron-title")
window.addEventListener('scroll', handleChevronOpacity);

function handleRain() {
   setTimeout(async function () {
      createNewDroplet()
   }, 1000)
}

function createNewDroplet() {
   let new_drop = droplet.cloneNode(true)
   new_drop.style.top = `${getRandomInt(0, 90)}vh`;
   new_drop.style.left = `${getRandomInt(0, 90)}vw`;
   new_drop.style.display = "unset"
   main.appendChild(new_drop)
   handleRain();
   setTimeout(function () {
      new_drop.remove()
   }, 4000)
}

function handleChevronOpacity() {
   chevron.style.opacity = 1 - (window.scrollY / window.innerHeight);
}


function getRandomInt(min, max) {
   min = Math.ceil(min);
   max = Math.floor(max);
   return Math.floor(Math.random() * (max - min) + min);
}

