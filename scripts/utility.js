function generateCategoryCard({ name, image }) {
  const card = document.createElement("div");
  card.className = "categoryCard";
  card.setAttribute("data-category", name.toLowerCase());
  card.innerHTML = `
            <img src=${image} loading="lazy" alt=${name} />
            <!-- <div class="cover"></div> -->
            <div class="categoryName">${name}</div>
    `;
  return card;
}

// <div style="--height: 350px" class="skeleton-card"></div>
function generateCardSkeleton() {
  const card = document.createElement("div");
  card.className = "skeleton-card";
  card.style.setProperty(
    "--height",
    `${Math.floor(Math.random() * 200) + 200}px`
  );
  return card;
}

function renderLoadingSkeleton(container, count) {
  container.innerHTML = ""; // Clear the container
  for (let i = 0; i < count; i++) {
    const cardSkeleton = generateCardSkeleton();
    container.appendChild(cardSkeleton);
  }
}
function delay(t) {
  return new Promise((resolve) => setTimeout(resolve, t * 1000));
}

function generateFetchUrl(url, params) {
  const urlObj = new URL(apiUrl, window.location.origin);
  Object.keys(params).forEach((key) => {
    if (params[key]) {
      urlObj.searchParams.append(key, params[key]);
    }
  });
  return urlObj.toString();
}

async function handleDownload(event, imageUrl, fallbackName) {
  
  event.preventDefault();
  const fetchImage = await fetch(imageUrl);
  if (!fetchImage.ok) {
    alert("Failed to download the image:", fetchImage.statusText);
    return;
  }
  fetchImage.blob().then(blob =>{
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = imageUrl.split('/').pop() || fallbackName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  })
}

function generateCard({ name, image, tags = [],largeImageURL }) {
  const filename = image.split('/').pop();
  const html = `
    <div class="card"  data-tooltip="${name}" style="--bg-color:${randomHexColor()};">
          
           <img
              src="${image}"
              alt="some"
              loading="lazy"
            />
            <div class="info">
              <div class="tags">
                ${tags
                  .filter((tag, index) => {
                    if (index <= 3) {
                      return tag;
                    }
                  })
                  .map((tag) => `<div class="tag">${tag}</div>`)
                  .join(" ")}
               </div>
              <div class="buttons">
                <button type="button" id="like" class="like" data-tooltip="like" data-href="${largeImageURL}" >
                  <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#e3e3e3"><path d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"/></svg>
                </button>
              </div>        
            </div>
          </div>
    `;

  const card = new DOMParser().parseFromString(html, "text/html").body
    .firstChild;

  return card;
}

function formatNumber(number) {
  // Format the number with commas
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

let randomInteger = (max) => Math.floor(Math.random() * max);
function randomRgbColor() {
  let r = randomInteger(255);
  let g = randomInteger(255);
  let b = randomInteger(255);
  return [r, g, b];
}

function randomHexColor() {
  let [r, g, b] = randomRgbColor();
  let hr = r.toString(16).padStart(2, "0");
  let hg = g.toString(16).padStart(2, "0");
  let hb = b.toString(16).padStart(2, "0");
  return "#" + hr + hg + hb;
}

function imageLoadingPreview(nodes) {
  // const nodes = document.querySelectorAll(".card");
  nodes.forEach((node) => {
    const img = node.querySelector("img");
    
    if (!img) return; // Skip if no image found in the node
    const loaded = () => {
      node.classList.add("loaded");
    };
    if (img.complete) {
      loaded();
    } else {
      img.addEventListener("load", loaded);
    }
  });
}
