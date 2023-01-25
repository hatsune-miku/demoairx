import React, { useState } from "react"

export default class ReactFix {
  /**
   * \\^O^/
   * @param defaultValue
   * @returns [value, setterWrapper, changeItemByIndex, changeItem]
   */
  static useArrayState<T>(defaultValue: Array<T>) {
    const [value, setter] = useState(defaultValue)
    function setterWrapper(newValue: Array<T>) {
      setter(newValue)
    }
    function changeItemByIndex(index: number, newValue: T) {
      let newValueArray = [...value]
      newValueArray[index] = newValue
      setter(newValueArray)
    }
    function changeItem(
      item: T,
      newValue: T,
      comparer: (a: T, b: T) => boolean
    ) {
      setter(value.map((v) => (comparer(item, v) ? newValue : v)))
    }
    return [value, setterWrapper, changeItemByIndex, changeItem]
  }
}
