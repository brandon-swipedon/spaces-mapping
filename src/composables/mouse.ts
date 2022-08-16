import { ref } from 'vue'
import { useEventListener } from './event'

export function useMouse() {
  const x = ref(0)
  const y = ref(0)
  const mouseDown = ref(false)

  useEventListener(window, 'mousemove', (event) => {
    x.value = (event as MouseEvent).pageX
    y.value = (event as MouseEvent).pageY
  })

  useEventListener(window, 'mousedown', (event) => {
    const mouseEvent = event as MouseEvent;
    if (mouseEvent.button === 0) {
      mouseDown.value = true;
    }
  })

  useEventListener(window, 'mouseup', (event) => {
    const mouseEvent = event as MouseEvent;
    if (mouseEvent.button === 0) {
      mouseDown.value = false;
    }
  })

  return { x, y, mouseDown }
}