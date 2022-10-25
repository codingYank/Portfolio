const savedTheme = localStorage.getItem("theme") || "light"
const themeToggle = document.querySelector("#theme")
let checked = localStorage.getItem("toggleCheckbox")

if (checked === "true") {
  document.body.classList.remove("theme-light", "theme-dark")
  document.body.classList.add("theme-dark")
  themeToggle.checked = true
}

themeToggle.addEventListener("change", (e) => {
  localStorage.clear()
  if (themeToggle.checked) {
    document.body.classList.remove("theme-light", "theme-dark")
    document.body.classList.add("theme-dark")
    localStorage.setItem("toggleCheckbox", "true")
  } else {
    document.body.classList.remove("theme-light", "theme-dark")
    document.body.classList.add("theme-light")
  }
})
