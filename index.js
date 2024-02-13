//All variables

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
    console.log("test");
    darkMode = false
    localStorage.setItem("darkMode", darkMode)
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
var IC1 = document.getElementById("IC1");
var IC2 = document.getElementById("IC2");
var IC3 = document.getElementById("IC3");
var IC4 = document.getElementById("IC4");



//Middles
var M1 = document.getElementById("M1");
var M2 = document.getElementById("M2");
var M3 = document.getElementById("M3");
var M4 = document.getElementById("M4");
//images
var IM1 = document.getElementById("IM1");
var IM2 = document.getElementById("IM2");
var IM3 = document.getElementById("IM3");
var IM4 = document.getElementById("IM4");


//Center
var center = document.getElementById("C");
//images
var Icenter = document.getElementById("IC");

var IAll = [
    Icenter,
    IC1, IC2, IC3, IC4,
    IM1, IM2, IM3, IM4
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


//string to bollean converter
function strToBool(str) {
    if (str == "false") {
        str = false
        return str
    }
    else if (str == "true") {
        str = true
        return str
    }
    else if (str == true || str == false) {
        return str
    }
    else {
        return "error"
    }
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
    for (let i = 0; i < IAll.length; i++) {
        IAll[i].src = ""
    }
}

function played(strBox, varBox) {
    var position = 0
    var splitedBox = strBox.split("")
    if (winFound == false) {
        if (strBox == "Icenter") {

            checkIfPlayed(position, varBox)
        }

        else if (splitedBox[1] == "M") {

            position = 4 + +splitedBox[2]

            checkIfPlayed(position, varBox)
        }
        else if (splitedBox[1] == "C") {

            position = +splitedBox[2]
            checkIfPlayed(position, varBox)

        }

    }
}

// Check if the box is played or not and draw a cross or a ring
function checkIfPlayed(pos, varBox) {

    if (boxState[pos] == false) {
        round++
        if (roundToCross == true) {


            if (darkMode == false) {
                varBox.src = "./assets/cross.svg"
            }
            else {
                varBox.src = "./assets/crossWhite.svg"
            }
            boxState[pos] = "C"
            roundToCross = !roundToCross
            checkWins()

        }
        else {

            if (darkMode == false) {
                varBox.src = "./assets/ring.svg"
            }
            else {
                varBox.src = "./assets/ringWhite.svg"

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
                }
                else if (boxState[X] == "R") {
                    WinO.style.display = "inline"
                }
            }
        }
        whichSide++;
    }

    if (round >= 9 && winFound == false) {
        ega.style.display = "inline";
    };

};


C1.addEventListener('click', () => {
    played("IC1", IC1);
});

C2.addEventListener('click', () => {
    played("IC2", IC2);
});

C3.addEventListener('click', () => {
    played("IC3", IC3);
});

C4.addEventListener('click', () => {
    played("IC4", IC4);
});

M1.addEventListener('click', () => {
    played("IM1", IM1);
});

M2.addEventListener('click', () => {
    played("IM2", IM2);
});

M3.addEventListener('click', () => {
    played("IM3", IM3);
});

M4.addEventListener('click', () => {
    played("IM4", IM4);
});

center.addEventListener('click', () => {
    played("Icenter", Icenter);
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


function setDark() {
    moon.style.display = "none"
    sun.style.display = "inline"
    body.style.backgroundColor = "#313338"
    reset.style.backgroundColor = "#FFF"
    reset.style.color = "#313338"
    githubLogo.src = "./assets/github-mark-white.svg"
    for (let i = 0; i < WinAll.length; i++) {
        WinAll[i].style.backgroundColor = "#FFF"
        WinAll[i].style.borderColor = "#FFF"
        WinO.style.color = "#FFF"
        WinO.style.backgroundColor = "#313338"
        WinX.style.color = "#FFF"
        WinX.style.backgroundColor = "#313338"
    }

    for (let i = 0; i < BoxAll.length; i++) {
        BoxAll[i].style.borderColor = "#FFF"
    }

    for (let i = 0; i < boxState.length; i++) {
        if (boxState[i] == "R") {
            IAll[i].src = "./assets/ringWhite.svg"

        }
        else if (boxState[i] == "C") {
            IAll[i].src = "./assets/crossWhite.svg"
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
    for (let i = 0; i < WinAll.length; i++) {
        WinAll[i].style.backgroundColor = "#000"
        WinAll[i].style.borderColor = "#000"
        WinO.style.color = "#313338"
        WinO.style.backgroundColor = "#FFF"
        WinX.style.color = "#313338"
        WinX.style.backgroundColor = "#FFF"
    }


    for (let i = 0; i < BoxAll.length; i++) {
        BoxAll[i].style.borderColor = "#000"
    }
    //change symbole color
    for (let i = 0; i < boxState.length; i++) {
        if (boxState[i] == "R") {
            IAll[i].src = "./assets/ring.svg"
        }
        else if (boxState[i] == "C") {
            IAll[i].src = "./assets/cross.svg"
        }

    }
}

function switchMode() {
    darkMode = strToBool(darkMode)

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
darkMode = strToBool(darkMode)

if (darkMode == false) {
    moon.style.display = "inline"
    setLight()
}

if (darkMode == true) {
    sun.style.display = "inline"
    setDark()
}


test = !!localStorage.getItem("darkMode")
test2 = localStorage.getItem("darkMode")


console.log("Never Gonna give you up never gonna let you down...")