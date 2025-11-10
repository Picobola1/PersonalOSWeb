function UpdateTime() {
    var currentTime = new Date().toLocaleString();
    var timeText = document.getElementById("Time");
    timeText.textContent = currentTime;            
}
setInterval(UpdateTime, 1000);

// Make the DIV element draggable:


var welcomeWindow = document.getElementById("welcome")
var welcomeClose = document.getElementById("welcomeclose")
var welcomeOpen = document.getElementById("welcomeopen")
var aboutMeWindow = document.getElementById("aboutMe")
var aboutMeClose = document.getElementById("aboutMeclose")
var aboutMeOpen = document.getElementById("aboutMeopen")
var aboutMeIcon = document.getElementById("aboutMeIcon")
var OpenCv = document.getElementById("OpenCvWindow")
var OpenCvClose = document.getElementById("OpenCvclose")
var OpenCvOpen = document.getElementById("OpenCvopen")
var OpenCvIcon = document.getElementById("OpenCvIcon")
var selectedIcon = undefined
var biggestIndex = 10

dragElement(document.getElementById("welcome"));
dragElement(document.getElementById("aboutMe"));
addWindowTapHandling(welcomeWindow);
addWindowTapHandling(aboutMeWindow);
addWindowTapHandling(OpenCv);
//InstalizeWindow("OpenCv")


function CloseWindow(element) {
    element.style.display = "none"
}
function OpenWindow(element) {
    element.style.display = "flex"
    biggestIndex++;  // Increment biggestIndex by 1
    element.style.zIndex = biggestIndex;
}
function selectIcon(element){
    element.classList.add("selected")
    selectedIcon = element
}
function delSelectIcon(element){
    element.classList.remove("selected")
    selectedIcon = undefined
}
function handleIconTap(element) {
  if (element.classList.contains("selected")) {
    delSelectIcon(element)
    OpenWindow(element)
  } else {
    selectIcon(element + "Window")
  }
}
function addWindowTapHandling(element) {
    element.addEventListener("mousedown", () =>
    handleWindowTap(element)
    
  )
}
function handleWindowTap(element){
    biggestIndex++
    element.style.zIndex = biggestIndex;
    
}
function InstalizeWindow(elementName) {
    var screen = document.getElementById(elementName)
    addWindowTapHandling(screen)
    CloseWindow(elementName)
    dragElement(screen)
}


welcomeClose.addEventListener("click", function() {
    CloseWindow(welcomeWindow)
})
welcomeOpen.addEventListener("click", function() {
    OpenWindow(welcomeWindow)
})
aboutMeClose.addEventListener("click", function() {
    CloseWindow(aboutMeWindow)
})
aboutMeOpen.addEventListener("click", function() {
    OpenWindow(aboutMeWindow)
})
aboutMeIcon.addEventListener("click", function() {
    OpenWindow(aboutMeWindow)
})
OpenCvClose.addEventListener("click", function() {
    CloseWindow(OpenCvWindow)
})
OpenCvIcon.addEventListener("click", function() {
    OpenWindow(OpenCvWindow)
})


// Step 1: Define a function called `dragElement` that makes an HTML element draggable.
function dragElement(element) {
  // Step 2: Set up variables to keep track of the element's position.
  var initialX = 0;
  var initialY = 0;
  var currentX = 0;
  var currentY = 0;

  // Step 3: Check if there is a special header element associated with the draggable element.
  if (document.getElementById(element.id + "header")) {
    // Step 4: If present, assign the `dragMouseDown` function to the header's `onmousedown` event.
    // This allows you to drag the window around by its header.
    document.getElementById(element.id + "header").onmousedown = startDragging;
  } else {
    // Step 5: If not present, assign the function directly to the draggable element's `onmousedown` event.
    // This allows you to drag the window by holding down anywhere on the window.
    element.onmousedown = startDragging;
  }

  // Step 6: Define the `startDragging` function to capture the initial mouse position and set up event listeners.
  function startDragging(e) {
    e = e || window.event;
    e.preventDefault();
    // Step 7: Get the mouse cursor position at startup.
    initialX = e.clientX;
    initialY = e.clientY;
    // Step 8: Set up event listeners for mouse movement (`elementDrag`) and mouse button release (`closeDragElement`).
    document.onmouseup = stopDragging;
    document.onmousemove = dragElement;
  }

  // Step 9: Define the `elementDrag` function to calculate the new position of the element based on mouse movement.
  function dragElement(e) {
    e = e || window.event;
    e.preventDefault();
    // Step 10: Calculate the new cursor position.
    currentX = initialX - e.clientX;
    currentY = initialY - e.clientY;
    initialX = e.clientX;
    initialY = e.clientY;
    // Step 11: Update the element's new position by modifying its `top` and `left` CSS properties.
    element.style.top = (element.offsetTop - currentY) + "px";
    element.style.left = (element.offsetLeft - currentX) + "px";
  }

  // Step 12: Define the `stopDragging` function to stop tracking mouse movement by removing the event listeners.
  function stopDragging() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
