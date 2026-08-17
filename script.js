const topBarElement = document.getElementById("top");
const timeElement = document.getElementById("timeElement");
const dateElement = document.getElementById("dateElement");

function updateTime() {
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const date = now.toLocaleDateString([], { month: 'short', day: 'numeric', weekday: 'short' });
    timeElement.textContent = time;
    dateElement.textContent = date;
}

updateTime();

setInterval(updateTime, 1000);


const welcomeScreen = document.getElementById("welcome");

function dragWindow(element) {
    let initialX = 0;
    let initialY = 0;
    let currentX = 0;
    let currentY = 0;

    const header = document.getElementById(element.id + "header");
    if (header) {
        header.onmousedown = startDragging;
    } else {
        element.onmousedown = startDragging;
    }

    function startDragging(e) {
        e = e || window.event;
        e.preventDefault();
        initialX = e.clientX;
        initialY = e.clientY;
        document.onmouseup = stopDragging;
        document.onmousemove = dragElement;
    }

    function dragElement(e) {
        e = e || window.event;
        e.preventDefault();
        currentX = initialX - e.clientX;
        currentY = initialY - e.clientY;
        initialX = e.clientX;
        initialY = e.clientY;
        element.style.top = (element.offsetTop - currentY) + "px";
        element.style.left = (element.offsetLeft - currentX) + "px";
    }

    function stopDragging() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

dragWindow(welcomeScreen);

const welcomeScreenOpen = document.getElementById("welcomeopen");
const welcomeScreenClose = document.getElementById("welcomeclose");

function closeWindow(element) {
    element.style.display = "none";
}

function openWindow(element) {
    element.style.display = "flex";
    handleWindowTap(element);
}

welcomeScreenOpen.addEventListener("click", function () {
    openWindow(welcomeScreen);
});

welcomeScreenClose.addEventListener("click", function () {
    closeWindow(welcomeScreen);
});

let selectedIcon = undefined;

function selectIcon(element) {
    element.classList.add("selected");
    selectedIcon = element;
}

function deselectIcon(element) {
    element.classList.remove("selected");
    selectedIcon = undefined;
}

const owlPrintScreen = document.getElementById("owlprint");
const owlPrintScreenOpen = document.getElementById("owlprintopen");
const owlPrintScreenClose = document.getElementById("owlprintclose");

dragWindow(owlPrintScreen);
dragWindow(owlPrintScreenOpen);

owlPrintScreenClose.addEventListener("click", function () {
    closeWindow(owlPrintScreen);
});

owlPrintScreenOpen.addEventListener("click", function () {
    handleIconTap(owlPrintScreenOpen, owlPrintScreen);
});

function handleIconTap(element, screen) {
    if (element.classList.contains("selected")) {
        deselectIcon(element);
        openWindow(screen);
    } else {
        selectIcon(element);
    }
}

let biggestIndex = 1;

function addWindowTapHandling(element) {
    element.addEventListener("mousedown", () =>
        handleWindowTap(element)
    )
}

function handleWindowTap(element) {
    biggestIndex++;
    element.style.zIndex = biggestIndex;
    topBarElement.style.zIndex = biggestIndex + 1;
}

addWindowTapHandling(owlPrintScreen);
addWindowTapHandling(welcomeScreen);

const kiraNotesScreen = document.getElementById("kiranotes");
const kiraNotesScreenOpen = document.getElementById("kiranotesopen");
const kiraNotesScreenClose = document.getElementById("kiranotesclose");

dragWindow(kiraNotesScreen);
dragWindow(kiraNotesScreenOpen);

kiraNotesScreenOpen.addEventListener("click", function() {
    handleIconTap(kiraNotesScreenOpen, kiraNotesScreen);
});

kiraNotesScreenClose.addEventListener("click", function() {
    closeWindow(kiraNotesScreen);
});

addWindowTapHandling(kiraNotesScreen);

const notes = [
    {
        title: "Welcome",
        date: "8/16/2025",
        content: "Welcome to Kira Notes!"
    },
    {
        title: "Building KiraOS",
        date: "8/16/2025",
        content: "Today I worked on making my first KiraOS apps."
    }
]

function showNote(index) {
    const note = notes[index];
    const noteContent = document.getElementById("notecontent");

    noteContent.innerHTML = `
        <h1>${note.title}</h1>
        <p>${note.date}</p>
        <p>${note.content}</p>
    `;
}

function addNoteToList(index) {
    const noteList = document.getElementById("noteslist");
    const note = notes[index];
    
    const newNote = document.createElement("div");

    newNote.innerHTML = `
        <p>${note.title}</p>
        <p>${note.date}</p>
    `;

    newNote.addEventListener("click", function() {
        showNote(index);
    });

    noteList.appendChild(newNote);
}

notes.forEach((note, index) => addNoteToList(index));


const kiraPaintScreen = document.getElementById("kirapaint");
const kiraPaintScreenOpen = document.getElementById("kirapaintopen");
const kiraPaintScreenClose = document.getElementById("kirapaintclose");

dragWindow(kiraPaintScreen);
dragWindow(kiraPaintScreenOpen);

kiraPaintScreenOpen.addEventListener("click", function() {
    handleIconTap(kiraPaintScreenOpen, kiraPaintScreen);
});

kiraPaintScreenClose.addEventListener("click", function() {
    closeWindow(kiraPaintScreen);
});

addWindowTapHandling(kiraPaintScreen);

const colorPicker = document.getElementById("colorpicker");
const eraserButton =  document.getElementById("eraserbutton");
const clearButton =  document.getElementById("clearbutton");
const downloadButton =  document.getElementById("downloadbutton");
const gridWidth =  document.getElementById("gridwidth");
const gridHeight =  document.getElementById("gridheight");

let selectedColor = "#000000"

colorPicker.addEventListener("input", function() {
    selectedColor = colorPicker.value;
    eraserOn = false;
    eraserButton.disabled = false;
});

let eraserOn = false;

eraserButton.addEventListener("click", function() {
    eraserOn = true;
    eraserButton.disabled = true;
});

clearButton.addEventListener("click", function() {
    const pixels = document.querySelectorAll(".pixel");
    pixels.forEach(pixel => pixel.style.backgroundColor = "white");
});

const pixelGrid = document.getElementById("pixelgrid");

function createGrid(width, height, demo = false) {
    pixelGrid.innerHTML = "";
    const pixelSize = 500 / Math.max(width, height);
    console.log(pixelSize);

    for(let i = 0; i < width * height; i++) {
        const pixel = document.createElement("div");

        pixel.classList.add("pixel")
        pixel.style.width = pixelSize + "px"
        pixel.style.height = pixelSize + "px"
        if (demo) {
            pixel.style.backgroundColor = demoImage[i];
        }


        pixel.addEventListener("click", function() {
            pixel.style.backgroundColor = eraserOn ? "white" : selectedColor;
        });

        pixel.addEventListener("mouseenter", function() {
            if (isMouseDown) {
                pixel.style.backgroundColor = eraserOn ? "white" : selectedColor;
            }
        });

        pixelGrid.appendChild(pixel);
    }

    pixelGrid.style.gridTemplateColumns = `repeat(${width}, ${pixelSize}px)`;
};

createGrid(Number(gridWidth.value), Number(gridHeight.value));

gridWidth.addEventListener("change", function() {
    createGrid(Number(gridWidth.value), Number(gridHeight.value));
});

gridHeight.addEventListener("change", function() {
    createGrid(Number(gridWidth.value), Number(gridHeight.value));
});

let isMouseDown = false;

pixelGrid.addEventListener("mousedown", function() {
    isMouseDown = true;
});

pixelGrid.addEventListener("mouseup", function() {
    isMouseDown = false;
});

downloadButton.addEventListener("click", function() {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    const width = Number(gridWidth.value);
    const height = Number(gridHeight.value);

    canvas.width = width;
    canvas.height = height;

    const pixels = document.querySelectorAll(".pixel");
    pixels.forEach((pixel, index) => {
        const x = index % width;
        const y = Math.floor(index / width);
        context.fillStyle = pixel.style.backgroundColor || "white";
        context.fillRect(x, y, 1, 1);
    });

    const link = document.createElement("a");

    link.download = "kira-paint.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
})

