const artworkIds = [13914, 51719, 78503, 16858];
const artworksContainer = document.querySelector('.artworks');
const descriptionContainer = document.querySelector('.description');

const fetchArtworks = async () => {
  let portraitArtwork = null;

  for (const id of artworkIds) {
    const response = await fetch(`https://api.artic.edu/api/v1/artworks/${id}`);
    const data = await response.json();

    const artwork = data.data;
    const imageId = artwork.image_id;
    const title = artwork.title;
    const artistTitle = artwork.artist_title;

    const artworkElement = document.createElement('div');
    artworkElement.classList.add('artwork');

    const imageElement = document.createElement('img');
    imageElement.src = `https://www.artic.edu/iiif/2/${imageId}/full/843,1000/0/default.jpg`;
    imageElement.alt = title;
    artworkElement.appendChild(imageElement);

    const titleElement = document.createElement('h2');
    titleElement.textContent = title;
    artworkElement.appendChild(titleElement);

    const artistElement = document.createElement('p');
    artistElement.textContent = artistTitle;
    artworkElement.appendChild(artistElement);

    if (title === "Portrait of Emily Crane Chadbourne Tsugouharu Foujita") {
      portraitArtwork = artworkElement;
    } else {
      artworksContainer.appendChild(artworkElement);
    }
  }

  const firstThreeArtworks = Array.from(artworksContainer.querySelectorAll('.artwork')).slice(0, 3);
  const lastArtwork = artworksContainer.querySelector('.artwork:last-child');

  firstThreeArtworks.forEach(artwork => {
    artwork.style.flex = '1 0 33.33%';
  });

  artworksContainer.style.display = 'flex';
  artworksContainer.style.flexWrap = 'wrap';

  firstThreeArtworks.forEach(artwork => {
    artworksContainer.appendChild(artwork);
  });

  artworksContainer.insertBefore(portraitArtwork, lastArtwork.nextSibling);
};

fetchArtworks();
