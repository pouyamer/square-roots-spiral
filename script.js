const { sqrt, PI, tan, atan, sin, cos, abs } = Math
const canvas = document.querySelector(".canvas")
const ctx = canvas.getContext("2d")

const input = document.querySelector(".input")
const canvasMultiplier = innerHeight / 20

const canvasSize = {
  height: innerHeight,
  width: innerWidth
}
canvas.width = canvasSize.width
canvas.height = canvasSize.height

class Point {
  constructor(x, y) {
    this.x = x
    this.y = y
    // canvas x and y:
    this.cX = x * canvasMultiplier + canvasSize.width / 2
    this.cY = -y * canvasMultiplier + canvasSize.height / 2
  }
}

const drawLine = (p1, p2) => {
  ctx.beginPath()
  ctx.moveTo(p1.cX, p1.cY)
  ctx.lineTo(p2.cX, p2.cY)
  ctx.stroke()
}

const findXsignBasedOnAngle = angle => (cos(angle) >= 0 ? 1 : -1)

const findYsignBasedOnAngle = angle => ((angle % PI) / 2 < PI / 2 ? 1 : -1)

const pointFromCenter = (distance, angle) => {
  const xSign = findXsignBasedOnAngle(angle)
  const ySign = findYsignBasedOnAngle(angle)
  const X = (xSign * distance) / sqrt(1 + tan(angle) * tan(angle))
  const Y = ySign * tan(angle) * X
  //   console.log({ X, Y })
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
  numArray.forEach(num => {
    const angle = determineAngle(num)
    const point = pointFromCenter(sqrt(num + 1), angle)
    drawLine(center, point)
  })

  // connect each points to next one
  numArray.forEach((_, i) => {
    if (i === numArray.length - 1) return
    const point = pointFromCenter(sqrt(i + 1), determineAngle(i))
    drawLine(point, pointFromCenter(sqrt(i + 2), determineAngle(i + 1)))
  })
}

input.addEventListener("input", () => {
  ctx.clearRect(0, 0, canvasSize.width, canvasSize.height)
  const num = parseInt(input.value)
  draw(num)
})

document.body.addEventListener("mousemove", () => {
  input.focus()
})

// Initialize:
draw(parseInt(input.value))
input.focus()

// Square Roots Spiral
// Made by: @pouyamer
// date: 2021-03-12
// Language: javascript
