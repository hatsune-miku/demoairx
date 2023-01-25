import React, { useState } from "react"

export default class Global {
  static forceRefresh() {
    const [_, setRefresh] = useState(0)
    setRefresh((refresh) => refresh + 1)
  }
}
