import { useCallback, useEffect, useRef, useState } from "react"

export default function useIsMounted() {
    const isMounted = useRef(false)
  
    useEffect(() => {
      isMounted.current = true
  
      return () => {
        isMounted.current = false
      }
    }, [])
  
    return useCallback(() => isMounted.current, [])
}
  
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

function Child() {
  const [data, setData] = useState('loading')
  const isMounted = useIsMounted()

  // simulate an api call and update state
  useEffect(() => {
    void delay(3000).then(() => {
      if (isMounted()) setData('OK')
    })
  }, [isMounted])

  return <p>{data}</p>
}

function Component() {
  const [isVisible, setVisible] = useState<boolean>(false)

  const toggleVisibility = () => setVisible(state => !state)

  return (
    <>
      <button onClick={toggleVisibility}>{isVisible ? 'Hide' : 'Show'}</button>

      {isVisible && <Child />}
    </>
  )
}