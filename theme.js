const savedTheme = localStorage.getItem("theme") || "light"
const themeToggle = document.querySelector("#theme")
const githubIcon = document.getElementById("github-icon")
const githubIconWhite = document.getElementById("github-icon-white")
let checked = localStorage.getItem("toggleCheckbox")

if (checked === "true") {
  document.body.classList.remove("theme-light", "theme-dark")
  document.body.classList.add("theme-dark")
  githubIcon.classList.remove("hide")
  githubIconWhite.classList.add("hide")

  themeToggle.checked = true
} else {
  githubIcon.classList.add("hide")
  githubIconWhite.classList.remove("hide")
}

themeToggle.addEventListener("change", (e) => {
  localStorage.clear()
  if (themeToggle.checked) {
    document.body.classList.remove("theme-light", "theme-dark")
    document.body.classList.add("theme-dark")
    githubIcon.classList.remove("hide")
    githubIconWhite.classList.add("hide")
    localStorage.setItem("toggleCheckbox", "true")
  } else {
    document.body.classList.remove("theme-light", "theme-dark")
    document.body.classList.add("theme-light")
    githubIcon.classList.add("hide")
    githubIconWhite.classList.remove("hide")
  }
})
