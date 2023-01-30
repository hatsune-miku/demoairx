import process from "node:process"
import libairx from "./libairx-bridge"
import Config from "./config"

type Configuration = {
  key: string
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
        key: Config.LAN_DISCOVERY_PORT,
        name: "LAN Discovery Port",
        value: Config.getConfig(Config.LAN_DISCOVERY_PORT, "9818"),
      },
      {
        key: Config.LAN_TEXT_SERVICE_PORT,
        name: "LAN Text Service Port",
        value: Config.getConfig(Config.LAN_TEXT_SERVICE_PORT, "9819"),
      },
    ]
  }

  static createStringBuffer(capacity: number) {
    let buffer = Buffer.alloc(capacity)
    buffer.fill(0)
    return buffer
  }
}

const libairx_proxy = {
  version(): number {
    return libairx.airx_version()
  },
  isFirstRun(): boolean {
    return libairx.airx_is_first_run()
  },
  /**
   * discovery_service_server_port: u16,
    discovery_service_client_port: u16,
    text_service_listen_addr: *mut c_char,
    text_service_listen_port: u16,
   * @returns 
   */
  createService(
    discovery_service_server_port: number,
    discovery_service_client_port: number,
    text_service_listen_addr: string,
    text_service_listen_port: number
  ): Buffer {
    return libairx.airx_create(
      discovery_service_server_port,
      discovery_service_client_port,
      Buffer.from(text_service_listen_addr, "utf8"),
      text_service_listen_port
    )
  },
  restore(): Buffer {
    return libairx.airx_restore()
  },
  lanDiscoveryService(airx_ptr: Buffer) {
    libairx.airx_lan_discovery_service(airx_ptr)
  },
  textService(airx_ptr: Buffer) {
    libairx.airx_text_service(airx_ptr)
  },
  lanDiscoveryServiceAsync(airx_ptr: Buffer) {
    libairx.airx_lan_discovery_service_async(airx_ptr)
  },
  textServiceAsync(airx_ptr: Buffer) {
    libairx.airx_text_service_async(airx_ptr)
  },
  lanBroadcast(airx_ptr: Buffer): boolean {
    return libairx.airx_lan_broadcast(airx_ptr)
  },
  getPeers(airx_ptr: Buffer): string {
    let buffer = NodeApis.createStringBuffer(4096)
    libairx.airx_get_peers(airx_ptr, buffer)
    return buffer.toString("utf8")
  },
  startAutoBroadcast(airx_ptr: Buffer) {
    libairx.airx_start_auto_broadcast(airx_ptr)
  },
}

export { NodeApis, libairx_proxy }
export type { Configuration }
