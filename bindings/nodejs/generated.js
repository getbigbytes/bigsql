/*
 * Copyright 2024 Digitrans Inc
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* tslint:disable */
/* eslint-disable */
/* prettier-ignore */

/* auto-generated by NAPI-RS */

const { existsSync, readFileSync } = require('fs')
const { join } = require('path')

const { platform, arch } = process

let nativeBinding = null
let localFileExisted = false
let loadError = null

function isMusl() {
  // For Node 10
  if (!process.report || typeof process.report.getReport !== 'function') {
    try {
      const lddPath = require('child_process').execSync('which ldd').toString().trim()
      return readFileSync(lddPath, 'utf8').includes('musl')
    } catch (e) {
      return true
    }
  } else {
    const { glibcVersionRuntime } = process.report.getReport().header
    return !glibcVersionRuntime
  }
}

switch (platform) {
  case 'android':
    switch (arch) {
      case 'arm64':
        localFileExisted = existsSync(join(__dirname, 'bigbytes-driver.android-arm64.node'))
        try {
          if (localFileExisted) {
            nativeBinding = require('./bigbytes-driver.android-arm64.node')
          } else {
            nativeBinding = require('@bigbytes-driver/lib-android-arm64')
          }
        } catch (e) {
          loadError = e
        }
        break
      case 'arm':
        localFileExisted = existsSync(join(__dirname, 'bigbytes-driver.android-arm-eabi.node'))
        try {
          if (localFileExisted) {
            nativeBinding = require('./bigbytes-driver.android-arm-eabi.node')
          } else {
            nativeBinding = require('@bigbytes-driver/lib-android-arm-eabi')
          }
        } catch (e) {
          loadError = e
        }
        break
      default:
        throw new Error(`Unsupported architecture on Android ${arch}`)
    }
    break
  case 'win32':
    switch (arch) {
      case 'x64':
        localFileExisted = existsSync(
          join(__dirname, 'bigbytes-driver.win32-x64-msvc.node')
        )
        try {
          if (localFileExisted) {
            nativeBinding = require('./bigbytes-driver.win32-x64-msvc.node')
          } else {
            nativeBinding = require('@bigbytes-driver/lib-win32-x64-msvc')
          }
        } catch (e) {
          loadError = e
        }
        break
      case 'ia32':
        localFileExisted = existsSync(
          join(__dirname, 'bigbytes-driver.win32-ia32-msvc.node')
        )
        try {
          if (localFileExisted) {
            nativeBinding = require('./bigbytes-driver.win32-ia32-msvc.node')
          } else {
            nativeBinding = require('@bigbytes-driver/lib-win32-ia32-msvc')
          }
        } catch (e) {
          loadError = e
        }
        break
      case 'arm64':
        localFileExisted = existsSync(
          join(__dirname, 'bigbytes-driver.win32-arm64-msvc.node')
        )
        try {
          if (localFileExisted) {
            nativeBinding = require('./bigbytes-driver.win32-arm64-msvc.node')
          } else {
            nativeBinding = require('@bigbytes-driver/lib-win32-arm64-msvc')
          }
        } catch (e) {
          loadError = e
        }
        break
      default:
        throw new Error(`Unsupported architecture on Windows: ${arch}`)
    }
    break
  case 'darwin':
    localFileExisted = existsSync(join(__dirname, 'bigbytes-driver.darwin-universal.node'))
    try {
      if (localFileExisted) {
        nativeBinding = require('./bigbytes-driver.darwin-universal.node')
      } else {
        nativeBinding = require('@bigbytes-driver/lib-darwin-universal')
      }
      break
    } catch {}
    switch (arch) {
      case 'x64':
        localFileExisted = existsSync(join(__dirname, 'bigbytes-driver.darwin-x64.node'))
        try {
          if (localFileExisted) {
            nativeBinding = require('./bigbytes-driver.darwin-x64.node')
          } else {
            nativeBinding = require('@bigbytes-driver/lib-darwin-x64')
          }
        } catch (e) {
          loadError = e
        }
        break
      case 'arm64':
        localFileExisted = existsSync(
          join(__dirname, 'bigbytes-driver.darwin-arm64.node')
        )
        try {
          if (localFileExisted) {
            nativeBinding = require('./bigbytes-driver.darwin-arm64.node')
          } else {
            nativeBinding = require('@bigbytes-driver/lib-darwin-arm64')
          }
        } catch (e) {
          loadError = e
        }
        break
      default:
        throw new Error(`Unsupported architecture on macOS: ${arch}`)
    }
    break
  case 'freebsd':
    if (arch !== 'x64') {
      throw new Error(`Unsupported architecture on FreeBSD: ${arch}`)
    }
    localFileExisted = existsSync(join(__dirname, 'bigbytes-driver.freebsd-x64.node'))
    try {
      if (localFileExisted) {
        nativeBinding = require('./bigbytes-driver.freebsd-x64.node')
      } else {
        nativeBinding = require('@bigbytes-driver/lib-freebsd-x64')
      }
    } catch (e) {
      loadError = e
    }
    break
  case 'linux':
    switch (arch) {
      case 'x64':
        if (isMusl()) {
          localFileExisted = existsSync(
            join(__dirname, 'bigbytes-driver.linux-x64-musl.node')
          )
          try {
            if (localFileExisted) {
              nativeBinding = require('./bigbytes-driver.linux-x64-musl.node')
            } else {
              nativeBinding = require('@bigbytes-driver/lib-linux-x64-musl')
            }
          } catch (e) {
            loadError = e
          }
        } else {
          localFileExisted = existsSync(
            join(__dirname, 'bigbytes-driver.linux-x64-gnu.node')
          )
          try {
            if (localFileExisted) {
              nativeBinding = require('./bigbytes-driver.linux-x64-gnu.node')
            } else {
              nativeBinding = require('@bigbytes-driver/lib-linux-x64-gnu')
            }
          } catch (e) {
            loadError = e
          }
        }
        break
      case 'arm64':
        if (isMusl()) {
          localFileExisted = existsSync(
            join(__dirname, 'bigbytes-driver.linux-arm64-musl.node')
          )
          try {
            if (localFileExisted) {
              nativeBinding = require('./bigbytes-driver.linux-arm64-musl.node')
            } else {
              nativeBinding = require('@bigbytes-driver/lib-linux-arm64-musl')
            }
          } catch (e) {
            loadError = e
          }
        } else {
          localFileExisted = existsSync(
            join(__dirname, 'bigbytes-driver.linux-arm64-gnu.node')
          )
          try {
            if (localFileExisted) {
              nativeBinding = require('./bigbytes-driver.linux-arm64-gnu.node')
            } else {
              nativeBinding = require('@bigbytes-driver/lib-linux-arm64-gnu')
            }
          } catch (e) {
            loadError = e
          }
        }
        break
      case 'arm':
        if (isMusl()) {
          localFileExisted = existsSync(
            join(__dirname, 'bigbytes-driver.linux-arm-musleabihf.node')
          )
          try {
            if (localFileExisted) {
              nativeBinding = require('./bigbytes-driver.linux-arm-musleabihf.node')
            } else {
              nativeBinding = require('@bigbytes-driver/lib-linux-arm-musleabihf')
            }
          } catch (e) {
            loadError = e
          }
        } else {
          localFileExisted = existsSync(
            join(__dirname, 'bigbytes-driver.linux-arm-gnueabihf.node')
          )
          try {
            if (localFileExisted) {
              nativeBinding = require('./bigbytes-driver.linux-arm-gnueabihf.node')
            } else {
              nativeBinding = require('@bigbytes-driver/lib-linux-arm-gnueabihf')
            }
          } catch (e) {
            loadError = e
          }
        }
        break
      case 'riscv64':
        if (isMusl()) {
          localFileExisted = existsSync(
            join(__dirname, 'bigbytes-driver.linux-riscv64-musl.node')
          )
          try {
            if (localFileExisted) {
              nativeBinding = require('./bigbytes-driver.linux-riscv64-musl.node')
            } else {
              nativeBinding = require('@bigbytes-driver/lib-linux-riscv64-musl')
            }
          } catch (e) {
            loadError = e
          }
        } else {
          localFileExisted = existsSync(
            join(__dirname, 'bigbytes-driver.linux-riscv64-gnu.node')
          )
          try {
            if (localFileExisted) {
              nativeBinding = require('./bigbytes-driver.linux-riscv64-gnu.node')
            } else {
              nativeBinding = require('@bigbytes-driver/lib-linux-riscv64-gnu')
            }
          } catch (e) {
            loadError = e
          }
        }
        break
      case 's390x':
        localFileExisted = existsSync(
          join(__dirname, 'bigbytes-driver.linux-s390x-gnu.node')
        )
        try {
          if (localFileExisted) {
            nativeBinding = require('./bigbytes-driver.linux-s390x-gnu.node')
          } else {
            nativeBinding = require('@bigbytes-driver/lib-linux-s390x-gnu')
          }
        } catch (e) {
          loadError = e
        }
        break
      default:
        throw new Error(`Unsupported architecture on Linux: ${arch}`)
    }
    break
  default:
    throw new Error(`Unsupported OS: ${platform}, architecture: ${arch}`)
}

if (!nativeBinding) {
  if (loadError) {
    throw loadError
  }
  throw new Error(`Failed to load native binding`)
}

const { ValueOptions, Client, Connection, ConnectionInfo, Schema, Field, RowIterator, RowIteratorExt, RowOrStats, Row, ServerStats } = nativeBinding

module.exports.ValueOptions = ValueOptions
module.exports.Client = Client
module.exports.Connection = Connection
module.exports.ConnectionInfo = ConnectionInfo
module.exports.Schema = Schema
module.exports.Field = Field
module.exports.RowIterator = RowIterator
module.exports.RowIteratorExt = RowIteratorExt
module.exports.RowOrStats = RowOrStats
module.exports.Row = Row
module.exports.ServerStats = ServerStats
