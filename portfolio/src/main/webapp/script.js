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

// eslint-disable-next-line no-undef
const litHtml = require('lit-html');

// Shows a quote when the quote button is clicked
const quoteButton = document.getElementById('quote-button');
quoteButton.addEventListener('click', addRandomQuote);

// Server sends all comments by default
fetchCommentsFromServer('');

// Fetches the user-specified number of comments from the server
const maxCommentsInput = document.getElementById('max-comments');
maxCommentsInput.addEventListener('change', (event) => {
  fetchCommentsFromServer(event.target.value);
});

// Deletes all comments when the delete button is clicked
const deleteButton = document.getElementById('delete-button');
deleteButton.addEventListener('click', deleteAllComments);

/**
 * Adds a random quote from Pierce Brown's Red Rising to the page.
 */
function addRandomQuote() {
  const quotes = [
    'You do not follow me because I am the strongest. Pax is. You do not ' +
        'follow me because I am the brightest. Mustang is. You follow me ' +
        'because you do not know where you are going. I do.',
    'I would have lived in peace. But my enemies brought me war.',
    'Man cannot be freed by the same injustice that enslaved it.',
    'The measure of a man is what he does when he has power.',
    'Funny thing, watching gods realize they’ve been mortal all along.',
    'I am the Reaper and death is my shadow.',
    'Break the chains, my love.',
    'I\'m a sheep wearing wolves\' clothing in a pack of wolves.',
    '\'Promises are just chains,\' she rasps. \'Both are meant for breaking.\'',
    'I am no martyr. I am not vengeance. I am Eo\'s dream.',
    'I learn more when I make mistakes, so long as they don’t kill me.',
    'Freedom costs too much.',
    'Rulers tend to dislike those who break rules.',
    'Society has three stages: Savagery, Ascendance, Decadence. The great ' +
        'rise because of Savagery. They rule in Ascendance. They fall because' +
        ' of their own Decadence.',
  ];

  // Pick a random quote.
  const quote = quotes[Math.floor(Math.random() * quotes.length)];

  // Add it to the page.
  const quoteContainer = document.getElementById('quote-container');
  quoteContainer.innerText = quote;
}

/**
 * Renders comments from the server on the page
 */
async function fetchCommentsFromServer(maxComments) {
  const response = await fetch(`/data?maxComments=${maxComments}`);
  const comments = await response.json();
  const commentsContainer = document.getElementById('comments-container');
  removeAllChildNodes(commentsContainer);
  comments.map((comment) => transformCommentToListElement(comment))
      .forEach((listElement) => {
        commentsContainer.appendChild(listElement);
      });
}

/**
 * Deletes all comments
 */
function deleteAllComments() {
  fetch('/delete-data', {method: 'POST'}).then(() => {
    fetchCommentsFromServer('');
  });
}

/**
 * Transforms a comment object to a list element styled with UI Kit classes
 */
function transformCommentToListElement(comment) {
  const identiconUrls = [
    'images/identicon-1.png',
    'images/identicon-2.png',
    'images/identicon-3.png',
    'images/identicon-4.png',
    'images/identicon-5.png',
    'images/identicon-6.png',
    'images/identicon-7.png',
    'images/identicon-8.png',
  ];
  // Pick a random identicon to use as an avatar
  const avatarUrl =
      identiconUrls[Math.floor(Math.random() * identiconUrls.length)];

  const listElement = document.createElement('li');
  litHtml.render(commentTemplate(comment, avatarUrl), listElement);

  return listElement;
}

/**
 * Constructs a comment template from a comment object and an avatar url
 */
function commentTemplate(comment, avatarUrl) {
  return litHtml.html`
  <article
    class="uk-comment uk-visible-toggle uk-comment-primary"
    tabindex="-1"
  >
    <header class="uk-comment-header uk-position-relative">
      <div class="uk-grid-small uk-flex-middle uk-grid" uk-grid="">
        <div class="uk-width-auto uk-first-column">
          <img
            class="uk-comment-avatar"
            src=${avatarUrl}
            alt="identicon"
            width="80"
            height="80"
          />
        </div>
        <div class="uk-width-expand">
          <h4 class="uk-comment-title uk-margin-remove">${comment.author}</h4>
          <p class="uk-comment-meta uk-margin-remove-top">
          ${comment.timestamp}
          </p>
        </div>
      </div>
    </header>
    <div class="uk-comment-body"><p>${comment.text}</p></div>
  </article>
  `;
}

/**
 * Removes all child nodes of an HTML element
 */
function removeAllChildNodes(parentNode) {
  while (parentNode.hasChildNodes()) {
    parentNode.removeChild(parentNode.lastChild);
  }
}
