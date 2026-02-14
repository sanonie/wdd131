/**
 * Product Review Form - JavaScript
 * Populates product selection and handles form functionality
 */

// Product data array
const products = [
    { id: "fc-1888", name: "flux capacitor", averagerating: 4.5 },
    { id: "fc-2050", name: "power laces", averagerating: 4.7 },
    { id: "fs-1987", name: "time circuits", averagerating: 3.5 },
    { id: "ac-2000", name: "low voltage reactor", averagerating: 3.9 },
    { id: "jj-1969", name: "warp equalizer", averagerating: 5.0 }
];

/**
 * Populate Product Select Element
 * Creates options dynamically from products array
 */
function populateProductSelect() {
    const select = document.querySelector("#product");

    // Check if select element exists
    if (!select) {
        console.error("Product select element not found");
        return;
    }

    // Iterate through products and create options
    products.forEach(product => {
        const option = document.createElement("option");
        option.value = product.id;
        option.textContent = product.name;
        select.appendChild(option);
    });
}

/**
 * Initialize form when DOM is ready
 */
document.addEventListener("DOMContentLoaded", function () {
    // Populate the product select dropdown
    populateProductSelect();

    // Optional: Handle form submission if needed
    const form = document.querySelector("#reviewForm");
    if (form) {
        form.addEventListener("submit", function (e) {
            // Form validation happens automatically with HTML5 required attributes
            // This is here for any additional processing if needed
            console.log("Form submitted successfully");
        });
    }
});
