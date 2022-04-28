const savedTheme = localStorage.getItem("theme") || "auto"

applyTheme(savedTheme)

for (const optionElement of document.querySelectorAll("#selTheme option")) {
  optionElement.selected = savedTheme === optionElement.value
}

document.querySelector("#selTheme").addEventListener("change", function () {
  console.log("change")
  localStorage.setItem("theme", this.value)
  console.log(this.value)
  applyTheme(this.value)
})

function applyTheme(theme) {
  document.body.classList.remove("theme-auto", "theme-light", "theme-dark")
  document.body.classList.add(`theme-${theme}`)
  console.log(`theme-${theme}`)
}
