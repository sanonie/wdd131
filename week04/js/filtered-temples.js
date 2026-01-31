
(function () {
    const origin = window.location.origin;

    const sourceTemples = [
        {
            templeName: "Aba Nigeria",
            location: "Aba, Nigeria",
            dedicated: "2005, August, 7",
            area: 11500,
            imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
        },
        {
            templeName: "Manti Utah",
            location: "Manti, Utah, United States",
            dedicated: "1888, May, 21",
            area: 74792,
            imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
        },
        {
            templeName: "Payson Utah",
            location: "Payson, Utah, United States",
            dedicated: "2015, June, 7",
            area: 96630,
            imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
        },
        {
            templeName: "Yigo Guam",
            location: "Yigo, Guam",
            dedicated: "2020, May, 2",
            area: 6861,
            imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
        },
        {
            templeName: "Washington D.C.",
            location: "Kensington, Maryland, United States",
            dedicated: "1974, November, 19",
            area: 156558,
            imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
        },
        {
            templeName: "Lima Perú",
            location: "Lima, Perú",
            dedicated: "1986, January, 10",
            area: 9600,
            imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
        },
        {
            templeName: "Mexico City Mexico",
            location: "Mexico City, Mexico",
            dedicated: "1983, December, 2",
            area: 116642,
            imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
        },
        {
            templeName: "Bern Switzerland",
            location: "Bern, Switzerland",
            dedicated: "1955, October, 23",
            area: 8900,
            imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/bern-switzerland/400x250/bern_switzerland_temple.jpg"
        },
        {
            templeName: "Tokyo Japan",
            location: "Tokyo, Japan",
            dedicated: "1988, October, 27",
            area: 21000,
            imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/tokyo-japan/400x250/tokyo_japan_temple.jpg"
        },
        {
            templeName: "Sydney Australia",
            location: "Sydney, Australia",
            dedicated: "1994, March, 9",
            area: 102000,
            imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/sydney-australia/400x250/sydney_australia_temple.jpg"
        }
    ];

    const temples = sourceTemples.map(t => ({
        name: t.templeName,
        location: t.location,
        dedicated: (new Date(t.dedicated)).toISOString().split('T')[0],
        area: t.area,
        image: t.imageUrl
    }));

    // Use local images for the last three temples and preload them hidden to avoid layout changes
    const images = [
        'sydney.jpg',
        'bernswitzerland.jpg',
        'tokyojapan.jpeg'
    ];

    // Assign the local image paths to the last three temple objects (keeps original order)
    for (let i = 0; i < images.length; i++) {
        const idx = temples.length - images.length + i;
        if (temples[idx]) {
            temples[idx].image = `${origin}/week02/image/${images[i]}`;
        }
    }

    // Preload the local images (hidden) so they are cached and available when rendered
    images.forEach(file => {
        const img = document.createElement('img');
        img.src = `${origin}/week02/image/${file}`;
        img.classList.add('img-fallback');
        img.style.display = 'none';
        document.body.appendChild(img);
    });

    const container = document.getElementById('temples-list');
    const filterNav = document.querySelector('.temple-filters');

    function createTempleCard(t) {
        const card = document.createElement('article');
        card.className = 'figure-card';

        const img = document.createElement('img');

        img.alt = `${t.name}`;
        img.loading = 'lazy';
        img.decoding = 'async';
        img.width = 600;
        img.height = 400;

        img.addEventListener('error', () => {

            img.src = `${origin}/week02/image/sydney.jpg`;
            img.classList.add('img-fallback');
            img.alt = `${t.name} (image unavailable, using fallback)`;
        });
        img.src = t.image;

        const meta = document.createElement('div');
        meta.className = 'meta';

        const h3 = document.createElement('h3');
        h3.textContent = t.name;

        const loc = document.createElement('p');
        loc.textContent = `Location: ${t.location}`;

        const ded = document.createElement('p');
        ded.textContent = `Dedicated: ${new Date(t.dedicated).toLocaleDateString()}`;

        const area = document.createElement('p');
        area.textContent = `Area: ${t.area.toLocaleString()} sqft`;

        meta.appendChild(h3);
        meta.appendChild(loc);
        meta.appendChild(ded);
        meta.appendChild(area);

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
        const buttons = document.querySelectorAll('.temple-filters button[data-filter]');
        buttons.forEach(btn => {
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
        saveFilter(type);
        setActiveButton(type);
        renderList(result);
    }

    function saveFilter(type) {
        try { localStorage.setItem('lastTempleFilter', type); } catch (e) { /* ignore */ }
    }

    function loadLastFilter() {
        try { return localStorage.getItem('lastTempleFilter'); } catch (e) { return null; }
    }


    filterNav.addEventListener('click', e => {
        if (e.target && e.target.matches('button[data-filter]')) {
            const filter = e.target.getAttribute('data-filter');
            if (location.hash.substring(1) !== filter) {
                location.hash = filter;
            } else {
                filterTemples(filter);
            }
        }
    });


    window.addEventListener('hashchange', () => {
        const hash = location.hash ? location.hash.substring(1) : 'home';
        const allowed = ['home', 'old', 'new', 'large', 'small'];
        filterTemples(allowed.includes(hash) ? hash : 'home');
    });

    function setFooterInfo() {
        const currentYear = new Date().getFullYear();
        const lastModified = document.lastModified;
        if (document.getElementById('currentyear')) document.getElementById('currentyear').textContent = currentYear;
        if (document.getElementById('lastModified')) document.getElementById('lastModified').textContent = `Last modified: ${lastModified}`;
    }

    document.addEventListener('DOMContentLoaded', () => {
        const hashFilter = location.hash ? location.hash.substring(1) : null;
        const last = hashFilter || loadLastFilter() || 'home';
        filterTemples(last);
        setFooterInfo();
    });
})();
