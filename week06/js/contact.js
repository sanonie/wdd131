// Contact JavaScript
document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    // Set current year and last modified
    setFooterInfo();

    // Handle form submission
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        handleFormSubmission();
    });

    // Load saved form data if exists
    loadSavedFormData();
});

function handleFormSubmission() {
    const formData = getFormData();
    const isValid = validateForm(formData);

    if (isValid) {
        saveFormDataToStorage(formData);
        showMessage('success', 'Thank you for your message! We will get back to you within 24 hours.');
        clearForm();
    } else {
        showMessage('error', 'Please fill in all required fields correctly.');
    }
}

function getFormData() {
    return {
        firstName: document.getElementById('firstName').value.trim(),
        lastName: document.getElementById('lastName').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value.trim(),
        newsletter: document.getElementById('newsletter').checked,
        timestamp: new Date().toISOString()
    };
}

function validateForm(data) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;

    return data.firstName.length >= 2 &&
        data.lastName.length >= 2 &&
        emailRegex.test(data.email) &&
        (data.phone === '' || phoneRegex.test(data.phone.replace(/\s/g, ''))) &&
        data.subject !== '' &&
        data.message.length >= 10;
}

function saveFormDataToStorage(formData) {
    const messages = getMessagesFromStorage();
    messages.push(formData);
    localStorage.setItem('contactMessages', JSON.stringify(messages));

    // Also save for newsletter if subscribed
    if (formData.newsletter) {
        const subscribers = getSubscribersFromStorage();
        const subscriber = {
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            timestamp: formData.timestamp
        };
        subscribers.push(subscriber);
        localStorage.setItem('newsletterSubscribers', JSON.stringify(subscribers));
    }
}

function getMessagesFromStorage() {
    const messages = localStorage.getItem('contactMessages');
    return messages ? JSON.parse(messages) : [];
}

function getSubscribersFromStorage() {
    const subscribers = localStorage.getItem('newsletterSubscribers');
    return subscribers ? JSON.parse(subscribers) : [];
}

function loadSavedFormData() {
    const messages = getMessagesFromStorage();
    if (messages.length > 0) {
        const lastMessage = messages[messages.length - 1];
        // Pre-fill with last submitted data
        document.getElementById('firstName').value = lastMessage.firstName || '';
        document.getElementById('lastName').value = lastMessage.lastName || '';
        document.getElementById('email').value = lastMessage.email || '';
        document.getElementById('phone').value = lastMessage.phone || '';
    }
}

function showMessage(type, message) {
    const formMessage = document.getElementById('formMessage');
    formMessage.className = type;
    formMessage.textContent = message;
    formMessage.style.display = 'block';

    // Hide after 5 seconds
    setTimeout(() => {
        formMessage.style.display = 'none';
    }, 5000);
}

function clearForm() {
    document.getElementById('contactForm').reset();
}

function setFooterInfo() {
    const currentYear = new Date().getFullYear();
    const lastModified = document.lastModified;

    document.getElementById('currentyear').textContent = currentYear;
    document.getElementById('lastModified').textContent = `Last modified: ${lastModified}`;
}