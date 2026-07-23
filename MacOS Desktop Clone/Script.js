  // Handle Dropdown Toggling safely
    const dropdowns = document.querySelectorAll('.menu-dropdown');

    dropdowns.forEach(dropdown => {
      const item = dropdown.querySelector('.menu-item');
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        const isActive = dropdown.classList.contains('active');
        dropdowns.forEach(d => d.classList.remove('active'));
        if (!isActive) {
          dropdown.classList.add('active');
        }
      });
    });

    // Close dropdowns on outside clicks
    window.addEventListener('click', () => {
      dropdowns.forEach(d => d.classList.remove('active'));
    });

    // Dynamic App Name Changer based on dock clicks
    const dockLinks = document.querySelectorAll('.glass-content__link');
    const activeAppLabel = document.getElementById('active-app-name');

    dockLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const appName = link.getAttribute('data-app');
        if (appName) {
          activeAppLabel.innerText = appName;
        }
      });
    });

    // Real-time live updates for clock elements
    function updateClocks() {
      const now = new Date();
      let hours = now.getHours();
      let minutes = now.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;
      minutes = minutes < 10 ? '0' + minutes : minutes;
      const timeString = `${hours}:${minutes} ${ampm}`;

      const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
      const dateString = now.toLocaleDateString('en-US', options);

      document.getElementById('main-clock').innerText = timeString;
      document.getElementById('main-date').innerText = dateString;
    }

    setInterval(updateClocks, 1000);
    updateClocks();

    // Add this inside your <script> block
    document.querySelectorAll('.toggle-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        btn.classList.toggle('active');
        const statusSpan = btn.querySelector('.toggle-status');
        statusSpan.innerText = btn.classList.contains('active') ? 'On' : 'Off';
      });
    });

    // Add this JavaScript to link dock clicks and window controls together
    const appWindow = document.getElementById('app-window');
    const windowTitleText = document.getElementById('window-title-text');
    const windowContentBody = document.getElementById('window-content-body');

    // Open window when dock items are clicked
    document.querySelectorAll('.glass-content__link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const appName = link.getAttribute('data-app');
        if (appName) {
          windowTitleText.innerText = appName;
          windowContentBody.innerHTML = `<p>Running <strong>${appName}</strong> inside the interactive glass window container.</p>`;
          appWindow.style.display = 'flex';
          appWindow.classList.remove('minimized');
        }
      });
    });

    // Window control actions (Close, Minimize, Maximize)
    document.getElementById('win-close-btn').addEventListener('click', () => {
      appWindow.style.display = 'none';
    });

    document.getElementById('win-min-btn').addEventListener('click', () => {
      appWindow.style.display = 'none';
    });

    let isMaximized = false;
    document.getElementById('win-max-btn').addEventListener('click', () => {
      isMaximized = !isMaximized;
      if (isMaximized) {
        appWindow.style.width = '95vw';
        appWindow.style.height = '85vh';
      } else {
        appWindow.style.width = '500px';
        appWindow.style.height = '350px';
      }
    });

    // 4. Spotlight Search Modal Logic
    const spotlightOverlay = document.getElementById('spotlight-overlay');
    const spotlightInput = document.getElementById('spotlight-input');
    const spotlightResults = document.getElementById('spotlight-results');
    const spotlightTrigger = document.getElementById('open-spotlight-trigger');

    const spotlightApps = [
      { name: 'Finder', icon: '📁', category: 'System' },
      { name: 'Safari', icon: '🌐', category: 'Browser' },
      { name: 'Messages', icon: '💬', category: 'Social' },
      { name: 'Mail', icon: '✉️', category: 'Productivity' },
      { name: 'Photos', icon: '🖼️', category: 'Media' },
      { name: 'Settings', icon: '⚙️', category: 'System' },
      { name: 'Music', icon: '🎵', category: 'Media' },
      { name: 'Notes', icon: '📝', category: 'Productivity' }
    ];

    function renderSpotlightItems(filterText = '') {
      const filtered = spotlightApps.filter(app =>
        app.name.toLowerCase().includes(filterText.toLowerCase())
      );

      if (filtered.length === 0) {
        spotlightResults.innerHTML = `<div class="spotlight-empty">No results found for "${filterText}"</div>`;
        return;
      }

      spotlightResults.innerHTML = filtered.map((app, index) => `
        <div class="spotlight-item ${index === 0 ? 'selected' : ''}" data-app="${app.name}">
          <div class="spotlight-item-icon">${app.icon}</div>
          <div class="spotlight-item-name">${app.name}</div>
        </div>
      `).join('');

      document.querySelectorAll('.spotlight-item').forEach(item => {
        item.addEventListener('click', () => {
          const appName = item.getAttribute('data-app');
          closeSpotlight();
          windowTitleText.innerText = appName;
          windowContentBody.innerHTML = `<p>Running <strong>${appName}</strong> via Spotlight Search.</p>`;
          appWindow.style.display = 'flex';
          appWindow.classList.remove('minimized');
        });
      });
    }

    function openSpotlight() {
      if (spotlightOverlay) {
        spotlightOverlay.style.display = 'flex';
        spotlightInput.value = '';
        renderSpotlightItems();
        spotlightInput.focus();
      }
    }

    function closeSpotlight() {
      if (spotlightOverlay) {
        spotlightOverlay.style.display = 'none';
      }
    }

    if (spotlightTrigger) {
      spotlightTrigger.addEventListener('click', () => {
        openSpotlight();
      });
    }

    if (spotlightInput) {
      spotlightInput.addEventListener('input', (e) => {
        renderSpotlightItems(e.target.value);
      });
    }

    if (spotlightOverlay) {
      spotlightOverlay.addEventListener('click', (e) => {
        if (e.target === spotlightOverlay) {
          closeSpotlight();
        }
      });
    }

    // Keyboard Shortcuts (Ctrl+Space / Cmd+Space and Esc)
    document.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.code === 'Space') {
        e.preventDefault();
        if (spotlightOverlay && spotlightOverlay.style.display === 'flex') {
          closeSpotlight();
        } else {
          openSpotlight();
        }
      }
      if (e.key === 'Escape') {
        closeSpotlight();
      }
    });


    // Notification Center & Mini Calendar Logic
    document.addEventListener("DOMContentLoaded", () => {
      const notifDropdown = document.getElementById("notif-center-dropdown");
      const notifTrigger = notifDropdown.querySelector(".notif-badge-icon");
      const notifPanel = notifDropdown.querySelector(".notification-panel");

      notifTrigger.addEventListener("click", (e) => {
        e.stopPropagation();
        // Toggle active class or visibility
        notifPanel.classList.toggle("show-panel");
      });

      // Close panel when clicking outside
      document.addEventListener("click", (e) => {
        if (!notifDropdown.contains(e.target)) {
          notifPanel.classList.remove("show-panel");
        }
      });
    });

    // Mini Calendar Dynamic Generator Function
    function renderMiniCalendar() {
      const daysContainer = document.getElementById('cal-days-container');
      const monthYearLabel = document.getElementById('cal-month-year');
      if (!daysContainer || !monthYearLabel) return;

      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth();
      const todayDate = now.getDate();

      const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      monthYearLabel.innerText = `${monthNames[month]} ${year}`;

      const firstDayIndex = new Date(year, month, 1).getDay();
      const totalDays = new Date(year, month + 1, 0).getDate();
      const prevTotalDays = new Date(year, month, 0).getDate();

      let daysHTML = '';

      // Previous month trailing days
      for (let i = firstDayIndex; i > 0; i--) {
        daysHTML += `<span class="muted">${prevTotalDays - i + 1}</span>`;
      }

      // Current month active days
      for (let i = 1; i <= totalDays; i++) {
        const isToday = i === todayDate ? 'today' : '';
        daysHTML += `<span class="${isToday}">${i}</span>`;
      }

      // Next month leading fill cells (to maintain a stable 42-cell grid layout)
      const remainingCells = 42 - (firstDayIndex + totalDays);
      for (let i = 1; i <= remainingCells; i++) {
        daysHTML += `<span class="muted">${i}</span>`;
      }

      daysContainer.innerHTML = daysHTML;
    }

    // Initialize Calendar on Load
    renderMiniCalendar();