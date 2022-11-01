import { EffectCallback, useEffect, useState } from 'react'

function useEffectOnce(effect: EffectCallback) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effect, [])
}

export default useEffectOnce

function Component() {
    const [data, setData] = useState<number>(0)
    useEffect(() => {
      console.log('Normal useEffect', { data })
    }, [data])
  
    useEffectOnce(() => {
      console.log('Triggered only once, on mount', { data })
    })
  
    return (
      <div>
        <p>Open your console</p>
        <button onClick={() => setData(Date.now())}>Update data</button>
      </div>
    )
}