import { createSignal, onMount } from 'solid-js'
import './App.css'

export const App = () => {
  const [isPainting, setIsPainting] = createSignal(false)
  let canvas: HTMLCanvasElement

  function handleStartPositon(event: MouseEvent) {
    setIsPainting(true)
    draw(event)
  }

  function handleFinishedPosition() {
    setIsPainting(false)
    const context = canvas.getContext('2d')
    context.beginPath()
  }

  function draw(event: MouseEvent) {
    if (!isPainting()) {
      return
    }

    const context = canvas.getContext('2d')

    context.lineWidth = 5
    context.lineCap = 'round'

    context.lineTo(event.clientX, event.clientY)
    context.stroke()
    context.beginPath()
    context.moveTo(event.clientX, event.clientY)
  }

  onMount(() => {
    canvas.height = window.innerHeight
    canvas.width = window.innerWidth

    canvas.addEventListener('mousedown', handleStartPositon)
    canvas.addEventListener('mouseup', handleFinishedPosition)
    canvas.addEventListener('mousemove', draw)
  })

  return (
    <main class="main">
      <canvas class="canvas" ref={canvas} />
    </main>
  )
}
