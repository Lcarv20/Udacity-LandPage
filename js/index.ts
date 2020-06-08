const menuLinks: NodeListOf<HTMLElement> = document.querySelectorAll("section")
//retrive menu item names and links
let menuItems: string[][] = []

for (let i: number = 0; i < menuLinks.length; i++) {
  let sectionId: string = menuLinks[i].id
  let sectionDataNav: string | undefined = menuLinks[i].dataset.nav

  if (typeof sectionDataNav === "string") {
    menuItems.push([sectionId, sectionDataNav])
  }
}

//BUILD MENU
const menuPlacer: HTMLElement | null = document.getElementById("navbar__list")

if (menuPlacer !== null) {
  // templating
  const divMenuLi = document.createElement("div")
  for (let item of menuItems) {
    let newLi = `<a href="#${item[0]}"><li class="menu__link">${
      item[1]
    }</li></a>`
    divMenuLi.innerHTML += newLi
  }
  //appending to the DOM
  menuPlacer.appendChild(divMenuLi)
}

//Hide menu on scroll down, appears after 0.5s
let prevScrollpos: number = window.pageYOffset

window.onscroll = function() {
  let currentScrollPos: number = window.pageYOffset
  let eleToHide: HTMLElement | null = document.querySelector(".page__header")
  const eleHeight: number | undefined =
    eleToHide !== null ? eleToHide.scrollHeight : 0
  if (prevScrollpos > currentScrollPos && eleToHide) {
    eleToHide.style.top = "0"
  } else if (eleToHide) {
    eleToHide.style.top = `-${eleHeight}px`
  }
  prevScrollpos = currentScrollPos

  this.setTimeout(function() {
    if (prevScrollpos === currentScrollPos && eleToHide) {
      eleToHide.style.top = "0"
    }
  }, 500)
}

//Active classes

//Verify which <section is currently on screen>

window.addEventListener("scroll", function() {
  for (let i = 0; i < menuItems.length; i++) {
    let getSection = document.getElementById(`section${i + 1}`)

    if (getSection) {
      let distanceTop = getSection.getBoundingClientRect()
      getSection.className =
        Math.abs(distanceTop.top) < 300 ? "your-active-class" : ""

      // var distanceToTop = someDiv.getBoundingClientRect().top
      // console.log(distanceToTop)
    }
  }
})
