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
        dot.style.backgroundColor = '#2ecc71'; // Green
    } else if (accuracy < 50) {
        dot.style.backgroundColor = '#f39c12'; // Orange
    } else {
        dot.style.backgroundColor = '#e74c3c'; // Red
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
