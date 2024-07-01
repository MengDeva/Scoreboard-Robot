let totalScore = 0
const colorPoints = {
  none: 0,
  red: 30,
  blue: 30,
}

function changeColor(columnId, color) {
  const column = document.getElementById(columnId)
  const circles = column.getElementsByClassName('circle')

  for (let circle of circles) {
    if (circle.dataset.color === 'none') {
      updateCircle(circle, color)
      break
    }
  }
}

function updateCircle(circle, color) {
  const currentColor = circle.dataset.color
  const points = colorPoints[color]
  const currentPoints = colorPoints[currentColor]

  // Update circle properties
  circle.dataset.color = color
  circle.dataset.points = points
  circle.style.backgroundColor = color
  circle.textContent = points

  // Update total score
  totalScore = totalScore - currentPoints + points
  updateTotalScore()
}

function undoColor(circleId) {
  const circle = document.getElementById(circleId)
  const currentColor = circle.dataset.color
  const points = colorPoints[currentColor]

  // Reset circle properties
  circle.dataset.color = 'none'
  circle.dataset.points = 0
  circle.style.backgroundColor = '#eee'
  circle.textContent = '0'

  // Update total score
  totalScore -= points
  updateTotalScore()
}

function updateTotalScore() {
  document.getElementById('total-score').textContent = totalScore
}

document.addEventListener('DOMContentLoaded', function () {
  // Harvesting Points
  let harvestingTeam1Score = 0
  let harvestingTeam2Score = 0

  document.getElementById('harvesting-minus-team1').addEventListener('click', function () {
    if (harvestingTeam1Score > 0) harvestingTeam1Score--
    updateScore('harvesting-score-team1', harvestingTeam1Score)
    updateTotalScore()
  })

  document.getElementById('harvesting-plus-team1').addEventListener('click', function () {
    harvestingTeam1Score++
    updateScore('harvesting-score-team1', harvestingTeam1Score)
    updateTotalScore()
  })

  document.getElementById('harvesting-minus-team2').addEventListener('click', function () {
    if (harvestingTeam2Score > 0) harvestingTeam2Score--
    updateScore('harvesting-score-team2', harvestingTeam2Score)
    updateTotalScore()
  })

  document.getElementById('harvesting-plus-team2').addEventListener('click', function () {
    harvestingTeam2Score++
    updateScore('harvesting-score-team2', harvestingTeam2Score)
    updateTotalScore()
  })

  // Planting Points
  let plantingTeam1Score = 0
  let plantingTeam2Score = 0

  document.getElementById('planting-minus-team1').addEventListener('click', function () {
    if (plantingTeam1Score > 0) plantingTeam1Score--
    updateScore('planting-score-team1', plantingTeam1Score)
    updateTotalScore()
  })

  document.getElementById('planting-plus-team1').addEventListener('click', function () {
    plantingTeam1Score++
    updateScore('planting-score-team1', plantingTeam1Score)
    updateTotalScore()
  })

  document.getElementById('planting-minus-team2').addEventListener('click', function () {
    if (plantingTeam2Score > 0) plantingTeam2Score--
    updateScore('planting-score-team2', plantingTeam2Score)
    updateTotalScore()
  })

  document.getElementById('planting-plus-team2').addEventListener('click', function () {
    plantingTeam2Score++
    updateScore('planting-score-team2', plantingTeam2Score)
    updateTotalScore()
  })

  function updateScore(elementId, score) {
    document.getElementById(elementId).textContent = score
  }

  function updateTotalScore() {
    let team1TotalScore = (harvestingTeam1Score + plantingTeam1Score) * 10
    let team2TotalScore = (harvestingTeam2Score + plantingTeam2Score) * 10
    localStorage.setItem('team1TotalScore', team1TotalScore)
    localStorage.setItem('team2TotalScore', team2TotalScore)
  }
})
