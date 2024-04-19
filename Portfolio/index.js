// Declaring the variables used for DOM manipulation

const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
const isMobileScreen = screenWidth < 768;
const heading = document.getElementById("heading");
const originalText = heading.textContent;
const digitalText = [];
let navBarDisplayed = false;
for (let i = 0; i < heading.textContent.length; i++) {
    if (i === 0) {
        digitalText[i] = '1';
    }
    else if ((digitalText[i - 1]) == '1') {
        digitalText[i] = '0';
    }
    else if (digitalText[(i - 1)] == '0') {
        digitalText[i] = '1';
    }
}
const headingCode = digitalText.join('');
heading.textContent = headingCode;
const headingCodeArray = headingCode.split('');
let originalTextArray = originalText.split('');
let currentIndex = 0;
let changeText = '0';
let intervalid;
let imageEnlarged = false;
let originalHeight, originalWidth;
let pageNo = 0;
let projectImageCount = 0;
const listItems = document.getElementsByClassName("navItems");
const footerIcons = document.getElementsByClassName("footerIcons");
const menuBtn = document.getElementById("menuBtn");
const navBar = document.getElementById("navBar");
const skillsTab = document.getElementById("skillsTab");
const skillsBtn = document.getElementById("skillsBtn");
const closeBtn = document.querySelector(".closeBtn");
const skillsWindow = document.getElementById("skillsWindow");
const projectsTab = document.getElementById("projectsTab");
const projectBtn = document.getElementById("projectsBtn");
const pagination = document.getElementById("pagination");
const projectContent = document.getElementById("projectsContent");
const contactBtn = document.getElementById("contactBtn");
const resumeBtn = document.getElementById("resumeBtn");

// Some stuff other than variables and functions

const projectImagesArray = [
    [
        "Icons/CurrencyConverterImage1.jpg",
        "Icons/CurrencyConverterImage2.jpg",
        "Icons/CurrencyConverterImage3.jpg",
        "Icons/NoteProjectImage1.jpg",
    ],
    [
        "Icons/NoteProjectImage2.jpg",
        "Icons/NoteProjectImage3.jpg",
        "Icons/NoteProjectImage4.jpg",
        "Icons/NoteProjectImage5.jpg",
    ],
    [
        "Icons/NoteProjectImage6.jpg",
    ]
];
showProjectImagesWithPagination(pageNo);
const projectImages = document.getElementsByClassName("projectsImages");
if (projectImagesArray.length > 0) {
    for (let i = 0; i < projectImagesArray.length; i++) {
        createPageBtn();
    }
}
const pageBtn = document.getElementsByClassName("pageBtn");
for (let i = 0; i < pageBtn.length; i++) {
    pageBtn[i].addEventListener("click", (event) => {
        clearPreviousImages();
        showProjectImagesWithPagination(event.target.textContent);
        for (image of projectImages) {
            MakeImageFocusOnHover(image);
        }
    });
}



// Making 0 and 1 effect on heading

function ShowTextWithStyle() {
    if (currentIndex < originalTextArray.length) {
        changeText = originalTextArray[currentIndex];
        let newText = originalText.substring(0, currentIndex) + changeText + headingCode.substring(currentIndex + 1);
        heading.textContent = newText;
        currentIndex++;
    }
    else {
        BlinkUnderscore();
        clearInterval(intervalid);
    }
}
setTimeout(callInterval, 500);
function callInterval() {
    intervalid = setInterval(ShowTextWithStyle, 80);
}

// Making the blink effect on underscore

function BlinkUnderscore() {
    const underScore = originalTextArray[originalTextArray.indexOf('_')];
    setInterval(() => {
        if (originalTextArray.includes(underScore)) {
            originalTextArray.pop();
        }
        else {
            originalTextArray.push("_");
        }
        heading.innerText = originalTextArray.join('');
    }, 800);
}

// Adding animations and other properties to buttons

for (let item of listItems) {
    MakeNavBtn(item);
}
for (icons of footerIcons) {
    MakeFooterIcons(icons);
}
function MakeNavBtn(item) {
    item.addEventListener("mouseover", () => {
        item.style.backgroundColor = "white";
        item.style.color = "black";
    });
    item.addEventListener("mouseout", () => {
        item.style.backgroundColor = " rgb(133, 26, 7)";
        item.style.color = "white";
    })
}
function MakeFooterIcons(icon) {
    icon.addEventListener("mouseover", () => {
        icon.style.backgroundColor = "lightgray";
    });
    icon.addEventListener("mouseout", () => {
        icon.style.backgroundColor = "white";
    })
}
menuBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    navBar.style.transition = "0.5s";
    navBar.style.display = "flex";
    navBar.style.opacity = "1";
    navBar.style.visibility = "visible";
    navBar.style.alignItems = "center";
    navBar.style.justifyContent = "center";
    navBar.style.transform = "translateX(0%)";
    navBarDisplayed = true;
});

skillsBtn.addEventListener("click", () => {
    DisplaySkillsTab();
    DisplayFocusWindow();
    CloseProjectsTab();
})
closeBtn.addEventListener("click", () => {
    CloseSkillsTab();
    CloseFocusWindow();
});

projectBtn.addEventListener("click", () => {
    DisplayFocusWindow();
    DisplayProjectsTab();
    CloseSkillsTab();
})

// Making some functions for reused code

function DisplayFocusWindow() {
    skillsWindow.style.visibility = "visible";
    skillsWindow.style.opacity = '1';
}

function CloseFocusWindow() {
    skillsWindow.style.visibility = "hidden";
    skillsWindow.style.opacity = '0';
}

function DisplaySkillsTab() {
    skillsTab.style.visibility = "visible";
    skillsTab.style.opacity = '1';
    skillsTab.style.zIndex = '1';
}

function CloseSkillsTab() {
    skillsTab.style.visibility = "hidden";
    skillsTab.style.opacity = '0';
    skillsTab.style.zIndex = '0';
}

function DisplayProjectsTab() {
    projectsTab.style.visibility = "visible";
    projectsTab.style.opacity = '1';
    projectsTab.style.zIndex = '1';
}

function CloseProjectsTab() {
    projectsTab.style.visibility = "hidden";
    projectsTab.style.opacity = '0';
    projectsTab.style.zIndex = '0';
}

// Making the functionality that the tabs should close when user clicks outside of it OR on a close button.

skillsWindow.addEventListener("click", (event) => {
    if (!skillsTab.contains(event.target) && !projectsTab.contains(event.target)) {
        CloseSkillsTab();
        CloseFocusWindow();
        CloseProjectsTab();
    }
})

document.addEventListener("click", (event) => {
    for (item of listItems) {
        if (item.contains(event.target)) {
            if (navBar.style.opacity === "1" && navBarDisplayed) {
                navBar.style.transition = "1s";
                navBar.style.opacity = "0";
                navBar.style.transform = "translateX(-100%)";
            }
            return;
        }
    }
    if (!navBar.contains(event.target)) {
        if (navBar.style.opacity === "1" && navBarDisplayed) {
            navBar.style.opacity = "0";
            navBar.style.transform = "translateX(-100%)";
        }
    }
});

// Functions for projects image handling

function EnlargeImage(image) {
    imageEnlarged = true;
    originalHeight = image.clientHeight;
    originalWidth = image.clientWidth;
    // Calculate aspect ratio
    const aspectRatio = image.naturalWidth / image.naturalHeight;

    // Determine whether to set height or width based on aspect ratio
    if (aspectRatio > 1) {
        // Landscape orientation
        if (isMobileScreen) {
            image.style.width = "100vw";
            image.style.height = "auto";
        }
        else {
            image.style.width = "70vw";
            image.style.height = "auto";
        }
    } else {
        // Portrait or square orientation
        if(isMobileScreen){
            image.style.height = "65%";
            image.style.width = "100%";
        }
        else{
            image.style.height = "90vh";
            image.style.width = "auto";
        }
    }
    image.style.cursor = "default";
    image.style.zIndex = "1";
    image.style.opacity = '1';
}

function ShrinkImage(image) {
    imageEnlarged = false;

    // Resize the image to its original dimensions
    image.style.width = originalWidth + 'px';
    image.style.height = originalHeight + 'px';

    // image.style.zIndex = "0";
    image.style.opacity = '1';
}


function MakeImageFocusOnHover(image) {
    image.addEventListener("mouseover", () => {
        if (!imageEnlarged) {
            image.style.opacity = '0.5';
        }
    })
    image.addEventListener("mouseout", () => {
        if (!imageEnlarged) {
            image.style.opacity = '1';
        }
    })
    image.addEventListener("click", (event) => {
        let ImageClone = image.cloneNode(true);
        EnlargeImage(ImageClone)
        event.stopPropagation();
        skillsWindow.appendChild(ImageClone);
        CloseProjectsTab();
        skillsWindow.addEventListener("click", (event) => {
            ShrinkImage(ImageClone);
            // skillsWindow.removeChild(ImageClone);
            image.style.opacity = '1';
        })
    })
}

for (image of projectImages) {
    MakeImageFocusOnHover(image);
}

function clearPreviousImages() {
    projectContent.innerHTML = "";
}

// Setting up pagination

function showProjectImagesWithPagination(count) {
    for (let i = 0; i < projectImagesArray[count].length; i++) {
        IncrementProjectImages(count, i);
    }
}

function IncrementProjectImages(count, index) {
    projectContent.innerHTML += `<img src="${projectImagesArray[count][index]}" alt="" class="projectsImages">`;
    projectImageCount++;
}

function createPageBtn() {
    pagination.innerHTML += `<button class="pageBtn">${String(pageNo)}</button>`;
    pageNo++;
}

// Setting up the download resume option

resumeBtn.addEventListener("click",()=>{
    var downloadLink = document.createElement('a');
    downloadLink.setAttribute('download',`piyush_resume.pdf`);
    downloadLink.setAttribute('href',"/piyush's resume.pdf");
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
});








