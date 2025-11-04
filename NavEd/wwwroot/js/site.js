const dot = document.getElementById('tracker-dot');
const latDisplay = document.getElementById('lat');
const lonDisplay = document.getElementById('lon');
const accDisplay = document.getElementById('acc');

let initialLat = null;
let initialLon = null;

// 🚨 MODIFIED SCALING FACTOR for the small box 🚨
// This smaller value keeps the movement contained within the 300px box.
const SCALING_FACTOR = 50000; 
const MAX_OFFSET = 140; // Prevent dot from moving too far off the center of the 300px box (150px)

function handleLocationUpdate(position) {
    const { latitude, longitude, accuracy } = position.coords;

    // 1. Initialize the anchor point on the first run
    if (initialLat === null) {
        initialLat = latitude;
        initialLon = longitude;
        dot.style.left = '50%';
        dot.style.top = '50%';
    }

    // 2. Calculate pixel movement based on coordinate change
    const deltaLat = latitude - initialLat;
    const deltaLon = longitude - initialLon;
    
    let xOffset = deltaLon * SCALING_FACTOR; 
    let yOffset = deltaLat * -SCALING_FACTOR;

    // 🆕 BOUNDARY CHECK: Clamp the offsets to prevent the dot from leaving the box
    xOffset = Math.min(Math.max(xOffset, -MAX_OFFSET), MAX_OFFSET);
    yOffset = Math.min(Math.max(yOffset, -MAX_OFFSET), MAX_OFFSET);

    // 3. Move the dot (Visual Proof)
    // The dot shifts relative to the box's center.
    dot.style.transform = `translate(calc(-50% + ${xOffset}px), calc(-50% + ${yOffset}px))`;

    // 4. Update display and dot color (Feedback)
    latDisplay.textContent = latitude.toFixed(6);
    lonDisplay.textContent = longitude.toFixed(6);
    accDisplay.textContent = accuracy.toFixed(2);
    
    // Change dot color based on accuracy
    if (accuracy < 10) {
        dot.style.backgroundColor = '#2ecc71'; // Green: High accuracy
    } else if (accuracy < 50) {
        dot.style.backgroundColor = '#f39c12'; // Orange: Medium accuracy
    } else {
        dot.style.backgroundColor = '#e74c3c'; // Red: Low accuracy
    }
}

function handleLocationError(error) {
    // ... (This function remains unchanged) ...
    let message = '';
    switch (error.code) {
        case error.PERMISSION_DENIED:
            message = "User denied Geolocation access.";
            break;
        case error.POSITION_UNAVAILABLE:
            message = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            message = "The request to get user location timed out.";
            break;
        default:
            message = "An unknown error occurred.";
    }
    latDisplay.innerHTML = `**Error:** ${message}`;
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
    latDisplay.innerHTML = "Geolocation is not supported by this browser.";
}