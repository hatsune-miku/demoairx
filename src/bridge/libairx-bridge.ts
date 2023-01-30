const ffi = require("ffi-napi")
const ref = require("ref-napi")

const types = ref.types
const struct_ptr = ref.refType(types.void) // = Buffer
const pchar = ref.refType(types.char) // = Buffer
const callback_string = "string"
const raw_ptr = "pointer"

const libairx = ffi.Library("libairx", {
  airx_version: [types.int, []],
  airx_is_first_run: [types.bool, []],
  airx_create: [
    struct_ptr,
    [types.uint16, types.uint16, struct_ptr, types.uint16],
  ],
  airx_restore: [struct_ptr, []],
  airx_lan_discovery_service: [types.void, [struct_ptr]],
  airx_lan_discovery_service_async: [types.void, [struct_ptr]],
  airx_text_service: [types.void, [struct_ptr, raw_ptr]],
  airx_text_service_async: [types.void, [struct_ptr, raw_ptr]],
  airx_lan_broadcast: [types.bool, [struct_ptr]],
  airx_get_peers: [types.uint, [struct_ptr, pchar]],
  airx_start_auto_broadcast: [types.void, [struct_ptr]],
  airx_send_text: [types.void, [struct_ptr, pchar, pchar]],
  airx_broadcast_text: [types.void, [struct_ptr, pchar]],
})

export { types, callback_string, raw_ptr, libairx }
