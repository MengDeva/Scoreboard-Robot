document.addEventListener('DOMContentLoaded', function () {
  const startGameButton = document.getElementById('start-game-button')
  const timerDisplay = document.querySelector('.countdown-timer')
  const gameNumberDisplay = document.getElementById('game-number')
  const prevButton = document.getElementById('game-prev')
  const nextButton = document.getElementById('game-next')
  const appealButton = document.getElementById('appeal-button')
  const resetAllButton = document.getElementById('reset-all-button')

  let gameNumber = 1
  let gameCountdownInterval
  let appealCountdownInterval

  function updateGameNumberDisplay() {
    gameNumberDisplay.textContent = `Game ${gameNumber}`
  }

  prevButton.addEventListener('click', function () {
    if (gameNumber > 1) {
      gameNumber--
      updateGameNumberDisplay()
    }
  })

  nextButton.addEventListener('click', function () {
    gameNumber++
    updateGameNumberDisplay()
  })

  startGameButton.addEventListener('click', function () {
    startCountdown(3)
  })

  appealButton.addEventListener('click', function () {
    startAppealCountdown(30)
  })

  resetAllButton.addEventListener('click', function () {
    resetAll()
  })

  function startCountdown(seconds) {
    timerDisplay.textContent = seconds

    const countdownInterval = setInterval(() => {
      if (seconds <= 0) {
        clearInterval(countdownInterval)
        timerDisplay.textContent = '---'
        startGame(gameNumber)
      } else {
        seconds--
        timerDisplay.textContent = seconds
      }
    }, 1000)
  }

  function startAppealCountdown(seconds) {
    clearInterval(gameCountdownInterval) // Pause the game countdown
    timerDisplay.textContent = seconds

    appealCountdownInterval = setInterval(() => {
      if (seconds <= 0) {
        clearInterval(appealCountdownInterval)
        timerDisplay.textContent = '---'
        startGameDurationCountdown(remainingTime) // Resume the game countdown
      } else {
        seconds--
        timerDisplay.textContent = seconds
      }
    }, 1000)
  }

  function resetAll() {
    clearInterval(gameCountdownInterval)
    clearInterval(appealCountdownInterval)
    timerDisplay.textContent = '---'
    gameNumber = 1 // Reset to the first game
    updateGameNumberDisplay()
    // Reset other game elements as needed
  }

  function startGame(gameNumber) {
    console.log(`Starting Game ${gameNumber}`)

    switch (gameNumber) {
      case 1:
        startGame1()
        break
      case 2:
        startGame2()
        break
      case 3:
        startGame3()
        break
      // Add more cases for additional games
      default:
        console.log('Unknown game number')
    }
  }

  function startGame1() {
    console.log('Game 1 logic here')
    startGameDurationCountdown(180) // Example 180 seconds countdown for Game 1
  }

  function startGame2() {
    console.log('Game 2 logic here')
    startGameDurationCountdown(120) // Example 120 seconds countdown for Game 2
  }

  function startGame3() {
    console.log('Game 3 logic here')
    startGameDurationCountdown(150) // Example 150 seconds countdown for Game 3
  }

  function startGameDurationCountdown(seconds) {
    let remainingTime = seconds

    gameCountdownInterval = setInterval(() => {
      if (remainingTime <= 0) {
        clearInterval(gameCountdownInterval)
        console.log("Time's up!")
        timerDisplay.textContent = '---'
        gameNumber++ // Move to the next game
        updateGameNumberDisplay()
        if (gameNumber > 3) {
          // Reset to the first game if it exceeds the total number of games
          gameNumber = 1
        }
        startCountdown(3) // Start the next game after the countdown
      } else {
        remainingTime--
        updateTimerDisplay(timerDisplay, remainingTime)
      }
    }, 1000)
  }

  function updateTimerDisplay(timerDisplay, time) {
    timerDisplay.textContent = time
  }

  // Initialize the game number display
  updateGameNumberDisplay()
})

document.querySelectorAll('.color-button').forEach((button) => {
  button.addEventListener('click', () => {
    const color = button.getAttribute('data-color')
    const circles = button.closest('.flex-col').querySelectorAll('.circle')
    for (let i = circles.length - 1; i >= 0; i--) {
      if (!circles[i].style.backgroundColor) {
        circles[i].style.backgroundColor = color
        checkResetButtonState()
        break
      }
    }
  })
})

document.querySelectorAll('.reset-button').forEach((button) => {
  button.addEventListener('click', () => {
    const circle = button.previousElementSibling
    circle.style.backgroundColor = ''
    checkResetButtonState()
  })
})

function checkResetButtonState() {
  document.querySelectorAll('.reset-button').forEach((button) => {
    const circle = button.previousElementSibling
    if (circle.style.backgroundColor) {
      button.disabled = false
      button.classList.remove('text-gray-500')
      button.classList.add('text-gray-900')
    } else {
      button.disabled = true
      button.classList.remove('text-gray-900')
      button.classList.add('text-gray-500')
    }
  })
}

// Initial check to disable/enable reset buttons based on initial state
checkResetButtonState()
