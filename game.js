const canvas = document.querySelector('#game')
const game = canvas.getContext('2d')
const btnUp = document.getElementById('up')
const btnLeft = document.getElementById('left')
const btnRight = document.getElementById('right')
const btnDown = document.getElementById('down')
const spanLives = document.getElementById('lives')
const spanTime = document.getElementById('time')
const spanRecord = document.getElementById('record')
const pResult = document.getElementById('result')

let canvasSize;
let elementsSize;
let level = 0
let lives = 3

let timeStart
let timePlayer
let timeInterval

const playerPosition = {
    x: undefined,
    y: undefined,
}

const giftPosition = {
    x: undefined,
    y: undefined,
}

let enemyPosition = []

window.addEventListener('load', setCanvasSize)
window.addEventListener('resize', setCanvasSize)


function setCanvasSize() {
    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.7
    } else {
        canvasSize = window.innerHeight * 0.7
    }

    canvasSize = Math.max(500, canvasSize)
    canvasSize = Math.min(350, canvasSize)
    canvasSize = Number(canvasSize.toFixed(0))

    canvas.setAttribute('width', canvasSize)
    canvas.setAttribute('height', canvasSize)

    elementsSize = canvasSize / 10

    playerPosition.x = undefined
    playerPosition.y = undefined
    startGame()
}

function startGame() { 
    console.log({elementsSize, canvasSize})

    game.font = elementsSize + 'px verdana'
    game.textAlign = 'end'

    const map = maps[level];

    if (!map) {
        gameWin()
        return
    }

    if (!timeStart) {
        timeStart = Date.now()
        timeInterval = setInterval(showTime, 100)
        showRecord()
    }

    const mapRows = map.trim().split('\n')
    const mapRowCols = mapRows.map(row => row.trim().split(''))
    console.log(map, mapRows, mapRowCols)

    showLives()

    enemyPosition = []
    game.clearRect(0, 0, canvasSize, canvasSize)

    mapRowCols.forEach((row, rowI)  => {
        row.forEach((col, colI)=> {
            const emoji = emojis[col]
            const posX = elementsSize * (colI + 1)
            const posY = elementsSize * (rowI + 1)

            if (col == 'O') {
                if (!playerPosition.x && !playerPosition.y) {
                    playerPosition.x = posX
                    playerPosition.y = posY
                    console.log({playerPosition})
                }
            } else if (col == "I"){
                giftPosition.x = posX
                giftPosition.y = posY
            } else if (col == 'X') {
                enemyPosition.push({
                    x: posX,
                    y: posY
                })
            }

            game.fillText(emoji, posX, posY)
        })
    });

    moverPlayer()
}

function moverPlayer() {
    const giftCollisionX = Math.abs(playerPosition.x - giftPosition.x) < 0.01
    const giftCollisionY = Math.abs(playerPosition.y - giftPosition.y) < 0.01
    const giftCollision =  giftCollisionX && giftCollisionY

    if (giftCollision) {
        levelWin()
    }

    const enemyCollision = enemyPosition.find(enemy => {
        const enemyCollisionX = Math.abs(enemy.x - playerPosition.x) < 0.01
        const enemyCollisionY = Math.abs(enemy.y - playerPosition.y) < 0.01
        return enemyCollisionX && enemyCollisionY
    })

    if (enemyCollision) {
        levelFail()
    }

    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y)
}

function levelWin() {
    console.log('Subistes de nivel')
    level++;
    startGame()
}

function levelFail() {
    console.log('Chocastes con un enemigo :(')
    lives--

    console.log(lives)
    if (lives <= 0) {
        level = 0
        lives = 3
        timeStart = undefined
    }
    playerPosition.x = undefined;
    playerPosition.y = undefined;
    startGame()
}

// RECORDS
function gameWin() {
    clearInterval(timeInterval)
    console.log('Terminastes el juego')
    
    const recordTime = localStorage.getItem('record_time')
    const playerTime = Date.now() - timeStart

    if (recordTime) {
        if (recordTime >= playerTime) {
            localStorage.setItem('record_time', playerTime)
            pResult.innerHTML ='🎉 SUPERASTES EL RECORD 🎉!!!!'
        } else {
            pResult.innerHTML ='Lo siento, no superastes el record 😫😓'
        }
    } else {
        localStorage.setItem('record_time', playerTime)
        pResult.innerHTML ='Primera vez😅? Muy bien, ahora trata de superar tu record'
    }


    console.log({recordTime, playerTime})
}

function showLives() {
    const heartsArray = Array(lives).fill(emojis['HEART'])

    spanLives.innerHTML = ''
    heartsArray.forEach(heart => spanLives.append(heart))
}

function showTime() {
    spanTime.innerHTML = Date.now() - timeStart
}

function showRecord() {
    spanRecord.innerHTML = localStorage.getItem('record_time')
}




window.addEventListener('keydown', moveByKeys)
btnUp.addEventListener('click', moveUp)
btnLeft.addEventListener('click', moveLeft)
btnRight.addEventListener('click', moveRight)
btnDown.addEventListener('click', moveDown)

function moveByKeys(event) {
    if (event.key =='ArrowUp') moveUp()
    else if (event.key =='ArrowLeft')moveLeft()
    else if (event.key =='ArrowRight')moveRight()
    else if (event.key =='ArrowDown')moveDown()
}

function moveUp() {
    console.log('Me quiero mover hacia arriba')

    if ((playerPosition.y - elementsSize) < elementsSize) {
        console.log('OUT')
    } else {
        playerPosition.y -= elementsSize
        startGame()
    }
}

function moveLeft() {
    console.log('Me quiero mover hacia la izquierda')
   
    if ((playerPosition.x - elementsSize) < elementsSize) {
        console.log('OUT')
    } else {
        playerPosition.x -= elementsSize
        startGame()
    }
}

function moveRight() {
    console.log('Me quiero mover hacia la derecha')
    
    if ((playerPosition.x + elementsSize) > canvasSize) {
        console.log('OUT')
    } else {
        playerPosition.x += elementsSize
        startGame()
    }
}

function moveDown() {
    console.log('Me quiero mover hacia abajo')
    
   if ((playerPosition.y + elementsSize) > canvasSize) {
        console.log('OUT')
    } else {
        playerPosition.y += elementsSize
        startGame()
    }
}