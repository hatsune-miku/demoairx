export default class Config {
  static LAN_DISCOVERY_PORT = "LAN_DISCOVERY_PORT"
  static LAN_TEXT_SERVICE_PORT = "LAN_TEXT_SERVICE_PORT"

  static setConfig(key: string, value: string) {
    window.localStorage.setItem(key, value)
  }
  static getConfig(key: string, defaultValue: string): string {
    return window.localStorage.getItem(key) || defaultValue
  }
}
