import process from "node:process"
import { types, callback_string, libairx } from "./libairx-bridge"
import Config from "./config"

const ffi = require("ffi-napi")

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

  static createEmptyBuffer(capacity: number): Buffer {
    let buffer = Buffer.alloc(capacity)
    buffer.fill(0)
    return buffer
  }

  static createStringBuffer(str: string): Buffer {
    return Buffer.from(str + "\0", "utf8")
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
      NodeApis.createStringBuffer(text_service_listen_addr),
      text_service_listen_port
    )
  },
  restore(): Buffer {
    return libairx.airx_restore()
  },

  lanDiscoveryService(airx_ptr: Buffer) {
    let ffiCallback = ffi.Callback(types.bool, [], () => false)
    global.ffi_discovery = ffiCallback
    libairx.airx_lan_discovery_service(airx_ptr, ffiCallback)
  },
  lanDiscoveryServiceAsync(airx_ptr: Buffer) {
    let ffiCallback = ffi.Callback(types.bool, [], () => false)
    global.ffi_discovery2 = ffiCallback
    libairx.airx_lan_discovery_service_async(airx_ptr, ffiCallback)
  },

  textService(airx_ptr: Buffer, callback: Function) {
    let ffiCallback = ffi.Callback(
      types.void,
      [callback_string],
      (text: Buffer) => {
        callback(text.toString("utf8"))
      }
    )
    let ffiCallback2 = ffi.Callback(types.bool, [], () => false)
    global.ffi = ffiCallback
    global.ffi2 = ffiCallback2
    libairx.airx_text_service(airx_ptr, ffiCallback, ffiCallback2)
  },
  textServiceAsync(airx_ptr: Buffer, callback: Function) {
    // ffi may be GCed!
    let ffiCallback = ffi.Callback(
      types.void,
      [callback_string],
      (text: Buffer) => {
        callback(text.toString("utf8"))
      }
    )
    let ffiCallback2 = ffi.Callback(types.bool, [], () => false)
    global.ffi_async = ffiCallback
    global.ffi_async2 = ffiCallback2
    libairx.airx_text_service_async(airx_ptr, ffiCallback, ffiCallback2)
  },

  lanBroadcast(airx_ptr: Buffer): boolean {
    return libairx.airx_lan_broadcast(airx_ptr)
  },
  getPeers(airx_ptr: Buffer): string {
    let buffer = NodeApis.createEmptyBuffer(4096)
    libairx.airx_get_peers(airx_ptr, buffer)
    return buffer.toString("utf8")
  },
  startAutoBroadcast(airx_ptr: Buffer) {
    libairx.airx_start_auto_broadcast(airx_ptr)
  },
  sendText(airx_ptr: Buffer, peer_host: string, text: string) {
    libairx.airx_send_text(
      airx_ptr,
      NodeApis.createStringBuffer(peer_host),
      NodeApis.createStringBuffer(text)
    )
  },
  broadcastText(airx_ptr: Buffer, text: string) {
    libairx.airx_broadcast_text(airx_ptr, NodeApis.createStringBuffer(text))
  },
}

export { NodeApis, libairx_proxy }
export type { Configuration }

/**
 *     airx_send_text: [types.void, [pvoid, pchar, pchar]],
    airx_broadcast_text: [types.void, [pvoid, pchar]],
 */
