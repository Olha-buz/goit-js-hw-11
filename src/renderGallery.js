export { renderGallery };

const gallery = document.querySelector('.gallery');

function renderGallery(images) {
  const markup = images
    .map(image => {
      return `
    <a href='${image.largeImageURL} class="large-image-link">
    <div class="gallery-item" id=${image.id}>
  <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" wigth="240"/> 
  <div class="info">
    <p class="info-item">
      <b>Likes</b>${image.likes}
    </p>
    <p class="info-item">
      <b>Views</b>${image.views}
    </p>
    <p class="info-item">
      <b>Comments</b>${image.comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>${image.downloads}
    </p>
  </div>
  </div>
  </a>
  `;
    })
    .join('');
  gallery.innerHTML=markup;
}
