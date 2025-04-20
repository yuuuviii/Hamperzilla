document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');

  fetch('/Giftshop Project/products.json')
      .then(response => response.json())
      .then(products => {
          const product = products.find(p => p.id == productId);
          if (product) {
              const bigMediaWrapper = document.querySelector('.big-media-wrapper');
              const smallImagesContainer = document.getElementById('small-images-container');

              // Set initial big media
              bigMediaWrapper.innerHTML = `<img id="product-image" src="${product.image}" alt="${product.name}">`;

              document.getElementById('product-name').textContent = product.name;
              document.getElementById('product-category').textContent = product.category;
              document.getElementById('product-price').textContent = product.price;
              document.getElementById('product-discription').innerHTML = product.description.replace(/\n/g, '<br>');


              // Clear and populate small media
              smallImagesContainer.innerHTML = '';

              product.smallimg.forEach(mediaSrc => {
                  const isVideo = mediaSrc.endsWith('.mp4') || mediaSrc.endsWith('.webm') || mediaSrc.endsWith('.ogg');

                  if (isVideo) {
                      const videoElement = document.createElement('video');
                      videoElement.src = mediaSrc;
                      videoElement.muted = true;
                      videoElement.autoplay = true;
                      videoElement.loop = true;
                      videoElement.style.objectFit = 'cover';
                      videoElement.addEventListener('click', () => {
                          bigMediaWrapper.innerHTML = `<video id="product-image" src="${mediaSrc}" autoplay muted loop style="object-fit: cover;"></video>`;
                      });

                      smallImagesContainer.appendChild(videoElement);
                  } else {
                      const imgElement = document.createElement('img');
                      imgElement.src = mediaSrc;
                      imgElement.alt = `Small image of ${product.name}`;
                      imgElement.addEventListener('click', () => {
                          bigMediaWrapper.innerHTML = `<img id="product-image" src="${mediaSrc}" alt="${product.name}" style="object-fit: cover;">`;
                      });

                      smallImagesContainer.appendChild(imgElement);
                  }
              });
          } else {
              document.getElementById('prodetails').textContent = 'Product not found';
          }
      })
      .catch(error => console.error('Error fetching product data:', error));
});