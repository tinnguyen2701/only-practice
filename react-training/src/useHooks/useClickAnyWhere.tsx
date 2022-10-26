import { useState } from "react"
import useEventListener from "./useEventListener"

type Handler = (event: MouseEvent) => void

function useClickAnyWhere(handler: Handler) {
  useEventListener('click', event => {
    handler(event)
  })
}

export default useClickAnyWhere

export function Component() {
    const [count, setCount] = useState(0)
  
    useClickAnyWhere(() => {
      setCount(prev => prev + 1)
    })
  
    return <p>Click count: {count}</p>
}