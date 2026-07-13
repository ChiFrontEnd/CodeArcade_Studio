## 🔍 Wikipedia Search
## 📌 Overview
***Wikipedia Search*** is a dynamic, asynchronous web application that allows users to search the Wikipedia database in real-time. It leverages the **Wikipedia API** to fetch and display relevant articles, providing a clean and responsive search interface.

---

## ✨ Features

* **Live Search -** Fetches data directly from the official Wikipedia API as you type and submit.
* **Dynamic Results Rendering -** Automatically generates responsive grid cards for each search result.
* **Asynchronous Data Handling -** Uses `async/await` and `fetch` to handle API requests smoothly without reloading the page.
* **Clean UI/UX -** Features a minimalist design with a loading spinner and error handling for a professional user experience.
* **Responsive Design -** Results are displayed in a smart grid layout that adjusts from one column on mobile to three columns on desktop.

---

## 🚀 Getting Started

1. Clone or download this repository.
2. Open `index.html` in your browser.
3. Type your search term into the input field and click **"Search"** to view results.

---

## 📂 Project Structure

```text
Wikipedia-Search/
│
├── index.html        # Main interface structure
├── Style.css         # CSS variables, grid layouts, and styling
├── Script.js         # API integration, fetch logic, and DOM rendering
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
* **Debounced Search -** Implement debouncing to fetch results automatically as the user types, rather than requiring a button click.
* **History Tracking -** Display a "Recent Searches" section using `localStorage`.
* **Advanced Filters -** Add filters for language or result limits.
* **Dark Mode -** Implement a toggle to switch between light and dark themes.
