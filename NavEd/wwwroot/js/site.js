const dot = document.getElementById('tracker-dot');
const latDisplay = document.getElementById('lat');
const lonDisplay = document.getElementById('lon');
const accDisplay = document.getElementById('acc');

let initialLat = null;
let initialLon = null;

function handleLocationUpdate(position) {
    const { latitude, longitude, accuracy } = position.coords;

    // 1. Initialize the anchor point on the first run
    if (initialLat === null) {
        initialLat = latitude;
        initialLon = longitude;
        dot.style.left = '50%';
        dot.style.top = '50%';
    }

    // 2. Calculate the change in position
    // Scaling factor (e.g., 500000) converts coordinate difference to pixel shift
    const deltaLat = latitude - initialLat;
    const deltaLon = longitude - initialLon;
    const xOffset = deltaLon * 500000;
    const yOffset = deltaLat * -500000; // Negative because higher latitude (North) is a lower 'top' value

    // 3. Update the dot's position using CSS transform
    dot.style.transform = `translate(calc(-50% + ${xOffset}px), calc(-50% + ${yOffset}px))`;

    // 4. Update the display for verification
    latDisplay.textContent = latitude.toFixed(6);
    lonDisplay.textContent = longitude.toFixed(6);
    accDisplay.textContent = accuracy.toFixed(2);

    // Change dot color based on accuracy
    if (accuracy < 20) {
        dot.style.backgroundColor = '#2ecc71'; // Green: High accuracy
    } else {
        dot.style.backgroundColor = '#f39c12'; // Orange: Lower accuracy
    }
}

function handleLocationError(error) {
    let message = '';
    switch (error.code) {
        case error.PERMISSION_DENIED:
            message = "User denied the request for Geolocation.";
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
    latDisplay.textContent = `Error: ${message}`;
}

// Check for Geolocation support and start tracking
if ("geolocation" in navigator) {
    // Start continuous tracking with watchPosition()
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
    latDisplay.textContent = "Geolocation is not supported by this browser.";
}