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

import {html} from 'lit-html';

const commentTemplate = (comment) => (html`
  <article
    class="uk-comment uk-visible-toggle uk-comment-primary"
    tabindex="-1"
  >
    <header class="uk-comment-header uk-position-relative">
      <div class="uk-grid-small uk-flex-middle uk-grid" uk-grid="">
        <div class="uk-width-auto uk-first-column">
          <img
            class="uk-comment-avatar"
            src=${comment.avatarUrl}
            alt="identicon"
            width="80"
            height="80"
          />
        </div>
        <div class="uk-width-expand">
          <h4 class="uk-comment-title uk-margin-remove">${comment.author} | ${
    comment.authorEmail}</h4>
            <ul 
              class="uk-comment-meta uk-subnav uk-subnav-divider
              uk-margin-remove-top"
            >
              <li><a href="#">${comment.timestamp}</a></li>
              <li>
                <button data-id=${comment.id} class="delete-one uk-button">
                  DELETE
                </button>
              </li>
            </ul>
        </div>
      </div>
    </header>
    <div class="uk-comment-body"><p>${comment.text}</p></div>
  </article>
  `);

export default commentTemplate;
