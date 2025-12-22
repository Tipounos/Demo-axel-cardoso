const dynamicText  = document.querySelector("h1 span")
const words = ["espresso","ristretto","lungo","latte","cappuccino","macchiato","frappé","moka"];
let wordIndex = 0;
let characterIndex = 1;
let isDeleting = false;

const typeEffect = () => {
    const currentWord = words[wordIndex]
    const currentCharacter = currentWord.substring(0, characterIndex);
    dynamicText.textContent = currentCharacter
    dynamicText.classList.add("stop-blinking")

    if (!isDeleting && characterIndex < currentWord.length) {
        characterIndex ++
        setTimeout(typeEffect, 200)
    } else if (isDeleting && characterIndex > 0) {
        characterIndex --
        setTimeout(typeEffect, 100)
    } else {
        isDeleting = !isDeleting;
        dynamicText.classList.remove("stop-blinking")
        wordIndex = !isDeleting ? (wordIndex + 1) % words.length : wordIndex
        setTimeout(typeEffect, 1200)
    }
}

typeEffect()

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry)=>{
        if (entry.isIntersecting) {
            entry.target.classList.add("show")
        } else  {
            entry.target.classList.remove("show")
        }
    })
}, {})

const elements = document.querySelectorAll("img")
elements.forEach(el => observer.observe(el))