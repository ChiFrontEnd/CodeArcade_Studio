## 🌗 Light & Dark Mode
## 📌 Overview
***Light & Dark Mode*** is a clean, modern web application that demonstrates real-time theme switching using **CSS Variables** and **Vanilla JavaScript**. It also features dynamic content rendering with **Moment.js** for formatting blog post dates.

---

## ✨ Features
* **Dynamic Theme Switching -** Seamlessly toggle between light and dark modes by manipulating CSS variables via the DOM.
* **Moment.js Integration -** Automatically formats raw date data into a user-friendly format (e.g., "July 13th, 2026").
* **Dynamic Content Rendering -** Blog posts are generated dynamically from an external data source, keeping the markup clean and scalable.
* **Smooth Transitions -** CSS `transition` properties ensure the theme switch is visually comfortable for the user.

---

## 🖼️ Preview
<p align="center">
  <img src="Images/Output.PNG" alt="Screenshot">
</p>

---

## 🚀 Getting Started
1. Clone or download this repository.
2. Open `index.html` in your browser to view the interface.
3. Click the **"Dark Mode"** button in the navigation bar to see the theme change in real-time.

---

## 📂 Project Structure
```text
Dark-Mode-Toggle/
│
├── data.js           # External file containing blog post objects
├── index.html        # Main structure of the application
├── Style.css         # CSS variables for light/dark themes
├── Script.js         # Theme toggle logic and article rendering
└── README.md         # Project documentation

```

---

## 🛠 Tech Stack
<div style="display: flex; flex-wrap: wrap; gap: 8px;">
<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
<img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white">
<img src="https://img.shields.io/badge/JAVASCRIPT-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
<img src="https://img.shields.io/badge/GIT-F05032?style=for-the-badge&logo=git&logoColor=white">
<img src="https://img.shields.io/badge/GITHUB-181717?style=for-the-badge&logo=github&logoColor=white">
</div>

---

## 📌 Future Enhancements
* **Persistent Preferences -** Save the user's theme preference using `localStorage` so the setting remains after page reloads.
* **System Detection -** Automatically detect and apply the user's OS-level theme preference using `prefers-color-scheme`.
* **Customizable Posts -** Add a form to allow users to create their own blog posts dynamically.
* **Animated Toggle -** Replace the button with a stylish sun/moon icon toggle switch.
