// Accommodations JavaScript
document.addEventListener('DOMContentLoaded', function () {
    const bookingForm = document.getElementById('bookingForm');
    const bookButtons = document.querySelectorAll('.book-btn');
    const confirmationDiv = document.getElementById('bookingConfirmation');

    // Set current year and last modified
    setFooterInfo();

    // Handle booking form submission
    bookingForm.addEventListener('submit', function (e) {
        e.preventDefault();
        handleBookingSubmission();
    });

    // Handle quick book buttons
    bookButtons.forEach(button => {
        button.addEventListener('click', function () {
            const type = this.getAttribute('data-type');
            quickBook(type);
        });
    });

    // Load any previous booking data
    loadPreviousBooking();
});

function handleBookingSubmission() {
    const formData = getFormData();
    const isValid = validateForm(formData);

    if (isValid) {
        saveBookingToStorage(formData);
        showConfirmation('success', 'Booking submitted successfully! We will contact you soon.');
        clearForm();
    } else {
        showConfirmation('error', 'Please fill in all required fields correctly.');
    }
}

function quickBook(type) {
    // Pre-fill the accommodation type
    document.getElementById('accommodation').value = type;
    // Scroll to form
    document.querySelector('.booking-form').scrollIntoView({ behavior: 'smooth' });
}

function getFormData() {
    return {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        checkin: document.getElementById('checkin').value,
        nights: parseInt(document.getElementById('nights').value),
        accommodation: document.getElementById('accommodation').value,
        timestamp: new Date().toISOString()
    };
}

function validateForm(data) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const today = new Date().toISOString().split('T')[0];

    return data.name.length > 0 &&
        emailRegex.test(data.email) &&
        data.checkin >= today &&
        data.nights > 0 &&
        data.accommodation !== '';
}

function saveBookingToStorage(booking) {
    const bookings = getBookingsFromStorage();
    bookings.push(booking);
    localStorage.setItem('madagascarBookings', JSON.stringify(bookings));
}

function getBookingsFromStorage() {
    const bookings = localStorage.getItem('madagascarBookings');
    return bookings ? JSON.parse(bookings) : [];
}

function loadPreviousBooking() {
    const bookings = getBookingsFromStorage();
    if (bookings.length > 0) {
        const lastBooking = bookings[bookings.length - 1];
        // Pre-fill form with last booking data
        document.getElementById('name').value = lastBooking.name || '';
        document.getElementById('email').value = lastBooking.email || '';
    }
}

function showConfirmation(type, message) {
    const confirmationDiv = document.getElementById('bookingConfirmation');
    confirmationDiv.className = type;
    confirmationDiv.textContent = message;
    confirmationDiv.style.display = 'block';

    // Hide after 5 seconds
    setTimeout(() => {
        confirmationDiv.style.display = 'none';
    }, 5000);
}

function clearForm() {
    document.getElementById('bookingForm').reset();
}

function setFooterInfo() {
    const currentYear = new Date().getFullYear();
    const lastModified = document.lastModified;

    document.getElementById('currentyear').textContent = currentYear;
    document.getElementById('lastModified').textContent = `Last modified: ${lastModified}`;
}