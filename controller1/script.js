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
