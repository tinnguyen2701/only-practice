import { Dispatch, SetStateAction, useCallback, useState } from "react";

interface UseBooleanOutput {
    value: boolean,
    setValue: Dispatch<SetStateAction<boolean>>,
    setTrue: () => void,
    setFalse: () => void,
    toggle: () => void
}

export function useBoolean(defaultValue?: boolean): UseBooleanOutput {
    const [value, setValue] = useState(!!defaultValue)
  
    const setTrue = useCallback(() => setValue(true), [])
    const setFalse = useCallback(() => setValue(false), [])
    const toggle = useCallback(() => setValue(x => !x), [])
  
    return { value, setValue, setTrue, setFalse, toggle }
  }

export default function Component() {
    const { value, setValue, setTrue, setFalse, toggle } = useBoolean(false)
  
    // Just an example to use "setValue"
    const customToggle = () => setValue((x: boolean) => !x)
  
    return (
      <>
        <p>
          Value is <code>{value.toString()}</code>
        </p>
        <button onClick={setTrue}>set true</button>
        <button onClick={setFalse}>set false</button>
        <button onClick={toggle}>toggle</button>
        <button onClick={customToggle}>custom toggle</button>
      </>
    )
  }