const ffi = require("ffi-napi")
const ref = require("ref-napi")

const types = ref.types
const pvoid = ref.refType(types.void) // = Buffer
const pchar = ref.refType(types.char) // = Buffer

const libairx = ffi.Library(
  "/Users/miku/CLionProjects/libairx/target/release/deps/libairx.dylib",
  {
    airx_version: [types.int, []],
    airx_is_first_run: [types.bool, []],
    airx_create: [pvoid, [types.uint16, types.uint16, pvoid, types.uint16]],
    airx_restore: [pvoid, []],
    airx_lan_discovery_service: [types.void, [pvoid]],
    airx_text_service: [types.void, [pvoid]],
    airx_lan_discovery_service_async: [types.void, [pvoid]],
    airx_text_service_async: [types.void, [pvoid]],
    airx_lan_broadcast: [types.bool, [pvoid]],
    airx_get_peers: [types.uint, [pvoid, pchar]],
    airx_start_auto_broadcast: [types.void, [pvoid]],
  }
)

export default libairx
