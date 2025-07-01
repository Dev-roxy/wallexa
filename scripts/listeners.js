document.addEventListener("DOMContentLoaded", () => {
  const heroSection = document.querySelectorAll(".hero");
  imageLoadingPreview(heroSection); // Load images after rendering cards
  
});

window.ononline = function () {
  isOnline = true;
  alert("You are online. You can now access the features.");
};
window.onoffline = function () {
  isOnline = false;
  alert("You are offline. Please check your internet connection.");};


const filterSection = document.querySelector(".filterSection");

filterSection.addEventListener("click", (event) => {
  const customDropdown = event.target.closest(".custom-dropdown");

  if (document.querySelector(".filterSection:has( .custom-dropdown[open])")) {
    const openDropdown = document.querySelector(
      ".filterSection .custom-dropdown[open]"
    );
    if (openDropdown !== customDropdown) {
      openDropdown.removeAttribute("open");
    }
  }
  if (
    customDropdown?.classList.contains("custom-dropdown") ||
    event.target.classList.contains("custom-dropdown")
  ) {
    const rightDistance =
      window.innerWidth - customDropdown.getBoundingClientRect().right;

    if (rightDistance < 170) {
      customDropdown.querySelector(".options").style.right = "0px";
    } else {
      customDropdown.querySelector(".options").style.left = "0px";
    }
  }

  if (event.target.classList.contains("option")) {
    if (event.target.closest(".custom-dropdown").id === "selectable") {
      const selectedOption = event.target;
      const selectedValue = event.target.getAttribute("data-value");
      const selectedLabel = event.target.innerText;
      const dropdown = event.target.closest(".custom-dropdown#selectable");
      const optionName = dropdown.getAttribute("data-name");
      const optionValue = selectedOption.getAttribute("data-value");

      dropdown.querySelector("summary span").innerText = selectedLabel;
      // dropdown.setAttribute("data-value", selectedValue);
      if (dropdown.querySelector(".options:has(.option.selected)")) {
        dropdown
          .querySelector(".options .option.selected")
          .classList.remove("selected");
      }
      selectedOption.classList.add("selected");
      dropdown.removeAttribute("open");
      searchValues[optionName] = optionValue;
    }
  } else if (event.target.closest("li.switchOption")) {
    const optionValue = event.target.value ? true : false;
    const optionName = event.target
      .closest(".custom-dropdown")
      .getAttribute("data-name");
    searchValues[optionName] = optionValue;
  }
});

// adding hiding self hiding navbar using scroll event

let lastScroll = 0; // Last scroll position
let isThrottled = false; // Throttle flag
const navbar = document.querySelector("header"); // Select the navbar

window.addEventListener("scroll", function (event) {
  if (isThrottled) return;

  isThrottled = true;
  setTimeout(() => {
    isThrottled = false;
  }, 100); // Throttle every 100ms

  const currentScroll = window.pageYOffset;
  const heroHeight = this.document.querySelector(".hero").offsetHeight;
  const navbarHeight = navbar.offsetHeight;

  const navPercentageScrolled =
    (navbarHeight / (currentScroll - lastScroll)) * 100;
  if (currentScroll > lastScroll && currentScroll > heroHeight * 1.1) {
    navbar.style.top = `-100%`;
    filterSection.style.top = `9px`;
  } else {
    navbar.style.top = "0";
    filterSection.style.top = "79px";
  }

  lastScroll = currentScroll;
});

const searchBarInput = document.querySelector(".searchBar input");
const searchBoxInput = document.querySelector(".searchBox input");
const searchBoxBtn = document.querySelector(".searchBox button");

const NextPBtn = document.querySelector(".pagination .next");
const PrevPBtn = document.querySelector(".pagination .previous");

NextPBtn.addEventListener("click", function (e) {
  searchValues.page += 1;
  
  const searchValue = searchBoxInput.value || searchBarInput.value;
  if (!searchValue) {
    alert("Please enter a search term before navigating pages.");
    return;
  }
  search(searchValue);

  
});

PrevPBtn.addEventListener("click", function (e) {
  searchValues.page -= 1;
  const searchValue = searchBoxInput.value || searchBarInput.value;
  if (!searchValue) {
    alert("Please enter a search term before navigating pages.");
    return;
  }
  search(searchValue);
});


async function search(searchValue = "") {
  if (!isOnline) {
    alert("You are offline. Please check your internet connection.");
    return;
  }
  
  const searchBar = document.querySelector(".searchBar");
  const searchBarInput = searchBar.querySelector("input");
  searchBarInput.value = searchValue;
  
  const wallpaperContainer = document.querySelector(".wallpaperContainer");
  if (searchValue.length < 3) {
    alert("Please enter at least 3 characters to search.");
    return;
  }

  if (searchValue.length) {
    const categorySection = document.querySelector(".categorySection");
    categorySection.classList.add("hidden");
    const wallpaperSection = document.querySelector(".wallpaperSection");
    wallpaperSection.classList.remove("hidden");
  } else {
    const categorySection = document.querySelector(".categorySection");
    categorySection.classList.remove("hidden");
    const wallpaperSection = document.querySelector(".wallpaperSection");
    wallpaperSection.classList.add("hidden");
  }

  renderLoadingSkeleton(wallpaperContainer, 14);
  const url = generateFetchUrl(apiUrl, {
    ...searchValues,
    q: encodeURIComponent(searchValue),
  });
  const response = await fetch(url);
  const data = await response.json();
  if (response.status !== 200) {
    wallpaperContainer.innerHTML = `<div class="no-results">Error: ${data.message}</div>`;
    return;
  }

  
  const queryBox = document.querySelector(".query");
  const queryPara = document.querySelector(".queryPara");
  queryBox.innerText = `${searchValue} Images & pictures`;
  queryPara.innerText = `
      We handpicked more than ${formatNumber(
        data.total
      )} ${searchValue.toLowerCase()} pictures for your choosing. HD to 4K quality images, all for free!
      `;
  // pagiation
  const pagination = document.querySelector(".pagination");
  const totalPages = Math.ceil(data.totalHits / searchValues.per_page);
  const currentPage = searchValues.page;

  pagination.querySelector("#currentPage").innerText = currentPage;

  const paginationPhrase = currentPage === totalPages ? "You reached the end." :  `Next ${totalPages - currentPage} pages are waiting for you.`;

  pagination.setAttribute("data-remaining-pages",paginationPhrase);
  if (totalPages === 0 ) {
    pagination.querySelector(".next").classList.add("hidden");
    pagination.querySelector(".previous").classList.add("hidden");
    wallpaperContainer.innerHTML = `<div class="no-results">No results found for "${searchValue}"</div>`;
    return;
  }else if (totalPages === 1) {
     pagination.querySelector(".next").classList.add("hidden");
    pagination.querySelector(".previous").classList.add("hidden");
  }else if (currentPage === 1){
    pagination.querySelector(".next").classList.remove("hidden");
    pagination.querySelector(".previous").classList.add("hidden");
    pagination.querySelector("#currentPage").classList.add("hidden");
  }else if (currentPage === totalPages) {
    pagination.querySelector(".next").classList.add("hidden");
    pagination.querySelector(".previous").classList.remove("hidden");
  } else {
    pagination.querySelector(".next").classList.remove("hidden");
    pagination.querySelector(".previous").classList.remove("hidden");
  }

  const wallpapers = data.hits.map((hit) => ({
    name: hit.tags,
    image: hit.webformatURL,
    tags: hit.tags.split(",").map((tag) => tag.trim()),
    largeImageURL: hit.largeImageURL,
  }));

  wallpaperContainer.innerHTML = ""; // Clear the container
  wallpapers.forEach((wallpaper) => {
    const card = generateCard(wallpaper);
    wallpaperContainer.appendChild(card);
  });

  const cards = document.querySelectorAll(".card");
  imageLoadingPreview(cards); // Load images after rendering cards

  
}

searchBoxInput.addEventListener("input", async function (event) {
    
  searchValues.page = 1; // Reset page to 1 on new search

  const searchValue = event.target.value.toLowerCase();
  const searchBar = document.querySelector(".searchBar");
  const searchBarInput = searchBar.querySelector("input");
  searchBarInput.value = searchValue;
});

let timeoutId;
searchBarInput.addEventListener("keypress", function (event) {
  if (event.key !== "Enter") return; // Only proceed if the key pressed is Enter
  event.preventDefault(); // Prevent form submission
  
  searchValues.page = 1; // Reset page to 1 on new search

  const searchValue = event.target.value.toLowerCase();
  const searchBox = document.querySelector(".searchBox");
  const searchBoxInput = searchBox.querySelector("input");
  searchBoxInput.value = searchValue;
  
    search(searchValue);
});

// searchBox button click event
searchBoxBtn.addEventListener("click", function (event) {
    event.preventDefault(); // Prevent form submission
  searchValues.page = 1; // Reset page to 1 on new search
  search(searchBoxInput.value);
});
// searchBoxInput enter press event
searchBoxInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault(); // Prevent form submission
    searchValues.page = 1; // Reset page to 1 on new search
    search(searchBoxInput.value);
  }
});

document.querySelector(".wallpaperContainer").addEventListener("click", async function (event) {
  const downloadBtn = event.target.closest("button[data-href].like");
  if(!downloadBtn) return; // If the clicked element is not a button with data-href, do nothing
  if (!isOnline) {
    alert("You are offline. Please check your internet connection.");
    return;
  }
  event.stopPropagation(); // Prevent the event from bubbling up to the card click event
  event.preventDefault(); 
  const imageUrl = downloadBtn.getAttribute("data-href");
  const fallbackName = "downloaded_image.jpg"; // Fallback name if the image URL does not provide a filename

  await handleDownload(event, imageUrl, fallbackName);
  
}) 

document.querySelector(".categorySection").addEventListener("click", function (event) {
  const categoryCard = event.target.closest(".categoryCard");
  if (!categoryCard) return; // If the clicked element is not a category card, do nothing
  const categoryName = categoryCard.getAttribute("data-category");
  searchBarInput.value = categoryName; // Set the search input to the category name
  searchBoxInput.value = categoryName; // Set the search box input to the category name
  search(categoryName);
});


