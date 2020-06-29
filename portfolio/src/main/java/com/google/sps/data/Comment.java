// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps.data;

/** A comment on the portfolio page */
public final class Comment {
  private final String author;
  private final long id;
  private final String text;
  private final String timestamp;

  public Comment(String author, long id, String text, String timestamp) {
    this.author = author;
    this.id = id;
    this.text = text;
    this.timestamp = timestamp;
  }
}