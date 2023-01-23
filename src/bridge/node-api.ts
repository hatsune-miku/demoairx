import process from "node:process"

export default class NodeApis {
  static getCurrentWorkingDirectory(): String {
    return process.cwd()
  }
}
