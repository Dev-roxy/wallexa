const closeAnimationDuration = 500;
const openAnimationDuration = 600;
const menuHeight = '200px';
const menuHeightClose = '0px';
const apiKey = "YOUR_API_KEY_HERE"; // Replace with your actual API key
const apiUrl = `https://pixabay.com/api/?key=${apiKey}`;

//  search constants
const searchValues = {
    page : 1,
    per_page : 10,
    order : "",
    orientation : "",
    safesearch : false,
    image_type :"photo",
}

// internet status
let isOnline = true;


