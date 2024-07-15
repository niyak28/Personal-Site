function updateTime() {
  var currentTime = new Date().toLocaleString();
  var timeText = document.querySelector("#timeElement");
  timeText.innerHTML = currentTime;
}
setInterval(updateTime, 1000);


// Make Welcome Div draggable:
dragElement(document.getElementById("welcome"));

// Step 1: Define a function called `dragElement` that makes an HTML element draggable.
function dragElement(element) {
  // Step 2: Set up variables to keep track of the element's position.
  let initialX = 0;
  let initialY = 0;
  let currentX = 0;
  let currentY = 0;

  console.log("making " + element + "Draggable")

  // Step 3: Check if there is a special header element associated with the draggable element.
  if (document.getElementById(element.id + "header")) {
    // Step 4: If present, assign the `dragMouseDown` function to the header's `onmousedown` event.
    // This allows you to drag the window around by its header.
    document.getElementById(element.id + "header").onmousedown = startDragging;
    console.log("adding startDragging to " + element.id + "'s header");
  } else {
    // Step 5: If not present, assign the function directly to the draggable element's `onmousedown` event.
    // This allows you to drag the window by holding down anywhere on the window.
    console.log('adding startDragging to elem', element);
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
    document.onmousemove = elementDrag;
  }
  // Step 9: Define the `elementDrag` function to calculate the new position of the element based on mouse movement.
  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    console.log('initial coords', currentX, currentY, initialX, initialY);
    console.log("initial top", element.offsetTop, "initial left", element.offsetLeft);
    // Step 10: Calculate the new cursor position
    console.log("mouse pos", e.clientX, e.clientY);
    currentX = initialX - e.clientX;
    currentY = initialY - e.clientY;
    initialX = e.clientX;
    initialY = e.clientY;
    console.log('new pos', currentX, currentY, initialY, initialY);
    console.log("top calc", element.offsetTop, "left calc", element.offsetLeft);
    // Step 11: Update the element's new position by modifying its `top` and `left` CSS properties.
    element.style.top = (element.offsetTop - currentY) + "px";
    element.style.left = (element.offsetLeft - currentX) + "px";
    console.log('new top and left', element.style.top, element.style.left);
  }

  // Step 12: Define the `stopDragging` function to stop tracking mouse movement by removing the event listeners.
  function stopDragging() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

document.addEventListener("DOMContentLoaded", function() {
  var openButton = document.getElementById("welcomeopen");
  var closeButton = document.getElementById("welcomeclose");
  var welcomeDiv = document.getElementById("welcome");

  // Initially hide the welcome div
  welcomeDiv.style.display = "none";

  openButton.addEventListener("click", function() {
    welcomeDiv.style.display = "block";
  });

  closeButton.addEventListener("click", function() {
    welcomeDiv.style.display = "none";
  });
});


document.getElementById("welcomeopen").onclick = function() {
  document.getElementById("welcome").style.display = 'block';
}

document.getElementById("welcomeclose").onclick = function() {
  document.getElementById("welcome").style.display = 'none';
}
//////////////////////////////////////////////////////////////

// storing what the blog button is/does code:
var selectedIcon = undefined;
console.log(selectedIcon);

function selectIcon(element) {
  element.classList.add("selected");
  selectedIcon = element
}
console.log(selectedIcon);

function deselectIcon(element) {
  element.classList.remove("selected");
  selectedIcon = undefined
}

function handleIconTap(element) {
  if (element.classList.contains("selected")) {
    deselectIcon(element)
    openWindow(window)
  } else {
    selectIcon(element)
  }
}
console.log(selectedIcon);
/* making Window 2 draggable */
console.log('notes exists', document.querySelector("#notes"));
dragElement(document.querySelector("#notes"));

// making blogwindow/Window 2 closeable //
var notesScreen = document.querySelector("#notes")

var notesScreenClose = document.querySelector("#notesclose")

notesScreenClose.addEventListener("click", () => closeWindow(notesScreen));

// open diary entries window on diary entries icon click //
function openDiaryEntries() {
  var diaryEntries = document.getElementById("notes");
  diaryEntries.style.display = "block";
}

// event listener for blog/diary entries icon //
document.addEventListener("DOMContentLoaded", function() {
  // Event listener for the blog icon
  var blogIcon = document.querySelector("#desktopApps div");
  blogIcon.addEventListener("click", openDiaryEntries);
});

// making diary entries window closeable //
var welcomeScreen = document.querySelector("#notes")

var notesScreenClose = document.querySelector("#notesclose")

notesScreenClose.addEventListener("click", () => closeWindow(notesScreen));