import { Fragment, useCallback, useState } from "react"

export type MapOrEntries<K, V> = Map<K, V> | [K, V][]

// Public interface
export interface Actions<K, V> {
  set: (key: K, value: V) => void
  setAll: (entries: MapOrEntries<K, V>) => void
  remove: (key: K) => void
  reset: Map<K, V>['clear']
}

// We hide some setters from the returned map to disable autocompletion
type Return<K, V> = [Omit<Map<K, V>, 'set' | 'clear' | 'delete'>, Actions<K, V>]

function useMap<K, V>(
  initialState: MapOrEntries<K, V> = new Map(),
): Return<K, V> {
  const [map, setMap] = useState(new Map(initialState))

  const actions: Actions<K, V> = {
    set: useCallback((key, value) => {
      setMap(prev => {
        const copy = new Map(prev)
        copy.set(key, value)
        return copy
      })
    }, []),

    setAll: useCallback(entries => {
      setMap(() => new Map(entries))
    }, []),

    remove: useCallback(key => {
      setMap(prev => {
        const copy = new Map(prev)
        copy.delete(key)
        return copy
      })
    }, []),

    reset: useCallback(() => {
      setMap(() => new Map())
    }, []),
  }

  return [map, actions]
}

export default useMap


const initialValues: MapOrEntries<string, string> = [['key', '🆕']]
const otherValues: MapOrEntries<string, string> = [
  ['hello', '👋'],
  ['data', '📦'],
]

function Component() {
  const [map, actions] = useMap<string, string>(initialValues)

  const set = () => actions.set(String(Date.now()), '📦')
  const setAll = () => actions.setAll(otherValues)
  const reset = () => actions.reset()
  const remove = () => actions.remove('hello')

  return (
    <div>
      <button onClick={set}>Add</button>
      <button onClick={reset}>Reset</button>
      <button onClick={setAll}>Set new data</button>
      <button onClick={remove} disabled={!map.get('hello')}>
        {'Remove "hello"'}
      </button>

      <pre>
        Map (
        {Array.from(map.entries()).map(([key, value]) => (
          <Fragment key={key}>{`\n  ${key}: ${value}`}</Fragment>
        ))}
        <br />)
      </pre>
    </div>
  )
}