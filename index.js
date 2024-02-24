//All variables
var test = document.querySelector("button")
// XMLHttpRequest
var xhrStat = 0
var xhr = new XMLHttpRequest
var url = "https://enolak64.github.io/ticTacToe/assets/"
//assets
var assets = [null, null, null, null]
var assetsUrl = ["cross.svg", "crossWhite.svg", "ring.svg", "ringWhite.svg"]

//score
var scoreSave = localStorage.getItem("scoreSave")
if (scoreSave == undefined) {
    scoreSave = { x: 0, o: 0 }
    localStorage.setItem("scoreSave", JSON.stringify(scoreSave))
}
else {
    scoreSave = JSON.parse(scoreSave)
    console.log(scoreSave);
}
var resetScore = document.getElementById("resetScore")



var scoreX = document.getElementById("scoreX")
var scoreO = document.getElementById("scoreO")


// theme
var body = document.querySelector("body")

//github logo
var githubLogo = document.getElementById("GitHubLogo")

// theme imgs
var sun = document.getElementById("sun");
var moon = document.getElementById("moon");


// save the theme choose
var darkMode = localStorage.getItem("darkMode")
if (darkMode == undefined) {
    darkMode = false
    localStorage.setItem("darkMode", JSON.stringify(darkMode))
}


//reset btn
var reset = document.getElementById("reset");

//state vars
var roundToCross = true

//grid vars
//Corners
var C1 = document.getElementById("C1");
var C2 = document.getElementById("C2");
var C3 = document.getElementById("C3");
var C4 = document.getElementById("C4");
//images



//Middles
var M1 = document.getElementById("M1");
var M2 = document.getElementById("M2");
var M3 = document.getElementById("M3");
var M4 = document.getElementById("M4");
//images


//Center
var center = document.getElementById("C");
//images
// var Icenter = document.getElementById("IC");

var All = [
    center,
    C1, C2, C3, C4,
    M1, M2, M3, M4
];

var BoxAll = [
    center,
    C1, C2, C3, C4,
    M1, M2, M3, M4
];


//Wins
var WinDL = document.getElementById("WinDL")
var WinDR = document.getElementById("WinDR")
var WinH1 = document.getElementById("WinH1")
var WinH2 = document.getElementById("WinH2")
var WinH3 = document.getElementById("WinH3")
var WinV1 = document.getElementById("WinV1")
var WinV2 = document.getElementById("WinV2")
var WinV3 = document.getElementById("WinV3")
var WinO = document.getElementById("WinO")
var WinX = document.getElementById("WinX")
var WinAll = [WinDL, WinDR, WinH1, WinH2, WinH3, WinV1, WinV2, WinV3, WinO, WinX]



//ega 
var ega = document.getElementById("ega")
//var to know if a win exist
var winFound = false

//array of the played case
// true = played
// C = Cross
// R = Ring 
/*
[       
    Center,
    C1,C2,C3,C4,
    M1,M2,M3,M4
        ↓
]
*/
var boxState =
    [
        false,
        false, false, false, false,
        false, false, false, false,
    ];

var boxStateNum =
    [
        1, 5, 2,
        6, 0, 7,
        3, 8, 4
    ];

//count round
var round = 0


//Get all assets
xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        console.log("assets get : " + url + assetsUrl[xhrStat]);
        assets[xhrStat] = (xhr.response)
        xhrStat++
        if (xhrStat < assetsUrl.length) {
            getAssets()
        }
        else{
            localStorage.setItem("assets", JSON.stringify(assets))
            console.log("All assets download");
        }
    }
};


function getAssets() {

    xhr.open('GET', url + assetsUrl[xhrStat])
    xhr.send()
}






//fuctions if win

function FWinDL() {
    WinDL.style.display = "block"
};

function FWinDR() {
    WinDR.style.display = "block"
};

function FWinH1() {
    WinH1.style.display = "block"
};

function FWinH2() {
    WinH2.style.display = "block"
};

function FWinH3() {
    WinH3.style.display = "block"
};

function FWinV1() {
    WinV1.style.display = "block"
};


function FWinV2() {
    WinV2.style.display = "block"
};


function FWinV3() {
    WinV3.style.display = "block"
};

function hideWins() {
    for (let i = 0; i < WinAll.length; i++) {
        WinAll[i].style.display = "none"
    }
}

function Freset() {
    for (let i = 0; i < All.length; i++) {
        All[i].innerHTML = ""
    }
}

function played(strBox, varBox) {
    // console.log("$cplayed", "color:white", "backgroundcolor: black ");
    var position = 0
    var splitedBox = strBox.split("")
    if (splitedBox[0] != "C" && splitedBox[0] != "M" && splitedBox[0] != "c" || splitedBox[1] > 4) {
        return console.error("Invalid box")
    }
    
    if (winFound == false) {
        if (strBox == "center") {
            checkIfPlayed(position, varBox)
        }
        else if (splitedBox[0] == "M") {

            position = 4 + +splitedBox[1]

            checkIfPlayed(position, varBox)
        }
        else if (splitedBox[0] == "C") {
            position = +splitedBox[1]
            checkIfPlayed(position, varBox)
        }
    }
}

// Check if the box is played or not and draw a cross or a ring
function checkIfPlayed(pos, varBox) {
    console.log("pos = " + pos);
    if (boxState[pos] == false) {
        round++
        if (roundToCross == true) {

            if (darkMode == false) {
                varBox.innerHTML = assets[0]
            }
            else {
                varBox.innerHTML = assets[1]
            }
            boxState[pos] = "C"
            roundToCross = !roundToCross
            checkWins()

        }
        else {

            if (darkMode == false) {
                varBox.innerHTML = assets[2]
            }
            else {
                varBox.innerHTML = assets[3]

            }
            boxState[pos] = "R"
            roundToCross = !roundToCross
            checkWins()

        }
    }
}




function foundAWin(WinId) {
    if (WinId == 0) {
        WinH1.style.display = "block"
    }

    if (WinId == 1) {
        WinH2.style.display = "block"
    }

    if (WinId == 2) {
        WinH3.style.display = "block"
    }

    if (WinId == 3) {
        WinV1.style.display = "block"
    }

    if (WinId == 4) {
        WinV2.style.display = "block"
    }

    if (WinId == 5) {
        WinV3.style.display = "block"
    }

    if (WinId == 6) {
        WinDL.style.display = "block"
    }

    if (WinId == 7) {
        WinDR.style.display = "block"
    }


}

function ifWin(winID) {
    winID.style.display = "block"
}
//check if a line is full of only X or O
function checkWins() {
    var X = NaN
    var Y = NaN
    var Z = NaN
    var A = NaN

    var whichSide = 0
    for (let i = 0; i < 4; i++) {

        for (let i = 0; i < 3; i++) {
            if (whichSide == 0) {
                X = boxStateNum[i * 3]
                Y = boxStateNum[i * 3 + 1]
                Z = boxStateNum[i * 3 + 2]
                A = i
            }
            else if (whichSide == 1) {
                X = boxStateNum[i]
                Y = boxStateNum[i + 3]
                Z = boxStateNum[i + 6]
                A = i + 3
            }

            else if (whichSide == 2) {
                X = 1;
                Y = 0;
                Z = 4;
                A = 6;
            }
            else if (whichSide == 3) {
                X = 3;
                Y = 0;
                Z = 2;
                A = 7;
            }

            if (
                boxState[X] == boxState[Y] &&
                boxState[X] == boxState[Z] &&
                boxState[Z] == boxState[Y] &&
                boxState[X] != false &&
                winFound == false
            ) {
                foundAWin(A)
                winFound = true
                if (boxState[X] == "C") {
                    WinX.style.display = "inline"

                    console.log(scoreSave);
                    scoreSave.x = scoreSave.x + 1
                    console.log(scoreSave.x)
                    localStorage.setItem("scoreSave", JSON.stringify(scoreSave))

                }
                else if (boxState[X] == "R") {
                    WinO.style.display = "inline"
                    scoreSave.o = scoreSave.o + 1
                    localStorage.setItem("scoreSave", JSON.stringify(scoreSave))

                }
                setScore()
            }
        }
        whichSide++;
    }

    if (round >= 9 && winFound == false) {
        ega.style.display = "inline";
    };

};


C1.addEventListener('click', () => {
    played("C1", C1);
});

C2.addEventListener('click', () => {
    played("C2", C2);
});

C3.addEventListener('click', () => {
    played("C3", C3);
});

C4.addEventListener('click', () => {
    played("C4", C4);
});

M1.addEventListener('click', () => {
    played("M1", M1);
});

M2.addEventListener('click', () => {
    played("M2", M2);
});

M3.addEventListener('click', () => {
    played("M3", M3);
});

M4.addEventListener('click', () => {
    played("M4", M4);
});

center.addEventListener('click', () => {
    played("center", center);
});

reset.addEventListener('click', () => {
    Freset();
    hideWins();
    winFound = false;
    ega.style.display = "none";
    round = 0;
    roundToCross = true;
    boxState =
        [
            false,
            false, false, false, false,
            false, false, false, false,
        ];
});

//Set the theme

moon.addEventListener('click', () => {
    switchMode()
})

sun.addEventListener('click', () => {
    switchMode()
})

//reset the win counter
resetScore.addEventListener('click', () => {
    scoreSave = { x: 0, o: 0 }
    localStorage.setItem("scoreSave", JSON.stringify(scoreSave))
    setScore()

})
function setDark() {
    moon.style.display = "none"
    sun.style.display = "inline"
    body.style.backgroundColor = "#313338"
    reset.style.backgroundColor = "#FFF"
    reset.style.color = "#313338"
    githubLogo.src = "./assets/github-mark-white.svg"
    WinO.style.color = "#FFF"
    WinX.style.color = "#FFF"
    ega.style.color = "#FFF"
    scoreO.style.color = "#FFF"
    scoreX.style.color = "#FFF"
    resetScore.style.color = "#313338"
    resetScore.style.backgroundColor = "#FFF"
    for (let i = 0; i < WinAll.length - 2; i++) {
        WinAll[i].style.backgroundColor = "#FFF"
        WinAll[i].style.borderColor = "#FFF"
    }

    for (let i = 0; i < BoxAll.length; i++) {
        BoxAll[i].style.borderColor = "#FFF"
    }

    for (let i = 0; i < boxState.length; i++) {
        if (boxState[i] == "R") {
            All[i].innerHTML = assets[3]

        }
        else if (boxState[i] == "C") {
            All[i].innerHTML = assets[1]
        }

    }

}

function setLight() {
    sun.style.display = "none"
    moon.style.display = "inline"
    body.style.backgroundColor = "#FFF"
    reset.style.backgroundColor = "#313338"
    reset.style.color = "#FFF"
    githubLogo.src = "./assets/github-mark.svg"
    WinO.style.color = "#313338"
    WinX.style.color = "#313338"
    ega.style.color = "#313338"
    scoreO.style.color = "#313338"
    scoreX.style.color = "#313338"
    resetScore.style.color = "#FFF"
    resetScore.style.backgroundColor = "#313338"

    for (let i = 0; i < WinAll.length - 2; i++) {
        WinAll[i].style.backgroundColor = "#313338"
        WinAll[i].style.borderColor = "#313338"
    }

    for (let i = 0; i < BoxAll.length; i++) {
        BoxAll[i].style.borderColor = "#000"
    }
    //change symbole color
    for (let i = 0; i < boxState.length; i++) {
        if (boxState[i] == "R") {
            All[i].innerHTML = assets[2]
        }
        else if (boxState[i] == "C") {
            All[i].innerHTML = assets[0]
        }

    }
}

function switchMode() {
    darkMode = JSON.parse(darkMode)

    if (darkMode == false) {
        darkMode = !darkMode
        localStorage.setItem("darkMode", darkMode)
        setDark()

    }
    else {
        darkMode = !darkMode
        localStorage.setItem("darkMode", darkMode)
        setLight()


    }
}

function setScore() {
    scoreO.innerHTML = "O: " + scoreSave.o
    scoreX.innerHTML = "X: " + scoreSave.x
}
darkMode = JSON.parse(darkMode)

if (darkMode == false) {
    moon.style.display = "inline"
    setLight()
}

if (darkMode == true) {
    sun.style.display = "inline"
    setDark()
}

setScore()




if (localStorage.getItem("assets") == undefined) {
    getAssets()
}
else{
    assets = JSON.parse(localStorage.getItem("assets"))
    console.log(assets);
}


console.log("Never Gonna give you up never gonna let you down...")
var test2 = 0
test.addEventListener('click', () => {

    xhr.open('GET', "https://google.com")
    xhr.send()
})

