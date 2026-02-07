(function () {

    /* =========================
       TEMPLE DATA (10 TOTAL)
    ========================== */
    const temples = [
        {
            templeName: "Aba Nigeria",
            location: "Aba, Nigeria",
            dedicated: "2005, August, 7",
            area: 11500,
            imageUrl:
                "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
        },
        {
            templeName: "Manti Utah",
            location: "Manti, Utah, United States",
            dedicated: "1888, May, 21",
            area: 74792,
            imageUrl:
                "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
        },
        {
            templeName: "Payson Utah",
            location: "Payson, Utah, United States",
            dedicated: "2015, June, 7",
            area: 96630,
            imageUrl:
                "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
        },
        {
            templeName: "Yigo Guam",
            location: "Yigo, Guam",
            dedicated: "2020, May, 2",
            area: 6861,
            imageUrl:
                "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
        },
        {
            templeName: "Washington D.C.",
            location: "Kensington, Maryland, United States",
            dedicated: "1974, November, 19",
            area: 156558,
            imageUrl:
                "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
        },
        {
            templeName: "Lima Perú",
            location: "Lima, Perú",
            dedicated: "1986, January, 10",
            area: 9600,
            imageUrl:
                "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
        },
        {
            templeName: "Mexico City Mexico",
            location: "Mexico City, Mexico",
            dedicated: "1983, December, 2",
            area: 116642,
            imageUrl:
                "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
        },

        /* ===== NEW TEMPLES ADDED ===== */

        {
            templeName: "Kinshasa DR Congo",
            location: "Kinshasa, Democratic Republic of the Congo",
            dedicated: "2019, April, 14",
            area: 12000,
            imageUrl:
                "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/kinshasa-democratic-republic-of-congo/800x500/02-Kinshasa-DRCongo-Temple-2208931.jpg"
        },
        {
            templeName: "Fukuoka Japan",
            location: "Fukuoka, Japan",
            dedicated: "2000, June, 11",
            area: 10700,
            imageUrl:
                "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/fukuoka-japan/800x500/fukuoka-japan-temple-lds-306863-wallpaper.jpg"
        },
        {
            templeName: "Barranquilla Colombia",
            location: "Barranquilla, Colombia",
            dedicated: "2018, December, 9",
            area: 25300,
            imageUrl:
                "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/barranquilla-colombia/800x500/3-Barranquilla-Columblia-Temple-2135198.jpg"
        }
    ];

    /* =========================
       DOM REFERENCES
    ========================== */
    const container = document.getElementById("temples-list");
    const filterButtons = document.querySelectorAll(".temple-filters button");

    /* =========================
       HELPER FUNCTIONS
    ========================== */
    function getYear(dedicated) {
        return parseInt(dedicated.split(",")[0]);
    }

    function displayTemples(list) {
        container.innerHTML = "";

        if (list.length === 0) {
            container.innerHTML = "<p>No temples match this filter.</p>";
            return;
        }

        list.forEach(t => {
            const card = document.createElement("article");
            card.className = "figure-card";

            card.innerHTML = `
                <img src="${t.imageUrl}" alt="${t.templeName}" loading="lazy">
                <div class="meta">
                    <h3>${t.templeName}</h3>
                    <p><strong>Location:</strong> ${t.location}</p>
                    <p><strong>Dedicated:</strong> ${t.dedicated}</p>
                    <p><strong>Area:</strong> ${t.area.toLocaleString()} sqft</p>
                </div>
            `;

            container.appendChild(card);
        });
    }

    /* =========================
       FILTERING
    ========================== */
    function filterTemples(filter) {
        let result = temples;

        switch (filter) {
            case "old":
                result = temples.filter(t => getYear(t.dedicated) < 1900);
                break;
            case "new":
                result = temples.filter(t => getYear(t.dedicated) > 2000);
                break;
            case "large":
                result = temples.filter(t => t.area > 90000);
                break;
            case "small":
                result = temples.filter(t => t.area < 10000);
                break;
            default:
                result = temples;
        }

        filterButtons.forEach(btn => {
            const active = btn.dataset.filter === filter;
            btn.classList.toggle("active", active);
            btn.setAttribute("aria-pressed", active);
        });

        localStorage.setItem("lastTempleFilter", filter);
        displayTemples(result);
    }

    /* =========================
       EVENTS
    ========================== */
    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            filterTemples(btn.dataset.filter);
        });
    });

    /* =========================
       INITIAL LOAD
    ========================== */
    const savedFilter = localStorage.getItem("lastTempleFilter") || "home";
    filterTemples(savedFilter);

    document.getElementById("currentyear").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent =
        `Last modified: ${document.lastModified}`;

})();
