import process from "node:process"

type Configuration = {
  name: string
  value: string
}

class NodeApis {
  static getCurrentWorkingDirectory(): string {
    return process.cwd()
  }

  static getConfiguration(): Array<Configuration> {
    return [
      {
        name: "LAN Discovery Port",
        value: "9818",
      },
      {
        name: "LAN Clipboard Server Port",
        value: "9819",
      },
    ]
  }
}
export { NodeApis }
export type { Configuration }
