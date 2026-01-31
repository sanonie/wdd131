// JavaScript to set site-wide date elements (robust and compatible)
(function () {
    const year = new Date().getFullYear();
    const last = document.lastModified || new Date().toString();

    // Helper to set text if element exists
    function setText(id, text) {
        const el = document.getElementById(id);
        if (el) el.textContent = text;
    }

    // Set current year for common id variants
    ['currentyear', 'current-year', 'currentYear'].forEach(id => setText(id, year));

    // Set last modified text for common id variants
    const lastText = `Last modified: ${last}`;
    ['lastModified', 'last-modified', 'last_modified'].forEach(id => setText(id, lastText));
})();
