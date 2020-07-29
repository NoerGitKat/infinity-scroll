// DOM elements
const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

// Photos
let photos = [];

// Unsplash API
const accessKey = "ATq98eT2hrBf_6VpP3JhAQYnnZqaG53w84T4Qj3A6IA";
const apiKey = "6-iD44DL0w9GbLDEP7CiYvHFTTjBV4zhcdncbIafclA";
const count = 10;

const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${accessKey}&count=${count}`;

// GET photos from Unsplash API
async function getPhotos(url) {
  try {
    // First get data
    const response = await fetch(url);
    const data = await response.json();
    photos = data;

    // Then display data
    displayPhotos();
  } catch (error) {
    console.error(error);
  }
}

getPhotos(apiUrl);

// Display photos in DOM
function displayPhotos() {
  photos.forEach((photo) => {
    // Create anchor tag
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });

    // Create <img>
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    // Put <img> inside <a>, and then inside of container
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Helper function to set attributes on DOM elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}
