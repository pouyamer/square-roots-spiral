const { sqrt, PI, tan, atan, sin, cos, abs } = Math
const canvas = document.querySelector(".canvas")
const ctx = canvas.getContext("2d")

const input = document.querySelector(".input")

const {
  toggleDraw: toggleDrawLineFromSpiralPointsToCenter,
  color: lineFromSpiralPointsToCenterColor,
  lineWidth: lineFromSpiralPointsToCenterLineWidth
} = config.lines.fromSpiralPointsToCenter

const {
  toggleDraw: toggleDrawLineBetweenSpiralPoints,
  color: lineBetweenSpiralPointsColor,
  lineWidth: lineBetweenSpiralPointsLineWidth
} = config.lines.betweenSpiralPoints

const {
  backgroundColor: canvasBackgroundColor,
  size: canvasSize,
  multiplier: canvasMultiplier
} = config.canvas

const { pointsCount, startPositive } = config.squareRootsSpiral
canvas.width = canvasSize.width
canvas.height = canvasSize.height

class Point {
  constructor(x, y) {
    this.x = x
    this.y = y
    // canvas x and y:
    this.canvasX = x * canvasMultiplier + canvasSize.width / 2
    this.canvasY = -y * canvasMultiplier + canvasSize.height / 2
  }

  drawLineTo(nextPoint) {
    ctx.beginPath()
    ctx.moveTo(this.canvasX, this.canvasY)
    ctx.lineTo(nextPoint.canvasX, nextPoint.canvasY)
    ctx.stroke()
  }
}

const findXsignBasedOnAngle = angle =>
  startPositive ? (cos(angle) >= 0 ? 1 : -1) : cos(angle) >= 0 ? -1 : 1
const findYsignBasedOnAngle = angle =>
  startPositive
    ? (angle % PI) / 2 < PI / 2
      ? 1
      : -1
    : (angle % PI) / 2 < PI / 2
    ? -1
    : +1

const pointFromCenter = (distance, angle) => {
  const xSign = findXsignBasedOnAngle(angle)
  const ySign = findYsignBasedOnAngle(angle)
  const X = (xSign * distance) / sqrt(1 + tan(angle) * tan(angle))
  const Y = ySign * tan(angle) * X
  return new Point(X, Y)
}

const determineAngle = iteration => {
  const angle = [...Array(iteration)]
    .map((_, i) => abs(atan(1 / sqrt(i + 1))))
    .reduce((acc, curr) => acc + curr, 0)
  return angle
}

const draw = iteration => {
  const center = new Point(0, 0)
  const numArray = [...Array(iteration)].map((_, i) => i)

  // connect each point to the center
  ctx.strokeStyle = lineFromSpiralPointsToCenterColor
  ctx.lineWidth = lineFromSpiralPointsToCenterLineWidth
  toggleDrawLineFromSpiralPointsToCenter &&
    numArray.forEach(num => {
      const angle = determineAngle(num)
      const point = pointFromCenter(sqrt(num + 1), angle)
      point.drawLineTo(center)
    })

  // connect each points to next one
  ctx.strokeStyle = lineBetweenSpiralPointsColor
  ctx.lineWidth = lineBetweenSpiralPointsLineWidth
  toggleDrawLineBetweenSpiralPoints &&
    numArray.forEach((_, i) => {
      if (i === numArray.length - 1) return
      const point = pointFromCenter(sqrt(i + 1), determineAngle(i))

      point.drawLineTo(pointFromCenter(sqrt(i + 2), determineAngle(i + 1)))
    })
}

input.addEventListener("input", e => {
  ctx.fillStyle = canvasBackgroundColor
  ctx.fillRect(0, 0, canvasSize.height, canvasSize.width)
  draw(parseInt(e.target.value))
})

document.addEventListener("mousemove", () => {
  input.focus()
})

// Initialize:
ctx.fillStyle = canvasBackgroundColor
ctx.fillRect(0, 0, canvasSize.width, canvasSize.height)
input.value = pointsCount
draw(parseInt(pointsCount))
input.focus()

// Square Roots Spiral
// Made by: @pouyamer
// date: 2021-03-12
// Language: javascript
