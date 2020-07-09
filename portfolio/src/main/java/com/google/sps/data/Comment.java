// Copyright 2020 Google LLC
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
  private final long id;
  private final String timestamp;
  private final String author;
  private final String authorEmail;
  private final String avatarUrl;
  private final String text;

  public static class Builder {
    private long id;
    private String timestamp;
    private String author;
    private String authorEmail;
    private String avatarUrl;
    private String text;

    public Builder setId(long val) {
      id = val;
      return this;
    }

    public Builder setTimestamp(String val) {
      timestamp = val;
      return this;
    }

    public Builder setAuthor(String val) {
      author = val;
      return this;
    }

    public Builder setAuthorEmail(String val) {
      authorEmail = val;
      return this;
    }

    public Builder setAvatarUrl(String val) {
      avatarUrl = val;
      return this;
    }

    public Builder setText(String val) {
      text = val;
      return this;
    }

    public Comment build() {
      return new Comment(this);
    }
  }

  private Comment(Builder builder) {
    this.id = builder.id;
    this.timestamp = builder.timestamp;
    this.author = builder.author;
    this.authorEmail = builder.authorEmail;
    this.avatarUrl = builder.avatarUrl;
    this.text = builder.text;
  }
}