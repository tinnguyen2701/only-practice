import { CSSProperties, useEffect, useState } from "react"
import { useIsomorphicLayoutEffect } from "./useIsomorphicLayoutEffect "

type UseLockedBodyOutput = [boolean, (locked: boolean) => void]

function useLockedBody(
  initialLocked = false,
  rootId = '___gatsby', // Default to `___gatsby` to not introduce breaking change
): UseLockedBodyOutput {
  const [locked, setLocked] = useState(initialLocked)

  // Do the side effect before render
  useIsomorphicLayoutEffect(() => {
    if (!locked) {
      return
    }

    // Save initial body style
    const originalOverflow = document.body.style.overflow
    const originalPaddingRight = document.body.style.paddingRight

    // Lock body scroll
    document.body.style.overflow = 'hidden'

    // Get the scrollBar width
    const root = document.getElementById(rootId) // or root
    const scrollBarWidth = root ? root.offsetWidth - root.scrollWidth : 0

    // Avoid width reflow
    if (scrollBarWidth) {
      document.body.style.paddingRight = `${scrollBarWidth}px`
    }

    return () => {
      document.body.style.overflow = originalOverflow

      if (scrollBarWidth) {
        document.body.style.paddingRight = originalPaddingRight
      }
    }
  }, [locked])

  // Update state if initialValue changes
  useEffect(() => {
    if (locked !== initialLocked) {
      setLocked(initialLocked)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialLocked])

  return [locked, setLocked]
}

export default useLockedBody


const fixedCenterStyle: CSSProperties = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  }
  
  const fakeScrollableStyle: CSSProperties = {
    minHeight: '150vh',
    background: 'linear-gradient(palegreen, palegoldenrod, palevioletred)',
  }
  
  // Example 1: useLockedBody as useState()
  export function App1() {
    const [locked, setLocked] = useLockedBody(false, 'root')
  
    const toggleLocked = () => {
      setLocked(!locked)
    }
  
    return (
      <div style={fakeScrollableStyle}>
        <button style={fixedCenterStyle} onClick={toggleLocked}>
          {locked ? 'unlock scroll' : 'lock scroll'}
        </button>
      </div>
    )
}
  
  // Example 2: useLockedBody with our custom state
export function App2() {
    const [locked, setLocked] = useState(false)

    const toggleLocked = () => {
        setLocked(!locked)
    }

    useLockedBody(locked, 'root')

    return (
        <div style={fakeScrollableStyle}>
        <button style={fixedCenterStyle} onClick={toggleLocked}>
            {locked ? 'unlock scroll' : 'lock scroll'}
        </button>
        </div>
    )
}