// DOM elements
const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

// Unsplash API endpoint
const accessKey = "ATq98eT2hrBf_6VpP3JhAQYnnZqaG53w84T4Qj3A6IA";
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${accessKey}&count=${imageCount}`;

// Variables
let photos = [];
let imagesLoaded = 0;
let totalImages = 0;
let isReady = false;
let imageCount = 5;

// GET photos from Unsplash API
async function getPhotos(apiUrl) {
  try {
    // First get data
    const response = await fetch(apiUrl);
    const data = await response.json();
    photos = data;

    // Then display data
    displayPhotos();
  } catch (error) {
    console.error(error);
  }
}

// Display photos in DOM
function displayPhotos() {
  imagesLoaded = 0; // Reset
  totalImages = photos.length;

  // Append each photo to imageContainer
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

    // Log every image load and prepare for next network when max images have been reached
    img.addEventListener("load", imageLoaded);

    // Put <img> inside <a>, and then inside of container
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Image loaded
function imageLoaded() {
  imagesLoaded++; // Increment after every image that's loaded

  // If the total has been reached, prepare for next network call
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    imageCount = 10;
    apiUrl = `https://api.unsplash.com/photos/random/?client_id=${accessKey}&count=${imageCount}`;
  }
}

// Helper function to set attributes on DOM elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Get more photos after scroll reaches near bottom of page
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    getPhotos(apiUrl);
    loader.hidden = false;
  }
});

getPhotos(apiUrl);
