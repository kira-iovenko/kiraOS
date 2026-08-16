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
}

welcomeScreenOpen.addEventListener("click", function() {
    openWindow(welcomeScreen);
});

welcomeScreenClose.addEventListener("click", function() {
    closeWindow(welcomeScreen);
});