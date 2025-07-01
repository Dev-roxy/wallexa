#  WallExa — Wallpaper Explorer Application

![Status](https://img.shields.io/badge/Project-Complete-green)  
[![Live Demo](https://img.shields.io/badge/View-Live-green?logo=render&logoColor=white)](https://wallexa.onrender.com)  
[![GitHub](https://img.shields.io/badge/Source-Code-blue?logo=github)](https://github.com/Dev-roxy/wallexa)

---

## 🌐 Overview

**WallExa** is a modern web application for discovering, browsing, and downloading high-quality wallpapers. It features a **responsive card-based layout**, **category filtering**, **skeleton-based lazy loading**, and **client-side image download** — all built using **vanilla JavaScript**, **HTML5**, and **CSS3**.

> ⚠️ *Note: Hosted on a free Render server — initial load may take a few seconds due to cold start.*

---

## ✨ Features

- 🖼️ Dynamic wallpaper gallery powered by Pixabay API  
- 🔍 Search functionality with multiple parameter support  
- 🗂️ Filter images by category  
- 📱 Responsive design (mobile-friendly)  
- 🕸️ Lazy loading with skeleton placeholders  
- ⬇️ One-click image download  
- 🏷️ Tag-based image discovery  

---

## 🚀 Live Demo

👉 [**Try WallExa**](https://wallexa.onrender.com)

---

## 📂 Project Structure

```
WallExa/
├── images/
│   ├── categories/              # Category thumbnails
│   │   ├── 1.jpeg, 2.png, ...   # Sample images
│   ├── heroBg.jpg               # Hero section background
│   ├── heroBg-lower.webp        # Low-resolution background
│   ├── image.png                # Miscellaneous image asset
│   └── logo.png                 # App logo
│
├── scripts/
│   ├── animation.js             # UI animation handlers
│   ├── app.js                   # Main application logic
│   ├── constants.js             # Configs (API key, base URLs, etc.)
│   ├── listners.js              # Event listeners (*recommend renaming to listeners.js*)
│   ├── render.js                # DOM rendering functions
│   └── utility.js               # Helper functions
│
├── styles/
│   ├── app.css                  # Global styles
│   ├── component.css            # Reusable component styles
│   ├── skeleton.css             # Skeleton loader styles
│   └── utility.css              # Utility classes (spacing, display)
│
├── index.html                   # HTML entry point
└── README.md                    # This file
```

---

## 🛠️ Installation & Local Setup

1. **Clone the repository:**
```bash
git clone https://github.com/Dev-roxy/wallexa.git
cd wallexa/public
```

2. **Open in your code editor**

3. **Run a local server:**

Using Python:
```bash
python -m http.server 8000
```

Using Node.js:
```bash
npx http-server
```

4. **Visit in your browser:**
```
http://localhost:8000
```

---

## ⚙️ Technologies Used

- HTML5 / CSS3
- Vanilla JavaScript (ES6+)
- Fetch API
- CSS Grid & Flexbox
- DOM manipulation with utility-based modular structure

---

## 🔗 API Integration

WallExa uses the [Pixabay API](https://pixabay.com/api/docs/) to dynamically fetch wallpaper content.  
Includes:

- ✅ Pagination  
- ✅ Multi-keyword search  
- ✅ Category/orientation filtering  
- ✅ SafeSearch toggles

> 🔐 **Important:** Replace the demo API key in `constants.js` with your own for production use.

---


## 🧑‍💻 Usage Guide

- Use the **search bar** to find specific wallpapers  
- Filter wallpapers using the **category menu**  
- Click the **download button** to save images locally  
- Use **tags** to explore similar wallpaper sets

---

## 🙏 Credits

- 🖼️ [Pixabay API](https://pixabay.com/api/docs/) — for open-access wallpaper content  
- 🎨 [Google Material Icons](https://fonts.google.com/icons) — for clean UI icons

---

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).

---