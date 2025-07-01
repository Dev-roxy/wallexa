document.addEventListener("DOMContentLoaded", function () {
  const categories = [
    {
      name: "Nature",
      image: "images/categories/nature.png",
    },
    {
      name: "Animal",
      image: "images/categories/animal.png",
    },
    {
      name: "Business",
      image: "images/categories/business.png",
    },
    {
      name: "Person",
      image: "images/categories/person.png",
    },
    {
      name: "Scenery",
      image: "images/categories/scenery.png",
    },
    {
      name: "Science",
      image: "images/categories/science.png",
    },
  ];
  const categorySection = document.querySelector(".categorySection");
  if (categorySection) {
    const categoryList = document.createElement("div");
    categoryList.className = "categoryList";
    categories.forEach((category) => {
      const card = generateCategoryCard(category);
      categoryList.appendChild(card);
    });
    categorySection.appendChild(categoryList);
  }
});


// Create a sentinel element at the top of the page
const sentinelElement = document.createElement("div");
sentinelElement.style.position = "absolute";
sentinelElement.style.top = "0";
sentinelElement.style.height = "10px"; // Height corresponds to scroll threshold
sentinelElement.style.width = "100%";
sentinelElement.style.pointerEvents = "none"; // Prevents interference with clicks
sentinelElement.style.zIndex = "-1"; // Behind other elements
document.body.prepend(sentinelElement);

// Create the IntersectionObserver
const navbarObserver = new IntersectionObserver(
  (entries) => {
    const navbar = document.querySelector("header");
    // If sentinel is not intersecting (scrolled out of view), add scrolled class
    if (!entries[0].isIntersecting) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  },
  {
    threshold: 0, // Trigger as soon as element enters/leaves viewport
  }
);

// Start observing the sentinel
navbarObserver.observe(sentinelElement);

// Observe changes in the wallpaper container and apply fade-in effect
const wallpaperContainer = document.querySelector(".wallpaperContainer");

// const observer = new MutationObserver((mutations) => {
//   mutations.forEach((mutation) => {
//     if (mutation.type === "childList") {
//       const newWallpapers = mutation.addedNodes;
//       newWallpapers.forEach((wallpaper) => {
//         wallpaper.classList.add("fade-in");
//         setTimeout(() => {
//           wallpaper.classList.remove("fade-in");
//         }, 1000);
//       });
//     }
//   });
// });

// observer.observe(wallpaperContainer, {
//   childList: true,
//   subtree: true,
// });

const searchBar = document.querySelector(".searchBar");
const searchBox = document.querySelector(".searchBox");

const searchBoxObserverOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.4,
};

const searchCallback = (entries) => {
  entries.forEach(async (entry) => {
    // If the searchBox is in view, add the class to the searchBar
    if (!entry.isIntersecting) {
      searchBar.classList.add("visibleBar");
    } else {
      searchBar.classList.add("fadeOut");
      await delay(0.3); // Wait for 0.5 seconds before removing the class to allow for fade-in effect
      searchBar.classList.remove("visibleBar");
      searchBar.classList.remove("fadeOut");
    }
  });
};
const searchBoxObserver = new IntersectionObserver(
  searchCallback,
  searchBoxObserverOptions
);
searchBoxObserver.observe(searchBox);


// Render loading skeletons in the wallpaper container
// This is just for demonstration purposes. it will be  removed
renderLoadingSkeleton(wallpaperContainer, 14);