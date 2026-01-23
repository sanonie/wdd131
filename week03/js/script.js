
function calculateWindChill(temp, windSpeed) {

    if (temp <= 10 && windSpeed > 4.8) {
        return Math.round(13.12 + 0.6215 * temp - 11.37 * Math.pow(windSpeed, 0.16) + 0.3965 * temp * Math.pow(windSpeed, 0.16));
    } else {
        return "N/A";
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const temp = 25;
    const windSpeed = 5;
    const windchill = calculateWindChill(temp, windSpeed);
    document.getElementById('windchill').textContent = windchill;


    const currentYear = new Date().getFullYear();
    const lastModified = document.lastModified;
    document.getElementById('current-year').textContent = currentYear;
    document.getElementById('last-modified').textContent = lastModified;
});
