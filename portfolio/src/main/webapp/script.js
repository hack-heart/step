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

// Shows a quote when the quote button is clicked
const quoteButton = document.getElementById('quote-button');
quoteButton.addEventListener('click', addRandomQuote);

addComments();

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

/** Adds comments returned from the server to the page */
async function addComments() {
  const response = await fetch('/data');
  const comments = await response.json();
  const commentsContainer = document.getElementById('comments-container');
  comments.map((comment) => buildComment(comment)).forEach((listElement) => {
    commentsContainer.appendChild(listElement);
  });
}

/**
 * Builds up the comment body by nesting elements and assigning styling
 * classes from UI Kit
 */
function buildComment(comment) {
  // Pick a random identicon from the images folder
  const imageIndex = Math.floor(Math.random() * 8) + 1;
  const imgUrl = 'images/identicon-' + imageIndex + '.png';

  const listElement = document.createElement('li');

  const articleElement = document.createElement('article');
  articleElement.classList.add(
      'uk-comment', 'uk-visible-toggle', 'uk-comment-primary');
  articleElement.tabIndex = -1;

  const headerElement = document.createElement('header');
  headerElement.classList.add('uk-comment-header', 'uk-position-relative');

  const gridDiv = document.createElement('div');
  gridDiv.classList.add('uk-grid-small', 'uk-flex-middle');
  gridDiv.setAttribute('uk-grid', '');

  const avatarDiv = document.createElement('div');
  avatarDiv.classList.add('uk-width-auto');

  const avatar = document.createElement('img');
  avatar.classList.add('uk-comment-avatar');
  avatar.src = imgUrl;
  avatar.alt = 'identicon';
  avatar.width = 80;
  avatar.height = 80;

  const metaDiv = document.createElement('div');
  metaDiv.classList.add('uk-width-expand');

  const h4Element = document.createElement('h4');
  h4Element.classList.add('uk-comment-title', 'uk-margin-remove');
  h4Element.innerText = comment.author;

  const timeParagraph = document.createElement('p');
  timeParagraph.classList.add('uk-comment-meta', 'uk-margin-remove-top');
  timeParagraph.innerText = comment.timestamp;

  const bodyDiv = document.createElement('div');
  bodyDiv.classList.add('uk-comment-body');

  const textParagraph = document.createElement('p');
  textParagraph.innerText = comment.text;

  avatarDiv.appendChild(avatar);
  gridDiv.appendChild(avatarDiv);
  metaDiv.appendChild(h4Element);
  metaDiv.appendChild(timeParagraph);
  gridDiv.appendChild(metaDiv);
  headerElement.appendChild(gridDiv);
  articleElement.appendChild(headerElement);
  bodyDiv.appendChild(textParagraph);
  articleElement.appendChild(bodyDiv);
  listElement.appendChild(articleElement);

  return listElement;
}
