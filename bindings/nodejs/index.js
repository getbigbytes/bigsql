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

/// <reference types="node" />

const { Readable } = require("node:stream");

const { Client, RowIterator } = require("./generated.js");

class RowsStream extends Readable {
  constructor(reader, options) {
    super({ objectMode: true, ...options });
    this.reader = reader;
  }

  _read() {
    this.reader
      .next()
      .then((item) => {
        this.push(item);
      })
      .catch((e) => {
        this.emit("error", e);
      });
  }
}

RowIterator.prototype[Symbol.asyncIterator] = async function* () {
  while (true) {
    const item = await this.next();
    if (item === null) {
      break;
    }
    yield item;
  }
};

RowIterator.prototype.stream = function () {
  return new RowsStream(this);
};

module.exports.Client = Client;
