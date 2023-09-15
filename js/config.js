const config = {
  canvas: {
    size: {
      height: innerHeight,
      width: innerWidth
    },
    multiplier: 24,
    backgroundColor: "wheat"
  },
  lines: {
    fromSpiralPointsToCenter: {
      lineWidth: 1,
      toggleDraw: true,
      color: "hsl(20,70%,25%)"
    },
    betweenSpiralPoints: {
      lineWidth: 1,
      toggleDraw: true,
      color: "hsl(20,70%,60%)"
    }
  },
  squareRootsSpiral: {
    pointsCount: 16,
    startPositive: false
  }
}
