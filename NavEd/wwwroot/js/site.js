// ==============================
// MOVEMENT TRACKER DOT
// ==============================
const dot = document.getElementById('tracker-dot');

let initialLat = null;
let initialLon = null;

const SCALING_FACTOR = 50000;
const MAX_OFFSET = 140;

function handleLocationUpdate(position) {
    const { latitude, longitude, accuracy } = position.coords;

    // Set anchor point first time
    if (initialLat === null) {
        initialLat = latitude;
        initialLon = longitude;
        dot.style.left = '50%';
        dot.style.top = '50%';
    }

    const deltaLat = latitude - initialLat;
    const deltaLon = longitude - initialLon;

    let xOffset = deltaLon * SCALING_FACTOR;
    let yOffset = deltaLat * -SCALING_FACTOR;

    // Clamp movement
    xOffset = Math.min(Math.max(xOffset, -MAX_OFFSET), MAX_OFFSET);
    yOffset = Math.min(Math.max(yOffset, -MAX_OFFSET), MAX_OFFSET);

    // Move the dot
    dot.style.transform = `translate(calc(-50% + ${xOffset}px), calc(-50% + ${yOffset}px))`;

    // Dot color based on accuracy
    if (accuracy < 10) {
        dot.style.backgroundColor = '#2ecc71'; // Green: high accuracy
    } else if (accuracy < 50) {
        dot.style.backgroundColor = '#f39c12'; // Orange: medium
    } else {
        dot.style.backgroundColor = '#e74c3c'; // Red: low
    }
}

function handleLocationError(error) {
    console.warn("Location error:", error.message);
}

// Start continuous tracking
if ("geolocation" in navigator) {
    navigator.geolocation.watchPosition(
        handleLocationUpdate,
        handleLocationError,
        {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 5000
        }
    );
} else {
    console.warn("Geolocation is not supported by this browser.");
}

// ==============================
// BURGER MENU / SIDE MENU
// ==============================
const menuButton = document.querySelector('.menu-toggle-button');
const sideMenu = document.getElementById('side-menu');
const menuOverlay = document.getElementById('menu-overlay');
const closeMenuBtn = document.getElementById('close-menu');

menuButton.addEventListener('click', () => {
    sideMenu.classList.add('open');
    menuOverlay.style.display = 'block';
    document.body.style.overflow = 'hidden';
});

function closeMenu() {
    sideMenu.classList.remove('open');
    menuOverlay.style.display = 'none';
    document.body.style.overflow = 'auto';
}

if (menuOverlay) menuOverlay.addEventListener('click', closeMenu);
if (closeMenuBtn) closeMenuBtn.addEventListener('click', closeMenu);

const calendarButton = document.getElementById('calendar-button');
const eventsPanel = document.getElementById('events-panel');
const closeEventsBtn = document.getElementById('close-events');

// Open events panel
calendarButton.addEventListener('click', () => {
    eventsPanel.classList.add('open');
    document.body.style.overflow = 'hidden'; // optional: disable scrolling
});

// Close events panel
closeEventsBtn.addEventListener('click', () => {
    eventsPanel.classList.remove('open');
    document.body.style.overflow = 'auto';
});

// Close panel if clicked outside
document.addEventListener('click', (e) => {
    if (!eventsPanel.contains(e.target) && !calendarButton.contains(e.target)) {
        eventsPanel.classList.remove('open');
        document.body.style.overflow = 'auto';
    }
});
