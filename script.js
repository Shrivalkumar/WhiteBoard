//for the tools hide and show functionality

const tools = document.querySelector(".open-tools");

const opentools = document.querySelector(".open-tools .open");
const closeTools = document.querySelector(".open-tools .close");

const allTools = document.querySelector(".tools");

tools.addEventListener("click", function () {
  if (allTools.style.display === "none") {
    allTools.style.display = "flex";
    opentools.style.display = "none";
    closeTools.style.display = "flex";
  } else {
    allTools.style.display = "none";
    opentools.style.display = "flex";
    closeTools.style.display = "none";
  }
});

//for the dropdown hide and show functionality

const angleUp = document.querySelector(".arrow-down");
const dropdown = document.querySelector(".dropdown");

angleUp.addEventListener("click", function (event) {
  event.stopPropagation();
  if (dropdown.style.display === "none") {
    dropdown.style.display = "flex";
  } else {
    dropdown.style.display = "none";
  }
  console.log(angleUp);
});
console.log(angleUp);

document.addEventListener("mousedown", function (event) {
  //if the user click anywhere on the screen while the dropdown is open the dropdown should close
  if (
    dropdown.style.display === "flex" &&
    !dropdown.contains(event.target) &&
    !allTools.contains(event.target)
  ) {
    dropdown.style.display = "none";
  }
});

//change of the button icon on selecting different tools

const toolbtn = document.querySelector(".tool-btn.pen span");
console.log(toolbtn);
const toolDropdown = document.querySelector("#pen-dropdown");
console.log(toolDropdown);
const toolButtons = document.querySelectorAll(
  ".dropdown-items-btn .other-pens"
);
console.log(toolButtons);

const workspace = document.querySelector(".main-area");

// const workSpace = document.querySelector(".main-area");

const updateToolBtnIcon = (selectedTool) => {
  const icon = selectedTool.querySelector("img").cloneNode(true);
  console.log(icon);
  toolbtn.innerHTML = "";
  toolbtn.appendChild(icon);
};

toolButtons.forEach((button) => {
  button.addEventListener("click", function () {
    toolButtons.forEach((btn) => btn.classList.remove("selected-pen"));
    button.classList.add("selected-pen");
    updateToolBtnIcon(button);
    toolDropdown.classList.remove("open");
  });
});

toolbtn.addEventListener("click", function () {
  toolDropdown.classList.toggle("open");
});

//color selection

const colorswitched = document.querySelectorAll(".color-switch");
const penButton = document.querySelector(".tool-btn.pen");

colorswitched.forEach((color) => {
  color.addEventListener("click", function () {
    colorswitched.forEach((btn) => btn.classList.remove("selected-color"));
    color.classList.add("selected-color");

    const selectedColor = color.dataset.color;
    console.log(selectedColor);
    if (penButton) {
      penButton.style.color = selectedColor;
    }
  });
});
