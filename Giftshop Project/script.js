const slider = document.querySelector('.slider-track');
const wrapper = document.querySelector('.slider-product-wrapper');
const bgmTop = document.querySelector('.bgm-top');
const bgmBottom = document.querySelector('.bgm-bottom');

let isDragging = false;
let startX = 0;
let translateX = 0;

const maxFade = 300; // how long the text fades

// Update bounds dynamically
function getLimits() {
  const maxTranslate = 0;
  const minTranslate = Math.min(0, wrapper.offsetWidth - slider.scrollWidth);
  return { maxTranslate, minTranslate };
}

// Mouse events
wrapper.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.clientX;
  wrapper.style.cursor = 'grabbing';
});

document.addEventListener('mouseup', () => {
  isDragging = false;
  wrapper.style.cursor = 'grab';
});

document.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  const deltaX = e.clientX - startX;
  startX = e.clientX;
  translateX += deltaX;

  const maxTranslate = 0;
  const minTranslate = -2100; // Your custom scroll limit
  translateX = Math.min(maxTranslate, Math.max(minTranslate, translateX));
  ;

  slider.style.transform = `translateX(${translateX}px)`;
  updateFade();
});
document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
  
    // Fix: check if mouse button is still held
    if (e.buttons === 0) {
      isDragging = false;
      wrapper.style.cursor = 'grab';
      return;
    }
  
    const deltaX = e.clientX - startX;
    startX = e.clientX;
    translateX += deltaX;
  
    slider.style.transform = `translateX(${translateX}px)`;
    updateFade();
  });
  
// Touch events
wrapper.addEventListener('touchstart', (e) => {
  isDragging = true;
  startX = e.touches[0].clientX;
});

wrapper.addEventListener('touchend', () => {
  isDragging = false;
});

wrapper.addEventListener('touchmove', (e) => {
  if (!isDragging) return;
  const deltaX = e.touches[0].clientX - startX;
  startX = e.touches[0].clientX;
  translateX += deltaX;

  const { maxTranslate, minTranslate } = getLimits();
  translateX = Math.min(maxTranslate, Math.max(minTranslate, translateX));

  slider.style.transform = `translateX(${translateX}px)`;
  updateFade();
});

// Fading left text
function updateFade() {
  const fadeAmount = Math.min(Math.abs(translateX), maxFade);
  const opacity = Math.max(0, 1 - fadeAmount / maxFade);
  bgmTop.style.opacity = opacity;
  bgmBottom.style.opacity = opacity;
}



/*Search Bar*/
fetch('products.json')
  .then(res => res.json())
  .then(products => {
    const fuse = new Fuse(products, {
      keys: ['name', 'tags'],
      threshold: 0.4
    });

    document.getElementById('searchInput').addEventListener('input', (e) => {
      const results = fuse.search(e.target.value);
      const output = document.getElementById('searchResults');
      output.innerHTML = '';

      if (results.length > 0) {
        output.style.display = 'block';
        results.forEach(r => {
          const li = document.createElement('li');

          const img = document.createElement('img');
          img.src = r.item.image;
          img.alt = r.item.name;
          img.className = 'result-img';

          const span = document.createElement('span');
          span.textContent = r.item.name;

          li.appendChild(img);
          li.appendChild(span);

          // ✅ Add redirect on click here
          li.addEventListener('click', () => {
            window.location.href = `product.html?id=${r.item.id}`;
          });

          output.appendChild(li);
        });
      } else {
        output.style.display = 'none';
      }
    });
  });
