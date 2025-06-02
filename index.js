let droplet = document.getElementById("droplet")
let main = document.getElementById("main-title")

handleRain()

let chevron = document.getElementById("chevron-title")
window.addEventListener('scroll', handleChevronOpacity);

titles = [
   "Gimbaro <i class=\"fa-solid fa-code\"></i>",
   "Gamberi Elia <i class=\"fa-solid fa-shrimp\"></i>",
   "Gimbo <i class=\"fa-solid fa-dragon\"></i>"
]

new Typed("#typed-title", {
   strings: titles,
   loop: true,
   typeSpeed: 50,
   backSpeed: 25,
   startDelay: 500,
   backDelay: 2000,
   showCursor: true,
   cursorChar: "|",
});

const darkModeToggle = document.getElementById('dark-mode-toggle');
const darkModeIcon = document.getElementById('dark-mode-icon');

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
        darkModeIcon.classList.remove('fa-sun');
        darkModeIcon.classList.add('fa-moon');
    } else {
        darkModeIcon.classList.remove('fa-moon');
        darkModeIcon.classList.add('fa-sun');
    }
});

darkModeIcon.classList.add('fa-sun');

document.addEventListener("scroll", () => {
    const chevron = document.getElementById("chevron-title");
    const darkModeToggle = document.getElementById("dark-mode-toggle");

    if (chevron && darkModeToggle) {
        const chevronRect = chevron.getBoundingClientRect();
        const toggleRect = darkModeToggle.getBoundingClientRect();

        if (toggleRect.top > chevronRect.bottom) {
            darkModeToggle.classList.add("hidden");
        } else {
            darkModeToggle.classList.remove("hidden");
        }
    }
});

function handleRain() {
   setTimeout(async function () {
      createNewDroplet()
   }, 1000)
}

function createNewDroplet() {
   let new_drop = droplet.cloneNode(true)
   new_drop.style.top = `${getRandomInt(0, 100)}vh`;
   new_drop.style.left = `${getRandomInt(0, 80)}vw`;
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

async function getSpaggiomatic() {
    const url = "https://spaggomatic.gimbaro.dev/";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        return "On this day, in "+json["year"]+", "+json["fact"];
    } catch (error) {
        console.error(error.message);
    }
    return "Error retrieving data, reload to retry :)";
}

document.addEventListener("DOMContentLoaded", () => {
    const lazyImages = document.querySelectorAll("img[loading='lazy']");

    const onIntersection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.onload = () => img.classList.add("loaded");
                observer.unobserve(img);
            }
        });
    };

    const observer = new IntersectionObserver(onIntersection, {
        rootMargin: "50px",
        threshold: 0.1
    });

    lazyImages.forEach(img => {
        observer.observe(img);
    });
    getSpaggiomatic().then( (result) => {
        document.getElementById("spaggomatic-demo").innerText = result;
    })
});

