// * Add functionality so that you can click on a player to selct that number
// * Update highlighting of formation boxes
// * Add responsiveness with media queries
// ? Formation divs should grow as required when screen gets smaller
// * Work out how to be able to remove Subs
// * Make subs list have spaces after commas
// * Be able to click on the word Subs to add subs
// TODO Be able to remove names by hovering over them and clicking an X - a bit complex, and extremely complex for the subs
// TODO Automatically remove someone from subs if they are added to the pitch...and then put the person who was removed from the pitch onto the subs bench?


// ! Formation selection

let f442 = document.querySelectorAll('.f442');
let form442 = document.querySelector('.form442');
let f2323 = document.querySelectorAll('.f2323');
let form2323 = document.querySelector('.form2323');
let formations = document.querySelectorAll('.form');
let f31213 = document.querySelectorAll('.f31213')
let form31213 = document.querySelector('.form31213')
let players = document.querySelectorAll('.player')

// ? Loading the page
if (localStorage.getItem('currentFormation') != null) {
let currentFormation = localStorage.getItem('currentFormation');}

let functions = {
    fm2323: function () {
        f2323.forEach((e) => {
            e.classList.add('show');
        });
        form2323.classList.add('selected');
    },
    fm442: function () {
        f442.forEach((e) => {
            e.classList.add('show');
        });
        form442.classList.add('selected');
    },
    fm31213: function () {
        f31213.forEach((e) => {
            e.classList.add('show');
        });
        form31213.classList.add('selected');
    }
}

functions[currentFormation]();

// ? Selecting formations
form2323.addEventListener('click', () => {
    players.forEach((e) => {
        e.classList.remove('show')
    });
    f2323.forEach((e) => {
        e.classList.add('show');
    });
    formations.forEach((e) => {
        e.classList.remove('selected')
    });
    form2323.classList.add('selected');
    localStorage.setItem('currentFormation', 'fm2323');
})

form442.addEventListener('click', () => {
    players.forEach((e) => {
        e.classList.remove('show')
    });
    f442.forEach((e) => {
        e.classList.add('show')
    });
    formations.forEach((e) => {
        e.classList.remove('selected')
    });
    form442.classList.add('selected');
    localStorage.setItem('currentFormation', 'fm442');
})

form31213.addEventListener('click', () => {
    players.forEach((e) => {
        e.classList.remove('show')
    });
    f31213.forEach((e) => {
        e.classList.add('show')
    });
    formations.forEach((e) => {
        e.classList.remove('selected')
    });
    form31213.classList.add('selected');
    localStorage.setItem('currentFormation', 'fm31213');
})

// ! Clicking on players to select player number

let playerNumber = document.querySelector('#PlayerNumber');

players.forEach((e) => {
    e.addEventListener('click', () => {
        let pn = Number(e.classList[2].slice(1));
        playerNumber.value = pn;
    })
})

let subBox = document.querySelector('.subs');

subBox.addEventListener('click', () => {
    playerNumber.value = 'sub';
})

// ! Player names

let params = new URLSearchParams(location.search);
let currentNumber = params.get('PlayerNumber');
let currentName = params.get('PlayerName');
let submitType = params.get('Submit');
let subsList = document.querySelector('.subsList');

let subs = [];

let subsStr = localStorage.getItem('Subs');
if (subsStr != null && subsStr != "") {
    subs = subsStr.split(',');
}

if (submitType == 'Add') {
    if (currentNumber == 'sub') {
        if (subs.includes(currentName)) { }
        else {
            subs.push(currentName)
            localStorage.setItem('Subs', subs)
        }
    } else {
        localStorage.setItem('Player' + currentNumber, currentName);
        if (subs.includes(currentName)) {
            subs.splice(subs.indexOf(currentName), 1);
            localStorage.setItem('Subs', subs);
        }
    };
} else if (submitType == 'Remove') {
    if (currentNumber == 'sub') {
        if (currentName == "") {
            localStorage.removeItem('Subs');
            subs = [];
        }
        if (subs.length == 1) {
            localStorage.removeItem('Subs');
        };
        if (subs.includes(currentName)) {
            subs.splice(subs.indexOf(currentName), 1);
            localStorage.setItem('Subs', subs);
        } else { }
    } else {
        localStorage.removeItem('Player' + currentNumber)
    }
} else { }

players.forEach((e) => {
    let name = e.querySelector('.name');
    let pn = e.classList[2].slice(1);
    let playerNumber = 'Player' + pn;
    name.innerHTML = localStorage.getItem(playerNumber);
});

let subsDisplay = subs.join(', ');
subsList.innerHTML = subsDisplay;
