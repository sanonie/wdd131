
(function () {
    const origin = window.location.origin;


    const sourceTemples = [
        {
            templeName: "Aba Nigeria",
            location: "Aba, Nigeria",
            dedicated: "2005-08-07",
            area: 11500,
            imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
        },
        {
            templeName: "Manti Utah",
            location: "Manti, Utah, United States",
            dedicated: "1888-05-21",
            area: 74792,
            imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
        },
        {
            templeName: "Payson Utah",
            location: "Payson, Utah, United States",
            dedicated: "2015-06-07",
            area: 96630,
            imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
        },
        {
            templeName: "Yigo Guam",
            location: "Yigo, Guam",
            dedicated: "2020-05-02",
            area: 6861,
            imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
        },
        {
            templeName: "Washington D.C.",
            location: "Kensington, Maryland, United States",
            dedicated: "1974-11-19",
            area: 156558,
            imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
        },
        {
            templeName: "Lima Perú",
            location: "Lima, Perú",
            dedicated: "1986-01-10",
            area: 9600,
            imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
        },
        {
            templeName: "Mexico City Mexico",
            location: "Mexico City, Mexico",
            dedicated: "1983-12-02",
            area: 116642,
            imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
        },
        {
            templeName: "Tokyo Japan",
            location: "Tokyo, Japan",
            dedicated: "1988-10-27",
            area: 21000,
            imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/tokyo-japan/800x500/tokyo_japan_temple-recommend-desk.jpeg"
        },
        {
            templeName: "Bern Switzerland",
            location: "Bern, Switzerland",
            dedicated: "1955-09-11",
            area: 8700,
            imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/bern-switzerland/800x500/bern-switzerland-temple-lds-784288-wallpaper.jpg"
        },
        {
            templeName: "Sydney Australia",
            location: "Sydney, Australia",
            dedicated: "1984-09-15",
            area: 107000,
            imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/sydney-australia/800x500/sydney-australia-temple-766362-wallpaper.jpg"
        }
    ];

    // Map to local fallback images
    const localFallbacks = {
        tokyo: 'week02/image/tokyojapan.jpeg',
        bern: 'week02/image/bernswitzerland.jpg',
        sydney: 'week02/image/sydney.jpg'
    };


    Object.values(localFallbacks).forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });


    const temples = sourceTemples.map(t => ({
        name: t.templeName,
        location: t.location,
        dedicated: t.dedicated,
        area: t.area,
        image: t.imageUrl
    }));

    const container = document.getElementById('temples-list');
    const filterNav = document.querySelector('.temple-filters');

    function createTempleCard(t) {
        const card = document.createElement('article');
        card.className = 'figure-card';

        const img = document.createElement('img');
        img.alt = t.name;
        img.loading = 'lazy';
        img.decoding = 'async';
        img.width = 600;
        img.height = 400;
        img.src = t.image;

        // Fallback logic
        img.addEventListener('error', () => {
            const key = t.name.toLowerCase();
            if (key.includes('tokyo')) img.src = localFallbacks.tokyo;
            else if (key.includes('bern')) img.src = localFallbacks.bern;
            else if (key.includes('sydney')) img.src = localFallbacks.sydney;
            else img.src = `${origin}/week02/image/fallback.jpg`; // generic fallback
            img.classList.add('img-fallback');
            img.alt = `${t.name} (image unavailable)`;
        });

        const meta = document.createElement('div');
        meta.className = 'meta';
        meta.innerHTML = `
            <h3>${t.name}</h3>
            <p>Location: ${t.location}</p>
            <p>Dedicated: ${new Date(t.dedicated).toLocaleDateString()}</p>
            <p>Area: ${t.area.toLocaleString()} sqft</p>
        `;

        card.appendChild(img);
        card.appendChild(meta);
        return card;
    }

    function renderList(list) {
        container.innerHTML = '';
        if (!list.length) {
            container.innerHTML = '<p>No temples match this filter.</p>';
            return;
        }
        const frag = document.createDocumentFragment();
        list.forEach(t => frag.appendChild(createTempleCard(t)));
        container.appendChild(frag);
    }

    function setActiveButton(type) {
        document.querySelectorAll('.temple-filters button[data-filter]').forEach(btn => {
            const isActive = btn.getAttribute('data-filter') === type;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-pressed', String(isActive));
        });
    }

    function filterTemples(type) {
        let result = [];
        switch (type) {
            case 'old':
                result = temples.filter(t => new Date(t.dedicated).getFullYear() < 1900);
                break;
            case 'new':
                result = temples.filter(t => new Date(t.dedicated).getFullYear() > 2000);
                break;
            case 'large':
                result = temples.filter(t => t.area > 90000);
                break;
            case 'small':
                result = temples.filter(t => t.area < 10000);
                break;
            default:
                result = temples.slice();
        }
        localStorage.setItem('lastTempleFilter', type);
        setActiveButton(type);
        renderList(result);
    }

    filterNav.addEventListener('click', e => {
        if (e.target && e.target.matches('button[data-filter]')) {
            filterTemples(e.target.getAttribute('data-filter'));
        }
    });

    window.addEventListener('DOMContentLoaded', () => {
        const lastFilter = localStorage.getItem('lastTempleFilter') || 'home';
        filterTemples(lastFilter);

        const currentYearElem = document.getElementById('currentyear');
        const lastModifiedElem = document.getElementById('lastModified');
        if (currentYearElem) currentYearElem.textContent = new Date().getFullYear();
        if (lastModifiedElem) lastModifiedElem.textContent = `Last modified: ${document.lastModified}`;
    });
})();
sle