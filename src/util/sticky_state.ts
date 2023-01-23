import { useEffect, useState } from "react"

export default function useStickyState<T>(defaultValue: T, key: string) {
  const [value, setter] = useState(defaultValue)
  let storedValue = localStorage.getItem(key)
  console.log("storedValue", storedValue)
  if (storedValue) {
    setter(JSON.parse(storedValue) as T)
  }
  function setterWrapper(newValue: T) {
    setter(newValue)
    localStorage.setItem(key, JSON.stringify(newValue))
  }
  return [value, setterWrapper]
}
