// Copyright 2024 Digitrans Inc
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

use serde::Deserialize;
use std::fmt::{Display, Formatter};

const SESSION_TOKEN_EXPIRED: u16 = 5101;
const SESSION_TOKEN_NOT_FOUND: u16 = 5103;

pub fn need_refresh_token(code: u16) -> bool {
    code == SESSION_TOKEN_EXPIRED || code == SESSION_TOKEN_NOT_FOUND
}

#[derive(Deserialize, Debug, Clone)]
pub struct ErrorCode {
    pub code: u16,
    pub message: String,
    pub detail: Option<String>,
}

/// try to decode to this when status code is not 200.
/// so the error field is expect to exist.
#[derive(Deserialize, Debug)]
pub struct ResponseWithErrorCode {
    pub error: ErrorCode,
}

impl Display for ErrorCode {
    fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
        match &self.detail {
            Some(d) if !d.is_empty() => {
                write!(f, "[{}]{}\n{}", self.code, self.message, d)
            }
            _ => write!(f, "[{}]{}", self.code, self.message,),
        }
    }
}
