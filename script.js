document.addEventListener("DOMContentLoaded", function() {
  function updateTime() {
    var currentTime = new Date().toLocaleString();
    var timeText = document.querySelector("#timeElement");
    timeText.innerHTML = currentTime;
  }
  setInterval(updateTime, 1000);

  // Make Welcome Div draggable:
  dragElement(document.getElementById("welcome"));
  dragElement(document.getElementById("notes"));
   dragElement(document.getElementById("music"));

  // Step 1: Define a function called dragElement that makes an HTML element draggable.
  function dragElement(element) {
    // Step 2: Set up variables to keep track of the element's position.
    let initialX = 0, initialY = 0, currentX = 0, currentY = 0;

    // Step 3: Check if there is a special header element associated with the draggable element.
    if (document.getElementById(element.id + "header")) {
      // Step 4: If present, assign the dragMouseDown function to the header's onmousedown event.
      document.getElementById(element.id + "header").onmousedown = startDragging;
    } else {
      // Step 5: If not present, assign the function directly to the draggable element's onmousedown event.
      element.onmousedown = startDragging;
    }

    // Step 6: Define the startDragging function to capture the initial mouse position and set up event listeners.
    function startDragging(e) {
      e = e || window.event;
      e.preventDefault();
      // Step 7: Get the mouse cursor position at startup.
      initialX = e.clientX;
      initialY = e.clientY;
      // Step 8: Set up event listeners for mouse movement (elementDrag) and mouse button release (closeDragElement).
      document.onmouseup = stopDragging;
      document.onmousemove = elementDrag;
    }

    // Step 9: Define the elementDrag function to calculate the new position of the element based on mouse movement.
    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // Step 10: Calculate the new cursor position
      currentX = initialX - e.clientX;
      currentY = initialY - e.clientY;
      initialX = e.clientX;
      initialY = e.clientY;
      // Step 11: Update the element's new position by modifying its top and left CSS properties.
      element.style.top = (element.offsetTop - currentY) + "px";
      element.style.left = (element.offsetLeft - currentX) + "px";
    }

    // Step 12: Define the stopDragging function to stop tracking mouse movement by removing the event listeners.
    function stopDragging() {
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }

  // Initially hide the welcome div
  var openButton = document.getElementById("welcomeopen");
  var closeButton = document.getElementById("welcomeclose");
  var welcomeDiv = document.getElementById("welcome");
  welcomeDiv.style.display = "none";

  openButton.addEventListener("click", function() {
    welcomeDiv.style.display = "block";
  });

  closeButton.addEventListener("click", function() {
    welcomeDiv.style.display = "none";
  });
////////
  // Event listener for the blog icon
  var blogIcon = document.querySelector("#openDiary");
  blogIcon.addEventListener("click", openDiaryEntries);

  // Event listener for the music icon
  var blogIcon = document.querySelector("#openMusic");
  blogIcon.addEventListener("click", openMusic);
///////
  // making diary entries window closeable //
  document.getElementById("diaryclose").onclick = closeDiaryEntries;

  // making music window closeable //
  document.getElementById("musicclose").onclick = closeMusic;
///////
  function openDiaryEntries() {
    var diaryEntries = document.getElementById("notes");
    diaryEntries.style.display = "block";
  }

  function openMusic() {
    var music = document.getElementById("music");
    music.style.display = "block";
  }

  function closeDiaryEntries() {
    var diaryEntries = document.getElementById("notes");
    diaryEntries.style.display = "none";
  }
  
  function closeMusic() {
    var music = document.getElementById("music");
    music.style.display = "none";
  }

  // Variable to keep track of the highest z-index
  var biggest = 1;

  // Function to bring the clicked window to the top
  function forward(element) {
    biggest++;
    element.style.zIndex = biggest;
  }

  // Apply this function to each new tab
  document.getElementById("welcome").addEventListener("mousedown", function() {
    forward(this);
  });

document.getElementById("notes").addEventListener("mousedown", function() {
  forward(this);
});

document.getElementById("music").addEventListener("mousedown", function() {
  forward(this);
});

  // combine functions into one for initializing new windows
  function initialize(elementName) {
    var screen = document.querySelector("#" + elementName);
    forward(screen);
    dragElement(screen);
  }

  // play music on click of bowhamster.png
  var audio = new Audio('sadhamster.mp3');
  var bowhamster = document.getElementById('bowhamster');
  var hamsterClick = 0;

  if (bowhamster) { // Check if the element exists
    bowhamster.addEventListener('click', function() {
      hamsterClick += 1;
      if (hamsterClick % 2 !== 0) {
        audio.play();
      } else {
        audio.pause();
      }
    });
  }

  // Store content of first post  
  var content = [
    {
      title: "02 Test Entry",
      date: "07/08/2022",
      content: `
        <p contenteditable="True">
          This was the day my precious children came home
        </p>
        <div>
        <img src="02Addy.jpg" style="width: 200px; border-radius: 12px"/>
        </div>
        <div>
          <img src="02Poppy.jpg" style="width: 200px; border-radius: 12px"/>
        </div>
      `
    },

    {
      title: "Sample Text",
      date: "06/28/2023",
      content: `
                <p contenteditable="True">
            Here's some sample text
          </p>
        `
    }
    
  ];

  // Programmatically displaying our content
  function setNotesContent(index) {
    var notesContent = document.querySelector("#noteContent");
    notesContent.innerHTML = content[index].content;
  }

  // Programmatically Populating our content selector
  function addToSideBar(index) {
    var sidebar = document.querySelector("#sidebar");
    var note = content[index];
    var newDiv = document.createElement("div");
    newDiv.className = 'sidebar-item'; // Add this class
    newDiv.innerHTML = `
       <p style="margin: 0; font-family: monospace; font-size: 15px"><b>${note.title}</b></p>
       <p style="font-size: 15px; margin: 0; font-family: monospace;">${note.date}</p>
    `;

    newDiv.addEventListener("click", function() {
      setNotesContent(index);
    });
    sidebar.appendChild(newDiv);
  }


  // empty sidebar blog content before adding new content //
  var sidebar = document.querySelector("#sidebar");
  sidebar.innerHTML = '';
  // add content to sidebar //
  for (let i = 0; i < content.length; i++) {
    addToSideBar(i); // No change to this line, just ensuring it's not in a nested loop
  }
});
