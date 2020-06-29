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

// Adds comments to the page once it loads
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

/**
 * Adds comments returned from the server to the page.
 */
async function addComments() {
  const response = await fetch('/data');
  const comments = await response.json();
  const commentsContainer = document.getElementById('comments-container');
  comments.map((comment) => createListElement(comment))
      .forEach((listElement) => commentsContainer.appendChild(listElement));
}

/** Creates an <li> element containing text. */
function createListElement(text) {
  const liElement = document.createElement('li');
  liElement.innerText = text;
  return liElement;
}
