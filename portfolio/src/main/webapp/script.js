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

import {render} from 'lit-html';
import commentTemplate from './templates/comment-template.js';

// Shows a quote when the quote button is clicked
const quoteButton = document.getElementById('quote-button');
quoteButton.addEventListener('click', addRandomQuote);

initMap();

showCommentFormOrLoginLink();

// Server sends all comments by default
fetchCommentsFromServer('');

// Fetches the user-specified number of comments from the server
const maxCommentsInput = document.getElementById('max-comments');
maxCommentsInput.addEventListener('change', (event) => {
  fetchCommentsFromServer(event.target.value);
});

// Deletes all comments when the delete all button is clicked
const deleteAllButton = document.getElementById('delete-all');
deleteAllButton.addEventListener('click', deleteAllComments);

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

/*
 * Initialises a map on the webpage
 */
/* global google */
function initMap() {
  const mapProps = {
    center: {lat: 19.279619, lng: 166.6499348},
    zoom: 2,

    // aubergine color scheme
    styles: [
      {'elementType': 'geometry', 'stylers': [{'color': '#1d2c4d'}]},
      {'elementType': 'labels.text.fill', 'stylers': [{'color': '#8ec3b9'}]},
      {'elementType': 'labels.text.stroke', 'stylers': [{'color': '#1a3646'}]},
      {
        'featureType': 'administrative.country',
        'elementType': 'geometry.stroke',
        'stylers': [{'color': '#4b6878'}],
      },
      {
        'featureType': 'administrative.land_parcel',
        'elementType': 'labels.text.fill',
        'stylers': [{'color': '#64779e'}],
      },
      {
        'featureType': 'administrative.province',
        'elementType': 'geometry.stroke',
        'stylers': [{'color': '#4b6878'}],
      },
      {
        'featureType': 'landscape.man_made',
        'elementType': 'geometry.stroke',
        'stylers': [{'color': '#334e87'}],
      },
      {
        'featureType': 'landscape.natural',
        'elementType': 'geometry',
        'stylers': [{'color': '#023e58'}],
      },
      {
        'featureType': 'poi',
        'elementType': 'geometry',
        'stylers': [{'color': '#283d6a'}],
      },
      {
        'featureType': 'poi',
        'elementType': 'labels.text.fill',
        'stylers': [{'color': '#6f9ba5'}],
      },
      {
        'featureType': 'poi',
        'elementType': 'labels.text.stroke',
        'stylers': [{'color': '#1d2c4d'}],
      },
      {
        'featureType': 'poi.park',
        'elementType': 'geometry.fill',
        'stylers': [{'color': '#023e58'}],
      },
      {
        'featureType': 'poi.park',
        'elementType': 'labels.text.fill',
        'stylers': [{'color': '#3C7680'}],
      },
      {
        'featureType': 'road',
        'elementType': 'geometry',
        'stylers': [{'color': '#304a7d'}],
      },
      {
        'featureType': 'road',
        'elementType': 'labels.text.fill',
        'stylers': [{'color': '#98a5be'}],
      },
      {
        'featureType': 'road',
        'elementType': 'labels.text.stroke',
        'stylers': [{'color': '#1d2c4d'}],
      },
      {
        'featureType': 'road.highway',
        'elementType': 'geometry',
        'stylers': [{'color': '#2c6675'}],
      },
      {
        'featureType': 'road.highway',
        'elementType': 'geometry.stroke',
        'stylers': [{'color': '#255763'}],
      },
      {
        'featureType': 'road.highway',
        'elementType': 'labels.text.fill',
        'stylers': [{'color': '#b0d5ce'}],
      },
      {
        'featureType': 'road.highway',
        'elementType': 'labels.text.stroke',
        'stylers': [{'color': '#023e58'}],
      },
      {
        'featureType': 'transit',
        'elementType': 'labels.text.fill',
        'stylers': [{'color': '#98a5be'}],
      },
      {
        'featureType': 'transit',
        'elementType': 'labels.text.stroke',
        'stylers': [{'color': '#1d2c4d'}],
      },
      {
        'featureType': 'transit.line',
        'elementType': 'geometry.fill',
        'stylers': [{'color': '#283d6a'}],
      },
      {
        'featureType': 'transit.station',
        'elementType': 'geometry',
        'stylers': [{'color': '#3a4762'}],
      },
      {
        'featureType': 'water',
        'elementType': 'geometry',
        'stylers': [{'color': '#0e1626'}],
      },
      {
        'featureType': 'water',
        'elementType': 'labels.text.fill',
        'stylers': [{'color': '#4e6d70'}],
      },
    ],
  };
  const map = new google.maps.Map(document.getElementById('map'), mapProps);

  const myPlaces = [
    {position: {lat: 9.081999, lng: 8.675276999999999}, countryCode: 'NG'},
    {position: {lat: 46.227638, lng: 2.213749}, countryCode: 'FR'},
    {position: {lat: 37.09024, lng: -95.712891}, countryCode: 'US'},
  ];

  myPlaces.forEach((place) => {
    new google.maps.Marker(
        {position: place.position, label: place.countryCode, map: map});
  });
}

/**
 * Unhides the create comments form if the user is logged in, otherwise
 * shows a login link
 */
async function showCommentFormOrLoginLink() {
  const response = await fetch('/login-status');
  const loginStatus = response.status;
  if (loginStatus == 200) {
    document.getElementById('new-comment-form').style.display = 'block';
  } else {
    document.getElementById('login-link').innerHTML = await response.text();
  }
}

/**
 * Renders comments from the server on the page, adding the onclick event
 * listeners for all of them
 */
async function fetchCommentsFromServer(maxComments) {
  const response = await fetch(`/data?maxComments=${maxComments}`);
  const comments = await response.json();
  const commentsContainer = document.getElementById('comments-container');
  removeAllChildNodes(commentsContainer);
  await comments.map((comment) => transformCommentToListElement(comment))
      .forEach((listElement) => {
        commentsContainer.appendChild(listElement);
      });
  addEventListenersToDeleteButtons();
}

/**
 * Deletes an individual comment
 */
async function deleteComment(commentId) {
  await fetch(`/delete-comment?id=${commentId}`, {method: 'POST'});
  fetchCommentsFromServer('');
}

/**
 * Deletes all comments
 */
async function deleteAllComments() {
  await fetch('/delete-data', {method: 'POST'});
  fetchCommentsFromServer('');
}

/**
 * Transforms a comment object to a list element styled with UI Kit classes
 */
function transformCommentToListElement(comment) {
  const listElement = document.createElement('li');
  render(commentTemplate(comment), listElement);

  return listElement;
}

/**
 * Adds onclick event listeners to all the delete buttons to delete their
 * associated comments
 */
function addEventListenersToDeleteButtons() {
  const deleteOneButtons = document.querySelectorAll('.delete-one');
  deleteOneButtons.forEach((deleteOneButton) => {
    deleteOneButton.addEventListener('click', () => {
      deleteComment(event.target.dataset.id);
    });
  });
}

/**
 * Removes all child nodes of an HTML element
 */
function removeAllChildNodes(parentNode) {
  while (parentNode.hasChildNodes()) {
    parentNode.removeChild(parentNode.lastChild);
  }
}
